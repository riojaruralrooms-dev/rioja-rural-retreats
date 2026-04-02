/**
 * n8n — Code node (JavaScript)
 *
 * Objetivo: si la estancia pedida choca con el iCal (CLOSED), sigues pudiendo decir
 * "no es posible tal como lo pides", pero con lista clara de qué días de ESE rango están ocupados.
 *
 * Ajusta abajo los nombres de nodos o lee todo desde $input si haces Merge antes.
 *
 * Entrada esperada (ejemplo):
 *   fecha_entrada: "13/6/2026" o "2026-06-13"
 *   fecha_salida:  "15/6/2026" o "2026-06-15"
 *   data: string iCal completo (como el del HTTP Request)
 *
 * Semántica fechas (tipo alojamiento turístico):
 *   Entrada 13, salida 15 → días de uso del alojamiento: 13 y 14 (la salida es el último día
 *   que no duermes; no contamos el 15 como noche requerida). Si en tu negocio es distinto,
 *   cambia la función diasEstanciaPedidos().
 */

// ─── Obtén datos (elige UNA de las dos formas) ─────────────────────────────

// Opción A: nodos separados (cambia los nombres entre comillas)
// const trigger = $('When Executed by Another Workflow').first().json;
// const icalStr = String($('HTTP Request').first().json.data || '');

// Opción B: un solo item ya fusionado (recomendado tras Merge)
const root = $input.first().json;
const fecha_entrada = root.fecha_entrada ?? root.body?.fecha_entrada;
const fecha_salida = root.fecha_salida ?? root.body?.fecha_salida;
const icalStr = String(root.data ?? root.body?.data ?? root.ical ?? '');

// ─── Utilidades fechas (solo día, UTC para no liar con DST) ───────────────

function parseFecha(s) {
  if (!s) return null;
  const t = String(s).trim();
  if (t.includes('/')) {
    const p = t.split('/').map((x) => parseInt(x, 10));
    if (p.length === 3 && p.every((n) => !Number.isNaN(n))) {
      return { y: p[2], m: p[1], day: p[0] };
    }
  }
  const iso = t.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    return { y: +iso[1], m: +iso[2], day: +iso[3] };
  }
  return null;
}

function ymdKey(o) {
  return o.y * 10000 + o.m * 100 + o.day;
}

function compareYmd(a, b) {
  return ymdKey(a) - ymdKey(b);
}

function addDays(ymd, n) {
  const dt = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.day + n));
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, day: dt.getUTCDate() };
}

/** Días [entrada, salida) que deben estar libres (noches cubiertas). */
function diasEstanciaPedidos(entrada, salida) {
  const out = [];
  let cur = { ...entrada };
  while (compareYmd(cur, salida) < 0) {
    out.push({ ...cur });
    cur = addDays(cur, 1);
  }
  return out;
}

function formatEspanol(ymd) {
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ];
  return `${ymd.day} de ${meses[ymd.m - 1]} de ${ymd.y}`;
}

// ─── iCal: bloques [inicio, fin) con fin EXCLUSIVO (estándar iCal all-day) ─

function parseIcalDateValue(raw) {
  const m = String(raw).trim().match(/^(\d{4})(\d{2})(\d{2})/);
  if (!m) return null;
  return { y: +m[1], m: +m[2], day: +m[3] };
}

function extractClosedBlocks(ical) {
  const blocks = [];
  const re = /BEGIN:VEVENT[\s\S]*?END:VEVENT/g;
  let m;
  while ((m = re.exec(ical)) !== null) {
    const chunk = m[0];
    if (!/CLOSED|Not available|no disponible/i.test(chunk)) continue;

    const ds = chunk.match(/DTSTART[^:]*:([^\r\n]+)/);
    const de = chunk.match(/DTEND[^:]*:([^\r\n]+)/);
    if (!ds) continue;

    const start = parseIcalDateValue(ds[1]);
    if (!start) continue;

    let endExcl;
    if (de) {
      endExcl = parseIcalDateValue(de[1]);
    }
    if (!endExcl) {
      endExcl = addDays(start, 1);
    }

    if (compareYmd(endExcl, start) <= 0) {
      endExcl = addDays(start, 1);
    }

    blocks.push({ start, endExcl });
  }
  return blocks;
}

function diaEnBloqueCerrado(d, block) {
  return compareYmd(d, block.start) >= 0 && compareYmd(d, block.endExcl) < 0;
}

function diasPedidoQueChocan(diasPedido, blocks) {
  const ocupados = [];
  for (const d of diasPedido) {
    if (blocks.some((b) => diaEnBloqueCerrado(d, b))) {
      ocupados.push(d);
    }
  }
  return ocupados;
}

// ─── Lógica principal ─────────────────────────────────────────────────────

const entrada = parseFecha(fecha_entrada);
const salida = parseFecha(fecha_salida);

if (!entrada || !salida || compareYmd(salida, entrada) <= 0) {
  return [
    {
      json: {
        disponible: false,
        es_posible_como_pedido: false,
        error: 'Fechas inválidas o salida anterior/igual a entrada.',
        dias_ocupados_en_rango: [],
        dias_libres_en_rango: [],
        mensaje:
          'No he podido interpretar las fechas de entrada y salida. Revisa el formato (D/M/AAAA o AAAA-MM-DD).',
      },
    },
  ];
}

const diasPedido = diasEstanciaPedidos(entrada, salida);
const blocks = extractClosedBlocks(icalStr);
const ocupados = diasPedidoQueChocan(diasPedido, blocks);
const ocupSet = new Set(ocupados.map(ymdKey));
const libres = diasPedido.filter((d) => !ocupSet.has(ymdKey(d)));

const esPosible = ocupados.length === 0;

let mensaje;
if (esPosible) {
  mensaje =
    'Para las fechas indicadas (entrada ' +
    formatEspanol(entrada) +
    ', salida ' +
    formatEspanol(salida) +
    '), según el calendario consultado, no constan días ocupados en ese rango.';
} else {
  const listaOcup = ocupados.map(formatEspanol).join('; ');
  mensaje =
    'No es posible mantener la estancia exactamente con las fechas que indicas (entrada ' +
    formatEspanol(entrada) +
    ', salida ' +
    formatEspanol(salida) +
    '), porque ' +
    (ocupados.length === 1
      ? 'el siguiente día de tu estancia coincide con un periodo marcado como no disponible en el calendario: '
      : 'los siguientes días de tu estancia coinciden con periodos marcados como no disponibles en el calendario: ') +
    listaOcup +
    '.';
  if (libres.length > 0) {
    mensaje +=
      ' El resto de días de tu rango solicitado (' +
      libres.map(formatEspanol).join('; ') +
      ') aparecen libres según esos datos.';
  }
}

return [
  {
    json: {
      disponible: esPosible,
      es_posible_como_pedido: esPosible,
      dias_ocupados_en_rango: ocupados.map((d) => ({
        ymd: `${d.y}-${String(d.m).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`,
        etiqueta: formatEspanol(d),
      })),
      dias_libres_en_rango: libres.map((d) => ({
        ymd: `${d.y}-${String(d.m).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`,
        etiqueta: formatEspanol(d),
      })),
      noches_pedidas: diasPedido.length,
      mensaje,
      mensaje_para_agente:
        (esPosible
          ? 'CALENDARIO: La estancia pedida encaja sin solapar días CLOSED.'
          : 'CALENDARIO: La estancia pedida NO es posible tal cual porque estos días del rango del cliente chocan con cierre: ' +
            ocupados.map(formatEspanol).join(', ') +
            '. ') +
        (libres.length > 0 && !esPosible
          ? 'Días del mismo rango que aparecen libres: ' + libres.map(formatEspanol).join(', ') + '. '
          : '') +
        'No contradigas este resumen al hablar con el cliente.',
    },
  },
];

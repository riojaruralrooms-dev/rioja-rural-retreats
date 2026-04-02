/**
 * n8n — Code (JavaScript)
 * Flujo: When Executed by Another Workflow → … → HTTP Request → este Code
 *
 * Mismas referencias que tu script: trigger + HTTP Request.
 * Estancia = días [entrada, salida): ej. entrada 13, salida 15 → días 13 y 14.
 * iCal: cada VEVENT [DTSTART, DTEND) con DTEND exclusivo (estándar Booking).
 */

const trigger = $node["When Executed by Another Workflow"].json;

const parseFecha = (str) => {
  str = String(str || "").split("T")[0].trim();
  if (str.includes("/")) {
    const [d, m, y] = str.split("/");
    return parseInt(
      `${y}${String(m).padStart(2, "0")}${String(d).padStart(2, "0")}`,
      10
    );
  }
  return parseInt(str.replace(/-/g, ""), 10);
};

function ymdToUtcDate(ymd) {
  const s = String(ymd);
  const y = +s.slice(0, 4);
  const mo = +s.slice(4, 6) - 1;
  const d = +s.slice(6, 8);
  return new Date(Date.UTC(y, mo, d));
}

function addDaysYmd(ymd, n) {
  const dt = ymdToUtcDate(ymd);
  dt.setUTCDate(dt.getUTCDate() + n);
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dt.getUTCDate()).padStart(2, "0");
  return parseInt(`${y}${m}${day}`, 10);
}

function formatEspanol(ymd) {
  const s = String(ymd);
  const y = +s.slice(0, 4);
  const m = +s.slice(4, 6);
  const d = +s.slice(6, 8);
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${d} de ${meses[m - 1]} de ${y}`;
}

const entrada = parseFecha(trigger.fecha_entrada);
const salida = parseFecha(trigger.fecha_salida);

if (!entrada || !salida || salida <= entrada) {
  return [
    {
      json: {
        disponible: false,
        mensaje:
          "Fechas inválidas: revisa entrada y salida (entrada debe ser anterior a salida).",
        dias_ocupados_en_tu_estancia: [],
        dias_libres_en_tu_estancia: [],
      },
    },
  ];
}

const icalRaw = $node["HTTP Request"].json.data;
if (!icalRaw) {
  return [{ json: { disponible: true, mensaje: "Calendario vacío." } }];
}

/** Días que el huésped “ocupa” el alojamiento: desde entrada hasta el día antes de salida */
const diasEstancia = [];
let cur = entrada;
while (cur < salida) {
  diasEstancia.push(cur);
  cur = addDaysYmd(cur, 1);
}

const lineas = icalRaw.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
const bloques = [];
let inicioReserva = null;
let finReserva = null;
let enEvento = false;

for (const raw of lineas) {
  const linea = raw.trim();

  if (linea === "BEGIN:VEVENT") {
    enEvento = true;
    inicioReserva = null;
    finReserva = null;
  } else if (linea === "END:VEVENT" && enEvento) {
    if (inicioReserva !== null) {
      if (finReserva === null) {
        finReserva = addDaysYmd(inicioReserva, 1);
      }
      if (finReserva > inicioReserva) {
        bloques.push({ inicio: inicioReserva, fin: finReserva });
      }
    }
    enEvento = false;
    inicioReserva = null;
    finReserva = null;
  } else if (enEvento && linea.startsWith("DTSTART")) {
    const m = linea.match(/(\d{8})/);
    if (m) inicioReserva = parseInt(m[1], 10);
  } else if (enEvento && linea.startsWith("DTEND")) {
    const m = linea.match(/(\d{8})/);
    if (m) finReserva = parseInt(m[1], 10);
  }
}

function diaEnBloque(diaYmd, b) {
  return diaYmd >= b.inicio && diaYmd < b.fin;
}

const ocupados = diasEstancia.filter((d) => bloques.some((b) => diaEnBloque(d, b)));
const setOcup = new Set(ocupados);
const libres = diasEstancia.filter((d) => !setOcup.has(d));

const tieneConflicto = ocupados.length > 0;

let mensaje;
if (!tieneConflicto) {
  mensaje = "¡Está libre! Aplicamos el 10% de descuento.";
} else {
  const listaOcup = ocupados.map(formatEspanol).join(", ");
  mensaje =
    "No es posible con las fechas exactas que indicas: " +
    listaOcup +
    " " +
    (ocupados.length === 1 ? "coincide" : "coinciden") +
    " con " +
    (ocupados.length === 1 ? "un periodo reservado" : "periodos reservados") +
    " en Booking.";
  if (libres.length > 0) {
    mensaje +=
      " El resto de días de tu estancia pedida (" +
      libres.map(formatEspanol).join(", ") +
      ") " +
      (libres.length === 1 ? "aparece libre" : "aparecen libres") +
      ".";
  }
}

return [
  {
    json: {
      disponible: !tieneConflicto,
      mensaje,
      dias_ocupados_en_tu_estancia: ocupados.map((d) => ({
        ymd: d,
        texto: formatEspanol(d),
      })),
      dias_libres_en_tu_estancia: libres.map((d) => ({
        ymd: d,
        texto: formatEspanol(d),
      })),
      mensaje_para_agente:
        tieneConflicto
          ? "CALENDARIO: No es posible la estancia tal cual. Días del pedido que chocan con Booking: " +
            ocupados.map(formatEspanol).join(", ") +
            ". " +
            (libres.length
              ? "Días del mismo pedido libres: " + libres.map(formatEspanol).join(", ") + "."
              : "")
          : "CALENDARIO: El rango pedido no solapa reservas en el iCal.",
    },
  },
];

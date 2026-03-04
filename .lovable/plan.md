

## Plan: Mejorar visualización de precios por personas (Haro)

Actualmente el detalle de precios se muestra como una sola línea de texto pequeño: `"2 personas: desde 180€ · 4 personas: desde 210€ · 6 personas: desde 240€"`. Esto es difícil de leer.

### Cambios

**1. Cambiar `priceDetails` de string a array estructurado** en `src/data/apartmentDetails.ts`:
```typescript
priceTiers?: { people: string; price: number }[];
```
Para Haro:
```typescript
priceTiers: [
  { people: "2 personas", price: 180 },
  { people: "4 personas", price: 210 },
  { people: "6 personas", price: 240 },
]
```

**2. Renderizar como tabla/grid visual** en `src/pages/ApartmentDetailPage.tsx`, reemplazando el `<span>` de texto plano por una fila de tarjetitas debajo del badge principal:

```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ 2 pers.  │ │ 4 pers.  │ │ 6 pers.  │
│  180€    │ │  210€    │ │  240€    │
└──────────┘ └──────────┘ └──────────┘
```

Cada tarjeta con fondo `bg-secondary/50`, bordes redondeados, texto centrado con el numero de personas arriba y el precio destacado abajo.

### Archivos a modificar
- `src/data/apartmentDetails.ts` — cambiar tipo y datos
- `src/pages/ApartmentDetailPage.tsx` — renderizar el nuevo formato


export const inventory = { id: 'capacidad-propia', declaredTH: 7000 } as const;

export function hashrate(gh: number) {
  return gh < 1000 ? `${gh} GH/s` : `${gh / 1000} TH/s`;
}

export const plans = [
  ...[10, 100, 1000, 10000, 100000].map(gh => ({ id: `contrato-${gh}-gh`, gh, monthly: false })),
  { id: 'mensual-100-gh', gh: 100, monthly: true },
];

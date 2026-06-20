/**
 * For location owners (franchise), insert a "Brands" filter right after any
 * "Locations" filter. Returns the labels unchanged otherwise.
 */
export function withBrands(labels: string[], showBrands: boolean): string[] {
  if (!showBrands) return labels;
  const out: string[] = [];
  for (const l of labels) {
    out.push(l);
    if (l === "Locations") out.push("Brands");
  }
  return out;
}

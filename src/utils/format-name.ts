export function formatName(name: string) {
  return name
    .split(/\s+/)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

export function randomIntFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomColor(colors: any): any {
  return colors[Math.floor(Math.random() * colors.length)]
}

export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

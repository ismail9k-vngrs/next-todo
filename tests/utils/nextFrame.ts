/**
 * Wait until the next frame
 * @returns Promise<void>
 */
export function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

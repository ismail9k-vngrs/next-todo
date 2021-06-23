/**
 * Sleep for period of time
 * @param ms number
 * @returns Promise<void>
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

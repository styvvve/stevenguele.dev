/** Estimated reading time in minutes (~200 words per minute, never less than 1). */
export function readingTime(body: string = ''): number {
    const words = body.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}

export function getRandomInt(min: number, max: number) {
    // Both max and min are inclusive
    const upper = Math.floor(max);
    const lower = Math.ceil(min);
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

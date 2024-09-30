export default function two_crystal_balls(breaks: boolean[]): number {
    const breakPointCheckInterval = Math.floor(Math.sqrt(breaks.length))
    let firstBreakPoint = 0

    for (;firstBreakPoint < breaks.length; firstBreakPoint += breakPointCheckInterval) {
        if (breaks[firstBreakPoint]) {
            break;
        }
    }

    // get the last safe interval.
    let i = firstBreakPoint - breakPointCheckInterval

    // For all items between last safe interval and firstBreakPoint check if it breaks. If it does, we found the earliest breakpoint.
    for (; i <= firstBreakPoint; i++) {
        if (breaks[i]) {
            return i
        }
    }

    return -1
}
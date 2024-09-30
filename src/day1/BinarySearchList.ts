export default function bs_list(haystack: number[], needle: number): boolean {
   let lo = 0
   let hi = haystack.length

   do {
       const middlePoint = Math.floor(lo + (hi - lo) / 2)

       if (haystack[middlePoint] === needle) {
           return true
       }

       if (needle < haystack[middlePoint]) {
           hi = middlePoint
       } else {
           lo = middlePoint + 1;
       }
   } while (lo < hi)

   return false
}
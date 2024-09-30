export default function bubble_sort(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {
        // first number up to last unsorted number.
        for (let j = 0; j < arr.length - 1 - i; j++) {
            // first iteration = array[0] > array[1] ? swap : do nothing
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];

                arr[j] = arr[j + 1];

                arr[j + 1] = temp;
            }
        }
    }
}
interface Node<T> {
    value: T,
    next?: Node<T>
}

export default class Queue<T> {
    public length: number;
    public head?: Node<T>
    public tail?: Node<T>

    constructor() {
        this.head = undefined;
        this.tail = undefined;

        this.length = 0;
    }

    enqueue(item: T): void {
        const node = { value: item }

        this.length++

        if (!this.tail) {
            this.tail = node
            this.head = node;

            return
        }

        this.tail.next = node;
        this.tail = node
    }

    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--

        if (this.length === 0) {
            this.tail = undefined;
        }

        const head = this.head
        this.head = this.head.next

        return head.value
    }

    peek(): T | undefined {
        return this.head?.value
    }
}
interface Node<T> {
    value: T,
    prev?: Node<T>
}

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node = { value: item }

        this.length++;

        if (!this.head) {
            this.head = node;

            return;
        }

        const prevHead = this.head;

        this.head = node
        this.head.prev = prevHead
    }

    pop(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        if (this.length === 0) {
            this.head = undefined;

            return undefined;
        }

        this.length--

        const head = this.head
        this.head = head.prev;

        return head.value
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
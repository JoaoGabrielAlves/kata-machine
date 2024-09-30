interface Node<T> {
    value: T,
    next?: Node<T>,
}

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item }

        this.length++

        if (!this.head) {
            this.head = node;
            this.tail = node;

            return;
        }

        node.next = this.head
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("oh no")
        } else if (idx === this.length) {
            this.append(item);

            return;
        } else if (idx === 0) {
            this.prepend(item);

            return;
        }

        this.length++

        const curr = this.getAt(idx)

        if (curr) {
            const node: Node<T> = { value: item }

            const prev = this.getAt(idx - 1)

            node.next = curr.next;

            if (prev) {
                prev.next = node;
            }
        }
    }

    append(item: T): void {
        const node: Node<T> = { value: item }

        this.length++

        if (!this.tail) {
            this.head = node;
            this.tail = node;

            return;
        }

        this.tail.next = node
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head
        let idx: number = 0

        for (let i = 0; curr && i < this.length; i++) {
            if (curr?.value === item) {
                break;
            }

            curr = curr.next
            idx = i
        }

        if (!curr) {
            return undefined;
        }

        this.length--

        if (this.length === 0) {
            const out = this.head?.value

            this.head = undefined;
            this.tail = undefined;

            return out
        }

        if (curr && curr.value === item) {
            return this.removeNode(curr, idx)
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const nodeToRemove = this.getAt(idx)

        if (!nodeToRemove) {
            return undefined;
        }

        this.length--

        if (this.length === 0) {
            const out = this.head?.value

            this.head = undefined;
            this.tail = undefined;

            return out
        }

        return this.removeNode(nodeToRemove, idx)
    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head

        for (let i= 0; curr && i < idx; i++) {
            curr = curr.next;
        }

        return curr
    }

    private removeNode(node: Node<T>, nodeIndex: number): T | undefined {
        const prev = this.getAt(nodeIndex - 1)

        if (prev) {
            prev.next = node.next
        }

        if (this.tail === node) {
            this.tail = prev;
        }

        if (this.head === node) {
            this.head = node.next;
        }

        node.next = undefined

        return node.value
    }
}
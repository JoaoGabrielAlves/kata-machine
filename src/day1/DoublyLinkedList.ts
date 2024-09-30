interface Node<T> {
    value: T,
    next?: Node<T>,
    prev?: Node<T>,
}

export default class DoublyLinkedList<T> {
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
        this.head.prev = node
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
            return
        }

        this.length++

        const curr = this.getAt(idx)

        if (curr) {
            const node: Node<T> = {value: item}

            node.next = curr
            node.prev = curr.prev

            curr.prev = node

            if (node.prev) {
                node.prev.next = node
            }
        }
    }

    append(item: T): void {
        const node: Node<T> = { value: item }

        this.length++

        if (!this.tail) {
            this.tail = node;
            this.head = node

            return;
        }

        node.prev = this.tail
        this.tail.next = node
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head

        for (let i = 0; curr && i < this.length; i++) {
            if (curr?.value === item) {
                break;
            }

            curr = curr.next
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
            return this.removeNode(curr)
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.value
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);

        if (!node) {
            return undefined
        }

        this.length--

        return this.removeNode(node);
    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head

        for (let i= 0; curr && i < idx; i++) {
            curr = curr.next;
        }

        return curr
    }

    private removeNode(node: Node<T>) : T | undefined {
        if (node.next && node.next.prev) {
            node.next.prev = node.prev
        }

        if (node.prev && node.prev.next) {
            node.prev.next = node.next
        }

        if (node === this.head) {
            this.head = node.next
        }

        if (node === this.tail) {
            this.tail = node.prev
        }

        node.next  = undefined
        node.prev = undefined

        return node.value
    }
}
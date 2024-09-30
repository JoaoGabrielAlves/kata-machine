interface TrieNode<T> {
    children: { [key: string]: TrieNode<T>}
    isWord: boolean
}

export default class Trie<T> {
    private readonly head: TrieNode<T>

    constructor() {
        this.head = this.createNode();
    }

    insert(item: string): void {
        let curr = this.head

        for (const char of item) {
            if (curr?.children[char]) {
                curr = curr?.children[char]
            } else {
                const node = this.createNode();

                if (curr) {
                    curr.children[char] = node
                }

                curr = node;
            }
        }

        if (curr) {
            curr.isWord = true;
        }
    }

    delete(item: string): void {
        this.deleteWord(this.head, item, 0)
    }

    find(partial: string): string[] {
        const results: string[] = [];

        const currentNode = this.findNode(partial)

        if (currentNode && currentNode.children) {
           this.findAllWords(currentNode, partial, results)
        }

        return results;
    }

    private createNode(): TrieNode<T> {
        return {
            children: {},
            isWord: false
        }
    }

    private findNode(item: string): TrieNode<T> | undefined {
        let currentNode = this.head;

        for (const char of item) {
            if (currentNode && !currentNode.children[char]) {
                return undefined;
            }

            currentNode = currentNode?.children[char];
        }

        return currentNode;
    }

    private findAllWords(node: TrieNode<T>, prefix: string, results: string[]) {
        if (node.isWord) {
            results.push(prefix)
        }

        const childrenKeys = Object.keys(node.children);

        for (const key of childrenKeys) {
            const curr = node.children[key];

            this.findAllWords(curr, prefix + key, results);
        }
    }

    private deleteWord(node: TrieNode<T>, item: string, depth: number): boolean {
        if (depth === item.length) {
            if (!node.isWord) {
                return false;
            }

            node.isWord = false;

            return Object.keys(node.children).length === 0
        }

        const char = item[depth];
        const childNode = node.children[char];

        if (!childNode) {
            return false;
        }

        const shouldDeleteChildFromParentNode = this.deleteWord(childNode, item, depth + 1)

        if (shouldDeleteChildFromParentNode) {
            delete node.children[char];

            return Object.keys(node.children).length === 0 && !node.isWord;
        }

        return false;
    }
}
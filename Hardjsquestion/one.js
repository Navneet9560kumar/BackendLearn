class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = null; // Most recently used
        this.tail = null; // Least recently used
        this.size = 0;
    }

    // Remove node from linked list
    #removeNode(node) {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.prev = null;
        node.next = null;
    }

    // Add node to head (most recent position)
    #addToHead(node) {
        node.prev = null;
        node.next = this.head;

        if (this.head) {
            this.head.prev = node;
        }

        this.head = node;

        if (!this.tail) {
            this.tail = node;
        }
    }

    get(key) {
        if (!this.map.has(key)) {
            return -1;
        }

        const node = this.map.get(key);

        // Move accessed node to head
        this.#removeNode(node);
        this.#addToHead(node);

        return node.value;
    }

    put(key, value) {
        // If key exists → update & move to head
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.value = value;

            this.#removeNode(node);
            this.#addToHead(node);
            return;
        }

        // If capacity full → remove LRU (tail)
        if (this.size === this.capacity) {
            this.map.delete(this.tail.key);
            this.#removeNode(this.tail);
            this.size--;
        }

        // Create new node
        const newNode = {
            key,
            value,
            prev: null,
            next: null
        };

        this.#addToHead(newNode);
        this.map.set(key, newNode);
        this.size++;
    }

    // For debugging: print cache state
    print() {
        let current = this.head;
        let result = [];

        while (current) {
            result.push(`${current.key}:${current.value}`);
            current = current.next;
        }

        console.log(result.join(" -> "));
    }
}

const cache  = new LRUCache(3);
cache.put(1,10);
cache.put(2,20);
cache.put(3,30);
cache.put(4,40);

console.log(cache.print());

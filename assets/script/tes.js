// membuat queue untuk keluar masuknya vertex / node
class PriorityQueue {
    constructor() {
        this.values = [];
    }
    //   menambah queue
    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }
    //  menghapus atau mengeluarkan queue
    dequeue() {
        return this.values.shift();
    }
    //   mensorting queue yg lebih pendek
    sort() {
        console.log("1", this.values);
        this.values.sort((a, b) => a.priority - b.priority);
        console.log("2", this.values, "\n\n\n");
    }
}

//  membuat graph untuk short path djikstra
class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    // function membuat vertex tempat  destinasi
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    //    function membuat edge dan panjang jarak penghubung ke vertex lain
    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
    //   Short-Path
    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = []; // tempat menembalikan nodes terakhir
        let smallest;

        // ===================================== a
        // membangun initial state
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;

            console.log("\n\nvertex\n", vertex === start, vertex, start,
                "\n\nNodes\n", nodes.values,
                "\n\ndistance\n", distances,
                "\n\nprevious\n", previous);
        }
        // ===================================== a



        // menentukan panjang path yg dikunjungi
        // ===================================== b
        while (nodes.values.length) {
            // ===================================== b

            console.log("\n\nWhile\n===================================================");
            console.log("\n\nnode value\n", nodes.values.length, Boolean(nodes.values.length));

            // ===================================== c
            smallest = nodes.dequeue().val;
            // ===================================== c


            console.log("\n\nNodes=======================\n", nodes)
            console.log("\n\nsmallest\n", smallest === finish, smallest, finish)
            console.log("\n\nPrevious\n", previous)
            console.log("\n\ndistances\n", distances)
            console.log("\n\nadjacencyList\n", this.adjacencyList)

            // ===================================== d
            if (smallest === finish) {
                // selesai sampai tujuan mengembalikan nilai terekhir
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                console.log("break====================================");
                break;
            }
            // ===================================== d

            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    //  mencari tetangga dari node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    //menjumlah tetangga node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]) {
                        //update jarak terkecil antara node  dan tetangga
                        distances[nextNeighbor] = candidate;
                        //update previous - mendapatkan jarak antar tetanggaa sebelumnya
                        previous[nextNeighbor] = smallest;
                        //enqueue hasil queue dengan hasil yg baru
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        console.log("=====================", path)
        console.log(nodes.values);
        console.log(path, smallest);
        return path.concat(smallest).reverse();
    }
}

// inisialisasi graph
const graph = new WeightedGraph();

// 1. 
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");

// 2.
graph.addEdge("A", "B", 1);
graph.addEdge("A", "C", 6);
graph.addEdge("B", "D", 3);
graph.addEdge("C", "D", 1);

// console.log(graph.adjacencyList);
// 3. 
console.log(graph.Dijkstra("A", "D"));
// hasil [ 'A', 'B', 'D' ]
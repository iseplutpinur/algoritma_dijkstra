Nama: Isep Lutpi Nur<br>NPM: 2113191079<br>Tugas: Komunikasi Data Minggu 14 Implementasi Djikstra

<hr>

# Implementasi Alogritma Djikstra

Program untuk menentukan jalur tercepat menggunakan algoritma djikstra, Tugas besar mata kuliah Komunikasi data semester 3 Menggunakan Bahasa pemrograman Javascript.

Kode Sumber: <a href="https://github.com/iseplutpinur/algoritma_dijkstra">https://github.com/iseplutpinur/algoritma_dijkstra</a>
Lihat Aplikasi: <a href="https://iseplutpinur.github.io/algoritma_dijkstra/">https://iseplutpinur.github.io/algoritma_dijkstra/</a>

## Kode

```javascript
// Nama   : Isep Lutpi Nur
// NPM    : 2113191079
// Matkul : Komunikasi Data
// Dosen  : Nanang Hunaifi, ST, MM


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
        this.values.sort((a, b) => a.priority - b.priority);
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
        }

        // menentukan panjang path yg dikunjungi
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {
                // selesai sampai tujuan mengembalikan nilai terekhir
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
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
        return path.concat(smallest).reverse();
    }
}
```

<div style="page-break-after: always; break-after: page;"></div>

## Contoh Kasus
<img src="assets\img\coontoh-kasus.png">



### Penyelesaian Dengan Penulisan langsung / Coding

1. Inisialisasi Variable dengan class WeightedGraph()
``` javascript
const graph = new WeightedGraph();
```

2. Menambah label vertex dengan menggunakan method addVertex(labelvertex).

``` javascript
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
```

3. Menambah bobotEdge denan method addEdge(vertex1, vertex2, bobot).
``` javascript
graph.addEdge("A", "B", 5);
graph.addEdge("A", "C", 12);
graph.addEdge("A", "D", 7);

graph.addEdge("B", "D", 1);
graph.addEdge("B", "E", 6);

graph.addEdge("C", "F", 13);

graph.addEdge("D", "C", 1);
graph.addEdge("D", "E", 5);
graph.addEdge("D", "F", 10);

graph.addEdge("E", "F", 2);
graph.addEdge("E", "G", 7);

graph.addEdge("F", "G", 3);
```

4. Memanggil methood Djikstra(node awal, node tujuan).
``` javascript
console.log(graph.Dijkstra("A", "D"));
// hasil [ 'A', 'B', 'E', 'F', 'G' ]
```



### Dengan GUI/ Halaman Web

1. Kunjungi halaman: <a href="https://iseplutpinur.github.io/algoritma_dijkstra/">https://iseplutpinur.github.io/algoritma_dijkstra/</a>
2. Masukan Jumlah Vertex sesuai contoh kasus, Lalu Klik Submit.<img src="assets\img\input-jumlah-vertex.png">
3. Masukan Label Vertex sesuai contoh kasus, Lalu Klik Submit.<img src="assets\img\input-label-vertex.png">
4. Masuka Jumlah edge atau sambungan antara node/vertex sesuai contoh kasus, Lalu Klk Submit.<img src="assets\img\input-jumlah-edge.png">
5. Masukan Bobot tiap tiap ede sesuai dengan contoh kasus, lalu klik Submit. *Pada pilihan vertex 2 dan bobot edge akan terbuka jika Vertex 1 Telah di pilih.<img src="assets\img\input-bobot-edge.png">
6. Pilih Vertex/ Node awal dan Vertex/ Node tujuan, Lalu klik Hitung, Maka kolom jalur tercepat akan menampilkan hasil.<img src="assets\img\menentukan-vertex-awal-dan-akhir.png">
7. Untuk Menggunakan kembali, Klik Tombol reset.<img src="assets\img\tombol-reset.png">


<div style="page-break-after: always; break-after: page;"></div>
## Cara kerja
1. Ketika graph di inisialisasi maka constructor akan mendeklarasikan adjacencyList atau daftar node yang terhubung untuk perhitungan, dideklarasikan dengan tipe data objek.

``` javascript
class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
}


......


const graph = new WeightedGraph();
```


2. Ketika method addVertex dijalankan dengan parameter label vertex atau node akan ditambahkan ke properti adjacencyList dengan tipe data array yang nantinya array tersebut akan memuat detal data bobot edge vertex.

``` javascript
// function membuat vertex tempat  destinasi
addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
}

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
```


3. Setelah selesai menambahkan label dari vertex, bobot edge vertex akan ditambahkan sesuai dengan labelnya masing masing kedalam properti adjacencyList\[vertex\] masing masng.

``` javascript
//    function membuat edge dan panjang jarak penghubung ke vertex lain
addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
}

graph.addEdge("A", "B", 5);
graph.addEdge("A", "C", 12);
graph.addEdge("A", "D", 7);

graph.addEdge("B", "D", 1);
graph.addEdge("B", "E", 6);

graph.addEdge("C", "F", 13);

graph.addEdge("D", "C", 1);
graph.addEdge("D", "E", 5);
graph.addEdge("D", "F", 10);

graph.addEdge("E", "F", 2);
graph.addEdge("E", "G", 7);

graph.addEdge("F", "G", 3);
```


4. setelah label dan bobot tiap tiap node/ vertex didapat maka pencarian jalur tecepat dapat dilakukan dengan cara memanggil method Djikstra(awal, tujuan), dengan dua parameter yaitu parameter awal dan parameter tujuan, method ini mengembalikan/return hasil dari pencarian jalur tercepat dengan tipe data array.
``` javascript
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
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; // tempat menembalikan nodes terakhir
    let smallest;
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
    }

    // menentukan panjang path yg dikunjungi
    while (nodes.values.length) {
        smallest = nodes.dequeue().val;
        if (smallest === finish) {
            // selesai sampai tujuan mengembalikan nilai terekhir
            while (previous[smallest]) {
                path.push(smallest);
                smallest = previous[smallest];
            }
            break;
        }
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
    return path.concat(smallest).reverse();
}

console.log(graph.Dijkstra("A", "G"));
// hasil [ 'A', 'B', 'E', 'F', 'G' ]
```
5. Proses diidalam method Djikstra.
     1. Membangun initial state atau node keberangkatan Seperti contoh node keberangkatan d sini adalah 'A' maka priority nya 0, dan yang lain infinity dan node keberangkatan di sortir menjadi array paling rendah atau 0, untuk nantinya di dequeu atau diambil sementara.

        ```
        
        ```

        

     2. menentukan path yang dikunjungi dengan perulangan, perulangan nya akan berhenti jika nilai label dengan nilai terkecil sama dengan label tujuan. *di point d dibawah

     3. variable samllest akan di isi nilai keberangkatan yang telah di sort dari node. contoh disini node awalnya 'A' maka variable samllest akan berisi nilai 'A'.

     4. Kemudian smallest di cek apakah sama dengan nilai tujuan, jika sama maka dilakukan perulangan dengan parameter previous. didalam perulangan dilakukan push ke variable path dengan nilai smallest





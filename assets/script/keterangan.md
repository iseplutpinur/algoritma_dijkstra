Nama: Isep Lutpi Nur
NPM: 2113191079
Tugas: Komunikasi Data Minggu 14

### Cara Menggunakan

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
```

3. Menambah bobotEdge denan method addEdge(vertex1, vertex2, bobot).
``` javascript
graph.addEdge("A", "B", 1);
graph.addEdge("A", "C", 6);
graph.addEdge("B", "D", 3);
graph.addEdge("C", "D", 1);
```


4. Memanggil methood Djikstra(node awal, node tujuan).
``` javascript
console.log(graph.Dijkstra("A", "D"));
// hasil [ 'A', 'B', 'D' ]
```

### Cara kerja
1. Ketika graph di inisialisasi maka constructor akan mendeklarasikan adjacencyList atau daftar node yang terhubung untuk perhitungan, dideklarasikan dengan tipe data objek.

2. Ketika method addVertex dijalankan dengan parameter label vertex atau node akan ditambahkan ke properti adjacencyList dengan tipe data array yang nantinya array tersebut akan memuat detal data bobot edge vertex.

3. Setelah selesai menambahkan label dari vertex, bobot edge vertex akan ditambahkan sesuai dengan labelnya masing masing kedalam properti adjacencyList\[vertex\] masing masng.

4. setelah label dan bobot tiap tiap node/ vertex didapat maka pencarian jalur tecepat dapat dilakukan dengan cara memanggil method Djikstra(awal, tujuan), dengan dua parameter yaitu parameter awal dan parameter tujuan, method ini mengembalikan/return hasil dari pencarian jalur tercepat dengan tipe data array contoh [ 'A', 'B', 'D' ].

5. Proses diidalam method Djikstra.
a. Membangun initial state atau node keberangkatan Seperti contoh node keberangkatan d sini adalah 'A' maka priority nya 0, dan yang lain infinity dan node keberangkatan di sortir menjadi array paling rendah atau 0, untuk nantinya di dequeu atau diambil sementara.
b. menentukan path yang dikunjungi dengan perulangan, perulangan nya akan berhenti jika nilai label dengan nilai terkecil sama dengan label tujuan. *di point d dibawah
c. variable samllest akan di isi nilai keberangkatan yang telah di sort dari node. contoh disini node awalnya 'A' maka variable samllest akan berisi nilai 'A'. 
D. Kemudian smallest di cek apakah sama dengan nilai tujuan, jika sama maka dilakukan perulangan dengan parameter previous. didalam perulangan dilakukan push ke variable path dengan nilai smallest



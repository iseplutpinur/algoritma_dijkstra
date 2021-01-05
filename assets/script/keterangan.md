1. Menambah label vertex dengan menggunakan method addVertex(labelvertex).

2. Menambah bobotEdge denan method addEdge(vertex1, vertex2, bobot).

3. Memanggil methood Djikstra(node awal, node tujuan).


### Cara kerja
1. Ketika graph di inisialisasi maka constructor akan mendeklarasikan adjacencyList atau daftar node yang terhubung untuk perhitungan, dideklarasikan dengan tipe data objek.

2. Ketika method addVertex dijalankan dengan parameter label vertex atau node akan ditambahkan ke properti adjacencyList dengan tipe data array yang nantinya array tersebut akan memuat detal data bobot edge vertex.

3. Setelah selesai menambahkan label dari vertex, bobot edge vertex akan ditambahkan sesuai dengan labelnya masing masing kedalam properti adjacencyList\[vertex\] masing masng.

4. setelah label dan bobot tiap tiap node/ vertex didapat maka pencarian jalur tecepat dapat dilakukan dengan cara memanggil method Djikstra(awal, tujuan), dengan dua parameter yaitu parameter awal dan parameter tujuan, method ini mengembalikan/return hasil dari pencarian jalur tercepat dengan tipe data array contoh [ 'A', 'B', 'D' ].

5. Proses diidalam method Djikstra.
a. 



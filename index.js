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

// Label untuk vertex
let vertexlabel = [];

// bobot untuk edge yang terhubung
let vertexweight = [];

// dgunakan untuk perulangan saat input bobot edge
let jmledge = null;

// Atur jumlah maksmal dan minimal vertex yang akan dihitung
const vtrxrule = {
    min: 3,
    max: 10,
    labelcharmax: 1
};

// element display
const inputvertex = document.getElementById("inputvertex");
const inputedge = document.getElementById("inputedge");
const hitungjarak = document.getElementById("hitungjarak");

// menangani inputan jumlah vertex
function btnjmlvertex() {
    const jmlvertex = document.getElementById("jmlvertex");

    // validasi jumlah vertex minimal 3 dan maxsimal 10
    if (jmlvertex.value >= vtrxrule.min && jmlvertex.value <= vtrxrule.max) {
        let strhtml = `<hr class="my-4">
        <h4 class="mb-3">Label Vertex</h4>
        <div class="row gy-3">
        `;
        for (let i = 0; i < jmlvertex.value; i++) {
            strhtml += `    
            <div class="col-sm-3 col-md-2">
            <div class="card">
                <div class="card-body">
            <label for="labelvertex${i}" class="form-label">Label Vertex ${i + 1}</label>
            <input type="text" class="form-control labelvertex" id="labelvertex${i}"
             placeholder="" required="" onkeyup="labelvertexcek(this)">

            </div>
            </div>
            </div>
            `;

        }
        strhtml += `
            <div class="d-grid gap-2">
            <button class="btn btn-primary btn-lg" type="button" onclick="btninpvertex()">Submit</button>
            </div>
            </div>
        `;
        inputvertex.innerHTML = strhtml;

        inputedge.innerHTML = "";
        hitungjarak.innerHTML = "";
    } else {
        if (jmlvertex.value > vtrxrule.max) jmlvertex.value = vtrxrule.max;
        else if (jmlvertex.value < vtrxrule.min) jmlvertex.value = vtrxrule.min;
        alert(`Jumlah vertex minimal ${vtrxrule.min} dan maksimal ${vtrxrule.max}`);
        jmlvertex.focus();
    }
}

// validasi Karakter label
function labelvertexcek(th) {
    th.value = th.value.toUpperCase();
    document.querySelectorAll(".labelvertex").forEach(m => {
        if (m.value != "" && m != th) {
            if (th.value == m.value) {
                th.value = "";
                alert(`Label Vertex ${th.value} sudah digunakan`);
            }
        }
    });

    if (th.value.length > vtrxrule.labelcharmax) {
        th.value = th.value.slice(0, vtrxrule.labelcharmax);
    }
}

// validasi label vertex sekaligus membuat inputan jumlah edge
function btninpvertex() {
    // reset vertex label
    vertexlabel = [];
    // digunakan untuk memvalidasi label vertex apakah sudah di isi atau belum
    let cek = true;

    document.querySelectorAll(".labelvertex").forEach((m, i) => {
        vertexlabel.push(m.value);
        if (m.value == "" || m.value.length > 1) {
            if (cek) {
                m.focus()
                alert(`Label Vertex ${i + 1} Belum Di Isi`);
            }
            cek = false;
        }
    });

    if (cek) {

        // membuat elemen untuk jumlah inputan bobot edge
        inputedge.innerHTML = `
                    <hr class="my-4">
                    <div class="col-sm-12 g-3">
                        <label for="jmledge" class="form-label">Jumlah Edge</label>
                        <input type="number" class="form-control" id="jmledge" 
                        required="">
                    </div>
                    <div class="d-grid gap-2 mt-3">
                            <button class="btn btn-primary btn-lg " type="button"
                            onclick="btnjmledge()">Submit</button>
                    </div>
                    <div id="inputedgevalue"></div>
                `;
    }
}

// validasi bobot edge 
function btnjmledge() {
    const jmlvertex = document.getElementById("jmlvertex");
    const inputedgevalue = document.getElementById("inputedgevalue");
    const jmledgerule = {
        min: Number(jmlvertex.value),
        max: Number(jmlvertex.value) * (Number(jmlvertex.value) - 1)
    }
    let strhtml = `<hr class="my-4">
    <h4 class="mb-3">Bobot edge</h4>
    <div class="row gy-3 gx-3">`;
    let stropt = ``;
    jmledge = document.getElementById("jmledge");
    if (jmledge.value >= jmledgerule.min &&
        jmledge.value <= jmledgerule.max) {
        vertexlabel.forEach(n => {
            stropt += `<option value="${n}">${n}</option>`;
        })
        for (let i = 1; i <= jmledge.value; i++) {
            strhtml += `
            <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Edge ${i}</h5>
                        <div class="row gy-3">
                            <div class="col-4">
                                <label for="edge_${i}_1" class="form-label">Vertex 1</label>
                                <select class="form-select" id="edge_${i}_1" 
                                    onclick="vertex1changed(this)">
                                    ${stropt}
                                </select>
                            </div>

                            <div class="col-4">
                                <label for="edge_${i}_2" class="form-label">Vertex 2</label>
                                <select class="form-select" id="edge_${i}_2" disabled>
                                </select>
                            </div>
                            
                            <div class="col-4">
                                <label for="bobotedge_${i}" class="form-label">Bobot Edge</label>
                                <input type="number" class="form-control" id="bobotedge_${i}" 
                                required="" disabled>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
            `;
        }
        strhtml += `
        <div class="d-grid gap-2 mt-3">
        <button class="btn btn-primary btn-lg" type="button" onclick="hitung()">Submit</button>
        </div>
        </div>
        `;

    } else {
        if (jmledge.value > jmledgerule.max) {
            jmledge.value = jmledgerule.max;
        } else if (jmledge.value < jmledgerule.min) {
            jmledge.value = jmledgerule.min;
        }

        alert(`Jumlah vertex minimal ${jmledgerule.min} dan maksimal ${jmledgerule.max}`);
        jmledge.focus();
    }


    jmledge = Number(jmledge.value);
    inputedgevalue.innerHTML = strhtml;
}

// validasi ketika vertex 1 dipilih
function vertex1changed(th, ht = false) {
    let inpedge = th.id.split("_");
    let inpel = document.getElementById(`edge_${inpedge[1]}_2`);
    let stropt = ``;

    inpel.disabled = false;
    vertexlabel.forEach(n => {
        if (ht) {
            if (n != th.value) stropt += `<option value="${n}">${n}</option>`;
        } else {
            if (n != th.value && vlabel(th, n)) stropt += `<option value="${n}">${n}</option>`;
        }
    })
    inpel.innerHTML = stropt;
    document.getElementById(`bobotedge_${inpedge[1]}`).disabled = false;
}

// Validasi sambungan vertex label
function vlabel(v1, v2) {
    let cek = true;
    for (let i = 1; i <= jmledge; i++) {
        let vrtx1 = document.getElementById(`edge_${i}_1`);
        let vrtx2 = document.getElementById(`edge_${i}_2`).value;
        if (vrtx1.value == v1.value && vrtx2 == v2 & v1 != vrtx1) cek = false
    }

    return cek;
}

// validasi bobot edge sekaligus submit data ke variable utama "vertexweight"
function hitung() {
    vertexweight = [];
    let cekbobot = true;

    // Pengecekan inputan bobot edge sudah di isi atau belum
    for (let i = 1; i <= jmledge; i++) {
        let vrtx1 = document.getElementById(`edge_${i}_1`).value;
        let vrtx2 = document.getElementById(`edge_${i}_2`).value;
        let bobot = document.getElementById(`bobotedge_${i}`);
        if (bobot.value != "" && vrtx2 != "") {
            vertexweight[i] = {
                v1: vrtx1,
                v2: vrtx2,
                bb: bobot.value
            }
        } else {
            if (cekbobot) {
                if (bobot.value == "") {
                    alert(`Bobot Edge ${i} Belum di isi..`);
                    bobot.focus();
                } else {
                    alert(`Vertex 2 Edge ${i} Belum di pilih..`);
                }
            }
            cekbobot = false;
        }
    }

    // membuat elemen untuk memilih node awal dan node tujuan
    if (cekbobot) {

        let stropt = ``;
        vertexlabel.forEach(n => {
            stropt += `<option value="${n}">${n}</option>`;
        })
        let strhtml = `
                    <hr class="my-4">
                    <div class="row gy-3 gx-3">
                    <h4 class="mb-3">Hitung Jarak Tercepat</h4>
                        <div class="col-sm-3 g-3">
                            <label for="edge_999_1" class="form-label">Vertex Awal</label>
                            <select class="form-select"  id="edge_999_1" 
                            onclick="vertex1changed(this,true)">
                                ${stropt}
                            </select>
                        </div>
                        <div class="col-sm-3 g-3">
                            <label for="edge_999_2" class="form-label">Vertex Tujuan</label>
                            <select id="edge_999_2" class="form-select" disabled>
            
                            </select>
                        </div>
                        <div class="col-sm-6 g-3">                    
                            <label for="jmledge" class="form-label">Jalur Tercepat</label>
                            <input class="form-control" type="text" id="result">
                        </div>

                        <div class="d-grid gap-2 mt-3">
                                <button class="btn btn-primary btn-lg " type="button"
                                onclick="btnjikstra()">Hitung</button>
                        </div>
                    </div>
                    <input type="number" 
                    id="bobotedge_999" 
                    disabled style="display:none;">
            `;

        document.getElementById("hitungjarak").innerHTML = strhtml;

    }
}

function btnjikstra() {
    const vinp1 = document.getElementById(`edge_999_1`);
    const vinp2 = document.getElementById(`edge_999_2`);
    const result = document.getElementById(`result`);
    const v1 = vinp1.value;
    const v2 = vinp2.value;
    //  instanisasi  Graph
    const graph = new WeightedGraph();

    vertexlabel.forEach(n => {
        //  menambah vertex
        graph.addVertex(n);

    });

    for (let i = 1; i <= jmledge; i++) {
        //  menambah vertex konektor Edge
        graph.addEdge(vertexweight[i].v1,
            vertexweight[i].v2,
            Number(vertexweight[i].bb)
        );
    }

    //  menampilkan isi graph
    // console.log(graph.adjacencyList);

    // memanggil dijkstra dan mentukan jarak terdekat
    // console.log(graph.Dijkstra(v1, v2));

    let hasil = "";
    graph.Dijkstra(v1, v2).forEach(n => {
        if (hasil == "") hasil += n;
        else hasil += ` -> ${n}`;
    });

    result.value = hasil;
    result.removeAttribute("hidden");


}
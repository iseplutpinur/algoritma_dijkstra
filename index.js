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
        let strhtml = ``;
        for (let i = 0; i < jmlvertex.value; i++) {
            strhtml += `    
            <label for="labelvertex${i}">Label Vertex ${i + 1}</label>
            <input type="text" id="labelvertex${i}" 
            class="labelvertex" onkeyup="labelvertexcek(this)"><br>`;
        }
        strhtml += `<br><button onclick="btninpvertex()">Submit</button>`;
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
                    <label for="jmledge">Jumlah Edge</label>
                    <input type="number" id="jmledge">
                    <br>
                    <button onclick="btnjmledge()">Submit</button>
                    <br>
                    <br>
                    <div id="inputedgevalue"></div>
                `;
    }
}

// validasi bobot edge 
function btnjmledge() {
    jmledge = document.getElementById("jmledge");
    const inputedgevalue = document.getElementById("inputedgevalue");
    jmledge.setAttribute("readonly", "");
    jmledge = jmledge.value;
    let stropt = ``;
    vertexlabel.forEach(n => {
        stropt += `<option value="${n}">${n}</option>`;
    })
    let strhtml = ``;
    for (let i = 1; i <= jmledge; i++) {
        strhtml += `
                    <p>Edge ${i}</p>
                    <label for="edge_${i}_1">Vertex 1</label>
                    <select id="edge_${i}_1" onclick="vertex1changed(this)">
                            ${stropt}
                    </select>
                    <label for="edge_${i}_2">Vertex 2</label>
                    <select id="edge_${i}_2" disabled>
    
                    </select>
                    <label for="bobotedge_${i}">Bobot Edge</label>
                    <input type="number" id="bobotedge_${i}" disabled>
                `;
    }
    strhtml += `
                    <br><button onclick="hitung(this)">Submit</button>
                `;
    inputedgevalue.innerHTML = strhtml;
}

function vertex1changed(th) {
    let inpedge = th.id.split("_");
    let inpel = document.getElementById(`edge_${inpedge[1]}_2`);
    let stropt = ``;

    inpel.disabled = false;
    vertexlabel.forEach(n => {
        if (n != th.value) stropt += `<option value="${n}">${n}</option>`;
    })
    inpel.innerHTML = stropt;
    document.getElementById(`bobotedge_${inpedge[1]}`).disabled = false;
}

function hitung(th) {
    vertexweight = [];
    let cekbobot = true;
    for (let i = 1; i <= jmledge; i++) {
        let vrtx1 = document.getElementById(`edge_${i}_1`).value;
        let vrtx2 = document.getElementById(`edge_${i}_2`).value;
        let bobot = document.getElementById(`bobotedge_${i}`);
        if (bobot.value != "") {
            vertexweight[i] = {
                v1: vrtx1,
                v2: vrtx2,
                bb: bobot.value
            }
        } else {
            if (cekbobot) {
                alert(`Bobot Edge ${i} Belum di isi..`);
                bobot.focus();
            }
            cekbobot = false;
        }
    }
    if (cekbobot) {
        for (let i = 1; i <= jmledge; i++) {
            document.getElementById(`edge_${i}_1`).setAttribute("readonly", "");
            document.getElementById(`edge_${i}_2`).setAttribute("readonly", "");
            document.getElementById(`bobotedge_${i}`).setAttribute("readonly", "");
        }
        th.disabled = true;

        let stropt = ``;
        vertexlabel.forEach(n => {
            stropt += `<option value="${n}">${n}</option>`;
        })
        let strhtml = `
                    <p>Hitung Jarak Terdekat</p>
                    <label for="edge_999_1">Vertex Awal</label>
                    <select id="edge_999_1" 
                    onclick="vertex1changed(this)">
                            ${stropt}
                    </select>
                    <label for="edge_999_2">Vertex Tujuan</label>
                    <select id="edge_999_2" disabled>
    
                    </select>
                    <input type="number" 
                    id="bobotedge_999" 
                    disabled style="display:none;">
                    <br><button 
                    onclick="btnjikstra(this)">Hitung</button>
            `;

        document.getElementById("hitungjarak").innerHTML = strhtml;

    }
}

function btnjikstra(th) {
    const vinp1 = document.getElementById(`edge_999_1`);
    const vinp2 = document.getElementById(`edge_999_2`);
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
    console.log(graph.Dijkstra(v1, v2));

}
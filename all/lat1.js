const listMobil = [
    {nama: "Toyota Avanza", harga : 200000, gambar:"./asset/avanza.jpeg"},
    {nama: "Toyota Innova", harga : 300000, gambar:"./asset/innova.jpeg"},
    {nama: "Honda HRV", harga : 150000, gambar:"./asset/hrv.jpeg"},
    {nama: "Daihatsu Sigra", harga : 150000, gambar:"./asset/sigra.jpeg"}
];

const wrapper = document.querySelector(".cars-container");

listMobil.forEach((mobil, index) =>{
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `
        <img src= "${mobil.gambar}">
        <h3>${mobil.nama}</h3>
        <p>Harga: Rp ${mobil.harga.toLocaleString()}</p>
        <input type="checkbox" id="check-${index}">
        <label for="start-${index}">Mulai: </label>
        <input type="date" id="start-${index}">
        <label for="durasi-${index}">Durasi (hari): </label>
        <input type="number" id="durasi-${index}" min="1" value="1">
        `;

    wrapper.appendChild(card);
});

function hitungTotal(){
const valNama = document.getElementById("nama").value.trim();
if (!valNama) return alert("Nama tidak boleh kosong");

let ringkasan = `<h3>Ringkasan Sewa: </h3><ul>`;
let total= 0;

listMobil.forEach((mobil, index) => {
    const checked = document.getElementById(`check-${index}`).checked;
    const durasi = parseInt(document.getElementById(`durasi-${index}`).value);

    if(checked && durasi > 0){
        const totalHarga = mobil.harga * durasi;
        total += totalHarga;
        ringkasan += `<li> ${mobil.nama} - ${durasi} hari: Rp ${totalHarga.toLocaleString()}</li>`;
    };

});

ringkasan += `</ul><strong>Total: Rp ${total.toLocaleString()}</strong>`;
  document.getElementById('ringkasan').innerHTML = ringkasan;
}

function simpanPemesanan(){
    const valNama = document.getElementById("nama").value.trim();
    if (!valNama) return alert ("Nama tidak boleh kosong!");

    let nota = {
        valNama,
        waktu: new Date().toLocaleString(),
        detail: [],
        total: 0
    }

    listMobil.forEach((mobil, index) =>{
        const checked = document.getElementById(`check-${index}`).checked;
        const durasi = parseInt(document.getElementById(`durasi-${index}`).value);

        if(checked && durasi > 0){
            const totalHarga = mobil.harga * durasi;
            nota.detail.push({mobil: mobil.nama, durasi, totalHarga});
            nota.total += totalHarga;
        }
    });

    if(nota.detail.length === 0) return alert("Harus pilih minimal 1 Mobil");

        const all = JSON.parse(localStorage.getItem("pesanan")) || [];
        all.push(nota);
        localStorage.setItem("pesanan", JSON.stringify(all));
        tampilkanPesanan();
}

function tampilkanPesanan(){
    const ul = document.getElementById("daftarPemesanan");
    ul.innerHTML = "";

    const data = JSON.parse(localStorage.getItem("pesanan") || []);
    data.forEach((i, p) => {
        const li = document.createElement("li");
        li.innerHTML = `
        ${i.valNama} - ${i.waktu} <br>
        <ul>${i.detail.map(d => `<li>${d.mobil} - ${d.durasi} hari = Rp ${d.totalHarga.toLocaleString()}</li>`).join('')}</ul>
      <strong>Total: Rp ${i.total.toLocaleString()}</strong>
      <button onclick="hapusPemesanan(${p})">Hapus</button>
        `;
            ul.appendChild(li);
    });
}
function hapusPemesanan(index){
    const data = JSON.parse(localStorage.getItem("pesanan")) || [];
    data.splice(index, 1);
    localStorage.setItem("pesanan", JSON.stringify(data));
    tampilkanPesanan();
}
window.onload = tampilkanPesanan;

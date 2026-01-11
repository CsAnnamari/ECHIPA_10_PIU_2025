function salveazaCopil() {
    const nume = document.getElementById("numeCopil").value;
    const alocatie = document.getElementById("alocatie").value;
    const zi = document.getElementById("ziTransfer").value;
    const limita = document.getElementById("limita").value;

    if (!nume) {
        alert("Introdu numele copilului!");
        return;
    }

    const mesaj = document.getElementById("mesaj");
    mesaj.style.display = "block";
    mesaj.style.color = "#2ecc71";
    mesaj.innerText =
        `Configurare cu succes la: ${nume}
         Alocație: ${alocatie} RON/lună,
         transfer în data de ${zi}.
         Cheltuieli peste ${limita} RON necesită aprobare.`;
}

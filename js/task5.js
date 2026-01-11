function creeazaObiectiv() {
    const copil = document.getElementById("copil").value;
    const nume = document.getElementById("numeObiectiv").value;
    const total = Number(document.getElementById("sumaTotala").value);
    const alocare = Number(document.getElementById("alocare").value);

    if (!copil || !nume || !total || !alocare) {
        alert("Completează toate câmpurile!");
        return;
    }

    const procent = Math.min((alocare / total) * 100, 100);

    document.getElementById("obiectivCard").style.display = "block";
    document.getElementById("titluObiectiv").innerText = `🎯 ${nume}`;
    document.getElementById("numeCopil").innerText = copil;
    document.getElementById("economisit").innerText = alocare;
    document.getElementById("total").innerText = total;

    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = procent + "%";

    if (procent < 50) progressBar.className = "progress-bar status-warning";
    if (procent >= 50) progressBar.className = "progress-bar status-ok";
    if (procent >= 100) progressBar.className = "progress-bar status-ok";

    document.getElementById("mesaj").innerText =
        `Bravo, ${copil}! Ai economisit ${alocare} RON (${procent.toFixed(1)}%). 💪`;
}

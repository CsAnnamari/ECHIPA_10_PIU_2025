let recompensa = 0;

function creeazaSarcina() {
    const copil = document.getElementById("copil").value;
    const descriere = document.getElementById("descriere").value;
    recompensa = Number(document.getElementById("recompensa").value);

    if (!copil || !descriere || !recompensa) {
        alert("Completează toate câmpurile!");
        return;
    }

    document.getElementById("taskCard").style.display = "block";
    document.getElementById("taskTitlu").innerText = `${descriere}`;
    document.getElementById("taskCopil").innerText = copil;
    document.getElementById("taskRecompensa").innerText = recompensa;

    document.getElementById("taskStatusText").innerText =
        "Sarcina este în desfășurare.";
}

function finalizeazaSarcina() {
    const bar = document.getElementById("taskStatusBar");
    bar.style.width = "66%";
    bar.className = "progress-bar status-warning";

    document.getElementById("taskStatusText").innerText =
        "Sarcina a fost finalizată. Așteaptă aprobarea părintelui.";
}

function aprobaSarcina() {
    const bar = document.getElementById("taskStatusBar");
    bar.style.width = "100%";
    bar.className = "progress-bar status-ok";

    document.getElementById("taskStatusText").style.color = "#2ecc71";
    document.getElementById("taskStatusText").innerText =
        `Aprobat! ${recompensa} RON au fost transferați copilului`;
}

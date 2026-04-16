let dragged = null;

function updatePlaceholders() {
    document.querySelectorAll("[data-body]").forEach(body => {
        const hasStrip = body.querySelector(".strip");
        const ph = body.querySelector(".placeholder");
        if (ph) ph.style.display = hasStrip ? "none" : "block";
    });
}

function createStrip() {
    const s = document.createElement("div");
    s.className = "strip";
    s.draggable = true;

    s.innerHTML = `
        <input placeholder="Callsign">
        <input placeholder="Route">
        <input placeholder="Alt/Code">
        <button title="Delete">✕</button>
    `;

    s.querySelector("button").onclick = () => {
        s.remove();
        updatePlaceholders();
    };

    s.addEventListener("dragstart", () => {
        dragged = s;
        s.classList.add("dragging");
    });

    s.addEventListener("dragend", () => {
        dragged = null;
        s.classList.remove("dragging");
    });

    return s;
}

document.querySelectorAll("[data-add]").forEach(btn => {
    btn.onclick = () => {
        const body = btn.closest(".column").querySelector("[data-body]");
        body.appendChild(createStrip());
        updatePlaceholders();
    };
});

document.querySelectorAll("[data-body]").forEach(body => {
    body.addEventListener("dragover", e => e.preventDefault());

    body.addEventListener("drop", e => {
        e.preventDefault();
        if (dragged) {
            body.appendChild(dragged);
            updatePlaceholders();
        }
    });
});

updatePlaceholders();

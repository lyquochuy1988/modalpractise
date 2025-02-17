const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const modal = $("#modal");
const modalBtn = $("#modal-1");
const modalClose = $("#modal-close");

modalBtn.onclick = () => {
    modal.classList.add("show");
}

// Modal Close click
modalClose.onclick = () => {
    modal.classList.remove("show");
}

// Modal Backdrop click
modal.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
}

// Escape keydownaa
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.remove("show");
    }
})

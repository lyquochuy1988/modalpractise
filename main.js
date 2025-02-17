const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let currentModal = null;

$$(".btn").forEach(btn => {
    btn.onclick = () => {
        const modal = $(btn.dataset.modal);
        if (modal) {
            modal.classList.add("show");
            currentModal = modal;
        } else {
            console.error(btn.dataset.modal);
        }
    }
})

$$(".modal-close").forEach(btn => {
    btn.onclick = () => {
        const modal = btn.closest(".modal-backdrop");
        if (modal) {
            modal.classList.remove("show");
            currentModal = null;
        }
    }
})

$$(".modal-backdrop").forEach(modal => {
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
            currentModal = null;
        }
    }
})

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && currentModal) {
        currentModal.classList.remove("show");
        currentModal = null;
    }
})
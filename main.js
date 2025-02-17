const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Modal() {
    this.open = (content) => {
        // Create Element Modal Backdrop
        const modalBackdrop = document.createElement("div");
        modalBackdrop.classList = "modal-backdrop";

        // Create Element Modal Container
        const modalContainer = document.createElement("div");
        modalContainer.classList = "modal-container";

        // Create Element Modal Close
        const modalClose = document.createElement("button");
        modalClose.classList = "modal-close";
        modalClose.innerHTML = "&times";

        // Create Element Modal Content
        const modalContent = document.createElement("div");
        modalContent.classList = "modal-content";
        modalContent.innerHTML = content;

        // Append Element
        modalContainer.append(modalClose, modalContent);
        modalBackdrop.append(modalContainer);
        document.body.append(modalBackdrop);

        // Add Class show to modalBackdrop
        if (modalBackdrop) {
            setTimeout(() => {
                modalBackdrop.classList.add("show");
            }, 0);
        }

        // Modal Close click
        modalClose.onclick = () => {
            this.close(modalBackdrop);
        }

        // Modal Backdrop click
        modalBackdrop.onclick = (e) => {
            if (e.target === modalBackdrop) {
                this.close(modalBackdrop);
            }
        }

        // Escape keydown close modal
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.close(modalBackdrop);
            }
        })
    }

    this.close = (modalELement) => {
        modalELement.classList.remove("show");
        modalELement.ontransitionend = () => {
            modalELement.remove();
        }
    }
}

const modal1 = new Modal();
const btnModal1 = document.querySelector("#modal-1");

btnModal1.onclick = () => {
    modal1.open('<h1>Modal 1</h1>');
}

const modal2 = new Modal();
const btnModal2 = document.querySelector("#modal-2");

btnModal2.onclick = () => {
    modal2.open('<h1>Modal 2</h1>');
}
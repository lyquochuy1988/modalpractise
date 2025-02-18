const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// const formLogin = $("#template-modal-2").content.querySelector("#login-form");
// formLogin.onclick = (e) => {
//     e.preventDefault();
//     console.log("Submitted");
// }

function Modal() {
    this.open = (options = {}) => {
        const   { 
                    templateID,
                    allowBackdropClose = true,
                } = options;
        const template = $(`#${templateID}`);

        if (!template) {
            console.error(`#${templateID} not exists`);
            return;
        }

        const content = template.content.cloneNode(true);

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
        modalContent.append(content);

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
        if (allowBackdropClose) {
            modalBackdrop.onclick = (e) => {
                if (e.target === modalBackdrop) {
                    this.close(modalBackdrop);
                }
            }
        }

        // Escape keydown close modal
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.close(modalBackdrop);
            }
        });

        // Add class no-scroll : disable scrolling
        document.body.classList.add("no-scroll");

        return modalBackdrop;
    }

    this.close = (modalELement) => {
        modalELement.classList.remove("show");
        modalELement.ontransitionend = () => {
            modalELement.remove();
        }

        // Remove class no-scroll : enable scrolling
        document.body.classList.remove("no-scroll");
    }
}

const modal1 = new Modal();
const btnModal1 = document.querySelector("#modal-1");

btnModal1.onclick = () => {
    modal1.open({
        templateID: "template-modal-1",
    });
}

const modal2 = new Modal();
const btnModal2 = document.querySelector("#modal-2");

btnModal2.onclick = () => {
    const modal = modal2.open({
        templateID: "template-modal-2",
        allowBackdropClose: false,
    });

    const loginForm = modal.querySelector("#login-form");
    loginForm.onclick = (e) => {
        e.preventDefault();
        // console.log("Submitted");
        const valueForm = {
            email: $("#email").value.trim(),
            password: $("#password").value.trim(),
        };

        // console.log(valueForm);
    }
}
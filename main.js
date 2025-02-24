const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Modal() {   
    function getScrollbarWidth() {
        if (getScrollbarWidth.value) {
            console.log("Gia tri da duoc luu, khong can tinh toan lai");
            return getScrollbarWidth.value;
        }

        const div = document.createElement("div");
        Object.assign(div.style, {
            overflow: "scroll",
            position: "absolute",
            top: "-9999px",
        });
    
        document.body.appendChild(div);
    
        const scrollbarWidth = div.offsetWidth - div.clientWidth;
        
        document.body.removeChild(div);

        getScrollbarWidth.value = scrollbarWidth;

        console.log("Tinh toan kich thuoc thanh cuon: ", scrollbarWidth);

        return scrollbarWidth;
    }

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
        document.body.style.paddingRight = getScrollbarWidth() + "px";

        return modalBackdrop;
    }

    this.close = (modalELement) => {
        modalELement.classList.remove("show");
        modalELement.ontransitionend = () => {
            modalELement.remove();
        }

        // Remove class no-scroll : enable scrolling
        document.body.classList.remove("no-scroll");
        document.body.style.paddingRight = "";
    }
}

const modal1 = new Modal({
    templateID: "template-modal-1",
});
const btnModal1 = document.querySelector("#modal-1");

btnModal1.onclick = () => {
    modal1.open();
}

const modal2 = new Modal({
    templateID: "template-modal-2",
    allowBackdropClose: false,
    footer: true,
    closeMethods: ["button", "escape"],
    cssClass: ["class-1", "class-2"],
    onOpen: () => {
        console.log("Modal opened");
    }, 
    onClose: () => {
        console.log("Modal closed");
    }

});
const btnModal2 = document.querySelector("#modal-2");

btnModal2.onclick = () => {
    const modal = modal2.open();
    modal2.close();
    modal2.setFooterContent("html string");
    modal2.addFooterButton("Cancel", "class-1 class-2", (e) => {});
    modal2.addFooterButton("Agree", "class-3 class-4", (e) => {});
    modal2.destroy();
}





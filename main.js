const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Modal(options = {}) {  
    const   { 
        templateID,
        closeMethods = ["button", "overlay", "escape"],
        destroyOnClose = true,
        cssClass = [],
    } = options;

    const template = $(`#${templateID}`);

    if (!template) {
        console.error(`#${templateID} not exists`);
        return;
    }

    this._allowButtonClose = closeMethods.includes("button");
    this._allowBackdropClose = closeMethods.includes("overlay");
    this._allowEscapeClose = closeMethods.includes("escape");
    
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

    this._build = () => {
        const content = template.content.cloneNode(true);

        // Create Element Modal Backdrop
        this._modalBackdrop = document.createElement("div");
        this._modalBackdrop.classList = "modal-backdrop";

        // Create Element Modal Container
        const modalContainer = document.createElement("div");
        modalContainer.classList = "modal-container";

        cssClass.forEach(className => {
            if (typeof className === "string") {
                modalContainer.classList.add(className);
            }
        });

        if (this._allowButtonClose) {
            // Create Element Modal Close
            const modalClose = document.createElement("button");
            modalClose.classList = "modal-close";
            modalClose.innerHTML = "&times";

            modalContainer.append(modalClose);

            // Modal Close click
            modalClose.onclick = () => {
                this.close();
            }
        }
        

        // Create Element Modal Content
        const modalContent = document.createElement("div");
        modalContent.classList = "modal-content";
        modalContent.append(content);

        // Append Element
        modalContainer.append(modalContent);
        this._modalBackdrop.append(modalContainer);
        document.body.append(this._modalBackdrop);
    }

    this.open = () => {
        
        if (!this._modalBackdrop) {
            this._build();
        }

        // Add Class show to this._modalBackdrop
        if (this._modalBackdrop) {
            setTimeout(() => {
                this._modalBackdrop.classList.add("show");
            }, 0);
        }        

        // Modal Backdrop click
        if (this._allowBackdropClose) {
            this._modalBackdrop.onclick = (e) => {
                if (e.target === this._modalBackdrop) {
                    this.close();
                }
            }
        }

        // Escape keydown close modal
        if (this._allowEscapeClose) {
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    this.close();
                }
            });
        }

        // Add class no-scroll : disable scrolling
        document.body.classList.add("no-scroll");
        document.body.style.paddingRight = getScrollbarWidth() + "px";

        return this._modalBackdrop;
    }

    this.close = (destroy = destroyOnClose) => {
        this._modalBackdrop.classList.remove("show");
        this._modalBackdrop.ontransitionend = () => {
            if (this._modalBackdrop && destroy) {
                this._modalBackdrop.remove();
                this._modalBackdrop = null;
            }
        }

        // Remove class no-scroll : enable scrolling
        document.body.classList.remove("no-scroll");
        document.body.style.paddingRight = "";
    }

    this.destroy = () => {
        this.close(true);
    }
}

const modal1 = new Modal({
    templateID: "template-modal-1",
    closeMethods: ["button", "overlay"],
    destroyOnClose: false,
    cssClass: ['css-1', 'css-2'],
});
const btnModal1 = document.querySelector("#modal-1");

btnModal1.onclick = () => {
    modal1.open();
}

const modal2 = new Modal({
    templateID: "template-modal-2",
    // allowBackdropClose: false,
    // footer: true,
    // closeMethods: ["button", "escape"],
    // cssClass: ["class-1", "class-2"],
    // onOpen: () => {
    //     console.log("Modal opened");
    // }, 
    // onClose: () => {
    //     console.log("Modal closed");
    // }

});
const btnModal2 = document.querySelector("#modal-2");

btnModal2.onclick = () => {
    const modal = modal2.open();
    // modal2.close();
    // modal2.setFooterContent("html string");
    // modal2.addFooterButton("Cancel", "class-1 class-2", (e) => {});
    // modal2.addFooterButton("Agree", "class-3 class-4", (e) => {});
    // modal2.destroy();
}





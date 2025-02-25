const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Popzy.elements = [];

function Popzy(options = {}) {  
    this.opt = Object.assign({ 
        // templateID,
        closeMethods: ["button", "overlay", "escape"],
        destroyOnClose: true,
        cssClass: [],
        // onOpen,
        // onClose,
        footer: false,
    }, options);

    this.template = $(`#${this.opt.templateID}`);

    if (!this.template) {
        console.error(`#${this.opt.templateID} not exists`);
        return;
    }

    const {closeMethods} = this.opt;

    this._allowButtonClose = closeMethods.includes("button");
    this._allowBackdropClose = closeMethods.includes("overlay");
    this._allowEscapeClose = closeMethods.includes("escape");

    this._footerButtons = [];

    this._handleEscapeKey = this._handleEscapeKey.bind(this);
    // Note: chỉ bind được khi this._handleEscapeKey là function() , còn array function thì không bind được
}

Popzy.prototype._build = function() {
    const content = this.template.content.cloneNode(true);

    // Create Element Modal Backdrop
    this._modalBackdrop = document.createElement("div");
    this._modalBackdrop.classList = "popzy__backdrop";

    // Create Element Modal Container
    const modalContainer = document.createElement("div");
    modalContainer.classList = "popzy__container";

    this.opt.cssClass.forEach(className => {
        if (typeof className === "string") {
            modalContainer.classList.add(className);
        }
    });

    if (this._allowButtonClose) {
        // Create Element Modal Close
        // const modalClose = document.createElement("button");
        // modalClose.classList = "modal-close";
        // modalClose.innerHTML = "&times";
        // modalClose.onclick = () => {
        //     this.close();
        // }

        const modalClose = this._createButton("&times", "popzy__close", () => this.close());

        modalContainer.append(modalClose);

        
    }

    // Create Element Modal Content
    const modalContent = document.createElement("div");
    modalContent.classList = "popzy__content";
    modalContent.append(content);
    modalContainer.append(modalContent);

    if (this.opt.footer) {
        this._modalFooter = document.createElement("div");
        this._modalFooter.classList = "popzy__footer";

        this._renderFooterContent();
        this._renderFooterButtons();

        modalContainer.append(this._modalFooter);
    }

    // Append Element        
    this._modalBackdrop.append(modalContainer);
    document.body.append(this._modalBackdrop);
}

Popzy.prototype.setFooterContent = function(html) {
    this._footerContent = html;
    this._renderFooterContent();
}

Popzy.prototype.addFooterButton = function(title, cssClass, callback) {
    const button = this._createButton(title, cssClass, callback);
    this._footerButtons.push(button);

    this._renderFooterButtons();
}

Popzy.prototype._renderFooterContent = function() {
    if (this._modalFooter && this._footerContent) {
        this._modalFooter.innerHTML = this._footerContent;
    }
}

Popzy.prototype._renderFooterButtons = function() {
    if (this._modalFooter) {
        this._footerButtons.forEach(button => {
            this._modalFooter.append(button);
        });
    }
}

Popzy.prototype._createButton = function(title, cssClass, callback) {
    const button = document.createElement("button");
    button.className = cssClass;
    button.innerHTML = title;
    button.onclick = callback;

    return button;
}

Popzy.prototype.open = function() {
    Popzy.elements.push(this);
    
    if (!this._modalBackdrop) {
        this._build();
    }

    // Add Class show to this._modalBackdrop
    if (this._modalBackdrop) {
        setTimeout(() => {
            this._modalBackdrop.classList.add("popzy--show");
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
        document.addEventListener("keydown", this._handleEscapeKey);

        // document.keydown = this._handleEscapekey;
        // document.keydown();
    }

    // Add class no-scroll : disable scrolling
    document.body.classList.add("popzy--no-scroll");
    document.body.style.paddingRight = this._getScrollbarWidth() + "px";

    this._onTransitionEnd(this.opt.onOpen);

    return this._modalBackdrop;
}

Popzy.prototype._handleEscapeKey = function(e) {
    const lastModal = Popzy.elements[Popzy.elements.length - 1];
    if (e.key === "Escape" && this === lastModal) {
        this.close();
    }
}

Popzy.prototype._onTransitionEnd = function(callback) {
    this._modalBackdrop.ontransitionend = (e) => {            
        if (e.propertyName !== 'transform') return;    
        if (typeof callback === 'function') callback();
    }
}

Popzy.prototype.close = function(destroy = this.opt.destroyOnClose) {
    Popzy.elements.pop();
    this._modalBackdrop.classList.remove("popzy--show");

    // Escape keydown close modal
    if (this._allowEscapeClose) {
        document.removeEventListener("keydown", this._handleEscapeKey);
    }
   
    this._onTransitionEnd(() => {
        if (this._modalBackdrop && destroy) {                
            this._modalBackdrop.remove();
            this._modalBackdrop = null;
            this._modalFooter = null;
        }

        // Remove class no-scroll : enable scrolling
        if (!Popzy.elements.length) {
            document.body.classList.remove("popzy--no-scroll");
            document.body.style.paddingRight = "";
        }

        if (typeof this.opt.onClose === 'function') this.opt.onClose();
    })  
}

Popzy.prototype.destroy = function() {
    this.close(true);
}

Popzy.prototype._getScrollbarWidth = function() {
    if (this._scrollbarWidth) return this._scrollbarWidth;

    const div = document.createElement("div");
    Object.assign(div.style, {
        overflow: "scroll",
        position: "absolute",
        top: "-9999px",
    });

    document.body.appendChild(div);

    this._scrollbarWidth = div.offsetWidth - div.clientWidth;
    
    document.body.removeChild(div);

    return this._scrollbarWidth;
}

const modal1 = new Popzy({
    templateID: "template-modal-1",
    closeMethods: ["button", "overlay", "escape"],
    destroyOnClose: false,
    cssClass: ['css-1', 'css-2'],
    onOpen: () => {
        console.log("Modal 1 opened");
    }, 
    onClose: () => {
        console.log("Modal 1 closed");
    }
});
const btnModal1 = document.querySelector("#modal-1");

btnModal1.onclick = () => {
    modal1.open();
}

const modal2 = new Popzy({
    templateID: "template-modal-2",
    // allowBackdropClose: false,
    // footer: true,
    // closeMethods: ["button", "escape"],
    // cssClass: ["class-1", "class-2"],
    onOpen: () => {
        console.log("Modal 2 opened");
    }, 
    onClose: () => {
        console.log("Modal 2 closed");
    }

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

const modal3 = new Popzy({
    templateID: "template-modal-3",
    footer: true,
});

// modal3.setFooterContent("this is footer content");

modal3.addFooterButton("Cancel", "popzy__btn", (e) => {
    modal3.close();
});

modal3.addFooterButton("<span>Agree</span>", "popzy__btn popzy__btn--primary", (e) => {
    modal3.close();
});

const btnModal3 = document.querySelector("#modal-3");

btnModal3.onclick = () => {
    modal3.open();
}









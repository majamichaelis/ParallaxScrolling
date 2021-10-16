let currentlyOpenModals = {};
const noModalsOpen = () => !Object.keys(currentlyOpenModals).length;
const modalWrapper = document.querySelector(".modal-wrapper");
// Open Buttons
const modalTriggers = document.querySelectorAll(".open-modal");
var body = document.getElementsByTagName('body')[0];

// Click-Event zum öffnen des Modalfensters
modalTriggers.forEach(modalTrigger => {
    modalTrigger.addEventListener("click", clickEvent => {
    const trigger = clickEvent.target;
    const modalId = trigger.getAttribute("data-modal-id");

    // Verbiete scrollen
    body.style.overflow="hidden";

    // Verstecke alle Open-Buttons
    for(var i=0; i<modalTriggers.length; i++){
        modalTriggers[i].style.display="none";
    }

    // Rufe Funktion auf
    openModal(modalId);
    });
});

// Öffne Modalfenster
const openModal = modalId => {
    if (noModalsOpen()) {
        modalWrapper.classList.add("visible");
    }

    const modal = document.getElementById(modalId);
    modal.classList.add("visible");
    currentlyOpenModals[modalId] = modal;
};

// Schließe Modalfenster
const closeModal = modalId => {
    if (noModalsOpen()) {
        return;
    }

    const modal = currentlyOpenModals[modalId];
    modal.classList.remove("visible");
    delete currentlyOpenModals[modalId];

    // Verstecke div, wenn kein Modal mehr offen
    if (noModalsOpen()) {
        modalWrapper.classList.remove("visible");
    }

    // Erlaube scrollen
    body.style.overflow="auto";

    // Lasse alle Open-Buttons erscheinen
    for(var i=0; i<modalTriggers.length; i++){
        modalTriggers[i].style.display="block";
    }
};

// Schließe immer das richtige Modalfenster, anhand der ID bzw das nächste im Bereich des Buttons
document.querySelectorAll(".close-modal").forEach(closeModalButton => {
    closeModalButton.addEventListener("click", clickEvent => {
    const modalToClose = clickEvent.target.closest(".modal-window");
    //Rufe Funktion auf
    closeModal(modalToClose.id);
    });
});
let currentlyOpenModalsMenu = {};
const noModalsOpenMenu = () => !Object.keys(currentlyOpenModalsMenu).length;
const modalWrapperMenu = document.querySelector(".modal-menu-wrapper");
// Open Buttons
const modalTriggersMenu = document.querySelectorAll(".open-modal-menu"); //kann ggf. entfernt werden, da keine Buttons vorhanden für Menü


// Öffne Modalfenster, scrollen bleibt aber erlaubt
const openModalMenu = modalId => {
	// Verstecke alle Open-Buttons
    for(var i=0; i<modalTriggersMenu.length; i++){
        modalTriggersMenu[i].style.display="none";
    }
	
    if (noModalsOpenMenu()) {
        modalWrapperMenu.classList.add("visible");
    }

    const modal = document.getElementById(modalId);
    modal.classList.add("visible");
    currentlyOpenModalsMenu[modalId] = modal;
};

// Schließe Modalfenster
const closeModalMenu = modalId => {
    if (noModalsOpenMenu()) {
        return;
    }

    const modal = currentlyOpenModalsMenu[modalId];
    modal.classList.remove("visible");
    delete currentlyOpenModalsMenu[modalId];

    // Verstecke div, wenn kein Modal mehr offen
    if (noModalsOpenMenu()) {
        modalWrapperMenu.classList.remove("visible");
    }

    // Erlaube scrollen
    body.style.overflow="auto";

    // Lasse alle Open-Buttons erscheinen
    for(var i=0; i<modalTriggersMenu.length; i++){
        modalTriggersMenu[i].style.display="block";
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
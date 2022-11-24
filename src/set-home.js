export { setHome }

import { getProjectDomElements } from "./generate-project";

const setHome = (() => { //sets home page load from local storage
    getProjectDomElements.domElements.lowPrioCheckbox.checked = false;
    getProjectDomElements.domElements.medPrioCheckbox.checked = false;
    getProjectDomElements.domElements.highPrioCheckbox.checked = false;
})()
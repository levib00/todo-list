export { setHome }

import { getProjectDomElements } from "./generate-project";

const setHome = (() => {
    getProjectDomElements.domElements.lowPrioCheckbox.checked = false;
    getProjectDomElements.domElements.medPrioCheckbox.checked = false;
    getProjectDomElements.domElements.highPrioCheckbox.checked = false;
})()
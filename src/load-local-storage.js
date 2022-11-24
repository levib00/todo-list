export { loadLocalStorage }

import { getProjectDomElements, handleSelectedProject } from "./generate-project";
import { deleteListing } from "./delete-project";

const loadLocalStorage = (() => { //loads some page details from local storage
        if (localStorage.currentArray) {
            const currentArray = localStorage.getItem('currentArray') 
            getProjectDomElements.projectLogic.projectArray = JSON.parse(currentArray)
        }
        const currentSidebar = localStorage.getItem('currentSidebar');
        document.getElementById('dates-container').innerHTML = JSON.parse(currentSidebar)

        const projectButtons = document.getElementsByClassName('project');
        for (const button of projectButtons) {
            button.addEventListener('click',handleSelectedProject,false)
        }

        const delButtons = document.getElementsByClassName('delete-button');
        for (const button of delButtons) {
            button.addEventListener('click', deleteListing, false)
        }
    })()
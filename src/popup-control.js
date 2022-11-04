export default function popupControl() {
    getElements.domElements.closeButton.addEventListener("click", functions.closeFormButton, false);
    getElements.domElements.addNewButton.addEventListener('click', functions.showForm,false )
}

const functions = (() => {
    function closeFormButton() {
        console.log(document.getElementById("project-name-in").value)
        document.getElementById("project-name-in").innerText = "";
        document.getElementById("due-date-in").value = "";
        document.getElementById("priority-in").value = "";
        
        closeForm()
    }
    function finishFadeOut() {
        getElements.domElements.popup.classList.remove("show");
    }
    function closeForm() {
        getElements.domElements.popup.setAttribute("class","show hide");
        getElements.domElements.header.classList.remove("blur");
        getElements.domElements.content.classList.remove("blur");
        setTimeout(finishFadeOut, 200)
    }

    function showForm() {
        getElements.domElements.popup.setAttribute("class","show");
        getElements.domElements.content.setAttribute("class","blur");
        getElements.domElements.header.setAttribute("class", "blur");
    }
    return {closeForm, showForm, closeFormButton}
})()

const getElements = (() => {
    const domElements = {
        popup : document.getElementById("form-pop"),
        header : document.getElementById("header"),
        content : document.getElementById("content"),
        addNewButton : document.getElementById("add-new-button"),
        closeButton : document.getElementById("close-form")
    }
    return {domElements}
    
})()
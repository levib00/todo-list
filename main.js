/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _popup_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup-control */ \"./src/popup-control.js\");\n\n(0,_popup_control__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/popup-control.js":
/*!******************************!*\
  !*** ./src/popup-control.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ popupControl)\n/* harmony export */ });\nfunction popupControl() {\n    getElements.domElements.closeButton.addEventListener(\"click\", functions.closeFormButton, false);\n    getElements.domElements.addNewButton.addEventListener('click', functions.showForm,false )\n}\n\nconst functions = (() => {\n    function closeFormButton() {\n        console.log(document.getElementById(\"project-name-in\").value)\n        document.getElementById(\"project-name-in\").innerText = \"\";\n        document.getElementById(\"due-date-in\").value = \"\";\n        document.getElementById(\"priority-in\").value = \"\";\n        \n        closeForm()\n    }\n    function finishFadeOut() {\n        getElements.domElements.popup.classList.remove(\"show\");\n    }\n    function closeForm() {\n        getElements.domElements.popup.setAttribute(\"class\",\"show hide\");\n        getElements.domElements.header.classList.remove(\"blur\");\n        getElements.domElements.content.classList.remove(\"blur\");\n        setTimeout(finishFadeOut, 200)\n    }\n\n    function showForm() {\n        getElements.domElements.popup.setAttribute(\"class\",\"show\");\n        getElements.domElements.content.setAttribute(\"class\",\"blur\");\n        getElements.domElements.header.setAttribute(\"class\", \"blur\");\n    }\n    return {closeForm, showForm, closeFormButton}\n})()\n\nconst getElements = (() => {\n    const domElements = {\n        popup : document.getElementById(\"form-pop\"),\n        header : document.getElementById(\"header\"),\n        content : document.getElementById(\"content\"),\n        addNewButton : document.getElementById(\"add-new-button\"),\n        closeButton : document.getElementById(\"close-form\")\n    }\n    return {domElements}\n    \n})()\n\n\n//# sourceURL=webpack://todo-list/./src/popup-control.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
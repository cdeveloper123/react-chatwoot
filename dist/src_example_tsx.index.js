/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(this["webpackChunkReactChatInterface"] = this["webpackChunkReactChatInterface"] || []).push([["src_example_tsx"],{

/***/ "./src/example.tsx":
/*!*************************!*\
  !*** ./src/example.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ \"./node_modules/react-dom/client.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/dist/react-redux.mjs\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store */ \"./src/store.ts\");\n/* harmony import */ var _components_chat_interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/chat-interface */ \"./src/components/chat-interface/index.tsx\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n\n// Create a simple component to wrap with the chat interface\nvar ChatWrapper = function ChatWrapper() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      width: \"100vw\",\n      height: \"100vh\",\n      display: \"flex\",\n      justifyContent: \"center\",\n      alignItems: \"center\"\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", null, \"Chat Interface Wrapper\"));\n};\n\n// Wrap the component with the chat interface\nvar ChatInterface = (0,_components_chat_interface__WEBPACK_IMPORTED_MODULE_3__.withChat)(ChatWrapper);\n\n// Use it with required props\nfunction App() {\n  var chatProps = {\n    conversations: _components_chat_interface__WEBPACK_IMPORTED_MODULE_3__.sampleConversations,\n    currentUser: _components_chat_interface__WEBPACK_IMPORTED_MODULE_3__.sampleCurrentUser,\n    onSendMessage: function onSendMessage(message, conversationId) {\n      return console.log(\"Sending:\", message, \"to conversation:\", conversationId);\n    },\n    onSelectConversation: function onSelectConversation(conversation) {\n      return console.log(\"Selected conversation:\", conversation.id);\n    }\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_redux__WEBPACK_IMPORTED_MODULE_5__.Provider, {\n    store: _store__WEBPACK_IMPORTED_MODULE_2__.store\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ChatInterface, chatProps));\n}\n\n// Ensure the DOM is fully loaded before rendering\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var rootElement = document.getElementById(\"root\");\n  if (rootElement) {\n    var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(rootElement);\n    root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null)));\n  } else {\n    console.error(\"Root element not found\");\n  }\n});\n\n//# sourceURL=webpack://ReactChatInterface/./src/example.tsx?");

/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nvar m = __webpack_require__(/*! react-dom */ \"react-dom\");\nif (false) {} else {\n  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;\n  exports.createRoot = function(c, o) {\n    i.usingClientEntryPoint = true;\n    try {\n      return m.createRoot(c, o);\n    } finally {\n      i.usingClientEntryPoint = false;\n    }\n  };\n  exports.hydrateRoot = function(c, h, o) {\n    i.usingClientEntryPoint = true;\n    try {\n      return m.hydrateRoot(c, h, o);\n    } finally {\n      i.usingClientEntryPoint = false;\n    }\n  };\n}\n\n\n//# sourceURL=webpack://ReactChatInterface/./node_modules/react-dom/client.js?");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected character '@' (1:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n> @tailwind base;\\n| @tailwind components;\\n| @tailwind utilities;\");\n\n//# sourceURL=webpack://ReactChatInterface/./src/styles/globals.css?");

/***/ })

}]);
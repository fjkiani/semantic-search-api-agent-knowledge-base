"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-any-array@2.0.1";
exports.ids = ["vendor-chunks/is-any-array@2.0.1"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/is-any-array@2.0.1/node_modules/is-any-array/lib-esm/index.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/.pnpm/is-any-array@2.0.1/node_modules/is-any-array/lib-esm/index.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isAnyArray: () => (/* binding */ isAnyArray)\n/* harmony export */ });\n// eslint-disable-next-line @typescript-eslint/unbound-method\nconst toString = Object.prototype.toString;\n/**\n * Checks if an object is an instance of an Array (array or typed array, except those that contain bigint values).\n *\n * @param value - Object to check.\n * @returns True if the object is an array or a typed array.\n */\nfunction isAnyArray(value) {\n    const tag = toString.call(value);\n    return tag.endsWith('Array]') && !tag.includes('Big');\n}\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vaXMtYW55LWFycmF5QDIuMC4xL25vZGVfbW9kdWxlcy9pcy1hbnktYXJyYXkvbGliLWVzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZWdhbC1zZW1hbnRpYy1zZWFyY2gvLi9ub2RlX21vZHVsZXMvLnBucG0vaXMtYW55LWFycmF5QDIuMC4xL25vZGVfbW9kdWxlcy9pcy1hbnktYXJyYXkvbGliLWVzbS9pbmRleC5qcz9hN2VkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5ib3VuZC1tZXRob2RcbmNvbnN0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbi8qKlxuICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBhbiBpbnN0YW5jZSBvZiBhbiBBcnJheSAoYXJyYXkgb3IgdHlwZWQgYXJyYXksIGV4Y2VwdCB0aG9zZSB0aGF0IGNvbnRhaW4gYmlnaW50IHZhbHVlcykuXG4gKlxuICogQHBhcmFtIHZhbHVlIC0gT2JqZWN0IHRvIGNoZWNrLlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgb2JqZWN0IGlzIGFuIGFycmF5IG9yIGEgdHlwZWQgYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0FueUFycmF5KHZhbHVlKSB7XG4gICAgY29uc3QgdGFnID0gdG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gICAgcmV0dXJuIHRhZy5lbmRzV2l0aCgnQXJyYXldJykgJiYgIXRhZy5pbmNsdWRlcygnQmlnJyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/is-any-array@2.0.1/node_modules/is-any-array/lib-esm/index.js\n");

/***/ })

};
;
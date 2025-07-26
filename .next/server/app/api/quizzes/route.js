/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/quizzes/route";
exports.ids = ["app/api/quizzes/route"];
exports.modules = {

/***/ "(rsc)/./app/api/quizzes/route.ts":
/*!**********************************!*\
  !*** ./app/api/quizzes/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n// GET all quizzes or filter by userId\nasync function GET(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const where = {};\n        if (searchParams.get('userId')) {\n            const userId = searchParams.get('userId');\n            // Check if userId is a UUID (Supabase user ID) or integer (database user ID)\n            if (userId && userId.includes('-')) {\n                // It's a UUID, we need to find the user by email first\n                // For now, return empty array to avoid errors\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json([]);\n            } else if (userId && !isNaN(Number(userId))) {\n                // It's a valid integer (database user ID)\n                where.userId = Number(userId);\n            } else {\n                // Invalid userId, return empty array\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json([]);\n            }\n        }\n        const quizzes = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].quiz.findMany({\n            where,\n            include: {\n                user: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(quizzes);\n    } catch (error) {\n        console.error('Error fetching quizzes:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch quizzes'\n        }, {\n            status: 500\n        });\n    }\n}\n// POST create a new quiz\nasync function POST(request) {\n    const data = await request.json();\n    const quiz = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].quiz.create({\n        data: {\n            question: data.question,\n            answer: data.answer,\n            userId: data.userId\n        }\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(quiz);\n}\n// DELETE all quizzes for a user\nasync function DELETE(request) {\n    const { searchParams } = new URL(request.url);\n    const userId = searchParams.get('userId');\n    if (!userId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: 'userId required'\n    }, {\n        status: 400\n    });\n    await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].quiz.deleteMany({\n        where: {\n            userId: Number(userId)\n        }\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        success: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3F1aXp6ZXMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMkM7QUFDVDtBQUVsQyxzQ0FBc0M7QUFDL0IsZUFBZUUsSUFBSUMsT0FBZ0I7SUFDeEMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSUYsUUFBUUcsR0FBRztRQUM1QyxNQUFNQyxRQUFhLENBQUM7UUFFcEIsSUFBSUgsYUFBYUksR0FBRyxDQUFDLFdBQVc7WUFDOUIsTUFBTUMsU0FBU0wsYUFBYUksR0FBRyxDQUFDO1lBQ2hDLDZFQUE2RTtZQUM3RSxJQUFJQyxVQUFVQSxPQUFPQyxRQUFRLENBQUMsTUFBTTtnQkFDbEMsdURBQXVEO2dCQUN2RCw4Q0FBOEM7Z0JBQzlDLE9BQU9WLHFEQUFZQSxDQUFDVyxJQUFJLENBQUMsRUFBRTtZQUM3QixPQUFPLElBQUlGLFVBQVUsQ0FBQ0csTUFBTUMsT0FBT0osVUFBVTtnQkFDM0MsMENBQTBDO2dCQUMxQ0YsTUFBTUUsTUFBTSxHQUFHSSxPQUFPSjtZQUN4QixPQUFPO2dCQUNMLHFDQUFxQztnQkFDckMsT0FBT1QscURBQVlBLENBQUNXLElBQUksQ0FBQyxFQUFFO1lBQzdCO1FBQ0Y7UUFFQSxNQUFNRyxVQUFVLE1BQU1iLG1EQUFNQSxDQUFDYyxJQUFJLENBQUNDLFFBQVEsQ0FBQztZQUFFVDtZQUFPVSxTQUFTO2dCQUFFQyxNQUFNO1lBQUs7UUFBRTtRQUM1RSxPQUFPbEIscURBQVlBLENBQUNXLElBQUksQ0FBQ0c7SUFDM0IsRUFBRSxPQUFPSyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQywyQkFBMkJBO1FBQ3pDLE9BQU9uQixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO1lBQUVRLE9BQU87UUFBMEIsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDL0U7QUFDRjtBQUVBLHlCQUF5QjtBQUNsQixlQUFlQyxLQUFLbkIsT0FBZ0I7SUFDekMsTUFBTW9CLE9BQU8sTUFBTXBCLFFBQVFRLElBQUk7SUFDL0IsTUFBTUksT0FBTyxNQUFNZCxtREFBTUEsQ0FBQ2MsSUFBSSxDQUFDUyxNQUFNLENBQUM7UUFDcENELE1BQU07WUFDSkUsVUFBVUYsS0FBS0UsUUFBUTtZQUN2QkMsUUFBUUgsS0FBS0csTUFBTTtZQUNuQmpCLFFBQVFjLEtBQUtkLE1BQU07UUFDckI7SUFDRjtJQUNBLE9BQU9ULHFEQUFZQSxDQUFDVyxJQUFJLENBQUNJO0FBQzNCO0FBRUEsZ0NBQWdDO0FBQ3pCLGVBQWVZLE9BQU94QixPQUFnQjtJQUMzQyxNQUFNLEVBQUVDLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlGLFFBQVFHLEdBQUc7SUFDNUMsTUFBTUcsU0FBU0wsYUFBYUksR0FBRyxDQUFDO0lBQ2hDLElBQUksQ0FBQ0MsUUFBUSxPQUFPVCxxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO1FBQUVRLE9BQU87SUFBa0IsR0FBRztRQUFFRSxRQUFRO0lBQUk7SUFDbEYsTUFBTXBCLG1EQUFNQSxDQUFDYyxJQUFJLENBQUNhLFVBQVUsQ0FBQztRQUFFckIsT0FBTztZQUFFRSxRQUFRSSxPQUFPSjtRQUFRO0lBQUU7SUFDakUsT0FBT1QscURBQVlBLENBQUNXLElBQUksQ0FBQztRQUFFa0IsU0FBUztJQUFLO0FBQzNDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEJIVVdBTlxcRG93bmxvYWRzXFx2b2ljZW1lbnRvclxcYXBwXFxhcGlcXHF1aXp6ZXNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWEnO1xyXG5cclxuLy8gR0VUIGFsbCBxdWl6emVzIG9yIGZpbHRlciBieSB1c2VySWRcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcXVlc3QudXJsKTtcclxuICAgIGNvbnN0IHdoZXJlOiBhbnkgPSB7fTtcclxuICAgIFxyXG4gICAgaWYgKHNlYXJjaFBhcmFtcy5nZXQoJ3VzZXJJZCcpKSB7XHJcbiAgICAgIGNvbnN0IHVzZXJJZCA9IHNlYXJjaFBhcmFtcy5nZXQoJ3VzZXJJZCcpO1xyXG4gICAgICAvLyBDaGVjayBpZiB1c2VySWQgaXMgYSBVVUlEIChTdXBhYmFzZSB1c2VyIElEKSBvciBpbnRlZ2VyIChkYXRhYmFzZSB1c2VyIElEKVxyXG4gICAgICBpZiAodXNlcklkICYmIHVzZXJJZC5pbmNsdWRlcygnLScpKSB7XHJcbiAgICAgICAgLy8gSXQncyBhIFVVSUQsIHdlIG5lZWQgdG8gZmluZCB0aGUgdXNlciBieSBlbWFpbCBmaXJzdFxyXG4gICAgICAgIC8vIEZvciBub3csIHJldHVybiBlbXB0eSBhcnJheSB0byBhdm9pZCBlcnJvcnNcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oW10pO1xyXG4gICAgICB9IGVsc2UgaWYgKHVzZXJJZCAmJiAhaXNOYU4oTnVtYmVyKHVzZXJJZCkpKSB7XHJcbiAgICAgICAgLy8gSXQncyBhIHZhbGlkIGludGVnZXIgKGRhdGFiYXNlIHVzZXIgSUQpXHJcbiAgICAgICAgd2hlcmUudXNlcklkID0gTnVtYmVyKHVzZXJJZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gSW52YWxpZCB1c2VySWQsIHJldHVybiBlbXB0eSBhcnJheVxyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihbXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgcXVpenplcyA9IGF3YWl0IHByaXNtYS5xdWl6LmZpbmRNYW55KHsgd2hlcmUsIGluY2x1ZGU6IHsgdXNlcjogdHJ1ZSB9IH0pO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHF1aXp6ZXMpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBxdWl6emVzOicsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIHF1aXp6ZXMnIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBQT1NUIGNyZWF0ZSBhIG5ldyBxdWl6XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcbiAgY29uc3QgcXVpeiA9IGF3YWl0IHByaXNtYS5xdWl6LmNyZWF0ZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIHF1ZXN0aW9uOiBkYXRhLnF1ZXN0aW9uLFxyXG4gICAgICBhbnN3ZXI6IGRhdGEuYW5zd2VyLFxyXG4gICAgICB1c2VySWQ6IGRhdGEudXNlcklkXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHF1aXopO1xyXG59XHJcblxyXG4vLyBERUxFVEUgYWxsIHF1aXp6ZXMgZm9yIGEgdXNlclxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFKHJlcXVlc3Q6IFJlcXVlc3QpIHtcclxuICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybCk7XHJcbiAgY29uc3QgdXNlcklkID0gc2VhcmNoUGFyYW1zLmdldCgndXNlcklkJyk7XHJcbiAgaWYgKCF1c2VySWQpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAndXNlcklkIHJlcXVpcmVkJyB9LCB7IHN0YXR1czogNDAwIH0pO1xyXG4gIGF3YWl0IHByaXNtYS5xdWl6LmRlbGV0ZU1hbnkoeyB3aGVyZTogeyB1c2VySWQ6IE51bWJlcih1c2VySWQpIH0gfSk7XHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcclxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiR0VUIiwicmVxdWVzdCIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsIndoZXJlIiwiZ2V0IiwidXNlcklkIiwiaW5jbHVkZXMiLCJqc29uIiwiaXNOYU4iLCJOdW1iZXIiLCJxdWl6emVzIiwicXVpeiIsImZpbmRNYW55IiwiaW5jbHVkZSIsInVzZXIiLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiLCJQT1NUIiwiZGF0YSIsImNyZWF0ZSIsInF1ZXN0aW9uIiwiYW5zd2VyIiwiREVMRVRFIiwiZGVsZXRlTWFueSIsInN1Y2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/quizzes/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxTQUFTLElBQUlELHdEQUFZQTtBQUUvQixpRUFBZUMsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxCSFVXQU5cXERvd25sb2Fkc1xcdm9pY2VtZW50b3JcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuIFxuZXhwb3J0IGRlZmF1bHQgcHJpc21hOyAiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fquizzes%2Froute&page=%2Fapi%2Fquizzes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fquizzes%2Froute.ts&appDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fquizzes%2Froute&page=%2Fapi%2Fquizzes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fquizzes%2Froute.ts&appDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_BHUWAN_Downloads_voicementor_app_api_quizzes_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/quizzes/route.ts */ \"(rsc)/./app/api/quizzes/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/quizzes/route\",\n        pathname: \"/api/quizzes\",\n        filename: \"route\",\n        bundlePath: \"app/api/quizzes/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\BHUWAN\\\\Downloads\\\\voicementor\\\\app\\\\api\\\\quizzes\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_BHUWAN_Downloads_voicementor_app_api_quizzes_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZxdWl6emVzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZxdWl6emVzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcXVpenplcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNCSFVXQU4lNUNEb3dubG9hZHMlNUN2b2ljZW1lbnRvciU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDQkhVV0FOJTVDRG93bmxvYWRzJTVDdm9pY2VtZW50b3ImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3NCO0FBQ25HO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxCSFVXQU5cXFxcRG93bmxvYWRzXFxcXHZvaWNlbWVudG9yXFxcXGFwcFxcXFxhcGlcXFxccXVpenplc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcXVpenplcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3F1aXp6ZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3F1aXp6ZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxCSFVXQU5cXFxcRG93bmxvYWRzXFxcXHZvaWNlbWVudG9yXFxcXGFwcFxcXFxhcGlcXFxccXVpenplc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fquizzes%2Froute&page=%2Fapi%2Fquizzes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fquizzes%2Froute.ts&appDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fquizzes%2Froute&page=%2Fapi%2Fquizzes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fquizzes%2Froute.ts&appDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
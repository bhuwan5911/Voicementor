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
exports.id = "app/api/chat/messages/route";
exports.ids = ["app/api/chat/messages/route"];
exports.modules = {

/***/ "(rsc)/./app/api/chat/messages/route.ts":
/*!****************************************!*\
  !*** ./app/api/chat/messages/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\nconst dynamic = \"force-dynamic\";\n// GET messages for a chat session\nasync function GET(request) {\n    const { searchParams } = new URL(request.url);\n    const sessionId = searchParams.get('sessionId');\n    if (!sessionId) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'sessionId required'\n        }, {\n            status: 400\n        });\n    }\n    try {\n        const messages = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].chatMessage.findMany({\n            where: {\n                sessionId: Number(sessionId)\n            },\n            include: {\n                sender: {\n                    select: {\n                        id: true,\n                        name: true,\n                        email: true\n                    }\n                }\n            },\n            orderBy: {\n                createdAt: 'asc'\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(messages);\n    } catch (error) {\n        console.error('Error fetching messages:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch messages'\n        }, {\n            status: 500\n        });\n    }\n}\n// POST create a new message\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const { sessionId, senderId, originalText, translatedText, originalLanguage, translatedLanguage, isVoice } = body;\n        if (!sessionId || !senderId || !originalText || !translatedText) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Missing required fields'\n            }, {\n                status: 400\n            });\n        }\n        const message = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].chatMessage.create({\n            data: {\n                sessionId: Number(sessionId),\n                senderId: Number(senderId),\n                originalText,\n                translatedText,\n                originalLanguage,\n                translatedLanguage,\n                isVoice: isVoice || false\n            },\n            include: {\n                sender: {\n                    select: {\n                        id: true,\n                        name: true,\n                        email: true\n                    }\n                }\n            }\n        });\n        // Update session's updatedAt timestamp\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].chatSession.update({\n            where: {\n                id: Number(sessionId)\n            },\n            data: {\n                updatedAt: new Date()\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(message);\n    } catch (error) {\n        console.error('Error creating message:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to create message'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvbWVzc2FnZXMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMkM7QUFDVDtBQUUzQixNQUFNRSxVQUFVLGdCQUFnQjtBQUV2QyxrQ0FBa0M7QUFDM0IsZUFBZUMsSUFBSUMsT0FBZ0I7SUFDeEMsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJRixRQUFRRyxHQUFHO0lBQzVDLE1BQU1DLFlBQVlILGFBQWFJLEdBQUcsQ0FBQztJQUVuQyxJQUFJLENBQUNELFdBQVc7UUFDZCxPQUFPUixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBcUIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDMUU7SUFFQSxJQUFJO1FBQ0YsTUFBTUMsV0FBVyxNQUFNWixtREFBTUEsQ0FBQ2EsV0FBVyxDQUFDQyxRQUFRLENBQUM7WUFDakRDLE9BQU87Z0JBQ0xSLFdBQVdTLE9BQU9UO1lBQ3BCO1lBQ0FVLFNBQVM7Z0JBQ1BDLFFBQVE7b0JBQ05DLFFBQVE7d0JBQ05DLElBQUk7d0JBQ0pDLE1BQU07d0JBQ05DLE9BQU87b0JBQ1Q7Z0JBQ0Y7WUFDRjtZQUNBQyxTQUFTO2dCQUNQQyxXQUFXO1lBQ2I7UUFDRjtRQUVBLE9BQU96QixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDRztJQUMzQixFQUFFLE9BQU9GLE9BQU87UUFDZGUsUUFBUWYsS0FBSyxDQUFDLDRCQUE0QkE7UUFDMUMsT0FBT1gscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQTJCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ2hGO0FBQ0Y7QUFFQSw0QkFBNEI7QUFDckIsZUFBZWUsS0FBS3ZCLE9BQWdCO0lBQ3pDLElBQUk7UUFDRixNQUFNd0IsT0FBTyxNQUFNeEIsUUFBUU0sSUFBSTtRQUMvQixNQUFNLEVBQ0pGLFNBQVMsRUFDVHFCLFFBQVEsRUFDUkMsWUFBWSxFQUNaQyxjQUFjLEVBQ2RDLGdCQUFnQixFQUNoQkMsa0JBQWtCLEVBQ2xCQyxPQUFPLEVBQ1IsR0FBR047UUFFSixJQUFJLENBQUNwQixhQUFhLENBQUNxQixZQUFZLENBQUNDLGdCQUFnQixDQUFDQyxnQkFBZ0I7WUFDL0QsT0FBTy9CLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBMEIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQy9FO1FBRUEsTUFBTXVCLFVBQVUsTUFBTWxDLG1EQUFNQSxDQUFDYSxXQUFXLENBQUNzQixNQUFNLENBQUM7WUFDOUNDLE1BQU07Z0JBQ0o3QixXQUFXUyxPQUFPVDtnQkFDbEJxQixVQUFVWixPQUFPWTtnQkFDakJDO2dCQUNBQztnQkFDQUM7Z0JBQ0FDO2dCQUNBQyxTQUFTQSxXQUFXO1lBQ3RCO1lBQ0FoQixTQUFTO2dCQUNQQyxRQUFRO29CQUNOQyxRQUFRO3dCQUNOQyxJQUFJO3dCQUNKQyxNQUFNO3dCQUNOQyxPQUFPO29CQUNUO2dCQUNGO1lBQ0Y7UUFDRjtRQUVBLHVDQUF1QztRQUN2QyxNQUFNdEIsbURBQU1BLENBQUNxQyxXQUFXLENBQUNDLE1BQU0sQ0FBQztZQUM5QnZCLE9BQU87Z0JBQUVLLElBQUlKLE9BQU9UO1lBQVc7WUFDL0I2QixNQUFNO2dCQUFFRyxXQUFXLElBQUlDO1lBQU87UUFDaEM7UUFFQSxPQUFPekMscURBQVlBLENBQUNVLElBQUksQ0FBQ3lCO0lBQzNCLEVBQUUsT0FBT3hCLE9BQU87UUFDZGUsUUFBUWYsS0FBSyxDQUFDLDJCQUEyQkE7UUFDekMsT0FBT1gscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQTJCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ2hGO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQkhVV0FOXFxEb3dubG9hZHNcXHZvaWNlbWVudG9yXFxhcHBcXGFwaVxcY2hhdFxcbWVzc2FnZXNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWEnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGR5bmFtaWMgPSBcImZvcmNlLWR5bmFtaWNcIjtcclxuXHJcbi8vIEdFVCBtZXNzYWdlcyBmb3IgYSBjaGF0IHNlc3Npb25cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xyXG4gIGNvbnN0IHNlc3Npb25JZCA9IHNlYXJjaFBhcmFtcy5nZXQoJ3Nlc3Npb25JZCcpO1xyXG4gIFxyXG4gIGlmICghc2Vzc2lvbklkKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ3Nlc3Npb25JZCByZXF1aXJlZCcgfSwgeyBzdGF0dXM6IDQwMCB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IHByaXNtYS5jaGF0TWVzc2FnZS5maW5kTWFueSh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgc2Vzc2lvbklkOiBOdW1iZXIoc2Vzc2lvbklkKVxyXG4gICAgICB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgc2VuZGVyOiB7XHJcbiAgICAgICAgICBzZWxlY3Q6IHtcclxuICAgICAgICAgICAgaWQ6IHRydWUsXHJcbiAgICAgICAgICAgIG5hbWU6IHRydWUsXHJcbiAgICAgICAgICAgIGVtYWlsOiB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgY3JlYXRlZEF0OiAnYXNjJ1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG1lc3NhZ2VzKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgbWVzc2FnZXM6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggbWVzc2FnZXMnIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBQT1NUIGNyZWF0ZSBhIG5ldyBtZXNzYWdlXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG4gICAgY29uc3QgeyBcclxuICAgICAgc2Vzc2lvbklkLCBcclxuICAgICAgc2VuZGVySWQsIFxyXG4gICAgICBvcmlnaW5hbFRleHQsIFxyXG4gICAgICB0cmFuc2xhdGVkVGV4dCwgXHJcbiAgICAgIG9yaWdpbmFsTGFuZ3VhZ2UsIFxyXG4gICAgICB0cmFuc2xhdGVkTGFuZ3VhZ2UsXHJcbiAgICAgIGlzVm9pY2UgXHJcbiAgICB9ID0gYm9keTtcclxuXHJcbiAgICBpZiAoIXNlc3Npb25JZCB8fCAhc2VuZGVySWQgfHwgIW9yaWdpbmFsVGV4dCB8fCAhdHJhbnNsYXRlZFRleHQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdNaXNzaW5nIHJlcXVpcmVkIGZpZWxkcycgfSwgeyBzdGF0dXM6IDQwMCB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgcHJpc21hLmNoYXRNZXNzYWdlLmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzZXNzaW9uSWQ6IE51bWJlcihzZXNzaW9uSWQpLFxyXG4gICAgICAgIHNlbmRlcklkOiBOdW1iZXIoc2VuZGVySWQpLFxyXG4gICAgICAgIG9yaWdpbmFsVGV4dCxcclxuICAgICAgICB0cmFuc2xhdGVkVGV4dCxcclxuICAgICAgICBvcmlnaW5hbExhbmd1YWdlLFxyXG4gICAgICAgIHRyYW5zbGF0ZWRMYW5ndWFnZSxcclxuICAgICAgICBpc1ZvaWNlOiBpc1ZvaWNlIHx8IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICBzZW5kZXI6IHtcclxuICAgICAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgICAgICBpZDogdHJ1ZSxcclxuICAgICAgICAgICAgbmFtZTogdHJ1ZSxcclxuICAgICAgICAgICAgZW1haWw6IHRydWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBzZXNzaW9uJ3MgdXBkYXRlZEF0IHRpbWVzdGFtcFxyXG4gICAgYXdhaXQgcHJpc21hLmNoYXRTZXNzaW9uLnVwZGF0ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiBOdW1iZXIoc2Vzc2lvbklkKSB9LFxyXG4gICAgICBkYXRhOiB7IHVwZGF0ZWRBdDogbmV3IERhdGUoKSB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obWVzc2FnZSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nIG1lc3NhZ2U6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gY3JlYXRlIG1lc3NhZ2UnIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJkeW5hbWljIiwiR0VUIiwicmVxdWVzdCIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInNlc3Npb25JZCIsImdldCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsIm1lc3NhZ2VzIiwiY2hhdE1lc3NhZ2UiLCJmaW5kTWFueSIsIndoZXJlIiwiTnVtYmVyIiwiaW5jbHVkZSIsInNlbmRlciIsInNlbGVjdCIsImlkIiwibmFtZSIsImVtYWlsIiwib3JkZXJCeSIsImNyZWF0ZWRBdCIsImNvbnNvbGUiLCJQT1NUIiwiYm9keSIsInNlbmRlcklkIiwib3JpZ2luYWxUZXh0IiwidHJhbnNsYXRlZFRleHQiLCJvcmlnaW5hbExhbmd1YWdlIiwidHJhbnNsYXRlZExhbmd1YWdlIiwiaXNWb2ljZSIsIm1lc3NhZ2UiLCJjcmVhdGUiLCJkYXRhIiwiY2hhdFNlc3Npb24iLCJ1cGRhdGUiLCJ1cGRhdGVkQXQiLCJEYXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/messages/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        'query',\n        'error',\n        'warn'\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBSXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxDQUFDO0lBQ3hESSxLQUFLO1FBQUM7UUFBUztRQUFTO0tBQU87QUFDakM7QUFFQSxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQkhVV0FOXFxEb3dubG9hZHNcXHZvaWNlbWVudG9yXFxsaWJcXHByaXNtYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufTtcblxuY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/PyBuZXcgUHJpc21hQ2xpZW50KHtcbiAgbG9nOiBbJ3F1ZXJ5JywgJ2Vycm9yJywgJ3dhcm4nXSxcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hOyAiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fmessages%2Froute&page=%2Fapi%2Fchat%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fmessages%2Froute.ts&appDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fmessages%2Froute&page=%2Fapi%2Fchat%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fmessages%2Froute.ts&appDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_BHUWAN_Downloads_voicementor_app_api_chat_messages_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/messages/route.ts */ \"(rsc)/./app/api/chat/messages/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/messages/route\",\n        pathname: \"/api/chat/messages\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/messages/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\BHUWAN\\\\Downloads\\\\voicementor\\\\app\\\\api\\\\chat\\\\messages\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_BHUWAN_Downloads_voicementor_app_api_chat_messages_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGbWVzc2FnZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmNoYXQlMkZtZXNzYWdlcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmNoYXQlMkZtZXNzYWdlcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNCSFVXQU4lNUNEb3dubG9hZHMlNUN2b2ljZW1lbnRvciU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDQkhVV0FOJTVDRG93bmxvYWRzJTVDdm9pY2VtZW50b3ImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzZCO0FBQzFHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxCSFVXQU5cXFxcRG93bmxvYWRzXFxcXHZvaWNlbWVudG9yXFxcXGFwcFxcXFxhcGlcXFxcY2hhdFxcXFxtZXNzYWdlc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY2hhdC9tZXNzYWdlcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NoYXQvbWVzc2FnZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NoYXQvbWVzc2FnZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxCSFVXQU5cXFxcRG93bmxvYWRzXFxcXHZvaWNlbWVudG9yXFxcXGFwcFxcXFxhcGlcXFxcY2hhdFxcXFxtZXNzYWdlc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fmessages%2Froute&page=%2Fapi%2Fchat%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fmessages%2Froute.ts&appDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fmessages%2Froute&page=%2Fapi%2Fchat%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fmessages%2Froute.ts&appDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
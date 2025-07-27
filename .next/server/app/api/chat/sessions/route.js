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
exports.id = "app/api/chat/sessions/route";
exports.ids = ["app/api/chat/sessions/route"];
exports.modules = {

/***/ "(rsc)/./app/api/chat/sessions/route.ts":
/*!****************************************!*\
  !*** ./app/api/chat/sessions/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\nconst dynamic = \"force-dynamic\";\n// GET all chat sessions for a user\nasync function GET(request) {\n    const { searchParams } = new URL(request.url);\n    const userId = searchParams.get('userId');\n    if (!userId) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'userId required'\n        }, {\n            status: 400\n        });\n    }\n    try {\n        const sessions = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].chatSession.findMany({\n            where: {\n                participants: {\n                    some: {\n                        userId: Number(userId)\n                    }\n                }\n            },\n            include: {\n                participants: {\n                    include: {\n                        user: {\n                            select: {\n                                id: true,\n                                name: true,\n                                email: true\n                            }\n                        }\n                    }\n                },\n                messages: {\n                    orderBy: {\n                        createdAt: 'desc'\n                    },\n                    take: 1\n                }\n            },\n            orderBy: {\n                updatedAt: 'desc'\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(sessions);\n    } catch (error) {\n        console.error('Error fetching chat sessions:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch chat sessions'\n        }, {\n            status: 500\n        });\n    }\n}\n// POST create a new chat session\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const { name, participants } = body;\n        if (!participants || participants.length === 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'At least one participant required'\n            }, {\n                status: 400\n            });\n        }\n        const session = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].chatSession.create({\n            data: {\n                name: name || `Chat Session ${new Date().toLocaleString()}`,\n                participants: {\n                    create: participants.map((participant)=>({\n                            userId: participant.userId,\n                            role: participant.role,\n                            language: participant.language\n                        }))\n                }\n            },\n            include: {\n                participants: {\n                    include: {\n                        user: {\n                            select: {\n                                id: true,\n                                name: true,\n                                email: true\n                            }\n                        }\n                    }\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(session);\n    } catch (error) {\n        console.error('Error creating chat session:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to create chat session'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvc2Vzc2lvbnMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMkM7QUFDVDtBQUUzQixNQUFNRSxVQUFVLGdCQUFnQjtBQUV2QyxtQ0FBbUM7QUFDNUIsZUFBZUMsSUFBSUMsT0FBZ0I7SUFDeEMsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJRixRQUFRRyxHQUFHO0lBQzVDLE1BQU1DLFNBQVNILGFBQWFJLEdBQUcsQ0FBQztJQUVoQyxJQUFJLENBQUNELFFBQVE7UUFDWCxPQUFPUixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBa0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDdkU7SUFFQSxJQUFJO1FBQ0YsTUFBTUMsV0FBVyxNQUFNWixtREFBTUEsQ0FBQ2EsV0FBVyxDQUFDQyxRQUFRLENBQUM7WUFDakRDLE9BQU87Z0JBQ0xDLGNBQWM7b0JBQ1pDLE1BQU07d0JBQ0pWLFFBQVFXLE9BQU9YO29CQUNqQjtnQkFDRjtZQUNGO1lBQ0FZLFNBQVM7Z0JBQ1BILGNBQWM7b0JBQ1pHLFNBQVM7d0JBQ1BDLE1BQU07NEJBQ0pDLFFBQVE7Z0NBQ05DLElBQUk7Z0NBQ0pDLE1BQU07Z0NBQ05DLE9BQU87NEJBQ1Q7d0JBQ0Y7b0JBQ0Y7Z0JBQ0Y7Z0JBQ0FDLFVBQVU7b0JBQ1JDLFNBQVM7d0JBQ1BDLFdBQVc7b0JBQ2I7b0JBQ0FDLE1BQU07Z0JBQ1I7WUFDRjtZQUNBRixTQUFTO2dCQUNQRyxXQUFXO1lBQ2I7UUFDRjtRQUVBLE9BQU85QixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDRztJQUMzQixFQUFFLE9BQU9GLE9BQU87UUFDZG9CLFFBQVFwQixLQUFLLENBQUMsaUNBQWlDQTtRQUMvQyxPQUFPWCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBZ0MsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDckY7QUFDRjtBQUVBLGlDQUFpQztBQUMxQixlQUFlb0IsS0FBSzVCLE9BQWdCO0lBQ3pDLElBQUk7UUFDRixNQUFNNkIsT0FBTyxNQUFNN0IsUUFBUU0sSUFBSTtRQUMvQixNQUFNLEVBQUVjLElBQUksRUFBRVAsWUFBWSxFQUFFLEdBQUdnQjtRQUUvQixJQUFJLENBQUNoQixnQkFBZ0JBLGFBQWFpQixNQUFNLEtBQUssR0FBRztZQUM5QyxPQUFPbEMscURBQVlBLENBQUNVLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFvQyxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDekY7UUFFQSxNQUFNdUIsVUFBVSxNQUFNbEMsbURBQU1BLENBQUNhLFdBQVcsQ0FBQ3NCLE1BQU0sQ0FBQztZQUM5Q0MsTUFBTTtnQkFDSmIsTUFBTUEsUUFBUSxDQUFDLGFBQWEsRUFBRSxJQUFJYyxPQUFPQyxjQUFjLElBQUk7Z0JBQzNEdEIsY0FBYztvQkFDWm1CLFFBQVFuQixhQUFhdUIsR0FBRyxDQUFDLENBQUNDLGNBQXNCOzRCQUM5Q2pDLFFBQVFpQyxZQUFZakMsTUFBTTs0QkFDMUJrQyxNQUFNRCxZQUFZQyxJQUFJOzRCQUN0QkMsVUFBVUYsWUFBWUUsUUFBUTt3QkFDaEM7Z0JBQ0Y7WUFDRjtZQUNBdkIsU0FBUztnQkFDUEgsY0FBYztvQkFDWkcsU0FBUzt3QkFDUEMsTUFBTTs0QkFDSkMsUUFBUTtnQ0FDTkMsSUFBSTtnQ0FDSkMsTUFBTTtnQ0FDTkMsT0FBTzs0QkFDVDt3QkFDRjtvQkFDRjtnQkFDRjtZQUNGO1FBQ0Y7UUFFQSxPQUFPekIscURBQVlBLENBQUNVLElBQUksQ0FBQ3lCO0lBQzNCLEVBQUUsT0FBT3hCLE9BQU87UUFDZG9CLFFBQVFwQixLQUFLLENBQUMsZ0NBQWdDQTtRQUM5QyxPQUFPWCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBZ0MsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDckY7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxCSFVXQU5cXERvd25sb2Fkc1xcdm9pY2VtZW50b3JcXGFwcFxcYXBpXFxjaGF0XFxzZXNzaW9uc1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgcHJpc21hIGZyb20gJ0AvbGliL3ByaXNtYSc7XHJcblxyXG5leHBvcnQgY29uc3QgZHluYW1pYyA9IFwiZm9yY2UtZHluYW1pY1wiO1xyXG5cclxuLy8gR0VUIGFsbCBjaGF0IHNlc3Npb25zIGZvciBhIHVzZXJcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xyXG4gIGNvbnN0IHVzZXJJZCA9IHNlYXJjaFBhcmFtcy5nZXQoJ3VzZXJJZCcpO1xyXG4gIFxyXG4gIGlmICghdXNlcklkKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ3VzZXJJZCByZXF1aXJlZCcgfSwgeyBzdGF0dXM6IDQwMCB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZXNzaW9ucyA9IGF3YWl0IHByaXNtYS5jaGF0U2Vzc2lvbi5maW5kTWFueSh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgcGFydGljaXBhbnRzOiB7XHJcbiAgICAgICAgICBzb21lOiB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogTnVtYmVyKHVzZXJJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICBwYXJ0aWNpcGFudHM6IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogJ2Rlc2MnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdGFrZTogMVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgIHVwZGF0ZWRBdDogJ2Rlc2MnXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oc2Vzc2lvbnMpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBjaGF0IHNlc3Npb25zOicsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIGNoYXQgc2Vzc2lvbnMnIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBQT1NUIGNyZWF0ZSBhIG5ldyBjaGF0IHNlc3Npb25cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcbiAgICBjb25zdCB7IG5hbWUsIHBhcnRpY2lwYW50cyB9ID0gYm9keTtcclxuXHJcbiAgICBpZiAoIXBhcnRpY2lwYW50cyB8fCBwYXJ0aWNpcGFudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnQXQgbGVhc3Qgb25lIHBhcnRpY2lwYW50IHJlcXVpcmVkJyB9LCB7IHN0YXR1czogNDAwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBwcmlzbWEuY2hhdFNlc3Npb24uY3JlYXRlKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIG5hbWU6IG5hbWUgfHwgYENoYXQgU2Vzc2lvbiAke25ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKX1gLFxyXG4gICAgICAgIHBhcnRpY2lwYW50czoge1xyXG4gICAgICAgICAgY3JlYXRlOiBwYXJ0aWNpcGFudHMubWFwKChwYXJ0aWNpcGFudDogYW55KSA9PiAoe1xyXG4gICAgICAgICAgICB1c2VySWQ6IHBhcnRpY2lwYW50LnVzZXJJZCxcclxuICAgICAgICAgICAgcm9sZTogcGFydGljaXBhbnQucm9sZSxcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6IHBhcnRpY2lwYW50Lmxhbmd1YWdlXHJcbiAgICAgICAgICB9KSlcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICBwYXJ0aWNpcGFudHM6IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihzZXNzaW9uKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgY2hhdCBzZXNzaW9uOicsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGNyZWF0ZSBjaGF0IHNlc3Npb24nIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJkeW5hbWljIiwiR0VUIiwicmVxdWVzdCIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInVzZXJJZCIsImdldCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInNlc3Npb25zIiwiY2hhdFNlc3Npb24iLCJmaW5kTWFueSIsIndoZXJlIiwicGFydGljaXBhbnRzIiwic29tZSIsIk51bWJlciIsImluY2x1ZGUiLCJ1c2VyIiwic2VsZWN0IiwiaWQiLCJuYW1lIiwiZW1haWwiLCJtZXNzYWdlcyIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJ0YWtlIiwidXBkYXRlZEF0IiwiY29uc29sZSIsIlBPU1QiLCJib2R5IiwibGVuZ3RoIiwic2Vzc2lvbiIsImNyZWF0ZSIsImRhdGEiLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJtYXAiLCJwYXJ0aWNpcGFudCIsInJvbGUiLCJsYW5ndWFnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/sessions/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        'query',\n        'error',\n        'warn'\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBSXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxDQUFDO0lBQ3hESSxLQUFLO1FBQUM7UUFBUztRQUFTO0tBQU87QUFDakM7QUFFQSxJQUFJQyxJQUFxQyxFQUFFSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQkhVV0FOXFxEb3dubG9hZHNcXHZvaWNlbWVudG9yXFxsaWJcXHByaXNtYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufTtcblxuY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/PyBuZXcgUHJpc21hQ2xpZW50KHtcbiAgbG9nOiBbJ3F1ZXJ5JywgJ2Vycm9yJywgJ3dhcm4nXSxcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hOyAiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fsessions%2Froute&page=%2Fapi%2Fchat%2Fsessions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fsessions%2Froute.ts&appDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fsessions%2Froute&page=%2Fapi%2Fchat%2Fsessions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fsessions%2Froute.ts&appDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_BHUWAN_Downloads_voicementor_app_api_chat_sessions_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/sessions/route.ts */ \"(rsc)/./app/api/chat/sessions/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/sessions/route\",\n        pathname: \"/api/chat/sessions\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/sessions/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\BHUWAN\\\\Downloads\\\\voicementor\\\\app\\\\api\\\\chat\\\\sessions\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_BHUWAN_Downloads_voicementor_app_api_chat_sessions_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGc2Vzc2lvbnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmNoYXQlMkZzZXNzaW9ucyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmNoYXQlMkZzZXNzaW9ucyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNCSFVXQU4lNUNEb3dubG9hZHMlNUN2b2ljZW1lbnRvciU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDQkhVV0FOJTVDRG93bmxvYWRzJTVDdm9pY2VtZW50b3ImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzZCO0FBQzFHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxCSFVXQU5cXFxcRG93bmxvYWRzXFxcXHZvaWNlbWVudG9yXFxcXGFwcFxcXFxhcGlcXFxcY2hhdFxcXFxzZXNzaW9uc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY2hhdC9zZXNzaW9ucy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NoYXQvc2Vzc2lvbnNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NoYXQvc2Vzc2lvbnMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxCSFVXQU5cXFxcRG93bmxvYWRzXFxcXHZvaWNlbWVudG9yXFxcXGFwcFxcXFxhcGlcXFxcY2hhdFxcXFxzZXNzaW9uc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fsessions%2Froute&page=%2Fapi%2Fchat%2Fsessions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fsessions%2Froute.ts&appDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Fsessions%2Froute&page=%2Fapi%2Fchat%2Fsessions%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Fsessions%2Froute.ts&appDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CBHUWAN%5CDownloads%5Cvoicementor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
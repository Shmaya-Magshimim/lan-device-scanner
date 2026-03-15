module.exports = [
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/scans/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { jsxDEV: _jsxDEV } = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
{
    devices.map((dev, idx)=>/*#__PURE__*/ _jsxDEV("div", {
            // This is the trigger
            onClick: ()=>handleDeviceClick(dev),
            // cursor-pointer is essential for the "hand" icon
            // z-10 ensures it's above the background
            className: "relative z-10 bg-white p-6 rounded-3xl shadow-sm border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer group active:scale-95",
            children: [
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "flex justify-between items-start mb-6",
                    children: [
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "bg-slate-100 p-4 rounded-2xl text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all",
                            children: /*#__PURE__*/ _jsxDEV(Monitor, {
                                className: "w-8 h-8"
                            }, void 0, false, {
                                fileName: "[project]/src/app/scans/page.tsx",
                                lineNumber: 14,
                                columnNumber: 21
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        }, void 0, false, {
                            fileName: "[project]/src/app/scans/page.tsx",
                            lineNumber: 12,
                            columnNumber: 17
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "px-2 py-1 rounded-lg bg-green-50 text-green-600 text-[10px] font-black uppercase",
                            children: dev.state || 'up'
                        }, void 0, false, {
                            fileName: "[project]/src/app/scans/page.tsx",
                            lineNumber: 16,
                            columnNumber: 17
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/scans/page.tsx",
                    lineNumber: 11,
                    columnNumber: 13
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV("h3", {
                    className: "font-black text-slate-900 text-xl mb-1 truncate",
                    children: dev.device_guess || "Unknown Node"
                }, void 0, false, {
                    fileName: "[project]/src/app/scans/page.tsx",
                    lineNumber: 21,
                    columnNumber: 13
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV("p", {
                    className: "text-blue-600 font-mono font-bold text-sm",
                    children: dev.ip4
                }, void 0, false, {
                    fileName: "[project]/src/app/scans/page.tsx",
                    lineNumber: 25,
                    columnNumber: 13
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "mt-6 pt-6 border-t border-slate-50 flex items-center justify-between pointer-events-none",
                    children: [
                        /*#__PURE__*/ _jsxDEV("span", {
                            className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest",
                            children: "Details"
                        }, void 0, false, {
                            fileName: "[project]/src/app/scans/page.tsx",
                            lineNumber: 31,
                            columnNumber: 17
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV(ChevronRight, {
                            className: "w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                        }, void 0, false, {
                            fileName: "[project]/src/app/scans/page.tsx",
                            lineNumber: 32,
                            columnNumber: 17
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/scans/page.tsx",
                    lineNumber: 30,
                    columnNumber: 13
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
            ]
        }, dev.id || idx, true, {
            fileName: "[project]/src/app/scans/page.tsx",
            lineNumber: 3,
            columnNumber: 9
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e));
}}),
"[project]/src/app/scans/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/scans/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__df1db894._.js.map
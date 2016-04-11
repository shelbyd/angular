'use strict';var lang_1 = require('angular2/src/facade/lang');
var di_1 = require('angular2/src/core/di');
var xhr_1 = require('angular2/src/compiler/xhr');
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var testability_1 = require('angular2/src/core/testability/testability');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var dom_events_1 = require('angular2/src/platform/dom/events/dom_events');
var key_events_1 = require('angular2/src/platform/dom/events/key_events');
var hammer_gestures_1 = require('angular2/src/platform/dom/events/hammer_gestures');
var dom_tokens_1 = require('angular2/src/platform/dom/dom_tokens');
var dom_renderer_1 = require('angular2/src/platform/dom/dom_renderer');
var shared_styles_host_1 = require('angular2/src/platform/dom/shared_styles_host');
var shared_styles_host_2 = require('angular2/src/platform/dom/shared_styles_host');
var browser_details_1 = require('angular2/src/animate/browser_details');
var animation_builder_1 = require('angular2/src/animate/animation_builder');
var browser_adapter_1 = require('./browser/browser_adapter');
var testability_2 = require('angular2/src/platform/browser/testability');
var xhr_cache_1 = require('angular2/src/platform/browser/xhr_cache');
var wtf_init_1 = require('angular2/src/core/profile/wtf_init');
var event_manager_1 = require('angular2/src/platform/dom/events/event_manager');
var hammer_gestures_2 = require('angular2/src/platform/dom/events/hammer_gestures');
var common_dom_1 = require('angular2/platform/common_dom');
var dom_tokens_2 = require('angular2/src/platform/dom/dom_tokens');
exports.DOCUMENT = dom_tokens_2.DOCUMENT;
var title_1 = require('angular2/src/platform/browser/title');
exports.Title = title_1.Title;
var common_dom_2 = require('angular2/platform/common_dom');
exports.ELEMENT_PROBE_PROVIDERS = common_dom_2.ELEMENT_PROBE_PROVIDERS;
exports.ELEMENT_PROBE_PROVIDERS_PROD_MODE = common_dom_2.ELEMENT_PROBE_PROVIDERS_PROD_MODE;
exports.inspectNativeElement = common_dom_2.inspectNativeElement;
exports.By = common_dom_2.By;
var browser_adapter_2 = require('./browser/browser_adapter');
exports.BrowserDomAdapter = browser_adapter_2.BrowserDomAdapter;
var tools_1 = require('angular2/src/platform/browser/tools/tools');
exports.enableDebugTools = tools_1.enableDebugTools;
exports.disableDebugTools = tools_1.disableDebugTools;
var hammer_gestures_3 = require('./dom/events/hammer_gestures');
exports.HAMMER_GESTURE_CONFIG = hammer_gestures_3.HAMMER_GESTURE_CONFIG;
exports.HammerGestureConfig = hammer_gestures_3.HammerGestureConfig;
/**
 * A set of providers to initialize the Angular platform in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link platform}.
 */
exports.BROWSER_PROVIDERS = lang_1.CONST_EXPR([
    core_1.PLATFORM_COMMON_PROVIDERS,
    new di_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initDomAdapter, multi: true }),
]);
function _exceptionHandler() {
    // !IS_DART is required because we must rethrow exceptions in JS,
    // but must not rethrow exceptions in Dart
    return new core_1.ExceptionHandler(dom_adapter_1.DOM, !lang_1.IS_DART);
}
function _document() {
    return dom_adapter_1.DOM.defaultDoc();
}
/**
 * A set of providers to initialize an Angular application in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef.application}.
 */
exports.BROWSER_APP_COMMON_PROVIDERS = lang_1.CONST_EXPR([
    core_1.APPLICATION_COMMON_PROVIDERS, common_1.FORM_PROVIDERS,
    new di_1.Provider(core_1.PLATFORM_PIPES, { useValue: common_1.COMMON_PIPES, multi: true }),
    new di_1.Provider(core_1.PLATFORM_DIRECTIVES, { useValue: common_1.COMMON_DIRECTIVES, multi: true }),
    new di_1.Provider(core_1.ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
    new di_1.Provider(dom_tokens_1.DOCUMENT, { useFactory: _document, deps: [] }),
    new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true }),
    new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: key_events_1.KeyEventsPlugin, multi: true }),
    new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true }),
    new di_1.Provider(hammer_gestures_2.HAMMER_GESTURE_CONFIG, { useClass: hammer_gestures_2.HammerGestureConfig }),
    new di_1.Provider(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
    new di_1.Provider(core_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
    new di_1.Provider(shared_styles_host_2.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }), shared_styles_host_1.DomSharedStylesHost,
    testability_1.Testability, browser_details_1.BrowserDetails, animation_builder_1.AnimationBuilder, event_manager_1.EventManager, common_dom_1.ELEMENT_PROBE_PROVIDERS
]);
exports.CACHED_TEMPLATE_PROVIDER = lang_1.CONST_EXPR([new di_1.Provider(xhr_1.XHR, { useClass: xhr_cache_1.CachedXHR })]);
function initDomAdapter() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    wtf_init_1.wtfInit();
    testability_2.BrowserGetTestability.init();
}
exports.initDomAdapter = initDomAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVYzdjBWSkZILnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlcl9jb21tb24udHMiXSwibmFtZXMiOlsiX2V4Y2VwdGlvbkhhbmRsZXIiLCJfZG9jdW1lbnQiLCJpbml0RG9tQWRhcHRlciJdLCJtYXBwaW5ncyI6IkFBQUEscUJBQWtDLDBCQUEwQixDQUFDLENBQUE7QUFDN0QsbUJBQXVELHNCQUFzQixDQUFDLENBQUE7QUFDOUUsb0JBQWtCLDJCQUEyQixDQUFDLENBQUE7QUFDOUMscUJBQStNLGVBQWUsQ0FBQyxDQUFBO0FBQy9OLHVCQUE4RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hGLDRCQUEwQiwyQ0FBMkMsQ0FBQyxDQUFBO0FBQ3RFLDRCQUFrQix1Q0FBdUMsQ0FBQyxDQUFBO0FBQzFELDJCQUE4Qiw2Q0FBNkMsQ0FBQyxDQUFBO0FBQzVFLDJCQUE4Qiw2Q0FBNkMsQ0FBQyxDQUFBO0FBQzVFLGdDQUFtQyxrREFBa0QsQ0FBQyxDQUFBO0FBQ3RGLDJCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELDZCQUFnRCx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3pGLG1DQUFrQyw4Q0FBOEMsQ0FBQyxDQUFBO0FBQ2pGLG1DQUErQiw4Q0FBOEMsQ0FBQyxDQUFBO0FBQzlFLGdDQUE2QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQ3BFLGtDQUErQix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3hFLGdDQUFnQywyQkFBMkIsQ0FBQyxDQUFBO0FBQzVELDRCQUFvQywyQ0FBMkMsQ0FBQyxDQUFBO0FBQ2hGLDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLHlCQUFzQixvQ0FBb0MsQ0FBQyxDQUFBO0FBQzNELDhCQUFrRCxnREFBZ0QsQ0FBQyxDQUFBO0FBQ25HLGdDQUF5RCxrREFBa0QsQ0FBQyxDQUFBO0FBQzVHLDJCQUFzQyw4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QSxrQkFBT0EsRUFBRUEsQ0FBQ0E7SUFDVkEsbUNBQXFCQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtBQUMvQkEsQ0FBQ0E7QUFKZSxzQkFBYyxpQkFJN0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1RfRVhQUiwgSVNfREFSVH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7cHJvdmlkZSwgUHJvdmlkZXIsIEluamVjdG9yLCBPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci94aHInO1xuaW1wb3J0IHtQTEFURk9STV9JTklUSUFMSVpFUiwgUExBVEZPUk1fRElSRUNUSVZFUywgUExBVEZPUk1fUElQRVMsIENvbXBvbmVudFJlZiwgcGxhdGZvcm0sIEV4Y2VwdGlvbkhhbmRsZXIsIFJlZmxlY3RvciwgUm9vdFJlbmRlcmVyLCByZWZsZWN0b3IsIEFQUExJQ0FUSU9OX0NPTU1PTl9QUk9WSURFUlMsIFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtDT01NT05fRElSRUNUSVZFUywgQ09NTU9OX1BJUEVTLCBGT1JNX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcbmltcG9ydCB7VGVzdGFiaWxpdHl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3Rlc3RhYmlsaXR5L3Rlc3RhYmlsaXR5JztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7RG9tRXZlbnRzUGx1Z2lufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9kb21fZXZlbnRzJztcbmltcG9ydCB7S2V5RXZlbnRzUGx1Z2lufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9rZXlfZXZlbnRzJztcbmltcG9ydCB7SGFtbWVyR2VzdHVyZXNQbHVnaW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2hhbW1lcl9nZXN0dXJlcyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV90b2tlbnMnO1xuaW1wb3J0IHtEb21Sb290UmVuZGVyZXIsIERvbVJvb3RSZW5kZXJlcl99IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3JlbmRlcmVyJztcbmltcG9ydCB7RG9tU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuaW1wb3J0IHtTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5pbXBvcnQge0Jyb3dzZXJEZXRhaWxzfSBmcm9tICdhbmd1bGFyMi9zcmMvYW5pbWF0ZS9icm93c2VyX2RldGFpbHMnO1xuaW1wb3J0IHtBbmltYXRpb25CdWlsZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvYW5pbWF0ZS9hbmltYXRpb25fYnVpbGRlcic7XG5pbXBvcnQge0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2Jyb3dzZXIvYnJvd3Nlcl9hZGFwdGVyJztcbmltcG9ydCB7QnJvd3NlckdldFRlc3RhYmlsaXR5fSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci90ZXN0YWJpbGl0eSc7XG5pbXBvcnQge0NhY2hlZFhIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIveGhyX2NhY2hlJztcbmltcG9ydCB7d3RmSW5pdH0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcHJvZmlsZS93dGZfaW5pdCc7XG5pbXBvcnQge0V2ZW50TWFuYWdlciwgRVZFTlRfTUFOQUdFUl9QTFVHSU5TfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9ldmVudF9tYW5hZ2VyJztcbmltcG9ydCB7SEFNTUVSX0dFU1RVUkVfQ09ORklHLCBIYW1tZXJHZXN0dXJlQ29uZmlnfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMnO1xuaW1wb3J0IHtFTEVNRU5UX1BST0JFX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uX2RvbSc7XG5leHBvcnQge0RPQ1VNRU5UfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV90b2tlbnMnO1xuZXhwb3J0IHtUaXRsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvdGl0bGUnO1xuZXhwb3J0IHtFTEVNRU5UX1BST0JFX1BST1ZJREVSUywgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlNfUFJPRF9NT0RFLCBpbnNwZWN0TmF0aXZlRWxlbWVudCwgQnl9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2NvbW1vbl9kb20nO1xuZXhwb3J0IHtCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnLi9icm93c2VyL2Jyb3dzZXJfYWRhcHRlcic7XG5leHBvcnQge2VuYWJsZURlYnVnVG9vbHMsIGRpc2FibGVEZWJ1Z1Rvb2xzfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci90b29scy90b29scyc7XG5leHBvcnQge0hBTU1FUl9HRVNUVVJFX0NPTkZJRywgSGFtbWVyR2VzdHVyZUNvbmZpZ30gZnJvbSAnLi9kb20vZXZlbnRzL2hhbW1lcl9nZXN0dXJlcyc7XG5cbi8qKlxuICogQSBzZXQgb2YgcHJvdmlkZXJzIHRvIGluaXRpYWxpemUgdGhlIEFuZ3VsYXIgcGxhdGZvcm0gaW4gYSB3ZWIgYnJvd3Nlci5cbiAqXG4gKiBVc2VkIGF1dG9tYXRpY2FsbHkgYnkgYGJvb3RzdHJhcGAsIG9yIGNhbiBiZSBwYXNzZWQgdG8ge0BsaW5rIHBsYXRmb3JtfS5cbiAqL1xuZXhwb3J0IGNvbnN0IEJST1dTRVJfUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9IENPTlNUX0VYUFIoW1xuICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICBuZXcgUHJvdmlkZXIoUExBVEZPUk1fSU5JVElBTElaRVIsIHt1c2VWYWx1ZTogaW5pdERvbUFkYXB0ZXIsIG11bHRpOiB0cnVlfSksXG5dKTtcblxuZnVuY3Rpb24gX2V4Y2VwdGlvbkhhbmRsZXIoKTogRXhjZXB0aW9uSGFuZGxlciB7XG4gIC8vICFJU19EQVJUIGlzIHJlcXVpcmVkIGJlY2F1c2Ugd2UgbXVzdCByZXRocm93IGV4Y2VwdGlvbnMgaW4gSlMsXG4gIC8vIGJ1dCBtdXN0IG5vdCByZXRocm93IGV4Y2VwdGlvbnMgaW4gRGFydFxuICByZXR1cm4gbmV3IEV4Y2VwdGlvbkhhbmRsZXIoRE9NLCAhSVNfREFSVCk7XG59XG5cbmZ1bmN0aW9uIF9kb2N1bWVudCgpOiBhbnkge1xuICByZXR1cm4gRE9NLmRlZmF1bHREb2MoKTtcbn1cblxuLyoqXG4gKiBBIHNldCBvZiBwcm92aWRlcnMgdG8gaW5pdGlhbGl6ZSBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIGluIGEgd2ViIGJyb3dzZXIuXG4gKlxuICogVXNlZCBhdXRvbWF0aWNhbGx5IGJ5IGBib290c3RyYXBgLCBvciBjYW4gYmUgcGFzc2VkIHRvIHtAbGluayBQbGF0Zm9ybVJlZi5hcHBsaWNhdGlvbn0uXG4gKi9cbmV4cG9ydCBjb25zdCBCUk9XU0VSX0FQUF9DT01NT05fUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9IENPTlNUX0VYUFIoW1xuICBBUFBMSUNBVElPTl9DT01NT05fUFJPVklERVJTLCBGT1JNX1BST1ZJREVSUyxcbiAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX1BJUEVTLCB7dXNlVmFsdWU6IENPTU1PTl9QSVBFUywgbXVsdGk6IHRydWV9KSxcbiAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX0RJUkVDVElWRVMsIHt1c2VWYWx1ZTogQ09NTU9OX0RJUkVDVElWRVMsIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihFeGNlcHRpb25IYW5kbGVyLCB7dXNlRmFjdG9yeTogX2V4Y2VwdGlvbkhhbmRsZXIsIGRlcHM6IFtdfSksXG4gIG5ldyBQcm92aWRlcihET0NVTUVOVCwge3VzZUZhY3Rvcnk6IF9kb2N1bWVudCwgZGVwczogW119KSxcbiAgbmV3IFByb3ZpZGVyKEVWRU5UX01BTkFHRVJfUExVR0lOUywge3VzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHt1c2VDbGFzczogS2V5RXZlbnRzUGx1Z2luLCBtdWx0aTogdHJ1ZX0pLFxuICBuZXcgUHJvdmlkZXIoRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB7dXNlQ2xhc3M6IEhhbW1lckdlc3R1cmVzUGx1Z2luLCBtdWx0aTogdHJ1ZX0pLFxuICBuZXcgUHJvdmlkZXIoSEFNTUVSX0dFU1RVUkVfQ09ORklHLCB7dXNlQ2xhc3M6IEhhbW1lckdlc3R1cmVDb25maWd9KSxcbiAgbmV3IFByb3ZpZGVyKERvbVJvb3RSZW5kZXJlciwge3VzZUNsYXNzOiBEb21Sb290UmVuZGVyZXJffSksXG4gIG5ldyBQcm92aWRlcihSb290UmVuZGVyZXIsIHt1c2VFeGlzdGluZzogRG9tUm9vdFJlbmRlcmVyfSksXG4gIG5ldyBQcm92aWRlcihTaGFyZWRTdHlsZXNIb3N0LCB7dXNlRXhpc3Rpbmc6IERvbVNoYXJlZFN0eWxlc0hvc3R9KSwgRG9tU2hhcmVkU3R5bGVzSG9zdCxcbiAgVGVzdGFiaWxpdHksIEJyb3dzZXJEZXRhaWxzLCBBbmltYXRpb25CdWlsZGVyLCBFdmVudE1hbmFnZXIsIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTXG5dKTtcblxuZXhwb3J0IGNvbnN0IENBQ0hFRF9URU1QTEFURV9QUk9WSURFUjogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW25ldyBQcm92aWRlcihYSFIsIHt1c2VDbGFzczogQ2FjaGVkWEhSfSldKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXREb21BZGFwdGVyKCkge1xuICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICB3dGZJbml0KCk7XG4gIEJyb3dzZXJHZXRUZXN0YWJpbGl0eS5pbml0KCk7XG59XG4iXX0=
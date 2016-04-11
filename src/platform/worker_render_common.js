'use strict';var lang_1 = require('angular2/src/facade/lang');
var message_bus_1 = require('angular2/src/web_workers/shared/message_bus');
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var core_1 = require('angular2/core');
var common_dom_1 = require('angular2/platform/common_dom');
var di_1 = require('angular2/src/core/di');
// TODO change these imports once dom_adapter is moved out of core
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
var compiler_1 = require('angular2/compiler');
var xhr_impl_1 = require('angular2/src/platform/browser/xhr_impl');
var testability_1 = require('angular2/src/core/testability/testability');
var testability_2 = require('angular2/src/platform/browser/testability');
var browser_adapter_1 = require('./browser/browser_adapter');
var wtf_init_1 = require('angular2/src/core/profile/wtf_init');
var renderer_1 = require('angular2/src/web_workers/ui/renderer');
var xhr_impl_2 = require('angular2/src/web_workers/ui/xhr_impl');
var browser_platform_location_1 = require('angular2/src/router/location/browser_platform_location');
var service_message_broker_1 = require('angular2/src/web_workers/shared/service_message_broker');
var client_message_broker_1 = require('angular2/src/web_workers/shared/client_message_broker');
var serializer_1 = require('angular2/src/web_workers/shared/serializer');
var api_1 = require('angular2/src/web_workers/shared/api');
var render_store_1 = require('angular2/src/web_workers/shared/render_store');
var hammer_gestures_2 = require('./dom/events/hammer_gestures');
exports.WORKER_SCRIPT = lang_1.CONST_EXPR(new di_1.OpaqueToken('WebWorkerScript'));
// Message based Worker classes that listen on the MessageBus
exports.WORKER_RENDER_MESSAGING_PROVIDERS = lang_1.CONST_EXPR([renderer_1.MessageBasedRenderer, xhr_impl_2.MessageBasedXHRImpl]);
exports.WORKER_RENDER_PLATFORM = lang_1.CONST_EXPR([
    core_1.PLATFORM_COMMON_PROVIDERS,
    new di_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initWebWorkerRenderPlatform, multi: true })
]);
/**
 * A list of {@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 */
exports.WORKER_RENDER_ROUTER = lang_1.CONST_EXPR([browser_platform_location_1.BrowserPlatformLocation]);
exports.WORKER_RENDER_APPLICATION_COMMON = lang_1.CONST_EXPR([
    core_1.APPLICATION_COMMON_PROVIDERS, exports.WORKER_RENDER_MESSAGING_PROVIDERS,
    new di_1.Provider(core_1.ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
    new di_1.Provider(dom_tokens_1.DOCUMENT, { useFactory: _document, deps: [] }),
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true }),
    new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: key_events_1.KeyEventsPlugin, multi: true }),
    new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true }),
    new di_1.Provider(hammer_gestures_2.HAMMER_GESTURE_CONFIG, { useClass: hammer_gestures_2.HammerGestureConfig }),
    new di_1.Provider(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
    new di_1.Provider(core_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
    new di_1.Provider(shared_styles_host_2.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }),
    new di_1.Provider(compiler_1.XHR, { useClass: xhr_impl_1.XHRImpl }), xhr_impl_2.MessageBasedXHRImpl,
    new di_1.Provider(service_message_broker_1.ServiceMessageBrokerFactory, { useClass: service_message_broker_1.ServiceMessageBrokerFactory_ }),
    new di_1.Provider(client_message_broker_1.ClientMessageBrokerFactory, { useClass: client_message_broker_1.ClientMessageBrokerFactory_ }), serializer_1.Serializer,
    new di_1.Provider(api_1.ON_WEB_WORKER, { useValue: false }), render_store_1.RenderStore, shared_styles_host_1.DomSharedStylesHost, testability_1.Testability,
    browser_details_1.BrowserDetails, animation_builder_1.AnimationBuilder, common_dom_1.EventManager
]);
function initializeGenericWorkerRenderer(injector) {
    var bus = injector.get(message_bus_1.MessageBus);
    var zone = injector.get(ng_zone_1.NgZone);
    bus.attachToZone(zone);
    zone.run(function () {
        exports.WORKER_RENDER_MESSAGING_PROVIDERS.forEach(function (token) { injector.get(token).start(); });
    });
}
exports.initializeGenericWorkerRenderer = initializeGenericWorkerRenderer;
function initWebWorkerRenderPlatform() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    wtf_init_1.wtfInit();
    testability_2.BrowserGetTestability.init();
}
exports.initWebWorkerRenderPlatform = initWebWorkerRenderPlatform;
function _exceptionHandler() {
    return new core_1.ExceptionHandler(dom_adapter_1.DOM, !lang_1.IS_DART);
}
function _document() {
    return dom_adapter_1.DOM.defaultDoc();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlcl9jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVYzdjBWSkZILnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vd29ya2VyX3JlbmRlcl9jb21tb24udHMiXSwibmFtZXMiOlsiaW5pdGlhbGl6ZUdlbmVyaWNXb3JrZXJSZW5kZXJlciIsImluaXRXZWJXb3JrZXJSZW5kZXJQbGF0Zm9ybSIsIl9leGNlcHRpb25IYW5kbGVyIiwiX2RvY3VtZW50Il0sIm1hcHBpbmdzIjoiQUFBQSxxQkFBa0MsMEJBQTBCLENBQUMsQ0FBQTtBQUM3RCw0QkFBeUIsNkNBQTZDLENBQUMsQ0FBQTtBQUN2RSx3QkFBcUIsZ0NBQWdDLENBQUMsQ0FBQTtBQUN0RCxxQkFBZ08sZUFBZSxDQUFDLENBQUE7QUFDaFAsMkJBQWtELDhCQUE4QixDQUFDLENBQUE7QUFDakYsbUJBQXVELHNCQUFzQixDQUFDLENBQUE7QUFDOUUsa0VBQWtFO0FBQ2xFLDRCQUFrQix1Q0FBdUMsQ0FBQyxDQUFBO0FBQzFELDJCQUE4Qiw2Q0FBNkMsQ0FBQyxDQUFBO0FBQzVFLDJCQUE4Qiw2Q0FBNkMsQ0FBQyxDQUFBO0FBQzVFLGdDQUFtQyxrREFBa0QsQ0FBQyxDQUFBO0FBQ3RGLDJCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELDZCQUFnRCx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3pGLG1DQUFrQyw4Q0FBOEMsQ0FBQyxDQUFBO0FBQ2pGLG1DQUErQiw4Q0FBOEMsQ0FBQyxDQUFBO0FBQzlFLGdDQUE2QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQ3BFLGtDQUErQix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3hFLHlCQUFrQixtQkFBbUIsQ0FBQyxDQUFBO0FBQ3RDLHlCQUFzQix3Q0FBd0MsQ0FBQyxDQUFBO0FBQy9ELDRCQUEwQiwyQ0FBMkMsQ0FBQyxDQUFBO0FBQ3RFLDRCQUFvQywyQ0FBMkMsQ0FBQyxDQUFBO0FB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LENBQUM7QUFFSCx5Q0FBZ0QsUUFBa0I7SUFDaEVBLElBQUlBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLHdCQUFVQSxDQUFDQSxDQUFDQTtJQUNuQ0EsSUFBSUEsSUFBSUEsR0FBR0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZ0JBQU1BLENBQUNBLENBQUNBO0lBQ2hDQSxHQUFHQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUV2QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDUEEseUNBQWlDQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFDQSxLQUFLQSxJQUFPQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUN6RkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7QUFDTEEsQ0FBQ0E7QUFSZSx1Q0FBK0Isa0NBUTlDLENBQUE7QUFFRDtJQUNFQyxtQ0FBaUJBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO0lBQ2hDQSxrQkFBT0EsRUFBRUEsQ0FBQ0E7SUFDVkEsbUNBQXFCQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtBQUMvQkEsQ0FBQ0E7QUFKZSxtQ0FBMkIsOEJBSTFDLENBQUE7QUFFRDtJQUNFQyxNQUFNQSxDQUFDQSxJQUFJQSx1QkFBZ0JBLENBQUNBLGlCQUFHQSxFQUFFQSxDQUFDQSxjQUFPQSxDQUFDQSxDQUFDQTtBQUM3Q0EsQ0FBQ0E7QUFFRDtJQUNFQyxNQUFNQSxDQUFDQSxpQkFBR0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7QUFDMUJBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVF9FWFBSLCBJU19EQVJUfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7Tmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS96b25lL25nX3pvbmUnO1xuaW1wb3J0IHtQTEFURk9STV9ESVJFQ1RJVkVTLCBQTEFURk9STV9QSVBFUywgQ29tcG9uZW50UmVmLCBwbGF0Zm9ybSwgRXhjZXB0aW9uSGFuZGxlciwgUmVmbGVjdG9yLCByZWZsZWN0b3IsIEFQUExJQ0FUSU9OX0NPTU1PTl9QUk9WSURFUlMsIFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlMsIFJvb3RSZW5kZXJlciwgUExBVEZPUk1fSU5JVElBTElaRVIsIEFQUF9JTklUSUFMSVpFUn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0VWRU5UX01BTkFHRVJfUExVR0lOUywgRXZlbnRNYW5hZ2VyfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9jb21tb25fZG9tJztcbmltcG9ydCB7cHJvdmlkZSwgUHJvdmlkZXIsIEluamVjdG9yLCBPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuLy8gVE9ETyBjaGFuZ2UgdGhlc2UgaW1wb3J0cyBvbmNlIGRvbV9hZGFwdGVyIGlzIG1vdmVkIG91dCBvZiBjb3JlXG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge0RvbUV2ZW50c1BsdWdpbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvZG9tX2V2ZW50cyc7XG5pbXBvcnQge0tleUV2ZW50c1BsdWdpbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMva2V5X2V2ZW50cyc7XG5pbXBvcnQge0hhbW1lckdlc3R1cmVzUGx1Z2lufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fdG9rZW5zJztcbmltcG9ydCB7RG9tUm9vdFJlbmRlcmVyLCBEb21Sb290UmVuZGVyZXJffSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9yZW5kZXJlcic7XG5pbXBvcnQge0RvbVNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vc2hhcmVkX3N0eWxlc19ob3N0JztcbmltcG9ydCB7U2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuaW1wb3J0IHtCcm93c2VyRGV0YWlsc30gZnJvbSAnYW5ndWxhcjIvc3JjL2FuaW1hdGUvYnJvd3Nlcl9kZXRhaWxzJztcbmltcG9ydCB7QW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2FuaW1hdGUvYW5pbWF0aW9uX2J1aWxkZXInO1xuaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL2NvbXBpbGVyJztcbmltcG9ydCB7WEhSSW1wbH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIveGhyX2ltcGwnO1xuaW1wb3J0IHtUZXN0YWJpbGl0eX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtCcm93c2VyR2V0VGVzdGFiaWxpdHl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL3Rlc3RhYmlsaXR5JztcbmltcG9ydCB7QnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJy4vYnJvd3Nlci9icm93c2VyX2FkYXB0ZXInO1xuaW1wb3J0IHt3dGZJbml0fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9wcm9maWxlL3d0Zl9pbml0JztcbmltcG9ydCB7TWVzc2FnZUJhc2VkUmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy91aS9yZW5kZXJlcic7XG5pbXBvcnQge01lc3NhZ2VCYXNlZFhIUkltcGx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy91aS94aHJfaW1wbCc7XG5pbXBvcnQge0Jyb3dzZXJQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uL2Jyb3dzZXJfcGxhdGZvcm1fbG9jYXRpb24nO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeV99IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeV99IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7T05fV0VCX1dPUktFUn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9hcGknO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9yZW5kZXJfc3RvcmUnO1xuaW1wb3J0IHtIQU1NRVJfR0VTVFVSRV9DT05GSUcsIEhhbW1lckdlc3R1cmVDb25maWd9IGZyb20gJy4vZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMnO1xuXG5leHBvcnQgY29uc3QgV09SS0VSX1NDUklQVDogT3BhcXVlVG9rZW4gPSBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbignV2ViV29ya2VyU2NyaXB0JykpO1xuXG4vLyBNZXNzYWdlIGJhc2VkIFdvcmtlciBjbGFzc2VzIHRoYXQgbGlzdGVuIG9uIHRoZSBNZXNzYWdlQnVzXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9NRVNTQUdJTkdfUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQ09OU1RfRVhQUihbTWVzc2FnZUJhc2VkUmVuZGVyZXIsIE1lc3NhZ2VCYXNlZFhIUkltcGxdKTtcblxuZXhwb3J0IGNvbnN0IFdPUktFUl9SRU5ERVJfUExBVEZPUk06IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+ID0gQ09OU1RfRVhQUihbXG4gIFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlMsXG4gIG5ldyBQcm92aWRlcihQTEFURk9STV9JTklUSUFMSVpFUiwge3VzZVZhbHVlOiBpbml0V2ViV29ya2VyUmVuZGVyUGxhdGZvcm0sIG11bHRpOiB0cnVlfSlcbl0pO1xuXG4vKipcbiAqIEEgbGlzdCBvZiB7QGxpbmsgUHJvdmlkZXJ9cy4gVG8gdXNlIHRoZSByb3V0ZXIgaW4gYSBXb3JrZXIgZW5hYmxlZCBhcHBsaWNhdGlvbiB5b3UgbXVzdFxuICogaW5jbHVkZSB0aGVzZSBwcm92aWRlcnMgd2hlbiBzZXR0aW5nIHVwIHRoZSByZW5kZXIgdGhyZWFkLlxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9ST1VURVI6IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+ID1cbiAgICBDT05TVF9FWFBSKFtCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbl0pO1xuXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9BUFBMSUNBVElPTl9DT01NT046IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+ID0gQ09OU1RfRVhQUihbXG4gIEFQUExJQ0FUSU9OX0NPTU1PTl9QUk9WSURFUlMsIFdPUktFUl9SRU5ERVJfTUVTU0FHSU5HX1BST1ZJREVSUyxcbiAgbmV3IFByb3ZpZGVyKEV4Y2VwdGlvbkhhbmRsZXIsIHt1c2VGYWN0b3J5OiBfZXhjZXB0aW9uSGFuZGxlciwgZGVwczogW119KSxcbiAgbmV3IFByb3ZpZGVyKERPQ1VNRU5ULCB7dXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbXX0pLFxuICAvLyBUT0RPKGp0ZXBsaXR6NjAyKTogSW52ZXN0aWdhdGUgaWYgd2UgZGVmaW5pdGVseSBuZWVkIEVWRU5UX01BTkFHRVIgb24gdGhlIHJlbmRlciB0aHJlYWRcbiAgLy8gIzUyOThcbiAgbmV3IFByb3ZpZGVyKEVWRU5UX01BTkFHRVJfUExVR0lOUywge3VzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHt1c2VDbGFzczogS2V5RXZlbnRzUGx1Z2luLCBtdWx0aTogdHJ1ZX0pLFxuICBuZXcgUHJvdmlkZXIoRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB7dXNlQ2xhc3M6IEhhbW1lckdlc3R1cmVzUGx1Z2luLCBtdWx0aTogdHJ1ZX0pLFxuICBuZXcgUHJvdmlkZXIoSEFNTUVSX0dFU1RVUkVfQ09ORklHLCB7dXNlQ2xhc3M6IEhhbW1lckdlc3R1cmVDb25maWd9KSxcbiAgbmV3IFByb3ZpZGVyKERvbVJvb3RSZW5kZXJlciwge3VzZUNsYXNzOiBEb21Sb290UmVuZGVyZXJffSksXG4gIG5ldyBQcm92aWRlcihSb290UmVuZGVyZXIsIHt1c2VFeGlzdGluZzogRG9tUm9vdFJlbmRlcmVyfSksXG4gIG5ldyBQcm92aWRlcihTaGFyZWRTdHlsZXNIb3N0LCB7dXNlRXhpc3Rpbmc6IERvbVNoYXJlZFN0eWxlc0hvc3R9KSxcbiAgbmV3IFByb3ZpZGVyKFhIUiwge3VzZUNsYXNzOiBYSFJJbXBsfSksIE1lc3NhZ2VCYXNlZFhIUkltcGwsXG4gIG5ldyBQcm92aWRlcihTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIHt1c2VDbGFzczogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5X30pLFxuICBuZXcgUHJvdmlkZXIoQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIHt1c2VDbGFzczogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnlffSksIFNlcmlhbGl6ZXIsXG4gIG5ldyBQcm92aWRlcihPTl9XRUJfV09SS0VSLCB7dXNlVmFsdWU6IGZhbHNlfSksIFJlbmRlclN0b3JlLCBEb21TaGFyZWRTdHlsZXNIb3N0LCBUZXN0YWJpbGl0eSxcbiAgQnJvd3NlckRldGFpbHMsIEFuaW1hdGlvbkJ1aWxkZXIsIEV2ZW50TWFuYWdlclxuXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplR2VuZXJpY1dvcmtlclJlbmRlcmVyKGluamVjdG9yOiBJbmplY3Rvcikge1xuICB2YXIgYnVzID0gaW5qZWN0b3IuZ2V0KE1lc3NhZ2VCdXMpO1xuICBsZXQgem9uZSA9IGluamVjdG9yLmdldChOZ1pvbmUpO1xuICBidXMuYXR0YWNoVG9ab25lKHpvbmUpO1xuXG4gIHpvbmUucnVuKCgpID0+IHtcbiAgICBXT1JLRVJfUkVOREVSX01FU1NBR0lOR19QUk9WSURFUlMuZm9yRWFjaCgodG9rZW4pID0+IHsgaW5qZWN0b3IuZ2V0KHRva2VuKS5zdGFydCgpOyB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0V2ViV29ya2VyUmVuZGVyUGxhdGZvcm0oKTogdm9pZCB7XG4gIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gIHd0ZkluaXQoKTtcbiAgQnJvd3NlckdldFRlc3RhYmlsaXR5LmluaXQoKTtcbn1cblxuZnVuY3Rpb24gX2V4Y2VwdGlvbkhhbmRsZXIoKTogRXhjZXB0aW9uSGFuZGxlciB7XG4gIHJldHVybiBuZXcgRXhjZXB0aW9uSGFuZGxlcihET00sICFJU19EQVJUKTtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KCk6IGFueSB7XG4gIHJldHVybiBET00uZGVmYXVsdERvYygpO1xufVxuIl19
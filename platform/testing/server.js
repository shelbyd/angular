'use strict';var core_1 = require('angular2/core');
var parse5_adapter_1 = require('angular2/src/platform/server/parse5_adapter');
var animation_builder_1 = require('angular2/src/animate/animation_builder');
var animation_builder_mock_1 = require('angular2/src/mock/animation_builder_mock');
var directive_resolver_mock_1 = require('angular2/src/mock/directive_resolver_mock');
var view_resolver_mock_1 = require('angular2/src/mock/view_resolver_mock');
var mock_location_strategy_1 = require('angular2/src/mock/mock_location_strategy');
var location_strategy_1 = require('angular2/src/router/location/location_strategy');
var ng_zone_mock_1 = require('angular2/src/mock/ng_zone_mock');
var test_component_builder_1 = require('angular2/src/testing/test_component_builder');
var xhr_1 = require('angular2/src/compiler/xhr');
var utils_1 = require('angular2/src/testing/utils');
var compiler_1 = require('angular2/src/compiler/compiler');
var dom_tokens_1 = require('angular2/src/platform/dom/dom_tokens');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var api_1 = require('angular2/src/core/render/api');
var dom_renderer_1 = require('angular2/src/platform/dom/dom_renderer');
var shared_styles_host_1 = require('angular2/src/platform/dom/shared_styles_host');
var common_dom_1 = require('angular2/platform/common_dom');
var dom_events_1 = require('angular2/src/platform/dom/events/dom_events');
var lang_1 = require('angular2/src/facade/lang');
var utils_2 = require('angular2/src/testing/utils');
function initServerTests() {
    parse5_adapter_1.Parse5DomAdapter.makeCurrent();
    utils_1.BrowserDetection.setup();
}
/**
 * Default patform providers for testing.
 */
exports.TEST_SERVER_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([
    core_1.PLATFORM_COMMON_PROVIDERS,
    new core_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initServerTests, multi: true })
]);
function appDoc() {
    try {
        return dom_adapter_1.DOM.defaultDoc();
    }
    catch (e) {
        return null;
    }
}
/**
 * Default application providers for testing.
 */
exports.TEST_SERVER_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([
    // TODO(julie): when angular2/platform/server is available, use that instead of making our own
    // list here.
    core_1.APPLICATION_COMMON_PROVIDERS,
    compiler_1.COMPILER_PROVIDERS,
    new core_1.Provider(dom_tokens_1.DOCUMENT, { useFactory: appDoc }),
    new core_1.Provider(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
    new core_1.Provider(api_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
    common_dom_1.EventManager,
    new core_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true }),
    new core_1.Provider(xhr_1.XHR, { useClass: xhr_1.XHR }),
    new core_1.Provider(core_1.APP_ID, { useValue: 'a' }),
    shared_styles_host_1.DomSharedStylesHost,
    common_dom_1.ELEMENT_PROBE_PROVIDERS,
    new core_1.Provider(core_1.DirectiveResolver, { useClass: directive_resolver_mock_1.MockDirectiveResolver }),
    new core_1.Provider(core_1.ViewResolver, { useClass: view_resolver_mock_1.MockViewResolver }),
    utils_2.Log,
    test_component_builder_1.TestComponentBuilder,
    new core_1.Provider(core_1.NgZone, { useClass: ng_zone_mock_1.MockNgZone }),
    new core_1.Provider(location_strategy_1.LocationStrategy, { useClass: mock_location_strategy_1.MockLocationStrategy }),
    new core_1.Provider(animation_builder_1.AnimationBuilder, { useClass: animation_builder_mock_1.MockAnimationBuilder }),
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1xZFdVMVJOei50bXAvYW5ndWxhcjIvcGxhdGZvcm0vdGVzdGluZy9zZXJ2ZXIudHMiXSwibmFtZXMiOlsiaW5pdFNlcnZlclRlc3RzIiwiYXBwRG9jIl0sIm1hcHBpbmdzIjoiQUFBQSxxQkFBaUssZUFBZSxDQUFDLENBQUE7QUFDakwsK0JBQStCLDZDQUE2QyxDQUFDLENBQUE7QUFFN0Usa0NBQStCLHdDQUF3QyxDQUFDLENBQUE7QUFDeEUsdUNBQW1DLDBDQUEwQyxDQUFDLENBQUE7QUFDOUUsd0NBQW9DLDJDQUEyQyxDQUFDLENBQUE7QUFDaEYsbUNBQStCLHNDQUFzQyxDQUFDLENBQUE7QUFDdEUsdUNBQW1DLDBDQUEwQyxDQUFDLENBQUE7QUFDOUUsa0NBQStCLGdEQUFnRCxDQUFDLENBQUE7QUFDaEYsNkJBQXlCLGdDQUFnQyxDQUFDLENBQUE7QUFFMUQsdUNBQW1DLDZDQUE2QyxDQUFDLENBQUE7QUFDakYsb0JBQWtCLDJCQUEyQixDQUFDLENBQUE7QUFDOUMsc0JBQStCLDRCQUE0QixDQUFDLENBQUE7QUFFNUQseUJBQWlDLGdDQUFnQyxDQUFDLENBQUE7QUFDbEUsMkJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsNEJBQWtCLHVDQUF1QyxDQUFDLENBQUE7QUFDMUQsb0JBQTJCLDhCQUE4QixDQUFDLENBQUE7QUFDMUQsNkJBQWdELHdDQUF3QyxDQUFDLENBQUE7QUFDekYsbUNBQWtDLDhDQUE4QyxDQUFDLENBQUE7QUFFakYsMkJBQTJFLDhCQUE4QixDQUFDLENBQUE7QUFDMUcsMkJBQThCLDZDQUE2QyxDQUFDLENBQUE7QUFFNUUscUJBQXlCLDBCQUEwQixDQUFDLENBQUE7QUFFcEQsc0JBQWtCLDRCQUE0QixDQUFDLENBQUE7QUFFL0M7SUFDRUEsaUNBQWdCQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtJQUMvQkEsd0JBQWdCQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtBQUMzQkEsQ0FBQ0E7QUFFRDs7R0FFRztBQUNVLHNDQUE4QixHQUEyQyxpQkFBVSxDQUFDO0lBQy9GLGdDQUF5QjtJQUN6QixJQUFJLGVBQVEsQ0FBQywyQkFBb0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO0NBQzdFLENBQUMsQ0FBQztBQUVIO0lBQ0VDLElBQUlBLENBQUNBO1FBQ0hBLE1BQU1BLENBQUNBLGlCQUFHQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtJQUMxQkEsQ0FBRUE7SUFBQUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDWEEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7SUFDZEEsQ0FBQ0E7QUFDSEEsQ0FBQ0E7QUFFRDs7R0FFRztBQUNVLHlDQUFpQyxHQUMxQyxpQkFBVSxDQUFDO0lBQ1QsOEZBQThGO0lBQzlGLGFBQWE7SUFDYixtQ0FBNEI7SUFDNUIsNkJBQWtCO0lBQ2xCLElBQUksZUFBUSxDQUFDLHFCQUFRLEVBQUUsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7SUFDNUMsSUFBSSxlQUFRLENBQUMsOEJBQWUsRUFBRSxFQUFDLFFBQVEsRUFBRSwrQkFBZ0IsRUFBQyxDQUFDO0lBQzNELElBQUksZUFBUSxDQUFDLGtCQUFZLEVBQUUsRUFBQyxXQUFXLEVBQUUsOEJBQWUsRUFBQyxDQUFDO0lBQzFELHlCQUFZO0lBQ1osSUFBSSxlQUFRLENBQUMsa0NBQXFCLEVBQUUsRUFBQyxRQUFRLEVBQUUsNEJBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDN0UsSUFBSSxlQUFRLENBQUMsU0FBRyxFQUFFLEVBQUMsUUFBUSxFQUFFLFNBQUcsRUFBQyxDQUFDO0lBQ2xDLElBQUksZUFBUSxDQUFDLGFBQU0sRUFBRSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUMsQ0FBQztJQUNyQyx3Q0FBbUI7SUFDbkIsb0NBQXVCO0lBQ3ZCLElBQUksZUFBUSxDQUFDLHdCQUFpQixFQUFFLEVBQUMsUUFBUSxFQUFFLCtDQUFxQixFQUFDLENBQUM7SUFDbEUsSUFBSSxlQUFRLENBQUMsbUJBQVksRUFBRSxFQUFDLFFBQVEsRUFBRSxxQ0FBZ0IsRUFBQyxDQUFDO0lBQ3hELFdBQUc7SUFDSCw2Q0FBb0I7SUFDcEIsSUFBSSxlQUFRLENBQUMsYUFBTSxFQUFFLEVBQUMsUUFBUSxFQUFFLHlCQUFVLEVBQUMsQ0FBQztJQUM1QyxJQUFJLGVBQVEsQ0FBQyxvQ0FBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSw2Q0FBb0IsRUFBQyxDQUFDO0lBQ2hFLElBQUksZUFBUSxDQUFDLG9DQUFnQixFQUFFLEVBQUMsUUFBUSxFQUFFLDZDQUFvQixFQUFDLENBQUM7Q0FDakUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBUFBfSUQsIERpcmVjdGl2ZVJlc29sdmVyLCBOZ1pvbmUsIFByb3ZpZGVyLCBWaWV3UmVzb2x2ZXIsIFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlMsIFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBBUFBMSUNBVElPTl9DT01NT05fUFJPVklERVJTLCBSZW5kZXJlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1BhcnNlNURvbUFkYXB0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9zZXJ2ZXIvcGFyc2U1X2FkYXB0ZXInO1xuXG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2FuaW1hdGlvbl9idWlsZGVyJztcbmltcG9ydCB7TW9ja0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL2FuaW1hdGlvbl9idWlsZGVyX21vY2snO1xuaW1wb3J0IHtNb2NrRGlyZWN0aXZlUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL2RpcmVjdGl2ZV9yZXNvbHZlcl9tb2NrJztcbmltcG9ydCB7TW9ja1ZpZXdSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svdmlld19yZXNvbHZlcl9tb2NrJztcbmltcG9ydCB7TW9ja0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL21vY2tfbG9jYXRpb25fc3RyYXRlZ3knO1xuaW1wb3J0IHtMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uL2xvY2F0aW9uX3N0cmF0ZWd5JztcbmltcG9ydCB7TW9ja05nWm9uZX0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svbmdfem9uZV9tb2NrJztcblxuaW1wb3J0IHtUZXN0Q29tcG9uZW50QnVpbGRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvdGVzdF9jb21wb25lbnRfYnVpbGRlcic7XG5pbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5pbXBvcnQge0Jyb3dzZXJEZXRlY3Rpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy90ZXN0aW5nL3V0aWxzJztcblxuaW1wb3J0IHtDT01QSUxFUl9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9jb21waWxlcic7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV90b2tlbnMnO1xuaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtSb290UmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtEb21Sb290UmVuZGVyZXIsIERvbVJvb3RSZW5kZXJlcl99IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3JlbmRlcmVyJztcbmltcG9ydCB7RG9tU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuXG5pbXBvcnQge0V2ZW50TWFuYWdlciwgRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCBFTEVNRU5UX1BST0JFX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uX2RvbSc7XG5pbXBvcnQge0RvbUV2ZW50c1BsdWdpbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvZG9tX2V2ZW50cyc7XG5cbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtMb2d9IGZyb20gJ2FuZ3VsYXIyL3NyYy90ZXN0aW5nL3V0aWxzJztcblxuZnVuY3Rpb24gaW5pdFNlcnZlclRlc3RzKCkge1xuICBQYXJzZTVEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gIEJyb3dzZXJEZXRlY3Rpb24uc2V0dXAoKTtcbn1cblxuLyoqXG4gKiBEZWZhdWx0IHBhdGZvcm0gcHJvdmlkZXJzIGZvciB0ZXN0aW5nLlxuICovXG5leHBvcnQgY29uc3QgVEVTVF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9IENPTlNUX0VYUFIoW1xuICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICBuZXcgUHJvdmlkZXIoUExBVEZPUk1fSU5JVElBTElaRVIsIHt1c2VWYWx1ZTogaW5pdFNlcnZlclRlc3RzLCBtdWx0aTogdHJ1ZX0pXG5dKTtcblxuZnVuY3Rpb24gYXBwRG9jKCkge1xuICB0cnkge1xuICAgIHJldHVybiBET00uZGVmYXVsdERvYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZhdWx0IGFwcGxpY2F0aW9uIHByb3ZpZGVycyBmb3IgdGVzdGluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IFRFU1RfU0VSVkVSX0FQUExJQ0FUSU9OX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW1xuICAgICAgLy8gVE9ETyhqdWxpZSk6IHdoZW4gYW5ndWxhcjIvcGxhdGZvcm0vc2VydmVyIGlzIGF2YWlsYWJsZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiBtYWtpbmcgb3VyIG93blxuICAgICAgLy8gbGlzdCBoZXJlLlxuICAgICAgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUyxcbiAgICAgIENPTVBJTEVSX1BST1ZJREVSUyxcbiAgICAgIG5ldyBQcm92aWRlcihET0NVTUVOVCwge3VzZUZhY3Rvcnk6IGFwcERvY30pLFxuICAgICAgbmV3IFByb3ZpZGVyKERvbVJvb3RSZW5kZXJlciwge3VzZUNsYXNzOiBEb21Sb290UmVuZGVyZXJffSksXG4gICAgICBuZXcgUHJvdmlkZXIoUm9vdFJlbmRlcmVyLCB7dXNlRXhpc3Rpbmc6IERvbVJvb3RSZW5kZXJlcn0pLFxuICAgICAgRXZlbnRNYW5hZ2VyLFxuICAgICAgbmV3IFByb3ZpZGVyKEVWRU5UX01BTkFHRVJfUExVR0lOUywge3VzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sIG11bHRpOiB0cnVlfSksXG4gICAgICBuZXcgUHJvdmlkZXIoWEhSLCB7dXNlQ2xhc3M6IFhIUn0pLFxuICAgICAgbmV3IFByb3ZpZGVyKEFQUF9JRCwge3VzZVZhbHVlOiAnYSd9KSxcbiAgICAgIERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBFTEVNRU5UX1BST0JFX1BST1ZJREVSUyxcbiAgICAgIG5ldyBQcm92aWRlcihEaXJlY3RpdmVSZXNvbHZlciwge3VzZUNsYXNzOiBNb2NrRGlyZWN0aXZlUmVzb2x2ZXJ9KSxcbiAgICAgIG5ldyBQcm92aWRlcihWaWV3UmVzb2x2ZXIsIHt1c2VDbGFzczogTW9ja1ZpZXdSZXNvbHZlcn0pLFxuICAgICAgTG9nLFxuICAgICAgVGVzdENvbXBvbmVudEJ1aWxkZXIsXG4gICAgICBuZXcgUHJvdmlkZXIoTmdab25lLCB7dXNlQ2xhc3M6IE1vY2tOZ1pvbmV9KSxcbiAgICAgIG5ldyBQcm92aWRlcihMb2NhdGlvblN0cmF0ZWd5LCB7dXNlQ2xhc3M6IE1vY2tMb2NhdGlvblN0cmF0ZWd5fSksXG4gICAgICBuZXcgUHJvdmlkZXIoQW5pbWF0aW9uQnVpbGRlciwge3VzZUNsYXNzOiBNb2NrQW5pbWF0aW9uQnVpbGRlcn0pLFxuICAgIF0pO1xuIl19
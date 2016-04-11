'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/src/core/di');
var message_bus_1 = require('angular2/src/web_workers/shared/message_bus');
var serializer_1 = require('angular2/src/web_workers/shared/serializer');
var api_1 = require('angular2/src/core/render/api');
var messaging_api_1 = require('angular2/src/web_workers/shared/messaging_api');
var bind_1 = require('./bind');
var event_dispatcher_1 = require('angular2/src/web_workers/ui/event_dispatcher');
var render_store_1 = require('angular2/src/web_workers/shared/render_store');
var service_message_broker_1 = require('angular2/src/web_workers/shared/service_message_broker');
var MessageBasedRenderer = (function () {
    function MessageBasedRenderer(_brokerFactory, _bus, _serializer, _renderStore, _rootRenderer) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rootRenderer = _rootRenderer;
    }
    MessageBasedRenderer.prototype.start = function () {
        var broker = this._brokerFactory.createMessageBroker(messaging_api_1.RENDERER_CHANNEL);
        this._bus.initChannel(messaging_api_1.EVENT_CHANNEL);
        this._eventDispatcher = new event_dispatcher_1.EventDispatcher(this._bus.to(messaging_api_1.EVENT_CHANNEL), this._serializer);
        broker.registerMethod('renderComponent', [api_1.RenderComponentType, serializer_1.PRIMITIVE], bind_1.bind(this._renderComponent, this));
        broker.registerMethod('selectRootElement', [serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._selectRootElement, this));
        broker.registerMethod('createElement', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._createElement, this));
        broker.registerMethod('createViewRoot', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], bind_1.bind(this._createViewRoot, this));
        broker.registerMethod('createTemplateAnchor', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], bind_1.bind(this._createTemplateAnchor, this));
        broker.registerMethod('createText', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._createText, this));
        broker.registerMethod('projectNodes', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._projectNodes, this));
        broker.registerMethod('attachViewAfter', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._attachViewAfter, this));
        broker.registerMethod('detachView', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._detachView, this));
        broker.registerMethod('destroyView', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._destroyView, this));
        broker.registerMethod('setElementProperty', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementProperty, this));
        broker.registerMethod('setElementAttribute', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementAttribute, this));
        broker.registerMethod('setBindingDebugInfo', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setBindingDebugInfo, this));
        broker.registerMethod('setElementClass', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementClass, this));
        broker.registerMethod('setElementStyle', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementStyle, this));
        broker.registerMethod('invokeElementMethod', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._invokeElementMethod, this));
        broker.registerMethod('setText', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], bind_1.bind(this._setText, this));
        broker.registerMethod('listen', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._listen, this));
        broker.registerMethod('listenGlobal', [serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._listenGlobal, this));
        broker.registerMethod('listenDone', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._listenDone, this));
    };
    MessageBasedRenderer.prototype._renderComponent = function (renderComponentType, rendererId) {
        var renderer = this._rootRenderer.renderComponent(renderComponentType);
        this._renderStore.store(renderer, rendererId);
    };
    MessageBasedRenderer.prototype._selectRootElement = function (renderer, selector, elId) {
        this._renderStore.store(renderer.selectRootElement(selector), elId);
    };
    MessageBasedRenderer.prototype._createElement = function (renderer, parentElement, name, elId) {
        this._renderStore.store(renderer.createElement(parentElement, name), elId);
    };
    MessageBasedRenderer.prototype._createViewRoot = function (renderer, hostElement, elId) {
        var viewRoot = renderer.createViewRoot(hostElement);
        if (this._renderStore.serialize(hostElement) !== elId) {
            this._renderStore.store(viewRoot, elId);
        }
    };
    MessageBasedRenderer.prototype._createTemplateAnchor = function (renderer, parentElement, elId) {
        this._renderStore.store(renderer.createTemplateAnchor(parentElement), elId);
    };
    MessageBasedRenderer.prototype._createText = function (renderer, parentElement, value, elId) {
        this._renderStore.store(renderer.createText(parentElement, value), elId);
    };
    MessageBasedRenderer.prototype._projectNodes = function (renderer, parentElement, nodes) {
        renderer.projectNodes(parentElement, nodes);
    };
    MessageBasedRenderer.prototype._attachViewAfter = function (renderer, node, viewRootNodes) {
        renderer.attachViewAfter(node, viewRootNodes);
    };
    MessageBasedRenderer.prototype._detachView = function (renderer, viewRootNodes) {
        renderer.detachView(viewRootNodes);
    };
    MessageBasedRenderer.prototype._destroyView = function (renderer, hostElement, viewAllNodes) {
        renderer.destroyView(hostElement, viewAllNodes);
        for (var i = 0; i < viewAllNodes.length; i++) {
            this._renderStore.remove(viewAllNodes[i]);
        }
    };
    MessageBasedRenderer.prototype._setElementProperty = function (renderer, renderElement, propertyName, propertyValue) {
        renderer.setElementProperty(renderElement, propertyName, propertyValue);
    };
    MessageBasedRenderer.prototype._setElementAttribute = function (renderer, renderElement, attributeName, attributeValue) {
        renderer.setElementAttribute(renderElement, attributeName, attributeValue);
    };
    MessageBasedRenderer.prototype._setBindingDebugInfo = function (renderer, renderElement, propertyName, propertyValue) {
        renderer.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    };
    MessageBasedRenderer.prototype._setElementClass = function (renderer, renderElement, className, isAdd) {
        renderer.setElementClass(renderElement, className, isAdd);
    };
    MessageBasedRenderer.prototype._setElementStyle = function (renderer, renderElement, styleName, styleValue) {
        renderer.setElementStyle(renderElement, styleName, styleValue);
    };
    MessageBasedRenderer.prototype._invokeElementMethod = function (renderer, renderElement, methodName, args) {
        renderer.invokeElementMethod(renderElement, methodName, args);
    };
    MessageBasedRenderer.prototype._setText = function (renderer, renderNode, text) {
        renderer.setText(renderNode, text);
    };
    MessageBasedRenderer.prototype._listen = function (renderer, renderElement, eventName, unlistenId) {
        var _this = this;
        var unregisterCallback = renderer.listen(renderElement, eventName, function (event) { return _this._eventDispatcher.dispatchRenderEvent(renderElement, null, eventName, event); });
        this._renderStore.store(unregisterCallback, unlistenId);
    };
    MessageBasedRenderer.prototype._listenGlobal = function (renderer, eventTarget, eventName, unlistenId) {
        var _this = this;
        var unregisterCallback = renderer.listenGlobal(eventTarget, eventName, function (event) { return _this._eventDispatcher.dispatchRenderEvent(null, eventTarget, eventName, event); });
        this._renderStore.store(unregisterCallback, unlistenId);
    };
    MessageBasedRenderer.prototype._listenDone = function (renderer, unlistenCallback) { unlistenCallback(); };
    MessageBasedRenderer = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [service_message_broker_1.ServiceMessageBrokerFactory, message_bus_1.MessageBus, serializer_1.Serializer, render_store_1.RenderStore, api_1.RootRenderer])
    ], MessageBasedRenderer);
    return MessageBasedRenderer;
})();
exports.MessageBasedRenderer = MessageBasedRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVYzdjBWSkZILnRtcC9hbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvcmVuZGVyZXIudHMiXSwibmFtZXMiOlsiTWVzc2FnZUJhc2VkUmVuZGVyZXIiLCJNZXNzYWdlQmFzZWRSZW5kZXJlci5jb25zdHJ1Y3RvciIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLnN0YXJ0IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3JlbmRlckNvbXBvbmVudCIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9zZWxlY3RSb290RWxlbWVudCIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9jcmVhdGVFbGVtZW50IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2NyZWF0ZVZpZXdSb290IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2NyZWF0ZVRlbXBsYXRlQW5jaG9yIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2NyZWF0ZVRleHQiLCJNZXNzYWdlQmFzZWRSZW5kZXJlci5fcHJvamVjdE5vZGVzIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2F0dGFjaFZpZXdBZnRlciIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9kZXRhY2hWaWV3IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2Rlc3Ryb3lWaWV3IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3NldEVsZW1lbnRQcm9wZXJ0eSIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9zZXRFbGVtZW50QXR0cmlidXRlIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3NldEJpbmRpbmdEZWJ1Z0luZm8iLCJNZXNzYWdlQmFzZWRSZW5kZXJlci5fc2V0RWxlbWVudENsYXNzIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3NldEVsZW1lbnRTdHlsZSIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9pbnZva2VFbGVtZW50TWV0aG9kIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3NldFRleHQiLCJNZXNzYWdlQmFzZWRSZW5kZXJlci5fbGlzdGVuIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2xpc3Rlbkdsb2JhbCIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9saXN0ZW5Eb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtQkFBeUIsc0JBQXNCLENBQUMsQ0FBQTtBQUNoRCw0QkFBeUIsNkNBQTZDLENBQUMsQ0FBQTtBQUN2RSwyQkFBdUQsNENBQTRDLENBQUMsQ0FBQTtBQUNwRyxvQkFBMEQsOEJBQThCLENBQUMsQ0FBQTtBQUN6Riw4QkFBOEMsK0NBQStDLENBQUMsQ0FBQTtBQUU5RixxQkFBbUIsUUFBUSxDQUFDLENBQUE7QUFDNUIsaUNBQThCLDhDQUE4QyxDQUFDLENBQUE7QUFDN0UsNkJBQTBCLDhDQUE4QyxDQUFDLENBQUE7QUFDekUsdUNBQTBDLHdEQUF3RCxDQUFDLENBQUE7QUFFbkc7SUFJRUEsOEJBQ1lBLGNBQTJDQSxFQUFVQSxJQUFnQkEsRUFDckVBLFdBQXVCQSxFQUFVQSxZQUF5QkEsRUFDMURBLGFBQTJCQTtRQUYzQkMsbUJBQWNBLEdBQWRBLGNBQWNBLENBQTZCQTtRQUFVQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFZQTtRQUNyRUEsZ0JBQVdBLEdBQVhBLFdBQVdBLENBQVlBO1FBQVVBLGlCQUFZQSxHQUFaQSxZQUFZQSxDQUFhQTtRQUMxREEsa0JBQWFBLEdBQWJBLGFBQWFBLENBQWNBO0lBQUdBLENBQUNBO0lBRTNDRCxvQ0FBS0EsR0FBTEE7UUFDRUUsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxnQ0FBZ0JBLENBQUNBLENBQUNBO1FBQ3ZFQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSw2QkFBYUEsQ0FBQ0EsQ0FBQ0E7UUFDckNBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsa0NBQWVBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENB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QSxDQUFDQSxLQUFLQSxDQUFDQSxrQkFBa0JBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO0lBQzFEQSxDQUFDQTtJQUVPckIsMENBQVdBLEdBQW5CQSxVQUFvQkEsUUFBa0JBLEVBQUVBLGdCQUEwQkEsSUFBSXNCLGdCQUFnQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUF6SzdGdEI7UUFBQ0EsZUFBVUEsRUFBRUE7OzZCQTBLWkE7SUFBREEsMkJBQUNBO0FBQURBLENBQUNBLEFBMUtELElBMEtDO0FBektZLDRCQUFvQix1QkF5S2hDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFBSSU1JVElWRSwgUmVuZGVyU3RvcmVPYmplY3R9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1Jvb3RSZW5kZXJlciwgUmVuZGVyZXIsIFJlbmRlckNvbXBvbmVudFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtFVkVOVF9DSEFOTkVMLCBSRU5ERVJFUl9DSEFOTkVMfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtiaW5kfSBmcm9tICcuL2JpbmQnO1xuaW1wb3J0IHtFdmVudERpc3BhdGNoZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy91aS9ldmVudF9kaXNwYXRjaGVyJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJhc2VkUmVuZGVyZXIge1xuICBwcml2YXRlIF9ldmVudERpc3BhdGNoZXI6IEV2ZW50RGlzcGF0Y2hlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2Jyb2tlckZhY3Rvcnk6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwgcHJpdmF0ZSBfYnVzOiBNZXNzYWdlQnVzLFxuICAgICAgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHJpdmF0ZSBfcmVuZGVyU3RvcmU6IFJlbmRlclN0b3JlLFxuICAgICAgcHJpdmF0ZSBfcm9vdFJlbmRlcmVyOiBSb290UmVuZGVyZXIpIHt9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgdmFyIGJyb2tlciA9IHRoaXMuX2Jyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihSRU5ERVJFUl9DSEFOTkVMKTtcbiAgICB0aGlzLl9idXMuaW5pdENoYW5uZWwoRVZFTlRfQ0hBTk5FTCk7XG4gICAgdGhpcy5fZXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcih0aGlzLl9idXMudG8oRVZFTlRfQ0hBTk5FTCksIHRoaXMuX3NlcmlhbGl6ZXIpO1xuXG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAncmVuZGVyQ29tcG9uZW50JywgW1JlbmRlckNvbXBvbmVudFR5cGUsIFBSSU1JVElWRV0sIGJpbmQodGhpcy5fcmVuZGVyQ29tcG9uZW50LCB0aGlzKSk7XG5cbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdzZWxlY3RSb290RWxlbWVudCcsIFtSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICBiaW5kKHRoaXMuX3NlbGVjdFJvb3RFbGVtZW50LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAnY3JlYXRlRWxlbWVudCcsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgYmluZCh0aGlzLl9jcmVhdGVFbGVtZW50LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAnY3JlYXRlVmlld1Jvb3QnLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkVdLFxuICAgICAgICBiaW5kKHRoaXMuX2NyZWF0ZVZpZXdSb290LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAnY3JlYXRlVGVtcGxhdGVBbmNob3InLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkVdLFxuICAgICAgICBiaW5kKHRoaXMuX2NyZWF0ZVRlbXBsYXRlQW5jaG9yLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAnY3JlYXRlVGV4dCcsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgYmluZCh0aGlzLl9jcmVhdGVUZXh0LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAncHJvamVjdE5vZGVzJywgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3RdLFxuICAgICAgICBiaW5kKHRoaXMuX3Byb2plY3ROb2RlcywgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ2F0dGFjaFZpZXdBZnRlcicsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0XSxcbiAgICAgICAgYmluZCh0aGlzLl9hdHRhY2hWaWV3QWZ0ZXIsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdkZXRhY2hWaWV3JywgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdF0sIGJpbmQodGhpcy5fZGV0YWNoVmlldywgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ2Rlc3Ryb3lWaWV3JywgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3RdLFxuICAgICAgICBiaW5kKHRoaXMuX2Rlc3Ryb3lWaWV3LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAnc2V0RWxlbWVudFByb3BlcnR5JywgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICBiaW5kKHRoaXMuX3NldEVsZW1lbnRQcm9wZXJ0eSwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ3NldEVsZW1lbnRBdHRyaWJ1dGUnLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgIGJpbmQodGhpcy5fc2V0RWxlbWVudEF0dHJpYnV0ZSwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ3NldEJpbmRpbmdEZWJ1Z0luZm8nLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgIGJpbmQodGhpcy5fc2V0QmluZGluZ0RlYnVnSW5mbywgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ3NldEVsZW1lbnRDbGFzcycsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgYmluZCh0aGlzLl9zZXRFbGVtZW50Q2xhc3MsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdzZXRFbGVtZW50U3R5bGUnLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgIGJpbmQodGhpcy5fc2V0RWxlbWVudFN0eWxlLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAnaW52b2tlRWxlbWVudE1ldGhvZCcsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgYmluZCh0aGlzLl9pbnZva2VFbGVtZW50TWV0aG9kLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFxuICAgICAgICAnc2V0VGV4dCcsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRV0sIGJpbmQodGhpcy5fc2V0VGV4dCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ2xpc3RlbicsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgYmluZCh0aGlzLl9saXN0ZW4sIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXG4gICAgICAgICdsaXN0ZW5HbG9iYWwnLCBbUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICBiaW5kKHRoaXMuX2xpc3Rlbkdsb2JhbCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcbiAgICAgICAgJ2xpc3RlbkRvbmUnLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0XSwgYmluZCh0aGlzLl9saXN0ZW5Eb25lLCB0aGlzKSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW5kZXJDb21wb25lbnQocmVuZGVyQ29tcG9uZW50VHlwZTogUmVuZGVyQ29tcG9uZW50VHlwZSwgcmVuZGVyZXJJZDogbnVtYmVyKSB7XG4gICAgdmFyIHJlbmRlcmVyID0gdGhpcy5fcm9vdFJlbmRlcmVyLnJlbmRlckNvbXBvbmVudChyZW5kZXJDb21wb25lbnRUeXBlKTtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyZW5kZXJlciwgcmVuZGVyZXJJZCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RSb290RWxlbWVudChyZW5kZXJlcjogUmVuZGVyZXIsIHNlbGVjdG9yOiBzdHJpbmcsIGVsSWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yKSwgZWxJZCk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVFbGVtZW50KHJlbmRlcmVyOiBSZW5kZXJlciwgcGFyZW50RWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIGVsSWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQocGFyZW50RWxlbWVudCwgbmFtZSksIGVsSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlVmlld1Jvb3QocmVuZGVyZXI6IFJlbmRlcmVyLCBob3N0RWxlbWVudDogYW55LCBlbElkOiBudW1iZXIpIHtcbiAgICB2YXIgdmlld1Jvb3QgPSByZW5kZXJlci5jcmVhdGVWaWV3Um9vdChob3N0RWxlbWVudCk7XG4gICAgaWYgKHRoaXMuX3JlbmRlclN0b3JlLnNlcmlhbGl6ZShob3N0RWxlbWVudCkgIT09IGVsSWQpIHtcbiAgICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHZpZXdSb290LCBlbElkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVUZW1wbGF0ZUFuY2hvcihyZW5kZXJlcjogUmVuZGVyZXIsIHBhcmVudEVsZW1lbnQ6IGFueSwgZWxJZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUocmVuZGVyZXIuY3JlYXRlVGVtcGxhdGVBbmNob3IocGFyZW50RWxlbWVudCksIGVsSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlVGV4dChyZW5kZXJlcjogUmVuZGVyZXIsIHBhcmVudEVsZW1lbnQ6IGFueSwgdmFsdWU6IHN0cmluZywgZWxJZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUocmVuZGVyZXIuY3JlYXRlVGV4dChwYXJlbnRFbGVtZW50LCB2YWx1ZSksIGVsSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvamVjdE5vZGVzKHJlbmRlcmVyOiBSZW5kZXJlciwgcGFyZW50RWxlbWVudDogYW55LCBub2RlczogYW55W10pIHtcbiAgICByZW5kZXJlci5wcm9qZWN0Tm9kZXMocGFyZW50RWxlbWVudCwgbm9kZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0YWNoVmlld0FmdGVyKHJlbmRlcmVyOiBSZW5kZXJlciwgbm9kZTogYW55LCB2aWV3Um9vdE5vZGVzOiBhbnlbXSkge1xuICAgIHJlbmRlcmVyLmF0dGFjaFZpZXdBZnRlcihub2RlLCB2aWV3Um9vdE5vZGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2RldGFjaFZpZXcocmVuZGVyZXI6IFJlbmRlcmVyLCB2aWV3Um9vdE5vZGVzOiBhbnlbXSkge1xuICAgIHJlbmRlcmVyLmRldGFjaFZpZXcodmlld1Jvb3ROb2Rlcyk7XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95VmlldyhyZW5kZXJlcjogUmVuZGVyZXIsIGhvc3RFbGVtZW50OiBhbnksIHZpZXdBbGxOb2RlczogYW55W10pIHtcbiAgICByZW5kZXJlci5kZXN0cm95Vmlldyhob3N0RWxlbWVudCwgdmlld0FsbE5vZGVzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXdBbGxOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fcmVuZGVyU3RvcmUucmVtb3ZlKHZpZXdBbGxOb2Rlc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0RWxlbWVudFByb3BlcnR5KFxuICAgICAgcmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBhbnkpIHtcbiAgICByZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkocmVuZGVyRWxlbWVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEVsZW1lbnRBdHRyaWJ1dGUoXG4gICAgICByZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgYXR0cmlidXRlTmFtZTogc3RyaW5nLCBhdHRyaWJ1dGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgcmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRCaW5kaW5nRGVidWdJbmZvKFxuICAgICAgcmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBzdHJpbmcpIHtcbiAgICByZW5kZXJlci5zZXRCaW5kaW5nRGVidWdJbmZvKHJlbmRlckVsZW1lbnQsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRFbGVtZW50Q2xhc3MoXG4gICAgICByZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcsIGlzQWRkOiBib29sZWFuKSB7XG4gICAgcmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKHJlbmRlckVsZW1lbnQsIGNsYXNzTmFtZSwgaXNBZGQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0RWxlbWVudFN0eWxlKFxuICAgICAgcmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlOiBzdHJpbmcpIHtcbiAgICByZW5kZXJlci5zZXRFbGVtZW50U3R5bGUocmVuZGVyRWxlbWVudCwgc3R5bGVOYW1lLCBzdHlsZVZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ludm9rZUVsZW1lbnRNZXRob2QoXG4gICAgICByZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSkge1xuICAgIHJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyRWxlbWVudCwgbWV0aG9kTmFtZSwgYXJncyk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRUZXh0KHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyTm9kZTogYW55LCB0ZXh0OiBzdHJpbmcpIHtcbiAgICByZW5kZXJlci5zZXRUZXh0KHJlbmRlck5vZGUsIHRleHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuKHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyRWxlbWVudDogYW55LCBldmVudE5hbWU6IHN0cmluZywgdW5saXN0ZW5JZDogbnVtYmVyKSB7XG4gICAgdmFyIHVucmVnaXN0ZXJDYWxsYmFjayA9IHJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgcmVuZGVyRWxlbWVudCwgZXZlbnROYW1lLCAoZXZlbnQpID0+IHRoaXMuX2V2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaFJlbmRlckV2ZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJFbGVtZW50LCBudWxsLCBldmVudE5hbWUsIGV2ZW50KSk7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUodW5yZWdpc3RlckNhbGxiYWNrLCB1bmxpc3RlbklkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3Rlbkdsb2JhbChcbiAgICAgIHJlbmRlcmVyOiBSZW5kZXJlciwgZXZlbnRUYXJnZXQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsIHVubGlzdGVuSWQ6IG51bWJlcikge1xuICAgIHZhciB1bnJlZ2lzdGVyQ2FsbGJhY2sgPSByZW5kZXJlci5saXN0ZW5HbG9iYWwoXG4gICAgICAgIGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsXG4gICAgICAgIChldmVudCkgPT4gdGhpcy5fZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoUmVuZGVyRXZlbnQobnVsbCwgZXZlbnRUYXJnZXQsIGV2ZW50TmFtZSwgZXZlbnQpKTtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZSh1bnJlZ2lzdGVyQ2FsbGJhY2ssIHVubGlzdGVuSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuRG9uZShyZW5kZXJlcjogUmVuZGVyZXIsIHVubGlzdGVuQ2FsbGJhY2s6IEZ1bmN0aW9uKSB7IHVubGlzdGVuQ2FsbGJhY2soKTsgfVxufVxuIl19
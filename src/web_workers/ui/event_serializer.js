'use strict';var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var MOUSE_EVENT_PROPERTIES = [
    'altKey', 'button', 'clientX', 'clientY', 'metaKey', 'movementX', 'movementY', 'offsetX',
    'offsetY', 'region', 'screenX', 'screenY', 'shiftKey'
];
var KEYBOARD_EVENT_PROPERTIES = [
    'altkey', 'charCode', 'code', 'ctrlKey', 'isComposing', 'key', 'keyCode', 'location', 'metaKey',
    'repeat', 'shiftKey', 'which'
];
var TRANSITION_EVENT_PROPERTIES = ['propertyName', 'elapsedTime', 'pseudoElement'];
var EVENT_PROPERTIES = ['type', 'bubbles', 'cancelable'];
var NODES_WITH_VALUE = new collection_1.Set(['input', 'select', 'option', 'button', 'li', 'meter', 'progress', 'param']);
function serializeGenericEvent(e) {
    return serializeEvent(e, EVENT_PROPERTIES);
}
exports.serializeGenericEvent = serializeGenericEvent;
// TODO(jteplitz602): Allow users to specify the properties they need rather than always
// adding value and files #3374
function serializeEventWithTarget(e) {
    var serializedEvent = serializeEvent(e, EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
exports.serializeEventWithTarget = serializeEventWithTarget;
function serializeMouseEvent(e) {
    return serializeEvent(e, MOUSE_EVENT_PROPERTIES);
}
exports.serializeMouseEvent = serializeMouseEvent;
function serializeKeyboardEvent(e) {
    var serializedEvent = serializeEvent(e, KEYBOARD_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
exports.serializeKeyboardEvent = serializeKeyboardEvent;
function serializeTransitionEvent(e) {
    var serializedEvent = serializeEvent(e, TRANSITION_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
exports.serializeTransitionEvent = serializeTransitionEvent;
// TODO(jteplitz602): #3374. See above.
function addTarget(e, serializedEvent) {
    if (NODES_WITH_VALUE.has(e.target.tagName.toLowerCase())) {
        var target = e.target;
        serializedEvent['target'] = { 'value': target.value };
        if (lang_1.isPresent(target.files)) {
            serializedEvent['target']['files'] = target.files;
        }
    }
    return serializedEvent;
}
function serializeEvent(e, properties) {
    var serialized = {};
    for (var i = 0; i < properties.length; i++) {
        var prop = properties[i];
        serialized[prop] = e[prop];
    }
    return serialized;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtVjN2MFZKRkgudG1wL2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy91aS9ldmVudF9zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbInNlcmlhbGl6ZUdlbmVyaWNFdmVudCIsInNlcmlhbGl6ZUV2ZW50V2l0aFRhcmdldCIsInNlcmlhbGl6ZU1vdXNlRXZlbnQiLCJzZXJpYWxpemVLZXlib2FyZEV2ZW50Iiwic2VyaWFsaXplVHJhbnNpdGlvbkV2ZW50IiwiYWRkVGFyZ2V0Iiwic2VyaWFsaXplRXZlbnQiXSwibWFwcGluZ3MiOiJBQUFBLDJCQUFrQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ25ELHFCQUF3QiwwQkFBMEIsQ0FBQyxDQUFBO0FBRW5ELElBQU0sc0JBQXNCLEdBQUc7SUFDN0IsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVM7SUFDeEYsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVU7Q0FDdEQsQ0FBQztBQUVGLElBQU0seUJBQXlCLEdBQUc7SUFDaEMsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTO0lBQy9GLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTztDQUM5QixDQUFDO0FBRUYsSUFBTSwyQkFBMkIsR0FBRyxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFckYsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFM0QsSUFBTSxnQkFBZ0IsR0FDbEIsSUFBSSxnQkFBRyxDQUFDLENBQUMsT0FBTyxF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bnRlbnQiOlsiaW1wb3J0IHtTZXR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuY29uc3QgTU9VU0VfRVZFTlRfUFJPUEVSVElFUyA9IFtcbiAgJ2FsdEtleScsICdidXR0b24nLCAnY2xpZW50WCcsICdjbGllbnRZJywgJ21ldGFLZXknLCAnbW92ZW1lbnRYJywgJ21vdmVtZW50WScsICdvZmZzZXRYJyxcbiAgJ29mZnNldFknLCAncmVnaW9uJywgJ3NjcmVlblgnLCAnc2NyZWVuWScsICdzaGlmdEtleSdcbl07XG5cbmNvbnN0IEtFWUJPQVJEX0VWRU5UX1BST1BFUlRJRVMgPSBbXG4gICdhbHRrZXknLCAnY2hhckNvZGUnLCAnY29kZScsICdjdHJsS2V5JywgJ2lzQ29tcG9zaW5nJywgJ2tleScsICdrZXlDb2RlJywgJ2xvY2F0aW9uJywgJ21ldGFLZXknLFxuICAncmVwZWF0JywgJ3NoaWZ0S2V5JywgJ3doaWNoJ1xuXTtcblxuY29uc3QgVFJBTlNJVElPTl9FVkVOVF9QUk9QRVJUSUVTID0gWydwcm9wZXJ0eU5hbWUnLCAnZWxhcHNlZFRpbWUnLCAncHNldWRvRWxlbWVudCddO1xuXG5jb25zdCBFVkVOVF9QUk9QRVJUSUVTID0gWyd0eXBlJywgJ2J1YmJsZXMnLCAnY2FuY2VsYWJsZSddO1xuXG5jb25zdCBOT0RFU19XSVRIX1ZBTFVFID1cbiAgICBuZXcgU2V0KFsnaW5wdXQnLCAnc2VsZWN0JywgJ29wdGlvbicsICdidXR0b24nLCAnbGknLCAnbWV0ZXInLCAncHJvZ3Jlc3MnLCAncGFyYW0nXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVHZW5lcmljRXZlbnQoZTogRXZlbnQpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIHJldHVybiBzZXJpYWxpemVFdmVudChlLCBFVkVOVF9QUk9QRVJUSUVTKTtcbn1cblxuLy8gVE9ETyhqdGVwbGl0ejYwMik6IEFsbG93IHVzZXJzIHRvIHNwZWNpZnkgdGhlIHByb3BlcnRpZXMgdGhleSBuZWVkIHJhdGhlciB0aGFuIGFsd2F5c1xuLy8gYWRkaW5nIHZhbHVlIGFuZCBmaWxlcyAjMzM3NFxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUV2ZW50V2l0aFRhcmdldChlOiBFdmVudCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgdmFyIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUV2ZW50KGUsIEVWRU5UX1BST1BFUlRJRVMpO1xuICByZXR1cm4gYWRkVGFyZ2V0KGUsIHNlcmlhbGl6ZWRFdmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVNb3VzZUV2ZW50KGU6IE1vdXNlRXZlbnQpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIHJldHVybiBzZXJpYWxpemVFdmVudChlLCBNT1VTRV9FVkVOVF9QUk9QRVJUSUVTKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUtleWJvYXJkRXZlbnQoZTogS2V5Ym9hcmRFdmVudCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgdmFyIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUV2ZW50KGUsIEtFWUJPQVJEX0VWRU5UX1BST1BFUlRJRVMpO1xuICByZXR1cm4gYWRkVGFyZ2V0KGUsIHNlcmlhbGl6ZWRFdmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVUcmFuc2l0aW9uRXZlbnQoZTogVHJhbnNpdGlvbkV2ZW50KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICB2YXIgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplRXZlbnQoZSwgVFJBTlNJVElPTl9FVkVOVF9QUk9QRVJUSUVTKTtcbiAgcmV0dXJuIGFkZFRhcmdldChlLCBzZXJpYWxpemVkRXZlbnQpO1xufVxuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogIzMzNzQuIFNlZSBhYm92ZS5cbmZ1bmN0aW9uIGFkZFRhcmdldChlOiBFdmVudCwgc2VyaWFsaXplZEV2ZW50OiB7W2tleTogc3RyaW5nXTogYW55fSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgaWYgKE5PREVTX1dJVEhfVkFMVUUuaGFzKCg8SFRNTEVsZW1lbnQ+ZS50YXJnZXQpLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICB2YXIgdGFyZ2V0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZS50YXJnZXQ7XG4gICAgc2VyaWFsaXplZEV2ZW50Wyd0YXJnZXQnXSA9IHsndmFsdWUnOiB0YXJnZXQudmFsdWV9O1xuICAgIGlmIChpc1ByZXNlbnQodGFyZ2V0LmZpbGVzKSkge1xuICAgICAgc2VyaWFsaXplZEV2ZW50Wyd0YXJnZXQnXVsnZmlsZXMnXSA9IHRhcmdldC5maWxlcztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNlcmlhbGl6ZWRFdmVudDtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplRXZlbnQoZTogYW55LCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgdmFyIHNlcmlhbGl6ZWQgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgIHNlcmlhbGl6ZWRbcHJvcF0gPSBlW3Byb3BdO1xuICB9XG4gIHJldHVybiBzZXJpYWxpemVkO1xufVxuIl19
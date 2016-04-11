'use strict';var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var validators_1 = require('../validators');
var default_value_accessor_1 = require('./default_value_accessor');
var number_value_accessor_1 = require('./number_value_accessor');
var checkbox_value_accessor_1 = require('./checkbox_value_accessor');
var select_control_value_accessor_1 = require('./select_control_value_accessor');
var radio_control_value_accessor_1 = require('./radio_control_value_accessor');
var normalize_validator_1 = require('./normalize_validator');
function controlPath(name, parent) {
    var p = collection_1.ListWrapper.clone(parent.path);
    p.push(name);
    return p;
}
exports.controlPath = controlPath;
function setUpControl(control, dir) {
    if (lang_1.isBlank(control))
        _throwError(dir, 'Cannot find control');
    if (lang_1.isBlank(dir.valueAccessor))
        _throwError(dir, 'No value accessor for');
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    dir.valueAccessor.writeValue(control.value);
    // view -> model
    dir.valueAccessor.registerOnChange(function (newValue) {
        dir.viewToModelUpdate(newValue);
        control.updateValue(newValue, { emitModelToViewChange: false });
        control.markAsDirty();
    });
    // model -> view
    control.registerOnChange(function (newValue) { return dir.valueAccessor.writeValue(newValue); });
    // touched
    dir.valueAccessor.registerOnTouched(function () { return control.markAsTouched(); });
}
exports.setUpControl = setUpControl;
function setUpControlGroup(control, dir) {
    if (lang_1.isBlank(control))
        _throwError(dir, 'Cannot find control');
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
}
exports.setUpControlGroup = setUpControlGroup;
function _throwError(dir, message) {
    var path = dir.path.join(' -> ');
    throw new exceptions_1.BaseException(message + " '" + path + "'");
}
function composeValidators(validators) {
    return lang_1.isPresent(validators) ? validators_1.Validators.compose(validators.map(normalize_validator_1.normalizeValidator)) : null;
}
exports.composeValidators = composeValidators;
function composeAsyncValidators(validators) {
    return lang_1.isPresent(validators) ? validators_1.Validators.composeAsync(validators.map(normalize_validator_1.normalizeAsyncValidator)) :
        null;
}
exports.composeAsyncValidators = composeAsyncValidators;
function isPropertyUpdated(changes, viewModel) {
    if (!collection_1.StringMapWrapper.contains(changes, 'model'))
        return false;
    var change = changes['model'];
    if (change.isFirstChange())
        return true;
    return !lang_1.looseIdentical(viewModel, change.currentValue);
}
exports.isPropertyUpdated = isPropertyUpdated;
// TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
function selectValueAccessor(dir, valueAccessors) {
    if (lang_1.isBlank(valueAccessors))
        return null;
    var defaultAccessor;
    var builtinAccessor;
    var customAccessor;
    valueAccessors.forEach(function (v) {
        if (lang_1.hasConstructor(v, default_value_accessor_1.DefaultValueAccessor)) {
            defaultAccessor = v;
        }
        else if (lang_1.hasConstructor(v, checkbox_value_accessor_1.CheckboxControlValueAccessor) || lang_1.hasConstructor(v, number_value_accessor_1.NumberValueAccessor) ||
            lang_1.hasConstructor(v, select_control_value_accessor_1.SelectControlValueAccessor) ||
            lang_1.hasConstructor(v, radio_control_value_accessor_1.RadioControlValueAccessor)) {
            if (lang_1.isPresent(builtinAccessor))
                _throwError(dir, 'More than one built-in value accessor matches');
            builtinAccessor = v;
        }
        else {
            if (lang_1.isPresent(customAccessor))
                _throwError(dir, 'More than one custom value accessor matches');
            customAccessor = v;
        }
    });
    if (lang_1.isPresent(customAccessor))
        return customAccessor;
    if (lang_1.isPresent(builtinAccessor))
        return builtinAccessor;
    if (lang_1.isPresent(defaultAccessor))
        return defaultAccessor;
    _throwError(dir, 'No valid value accessor for');
    return null;
}
exports.selectValueAccessor = selectValueAccessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1WM3YwVkpGSC50bXAvYW5ndWxhcjIvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3NoYXJlZC50cyJdLCJuYW1lcyI6WyJjb250cm9sUGF0aCIsInNldFVwQ29udHJvbCIsInNldFVwQ29udHJvbEdyb3VwIiwiX3Rocm93RXJyb3IiLCJjb21wb3NlVmFsaWRhdG9ycyIsImNvbXBvc2VBc3luY1ZhbGlkYXRvcnMiLCJpc1Byb3BlcnR5VXBkYXRlZCIsInNlbGVjdFZhbHVlQWNjZXNzb3IiXSwibWFwcGluZ3MiOiJBQUFBLDJCQUE0QyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzdFLHFCQUFpRSwwQkFBMEIsQ0FBQyxDQUFBO0FBQzVGLDJCQUE4QyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBTy9FLDJCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUV6Qyx1Q0FBbUMsMEJBQTBCLENBQUMsQ0FBQTtBQUM5RCxzQ0FBa0MseUJBQXlCLENBQUMsQ0FBQTtBQUM1RCx3Q0FBMkMsMkJBQTJCLENBQUMsQ0FBQTtBQUN2RSw4Q0FBeUMsaUNBQWlDLENBQUMsQ0FBQTtBQUMzRSw2Q0FBd0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUN6RSxvQ0FBMEQsdUJBQXVCLENBQUMsQ0FBQTtBQUlsRixxQkFBNEIsSUFBWSxFQUFFLE1BQXdCO0lBQ2hFQSxJQUFJQSxDQUFDQSxHQUFHQSx3QkFBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDdkNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ2JBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO0FBQ1hBLENBQUNBO0FBSmUsbUJBQVcsY0FJMUIsQ0FBQTtBQUVELHNCQUE2QixPQUFnQixFQUFFLEdBQWM7SUFDM0RDLEVBQUVBLENBQUNBLENBQUNB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Q0E7SUFDdkRBLEVBQUVBLENBQUNBLENBQUNBLGdCQUFTQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtRQUFDQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQTtJQUV2REEsV0FBV0EsQ0FBQ0EsR0FBR0EsRUFBRUEsNkJBQTZCQSxDQUFDQSxDQUFDQTtJQUNoREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7QUFDZEEsQ0FBQ0E7QUFoQ2UsMkJBQW1CLHNCQWdDbEMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgbG9vc2VJZGVudGljYWwsIGhhc0NvbnN0cnVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG5pbXBvcnQge0NvbnRyb2xDb250YWluZXJ9IGZyb20gJy4vY29udHJvbF9jb250YWluZXInO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJy4vbmdfY29udHJvbCc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbERpcmVjdGl2ZX0gZnJvbSAnLi9hYnN0cmFjdF9jb250cm9sX2RpcmVjdGl2ZSc7XG5pbXBvcnQge05nQ29udHJvbEdyb3VwfSBmcm9tICcuL25nX2NvbnRyb2xfZ3JvdXAnO1xuaW1wb3J0IHtDb250cm9sLCBDb250cm9sR3JvdXB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7VmFsaWRhdG9yc30gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtEZWZhdWx0VmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kZWZhdWx0X3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7TnVtYmVyVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9udW1iZXJfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2NoZWNrYm94X3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7U2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vc2VsZWN0X2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL3JhZGlvX2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtub3JtYWxpemVWYWxpZGF0b3IsIG5vcm1hbGl6ZUFzeW5jVmFsaWRhdG9yfSBmcm9tICcuL25vcm1hbGl6ZV92YWxpZGF0b3InO1xuaW1wb3J0IHtWYWxpZGF0b3JGbiwgQXN5bmNWYWxpZGF0b3JGbn0gZnJvbSAnLi92YWxpZGF0b3JzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gY29udHJvbFBhdGgobmFtZTogc3RyaW5nLCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIpOiBzdHJpbmdbXSB7XG4gIHZhciBwID0gTGlzdFdyYXBwZXIuY2xvbmUocGFyZW50LnBhdGgpO1xuICBwLnB1c2gobmFtZSk7XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VXBDb250cm9sKGNvbnRyb2w6IENvbnRyb2wsIGRpcjogTmdDb250cm9sKTogdm9pZCB7XG4gIGlmIChpc0JsYW5rKGNvbnRyb2wpKSBfdGhyb3dFcnJvcihkaXIsICdDYW5ub3QgZmluZCBjb250cm9sJyk7XG4gIGlmIChpc0JsYW5rKGRpci52YWx1ZUFjY2Vzc29yKSkgX3Rocm93RXJyb3IoZGlyLCAnTm8gdmFsdWUgYWNjZXNzb3IgZm9yJyk7XG5cbiAgY29udHJvbC52YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2UoW2NvbnRyb2wudmFsaWRhdG9yLCBkaXIudmFsaWRhdG9yXSk7XG4gIGNvbnRyb2wuYXN5bmNWYWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyhbY29udHJvbC5hc3luY1ZhbGlkYXRvciwgZGlyLmFzeW5jVmFsaWRhdG9yXSk7XG4gIGRpci52YWx1ZUFjY2Vzc29yLndyaXRlVmFsdWUoY29udHJvbC52YWx1ZSk7XG5cbiAgLy8gdmlldyAtPiBtb2RlbFxuICBkaXIudmFsdWVBY2Nlc3Nvci5yZWdpc3Rlck9uQ2hhbmdlKChuZXdWYWx1ZTogYW55KSA9PiB7XG4gICAgZGlyLnZpZXdUb01vZGVsVXBkYXRlKG5ld1ZhbHVlKTtcbiAgICBjb250cm9sLnVwZGF0ZVZhbHVlKG5ld1ZhbHVlLCB7ZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZX0pO1xuICAgIGNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgfSk7XG5cbiAgLy8gbW9kZWwgLT4gdmlld1xuICBjb250cm9sLnJlZ2lzdGVyT25DaGFuZ2UoKG5ld1ZhbHVlOiBhbnkpID0+IGRpci52YWx1ZUFjY2Vzc29yLndyaXRlVmFsdWUobmV3VmFsdWUpKTtcblxuICAvLyB0b3VjaGVkXG4gIGRpci52YWx1ZUFjY2Vzc29yLnJlZ2lzdGVyT25Ub3VjaGVkKCgpID0+IGNvbnRyb2wubWFya0FzVG91Y2hlZCgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFVwQ29udHJvbEdyb3VwKGNvbnRyb2w6IENvbnRyb2xHcm91cCwgZGlyOiBOZ0NvbnRyb2xHcm91cCkge1xuICBpZiAoaXNCbGFuayhjb250cm9sKSkgX3Rocm93RXJyb3IoZGlyLCAnQ2Fubm90IGZpbmQgY29udHJvbCcpO1xuICBjb250cm9sLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZShbY29udHJvbC52YWxpZGF0b3IsIGRpci52YWxpZGF0b3JdKTtcbiAgY29udHJvbC5hc3luY1ZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZUFzeW5jKFtjb250cm9sLmFzeW5jVmFsaWRhdG9yLCBkaXIuYXN5bmNWYWxpZGF0b3JdKTtcbn1cblxuZnVuY3Rpb24gX3Rocm93RXJyb3IoZGlyOiBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICB2YXIgcGF0aCA9IGRpci5wYXRoLmpvaW4oJyAtPiAnKTtcbiAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYCR7bWVzc2FnZX0gJyR7cGF0aH0nYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlVmFsaWRhdG9ycyh2YWxpZGF0b3JzOiAvKiBBcnJheTxWYWxpZGF0b3J8RnVuY3Rpb24+ICovIGFueVtdKTogVmFsaWRhdG9yRm4ge1xuICByZXR1cm4gaXNQcmVzZW50KHZhbGlkYXRvcnMpID8gVmFsaWRhdG9ycy5jb21wb3NlKHZhbGlkYXRvcnMubWFwKG5vcm1hbGl6ZVZhbGlkYXRvcikpIDogbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2VBc3luY1ZhbGlkYXRvcnModmFsaWRhdG9yczogLyogQXJyYXk8VmFsaWRhdG9yfEZ1bmN0aW9uPiAqLyBhbnlbXSk6XG4gICAgQXN5bmNWYWxpZGF0b3JGbiB7XG4gIHJldHVybiBpc1ByZXNlbnQodmFsaWRhdG9ycykgPyBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyh2YWxpZGF0b3JzLm1hcChub3JtYWxpemVBc3luY1ZhbGlkYXRvcikpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb3BlcnR5VXBkYXRlZChjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogYW55fSwgdmlld01vZGVsOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKCFTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKGNoYW5nZXMsICdtb2RlbCcpKSByZXR1cm4gZmFsc2U7XG4gIHZhciBjaGFuZ2UgPSBjaGFuZ2VzWydtb2RlbCddO1xuXG4gIGlmIChjaGFuZ2UuaXNGaXJzdENoYW5nZSgpKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuICFsb29zZUlkZW50aWNhbCh2aWV3TW9kZWwsIGNoYW5nZS5jdXJyZW50VmFsdWUpO1xufVxuXG4vLyBUT0RPOiB2c2F2a2luIHJlbW92ZSBpdCBvbmNlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzMwMTEgaXMgaW1wbGVtZW50ZWRcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RWYWx1ZUFjY2Vzc29yKFxuICAgIGRpcjogTmdDb250cm9sLCB2YWx1ZUFjY2Vzc29yczogQ29udHJvbFZhbHVlQWNjZXNzb3JbXSk6IENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgaWYgKGlzQmxhbmsodmFsdWVBY2Nlc3NvcnMpKSByZXR1cm4gbnVsbDtcblxuICB2YXIgZGVmYXVsdEFjY2Vzc29yOiBDb250cm9sVmFsdWVBY2Nlc3NvcjtcbiAgdmFyIGJ1aWx0aW5BY2Nlc3NvcjogQ29udHJvbFZhbHVlQWNjZXNzb3I7XG4gIHZhciBjdXN0b21BY2Nlc3NvcjogQ29udHJvbFZhbHVlQWNjZXNzb3I7XG4gIHZhbHVlQWNjZXNzb3JzLmZvckVhY2goKHY6IENvbnRyb2xWYWx1ZUFjY2Vzc29yKSA9PiB7XG4gICAgaWYgKGhhc0NvbnN0cnVjdG9yKHYsIERlZmF1bHRWYWx1ZUFjY2Vzc29yKSkge1xuICAgICAgZGVmYXVsdEFjY2Vzc29yID0gdjtcblxuICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGhhc0NvbnN0cnVjdG9yKHYsIENoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3IpIHx8IGhhc0NvbnN0cnVjdG9yKHYsIE51bWJlclZhbHVlQWNjZXNzb3IpIHx8XG4gICAgICAgIGhhc0NvbnN0cnVjdG9yKHYsIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yKSB8fFxuICAgICAgICBoYXNDb25zdHJ1Y3Rvcih2LCBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yKSkge1xuICAgICAgaWYgKGlzUHJlc2VudChidWlsdGluQWNjZXNzb3IpKVxuICAgICAgICBfdGhyb3dFcnJvcihkaXIsICdNb3JlIHRoYW4gb25lIGJ1aWx0LWluIHZhbHVlIGFjY2Vzc29yIG1hdGNoZXMnKTtcbiAgICAgIGJ1aWx0aW5BY2Nlc3NvciA9IHY7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzUHJlc2VudChjdXN0b21BY2Nlc3NvcikpXG4gICAgICAgIF90aHJvd0Vycm9yKGRpciwgJ01vcmUgdGhhbiBvbmUgY3VzdG9tIHZhbHVlIGFjY2Vzc29yIG1hdGNoZXMnKTtcbiAgICAgIGN1c3RvbUFjY2Vzc29yID0gdjtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChpc1ByZXNlbnQoY3VzdG9tQWNjZXNzb3IpKSByZXR1cm4gY3VzdG9tQWNjZXNzb3I7XG4gIGlmIChpc1ByZXNlbnQoYnVpbHRpbkFjY2Vzc29yKSkgcmV0dXJuIGJ1aWx0aW5BY2Nlc3NvcjtcbiAgaWYgKGlzUHJlc2VudChkZWZhdWx0QWNjZXNzb3IpKSByZXR1cm4gZGVmYXVsdEFjY2Vzc29yO1xuXG4gIF90aHJvd0Vycm9yKGRpciwgJ05vIHZhbGlkIHZhbHVlIGFjY2Vzc29yIGZvcicpO1xuICByZXR1cm4gbnVsbDtcbn1cbiJdfQ==
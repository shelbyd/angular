'use strict';var lang_1 = require('angular2/src/facade/lang');
var CAMEL_CASE_REGEXP = /([A-Z])/g;
var DASH_CASE_REGEXP = /-([a-z])/g;
var SINGLE_QUOTE_ESCAPE_STRING_RE = /'|\\|\n|\r|\$/g;
var DOUBLE_QUOTE_ESCAPE_STRING_RE = /"|\\|\n|\r|\$/g;
exports.MODULE_SUFFIX = lang_1.IS_DART ? '.dart' : '.js';
exports.CONST_VAR = lang_1.IS_DART ? 'const' : 'var';
function camelCaseToDashCase(input) {
    return lang_1.StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, function (m) { return '-' + m[1].toLowerCase(); });
}
exports.camelCaseToDashCase = camelCaseToDashCase;
function dashCaseToCamelCase(input) {
    return lang_1.StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, function (m) { return m[1].toUpperCase(); });
}
exports.dashCaseToCamelCase = dashCaseToCamelCase;
function escapeSingleQuoteString(input) {
    if (lang_1.isBlank(input)) {
        return null;
    }
    return "'" + escapeString(input, SINGLE_QUOTE_ESCAPE_STRING_RE) + "'";
}
exports.escapeSingleQuoteString = escapeSingleQuoteString;
function escapeDoubleQuoteString(input) {
    if (lang_1.isBlank(input)) {
        return null;
    }
    return "\"" + escapeString(input, DOUBLE_QUOTE_ESCAPE_STRING_RE) + "\"";
}
exports.escapeDoubleQuoteString = escapeDoubleQuoteString;
function escapeString(input, re) {
    return lang_1.StringWrapper.replaceAllMapped(input, re, function (match) {
        if (match[0] == '$') {
            return lang_1.IS_DART ? '\\$' : '$';
        }
        else if (match[0] == '\n') {
            return '\\n';
        }
        else if (match[0] == '\r') {
            return '\\r';
        }
        else {
            return "\\" + match[0];
        }
    });
}
function codeGenExportVariable(name) {
    if (lang_1.IS_DART) {
        return "const " + name + " = ";
    }
    else {
        return "var " + name + " = exports['" + name + "'] = ";
    }
}
exports.codeGenExportVariable = codeGenExportVariable;
function codeGenConstConstructorCall(name) {
    if (lang_1.IS_DART) {
        return "const " + name;
    }
    else {
        return "new " + name;
    }
}
exports.codeGenConstConstructorCall = codeGenConstConstructorCall;
function codeGenValueFn(params, value, fnName) {
    if (fnName === void 0) { fnName = ''; }
    if (lang_1.IS_DART) {
        return codeGenFnHeader(params, fnName) + " => " + value;
    }
    else {
        return codeGenFnHeader(params, fnName) + " { return " + value + "; }";
    }
}
exports.codeGenValueFn = codeGenValueFn;
function codeGenFnHeader(params, fnName) {
    if (fnName === void 0) { fnName = ''; }
    if (lang_1.IS_DART) {
        return fnName + "(" + params.join(',') + ")";
    }
    else {
        return "function " + fnName + "(" + params.join(',') + ")";
    }
}
exports.codeGenFnHeader = codeGenFnHeader;
function codeGenToString(expr) {
    if (lang_1.IS_DART) {
        return "'${" + expr + "}'";
    }
    else {
        // JS automatically converts to string...
        return expr;
    }
}
exports.codeGenToString = codeGenToString;
function splitAtColon(input, defaultValues) {
    var parts = lang_1.StringWrapper.split(input.trim(), /\s*:\s*/g);
    if (parts.length > 1) {
        return parts;
    }
    else {
        return defaultValues;
    }
}
exports.splitAtColon = splitAtColon;
var Statement = (function () {
    function Statement(statement) {
        this.statement = statement;
    }
    return Statement;
})();
exports.Statement = Statement;
var Expression = (function () {
    function Expression(expression, isArray) {
        if (isArray === void 0) { isArray = false; }
        this.expression = expression;
        this.isArray = isArray;
    }
    return Expression;
})();
exports.Expression = Expression;
function escapeValue(value) {
    if (value instanceof Expression) {
        return value.expression;
    }
    else if (lang_1.isString(value)) {
        return escapeSingleQuoteString(value);
    }
    else if (lang_1.isBlank(value)) {
        return 'null';
    }
    else {
        return "" + value;
    }
}
exports.escapeValue = escapeValue;
function codeGenArray(data) {
    return "[" + data.map(escapeValue).join(',') + "]";
}
exports.codeGenArray = codeGenArray;
function codeGenFlatArray(values) {
    var result = '([';
    var isFirstArrayEntry = true;
    var concatFn = lang_1.IS_DART ? '.addAll' : 'concat';
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        if (value instanceof Expression && value.isArray) {
            result += "])." + concatFn + "(" + value.expression + ")." + concatFn + "([";
            isFirstArrayEntry = true;
        }
        else {
            if (!isFirstArrayEntry) {
                result += ',';
            }
            isFirstArrayEntry = false;
            result += escapeValue(value);
        }
    }
    result += '])';
    return result;
}
exports.codeGenFlatArray = codeGenFlatArray;
function codeGenStringMap(keyValueArray) {
    return "{" + keyValueArray.map(codeGenKeyValue).join(',') + "}";
}
exports.codeGenStringMap = codeGenStringMap;
function codeGenKeyValue(keyValue) {
    return escapeValue(keyValue[0]) + ":" + escapeValue(keyValue[1]);
}
function addAll(source, target) {
    for (var i = 0; i < source.length; i++) {
        target.push(source[i]);
    }
}
exports.addAll = addAll;
function flattenArray(source, target) {
    if (lang_1.isPresent(source)) {
        for (var i = 0; i < source.length; i++) {
            var item = source[i];
            if (lang_1.isArray(item)) {
                flattenArray(item, target);
            }
            else {
                target.push(item);
            }
        }
    }
    return target;
}
exports.flattenArray = flattenArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtVjN2MFZKRkgudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci91dGlsLnRzIl0sIm5hbWVzIjpbImNhbWVsQ2FzZVRvRGFzaENhc2UiLCJkYXNoQ2FzZVRvQ2FtZWxDYXNlIiwiZXNjYXBlU2luZ2xlUXVvdGVTdHJpbmciLCJlc2NhcGVEb3VibGVRdW90ZVN0cmluZyIsImVzY2FwZVN0cmluZyIsImNvZGVHZW5FeHBvcnRWYXJpYWJsZSIsImNvZGVHZW5Db25zdENvbnN0cnVjdG9yQ2FsbCIsImNvZGVHZW5WYWx1ZUZuIiwiY29kZUdlbkZuSGVhZGVyIiwiY29kZUdlblRvU3RyaW5nIiwic3BsaXRBdENvbG9uIiwiU3RhdGVtZW50IiwiU3RhdGVtZW50LmNvbnN0cnVjdG9yIiwiRXhwcmVzc2lvbiIsIkV4cHJlc3Npb24uY29uc3RydWN0b3IiLCJlc2NhcGVWYWx1ZSIsImNvZGVHZW5BcnJheSIsImNvZGVHZW5GbGF0QXJyYXkiLCJjb2RlR2VuU3RyaW5nTWFwIiwiY29kZUdlbktleVZhbHVlIiwiYWRkQWxsIiwiZmxhdHRlbkFycmF5Il0sIm1hcHBpbmdzIjoiQUFBQSxxQkFBNEUsMEJBQTBCLENBQUMsQ0FBQTtBQUV2RyxJQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQztBQUNuQyxJQUFJLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztBQUNuQyxJQUFJLDZCQUE2QixHQUFHLGdCQUFnQixDQUFDO0FBQ3JELElBQUksNkJBQTZCLEdBQUcsZ0JBQWdCLENBQUM7QUFFMUMscUJBQWEsR0FBRyxjQUFPLEdBQUcsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUUxQyxpQkFBUyxHQUFHLGNBQU8sR0FBRyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBRWpELDZCQUFvQyxLQUFhO0lBQy9DQSxNQUFNQSxDQUFDQSxvQkFBYUEsQ0FBQ0EsZ0JBQWdCQSxDQUNqQ0Es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ZW50IjpbImltcG9ydCB7SVNfREFSVCwgU3RyaW5nV3JhcHBlciwgaXNCbGFuaywgaXNQcmVzZW50LCBpc1N0cmluZywgaXNBcnJheX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxudmFyIENBTUVMX0NBU0VfUkVHRVhQID0gLyhbQS1aXSkvZztcbnZhciBEQVNIX0NBU0VfUkVHRVhQID0gLy0oW2Etel0pL2c7XG52YXIgU0lOR0xFX1FVT1RFX0VTQ0FQRV9TVFJJTkdfUkUgPSAvJ3xcXFxcfFxcbnxcXHJ8XFwkL2c7XG52YXIgRE9VQkxFX1FVT1RFX0VTQ0FQRV9TVFJJTkdfUkUgPSAvXCJ8XFxcXHxcXG58XFxyfFxcJC9nO1xuXG5leHBvcnQgdmFyIE1PRFVMRV9TVUZGSVggPSBJU19EQVJUID8gJy5kYXJ0JyA6ICcuanMnO1xuXG5leHBvcnQgdmFyIENPTlNUX1ZBUiA9IElTX0RBUlQgPyAnY29uc3QnIDogJ3Zhcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW1lbENhc2VUb0Rhc2hDYXNlKGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKFxuICAgICAgaW5wdXQsIENBTUVMX0NBU0VfUkVHRVhQLCAobSkgPT4geyByZXR1cm4gJy0nICsgbVsxXS50b0xvd2VyQ2FzZSgpOyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRhc2hDYXNlVG9DYW1lbENhc2UoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQoXG4gICAgICBpbnB1dCwgREFTSF9DQVNFX1JFR0VYUCwgKG0pID0+IHsgcmV0dXJuIG1bMV0udG9VcHBlckNhc2UoKTsgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVTaW5nbGVRdW90ZVN0cmluZyhpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKGlzQmxhbmsoaW5wdXQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGAnJHtlc2NhcGVTdHJpbmcoaW5wdXQsIFNJTkdMRV9RVU9URV9FU0NBUEVfU1RSSU5HX1JFKX0nYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZURvdWJsZVF1b3RlU3RyaW5nKGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoaXNCbGFuayhpbnB1dCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gYFwiJHtlc2NhcGVTdHJpbmcoaW5wdXQsIERPVUJMRV9RVU9URV9FU0NBUEVfU1RSSU5HX1JFKX1cImA7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZVN0cmluZyhpbnB1dDogc3RyaW5nLCByZTogUmVnRXhwKTogc3RyaW5nIHtcbiAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChpbnB1dCwgcmUsIChtYXRjaCkgPT4ge1xuICAgIGlmIChtYXRjaFswXSA9PSAnJCcpIHtcbiAgICAgIHJldHVybiBJU19EQVJUID8gJ1xcXFwkJyA6ICckJztcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09ICdcXG4nKSB7XG4gICAgICByZXR1cm4gJ1xcXFxuJztcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09ICdcXHInKSB7XG4gICAgICByZXR1cm4gJ1xcXFxyJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBcXFxcJHttYXRjaFswXX1gO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2RlR2VuRXhwb3J0VmFyaWFibGUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKElTX0RBUlQpIHtcbiAgICByZXR1cm4gYGNvbnN0ICR7bmFtZX0gPSBgO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgdmFyICR7bmFtZX0gPSBleHBvcnRzWycke25hbWV9J10gPSBgO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2RlR2VuQ29uc3RDb25zdHJ1Y3RvckNhbGwobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKElTX0RBUlQpIHtcbiAgICByZXR1cm4gYGNvbnN0ICR7bmFtZX1gO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgbmV3ICR7bmFtZX1gO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2RlR2VuVmFsdWVGbihwYXJhbXM6IHN0cmluZ1tdLCB2YWx1ZTogc3RyaW5nLCBmbk5hbWU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcbiAgaWYgKElTX0RBUlQpIHtcbiAgICByZXR1cm4gYCR7Y29kZUdlbkZuSGVhZGVyKHBhcmFtcywgZm5OYW1lKX0gPT4gJHt2YWx1ZX1gO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgJHtjb2RlR2VuRm5IZWFkZXIocGFyYW1zLCBmbk5hbWUpfSB7IHJldHVybiAke3ZhbHVlfTsgfWA7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvZGVHZW5GbkhlYWRlcihwYXJhbXM6IHN0cmluZ1tdLCBmbk5hbWU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcbiAgaWYgKElTX0RBUlQpIHtcbiAgICByZXR1cm4gYCR7Zm5OYW1lfSgke3BhcmFtcy5qb2luKCcsJyl9KWA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGBmdW5jdGlvbiAke2ZuTmFtZX0oJHtwYXJhbXMuam9pbignLCcpfSlgO1xuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY29kZUdlblRvU3RyaW5nKGV4cHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChJU19EQVJUKSB7XG4gICAgcmV0dXJuIGAnXFwkeyR7ZXhwcn19J2A7XG4gIH0gZWxzZSB7XG4gICAgLy8gSlMgYXV0b21hdGljYWxseSBjb252ZXJ0cyB0byBzdHJpbmcuLi5cbiAgICByZXR1cm4gZXhwcjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRBdENvbG9uKGlucHV0OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICB2YXIgcGFydHMgPSBTdHJpbmdXcmFwcGVyLnNwbGl0KGlucHV0LnRyaW0oKSwgL1xccyo6XFxzKi9nKTtcbiAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gcGFydHM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZXM7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgU3RhdGVtZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0YXRlbWVudDogc3RyaW5nKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgRXhwcmVzc2lvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBleHByZXNzaW9uOiBzdHJpbmcsIHB1YmxpYyBpc0FycmF5ID0gZmFsc2UpIHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVWYWx1ZSh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXhwcmVzc2lvbikge1xuICAgIHJldHVybiB2YWx1ZS5leHByZXNzaW9uO1xuICB9IGVsc2UgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHJldHVybiBlc2NhcGVTaW5nbGVRdW90ZVN0cmluZyh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoaXNCbGFuayh2YWx1ZSkpIHtcbiAgICByZXR1cm4gJ251bGwnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgJHt2YWx1ZX1gO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2RlR2VuQXJyYXkoZGF0YTogYW55W10pOiBzdHJpbmcge1xuICByZXR1cm4gYFske2RhdGEubWFwKGVzY2FwZVZhbHVlKS5qb2luKCcsJyl9XWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2RlR2VuRmxhdEFycmF5KHZhbHVlczogYW55W10pOiBzdHJpbmcge1xuICB2YXIgcmVzdWx0ID0gJyhbJztcbiAgdmFyIGlzRmlyc3RBcnJheUVudHJ5ID0gdHJ1ZTtcbiAgdmFyIGNvbmNhdEZuID0gSVNfREFSVCA/ICcuYWRkQWxsJyA6ICdjb25jYXQnO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2YWx1ZSA9IHZhbHVlc1tpXTtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBFeHByZXNzaW9uICYmICg8RXhwcmVzc2lvbj52YWx1ZSkuaXNBcnJheSkge1xuICAgICAgcmVzdWx0ICs9IGBdKS4ke2NvbmNhdEZufSgke3ZhbHVlLmV4cHJlc3Npb259KS4ke2NvbmNhdEZufShbYDtcbiAgICAgIGlzRmlyc3RBcnJheUVudHJ5ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFpc0ZpcnN0QXJyYXlFbnRyeSkge1xuICAgICAgICByZXN1bHQgKz0gJywnO1xuICAgICAgfVxuICAgICAgaXNGaXJzdEFycmF5RW50cnkgPSBmYWxzZTtcbiAgICAgIHJlc3VsdCArPSBlc2NhcGVWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJlc3VsdCArPSAnXSknO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29kZUdlblN0cmluZ01hcChrZXlWYWx1ZUFycmF5OiBhbnlbXVtdKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB7JHtrZXlWYWx1ZUFycmF5Lm1hcChjb2RlR2VuS2V5VmFsdWUpLmpvaW4oJywnKX19YDtcbn1cblxuZnVuY3Rpb24gY29kZUdlbktleVZhbHVlKGtleVZhbHVlOiBhbnlbXSk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtlc2NhcGVWYWx1ZShrZXlWYWx1ZVswXSl9OiR7ZXNjYXBlVmFsdWUoa2V5VmFsdWVbMV0pfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRBbGwoc291cmNlOiBhbnlbXSwgdGFyZ2V0OiBhbnlbXSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgIHRhcmdldC5wdXNoKHNvdXJjZVtpXSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5BcnJheShzb3VyY2U6IGFueVtdLCB0YXJnZXQ6IGFueVtdKTogYW55W10ge1xuICBpZiAoaXNQcmVzZW50KHNvdXJjZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzb3VyY2VbaV07XG4gICAgICBpZiAoaXNBcnJheShpdGVtKSkge1xuICAgICAgICBmbGF0dGVuQXJyYXkoaXRlbSwgdGFyZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuIl19
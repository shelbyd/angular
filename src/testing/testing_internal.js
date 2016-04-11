'use strict';var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var core_1 = require('angular2/core');
var test_injector_1 = require('./test_injector');
var utils_1 = require('./utils');
var test_injector_2 = require('./test_injector');
exports.inject = test_injector_2.inject;
var matchers_1 = require('./matchers');
exports.expect = matchers_1.expect;
exports.proxy = function (t) { return t; };
var _global = (typeof window === 'undefined' ? lang_1.global : window);
exports.afterEach = _global.afterEach;
/**
 * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
 */
var AsyncTestCompleter = (function () {
    function AsyncTestCompleter(_done) {
        this._done = _done;
    }
    AsyncTestCompleter.prototype.done = function () { this._done(); };
    return AsyncTestCompleter;
})();
exports.AsyncTestCompleter = AsyncTestCompleter;
var jsmBeforeEach = _global.beforeEach;
var jsmDescribe = _global.describe;
var jsmDDescribe = _global.fdescribe;
var jsmXDescribe = _global.xdescribe;
var jsmIt = _global.it;
var jsmIIt = _global.fit;
var jsmXIt = _global.xit;
var runnerStack = [];
var inIt = false;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;
var globalTimeOut = utils_1.browserDetection.isSlow ? 3000 : jasmine.DEFAULT_TIMEOUT_INTERVAL;
var testInjector = test_injector_1.getTestInjector();
/**
 * Mechanism to run `beforeEach()` functions of Angular tests.
 *
 * Note: Jasmine own `beforeEach` is used by this library to handle DI providers.
 */
var BeforeEachRunner = (function () {
    function BeforeEachRunner(_parent) {
        this._parent = _parent;
        this._fns = [];
    }
    BeforeEachRunner.prototype.beforeEach = function (fn) { this._fns.push(fn); };
    BeforeEachRunner.prototype.run = function () {
        if (this._parent)
            this._parent.run();
        this._fns.forEach(function (fn) {
            return lang_1.isFunction(fn) ? fn() :
                (testInjector.execute(fn));
        });
    };
    return BeforeEachRunner;
})();
// Reset the test providers before each test
jsmBeforeEach(function () { testInjector.reset(); });
function _describe(jsmFn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var parentRunner = runnerStack.length === 0 ? null : runnerStack[runnerStack.length - 1];
    var runner = new BeforeEachRunner(parentRunner);
    runnerStack.push(runner);
    var suite = jsmFn.apply(void 0, args);
    runnerStack.pop();
    return suite;
}
function describe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return _describe.apply(void 0, [jsmDescribe].concat(args));
}
exports.describe = describe;
function ddescribe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return _describe.apply(void 0, [jsmDDescribe].concat(args));
}
exports.ddescribe = ddescribe;
function xdescribe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return _describe.apply(void 0, [jsmXDescribe].concat(args));
}
exports.xdescribe = xdescribe;
function beforeEach(fn) {
    if (runnerStack.length > 0) {
        // Inside a describe block, beforeEach() uses a BeforeEachRunner
        runnerStack[runnerStack.length - 1].beforeEach(fn);
    }
    else {
        // Top level beforeEach() are delegated to jasmine
        jsmBeforeEach(fn);
    }
}
exports.beforeEach = beforeEach;
/**
 * Allows overriding default providers defined in test_injector.js.
 *
 * The given function must return a list of DI providers.
 *
 * Example:
 *
 *   beforeEachProviders(() => [
 *     provide(Compiler, {useClass: MockCompiler}),
 *     provide(SomeToken, {useValue: myValue}),
 *   ]);
 */
function beforeEachProviders(fn) {
    jsmBeforeEach(function () {
        var providers = fn();
        if (!providers)
            return;
        testInjector.addProviders(providers);
    });
}
exports.beforeEachProviders = beforeEachProviders;
/**
 * @deprecated
 */
function beforeEachBindings(fn) {
    beforeEachProviders(fn);
}
exports.beforeEachBindings = beforeEachBindings;
function _it(jsmFn, name, testFn, testTimeOut) {
    var runner = runnerStack[runnerStack.length - 1];
    var timeOut = lang_1.Math.max(globalTimeOut, testTimeOut);
    if (testFn instanceof test_injector_1.FunctionWithParamTokens) {
        // The test case uses inject(). ie `it('test', inject([AsyncTestCompleter], (async) => { ...
        // }));`
        var testFnT = testFn;
        if (testFn.hasToken(AsyncTestCompleter)) {
            jsmFn(name, function (done) {
                var completerProvider = core_1.provide(AsyncTestCompleter, {
                    useFactory: function () {
                        // Mark the test as async when an AsyncTestCompleter is injected in an it()
                        if (!inIt)
                            throw new Error('AsyncTestCompleter can only be injected in an "it()"');
                        return new AsyncTestCompleter(done);
                    }
                });
                testInjector.addProviders([completerProvider]);
                runner.run();
                inIt = true;
                testInjector.execute(testFnT);
                inIt = false;
            }, timeOut);
        }
        else {
            jsmFn(name, function () {
                runner.run();
                testInjector.execute(testFnT);
            }, timeOut);
        }
    }
    else {
        // The test case doesn't use inject(). ie `it('test', (done) => { ... }));`
        if (testFn.length === 0) {
            jsmFn(name, function () {
                runner.run();
                testFn();
            }, timeOut);
        }
        else {
            jsmFn(name, function (done) {
                runner.run();
                testFn(done);
            }, timeOut);
        }
    }
}
function it(name, fn, timeOut) {
    if (timeOut === void 0) { timeOut = null; }
    return _it(jsmIt, name, fn, timeOut);
}
exports.it = it;
function xit(name, fn, timeOut) {
    if (timeOut === void 0) { timeOut = null; }
    return _it(jsmXIt, name, fn, timeOut);
}
exports.xit = xit;
function iit(name, fn, timeOut) {
    if (timeOut === void 0) { timeOut = null; }
    return _it(jsmIIt, name, fn, timeOut);
}
exports.iit = iit;
var SpyObject = (function () {
    function SpyObject(type) {
        if (type === void 0) { type = null; }
        if (type) {
            for (var prop in type.prototype) {
                var m = null;
                try {
                    m = type.prototype[prop];
                }
                catch (e) {
                }
                if (typeof m === 'function') {
                    this.spy(prop);
                }
            }
        }
    }
    // Noop so that SpyObject has the same interface as in Dart
    SpyObject.prototype.noSuchMethod = function (args) { };
    SpyObject.prototype.spy = function (name) {
        if (!this[name]) {
            this[name] = this._createGuinnessCompatibleSpy(name);
        }
        return this[name];
    };
    SpyObject.prototype.prop = function (name, value) { this[name] = value; };
    SpyObject.stub = function (object, config, overrides) {
        if (object === void 0) { object = null; }
        if (config === void 0) { config = null; }
        if (overrides === void 0) { overrides = null; }
        if (!(object instanceof SpyObject)) {
            overrides = config;
            config = object;
            object = new SpyObject();
        }
        var m = collection_1.StringMapWrapper.merge(config, overrides);
        collection_1.StringMapWrapper.forEach(m, function (value, key) { object.spy(key).andReturn(value); });
        return object;
    };
    /** @internal */
    SpyObject.prototype._createGuinnessCompatibleSpy = function (name) {
        var newSpy = jasmine.createSpy(name);
        newSpy.andCallFake = newSpy.and.callFake;
        newSpy.andReturn = newSpy.and.returnValue;
        newSpy.reset = newSpy.calls.reset;
        // revisit return null here (previously needed for rtts_assert).
        newSpy.and.returnValue(null);
        return newSpy;
    };
    return SpyObject;
})();
exports.SpyObject = SpyObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZ19pbnRlcm5hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtcWRXVTFSTnoudG1wL2FuZ3VsYXIyL3NyYy90ZXN0aW5nL3Rlc3RpbmdfaW50ZXJuYWwudHMiXSwibmFtZXMiOlsiQXN5bmNUZXN0Q29tcGxldGVyIiwiQXN5bmNUZXN0Q29tcGxldGVyLmNvbnN0cnVjdG9yIiwiQXN5bmNUZXN0Q29tcGxldGVyLmRvbmUiLCJCZWZvcmVFYWNoUnVubmVyIiwiQmVmb3JlRWFjaFJ1bm5lci5jb25zdHJ1Y3RvciIsIkJlZm9yZUVhY2hSdW5uZXIuYmVmb3JlRWFjaCIsIkJlZm9yZUVhY2hSdW5uZXIucnVuIiwiX2Rlc2NyaWJlIiwiZGVzY3JpYmUiLCJkZGVzY3JpYmUiLCJ4ZGVzY3JpYmUiLCJiZWZvcmVFYWNoIiwiYmVmb3JlRWFjaFByb3ZpZGVycyIsImJlZm9yZUVhY2hCaW5kaW5ncyIsIl9pdCIsIml0IiwieGl0IiwiaWl0IiwiU3B5T2JqZWN0IiwiU3B5T2JqZWN0LmNvbnN0cnVjdG9yIiwiU3B5T2JqZWN0Lm5vU3VjaE1ldGhvZCIsIlNweU9iamVjdC5zcHkiLCJTcHlPYmplY3QucHJvcCIsIlNweU9iamVjdC5zdHViIiwiU3B5T2JqZWN0Ll9jcmVhdGVHdWlubmVzc0NvbXBhdGlibGVTcHkiXSwibWFwcGluZ3MiOiJBQUFBLDJCQUErQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ2hFLHFCQUF1QywwQkFBMEIsQ0FBQyxDQUFBO0FBRWxFLHFCQUFzQixlQUFlLENBQUMsQ0FBQTtBQUV0Qyw4QkFBK0QsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRixzQkFBK0IsU0FBUyxDQUFDLENBQUE7QUFHekMsOEJBQXFCLGlCQUFpQixDQUFDO0FBQS9CLHdDQUErQjtBQUV2Qyx5QkFBaUMsWUFBWSxDQUFDO0FBQXRDLG1DQUFzQztBQUVuQyxhQUFLLEdBQW1CLFVBQUMsQ0FBQyxJQUFLLE9BQUEs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QUFDQTtRQUMvQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsR0FBUUEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDdkNBLGdFQUFnRUE7UUFDaEVBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQzdCQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtJQUNoQkEsQ0FBQ0E7SUFDSE4sZ0JBQUNBO0FBQURBLENBQUNBLEFBckRELElBcURDO0FBckRZLGlCQUFTLFlBcURyQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtnbG9iYWwsIGlzRnVuY3Rpb24sIE1hdGh9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7cHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmltcG9ydCB7Z2V0VGVzdEluamVjdG9yLCBGdW5jdGlvbldpdGhQYXJhbVRva2VucywgaW5qZWN0fSBmcm9tICcuL3Rlc3RfaW5qZWN0b3InO1xuaW1wb3J0IHticm93c2VyRGV0ZWN0aW9ufSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7Tmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS96b25lL25nX3pvbmUnO1xuXG5leHBvcnQge2luamVjdH0gZnJvbSAnLi90ZXN0X2luamVjdG9yJztcblxuZXhwb3J0IHtleHBlY3QsIE5nTWF0Y2hlcnN9IGZyb20gJy4vbWF0Y2hlcnMnO1xuXG5leHBvcnQgdmFyIHByb3h5OiBDbGFzc0RlY29yYXRvciA9ICh0KSA9PiB0O1xuXG52YXIgX2dsb2JhbCA9IDxhbnk+KHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93KTtcblxuZXhwb3J0IHZhciBhZnRlckVhY2g6IEZ1bmN0aW9uID0gX2dsb2JhbC5hZnRlckVhY2g7XG5cbmV4cG9ydCB0eXBlIFN5bmNUZXN0Rm4gPSAoKSA9PiB2b2lkO1xudHlwZSBBc3luY1Rlc3RGbiA9IChkb25lOiAoKSA9PiB2b2lkKSA9PiB2b2lkO1xudHlwZSBBbnlUZXN0Rm4gPSBTeW5jVGVzdEZuIHwgQXN5bmNUZXN0Rm47XG5cbi8qKlxuICogSW5qZWN0YWJsZSBjb21wbGV0ZXIgdGhhdCBhbGxvd3Mgc2lnbmFsaW5nIGNvbXBsZXRpb24gb2YgYW4gYXN5bmNocm9ub3VzIHRlc3QuIFVzZWQgaW50ZXJuYWxseS5cbiAqL1xuZXhwb3J0IGNsYXNzIEFzeW5jVGVzdENvbXBsZXRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RvbmU6IEZ1bmN0aW9uKSB7fVxuXG4gIGRvbmUoKTogdm9pZCB7IHRoaXMuX2RvbmUoKTsgfVxufVxuXG52YXIganNtQmVmb3JlRWFjaCA9IF9nbG9iYWwuYmVmb3JlRWFjaDtcbnZhciBqc21EZXNjcmliZSA9IF9nbG9iYWwuZGVzY3JpYmU7XG52YXIganNtRERlc2NyaWJlID0gX2dsb2JhbC5mZGVzY3JpYmU7XG52YXIganNtWERlc2NyaWJlID0gX2dsb2JhbC54ZGVzY3JpYmU7XG52YXIganNtSXQgPSBfZ2xvYmFsLml0O1xudmFyIGpzbUlJdCA9IF9nbG9iYWwuZml0O1xudmFyIGpzbVhJdCA9IF9nbG9iYWwueGl0O1xuXG52YXIgcnVubmVyU3RhY2sgPSBbXTtcbnZhciBpbkl0ID0gZmFsc2U7XG5qYXNtaW5lLkRFRkFVTFRfVElNRU9VVF9JTlRFUlZBTCA9IDUwMDtcbnZhciBnbG9iYWxUaW1lT3V0ID0gYnJvd3NlckRldGVjdGlvbi5pc1Nsb3cgPyAzMDAwIDogamFzbWluZS5ERUZBVUxUX1RJTUVPVVRfSU5URVJWQUw7XG5cbnZhciB0ZXN0SW5qZWN0b3IgPSBnZXRUZXN0SW5qZWN0b3IoKTtcblxuLyoqXG4gKiBNZWNoYW5pc20gdG8gcnVuIGBiZWZvcmVFYWNoKClgIGZ1bmN0aW9ucyBvZiBBbmd1bGFyIHRlc3RzLlxuICpcbiAqIE5vdGU6IEphc21pbmUgb3duIGBiZWZvcmVFYWNoYCBpcyB1c2VkIGJ5IHRoaXMgbGlicmFyeSB0byBoYW5kbGUgREkgcHJvdmlkZXJzLlxuICovXG5jbGFzcyBCZWZvcmVFYWNoUnVubmVyIHtcbiAgcHJpdmF0ZSBfZm5zOiBBcnJheTxGdW5jdGlvbldpdGhQYXJhbVRva2Vuc3xTeW5jVGVzdEZuPiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhcmVudDogQmVmb3JlRWFjaFJ1bm5lcikge31cblxuICBiZWZvcmVFYWNoKGZuOiBGdW5jdGlvbldpdGhQYXJhbVRva2Vuc3xTeW5jVGVzdEZuKTogdm9pZCB7IHRoaXMuX2Zucy5wdXNoKGZuKTsgfVxuXG4gIHJ1bigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcGFyZW50KSB0aGlzLl9wYXJlbnQucnVuKCk7XG4gICAgdGhpcy5fZm5zLmZvckVhY2goKGZuKSA9PiB7XG4gICAgICByZXR1cm4gaXNGdW5jdGlvbihmbikgPyAoPFN5bmNUZXN0Rm4+Zm4pKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRlc3RJbmplY3Rvci5leGVjdXRlKDxGdW5jdGlvbldpdGhQYXJhbVRva2Vucz5mbikpO1xuICAgIH0pO1xuICB9XG59XG5cbi8vIFJlc2V0IHRoZSB0ZXN0IHByb3ZpZGVycyBiZWZvcmUgZWFjaCB0ZXN0XG5qc21CZWZvcmVFYWNoKCgpID0+IHsgdGVzdEluamVjdG9yLnJlc2V0KCk7IH0pO1xuXG5mdW5jdGlvbiBfZGVzY3JpYmUoanNtRm4sIC4uLmFyZ3MpIHtcbiAgdmFyIHBhcmVudFJ1bm5lciA9IHJ1bm5lclN0YWNrLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBydW5uZXJTdGFja1tydW5uZXJTdGFjay5sZW5ndGggLSAxXTtcbiAgdmFyIHJ1bm5lciA9IG5ldyBCZWZvcmVFYWNoUnVubmVyKHBhcmVudFJ1bm5lcik7XG4gIHJ1bm5lclN0YWNrLnB1c2gocnVubmVyKTtcbiAgdmFyIHN1aXRlID0ganNtRm4oLi4uYXJncyk7XG4gIHJ1bm5lclN0YWNrLnBvcCgpO1xuICByZXR1cm4gc3VpdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNjcmliZSguLi5hcmdzKTogdm9pZCB7XG4gIHJldHVybiBfZGVzY3JpYmUoanNtRGVzY3JpYmUsIC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGRlc2NyaWJlKC4uLmFyZ3MpOiB2b2lkIHtcbiAgcmV0dXJuIF9kZXNjcmliZShqc21ERGVzY3JpYmUsIC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geGRlc2NyaWJlKC4uLmFyZ3MpOiB2b2lkIHtcbiAgcmV0dXJuIF9kZXNjcmliZShqc21YRGVzY3JpYmUsIC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlRWFjaChmbjogRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnMgfCBTeW5jVGVzdEZuKTogdm9pZCB7XG4gIGlmIChydW5uZXJTdGFjay5sZW5ndGggPiAwKSB7XG4gICAgLy8gSW5zaWRlIGEgZGVzY3JpYmUgYmxvY2ssIGJlZm9yZUVhY2goKSB1c2VzIGEgQmVmb3JlRWFjaFJ1bm5lclxuICAgIHJ1bm5lclN0YWNrW3J1bm5lclN0YWNrLmxlbmd0aCAtIDFdLmJlZm9yZUVhY2goZm4pO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvcCBsZXZlbCBiZWZvcmVFYWNoKCkgYXJlIGRlbGVnYXRlZCB0byBqYXNtaW5lXG4gICAganNtQmVmb3JlRWFjaCg8U3luY1Rlc3RGbj5mbik7XG4gIH1cbn1cblxuLyoqXG4gKiBBbGxvd3Mgb3ZlcnJpZGluZyBkZWZhdWx0IHByb3ZpZGVycyBkZWZpbmVkIGluIHRlc3RfaW5qZWN0b3IuanMuXG4gKlxuICogVGhlIGdpdmVuIGZ1bmN0aW9uIG11c3QgcmV0dXJuIGEgbGlzdCBvZiBESSBwcm92aWRlcnMuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgIGJlZm9yZUVhY2hQcm92aWRlcnMoKCkgPT4gW1xuICogICAgIHByb3ZpZGUoQ29tcGlsZXIsIHt1c2VDbGFzczogTW9ja0NvbXBpbGVyfSksXG4gKiAgICAgcHJvdmlkZShTb21lVG9rZW4sIHt1c2VWYWx1ZTogbXlWYWx1ZX0pLFxuICogICBdKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZUVhY2hQcm92aWRlcnMoZm4pOiB2b2lkIHtcbiAganNtQmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgdmFyIHByb3ZpZGVycyA9IGZuKCk7XG4gICAgaWYgKCFwcm92aWRlcnMpIHJldHVybjtcbiAgICB0ZXN0SW5qZWN0b3IuYWRkUHJvdmlkZXJzKHByb3ZpZGVycyk7XG4gIH0pO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWZvcmVFYWNoQmluZGluZ3MoZm4pOiB2b2lkIHtcbiAgYmVmb3JlRWFjaFByb3ZpZGVycyhmbik7XG59XG5cbmZ1bmN0aW9uIF9pdChcbiAgICBqc21GbjogRnVuY3Rpb24sIG5hbWU6IHN0cmluZywgdGVzdEZuOiBGdW5jdGlvbldpdGhQYXJhbVRva2VucyB8IEFueVRlc3RGbixcbiAgICB0ZXN0VGltZU91dDogbnVtYmVyKTogdm9pZCB7XG4gIHZhciBydW5uZXIgPSBydW5uZXJTdGFja1tydW5uZXJTdGFjay5sZW5ndGggLSAxXTtcbiAgdmFyIHRpbWVPdXQgPSBNYXRoLm1heChnbG9iYWxUaW1lT3V0LCB0ZXN0VGltZU91dCk7XG5cbiAgaWYgKHRlc3RGbiBpbnN0YW5jZW9mIEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zKSB7XG4gICAgLy8gVGhlIHRlc3QgY2FzZSB1c2VzIGluamVjdCgpLiBpZSBgaXQoJ3Rlc3QnLCBpbmplY3QoW0FzeW5jVGVzdENvbXBsZXRlcl0sIChhc3luYykgPT4geyAuLi5cbiAgICAvLyB9KSk7YFxuICAgIGxldCB0ZXN0Rm5UID0gdGVzdEZuO1xuXG4gICAgaWYgKHRlc3RGbi5oYXNUb2tlbihBc3luY1Rlc3RDb21wbGV0ZXIpKSB7XG4gICAgICBqc21GbihuYW1lLCAoZG9uZSkgPT4ge1xuICAgICAgICB2YXIgY29tcGxldGVyUHJvdmlkZXIgPSBwcm92aWRlKEFzeW5jVGVzdENvbXBsZXRlciwge1xuICAgICAgICAgIHVzZUZhY3Rvcnk6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIE1hcmsgdGhlIHRlc3QgYXMgYXN5bmMgd2hlbiBhbiBBc3luY1Rlc3RDb21wbGV0ZXIgaXMgaW5qZWN0ZWQgaW4gYW4gaXQoKVxuICAgICAgICAgICAgaWYgKCFpbkl0KSB0aHJvdyBuZXcgRXJyb3IoJ0FzeW5jVGVzdENvbXBsZXRlciBjYW4gb25seSBiZSBpbmplY3RlZCBpbiBhbiBcIml0KClcIicpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBc3luY1Rlc3RDb21wbGV0ZXIoZG9uZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0ZXN0SW5qZWN0b3IuYWRkUHJvdmlkZXJzKFtjb21wbGV0ZXJQcm92aWRlcl0pO1xuICAgICAgICBydW5uZXIucnVuKCk7XG5cbiAgICAgICAgaW5JdCA9IHRydWU7XG4gICAgICAgIHRlc3RJbmplY3Rvci5leGVjdXRlKHRlc3RGblQpO1xuICAgICAgICBpbkl0ID0gZmFsc2U7XG4gICAgICB9LCB0aW1lT3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAganNtRm4obmFtZSwgKCkgPT4ge1xuICAgICAgICBydW5uZXIucnVuKCk7XG4gICAgICAgIHRlc3RJbmplY3Rvci5leGVjdXRlKHRlc3RGblQpO1xuICAgICAgfSwgdGltZU91dCk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgLy8gVGhlIHRlc3QgY2FzZSBkb2Vzbid0IHVzZSBpbmplY3QoKS4gaWUgYGl0KCd0ZXN0JywgKGRvbmUpID0+IHsgLi4uIH0pKTtgXG5cbiAgICBpZiAoKDxhbnk+dGVzdEZuKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGpzbUZuKG5hbWUsICgpID0+IHtcbiAgICAgICAgcnVubmVyLnJ1bigpO1xuICAgICAgICAoPFN5bmNUZXN0Rm4+dGVzdEZuKSgpO1xuICAgICAgfSwgdGltZU91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGpzbUZuKG5hbWUsIChkb25lKSA9PiB7XG4gICAgICAgIHJ1bm5lci5ydW4oKTtcbiAgICAgICAgKDxBc3luY1Rlc3RGbj50ZXN0Rm4pKGRvbmUpO1xuICAgICAgfSwgdGltZU91dCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpdChuYW1lLCBmbiwgdGltZU91dCA9IG51bGwpOiB2b2lkIHtcbiAgcmV0dXJuIF9pdChqc21JdCwgbmFtZSwgZm4sIHRpbWVPdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geGl0KG5hbWUsIGZuLCB0aW1lT3V0ID0gbnVsbCk6IHZvaWQge1xuICByZXR1cm4gX2l0KGpzbVhJdCwgbmFtZSwgZm4sIHRpbWVPdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaWl0KG5hbWUsIGZuLCB0aW1lT3V0ID0gbnVsbCk6IHZvaWQge1xuICByZXR1cm4gX2l0KGpzbUlJdCwgbmFtZSwgZm4sIHRpbWVPdXQpO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgR3VpbmVzc0NvbXBhdGlibGVTcHkgZXh0ZW5kcyBqYXNtaW5lLlNweSB7XG4gIC8qKiBCeSBjaGFpbmluZyB0aGUgc3B5IHdpdGggYW5kLnJldHVyblZhbHVlLCBhbGwgY2FsbHMgdG8gdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIGEgc3BlY2lmaWNcbiAgICogdmFsdWUuICovXG4gIGFuZFJldHVybih2YWw6IGFueSk6IHZvaWQ7XG4gIC8qKiBCeSBjaGFpbmluZyB0aGUgc3B5IHdpdGggYW5kLmNhbGxGYWtlLCBhbGwgY2FsbHMgdG8gdGhlIHNweSB3aWxsIGRlbGVnYXRlIHRvIHRoZSBzdXBwbGllZFxuICAgKiBmdW5jdGlvbi4gKi9cbiAgYW5kQ2FsbEZha2UoZm46IEZ1bmN0aW9uKTogR3VpbmVzc0NvbXBhdGlibGVTcHk7XG4gIC8qKiByZW1vdmVzIGFsbCByZWNvcmRlZCBjYWxscyAqL1xuICByZXNldCgpO1xufVxuXG5leHBvcnQgY2xhc3MgU3B5T2JqZWN0IHtcbiAgY29uc3RydWN0b3IodHlwZSA9IG51bGwpIHtcbiAgICBpZiAodHlwZSkge1xuICAgICAgZm9yICh2YXIgcHJvcCBpbiB0eXBlLnByb3RvdHlwZSkge1xuICAgICAgICB2YXIgbSA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbSA9IHR5cGUucHJvdG90eXBlW3Byb3BdO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gQXMgd2UgYXJlIGNyZWF0aW5nIHNweXMgZm9yIGFic3RyYWN0IGNsYXNzZXMsXG4gICAgICAgICAgLy8gdGhlc2UgY2xhc3NlcyBtaWdodCBoYXZlIGdldHRlcnMgdGhhdCB0aHJvdyB3aGVuIHRoZXkgYXJlIGFjY2Vzc2VkLlxuICAgICAgICAgIC8vIEFzIHdlIGFyZSBvbmx5IGF1dG8gY3JlYXRpbmcgc3B5cyBmb3IgbWV0aG9kcywgdGhpc1xuICAgICAgICAgIC8vIHNob3VsZCBub3QgbWF0dGVyLlxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuc3B5KHByb3ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIE5vb3Agc28gdGhhdCBTcHlPYmplY3QgaGFzIHRoZSBzYW1lIGludGVyZmFjZSBhcyBpbiBEYXJ0XG4gIG5vU3VjaE1ldGhvZChhcmdzKSB7fVxuXG4gIHNweShuYW1lKSB7XG4gICAgaWYgKCF0aGlzW25hbWVdKSB7XG4gICAgICB0aGlzW25hbWVdID0gdGhpcy5fY3JlYXRlR3Vpbm5lc3NDb21wYXRpYmxlU3B5KG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpc1tuYW1lXTtcbiAgfVxuXG4gIHByb3AobmFtZSwgdmFsdWUpIHsgdGhpc1tuYW1lXSA9IHZhbHVlOyB9XG5cbiAgc3RhdGljIHN0dWIob2JqZWN0ID0gbnVsbCwgY29uZmlnID0gbnVsbCwgb3ZlcnJpZGVzID0gbnVsbCkge1xuICAgIGlmICghKG9iamVjdCBpbnN0YW5jZW9mIFNweU9iamVjdCkpIHtcbiAgICAgIG92ZXJyaWRlcyA9IGNvbmZpZztcbiAgICAgIGNvbmZpZyA9IG9iamVjdDtcbiAgICAgIG9iamVjdCA9IG5ldyBTcHlPYmplY3QoKTtcbiAgICB9XG5cbiAgICB2YXIgbSA9IFN0cmluZ01hcFdyYXBwZXIubWVyZ2UoY29uZmlnLCBvdmVycmlkZXMpO1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChtLCAodmFsdWUsIGtleSkgPT4geyBvYmplY3Quc3B5KGtleSkuYW5kUmV0dXJuKHZhbHVlKTsgfSk7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NyZWF0ZUd1aW5uZXNzQ29tcGF0aWJsZVNweShuYW1lKTogR3VpbmVzc0NvbXBhdGlibGVTcHkge1xuICAgIHZhciBuZXdTcHk6IEd1aW5lc3NDb21wYXRpYmxlU3B5ID0gPGFueT5qYXNtaW5lLmNyZWF0ZVNweShuYW1lKTtcbiAgICBuZXdTcHkuYW5kQ2FsbEZha2UgPSA8YW55Pm5ld1NweS5hbmQuY2FsbEZha2U7XG4gICAgbmV3U3B5LmFuZFJldHVybiA9IDxhbnk+bmV3U3B5LmFuZC5yZXR1cm5WYWx1ZTtcbiAgICBuZXdTcHkucmVzZXQgPSA8YW55Pm5ld1NweS5jYWxscy5yZXNldDtcbiAgICAvLyByZXZpc2l0IHJldHVybiBudWxsIGhlcmUgKHByZXZpb3VzbHkgbmVlZGVkIGZvciBydHRzX2Fzc2VydCkuXG4gICAgbmV3U3B5LmFuZC5yZXR1cm5WYWx1ZShudWxsKTtcbiAgICByZXR1cm4gbmV3U3B5O1xuICB9XG59XG4iXX0=
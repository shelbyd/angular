import { isPresent } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { Map, MapWrapper, Set, SetWrapper, StringMapWrapper } from 'angular2/src/facade/collection';
import { ReflectorReader } from './reflector_reader';
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */
export class ReflectionInfo {
    constructor(annotations, parameters, factory, interfaces, propMetadata) {
        this.annotations = annotations;
        this.parameters = parameters;
        this.factory = factory;
        this.interfaces = interfaces;
        this.propMetadata = propMetadata;
    }
}
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
export class Reflector extends ReflectorReader {
    constructor(reflectionCapabilities) {
        super();
        /** @internal */
        this._injectableInfo = new Map();
        /** @internal */
        this._getters = new Map();
        /** @internal */
        this._setters = new Map();
        /** @internal */
        this._methods = new Map();
        this._usedKeys = null;
        this.reflectionCapabilities = reflectionCapabilities;
    }
    isReflectionEnabled() { return this.reflectionCapabilities.isReflectionEnabled(); }
    /**
     * Causes `this` reflector to track keys used to access
     * {@link ReflectionInfo} objects.
     */
    trackUsage() { this._usedKeys = new Set(); }
    /**
     * Lists types for which reflection information was not requested since
     * {@link #trackUsage} was called. This list could later be audited as
     * potential dead code.
     */
    listUnusedKeys() {
        if (this._usedKeys == null) {
            throw new BaseException('Usage tracking is disabled');
        }
        var allTypes = MapWrapper.keys(this._injectableInfo);
        return allTypes.filter(key => !SetWrapper.has(this._usedKeys, key));
    }
    registerFunction(func, funcInfo) {
        this._injectableInfo.set(func, funcInfo);
    }
    registerType(type, typeInfo) {
        this._injectableInfo.set(type, typeInfo);
    }
    registerGetters(getters) { _mergeMaps(this._getters, getters); }
    registerSetters(setters) { _mergeMaps(this._setters, setters); }
    registerMethods(methods) { _mergeMaps(this._methods, methods); }
    factory(type) {
        if (this._containsReflectionInfo(type)) {
            var res = this._getReflectionInfo(type).factory;
            return isPresent(res) ? res : null;
        }
        else {
            return this.reflectionCapabilities.factory(type);
        }
    }
    parameters(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).parameters;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.parameters(typeOrFunc);
        }
    }
    annotations(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).annotations;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.annotations(typeOrFunc);
        }
    }
    propMetadata(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).propMetadata;
            return isPresent(res) ? res : {};
        }
        else {
            return this.reflectionCapabilities.propMetadata(typeOrFunc);
        }
    }
    interfaces(type) {
        if (this._injectableInfo.has(type)) {
            var res = this._getReflectionInfo(type).interfaces;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.interfaces(type);
        }
    }
    getter(name) {
        if (this._getters.has(name)) {
            return this._getters.get(name);
        }
        else {
            return this.reflectionCapabilities.getter(name);
        }
    }
    setter(name) {
        if (this._setters.has(name)) {
            return this._setters.get(name);
        }
        else {
            return this.reflectionCapabilities.setter(name);
        }
    }
    method(name) {
        if (this._methods.has(name)) {
            return this._methods.get(name);
        }
        else {
            return this.reflectionCapabilities.method(name);
        }
    }
    /** @internal */
    _getReflectionInfo(typeOrFunc) {
        if (isPresent(this._usedKeys)) {
            this._usedKeys.add(typeOrFunc);
        }
        return this._injectableInfo.get(typeOrFunc);
    }
    /** @internal */
    _containsReflectionInfo(typeOrFunc) { return this._injectableInfo.has(typeOrFunc); }
    importUri(type) { return this.reflectionCapabilities.importUri(type); }
}
function _mergeMaps(target, config) {
    StringMapWrapper.forEach(config, (v, k) => target.set(k, v));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1WdmlwQ0JVUC50bXAvYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0b3IudHMiXSwibmFtZXMiOlsiUmVmbGVjdGlvbkluZm8iLCJSZWZsZWN0aW9uSW5mby5jb25zdHJ1Y3RvciIsIlJlZmxlY3RvciIsIlJlZmxlY3Rvci5jb25zdHJ1Y3RvciIsIlJlZmxlY3Rvci5pc1JlZmxlY3Rpb25FbmFibGVkIiwiUmVmbGVjdG9yLnRyYWNrVXNhZ2UiLCJSZWZsZWN0b3IubGlzdFVudXNlZEtleXMiLCJSZWZsZWN0b3IucmVnaXN0ZXJGdW5jdGlvbiIsIlJlZmxlY3Rvci5yZWdpc3RlclR5cGUiLCJSZWZsZWN0b3IucmVnaXN0ZXJHZXR0ZXJzIiwiUmVmbGVjdG9yLnJlZ2lzdGVyU2V0dGVycyIsIlJlZmxlY3Rvci5yZWdpc3Rlck1ldGhvZHMiLCJSZWZsZWN0b3IuZmFjdG9yeSIsIlJlZmxlY3Rvci5wYXJhbWV0ZXJzIiwiUmVmbGVjdG9yLmFubm90YXRpb25zIiwiUmVmbGVjdG9yLnByb3BNZXRhZGF0YSIsIlJlZmxlY3Rvci5pbnRlcmZhY2VzIiwiUmVmbGVjdG9yLmdldHRlciIsIlJlZmxlY3Rvci5zZXR0ZXIiLCJSZWZsZWN0b3IubWV0aG9kIiwiUmVmbGVjdG9yLl9nZXRSZWZsZWN0aW9uSW5mbyIsIlJlZmxlY3Rvci5fY29udGFpbnNSZWZsZWN0aW9uSW5mbyIsIlJlZmxlY3Rvci5pbXBvcnRVcmkiLCJfbWVyZ2VNYXBzIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFPLFNBQVMsRUFBWSxNQUFNLDBCQUEwQjtPQUM1RCxFQUFDLGFBQWEsRUFBbUIsTUFBTSxnQ0FBZ0M7T0FDdkUsRUFBYyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxnQ0FBZ0M7T0FFdkcs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QSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUNuREEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDbkNBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ05BLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDdERBLENBQUNBO0lBQ0hBLENBQUNBO0lBRURkLE1BQU1BLENBQUNBLElBQVlBO1FBQ2pCZSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDakNBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ05BLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDbERBLENBQUNBO0lBQ0hBLENBQUNBO0lBRURmLE1BQU1BLENBQUNBLElBQVlBO1FBQ2pCZ0IsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ2pDQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNOQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxzQkFBc0JBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ2xEQSxDQUFDQTtJQUNIQSxDQUFDQTtJQUVEaEIsTUFBTUEsQ0FBQ0EsSUFBWUE7UUFDakJpQixFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDakNBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ05BLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDbERBLENBQUNBO0lBQ0hBLENBQUNBO0lBRURqQixnQkFBZ0JBO0lBQ2hCQSxrQkFBa0JBLENBQUNBLFVBQWVBO1FBQ2hDa0IsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1FBQ2pDQSxDQUFDQTtRQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtJQUM5Q0EsQ0FBQ0E7SUFFRGxCLGdCQUFnQkE7SUFDaEJBLHVCQUF1QkEsQ0FBQ0EsVUFBZUEsSUFBSW1CLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBRXpGbkIsU0FBU0EsQ0FBQ0EsSUFBVUEsSUFBWW9CLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7QUFDdkZwQixDQUFDQTtBQUVELG9CQUFvQixNQUE2QixFQUFFLE1BQWlDO0lBQ2xGcUIsZ0JBQWdCQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxDQUFXQSxFQUFFQSxDQUFTQSxLQUFLQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUNqRkEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIGlzUHJlc2VudCwgc3RyaW5naWZ5fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgTWFwLCBNYXBXcmFwcGVyLCBTZXQsIFNldFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1NldHRlckZuLCBHZXR0ZXJGbiwgTWV0aG9kRm59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtSZWZsZWN0b3JSZWFkZXJ9IGZyb20gJy4vcmVmbGVjdG9yX3JlYWRlcic7XG5pbXBvcnQge1BsYXRmb3JtUmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnLi9wbGF0Zm9ybV9yZWZsZWN0aW9uX2NhcGFiaWxpdGllcyc7XG5leHBvcnQge1NldHRlckZuLCBHZXR0ZXJGbiwgTWV0aG9kRm59IGZyb20gJy4vdHlwZXMnO1xuZXhwb3J0IHtQbGF0Zm9ybVJlZmxlY3Rpb25DYXBhYmlsaXRpZXN9IGZyb20gJy4vcGxhdGZvcm1fcmVmbGVjdGlvbl9jYXBhYmlsaXRpZXMnO1xuXG4vKipcbiAqIFJlZmxlY3RpdmUgaW5mb3JtYXRpb24gYWJvdXQgYSBzeW1ib2wsIGluY2x1ZGluZyBhbm5vdGF0aW9ucywgaW50ZXJmYWNlcywgYW5kIG90aGVyIG1ldGFkYXRhLlxuICovXG5leHBvcnQgY2xhc3MgUmVmbGVjdGlvbkluZm8ge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBhbm5vdGF0aW9ucz86IGFueVtdLCBwdWJsaWMgcGFyYW1ldGVycz86IGFueVtdW10sIHB1YmxpYyBmYWN0b3J5PzogRnVuY3Rpb24sXG4gICAgICBwdWJsaWMgaW50ZXJmYWNlcz86IGFueVtdLCBwdWJsaWMgcHJvcE1ldGFkYXRhPzoge1trZXk6IHN0cmluZ106IGFueVtdfSkge31cbn1cblxuLyoqXG4gKiBQcm92aWRlcyBhY2Nlc3MgdG8gcmVmbGVjdGlvbiBkYXRhIGFib3V0IHN5bWJvbHMuIFVzZWQgaW50ZXJuYWxseSBieSBBbmd1bGFyXG4gKiB0byBwb3dlciBkZXBlbmRlbmN5IGluamVjdGlvbiBhbmQgY29tcGlsYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZsZWN0b3IgZXh0ZW5kcyBSZWZsZWN0b3JSZWFkZXIge1xuICAvKiogQGludGVybmFsICovXG4gIF9pbmplY3RhYmxlSW5mbyA9IG5ldyBNYXA8YW55LCBSZWZsZWN0aW9uSW5mbz4oKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2V0dGVycyA9IG5ldyBNYXA8c3RyaW5nLCBHZXR0ZXJGbj4oKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2V0dGVycyA9IG5ldyBNYXA8c3RyaW5nLCBTZXR0ZXJGbj4oKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbWV0aG9kcyA9IG5ldyBNYXA8c3RyaW5nLCBNZXRob2RGbj4oKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdXNlZEtleXM6IFNldDxhbnk+O1xuICByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzOiBQbGF0Zm9ybVJlZmxlY3Rpb25DYXBhYmlsaXRpZXM7XG5cbiAgY29uc3RydWN0b3IocmVmbGVjdGlvbkNhcGFiaWxpdGllczogUGxhdGZvcm1SZWZsZWN0aW9uQ2FwYWJpbGl0aWVzKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl91c2VkS2V5cyA9IG51bGw7XG4gICAgdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzID0gcmVmbGVjdGlvbkNhcGFiaWxpdGllcztcbiAgfVxuXG4gIGlzUmVmbGVjdGlvbkVuYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuaXNSZWZsZWN0aW9uRW5hYmxlZCgpOyB9XG5cbiAgLyoqXG4gICAqIENhdXNlcyBgdGhpc2AgcmVmbGVjdG9yIHRvIHRyYWNrIGtleXMgdXNlZCB0byBhY2Nlc3NcbiAgICoge0BsaW5rIFJlZmxlY3Rpb25JbmZvfSBvYmplY3RzLlxuICAgKi9cbiAgdHJhY2tVc2FnZSgpOiB2b2lkIHsgdGhpcy5fdXNlZEtleXMgPSBuZXcgU2V0KCk7IH1cblxuICAvKipcbiAgICogTGlzdHMgdHlwZXMgZm9yIHdoaWNoIHJlZmxlY3Rpb24gaW5mb3JtYXRpb24gd2FzIG5vdCByZXF1ZXN0ZWQgc2luY2VcbiAgICoge0BsaW5rICN0cmFja1VzYWdlfSB3YXMgY2FsbGVkLiBUaGlzIGxpc3QgY291bGQgbGF0ZXIgYmUgYXVkaXRlZCBhc1xuICAgKiBwb3RlbnRpYWwgZGVhZCBjb2RlLlxuICAgKi9cbiAgbGlzdFVudXNlZEtleXMoKTogYW55W10ge1xuICAgIGlmICh0aGlzLl91c2VkS2V5cyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignVXNhZ2UgdHJhY2tpbmcgaXMgZGlzYWJsZWQnKTtcbiAgICB9XG4gICAgdmFyIGFsbFR5cGVzID0gTWFwV3JhcHBlci5rZXlzKHRoaXMuX2luamVjdGFibGVJbmZvKTtcbiAgICByZXR1cm4gYWxsVHlwZXMuZmlsdGVyKGtleSA9PiAhU2V0V3JhcHBlci5oYXModGhpcy5fdXNlZEtleXMsIGtleSkpO1xuICB9XG5cbiAgcmVnaXN0ZXJGdW5jdGlvbihmdW5jOiBGdW5jdGlvbiwgZnVuY0luZm86IFJlZmxlY3Rpb25JbmZvKTogdm9pZCB7XG4gICAgdGhpcy5faW5qZWN0YWJsZUluZm8uc2V0KGZ1bmMsIGZ1bmNJbmZvKTtcbiAgfVxuXG4gIHJlZ2lzdGVyVHlwZSh0eXBlOiBUeXBlLCB0eXBlSW5mbzogUmVmbGVjdGlvbkluZm8pOiB2b2lkIHtcbiAgICB0aGlzLl9pbmplY3RhYmxlSW5mby5zZXQodHlwZSwgdHlwZUluZm8pO1xuICB9XG5cbiAgcmVnaXN0ZXJHZXR0ZXJzKGdldHRlcnM6IHtba2V5OiBzdHJpbmddOiBHZXR0ZXJGbn0pOiB2b2lkIHsgX21lcmdlTWFwcyh0aGlzLl9nZXR0ZXJzLCBnZXR0ZXJzKTsgfVxuXG4gIHJlZ2lzdGVyU2V0dGVycyhzZXR0ZXJzOiB7W2tleTogc3RyaW5nXTogU2V0dGVyRm59KTogdm9pZCB7IF9tZXJnZU1hcHModGhpcy5fc2V0dGVycywgc2V0dGVycyk7IH1cblxuICByZWdpc3Rlck1ldGhvZHMobWV0aG9kczoge1trZXk6IHN0cmluZ106IE1ldGhvZEZufSk6IHZvaWQgeyBfbWVyZ2VNYXBzKHRoaXMuX21ldGhvZHMsIG1ldGhvZHMpOyB9XG5cbiAgZmFjdG9yeSh0eXBlOiBUeXBlKTogRnVuY3Rpb24ge1xuICAgIGlmICh0aGlzLl9jb250YWluc1JlZmxlY3Rpb25JbmZvKHR5cGUpKSB7XG4gICAgICB2YXIgcmVzID0gdGhpcy5fZ2V0UmVmbGVjdGlvbkluZm8odHlwZSkuZmFjdG9yeTtcbiAgICAgIHJldHVybiBpc1ByZXNlbnQocmVzKSA/IHJlcyA6IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuZmFjdG9yeSh0eXBlKTtcbiAgICB9XG4gIH1cblxuICBwYXJhbWV0ZXJzKHR5cGVPckZ1bmM6IC8qVHlwZSovIGFueSk6IGFueVtdW10ge1xuICAgIGlmICh0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZU9yRnVuYykpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlT3JGdW5jKS5wYXJhbWV0ZXJzO1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMucGFyYW1ldGVycyh0eXBlT3JGdW5jKTtcbiAgICB9XG4gIH1cblxuICBhbm5vdGF0aW9ucyh0eXBlT3JGdW5jOiAvKlR5cGUqLyBhbnkpOiBhbnlbXSB7XG4gICAgaWYgKHRoaXMuX2luamVjdGFibGVJbmZvLmhhcyh0eXBlT3JGdW5jKSkge1xuICAgICAgdmFyIHJlcyA9IHRoaXMuX2dldFJlZmxlY3Rpb25JbmZvKHR5cGVPckZ1bmMpLmFubm90YXRpb25zO1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuYW5ub3RhdGlvbnModHlwZU9yRnVuYyk7XG4gICAgfVxuICB9XG5cbiAgcHJvcE1ldGFkYXRhKHR5cGVPckZ1bmM6IC8qVHlwZSovIGFueSk6IHtba2V5OiBzdHJpbmddOiBhbnlbXX0ge1xuICAgIGlmICh0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZU9yRnVuYykpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlT3JGdW5jKS5wcm9wTWV0YWRhdGE7XG4gICAgICByZXR1cm4gaXNQcmVzZW50KHJlcykgPyByZXMgOiB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5wcm9wTWV0YWRhdGEodHlwZU9yRnVuYyk7XG4gICAgfVxuICB9XG5cbiAgaW50ZXJmYWNlcyh0eXBlOiBUeXBlKTogYW55W10ge1xuICAgIGlmICh0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZSkpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlKS5pbnRlcmZhY2VzO1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuaW50ZXJmYWNlcyh0eXBlKTtcbiAgICB9XG4gIH1cblxuICBnZXR0ZXIobmFtZTogc3RyaW5nKTogR2V0dGVyRm4ge1xuICAgIGlmICh0aGlzLl9nZXR0ZXJzLmhhcyhuYW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2dldHRlcnMuZ2V0KG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLmdldHRlcihuYW1lKTtcbiAgICB9XG4gIH1cblxuICBzZXR0ZXIobmFtZTogc3RyaW5nKTogU2V0dGVyRm4ge1xuICAgIGlmICh0aGlzLl9zZXR0ZXJzLmhhcyhuYW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NldHRlcnMuZ2V0KG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLnNldHRlcihuYW1lKTtcbiAgICB9XG4gIH1cblxuICBtZXRob2QobmFtZTogc3RyaW5nKTogTWV0aG9kRm4ge1xuICAgIGlmICh0aGlzLl9tZXRob2RzLmhhcyhuYW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX21ldGhvZHMuZ2V0KG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLm1ldGhvZChuYW1lKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlT3JGdW5jOiBhbnkpOiBSZWZsZWN0aW9uSW5mbyB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl91c2VkS2V5cykpIHtcbiAgICAgIHRoaXMuX3VzZWRLZXlzLmFkZCh0eXBlT3JGdW5jKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2luamVjdGFibGVJbmZvLmdldCh0eXBlT3JGdW5jKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbnRhaW5zUmVmbGVjdGlvbkluZm8odHlwZU9yRnVuYzogYW55KSB7IHJldHVybiB0aGlzLl9pbmplY3RhYmxlSW5mby5oYXModHlwZU9yRnVuYyk7IH1cblxuICBpbXBvcnRVcmkodHlwZTogVHlwZSk6IHN0cmluZyB7IHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuaW1wb3J0VXJpKHR5cGUpOyB9XG59XG5cbmZ1bmN0aW9uIF9tZXJnZU1hcHModGFyZ2V0OiBNYXA8c3RyaW5nLCBGdW5jdGlvbj4sIGNvbmZpZzoge1trZXk6IHN0cmluZ106IEZ1bmN0aW9ufSk6IHZvaWQge1xuICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goY29uZmlnLCAodjogRnVuY3Rpb24sIGs6IHN0cmluZykgPT4gdGFyZ2V0LnNldChrLCB2KSk7XG59XG4iXX0=
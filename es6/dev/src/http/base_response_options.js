var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/core';
import { isPresent } from 'angular2/src/facade/lang';
import { Headers } from './headers';
import { ResponseType } from './enums';
/**
 * Creates a response options object to be optionally provided when instantiating a
 * {@link Response}.
 *
 * This class is based on the `ResponseInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#responseinit).
 *
 * All values are null by default. Typical defaults can be found in the
 * {@link BaseResponseOptions} class, which sub-classes `ResponseOptions`.
 *
 * This class may be used in tests to build {@link Response Responses} for
 * mock responses (see {@link MockBackend}).
 *
 * ### Example ([live demo](http://plnkr.co/edit/P9Jkk8e8cz6NVzbcxEsD?p=preview))
 *
 * ```typescript
 * import {ResponseOptions, Response} from 'angular2/http';
 *
 * var options = new ResponseOptions({
 *   body: '{"name":"Jeff"}'
 * });
 * var res = new Response(options);
 *
 * console.log('res.json():', res.json()); // Object {name: "Jeff"}
 * ```
 */
export class ResponseOptions {
    constructor({ body, status, headers, statusText, type, url } = {}) {
        this.body = isPresent(body) ? body : null;
        this.status = isPresent(status) ? status : null;
        this.headers = isPresent(headers) ? headers : null;
        this.statusText = isPresent(statusText) ? statusText : null;
        this.type = isPresent(type) ? type : null;
        this.url = isPresent(url) ? url : null;
    }
    /**
     * Creates a copy of the `ResponseOptions` instance, using the optional input as values to
     * override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * This may be useful when sharing a base `ResponseOptions` object inside tests,
     * where certain properties may change from test to test.
     *
     * ### Example ([live demo](http://plnkr.co/edit/1lXquqFfgduTFBWjNoRE?p=preview))
     *
     * ```typescript
     * import {ResponseOptions, Response} from 'angular2/http';
     *
     * var options = new ResponseOptions({
     *   body: {name: 'Jeff'}
     * });
     * var res = new Response(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('options.url:', options.url); // null
     * console.log('res.json():', res.json()); // Object {name: "Jeff"}
     * console.log('res.url:', res.url); // https://google.com
     * ```
     */
    merge(options) {
        return new ResponseOptions({
            body: isPresent(options) && isPresent(options.body) ? options.body : this.body,
            status: isPresent(options) && isPresent(options.status) ? options.status : this.status,
            headers: isPresent(options) && isPresent(options.headers) ? options.headers : this.headers,
            statusText: isPresent(options) && isPresent(options.statusText) ? options.statusText :
                this.statusText,
            type: isPresent(options) && isPresent(options.type) ? options.type : this.type,
            url: isPresent(options) && isPresent(options.url) ? options.url : this.url,
        });
    }
}
/**
 * Subclass of {@link ResponseOptions}, with default values.
 *
 * Default values:
 *  * status: 200
 *  * headers: empty {@link Headers} object
 *
 * This class could be extended and bound to the {@link ResponseOptions} class
 * when configuring an {@link Injector}, in order to override the default options
 * used by {@link Http} to create {@link Response Responses}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/qv8DLT?p=preview))
 *
 * ```typescript
 * import {provide} from 'angular2/core';
 * import {bootstrap} from 'angular2/platform/browser';
 * import {HTTP_PROVIDERS, Headers, Http, BaseResponseOptions, ResponseOptions} from
 * 'angular2/http';
 * import {App} from './myapp';
 *
 * class MyOptions extends BaseResponseOptions {
 *   headers:Headers = new Headers({network: 'github'});
 * }
 *
 * bootstrap(App, [HTTP_PROVIDERS, provide(ResponseOptions, {useClass: MyOptions})]);
 * ```
 *
 * The options could also be extended when manually creating a {@link Response}
 * object.
 *
 * ### Example ([live demo](http://plnkr.co/edit/VngosOWiaExEtbstDoix?p=preview))
 *
 * ```
 * import {BaseResponseOptions, Response} from 'angular2/http';
 *
 * var options = new BaseResponseOptions();
 * var res = new Response(options.merge({
 *   body: 'Angular2',
 *   headers: new Headers({framework: 'angular'})
 * }));
 * console.log('res.headers.get("framework"):', res.headers.get('framework')); // angular
 * console.log('res.text():', res.text()); // Angular2;
 * ```
 */
export let BaseResponseOptions = class extends ResponseOptions {
    constructor() {
        super({ status: 200, statusText: 'Ok', type: ResponseType.Default, headers: new Headers() });
    }
};
BaseResponseOptions = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], BaseResponseOptions);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9yZXNwb25zZV9vcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1WdmlwQ0JVUC50bXAvYW5ndWxhcjIvc3JjL2h0dHAvYmFzZV9yZXNwb25zZV9vcHRpb25zLnRzIl0sIm5hbWVzIjpbIlJlc3BvbnNlT3B0aW9ucyIsIlJlc3BvbnNlT3B0aW9ucy5jb25zdHJ1Y3RvciIsIlJlc3BvbnNlT3B0aW9ucy5tZXJnZSIsIkJhc2VSZXNwb25zZU9wdGlvbnMiLCJCYXNlUmVzcG9uc2VPcHRpb25zLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWU7T0FDakMsRUFBQyxTQUFTLEVBQWEsTUFBTSwwQkFBMEI7T0FDdkQsRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXO09BQzFCLEVBQUMsWUFBWSxFQUFDLE1BQU0sU0FBUztBQUdwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNIO0lBd0JFQSxZQUFZQSxFQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxPQUFPQSxFQUFFQSxVQUFVQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFDQSxHQUF3QkEsRUFBRUE7UUFDbEZDLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO1FBQzFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUNoREEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDbkRBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLFNBQVNBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1FBQzVEQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUMxQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDekNBLENBQUNBO0lBRUREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3QkdBO0lBQ0hBLEtBQUtBLENBQUNBLE9BQTZCQTtRQUNqQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsZUFBZUEsQ0FBQ0E7WUFDekJBLElBQUlBLEVBQUVBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBO1lBQzlFQSxNQUFNQSxFQUFFQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQTtZQUN0RkEsT0FBT0EsRUFBRUEsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0E7WUFDMUZBLFVBQVVBLEVBQUVBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLFVBQVVBO2dCQUNsQkEsSUFBSUEsQ0FBQ0EsVUFBVUE7WUFDakZBLElBQUlBLEVBQUVBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBO1lBQzlFQSxHQUFHQSxFQUFFQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQTtTQUMzRUEsQ0FBQ0EsQ0FBQ0E7SUFDTEEsQ0FBQ0E7QUFDSEYsQ0FBQ0E7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDRztBQUNILCtDQUN5QyxlQUFlO0lBQ3RERztRQUNFQyxNQUFNQSxFQUFDQSxNQUFNQSxFQUFFQSxHQUFHQSxFQUFFQSxVQUFVQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxZQUFZQSxDQUFDQSxPQUFPQSxFQUFFQSxPQUFPQSxFQUFFQSxJQUFJQSxPQUFPQSxFQUFFQSxFQUFDQSxDQUFDQSxDQUFDQTtJQUM3RkEsQ0FBQ0E7QUFDSEQsQ0FBQ0E7QUFMRDtJQUFDLFVBQVUsRUFBRTs7d0JBS1o7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNKc09iamVjdH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7SGVhZGVyc30gZnJvbSAnLi9oZWFkZXJzJztcbmltcG9ydCB7UmVzcG9uc2VUeXBlfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7UmVzcG9uc2VPcHRpb25zQXJnc30gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgcmVzcG9uc2Ugb3B0aW9ucyBvYmplY3QgdG8gYmUgb3B0aW9uYWxseSBwcm92aWRlZCB3aGVuIGluc3RhbnRpYXRpbmcgYVxuICoge0BsaW5rIFJlc3BvbnNlfS5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIGJhc2VkIG9uIHRoZSBgUmVzcG9uc2VJbml0YCBkZXNjcmlwdGlvbiBpbiB0aGUgW0ZldGNoXG4gKiBTcGVjXShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jcmVzcG9uc2Vpbml0KS5cbiAqXG4gKiBBbGwgdmFsdWVzIGFyZSBudWxsIGJ5IGRlZmF1bHQuIFR5cGljYWwgZGVmYXVsdHMgY2FuIGJlIGZvdW5kIGluIHRoZVxuICoge0BsaW5rIEJhc2VSZXNwb25zZU9wdGlvbnN9IGNsYXNzLCB3aGljaCBzdWItY2xhc3NlcyBgUmVzcG9uc2VPcHRpb25zYC5cbiAqXG4gKiBUaGlzIGNsYXNzIG1heSBiZSB1c2VkIGluIHRlc3RzIHRvIGJ1aWxkIHtAbGluayBSZXNwb25zZSBSZXNwb25zZXN9IGZvclxuICogbW9jayByZXNwb25zZXMgKHNlZSB7QGxpbmsgTW9ja0JhY2tlbmR9KS5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvUDlKa2s4ZThjejZOVnpiY3hFc0Q/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge1Jlc3BvbnNlT3B0aW9ucywgUmVzcG9uc2V9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuICpcbiAqIHZhciBvcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7XG4gKiAgIGJvZHk6ICd7XCJuYW1lXCI6XCJKZWZmXCJ9J1xuICogfSk7XG4gKiB2YXIgcmVzID0gbmV3IFJlc3BvbnNlKG9wdGlvbnMpO1xuICpcbiAqIGNvbnNvbGUubG9nKCdyZXMuanNvbigpOicsIHJlcy5qc29uKCkpOyAvLyBPYmplY3Qge25hbWU6IFwiSmVmZlwifVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNwb25zZU9wdGlvbnMge1xuICAvLyBUT0RPOiBBcnJheUJ1ZmZlciB8IEZvcm1EYXRhIHwgQmxvYlxuICAvKipcbiAgICogU3RyaW5nIG9yIE9iamVjdCByZXByZXNlbnRpbmcgdGhlIGJvZHkgb2YgdGhlIHtAbGluayBSZXNwb25zZX0uXG4gICAqL1xuICBib2R5OiBzdHJpbmd8T2JqZWN0O1xuICAvKipcbiAgICogSHR0cCB7QGxpbmsgaHR0cDovL3d3dy53My5vcmcvUHJvdG9jb2xzL3JmYzI2MTYvcmZjMjYxNi1zZWMxMC5odG1sIHN0YXR1cyBjb2RlfVxuICAgKiBhc3NvY2lhdGVkIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgKi9cbiAgc3RhdHVzOiBudW1iZXI7XG4gIC8qKlxuICAgKiBSZXNwb25zZSB7QGxpbmsgSGVhZGVycyBoZWFkZXJzfVxuICAgKi9cbiAgaGVhZGVyczogSGVhZGVycztcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgc3RhdHVzVGV4dDogc3RyaW5nO1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICB0eXBlOiBSZXNwb25zZVR5cGU7XG4gIHVybDogc3RyaW5nO1xuICBjb25zdHJ1Y3Rvcih7Ym9keSwgc3RhdHVzLCBoZWFkZXJzLCBzdGF0dXNUZXh0LCB0eXBlLCB1cmx9OiBSZXNwb25zZU9wdGlvbnNBcmdzID0ge30pIHtcbiAgICB0aGlzLmJvZHkgPSBpc1ByZXNlbnQoYm9keSkgPyBib2R5IDogbnVsbDtcbiAgICB0aGlzLnN0YXR1cyA9IGlzUHJlc2VudChzdGF0dXMpID8gc3RhdHVzIDogbnVsbDtcbiAgICB0aGlzLmhlYWRlcnMgPSBpc1ByZXNlbnQoaGVhZGVycykgPyBoZWFkZXJzIDogbnVsbDtcbiAgICB0aGlzLnN0YXR1c1RleHQgPSBpc1ByZXNlbnQoc3RhdHVzVGV4dCkgPyBzdGF0dXNUZXh0IDogbnVsbDtcbiAgICB0aGlzLnR5cGUgPSBpc1ByZXNlbnQodHlwZSkgPyB0eXBlIDogbnVsbDtcbiAgICB0aGlzLnVybCA9IGlzUHJlc2VudCh1cmwpID8gdXJsIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGUgYFJlc3BvbnNlT3B0aW9uc2AgaW5zdGFuY2UsIHVzaW5nIHRoZSBvcHRpb25hbCBpbnB1dCBhcyB2YWx1ZXMgdG9cbiAgICogb3ZlcnJpZGVcbiAgICogZXhpc3RpbmcgdmFsdWVzLiBUaGlzIG1ldGhvZCB3aWxsIG5vdCBjaGFuZ2UgdGhlIHZhbHVlcyBvZiB0aGUgaW5zdGFuY2Ugb24gd2hpY2ggaXQgaXMgYmVpbmdcbiAgICogY2FsbGVkLlxuICAgKlxuICAgKiBUaGlzIG1heSBiZSB1c2VmdWwgd2hlbiBzaGFyaW5nIGEgYmFzZSBgUmVzcG9uc2VPcHRpb25zYCBvYmplY3QgaW5zaWRlIHRlc3RzLFxuICAgKiB3aGVyZSBjZXJ0YWluIHByb3BlcnRpZXMgbWF5IGNoYW5nZSBmcm9tIHRlc3QgdG8gdGVzdC5cbiAgICpcbiAgICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0LzFsWHF1cUZmZ2R1VEZCV2pOb1JFP3A9cHJldmlldykpXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogaW1wb3J0IHtSZXNwb25zZU9wdGlvbnMsIFJlc3BvbnNlfSBmcm9tICdhbmd1bGFyMi9odHRwJztcbiAgICpcbiAgICogdmFyIG9wdGlvbnMgPSBuZXcgUmVzcG9uc2VPcHRpb25zKHtcbiAgICogICBib2R5OiB7bmFtZTogJ0plZmYnfVxuICAgKiB9KTtcbiAgICogdmFyIHJlcyA9IG5ldyBSZXNwb25zZShvcHRpb25zLm1lcmdlKHtcbiAgICogICB1cmw6ICdodHRwczovL2dvb2dsZS5jb20nXG4gICAqIH0pKTtcbiAgICogY29uc29sZS5sb2coJ29wdGlvbnMudXJsOicsIG9wdGlvbnMudXJsKTsgLy8gbnVsbFxuICAgKiBjb25zb2xlLmxvZygncmVzLmpzb24oKTonLCByZXMuanNvbigpKTsgLy8gT2JqZWN0IHtuYW1lOiBcIkplZmZcIn1cbiAgICogY29uc29sZS5sb2coJ3Jlcy51cmw6JywgcmVzLnVybCk7IC8vIGh0dHBzOi8vZ29vZ2xlLmNvbVxuICAgKiBgYGBcbiAgICovXG4gIG1lcmdlKG9wdGlvbnM/OiBSZXNwb25zZU9wdGlvbnNBcmdzKTogUmVzcG9uc2VPcHRpb25zIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlT3B0aW9ucyh7XG4gICAgICBib2R5OiBpc1ByZXNlbnQob3B0aW9ucykgJiYgaXNQcmVzZW50KG9wdGlvbnMuYm9keSkgPyBvcHRpb25zLmJvZHkgOiB0aGlzLmJvZHksXG4gICAgICBzdGF0dXM6IGlzUHJlc2VudChvcHRpb25zKSAmJiBpc1ByZXNlbnQob3B0aW9ucy5zdGF0dXMpID8gb3B0aW9ucy5zdGF0dXMgOiB0aGlzLnN0YXR1cyxcbiAgICAgIGhlYWRlcnM6IGlzUHJlc2VudChvcHRpb25zKSAmJiBpc1ByZXNlbnQob3B0aW9ucy5oZWFkZXJzKSA/IG9wdGlvbnMuaGVhZGVycyA6IHRoaXMuaGVhZGVycyxcbiAgICAgIHN0YXR1c1RleHQ6IGlzUHJlc2VudChvcHRpb25zKSAmJiBpc1ByZXNlbnQob3B0aW9ucy5zdGF0dXNUZXh0KSA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c1RleHQsXG4gICAgICB0eXBlOiBpc1ByZXNlbnQob3B0aW9ucykgJiYgaXNQcmVzZW50KG9wdGlvbnMudHlwZSkgPyBvcHRpb25zLnR5cGUgOiB0aGlzLnR5cGUsXG4gICAgICB1cmw6IGlzUHJlc2VudChvcHRpb25zKSAmJiBpc1ByZXNlbnQob3B0aW9ucy51cmwpID8gb3B0aW9ucy51cmwgOiB0aGlzLnVybCxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFN1YmNsYXNzIG9mIHtAbGluayBSZXNwb25zZU9wdGlvbnN9LCB3aXRoIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIERlZmF1bHQgdmFsdWVzOlxuICogICogc3RhdHVzOiAyMDBcbiAqICAqIGhlYWRlcnM6IGVtcHR5IHtAbGluayBIZWFkZXJzfSBvYmplY3RcbiAqXG4gKiBUaGlzIGNsYXNzIGNvdWxkIGJlIGV4dGVuZGVkIGFuZCBib3VuZCB0byB0aGUge0BsaW5rIFJlc3BvbnNlT3B0aW9uc30gY2xhc3NcbiAqIHdoZW4gY29uZmlndXJpbmcgYW4ge0BsaW5rIEluamVjdG9yfSwgaW4gb3JkZXIgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb3B0aW9uc1xuICogdXNlZCBieSB7QGxpbmsgSHR0cH0gdG8gY3JlYXRlIHtAbGluayBSZXNwb25zZSBSZXNwb25zZXN9LlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9xdjhETFQ/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge3Byb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuICogaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuICogaW1wb3J0IHtIVFRQX1BST1ZJREVSUywgSGVhZGVycywgSHR0cCwgQmFzZVJlc3BvbnNlT3B0aW9ucywgUmVzcG9uc2VPcHRpb25zfSBmcm9tXG4gKiAnYW5ndWxhcjIvaHR0cCc7XG4gKiBpbXBvcnQge0FwcH0gZnJvbSAnLi9teWFwcCc7XG4gKlxuICogY2xhc3MgTXlPcHRpb25zIGV4dGVuZHMgQmFzZVJlc3BvbnNlT3B0aW9ucyB7XG4gKiAgIGhlYWRlcnM6SGVhZGVycyA9IG5ldyBIZWFkZXJzKHtuZXR3b3JrOiAnZ2l0aHViJ30pO1xuICogfVxuICpcbiAqIGJvb3RzdHJhcChBcHAsIFtIVFRQX1BST1ZJREVSUywgcHJvdmlkZShSZXNwb25zZU9wdGlvbnMsIHt1c2VDbGFzczogTXlPcHRpb25zfSldKTtcbiAqIGBgYFxuICpcbiAqIFRoZSBvcHRpb25zIGNvdWxkIGFsc28gYmUgZXh0ZW5kZWQgd2hlbiBtYW51YWxseSBjcmVhdGluZyBhIHtAbGluayBSZXNwb25zZX1cbiAqIG9iamVjdC5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvVm5nb3NPV2lhRXhFdGJzdERvaXg/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7QmFzZVJlc3BvbnNlT3B0aW9ucywgUmVzcG9uc2V9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuICpcbiAqIHZhciBvcHRpb25zID0gbmV3IEJhc2VSZXNwb25zZU9wdGlvbnMoKTtcbiAqIHZhciByZXMgPSBuZXcgUmVzcG9uc2Uob3B0aW9ucy5tZXJnZSh7XG4gKiAgIGJvZHk6ICdBbmd1bGFyMicsXG4gKiAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtmcmFtZXdvcms6ICdhbmd1bGFyJ30pXG4gKiB9KSk7XG4gKiBjb25zb2xlLmxvZygncmVzLmhlYWRlcnMuZ2V0KFwiZnJhbWV3b3JrXCIpOicsIHJlcy5oZWFkZXJzLmdldCgnZnJhbWV3b3JrJykpOyAvLyBhbmd1bGFyXG4gKiBjb25zb2xlLmxvZygncmVzLnRleHQoKTonLCByZXMudGV4dCgpKTsgLy8gQW5ndWxhcjI7XG4gKiBgYGBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhc2VSZXNwb25zZU9wdGlvbnMgZXh0ZW5kcyBSZXNwb25zZU9wdGlvbnMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7c3RhdHVzOiAyMDAsIHN0YXR1c1RleHQ6ICdPaycsIHR5cGU6IFJlc3BvbnNlVHlwZS5EZWZhdWx0LCBoZWFkZXJzOiBuZXcgSGVhZGVycygpfSk7XG4gIH1cbn1cbiJdfQ==
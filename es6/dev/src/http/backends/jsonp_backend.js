var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConnectionBackend } from '../interfaces';
import { ReadyState, RequestMethod, ResponseType } from '../enums';
import { Response } from '../static_response';
import { ResponseOptions } from '../base_response_options';
import { Injectable } from 'angular2/core';
import { BrowserJsonp } from './browser_jsonp';
import { makeTypeError } from 'angular2/src/facade/exceptions';
import { StringWrapper, isPresent } from 'angular2/src/facade/lang';
import { Observable } from 'rxjs/Observable';
const JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
const JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
/**
 * Abstract base class for an in-flight JSONP request.
 */
export class JSONPConnection {
}
export class JSONPConnection_ extends JSONPConnection {
    constructor(req, _dom, baseResponseOptions) {
        super();
        this._dom = _dom;
        this.baseResponseOptions = baseResponseOptions;
        this._finished = false;
        if (req.method !== RequestMethod.Get) {
            throw makeTypeError(JSONP_ERR_WRONG_METHOD);
        }
        this.request = req;
        this.response = new Observable((responseObserver) => {
            this.readyState = ReadyState.Loading;
            let id = this._id = _dom.nextRequestID();
            _dom.exposeConnection(id, this);
            // Workaround Dart
            // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
            let callback = _dom.requestCallback(this._id);
            let url = req.url;
            if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                url = StringWrapper.replace(url, '=JSONP_CALLBACK&', `=${callback}&`);
            }
            else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + `=${callback}`;
            }
            let script = this._script = _dom.build(url);
            let onLoad = (event) => {
                if (this.readyState === ReadyState.Cancelled)
                    return;
                this.readyState = ReadyState.Done;
                _dom.cleanup(script);
                if (!this._finished) {
                    let responseOptions = new ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: ResponseType.Error, url });
                    if (isPresent(baseResponseOptions)) {
                        responseOptions = baseResponseOptions.merge(responseOptions);
                    }
                    responseObserver.error(new Response(responseOptions));
                    return;
                }
                let responseOptions = new ResponseOptions({ body: this._responseData, url });
                if (isPresent(this.baseResponseOptions)) {
                    responseOptions = this.baseResponseOptions.merge(responseOptions);
                }
                responseObserver.next(new Response(responseOptions));
                responseObserver.complete();
            };
            let onError = (error) => {
                if (this.readyState === ReadyState.Cancelled)
                    return;
                this.readyState = ReadyState.Done;
                _dom.cleanup(script);
                let responseOptions = new ResponseOptions({ body: error.message, type: ResponseType.Error });
                if (isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new Response(responseOptions));
            };
            script.addEventListener('load', onLoad);
            script.addEventListener('error', onError);
            _dom.send(script);
            return () => {
                this.readyState = ReadyState.Cancelled;
                script.removeEventListener('load', onLoad);
                script.removeEventListener('error', onError);
                if (isPresent(script)) {
                    this._dom.cleanup(script);
                }
            };
        });
    }
    finished(data) {
        // Don't leak connections
        this._finished = true;
        this._dom.removeConnection(this._id);
        if (this.readyState === ReadyState.Cancelled)
            return;
        this._responseData = data;
    }
}
/**
 * A {@link ConnectionBackend} that uses the JSONP strategy of making requests.
 */
export class JSONPBackend extends ConnectionBackend {
}
export let JSONPBackend_ = class extends JSONPBackend {
    constructor(_browserJSONP, _baseResponseOptions) {
        super();
        this._browserJSONP = _browserJSONP;
        this._baseResponseOptions = _baseResponseOptions;
    }
    createConnection(request) {
        return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
    }
};
JSONPBackend_ = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [BrowserJsonp, ResponseOptions])
], JSONPBackend_);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBfYmFja2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtVnZpcENCVVAudG1wL2FuZ3VsYXIyL3NyYy9odHRwL2JhY2tlbmRzL2pzb25wX2JhY2tlbmQudHMiXSwibmFtZXMiOlsiSlNPTlBDb25uZWN0aW9uIiwiSlNPTlBDb25uZWN0aW9uXyIsIkpTT05QQ29ubmVjdGlvbl8uY29uc3RydWN0b3IiLCJKU09OUENvbm5lY3Rpb25fLmZpbmlzaGVkIiwiSlNPTlBCYWNrZW5kIiwiSlNPTlBCYWNrZW5kXyIsIkpTT05QQmFja2VuZF8uY29uc3RydWN0b3IiLCJKU09OUEJhY2tlbmRfLmNyZWF0ZUNvbm5lY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztPQUFPLEVBQUMsaUJBQWlCLEVBQWEsTUFBTSxlQUFlO09BQ3BELEVBQUMsVUFBVSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUMsTUFBTSxVQUFVO09BRXpELEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CO09BQ3BDLEVBQUMsZUFBZSxFQUFzQixNQUFNLDBCQUEwQjtPQUN0RSxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWU7T0FDakMsRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUI7T0FDckMsRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDckQsRUFBQyxhQUFhLEVBQUUsU0FBUyxFQUFDLE1BQU0sMEJBQTBCO09BQzFELEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCO0FBRzFDLE1BQU0scUJBQXFCLEdBQUcsZ0RBQWdELENBQUM7QUFDL0UsTUFBTSxzQkFBc0IsR0FBRyw2Q0FBNkMsQ0FBQztBQUU3RTs7R0FFRztBQUNIO0FBcUJBQSxDQUFDQTtBQUVELHNDQUFzQyxlQUFlO0lBTW5EQyxZQUNJQSxHQUFZQSxFQUFVQSxJQUFrQkEsRUFBVUEsbUJBQXFDQTtRQUN6RkMsT0FBT0EsQ0FBQ0E7UUFEZ0JBLFNBQUlBLEdBQUpBLElBQUlBLENBQWNBO1FBQVVBLHdCQUFtQkEsR0FBbkJBLG1CQUFtQkEsQ0FBa0JBO1FBSG5GQSxjQUFTQSxHQUFZQSxLQUFLQSxDQUFDQTtRQUtqQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsS0FBS0EsYUFBYUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckNBLE1BQU1BLGFBQWFBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0E7UUFDOUNBLENBQUNBO1FBQ0RBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEdBQUdBLENBQUNBO1FBQ25CQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxVQUFVQSxDQUFDQSxDQUFDQSxnQkFBb0NBO1lBRWxFQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNyQ0EsSUFBSUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7WUFFekNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsRUFBRUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFaENBLGtCQUFrQkE7WUFDbEJBLGlFQUFpRUE7WUFDakVBLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzlDQSxJQUFJQSxHQUFHQSxHQUFXQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUMxQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDekNBLEdBQUdBLEdBQUdBLGFBQWFBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLEVBQUVBLGtCQUFrQkEsRUFBRUEsSUFBSUEsUUFBUUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDeEVBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsTUFBTUEsR0FBR0EsaUJBQWlCQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDeEZBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLE1BQU1BLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7WUFDakZBLENBQUNBO1lBRURBLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRTVDQSxJQUFJQSxNQUFNQSxHQUFHQSxDQUFDQSxLQUFZQTtnQkFDeEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEtBQUtBLFVBQVVBLENBQUNBLFNBQVNBLENBQUNBO29CQUFDQSxNQUFNQSxDQUFDQTtnQkFDckRBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBO2dCQUNsQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDcEJBLElBQUlBLGVBQWVBLEdBQ2ZBLElBQUlBLGVBQWVBLENBQUNBLEVBQUNBLElBQUlBLEVBQUVBLHFCQUFxQkEsRUFBRUEsSUFBSUEsRUFBRUEsWUFBWUEsQ0FBQ0EsS0FBS0EsRUFBRUEsR0FBR0EsRUFBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3RGQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNuQ0EsZUFB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QUNqQkUseUJBQXlCQTtRQUN6QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDdEJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDckNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEtBQUtBLFVBQVVBLENBQUNBLFNBQVNBLENBQUNBO1lBQUNBLE1BQU1BLENBQUNBO1FBQ3JEQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUM1QkEsQ0FBQ0E7QUFDSEYsQ0FBQ0E7QUFFRDs7R0FFRztBQUNILGtDQUEyQyxpQkFBaUI7QUFBRUcsQ0FBQ0E7QUFFL0QseUNBQ21DLFlBQVk7SUFDN0NDLFlBQW9CQSxhQUEyQkEsRUFBVUEsb0JBQXFDQTtRQUM1RkMsT0FBT0EsQ0FBQ0E7UUFEVUEsa0JBQWFBLEdBQWJBLGFBQWFBLENBQWNBO1FBQVVBLHlCQUFvQkEsR0FBcEJBLG9CQUFvQkEsQ0FBaUJBO0lBRTlGQSxDQUFDQTtJQUVERCxnQkFBZ0JBLENBQUNBLE9BQWdCQTtRQUMvQkUsTUFBTUEsQ0FBQ0EsSUFBSUEsZ0JBQWdCQSxDQUFDQSxPQUFPQSxFQUFFQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBO0lBQ3RGQSxDQUFDQTtBQUNIRixDQUFDQTtBQVREO0lBQUMsVUFBVSxFQUFFOztrQkFTWjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25uZWN0aW9uQmFja2VuZCwgQ29ubmVjdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge1JlYWR5U3RhdGUsIFJlcXVlc3RNZXRob2QsIFJlc3BvbnNlVHlwZX0gZnJvbSAnLi4vZW51bXMnO1xuaW1wb3J0IHtSZXF1ZXN0fSBmcm9tICcuLi9zdGF0aWNfcmVxdWVzdCc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi9zdGF0aWNfcmVzcG9uc2UnO1xuaW1wb3J0IHtSZXNwb25zZU9wdGlvbnMsIEJhc2VSZXNwb25zZU9wdGlvbnN9IGZyb20gJy4uL2Jhc2VfcmVzcG9uc2Vfb3B0aW9ucyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VySnNvbnB9IGZyb20gJy4vYnJvd3Nlcl9qc29ucCc7XG5pbXBvcnQge21ha2VUeXBlRXJyb3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1N0cmluZ1dyYXBwZXIsIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7T2JzZXJ2ZXJ9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5jb25zdCBKU09OUF9FUlJfTk9fQ0FMTEJBQ0sgPSAnSlNPTlAgaW5qZWN0ZWQgc2NyaXB0IGRpZCBub3QgaW52b2tlIGNhbGxiYWNrLic7XG5jb25zdCBKU09OUF9FUlJfV1JPTkdfTUVUSE9EID0gJ0pTT05QIHJlcXVlc3RzIG11c3QgdXNlIEdFVCByZXF1ZXN0IG1ldGhvZC4nO1xuXG4vKipcbiAqIEFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIGFuIGluLWZsaWdodCBKU09OUCByZXF1ZXN0LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSlNPTlBDb25uZWN0aW9uIGltcGxlbWVudHMgQ29ubmVjdGlvbiB7XG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIFJlYWR5U3RhdGV9IG9mIHRoaXMgcmVxdWVzdC5cbiAgICovXG4gIHJlYWR5U3RhdGU6IFJlYWR5U3RhdGU7XG5cbiAgLyoqXG4gICAqIFRoZSBvdXRnb2luZyBIVFRQIHJlcXVlc3QuXG4gICAqL1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgY29tcGxldGVzIHdpdGggdGhlIHJlc3BvbnNlLCB3aGVuIHRoZSByZXF1ZXN0IGlzIGZpbmlzaGVkLlxuICAgKi9cbiAgcmVzcG9uc2U6IE9ic2VydmFibGU8UmVzcG9uc2U+O1xuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBjYWxsZWQgd2hlbiB0aGUgSlNPTlAgcmVxdWVzdCBjb21wbGV0ZXMsIHRvIG5vdGlmeSB0aGUgYXBwbGljYXRpb25cbiAgICogb2YgdGhlIG5ldyBkYXRhLlxuICAgKi9cbiAgYWJzdHJhY3QgZmluaXNoZWQoZGF0YT86IGFueSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBKU09OUENvbm5lY3Rpb25fIGV4dGVuZHMgSlNPTlBDb25uZWN0aW9uIHtcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfc2NyaXB0OiBFbGVtZW50O1xuICBwcml2YXRlIF9yZXNwb25zZURhdGE6IGFueTtcbiAgcHJpdmF0ZSBfZmluaXNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHJlcTogUmVxdWVzdCwgcHJpdmF0ZSBfZG9tOiBCcm93c2VySnNvbnAsIHByaXZhdGUgYmFzZVJlc3BvbnNlT3B0aW9ucz86IFJlc3BvbnNlT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKHJlcS5tZXRob2QgIT09IFJlcXVlc3RNZXRob2QuR2V0KSB7XG4gICAgICB0aHJvdyBtYWtlVHlwZUVycm9yKEpTT05QX0VSUl9XUk9OR19NRVRIT0QpO1xuICAgIH1cbiAgICB0aGlzLnJlcXVlc3QgPSByZXE7XG4gICAgdGhpcy5yZXNwb25zZSA9IG5ldyBPYnNlcnZhYmxlKChyZXNwb25zZU9ic2VydmVyOiBPYnNlcnZlcjxSZXNwb25zZT4pID0+IHtcblxuICAgICAgdGhpcy5yZWFkeVN0YXRlID0gUmVhZHlTdGF0ZS5Mb2FkaW5nO1xuICAgICAgbGV0IGlkID0gdGhpcy5faWQgPSBfZG9tLm5leHRSZXF1ZXN0SUQoKTtcblxuICAgICAgX2RvbS5leHBvc2VDb25uZWN0aW9uKGlkLCB0aGlzKTtcblxuICAgICAgLy8gV29ya2Fyb3VuZCBEYXJ0XG4gICAgICAvLyB1cmwgPSB1cmwucmVwbGFjZSgvPUpTT05QX0NBTExCQUNLKCZ8JCkvLCBgZ2VuZXJhdGVkIG1ldGhvZGApO1xuICAgICAgbGV0IGNhbGxiYWNrID0gX2RvbS5yZXF1ZXN0Q2FsbGJhY2sodGhpcy5faWQpO1xuICAgICAgbGV0IHVybDogc3RyaW5nID0gcmVxLnVybDtcbiAgICAgIGlmICh1cmwuaW5kZXhPZignPUpTT05QX0NBTExCQUNLJicpID4gLTEpIHtcbiAgICAgICAgdXJsID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlKHVybCwgJz1KU09OUF9DQUxMQkFDSyYnLCBgPSR7Y2FsbGJhY2t9JmApO1xuICAgICAgfSBlbHNlIGlmICh1cmwubGFzdEluZGV4T2YoJz1KU09OUF9DQUxMQkFDSycpID09PSB1cmwubGVuZ3RoIC0gJz1KU09OUF9DQUxMQkFDSycubGVuZ3RoKSB7XG4gICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtICc9SlNPTlBfQ0FMTEJBQ0snLmxlbmd0aCkgKyBgPSR7Y2FsbGJhY2t9YDtcbiAgICAgIH1cblxuICAgICAgbGV0IHNjcmlwdCA9IHRoaXMuX3NjcmlwdCA9IF9kb20uYnVpbGQodXJsKTtcblxuICAgICAgbGV0IG9uTG9hZCA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gUmVhZHlTdGF0ZS5DYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gUmVhZHlTdGF0ZS5Eb25lO1xuICAgICAgICBfZG9tLmNsZWFudXAoc2NyaXB0KTtcbiAgICAgICAgaWYgKCF0aGlzLl9maW5pc2hlZCkge1xuICAgICAgICAgIGxldCByZXNwb25zZU9wdGlvbnMgPVxuICAgICAgICAgICAgICBuZXcgUmVzcG9uc2VPcHRpb25zKHtib2R5OiBKU09OUF9FUlJfTk9fQ0FMTEJBQ0ssIHR5cGU6IFJlc3BvbnNlVHlwZS5FcnJvciwgdXJsfSk7XG4gICAgICAgICAgaWYgKGlzUHJlc2VudChiYXNlUmVzcG9uc2VPcHRpb25zKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VPcHRpb25zID0gYmFzZVJlc3BvbnNlT3B0aW9ucy5tZXJnZShyZXNwb25zZU9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNwb25zZU9ic2VydmVyLmVycm9yKG5ldyBSZXNwb25zZShyZXNwb25zZU9wdGlvbnMpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzcG9uc2VPcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7Ym9keTogdGhpcy5fcmVzcG9uc2VEYXRhLCB1cmx9KTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmJhc2VSZXNwb25zZU9wdGlvbnMpKSB7XG4gICAgICAgICAgcmVzcG9uc2VPcHRpb25zID0gdGhpcy5iYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNwb25zZU9ic2VydmVyLm5leHQobmV3IFJlc3BvbnNlKHJlc3BvbnNlT3B0aW9ucykpO1xuICAgICAgICByZXNwb25zZU9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgb25FcnJvciA9IChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gUmVhZHlTdGF0ZS5DYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gUmVhZHlTdGF0ZS5Eb25lO1xuICAgICAgICBfZG9tLmNsZWFudXAoc2NyaXB0KTtcbiAgICAgICAgbGV0IHJlc3BvbnNlT3B0aW9ucyA9IG5ldyBSZXNwb25zZU9wdGlvbnMoe2JvZHk6IGVycm9yLm1lc3NhZ2UsIHR5cGU6IFJlc3BvbnNlVHlwZS5FcnJvcn0pO1xuICAgICAgICBpZiAoaXNQcmVzZW50KGJhc2VSZXNwb25zZU9wdGlvbnMpKSB7XG4gICAgICAgICAgcmVzcG9uc2VPcHRpb25zID0gYmFzZVJlc3BvbnNlT3B0aW9ucy5tZXJnZShyZXNwb25zZU9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuZXJyb3IobmV3IFJlc3BvbnNlKHJlc3BvbnNlT3B0aW9ucykpO1xuICAgICAgfTtcblxuICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xuICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG5cbiAgICAgIF9kb20uc2VuZChzY3JpcHQpO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkNhbmNlbGxlZDtcbiAgICAgICAgc2NyaXB0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xuICAgICAgICBzY3JpcHQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChzY3JpcHQpKSB7XG4gICAgICAgICAgdGhpcy5fZG9tLmNsZWFudXAoc2NyaXB0KTtcbiAgICAgICAgfVxuXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZmluaXNoZWQoZGF0YT86IGFueSkge1xuICAgIC8vIERvbid0IGxlYWsgY29ubmVjdGlvbnNcbiAgICB0aGlzLl9maW5pc2hlZCA9IHRydWU7XG4gICAgdGhpcy5fZG9tLnJlbW92ZUNvbm5lY3Rpb24odGhpcy5faWQpO1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFJlYWR5U3RhdGUuQ2FuY2VsbGVkKSByZXR1cm47XG4gICAgdGhpcy5fcmVzcG9uc2VEYXRhID0gZGF0YTtcbiAgfVxufVxuXG4vKipcbiAqIEEge0BsaW5rIENvbm5lY3Rpb25CYWNrZW5kfSB0aGF0IHVzZXMgdGhlIEpTT05QIHN0cmF0ZWd5IG9mIG1ha2luZyByZXF1ZXN0cy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEpTT05QQmFja2VuZCBleHRlbmRzIENvbm5lY3Rpb25CYWNrZW5kIHt9XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKU09OUEJhY2tlbmRfIGV4dGVuZHMgSlNPTlBCYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYnJvd3NlckpTT05QOiBCcm93c2VySnNvbnAsIHByaXZhdGUgX2Jhc2VSZXNwb25zZU9wdGlvbnM6IFJlc3BvbnNlT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBjcmVhdGVDb25uZWN0aW9uKHJlcXVlc3Q6IFJlcXVlc3QpOiBKU09OUENvbm5lY3Rpb24ge1xuICAgIHJldHVybiBuZXcgSlNPTlBDb25uZWN0aW9uXyhyZXF1ZXN0LCB0aGlzLl9icm93c2VySlNPTlAsIHRoaXMuX2Jhc2VSZXNwb25zZU9wdGlvbnMpO1xuICB9XG59XG4iXX0=
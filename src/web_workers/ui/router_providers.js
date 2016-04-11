'use strict';var platform_location_1 = require('./platform_location');
var lang_1 = require('angular2/src/facade/lang');
var browser_platform_location_1 = require('angular2/src/router/location/browser_platform_location');
var core_1 = require('angular2/core');
exports.WORKER_RENDER_ROUTER = lang_1.CONST_EXPR([
    platform_location_1.MessageBasedPlatformLocation, browser_platform_location_1.BrowserPlatformLocation,
    lang_1.CONST_EXPR(new core_1.Provider(core_1.APP_INITIALIZER, { useFactory: initRouterListeners, multi: true, deps: lang_1.CONST_EXPR([core_1.Injector]) }))
]);
function initRouterListeners(injector) {
    return function () {
        var zone = injector.get(core_1.NgZone);
        zone.run(function () { return injector.get(platform_location_1.MessageBasedPlatformLocation).start(); });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Byb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtVjN2MFZKRkgudG1wL2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy91aS9yb3V0ZXJfcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbImluaXRSb3V0ZXJMaXN0ZW5lcnMiXSwibWFwcGluZ3MiOiJBQUFBLGtDQUEyQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQ2pFLHFCQUF5QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3BELDBDQUFzQyx3REFBd0QsQ0FBQyxDQUFBO0FBQy9GLHFCQUEwRCxlQUFlLENBQUMsQ0FBQTtBQUU3RCw0QkFBb0IsR0FBRyxpQkFBVSxDQUFDO0lBQzdDLGdEQUE0QixFQUFFLG1EQUF1QjtJQUNyRCxpQkFBVSxDQUFDLElBQUksZUFBUSxDQUNuQixzQkFBZSxFQUNmLEVBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGlCQUFVLENBQUMsQ0FBQyxlQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztDQUNuRixDQUFDLENBQUM7QUFFSCw2QkFBNkIsUUFBa0I7SUFDN0NBLE1BQU1BLENBQUNBO1FBQ0xBLElBQUlBLElBQUlBLEdBQUdBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLGFBQU1BLENBQUNBLENBQUNBO1FBRWhDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxjQUFNQSxPQUFBQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxnREFBNEJBLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLEVBQWxEQSxDQUFrREEsQ0FBQ0EsQ0FBQ0E7SUFDckVBLENBQUNBLENBQUNBO0FBQ0pBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNZXNzYWdlQmFzZWRQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QnJvd3NlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vYnJvd3Nlcl9wbGF0Zm9ybV9sb2NhdGlvbic7XG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgUHJvdmlkZXIsIEluamVjdG9yLCBOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9ST1VURVIgPSBDT05TVF9FWFBSKFtcbiAgTWVzc2FnZUJhc2VkUGxhdGZvcm1Mb2NhdGlvbiwgQnJvd3NlclBsYXRmb3JtTG9jYXRpb24sXG4gIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKFxuICAgICAgQVBQX0lOSVRJQUxJWkVSLFxuICAgICAge3VzZUZhY3Rvcnk6IGluaXRSb3V0ZXJMaXN0ZW5lcnMsIG11bHRpOiB0cnVlLCBkZXBzOiBDT05TVF9FWFBSKFtJbmplY3Rvcl0pfSkpXG5dKTtcblxuZnVuY3Rpb24gaW5pdFJvdXRlckxpc3RlbmVycyhpbmplY3RvcjogSW5qZWN0b3IpOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBsZXQgem9uZSA9IGluamVjdG9yLmdldChOZ1pvbmUpO1xuXG4gICAgem9uZS5ydW4oKCkgPT4gaW5qZWN0b3IuZ2V0KE1lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb24pLnN0YXJ0KCkpO1xuICB9O1xufVxuIl19
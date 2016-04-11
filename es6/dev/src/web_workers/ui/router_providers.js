import { MessageBasedPlatformLocation } from './platform_location';
import { CONST_EXPR } from 'angular2/src/facade/lang';
import { BrowserPlatformLocation } from 'angular2/src/router/location/browser_platform_location';
import { APP_INITIALIZER, Provider, Injector, NgZone } from 'angular2/core';
export const WORKER_RENDER_ROUTER = CONST_EXPR([
    MessageBasedPlatformLocation, BrowserPlatformLocation,
    CONST_EXPR(new Provider(APP_INITIALIZER, { useFactory: initRouterListeners, multi: true, deps: CONST_EXPR([Injector]) }))
]);
function initRouterListeners(injector) {
    return () => {
        let zone = injector.get(NgZone);
        zone.run(() => injector.get(MessageBasedPlatformLocation).start());
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Byb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtVnZpcENCVVAudG1wL2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy91aS9yb3V0ZXJfcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbImluaXRSb3V0ZXJMaXN0ZW5lcnMiXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxxQkFBcUI7T0FDekQsRUFBQyxVQUFVLEVBQUMsTUFBTSwwQkFBMEI7T0FDNUMsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdEQUF3RDtPQUN2RixFQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWU7QUFFekUsYUFBYSxvQkFBb0IsR0FBRyxVQUFVLENBQUM7SUFDN0MsNEJBQTRCLEVBQUUsdUJBQXVCO0lBQ3JELFVBQVUsQ0FBQyxJQUFJLFFBQVEsQ0FDbkIsZUFBZSxFQUNmLEVBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0NBQ25GLENBQUMsQ0FBQztBQUVILDZCQUE2QixRQUFrQjtJQUM3Q0EsTUFBTUEsQ0FBQ0E7UUFDTEEsSUFBSUEsSUFBSUEsR0FBR0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFFaENBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLE1BQU1BLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLDRCQUE0QkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFDckVBLENBQUNBLENBQUNBO0FBQ0pBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNZXNzYWdlQmFzZWRQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICcuL3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QnJvd3NlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vYnJvd3Nlcl9wbGF0Zm9ybV9sb2NhdGlvbic7XG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgUHJvdmlkZXIsIEluamVjdG9yLCBOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9ST1VURVIgPSBDT05TVF9FWFBSKFtcbiAgTWVzc2FnZUJhc2VkUGxhdGZvcm1Mb2NhdGlvbiwgQnJvd3NlclBsYXRmb3JtTG9jYXRpb24sXG4gIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKFxuICAgICAgQVBQX0lOSVRJQUxJWkVSLFxuICAgICAge3VzZUZhY3Rvcnk6IGluaXRSb3V0ZXJMaXN0ZW5lcnMsIG11bHRpOiB0cnVlLCBkZXBzOiBDT05TVF9FWFBSKFtJbmplY3Rvcl0pfSkpXG5dKTtcblxuZnVuY3Rpb24gaW5pdFJvdXRlckxpc3RlbmVycyhpbmplY3RvcjogSW5qZWN0b3IpOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBsZXQgem9uZSA9IGluamVjdG9yLmdldChOZ1pvbmUpO1xuXG4gICAgem9uZS5ydW4oKCkgPT4gaW5qZWN0b3IuZ2V0KE1lc3NhZ2VCYXNlZFBsYXRmb3JtTG9jYXRpb24pLnN0YXJ0KCkpO1xuICB9O1xufVxuIl19
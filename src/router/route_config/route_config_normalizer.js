'use strict';var route_config_decorator_1 = require('./route_config_decorator');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
/**
 * Given a JS Object that represents a route config, returns a corresponding Route, AsyncRoute,
 * AuxRoute or Redirect object.
 *
 * Also wraps an AsyncRoute's loader function to add the loaded component's route config to the
 * `RouteRegistry`.
 */
function normalizeRouteConfig(config, registry) {
    if (config instanceof route_config_decorator_1.AsyncRoute) {
        var wrappedLoader = wrapLoaderToReconfigureRegistry(config.loader, registry);
        return new route_config_decorator_1.AsyncRoute({
            path: config.path,
            loader: wrappedLoader,
            name: config.name,
            data: config.data,
            useAsDefault: config.useAsDefault
        });
    }
    if (config instanceof route_config_decorator_1.Route || config instanceof route_config_decorator_1.Redirect || config instanceof route_config_decorator_1.AuxRoute) {
        return config;
    }
    if ((+!!config.component) + (+!!config.redirectTo) + (+!!config.loader) != 1) {
        throw new exceptions_1.BaseException("Route config should contain exactly one \"component\", \"loader\", or \"redirectTo\" property.");
    }
    if (config.as && config.name) {
        throw new exceptions_1.BaseException("Route config should contain exactly one \"as\" or \"name\" property.");
    }
    if (config.as) {
        config.name = config.as;
    }
    if (config.loader) {
        var wrappedLoader = wrapLoaderToReconfigureRegistry(config.loader, registry);
        return new route_config_decorator_1.AsyncRoute({
            path: config.path,
            loader: wrappedLoader,
            name: config.name,
            data: config.data,
            useAsDefault: config.useAsDefault
        });
    }
    if (config.aux) {
        return new route_config_decorator_1.AuxRoute({ path: config.aux, component: config.component, name: config.name });
    }
    if (config.component) {
        if (typeof config.component == 'object') {
            var componentDefinitionObject = config.component;
            if (componentDefinitionObject.type == 'constructor') {
                return new route_config_decorator_1.Route({
                    path: config.path,
                    component: componentDefinitionObject.constructor,
                    name: config.name,
                    data: config.data,
                    useAsDefault: config.useAsDefault
                });
            }
            else if (componentDefinitionObject.type == 'loader') {
                return new route_config_decorator_1.AsyncRoute({
                    path: config.path,
                    loader: componentDefinitionObject.loader,
                    name: config.name,
                    data: config.data,
                    useAsDefault: config.useAsDefault
                });
            }
            else {
                throw new exceptions_1.BaseException("Invalid component type \"" + componentDefinitionObject.type + "\". Valid types are \"constructor\" and \"loader\".");
            }
        }
        return new route_config_decorator_1.Route(config);
    }
    if (config.redirectTo) {
        return new route_config_decorator_1.Redirect({ path: config.path, redirectTo: config.redirectTo });
    }
    return config;
}
exports.normalizeRouteConfig = normalizeRouteConfig;
function wrapLoaderToReconfigureRegistry(loader, registry) {
    return function () {
        return loader().then(function (componentType) {
            registry.configFromComponent(componentType);
            return componentType;
        });
    };
}
function assertComponentExists(component, path) {
    if (!lang_1.isType(component)) {
        throw new exceptions_1.BaseException("Component for route \"" + path + "\" is not defined, or is not a class.");
    }
}
exports.assertComponentExists = assertComponentExists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVfY29uZmlnX25vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVYzdjBWSkZILnRtcC9hbmd1bGFyMi9zcmMvcm91dGVyL3JvdXRlX2NvbmZpZy9yb3V0ZV9jb25maWdfbm9ybWFsaXplci50cyJdLCJuYW1lcyI6WyJub3JtYWxpemVSb3V0ZUNvbmZpZyIsIndyYXBMb2FkZXJUb1JlY29uZmlndXJlUmVnaXN0cnkiLCJhc3NlcnRDb21wb25lbnRFeGlzdHMiXSwibWFwcGluZ3MiOiJBQUFBLHVDQUFxRSwwQkFBMEIsQ0FBQyxDQUFBO0FBRWhHLHFCQUEyQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3RELDJCQUE4QyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBSS9FOzs7Ozs7R0FNRztBQUNILDhCQUNJLE1BQXVCLEVBQUUsUUFBdUI7SUFDbERBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLFlBQVlBLG1DQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQ0EsSUFBSUEsYUFBYUEsR0FBR0EsK0JBQStCQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUM3RUEsTUFBTUEsQ0FBQ0EsSUFBSUEsbUNBQVVBLENBQUNBO1lBQ3BCQSxJQUFJQSxFQUFFQSxNQUFNQSxDQUFDQSxJQUFJQTtZQUNqQkEsTUFBTUEsRUFBRUEsYUFBYUE7WUFDckJBLElBQUlBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBO1lBQ2pCQSxJQUFJQSxFQUFFQSxNQUFNQSxDQUFDQSxJQUFJQTtZQUNqQkEsWUFBWUEsRUFBRUEsTUFBTUEsQ0FBQ0EsWUFBWUE7U0FDbENBLENBQUNBLENBQUNBO0lBQ0xBLENBQUNBO0lBQ0RBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLFlBQVlBLDhCQUFLQSxJQUFJQSxNQUFNQSxZQUFZQSxpQ0FBUUEsSUFBSUEsTUFBTUEsWUFBWUEsaUNBQVFB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Q0FBQ0EsbUJBQW1CQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtZQUM1Q0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7UUFDdkJBLENBQUNBLENBQUNBLENBQUNBO0lBQ0xBLENBQUNBLENBQUNBO0FBQ0pBLENBQUNBO0FBRUQsK0JBQXNDLFNBQWUsRUFBRSxJQUFZO0lBQ2pFQyxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxhQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN2QkEsTUFBTUEsSUFBSUEsMEJBQWFBLENBQUNBLDJCQUF3QkEsSUFBSUEsMENBQXNDQSxDQUFDQSxDQUFDQTtJQUM5RkEsQ0FBQ0E7QUFDSEEsQ0FBQ0E7QUFKZSw2QkFBcUIsd0JBSXBDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FzeW5jUm91dGUsIEF1eFJvdXRlLCBSb3V0ZSwgUmVkaXJlY3QsIFJvdXRlRGVmaW5pdGlvbn0gZnJvbSAnLi9yb3V0ZV9jb25maWdfZGVjb3JhdG9yJztcbmltcG9ydCB7Q29tcG9uZW50RGVmaW5pdGlvbn0gZnJvbSAnLi4vcm91dGVfZGVmaW5pdGlvbic7XG5pbXBvcnQge2lzVHlwZSwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7Um91dGVSZWdpc3RyeX0gZnJvbSAnLi4vcm91dGVfcmVnaXN0cnknO1xuXG5cbi8qKlxuICogR2l2ZW4gYSBKUyBPYmplY3QgdGhhdCByZXByZXNlbnRzIGEgcm91dGUgY29uZmlnLCByZXR1cm5zIGEgY29ycmVzcG9uZGluZyBSb3V0ZSwgQXN5bmNSb3V0ZSxcbiAqIEF1eFJvdXRlIG9yIFJlZGlyZWN0IG9iamVjdC5cbiAqXG4gKiBBbHNvIHdyYXBzIGFuIEFzeW5jUm91dGUncyBsb2FkZXIgZnVuY3Rpb24gdG8gYWRkIHRoZSBsb2FkZWQgY29tcG9uZW50J3Mgcm91dGUgY29uZmlnIHRvIHRoZVxuICogYFJvdXRlUmVnaXN0cnlgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUm91dGVDb25maWcoXG4gICAgY29uZmlnOiBSb3V0ZURlZmluaXRpb24sIHJlZ2lzdHJ5OiBSb3V0ZVJlZ2lzdHJ5KTogUm91dGVEZWZpbml0aW9uIHtcbiAgaWYgKGNvbmZpZyBpbnN0YW5jZW9mIEFzeW5jUm91dGUpIHtcbiAgICB2YXIgd3JhcHBlZExvYWRlciA9IHdyYXBMb2FkZXJUb1JlY29uZmlndXJlUmVnaXN0cnkoY29uZmlnLmxvYWRlciwgcmVnaXN0cnkpO1xuICAgIHJldHVybiBuZXcgQXN5bmNSb3V0ZSh7XG4gICAgICBwYXRoOiBjb25maWcucGF0aCxcbiAgICAgIGxvYWRlcjogd3JhcHBlZExvYWRlcixcbiAgICAgIG5hbWU6IGNvbmZpZy5uYW1lLFxuICAgICAgZGF0YTogY29uZmlnLmRhdGEsXG4gICAgICB1c2VBc0RlZmF1bHQ6IGNvbmZpZy51c2VBc0RlZmF1bHRcbiAgICB9KTtcbiAgfVxuICBpZiAoY29uZmlnIGluc3RhbmNlb2YgUm91dGUgfHwgY29uZmlnIGluc3RhbmNlb2YgUmVkaXJlY3QgfHwgY29uZmlnIGluc3RhbmNlb2YgQXV4Um91dGUpIHtcbiAgICByZXR1cm4gPFJvdXRlRGVmaW5pdGlvbj5jb25maWc7XG4gIH1cblxuICBpZiAoKCshIWNvbmZpZy5jb21wb25lbnQpICsgKCshIWNvbmZpZy5yZWRpcmVjdFRvKSArICgrISFjb25maWcubG9hZGVyKSAhPSAxKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgIGBSb3V0ZSBjb25maWcgc2hvdWxkIGNvbnRhaW4gZXhhY3RseSBvbmUgXCJjb21wb25lbnRcIiwgXCJsb2FkZXJcIiwgb3IgXCJyZWRpcmVjdFRvXCIgcHJvcGVydHkuYCk7XG4gIH1cbiAgaWYgKGNvbmZpZy5hcyAmJiBjb25maWcubmFtZSkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBSb3V0ZSBjb25maWcgc2hvdWxkIGNvbnRhaW4gZXhhY3RseSBvbmUgXCJhc1wiIG9yIFwibmFtZVwiIHByb3BlcnR5LmApO1xuICB9XG4gIGlmIChjb25maWcuYXMpIHtcbiAgICBjb25maWcubmFtZSA9IGNvbmZpZy5hcztcbiAgfVxuICBpZiAoY29uZmlnLmxvYWRlcikge1xuICAgIHZhciB3cmFwcGVkTG9hZGVyID0gd3JhcExvYWRlclRvUmVjb25maWd1cmVSZWdpc3RyeShjb25maWcubG9hZGVyLCByZWdpc3RyeSk7XG4gICAgcmV0dXJuIG5ldyBBc3luY1JvdXRlKHtcbiAgICAgIHBhdGg6IGNvbmZpZy5wYXRoLFxuICAgICAgbG9hZGVyOiB3cmFwcGVkTG9hZGVyLFxuICAgICAgbmFtZTogY29uZmlnLm5hbWUsXG4gICAgICBkYXRhOiBjb25maWcuZGF0YSxcbiAgICAgIHVzZUFzRGVmYXVsdDogY29uZmlnLnVzZUFzRGVmYXVsdFxuICAgIH0pO1xuICB9XG4gIGlmIChjb25maWcuYXV4KSB7XG4gICAgcmV0dXJuIG5ldyBBdXhSb3V0ZSh7cGF0aDogY29uZmlnLmF1eCwgY29tcG9uZW50OiA8VHlwZT5jb25maWcuY29tcG9uZW50LCBuYW1lOiBjb25maWcubmFtZX0pO1xuICB9XG4gIGlmIChjb25maWcuY29tcG9uZW50KSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcuY29tcG9uZW50ID09ICdvYmplY3QnKSB7XG4gICAgICBsZXQgY29tcG9uZW50RGVmaW5pdGlvbk9iamVjdCA9IDxDb21wb25lbnREZWZpbml0aW9uPmNvbmZpZy5jb21wb25lbnQ7XG4gICAgICBpZiAoY29tcG9uZW50RGVmaW5pdGlvbk9iamVjdC50eXBlID09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSb3V0ZSh7XG4gICAgICAgICAgcGF0aDogY29uZmlnLnBhdGgsXG4gICAgICAgICAgY29tcG9uZW50OiA8VHlwZT5jb21wb25lbnREZWZpbml0aW9uT2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICAgIG5hbWU6IGNvbmZpZy5uYW1lLFxuICAgICAgICAgIGRhdGE6IGNvbmZpZy5kYXRhLFxuICAgICAgICAgIHVzZUFzRGVmYXVsdDogY29uZmlnLnVzZUFzRGVmYXVsdFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoY29tcG9uZW50RGVmaW5pdGlvbk9iamVjdC50eXBlID09ICdsb2FkZXInKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXN5bmNSb3V0ZSh7XG4gICAgICAgICAgcGF0aDogY29uZmlnLnBhdGgsXG4gICAgICAgICAgbG9hZGVyOiBjb21wb25lbnREZWZpbml0aW9uT2JqZWN0LmxvYWRlcixcbiAgICAgICAgICBuYW1lOiBjb25maWcubmFtZSxcbiAgICAgICAgICBkYXRhOiBjb25maWcuZGF0YSxcbiAgICAgICAgICB1c2VBc0RlZmF1bHQ6IGNvbmZpZy51c2VBc0RlZmF1bHRcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBJbnZhbGlkIGNvbXBvbmVudCB0eXBlIFwiJHtjb21wb25lbnREZWZpbml0aW9uT2JqZWN0LnR5cGV9XCIuIFZhbGlkIHR5cGVzIGFyZSBcImNvbnN0cnVjdG9yXCIgYW5kIFwibG9hZGVyXCIuYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgUm91dGUoPHtcbiAgICAgIHBhdGg6IHN0cmluZztcbiAgICAgIGNvbXBvbmVudDogVHlwZTtcbiAgICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgICBkYXRhPzoge1trZXk6IHN0cmluZ106IGFueX07XG4gICAgICB1c2VBc0RlZmF1bHQ/OiBib29sZWFuO1xuICAgIH0+Y29uZmlnKTtcbiAgfVxuXG4gIGlmIChjb25maWcucmVkaXJlY3RUbykge1xuICAgIHJldHVybiBuZXcgUmVkaXJlY3Qoe3BhdGg6IGNvbmZpZy5wYXRoLCByZWRpcmVjdFRvOiBjb25maWcucmVkaXJlY3RUb30pO1xuICB9XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuXG5mdW5jdGlvbiB3cmFwTG9hZGVyVG9SZWNvbmZpZ3VyZVJlZ2lzdHJ5KGxvYWRlcjogRnVuY3Rpb24sIHJlZ2lzdHJ5OiBSb3V0ZVJlZ2lzdHJ5KTogKCkgPT5cbiAgICBQcm9taXNlPFR5cGU+IHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICByZXR1cm4gbG9hZGVyKCkudGhlbigoY29tcG9uZW50VHlwZSkgPT4ge1xuICAgICAgcmVnaXN0cnkuY29uZmlnRnJvbUNvbXBvbmVudChjb21wb25lbnRUeXBlKTtcbiAgICAgIHJldHVybiBjb21wb25lbnRUeXBlO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Q29tcG9uZW50RXhpc3RzKGNvbXBvbmVudDogVHlwZSwgcGF0aDogc3RyaW5nKTogdm9pZCB7XG4gIGlmICghaXNUeXBlKGNvbXBvbmVudCkpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgQ29tcG9uZW50IGZvciByb3V0ZSBcIiR7cGF0aH1cIiBpcyBub3QgZGVmaW5lZCwgb3IgaXMgbm90IGEgY2xhc3MuYCk7XG4gIH1cbn1cbiJdfQ==
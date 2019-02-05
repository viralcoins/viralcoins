"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var http_1 = require("nativescript-angular/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_component_1 = require("./components/login/login.component");
var main_module_1 = require("./main/main.module");
var admin_module_1 = require("./admin/admin.module");
var more_module_1 = require("./more/more.module");
var shared_module_1 = require("./shared/shared.module");
// Uncomment and add to NgModule imports if you need to use two-way binding
var forms_1 = require("nativescript-angular/forms");
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
var http_client_1 = require("nativescript-angular/http-client");
var help_component_1 = require("./components/help/help.component");
var coin_service_1 = require("./services/coin.service");
var user_service_1 = require("./services/user.service");
var cache_service_1 = require("./services/cache.service");
var loading_service_1 = require("./services/loading.service");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_module_1.AppRoutingModule,
                http_client_1.NativeScriptHttpClientModule,
                http_1.NativeScriptHttpModule,
                forms_1.NativeScriptFormsModule,
                main_module_1.MainModule,
                admin_module_1.AdminModule,
                more_module_1.MoreModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                help_component_1.HelpComponent,
            ],
            exports: [
                help_component_1.HelpComponent,
            ],
            entryComponents: [
                help_component_1.HelpComponent,
            ],
            providers: [
                coin_service_1.CoinService,
                user_service_1.UserService,
                cache_service_1.CacheService,
                loading_service_1.LoadingService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLGtEQUFtRTtBQUNuRSwyREFBd0Q7QUFDeEQsaURBQStDO0FBQy9DLHNFQUFvRTtBQUNwRSxrREFBZ0Q7QUFDaEQscURBQW1EO0FBQ25ELGtEQUFnRDtBQUNoRCx3REFBc0Q7QUFFdEQsMkVBQTJFO0FBQzNFLG9EQUFxRTtBQUVyRSxrRkFBa0Y7QUFDbEYsZ0VBQWdGO0FBQ2hGLG1FQUFpRTtBQUNqRSx3REFBc0Q7QUFDdEQsd0RBQXNEO0FBQ3RELDBEQUF3RDtBQUN4RCw4REFBNEQ7QUFDNUQsMEVBQXdFO0FBQ3hFLGtDQUFlLENBQUMsZUFBZSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxhQUFhLEVBQW5ELENBQW1ELENBQUMsQ0FBQztBQXlDNUY7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBdkNyQixlQUFRLENBQUM7WUFDUixTQUFTLEVBQUU7Z0JBQ1QsNEJBQVk7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDUCx3Q0FBa0I7Z0JBQ2xCLHFDQUFnQjtnQkFDaEIsMENBQTRCO2dCQUM1Qiw2QkFBc0I7Z0JBQ3RCLCtCQUF1QjtnQkFDdkIsd0JBQVU7Z0JBQ1YsMEJBQVc7Z0JBQ1gsd0JBQVU7Z0JBQ1YsNEJBQVk7YUFDYjtZQUNELFlBQVksRUFBRTtnQkFDWiw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCw4QkFBYTthQUNkO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLDhCQUFhO2FBQ2Q7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsOEJBQWE7YUFDZDtZQUNELFNBQVMsRUFBRTtnQkFDVCwwQkFBVztnQkFDWCwwQkFBVztnQkFDWCw0QkFBWTtnQkFDWixnQ0FBYzthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHVCQUFnQjthQUNqQjtTQUNGLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1haW5Nb2R1bGUgfSBmcm9tIFwiLi9tYWluL21haW4ubW9kdWxlXCI7XG5pbXBvcnQgeyBBZG1pbk1vZHVsZSB9IGZyb20gXCIuL2FkbWluL2FkbWluLm1vZHVsZVwiO1xuaW1wb3J0IHsgTW9yZU1vZHVsZSB9IGZyb20gXCIuL21vcmUvbW9yZS5tb2R1bGVcIjtcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuXG4vLyBVbmNvbW1lbnQgYW5kIGFkZCB0byBOZ01vZHVsZSBpbXBvcnRzIGlmIHlvdSBuZWVkIHRvIHVzZSB0d28td2F5IGJpbmRpbmdcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5cbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgaWYgeW91IG5lZWQgdG8gdXNlIHRoZSBIdHRwQ2xpZW50IHdyYXBwZXJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcbmltcG9ydCB7IEhlbHBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaGVscC9oZWxwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2luU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29pbi5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IExvYWRpbmdTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9sb2FkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcbnJlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xuXG5ATmdNb2R1bGUoe1xuICBib290c3RyYXA6IFtcbiAgICBBcHBDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBNYWluTW9kdWxlLFxuICAgIEFkbWluTW9kdWxlLFxuICAgIE1vcmVNb2R1bGUsXG4gICAgU2hhcmVkTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICBMb2dpbkNvbXBvbmVudCxcbiAgICBIZWxwQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgSGVscENvbXBvbmVudCxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgSGVscENvbXBvbmVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ29pblNlcnZpY2UsXG4gICAgVXNlclNlcnZpY2UsXG4gICAgQ2FjaGVTZXJ2aWNlLFxuICAgIExvYWRpbmdTZXJ2aWNlXG4gIF0sXG4gIHNjaGVtYXM6IFtcbiAgICBOT19FUlJPUlNfU0NIRU1BXG4gIF1cbn0pXG4vKlxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxuKi9cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=
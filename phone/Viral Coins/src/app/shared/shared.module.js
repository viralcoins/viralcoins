"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var header_component_1 = require("../widgets/header/header.component");
var loading_component_1 = require("../widgets/loading/loading.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                header_component_1.HeaderComponent,
                loading_component_1.LoadingComponent
            ],
            exports: [
                header_component_1.HeaderComponent,
                loading_component_1.LoadingComponent
            ],
            imports: [
                common_1.NativeScriptCommonModule
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLHVFQUFxRTtBQUNyRSwwRUFBd0U7QUFnQnhFO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixZQUFZO1FBZHhCLGVBQVEsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDYixrQ0FBZTtnQkFDZixvQ0FBZ0I7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1Isa0NBQWU7Z0JBQ2Qsb0NBQWdCO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGlDQUF3QjthQUN6QjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxZQUFZLENBQUk7SUFBRCxtQkFBQztDQUFBLEFBQTdCLElBQTZCO0FBQWhCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuLi93aWRnZXRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IExvYWRpbmdDb21wb25lbnQgfSBmcm9tICcuLi93aWRnZXRzL2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgXHRIZWFkZXJDb21wb25lbnQsXG4gIFx0TG9hZGluZ0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gIFx0SGVhZGVyQ29tcG9uZW50LFxuICAgIExvYWRpbmdDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZVxuICBdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVkTW9kdWxlIHsgfVxuIl19
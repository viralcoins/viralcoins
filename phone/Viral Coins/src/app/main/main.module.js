"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var main_routing_module_1 = require("./main-routing.module");
var common_1 = require("nativescript-angular/common");
var main_component_1 = require("./main.component");
var home_component_1 = require("./home/home.component");
var wallet_component_1 = require("./wallet/wallet.component");
var find_component_1 = require("./find/find.component");
var detail_modal_component_1 = require("./detail-modal/detail-modal.component");
var bottom_navigation_component_1 = require("./bottom-navigation/bottom-navigation.component");
var send_message_component_1 = require("./send-message/send-message.component");
var angular_1 = require("nativescript-ui-listview/angular");
var more_component_1 = require("./more/more.component");
var redeem_component_1 = require("./redeem/redeem.component");
var shared_module_1 = require("../shared/shared.module");
var angular_2 = require("nativescript-stripe/angular");
var MainModule = /** @class */ (function () {
    function MainModule() {
    }
    MainModule = __decorate([
        core_1.NgModule({
            declarations: [
                main_component_1.MainComponent,
                home_component_1.HomeComponent,
                wallet_component_1.WalletComponent,
                find_component_1.FindComponent,
                detail_modal_component_1.DetailModalComponent,
                bottom_navigation_component_1.BottomNavigationComponent,
                send_message_component_1.SendMessageComponent,
                more_component_1.MoreComponent,
                redeem_component_1.RedeemComponent
            ],
            imports: [
                main_routing_module_1.MainRoutingModule,
                common_1.NativeScriptCommonModule,
                forms_1.NativeScriptFormsModule,
                angular_1.NativeScriptUIListViewModule,
                shared_module_1.SharedModule,
                angular_2.CreditCardViewModule
            ],
            entryComponents: [
                detail_modal_component_1.DetailModalComponent,
                send_message_component_1.SendMessageComponent,
                redeem_component_1.RedeemComponent
            ],
            providers: [],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], MainModule);
    return MainModule;
}());
exports.MainModule = MainModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWluLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxvREFBcUU7QUFDckUsNkRBQTBEO0FBQzFELHNEQUF1RTtBQUN2RSxtREFBaUQ7QUFDakQsd0RBQXNEO0FBQ3RELDhEQUE0RDtBQUM1RCx3REFBc0Q7QUFDdEQsZ0ZBQTZFO0FBQzdFLCtGQUE0RjtBQUM1RixnRkFBNkU7QUFDN0UsNERBQWdGO0FBQ2hGLHdEQUFzRDtBQUN0RCw4REFBNEQ7QUFDNUQseURBQXVEO0FBQ3ZELHVEQUFtRTtBQStCbkU7SUFBQTtJQUEwQixDQUFDO0lBQWQsVUFBVTtRQTdCdEIsZUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNaLDhCQUFhO2dCQUNiLDhCQUFhO2dCQUNiLGtDQUFlO2dCQUNmLDhCQUFhO2dCQUNiLDZDQUFvQjtnQkFDcEIsdURBQXlCO2dCQUN6Qiw2Q0FBb0I7Z0JBQ3BCLDhCQUFhO2dCQUNiLGtDQUFlO2FBQ2hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHVDQUFpQjtnQkFDakIsaUNBQXdCO2dCQUN4QiwrQkFBdUI7Z0JBQ3ZCLHNDQUE0QjtnQkFDNUIsNEJBQVk7Z0JBQ1osOEJBQW9CO2FBQ3JCO1lBQ0QsZUFBZSxFQUFFO2dCQUNmLDZDQUFvQjtnQkFDcEIsNkNBQW9CO2dCQUNwQixrQ0FBZTthQUNoQjtZQUNELFNBQVMsRUFBRSxFQUNWO1lBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDNUIsQ0FBQztPQUNXLFVBQVUsQ0FBSTtJQUFELGlCQUFDO0NBQUEsQUFBM0IsSUFBMkI7QUFBZCxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgTWFpblJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL21haW4tcm91dGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1haW5Db21wb25lbnQgfSBmcm9tICcuL21haW4uY29tcG9uZW50JztcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tICcuL2hvbWUvaG9tZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2FsbGV0Q29tcG9uZW50IH0gZnJvbSAnLi93YWxsZXQvd2FsbGV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaW5kQ29tcG9uZW50IH0gZnJvbSAnLi9maW5kL2ZpbmQuY29tcG9uZW50JztcbmltcG9ydCB7IERldGFpbE1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vZGV0YWlsLW1vZGFsL2RldGFpbC1tb2RhbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEJvdHRvbU5hdmlnYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2JvdHRvbS1uYXZpZ2F0aW9uL2JvdHRvbS1uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZW5kTWVzc2FnZUNvbXBvbmVudCB9IGZyb20gJy4vc2VuZC1tZXNzYWdlL3NlbmQtbWVzc2FnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcvYW5ndWxhclwiO1xuaW1wb3J0IHsgTW9yZUNvbXBvbmVudCB9IGZyb20gJy4vbW9yZS9tb3JlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWRlZW1Db21wb25lbnQgfSBmcm9tICcuL3JlZGVlbS9yZWRlZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IENyZWRpdENhcmRWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zdHJpcGUvYW5ndWxhclwiO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYWluQ29tcG9uZW50LFxuICAgIEhvbWVDb21wb25lbnQsXG4gICAgV2FsbGV0Q29tcG9uZW50LFxuICAgIEZpbmRDb21wb25lbnQsXG4gICAgRGV0YWlsTW9kYWxDb21wb25lbnQsXG4gICAgQm90dG9tTmF2aWdhdGlvbkNvbXBvbmVudCxcbiAgICBTZW5kTWVzc2FnZUNvbXBvbmVudCxcbiAgICBNb3JlQ29tcG9uZW50LFxuICAgIFJlZGVlbUNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgTWFpblJvdXRpbmdNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXG4gICAgU2hhcmVkTW9kdWxlLFxuICAgIENyZWRpdENhcmRWaWV3TW9kdWxlXG4gIF0sICBcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgRGV0YWlsTW9kYWxDb21wb25lbnQsXG4gICAgU2VuZE1lc3NhZ2VDb21wb25lbnQsXG4gICAgUmVkZWVtQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICBdLCAgXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBNYWluTW9kdWxlIHsgfVxuIl19
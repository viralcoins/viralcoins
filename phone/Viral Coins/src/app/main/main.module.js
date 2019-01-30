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

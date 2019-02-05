"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var MessageDetailComponent = /** @class */ (function () {
    function MessageDetailComponent(params) {
        this.params = params;
        this.message = params.context;
    }
    MessageDetailComponent.prototype.ngOnInit = function () {
    };
    MessageDetailComponent.prototype.onClose = function () {
        this.params.closeCallback();
    };
    MessageDetailComponent = __decorate([
        core_1.Component({
            selector: 'ns-message-detail',
            templateUrl: './message-detail.component.html',
            styleUrls: ['./message-detail.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams])
    ], MessageDetailComponent);
    return MessageDetailComponent;
}());
exports.MessageDetailComponent = MessageDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVzc2FnZS1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGtFQUFzRTtBQVF0RTtJQUlFLGdDQUNVLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBRWpDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNoQyxDQUFDO0lBRUQseUNBQVEsR0FBUjtJQUNBLENBQUM7SUFFTSx3Q0FBTyxHQUFkO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBZlUsc0JBQXNCO1FBTmxDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7WUFDN0MsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBTWtCLGdDQUFpQjtPQUx4QixzQkFBc0IsQ0FpQmxDO0lBQUQsNkJBQUM7Q0FBQSxBQWpCRCxJQWlCQztBQWpCWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2cnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1tZXNzYWdlLWRldGFpbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZXNzYWdlLWRldGFpbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2UtZGV0YWlsLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZURldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgbWVzc2FnZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXNcbiAgKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gcGFyYW1zLmNvbnRleHQ7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHB1YmxpYyBvbkNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcbiAgfSAgXG5cbn1cbiJdfQ==
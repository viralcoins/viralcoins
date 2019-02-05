"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var LoadingService = /** @class */ (function () {
    function LoadingService() {
        this.isLoadingSubject = new rxjs_1.BehaviorSubject(false);
        this.isLoading = this.isLoadingSubject.asObservable();
    }
    LoadingService.prototype.setLoading = function (loading) {
        this.isLoadingSubject.next(loading);
    };
    LoadingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], LoadingService);
    return LoadingService;
}());
exports.LoadingService = LoadingService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9hZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZCQUFtRDtBQUduRDtJQUtFO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksc0JBQWUsQ0FBTSxLQUFLLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRU0sbUNBQVUsR0FBakIsVUFBa0IsT0FBWTtRQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFaVSxjQUFjO1FBRDFCLGlCQUFVLEVBQUU7O09BQ0EsY0FBYyxDQWMxQjtJQUFELHFCQUFDO0NBQUEsQUFkRCxJQWNDO0FBZFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gXCJyeGpzXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2FkaW5nU2VydmljZSB7XG5cbiAgcHVibGljIGlzTG9hZGluZ1N1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBwdWJsaWMgaXNMb2FkaW5nOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pc0xvYWRpbmdTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KGZhbHNlKTtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRoaXMuaXNMb2FkaW5nU3ViamVjdC5hc09ic2VydmFibGUoKTsgICAgXG4gIH1cblxuICBwdWJsaWMgc2V0TG9hZGluZyhsb2FkaW5nOiBhbnkpIHtcbiAgICB0aGlzLmlzTG9hZGluZ1N1YmplY3QubmV4dChsb2FkaW5nKTtcbiAgfVxuXG59Il19
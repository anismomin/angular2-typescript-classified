var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var progressConfig = {
    animate: true,
    max: 100
};
// todo: progress element conflict with bootstrap.css
// todo: need hack: replace host element with div
var Progress = (function () {
    function Progress() {
        this.addClass = 'progress';
        this.bars = [];
    }
    Object.defineProperty(Progress.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (v) {
            this._max = v;
            this.bars.forEach(function (bar) {
                bar.recalculatePercentage();
            });
        },
        enumerable: true,
        configurable: true
    });
    Progress.prototype.ngOnInit = function () {
        this.animate = this.animate !== false;
        this.max = typeof this.max === 'number' ? this.max : progressConfig.max;
    };
    Progress.prototype.addBar = function (bar) {
        if (!this.animate) {
            bar.transition = 'none';
        }
        this.bars.push(bar);
    };
    Progress.prototype.removeBar = function (bar) {
        this.bars.splice(this.bars.indexOf(bar), 1);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Progress.prototype, "animate", void 0);
    __decorate([
        core_1.HostBinding('attr.max'),
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Progress.prototype, "max", null);
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], Progress.prototype, "addClass", void 0);
    Progress = __decorate([
        core_1.Directive({ selector: 'bs-progress, [progress]' }), 
        __metadata('design:paramtypes', [])
    ], Progress);
    return Progress;
})();
exports.Progress = Progress;
// todo: number pipe
// todo: use query from progress?
var Bar = (function () {
    function Bar(progress) {
        this.progress = progress;
        this.percent = 0;
    }
    Object.defineProperty(Bar.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (!v && v !== 0) {
                return;
            }
            this._value = v;
            this.recalculatePercentage();
        },
        enumerable: true,
        configurable: true
    });
    Bar.prototype.ngOnInit = function () {
        this.progress.addBar(this);
    };
    Bar.prototype.ngOnDestroy = function () {
        this.progress.removeBar(this);
    };
    Bar.prototype.recalculatePercentage = function () {
        this.percent = +(100 * this.value / this.progress.max).toFixed(2);
        var totalPercentage = this.progress.bars.reduce(function (total, bar) {
            return total + bar.percent;
        }, 0);
        if (totalPercentage > 100) {
            this.percent -= totalPercentage - 100;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Bar.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Bar.prototype, "value", null);
    Bar = __decorate([
        core_1.Component({
            selector: 'bar, [bar]',
            directives: [common_1.NgClass, common_1.NgStyle],
            template: "\n  <div class=\"progress-bar\"\n    style=\"min-width: 0;\"\n    role=\"progressbar\"\n    [ngClass]=\"type && 'progress-bar-' + type\"\n    [ngStyle]=\"{width: (percent < 100 ? percent : 100) + '%', transition: transition}\"\n    aria-valuemin=\"0\"\n    [attr.aria-valuenow]=\"value\"\n    [attr.aria-valuetext]=\"percent.toFixed(0) + '%'\"\n    [attr.aria-valuemax]=\"max\"\n    ><ng-content></ng-content></div>\n"
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [Progress])
    ], Bar);
    return Bar;
})();
exports.Bar = Bar;
var Progressbar = (function () {
    function Progressbar() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Progressbar.prototype, "animate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Progressbar.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Progressbar.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Progressbar.prototype, "value", void 0);
    Progressbar = __decorate([
        core_1.Component({
            selector: 'progressbar, [progressbar]',
            directives: [Progress, Bar],
            template: "\n    <div progress [animate]=\"animate\" [max]=\"max\">\n      <bar [type]=\"type\" [value]=\"value\">\n          <ng-content></ng-content>\n      </bar>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Progressbar);
    return Progressbar;
})();
exports.Progressbar = Progressbar;
exports.PROGRESSBAR_DIRECTIVES = [Progress, Bar, Progressbar];
/**
 * @deprecated use PROGRESSBAR_DIRECTIVES instead
 * @type {Progress|Bar|Progressbar[]}
 */
exports.progressbar = [Progress, Bar, Progressbar];
//# sourceMappingURL=progressbar.js.map
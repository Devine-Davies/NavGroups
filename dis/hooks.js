"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hooks = (function () {
    function Hooks() {
        this.hook_sets = [
            'custom',
        ];
        this.hooks = {
            'custom': {},
        };
    }
    Hooks.prototype.set = function (hook_info) {
        if (hook_info === void 0) { hook_info = null; }
        if (typeof hook_info === 'object') {
            if (hook_info.hasOwnProperty('hook_name') && hook_info.hasOwnProperty('method')) {
                if (hook_info.hook_name != '' && (typeof hook_info.method == 'function')) {
                    var hook_set_and_name = this.get_hook_set_from_name(hook_info.hook_name);
                    this.initiate_hook(hook_set_and_name.set, hook_set_and_name.name, hook_info);
                }
            }
        }
    };
    Hooks.prototype.call = function (hook_name, args) {
        if (hook_name === void 0) { hook_name = null; }
        if (args === void 0) { args = null; }
        if (hook_name) {
            var hook_data = this.get_hook_set_from_name(hook_name);
            if (this.hooks[hook_data.set].hasOwnProperty(hook_data.name)) {
                if (args) {
                    this.hooks[hook_data.set][hook_data.name].method(args);
                }
                else {
                    this.hooks[hook_data.set][hook_data.name].method();
                }
            }
        }
    };
    Hooks.prototype.get_hook_set_from_name = function (hook_name) {
        if (hook_name === void 0) { hook_name = null; }
        var hook_set = this.hook_sets[0];
        var potential_sets = {
            'custom': hook_name.includes('hook'),
            'd-hook': hook_name.includes('d-hook'),
            'c-hook': hook_name.includes('c-hook'),
            'cwc-hook': hook_name.includes('cwc-hook'),
        };
        for (var _i = 0, _a = this.hook_sets; _i < _a.length; _i++) {
            var set = _a[_i];
            if (hook_name.includes(set)) {
                hook_set = set;
            }
        }
        return {
            set: hook_set,
            name: hook_name.replace(hook_set + ':', '')
        };
    };
    Hooks.prototype.initiate_hook = function (hook_set, hook_name, hook_info) {
        if (hook_set === void 0) { hook_set = null; }
        if (hook_name === void 0) { hook_name = null; }
        if (hook_info === void 0) { hook_info = null; }
        this.hooks[hook_set][hook_name] = {
            'hook_name': hook_info.hook_name,
            'method': hook_info.method
        };
    };
    return Hooks;
}());
exports.Hooks = Hooks;
//# sourceMappingURL=hooks.js.map
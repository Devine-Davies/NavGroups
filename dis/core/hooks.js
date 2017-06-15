"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hooks = (function () {
    function Hooks() {
        this.hooks = {
            'custom': {},
            'd-hook': {},
            'c-hook': {},
            'cwc-hook': {}
        };
    }
    Hooks.prototype.set = function (name, cb) {
        if (name === void 0) { name = null; }
        if (cb === void 0) { cb = null; }
        if (name && cb) {
            if (name != '' && (typeof cb == 'function')) {
                var hook_set_and_name = this.get_hook_set_from_name(name);
                this.initiate(hook_set_and_name.set, hook_set_and_name.name, cb);
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
                    this.hooks[hook_data.set][hook_data.name](args);
                }
                else {
                    this.hooks[hook_data.set][hook_data.name]();
                }
            }
        }
    };
    Hooks.prototype.get_hook_set_from_name = function (hook_name) {
        if (hook_name === void 0) { hook_name = null; }
        var sets = this.get_all_sets();
        var set = sets[0];
        for (var _i = 0, sets_1 = sets; _i < sets_1.length; _i++) {
            var potential_sets = sets_1[_i];
            set = (hook_name.includes(set)) ? potential_sets : set;
        }
        return {
            set: set, name: hook_name.replace(set + ':', '')
        };
    };
    Hooks.prototype.initiate = function (set, name, cb) {
        if (set === void 0) { set = null; }
        if (name === void 0) { name = null; }
        if (cb === void 0) { cb = null; }
        this.hooks[set][name] = cb;
    };
    Hooks.prototype.get_all_sets = function () {
        var sets = [];
        for (var set in this.hooks)
            sets.push(set);
        return sets;
    };
    return Hooks;
}());
exports.Hooks = Hooks;
//# sourceMappingURL=hooks.js.map
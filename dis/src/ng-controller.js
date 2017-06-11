"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ng_hooks_1 = require("./ng-hooks");
var _NgController = (function (_super) {
    __extends(_NgController, _super);
    function _NgController() {
        var _this = _super.call(this) || this;
        _this.navgroups_indexing = [];
        _this.navgroups = {};
        _this.active_navgroup = null;
        _this.active_navitem = null;
        _this.history_stack = {
            'navgroups': [], 'navitems': []
        };
        _this.default_actions = {
            'vertical': {
                'onUp': 'ni:prev',
                'onRight': 'ng:next',
                'onDown': 'ni:next',
                'onLeft': 'ng:prev'
            },
            'horizontal': {
                'onUp': 'ng:prev',
                'onRight': 'ni:next',
                'onDown': 'ng:next',
                'onLeft': 'ni:prev'
            }
        };
        _this.keys = {
            8: function () { _this.key_invoked('onBack'); },
            27: function () { _this.key_invoked('onBack'); },
            13: function () { _this.key_invoked('onEnter'); },
            32: function () { _this.key_invoked('onEnter'); },
            87: function () { _this.key_invoked('onUp'); },
            38: function () { _this.key_invoked('onUp'); },
            83: function () { _this.key_invoked('onDown'); },
            40: function () { _this.key_invoked('onDown'); },
            65: function () { _this.key_invoked('onLeft'); },
            37: function () { _this.key_invoked('onLeft'); },
            68: function () { _this.key_invoked('onRight'); },
            39: function () { _this.key_invoked('onRight'); },
        };
        _this.add_window_key_events();
        return _this;
    }
    _NgController.prototype.add_new_nav_group = function (NavGroupComp) {
        if (NavGroupComp === void 0) { NavGroupComp = null; }
        this.navgroups[NavGroupComp.get_name()] = {
            'obj': NavGroupComp,
            'items': {},
            'item_indexing': [],
            'selected_item': null,
        };
        this.navgroups_indexing.push(NavGroupComp.get_name());
    };
    _NgController.prototype.append_new_nav_item = function (group_name, NavItemComp) {
        if (group_name === void 0) { group_name = null; }
        if (NavItemComp === void 0) { NavItemComp = null; }
        var nav_group = this.navgroups[group_name];
        var item_name = NavItemComp.get_name();
        if (NavItemComp.is_entry_point()) {
            this.navgroups[group_name]['item_entry_point'] = item_name;
        }
        this.navgroups[group_name]['items'][item_name] = {
            'name': item_name,
            'obj': NavItemComp
        };
        this.navgroups[group_name]['item_indexing'].push(item_name);
        if (NavItemComp.props.startingPoint) {
            this.move_to_new_nav_group(group_name, item_name);
        }
    };
    _NgController.prototype.add_window_key_events = function () {
        var _this = this;
        window.addEventListener("keydown", function (event) {
            var key = event.keyCode || event.which;
            if (_this.keys.hasOwnProperty(event.keyCode || event.which)) {
                _this.keys[key]();
                event.preventDefault();
            }
        });
    };
    _NgController.prototype.key_invoked = function (action) {
        if (action === void 0) { action = null; }
        var default_actions = this.default_actions;
        var navgroup_direction = this.active_navgroup.obj.get_direction();
        var instruction = this.active_navitem.fetch_instruction(action);
        instruction = (instruction == null) ? this.active_navgroup.obj.fetch_instruction(action) : instruction;
        instruction = (instruction == null) ? default_actions[navgroup_direction][action] : instruction;
        this.run_instructions(instruction);
    };
    _NgController.prototype.run_instructions = function (instruction) {
        if (instruction === void 0) { instruction = null; }
        if (instruction) {
            if (instruction.includes('|') && instruction.startsWith("ng:")) {
                var instructions = instruction.split("|");
                for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
                    var instruction_1 = instructions_1[_i];
                    this.analyse_instruction(instruction_1);
                }
            }
            else {
                this.analyse_instruction(instruction);
            }
        }
    };
    _NgController.prototype.run_action = function (event) {
        if (event === void 0) { event = null; }
        if (event) {
            this.key_invoked(event);
        }
    };
    _NgController.prototype.analyse_instruction = function (instruction) {
        if (instruction === void 0) { instruction = null; }
        var delimiter = ':';
        var navitem_prefix = 'ni' + delimiter;
        var navgroup_prefix = 'ng' + delimiter;
        var hook_prefix = 'hook' + delimiter;
        if (instruction.includes(navitem_prefix)) {
            instruction = instruction.replace(navitem_prefix, '');
            if (Number(instruction)) {
                instruction = this.active_navgroup['item_indexing'][Number(instruction) - 1];
            }
            this.move_to_new_nav_item(instruction);
        }
        else if (instruction.includes(navgroup_prefix)) {
            instruction = instruction.replace(navgroup_prefix, '');
            if (Number(instruction)) {
                instruction = this.navgroups_indexing[Number(instruction) - 1];
            }
            this.move_to_new_nav_group(instruction);
        }
        else if (instruction.indexOf(hook_prefix) > -1) {
            _super.prototype.call.call(this, instruction, {
                'active_navgroup': this.active_navgroup,
                'active_navitem': this.active_navitem
            });
        }
    };
    _NgController.prototype.move_to_new_nav_group = function (instruction, navitem_name) {
        if (instruction === void 0) { instruction = null; }
        if (navitem_name === void 0) { navitem_name = null; }
        var active_nav_group = this.active_navgroup;
        var next_navgroup_name = instruction;
        if (active_nav_group) {
            var moves = {
                'next': this.get_next_nav_group(active_nav_group.obj.get_name(), 'next'),
                'prev': this.get_next_nav_group(active_nav_group.obj.get_name(), 'previous'),
                'last': this.history_stack['navgroups'][this.history_stack['navgroups'].length - 2]
            };
            if (moves.hasOwnProperty(instruction)) {
                next_navgroup_name = moves[instruction];
            }
            else {
                next_navgroup_name = instruction;
            }
        }
        if (this.navgroups.hasOwnProperty(next_navgroup_name)) {
            if (this.active_navgroup) {
                this.active_navgroup.obj.toggle_active();
                this.active_navgroup.obj.active_item_indicator(this.active_navitem.get_name(), 'remove');
            }
            this.active_navgroup = this.navgroups[next_navgroup_name];
            this.active_navgroup.obj.toggle_active();
            this.history_stack['navgroups'].push(next_navgroup_name);
            this.move_to_new_nav_item(navitem_name);
        }
    };
    _NgController.prototype.get_next_nav_group = function (nav_group_name, dir) {
        if (nav_group_name === void 0) { nav_group_name = null; }
        if (dir === void 0) { dir = 'next'; }
        var ng_indexing = this.navgroups_indexing;
        var at_pos = this.navgroups_indexing.indexOf(nav_group_name);
        var next_nav = at_pos;
        next_nav = (dir == 'next') ? next_nav += 1 : next_nav -= 1;
        var constraint = {
            under: (next_nav < 0),
            over: (next_nav >= ng_indexing.length),
        };
        next_nav = (constraint.under) ? ng_indexing.length - 1 : next_nav;
        next_nav = (constraint.over) ? 0 : next_nav;
        return ng_indexing[(next_nav)];
    };
    _NgController.prototype.move_to_new_nav_item = function (instruction) {
        if (instruction === void 0) { instruction = null; }
        var active_group = this.active_navgroup;
        var possible_moves = {
            'next': this.get_next_nav_item(active_group['selected_item'], 'next'),
            'prev': this.get_next_nav_item(active_group['selected_item'], 'prev'),
            'first': active_group['item_indexing'][0],
            'last': active_group['item_indexing'][active_group['item_indexing'].length - 1],
            "move_by_name": this.get_item_in_group(instruction),
            'last_selected': active_group['selected_item'],
            'item_entry_point': active_group['item_entry_point']
        };
        if (possible_moves["move_by_name"] != false) {
            active_group['selected_item'] = instruction;
        }
        else if (instruction != null) {
            if (possible_moves.hasOwnProperty(instruction)) {
                active_group['selected_item'] = possible_moves[instruction];
            }
        }
        else if (possible_moves['item_entry_point']) {
            active_group['selected_item'] = possible_moves['item_entry_point'];
        }
        else if (active_group.obj.get_history_item()) {
            active_group['selected_item'] = possible_moves['last_selected'];
        }
        if (active_group['selected_item'] == null) {
            active_group['selected_item'] = possible_moves['first'];
        }
        if (this.active_navitem) {
            this.active_navitem.toggle_active();
            active_group.obj.active_item_indicator(this.active_navitem.get_name(), 'remove');
        }
        this.active_navitem = active_group['items'][active_group['selected_item']].obj;
        this.active_navitem.toggle_active();
        active_group.obj.active_item_indicator(this.active_navitem.get_name());
        this.history_stack['navitems'].push(this.active_navitem.get_name());
    };
    _NgController.prototype.get_item_in_group = function (item_name) {
        if (item_name === void 0) { item_name = null; }
        var active_group = this.active_navgroup;
        if (active_group) {
            if (item_name) {
                return active_group['items'].hasOwnProperty(item_name);
            }
        }
        return false;
    };
    _NgController.prototype.get_next_nav_item = function (nav_item_name, direction) {
        if (nav_item_name === void 0) { nav_item_name = null; }
        if (direction === void 0) { direction = 'next'; }
        var ni_indexing = this.active_navgroup['item_indexing'];
        var at_pos = ni_indexing.indexOf(nav_item_name);
        var next_item = at_pos;
        next_item = (direction == 'next') ? next_item += 1 : next_item -= 1;
        var constraint = {
            under: (next_item < 0),
            over: (next_item == ni_indexing.length),
        };
        if (constraint.under) {
            next_item = ni_indexing.length - 1;
        }
        else if (constraint.over) {
            next_item = 0;
        }
        return ni_indexing[(next_item)];
    };
    return _NgController;
}(ng_hooks_1.NgHooks));
exports._NgController = _NgController;
exports.NgController = new _NgController();
//# sourceMappingURL=ng-controller.js.map
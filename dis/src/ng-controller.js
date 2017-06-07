"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _NgController = (function () {
    function _NgController() {
        var _this = this;
        this.nav_groups_indexing = [];
        this.nav_groups = {};
        this.active_navgroup = null;
        this.active_navitem = null;
        this.history_stack = {
            'navgroups': [], 'navitems': []
        };
        this.keys = {
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
        this.default_actions = {
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
        this.add_window_key_events();
    }
    _NgController.prototype.add_new_nav_group = function (navgroup_obj) {
        if (navgroup_obj === void 0) { navgroup_obj = null; }
        this.nav_groups[navgroup_obj.get_name()] = {
            'obj': navgroup_obj,
            'nav_items': {},
            'nav_items_index': [],
            'selected_nav_item': null,
        };
        this.nav_groups_indexing.push(navgroup_obj.get_name());
    };
    _NgController.prototype.append_new_nav_item = function (nav_group_name, nav_item) {
        if (nav_group_name === void 0) { nav_group_name = null; }
        if (nav_item === void 0) { nav_item = null; }
        var nav_group = this.nav_groups[nav_group_name];
        var nav_item_name = nav_item.get_name();
        if (nav_item.is_entry_point()) {
            this.nav_groups[nav_group_name]['item_entry_point'] = nav_item_name;
        }
        this.nav_groups[nav_group_name]['nav_items'][nav_item_name] = {
            'name': nav_item_name,
            'obj': nav_item
        };
        this.nav_groups[nav_group_name]['nav_items_index'].push(nav_item_name);
        if (nav_item.props.startingPoint) {
            this.move_to_new_nav_group(nav_group_name, nav_item_name);
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
    _NgController.prototype.key_invoked = function (event) {
        if (event === void 0) { event = null; }
        var default_actions = this.default_actions;
        var instruction = this.active_navitem.fetch_instruction(event);
        instruction = (instruction == null) ? this.active_navgroup.obj.fetch_instruction(event) : instruction;
        if (instruction == null) {
            var navgroup_direction = this.active_navgroup.obj.get_direction();
            instruction = default_actions[navgroup_direction][event];
        }
        if (instruction != null) {
            this.analyse_instruction(instruction);
        }
    };
    _NgController.prototype.analyse_instruction = function (instruction) {
        if (instruction === void 0) { instruction = null; }
        var delimiter = ':';
        var navitem_prefix = 'ni' + delimiter;
        var navgroup_prefix = 'ng' + delimiter;
        var hook_prefix = 'hook' + delimiter;
        if (instruction.includes('|') && instruction.startsWith("ng:")) {
            var instructions = instruction.split("|");
            for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
                var instruction_1 = instructions_1[_i];
                this.analyse_instruction(instruction_1);
            }
        }
        else if (instruction.includes(navitem_prefix)) {
            instruction = instruction.replace(navitem_prefix, '');
            if (Number(instruction)) {
                instruction = this.active_navgroup['nav_items_index'][Number(instruction) - 1];
            }
            this.move_to_new_nav_item(instruction);
        }
        else if (instruction.includes(navgroup_prefix)) {
            instruction = instruction.replace(navgroup_prefix, '');
            if (Number(instruction)) {
                instruction = this.nav_groups_indexing[Number(instruction) - 1];
            }
            this.move_to_new_nav_group(instruction);
        }
        else if (instruction.indexOf(hook_prefix) > -1) {
        }
    };
    _NgController.prototype.run_instructions = function (instruction) {
        if (instruction === void 0) { instruction = null; }
        if (instruction) {
            this.analyse_instruction(instruction);
        }
    };
    _NgController.prototype.run_action = function (event) {
        if (event === void 0) { event = null; }
        if (event) {
            this.key_invoked(event);
        }
    };
    _NgController.prototype.move_to_new_nav_group = function (instruction, nav_item_name) {
        if (instruction === void 0) { instruction = null; }
        if (nav_item_name === void 0) { nav_item_name = null; }
        var active_nav_group = this.active_navgroup;
        var next_navgroup_name = instruction;
        if (active_nav_group) {
            var moves = {
                'prev': this.get_next_nav_group(active_nav_group.obj.get_name(), instruction),
                'next': this.get_next_nav_group(active_nav_group.obj.get_name(), instruction),
                'last': this.history_stack['navgroups'][this.history_stack['navgroups'].length - 2]
            };
            if (moves.hasOwnProperty(instruction)) {
                next_navgroup_name = moves[instruction];
            }
            else {
                next_navgroup_name = instruction;
            }
        }
        if (this.nav_groups.hasOwnProperty(next_navgroup_name)) {
            if (this.active_navgroup) {
                this.active_navgroup.obj.toggle_active();
                this.active_navgroup.obj.active_item_indicator(this.active_navitem.get_name(), 'remove');
            }
            this.active_navgroup = this.nav_groups[next_navgroup_name];
            this.active_navgroup.obj.toggle_active();
            this.history_stack['navgroups'].push(this.active_navgroup.obj.get_name());
            this.move_to_new_nav_item(nav_item_name);
        }
    };
    _NgController.prototype.move_to_new_nav_item = function (instruction) {
        if (instruction === void 0) { instruction = null; }
        var active_group = this.active_navgroup;
        var possible_moves = {
            'next': this.get_next_nav_item(active_group['selected_nav_item'], 'next'),
            'prev': this.get_next_nav_item(active_group['selected_nav_item'], 'prev'),
            'first': active_group['nav_items_index'][0],
            'last': active_group['nav_items_index'][active_group['nav_items_index'].length - 1],
            "move_by_name": this.get_item_in_group(instruction),
            'last_selected': active_group['selected_nav_item'],
            'item_entry_point': active_group['item_entry_point']
        };
        if (possible_moves["move_by_name"] != false) {
            active_group['selected_nav_item'] = instruction;
        }
        else if (instruction != null) {
            if (possible_moves.hasOwnProperty(instruction)) {
                active_group['selected_nav_item'] = possible_moves[instruction];
            }
        }
        else if (possible_moves['item_entry_point']) {
            active_group['selected_nav_item'] = possible_moves['item_entry_point'];
        }
        else if (active_group.obj.get_history_item()) {
            active_group['selected_nav_item'] = possible_moves['last_selected'];
        }
        if (active_group['selected_nav_item'] == null) {
            active_group['selected_nav_item'] = possible_moves['first'];
        }
        if (this.active_navitem) {
            this.active_navitem.toggle_active();
            active_group.obj.active_item_indicator(this.active_navitem.get_name(), 'remove');
        }
        this.active_navitem = active_group['nav_items'][active_group['selected_nav_item']].obj;
        this.active_navitem.toggle_active();
        active_group.obj.active_item_indicator(this.active_navitem.get_name());
        this.history_stack['navitems'].push(this.active_navitem.get_name());
    };
    _NgController.prototype.get_item_in_group = function (item_name) {
        if (item_name === void 0) { item_name = null; }
        var active_group = this.active_navgroup;
        if (active_group) {
            if (item_name) {
                return active_group.nav_items.hasOwnProperty(item_name);
            }
        }
        return false;
    };
    _NgController.prototype.get_next_nav_group = function (nav_group_name, dir) {
        if (nav_group_name === void 0) { nav_group_name = null; }
        if (dir === void 0) { dir = 'next'; }
        var ng_indexing = this.nav_groups_indexing;
        var at_pos = this.nav_groups_indexing.indexOf(nav_group_name);
        var next_nav = at_pos;
        next_nav = (dir == 'next') ? next_nav += 1 : next_nav -= 1;
        var constraint = {
            under: (next_nav < 0),
            over: (next_nav == ng_indexing.length),
        };
        if (constraint.under) {
            next_nav = ng_indexing.length - 1;
        }
        else if (constraint.over) {
            next_nav = 0;
        }
        return ng_indexing[(next_nav)];
    };
    _NgController.prototype.get_next_nav_item = function (nav_item_name, direction) {
        if (nav_item_name === void 0) { nav_item_name = null; }
        if (direction === void 0) { direction = 'next'; }
        var ni_indexing = this.active_navgroup['nav_items_index'];
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
}());
exports._NgController = _NgController;
exports.NgController = new _NgController();
//# sourceMappingURL=ng-controller.js.map
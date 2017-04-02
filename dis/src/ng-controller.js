"use strict";
var _NgController = (function () {
    function _NgController() {
        var _this = this;
        this.nav_groups_indexing = [];
        this.nav_groups = {};
        this.active_navgroup = null;
        this.active_navitem = null;
        this.history_stack = {
            'navgroups': [],
            'navitems': []
        };
        this.keys = {
            8: function () { _this.key_function('onBack'); },
            27: function () { _this.key_function('onBack'); },
            13: function () { _this.key_function('onEnter'); },
            32: function () { _this.key_function('onEnter'); },
            87: function () { _this.key_function('onUp'); },
            38: function () { _this.key_function('onUp'); },
            83: function () { _this.key_function('onDown'); },
            40: function () { _this.key_function('onDown'); },
            65: function () { _this.key_function('onLeft'); },
            37: function () { _this.key_function('onLeft'); },
            68: function () { _this.key_function('onRight'); },
            39: function () { _this.key_function('onRight'); },
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
    _NgController.prototype.add_new_nav_group = function (nav_group_name, obj) {
        if (nav_group_name === void 0) { nav_group_name = null; }
        if (obj === void 0) { obj = null; }
        this.nav_groups[nav_group_name] = {
            'obj': obj,
            'nav_items': {},
            'nav_items_indexing': [],
            'selected_nav_item': null,
        };
        this.nav_groups_indexing.push(nav_group_name);
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
        this.nav_groups[nav_group_name]['nav_items_indexing'].push(nav_item_name);
        if (nav_item.props.startingPoint) {
            this.move_to_new_nav_group(nav_group_name, nav_item_name);
        }
    };
    _NgController.prototype.run_instructions = function (instruction) {
        if (instruction === void 0) { instruction = null; }
        if (instruction) {
            this.analyse_instructions(instruction);
        }
    };
    _NgController.prototype.run_action = function (event) {
        if (event === void 0) { event = null; }
        if (event) {
            this.key_function(event);
        }
    };
    _NgController.prototype.key_function = function (event) {
        if (event === void 0) { event = null; }
        var default_actions = this.default_actions;
        var instruction = this.active_navitem.fetch_instruction(event);
        instruction = (instruction == null) ? this.active_navgroup.obj.fetch_instruction(event) : instruction;
        if (instruction == null) {
            var navgroup_direction = this.active_navgroup.obj.get_direction();
            instruction = default_actions[navgroup_direction][event];
        }
        if (instruction != null) {
            this.analyse_instructions(instruction);
        }
    };
    _NgController.prototype.analyse_instructions = function (instruction) {
        if (instruction === void 0) { instruction = null; }
        var delimiter = ':';
        var navgroup = 'ng' + delimiter;
        var navitem = 'ni' + delimiter;
        var hook = 'hook' + delimiter;
        if (instruction.includes('|') && instruction.startsWith("ng:")) {
            var split = instruction.split("|");
            this.analyse_instructions(split[0]);
            this.analyse_instructions(split[1]);
        }
        else if (instruction.includes(navitem)) {
            instruction = instruction.replace(navitem, '');
            if (Number(instruction)) {
                instruction = this.active_navgroup['nav_items_indexing'][Number(instruction) - 1];
            }
            this.move_to_new_nav_item(instruction);
        }
        else if (instruction.includes(navgroup)) {
            instruction = instruction.replace(navgroup, '');
            if (Number(instruction)) {
                instruction = this.nav_groups_indexing[Number(instruction) - 1];
            }
            this.move_to_new_nav_group(instruction);
        }
        else if (instruction.indexOf(hook) > -1) {
            var args = {
                'active_navgroup': this.active_navgroup,
                'active_navitem': this.active_navitem
            };
        }
    };
    _NgController.prototype.move_to_new_nav_group = function (instruction, nav_item_name) {
        if (instruction === void 0) { instruction = null; }
        if (nav_item_name === void 0) { nav_item_name = null; }
        var active_nav_group = this.active_navgroup;
        var next_navgroup_name = instruction;
        if (active_nav_group) {
            var moves = {
                'prev': this.get_next_prev_nav_group(active_nav_group.obj.get_name(), instruction),
                'next': this.get_next_prev_nav_group(active_nav_group.obj.get_name(), instruction),
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
        var items_to_move_to = {
            'next': this.get_next_prev_nav_item(active_group['selected_nav_item'], 'next'),
            'prev': this.get_next_prev_nav_item(active_group['selected_nav_item'], 'prev'),
            'first': active_group['nav_items_indexing'][0],
            'last': active_group['nav_items_indexing'][active_group['nav_items_indexing'].length - 1],
            'last_selected': active_group['selected_nav_item'],
            'item_entry_point': active_group['item_entry_point']
        };
        if (this.item_in_group(instruction) != false) {
            active_group['selected_nav_item'] = instruction;
        }
        else if (instruction != null) {
            if (items_to_move_to.hasOwnProperty(instruction)) {
                active_group['selected_nav_item'] = items_to_move_to[instruction];
            }
        }
        else if (items_to_move_to['item_entry_point']) {
            active_group['selected_nav_item'] = items_to_move_to['item_entry_point'];
        }
        else if (active_group.obj.get_history_item()) {
            active_group['selected_nav_item'] = items_to_move_to['last_selected'];
        }
        else {
            active_group['selected_nav_item'] = items_to_move_to['first'];
        }
        if (active_group['selected_nav_item'] == null) {
            active_group['selected_nav_item'] = items_to_move_to['first'];
        }
        if (this.active_navitem) {
            this.active_navitem.toggle_active();
        }
        this.active_navitem = active_group['nav_items'][active_group['selected_nav_item']].obj;
        this.active_navitem.toggle_active();
        this.history_stack['navitems'].push(this.active_navitem.get_name());
        active_group.obj.indicate_active_item(this.active_navitem.get_name(), this.active_navitem.was_given_name());
    };
    _NgController.prototype.item_in_group = function (item_name) {
        if (item_name === void 0) { item_name = null; }
        var active_group = this.active_navgroup;
        if (item_name) {
            return active_group.nav_items.hasOwnProperty(item_name);
        }
        return false;
    };
    _NgController.prototype.swap_active_item = function (item_name) {
        if (item_name === void 0) { item_name = null; }
        if (item_name) {
            console.log("this.active_navgroup['selected_nav_item']");
            console.log(this.active_navgroup['selected_nav_item']);
            console.log(item_name != this.active_navgroup['selected_nav_item']);
        }
    };
    _NgController.prototype.get_next_prev_nav_group = function (nav_group_name, dir) {
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
    _NgController.prototype.get_next_prev_nav_item = function (nav_item_name, dir) {
        if (nav_item_name === void 0) { nav_item_name = null; }
        if (dir === void 0) { dir = 'next'; }
        var ni_indexing = this.active_navgroup['nav_items_indexing'];
        var at_pos = ni_indexing.indexOf(nav_item_name);
        var next_item = at_pos;
        next_item = (dir == 'next') ? next_item += 1 : next_item -= 1;
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
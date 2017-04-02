"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ng_controller_1 = require("./ng-controller");
var NavGroup = (function (_super) {
    __extends(NavGroup, _super);
    function NavGroup() {
        var _this = _super.call(this) || this;
        _this.nav_group = null;
        _this.nav_group_name = null;
        _this.last_active_navitem_name = null;
        _this._NgController = ng_controller_1.NgController;
        return _this;
    }
    NavGroup.prototype.get_name = function () { return this.nav_group_name; };
    NavGroup.prototype.get_active_class_name = function () { return (this.props.activeClassName) ? this.props.activeClassName : 'active'; };
    NavGroup.prototype.get_direction = function () { return (this.props.direction) ? this.props.direction : 'horizontal'; };
    NavGroup.prototype.get_history_item = function () { return (this.props.historyItem) ? this.props.historyItem : false; };
    NavGroup.prototype.toggle_active = function () {
        if (this.nav_group) {
            this.nav_group.classList.toggle(this.get_active_class_name());
        }
    };
    NavGroup.prototype.make_active = function () {
        this.nav_group.classList.add(this.get_active_class_name());
    };
    NavGroup.prototype.indicate_active_item = function (active_navitem_name, item_was_given_name) {
        if (active_navitem_name === void 0) { active_navitem_name = null; }
        if (item_was_given_name === void 0) { item_was_given_name = false; }
        if (active_navitem_name) {
            if (this.last_active_navitem_name) {
                this.nav_group.classList.remove(this.last_active_navitem_name);
            }
            if (item_was_given_name) {
                this.last_active_navitem_name = active_navitem_name;
                this.nav_group.classList.add(active_navitem_name);
            }
        }
    };
    NavGroup.prototype.gen_random_name = function () {
        var random_name = '';
        for (var i = 0; i < 2; i++)
            random_name += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + '-';
        return random_name.substring(0, random_name.length - 1);
    };
    NavGroup.prototype.componentDidMount = function () {
        this.nav_group_name = this.props.name || this.gen_random_name();
        if (this.props.name) {
            this.nav_group.classList.add(this.nav_group_name);
        }
        this._NgController.add_new_nav_group(this.nav_group_name, this);
        for (var ref in this.refs) {
            var item = this.refs[ref];
            if (item.constructor.name == 'NavItem') {
                this._NgController.append_new_nav_item(this.nav_group_name, item);
            }
        }
    };
    NavGroup.prototype.recursiveCloneChildren = function (children) {
        return React.Children.map(children, function (child, idx) {
            return React.cloneElement(child, { ref: idx });
        });
    };
    NavGroup.prototype.fetch_instruction = function (instruction) {
        if (instruction === void 0) { instruction = ''; }
        var props = this.props;
        if (props.hasOwnProperty(instruction)) {
            return (props[instruction]);
        }
        return null;
    };
    NavGroup.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { className: "nav-group", ref: function (ng) { _this.nav_group = ng; } },
            "  ",
            this.recursiveCloneChildren(this.props.children),
            "  ");
    };
    return NavGroup;
}(React.Component));
exports.NavGroup = NavGroup;
var NavItem = (function (_super) {
    __extends(NavItem, _super);
    function NavItem() {
        var _this = _super.call(this) || this;
        _this.navitem = null;
        _this.nav_item_name = null;
        _this._NgController = ng_controller_1.NgController;
        return _this;
    }
    NavItem.prototype.get_active_class_name = function () { return (this.props.activeClassName) ? this.props.activeClassName : 'active'; };
    NavItem.prototype.is_entry_point = function () { return (this.props.entryPoint) ? true : false; };
    NavItem.prototype.was_given_name = function () { return (this.props.name) ? true : false; };
    NavItem.prototype.componentDidMount = function () {
        if (this.props.name) {
            this.navitem.classList.add(this.props.name);
        }
    };
    NavItem.prototype.toggle_active = function () {
        if (this.navitem) {
            this.navitem.classList.toggle(this.get_active_class_name());
        }
    };
    NavItem.prototype.make_active = function () {
        this.navitem.classList.add(this.get_active_class_name());
    };
    NavItem.prototype.remove_active = function () {
        this.navitem.classList.remove(this.get_active_class_name());
    };
    NavItem.prototype.get_name = function () {
        if (this.nav_item_name == null) {
            this.nav_item_name = (this.props.name) ? this.props.name : this.gen_random_name();
        }
        return this.nav_item_name;
    };
    NavItem.prototype.gen_random_name = function () {
        var random_name = '';
        for (var i = 0; i < 2; i++)
            random_name += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + '-';
        return random_name.substring(0, random_name.length - 1);
    };
    NavItem.prototype.fetch_instruction = function (instruction) {
        if (instruction === void 0) { instruction = ''; }
        var props = this.props;
        if (props.hasOwnProperty(instruction)) {
            return (props[instruction]);
        }
        return null;
    };
    NavItem.prototype.recursiveCloneChildren = function (children) {
        var _this = this;
        return React.Children.map(children, function (child) {
            var childProps = {};
            if (child.props) {
                childProps.children = _this.recursiveCloneChildren(child.props.children);
                return React.cloneElement(child, childProps);
            }
            return child;
        });
    };
    NavItem.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { className: "nav-item", ref: function (ni) { _this.navitem = ni; } },
            "  ",
            this.recursiveCloneChildren(this.props.children),
            "  ");
    };
    return NavItem;
}(React.Component));
exports.NavItem = NavItem;
//# sourceMappingURL=nav-group.js.map
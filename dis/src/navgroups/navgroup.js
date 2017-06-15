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
var React = require("react");
var ngcontroller_1 = require("./ngcontroller");
var NavGroup = (function (_super) {
    __extends(NavGroup, _super);
    function NavGroup() {
        var _this = _super.call(this) || this;
        _this.nav_group = null;
        _this.nav_group_name = null;
        _this._NgController = ngcontroller_1.NgController;
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
    NavGroup.prototype.active_item_indicator = function (active_navitem_name, action) {
        if (active_navitem_name === void 0) { active_navitem_name = null; }
        if (action === void 0) { action = 'add'; }
        if (!this.props.indicateActiveItem) {
            return true;
        }
        if (active_navitem_name) {
            if (action == 'remove') {
                this.nav_group.classList.remove(active_navitem_name);
            }
            else {
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
        this._NgController.add_new_nav_group(this);
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
            return String(props[instruction]);
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
//# sourceMappingURL=navgroup.js.map
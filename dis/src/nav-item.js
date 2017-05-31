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
var ng_controller_1 = require("./ng-controller");
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
//# sourceMappingURL=nav-item.js.map
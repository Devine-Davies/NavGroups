"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var index_1 = require("../src/index");
var App = function () { return (React.createElement("div", { className: 'window' },
    React.createElement("aside", { className: "side-menu" },
        React.createElement(index_1.NavGroup, { name: "menu", direction: "vertical", onLeft: "", onRight: "ng:last" },
            React.createElement(index_1.NavItem, null, "Home"),
            React.createElement(index_1.NavItem, null, "Movies"),
            React.createElement(index_1.NavItem, null, "Music"),
            React.createElement(index_1.NavItem, null, "Profile"),
            React.createElement(index_1.NavItem, null, "Setting"))),
    React.createElement("div", { className: 'body' },
        React.createElement(index_1.NavGroup, { historyItem: true },
            React.createElement(index_1.NavItem, { onEnter: "ng:inner-group", onLeft: "ng:menu" },
                React.createElement("p", null,
                    "Nested groups ",
                    React.createElement("br", null),
                    " (enter to go inside) "),
                React.createElement(index_1.NavGroup, { name: "inner-group", onBack: "ng:last|ni:5" },
                    React.createElement(index_1.NavItem, { onLeft: "ng:last|ni:1" }, "Item"),
                    React.createElement(index_1.NavItem, { onRight: "ng:last|ni:2" }, "Item"))),
            React.createElement(index_1.NavItem, { onEnter: "ng:inner-group2" },
                React.createElement("p", null,
                    "Nested groups ",
                    React.createElement("br", null),
                    " (enter to go inside) "),
                React.createElement(index_1.NavGroup, { name: "inner-group2", onBack: "ng:last|ni:2" },
                    React.createElement(index_1.NavItem, { onLeft: "ng:last|ni:5" }, "Item"),
                    React.createElement(index_1.NavItem, null, "Item"),
                    React.createElement(index_1.NavItem, { onRight: "ng:section-2|ni:first" }, "Item")))),
        React.createElement(index_1.NavGroup, { name: "section-2", indicateActiveItem: true },
            React.createElement(index_1.NavItem, { onLeft: "ng:menu" }, "Item"),
            React.createElement(index_1.NavItem, { onEnter: "ng:inner-group|ni:2" }, "Item"),
            React.createElement(index_1.NavItem, { startingPoint: true, onRight: "ni:last" }, "goto End"),
            React.createElement(index_1.NavItem, null, "Item"),
            React.createElement(index_1.NavItem, null, "Item"),
            React.createElement(index_1.NavItem, { onRight: "", name: "boom" }, "End")),
        React.createElement(index_1.NavGroup, { name: "with-hook" },
            React.createElement(index_1.NavItem, { onLeft: "ng:menu" }, "Item"),
            React.createElement(index_1.NavItem, { entryPoint: true, onBack: 'hook:install-game' }, "Entry item"),
            React.createElement(index_1.NavItem, null, "Item"),
            React.createElement(index_1.NavItem, { name: "hook-item", onEnter: "hook:my-custom-hook" }, "Hook"),
            React.createElement(index_1.NavItem, null, "Item"),
            React.createElement(index_1.NavItem, { onRight: "" }, "Item")),
        React.createElement(index_1.NavGroup, null,
            React.createElement(index_1.NavItem, { onLeft: "ng:menu" }, "Item"),
            React.createElement(index_1.NavItem, { entryPoint: true }, "Entry item"),
            React.createElement(index_1.NavItem, null, "Item"),
            React.createElement(index_1.NavItem, { name: "hook-item", onEnter: "hook:my-custom-hook" }, "Hook"),
            React.createElement(index_1.NavItem, null, "Item"),
            React.createElement(index_1.NavItem, { onRight: "" }, "Item"))))); };
window.onload = function (e) {
    index_1.NgController.set('hook:install-game', function (args) {
        console.log(args);
    });
};
ReactDOM.render(React.createElement(App, null), document.getElementById("example"));
//# sourceMappingURL=index.js.map
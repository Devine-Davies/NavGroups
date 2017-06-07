# NavGroups
A react library for mapping web layout's that can be controlled via a keyboard.

##### Built With
- [React](https://facebook.github.io/react/) - A JavaScript library for building user interfaces
* [TypeScript](https://www.typescriptlang.org/) - JavaScript that scales.

##### Setup
A step by step series of examples to get a development env running
 - Install all dependencies ``` npm install ```
 - Run Development environment ``` npm run dev ```

## HTML Markup & Props
Below illustrates the type of markup used to construct the navgroups react componant. The exsample is given in the from of [TSX](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)

###### ***index.tsx***
```javascript
import * as React from "react";
import * as ReactDOM from "react-dom";
import { NgController, NavGroup, NavItem } from "navgroups";

const App = () => (
    <div className='window' >
        <NavGroup name="main-menu" direction="vertical" onLeft="" onRight="ng:last"  >
            <NavItem>Movies</NavItem>
            <NavItem>Music</NavItem>
            <NavItem>Profile</NavItem>
            <NavItem >Setting</NavItem>
        </NavGroup>
        <NavGroup name="movie-list" onLeft="ng:main-menu" onLeft="" >
            <NavItem>Movie .01</NavItem>
            <NavItem>Movie .02</NavItem>
            <NavItem>Movie .03</NavItem>
            <NavItem>Movie .04</NavItem>
        </NavGroup>
    </div>
);

ReactDOM.render(<App />, document.getElementById("example") );
```

**Setting Props for NavGroup && NavItem**

| Setting props      | Avalable   | Type       |  Description                                                           |
|------------------  |------------|------------|-----------------------------------------------------------------|
| name               | NG & NI    | String     | The name you wish to give the navitem/navgroup. If none given a random one will be generated. |
| activeClassName    | NG & NI    | String     | Class name given to an active navgroup/navitem |
| direction          | NG         | String     | Can except "horizontal" or "vertical" the key binding will the change depending on the direction specified |
| indicateActiveItem | NG         | Boolean    | When decleard on a group attr, the group will add the class of the item name to it's self |
| historyItem        | NG         | Boolean    | Tells the navgroup to remember to remember the last selected navitem and use that as the first selected navitem when entering. |
| startingPoint      | NI         | Boolean    | Is the main item that will be select when first entering the group. |
| entryPoint         | NI         | Boolean    | Use this navitem as the first selected item wehn entering a navgroup, takes priority over historyItem. |

## Action Props & Instructions
Action props define what type of interaction you want the navgroup/navitem and every action needs an instruction. The **Example below** show's how these actions are binded to either the NavGroup and NavItem components.

```javascript
    <NavGroup name="movie-list" onLeft="" >
        <NavItem onLeft="" onDown="" >Movie .01</NavItem>
    </NavGroup>
```

### Action Props

| Action prop       | Avalable | Description                                                           |
|------------------ |----------|-----------------------------------------------------------------------|
| onEnter           | NG & NI  | Triggerd when the enterkey (↵) is invoked                             |
| onBack            | NG & NI  | Triggerd when the backkey (←) is invoked                              |
| onUp              | NG & NI  | Triggerd whenn the up arrow key (▲) or **W** is invoked               |
| onRight           | NG & NI  | Triggerd when the right arrow key(►) or **D** is invoked              |
| onDown            | NG & NI  | Triggerd when the down arrow key(▼) or **S** is invoked               |
| onLeft            | NG & NI  | Triggerd when the left aorrow key(◄) or **A**  is invoked             |

**Default actions** are applied and change occordadly depending on the direction of navgroup.

| Action prop       | Vertical | Horizontal |
|------------------ |----------|------------|
| onUp              | ni:prev  | ng:prev    |
| onRight           | ng:next  | ni:next    |
| onDown            | ni:next  | ng:next    |
| onLeft            | ng:prev  | ni:prev    |

### Action instructions
Instructions contain infromation on how the navgroup/navitem should respond when an action has been invoked.

**Navgroup instructions**

| Instructions  | is default | Description                                                           |
|---------------|------------|-----------------------------------------------------------------------|
| ng:next       | default    | next navgroup                                                         |
| ng:prev       | default    | previous navgroup                                                     |
| ng:last       |            | Go to last selected navgroup                                          |
| ng:{{#}}      |            | Go to the given navgroup by index                                     |
| ng:{{name}}   |            | Go to the navgroup by name                                            |
| hook:{{name}} |            | add the name of your custom hook (must be set up in custom methods  ) |

**Navitem instructions**

| Instructions  | is default | Description                                                           |
|---------------|------------|-----------------------------------------------------------------------|
| ni:next       | default    | next navitem                                                          |
| ni:prev       | default    | previous navitem                                                      |
| ni:last       |            | Go to last item                                                       |
| ni:first      |            | Go to first item                                                      |
| ni:{{#}}      |            | Go to the given index of an item                                      |
| ni:{{name}}   |            | Go to the item with that name                                         |

> It's important to note that `navitem's` take priority over `navgroup's` instructions.

> Instructions can be concatenated together by using the pipe operator  (```| ```)
For example ```ng:{{#}}|ni:{{#}} ```

##### Programmatically run instruction
Instructions can be invoke via the NgController by calling the `run_instructions()` methord and then passing the instruction string.
```javascript
import { NgController, NavGroup, NavItem } from "navgroups";

NgController.run_instructions( 'ng:menu|ni:profile' )
```

## Deployment
Add additional notes about how to deploy this on a live system

## Authors
* **Rhys Devine-Davies** - *Profile* - [Profile](http://www.mrdevinedavies.co.uk)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
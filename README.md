# NavGroups
A react library for mapping web layout's that can be controlled via a keyboard.

## Setup
A step by step series of examples to get a development env running
 - Install all dependencies ``` npm install ```
 - Run Development environment ``` npm run dev ```

## HTML markup example
The below html snippets outlines the type of syntax that you might used in order to construct the reactview. The exsample is given in the from of [TSX](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)
```html
<NavGroup name="main-menu" direction="vertical" onLeft="" onRight="ng:last"  > 
    <NavItem>Movies</NavItem>
    <NavItem>Music</NavItem>
    <NavItem>Profile</NavItem>
    <NavItem >Setting</NavItem>
</NavGroup>

<NavGroup name="movie-list" onLeft="" onLeft="ng:main-menu"  > 
    <NavItem>Movie title .01</NavItem>
    <NavItem>Movie title .02</NavItem>
    <NavItem>Movie title .03</NavItem>
    <NavItem>Movie title .04</NavItem>
</NavGroup>
```
    
**NavGroup && NavItem Setting Props**

| Setting Props     | Avalable    | Defult      | Description                                                           |
|------------------ |------------|------------ |-----------------------------------------------------------------------|
| name              | NG & NI    |             | The name you wish to give the navitem/navgroup. If none given a random one will be generated. |
| direction         | NG         | horizontal  | Can except "horizontal" or "vertical" the key binding will the change depending on the direction specified |
| startingPoint     | NI         |             | Is the main item that will be select when first entering the group. |
| entryPoint        | NI         |             | On new selected navgroup, if this has been set to turn on a navitem inside that group then this will be the first active one every time. |
| activeClassName   | NG & NI    | active      | Active class name given to an active navgroup/navitem |

**NavGroup && NavItem Event Props**

| Event Props       | Avalable   | Defult      | Description                                                           |
|------------------ |------------|------------ |-----------------------------------------------------------------------|
| onEnter           | NG & NI    |             | Triggerd when the enterkey (↵) is invoked |
| onBack            | NG & NI    |             | Triggerd when the backkey (←) is invoked  |
| onUp              | NG & NI    |             | Triggerd whenn the up arrow key (▲) or **W** is invoked  |
| onRight           | NG & NI    |             | Triggerd when the right arrow key(►) or **D** is invoked  |
| onDown            | NG & NI    |             | Triggerd when the down arrow key(▼) or **S** is invoked  |
| onLeft            | NG & NI    |             | Triggerd when the left aorrow key(◄) or **A**  is invoked  |

## Instructions
#### Navgroup instructions 
| Instructions  | is default | Description                                                           |
|---------------|------------|-----------------------------------------------------------------------|
| ni:next       | default    | next navitem                                                          |
| ni:prev       | default    | previous navitem                                                      |
| ni:last       |            | Go to last item                                                       |
| ni:first      |            | Go to first item                                                      |
| ni:{{#}}      |            | Go to the given index of an item                                      |
| ni:{{name}}   |            | Go to the item with that name                                         |

#### Navitem instructions 
| Instructions  | is default | Description                                                           |
|---------------|------------|-----------------------------------------------------------------------|
| ng:next       | default    | next navgroup                                                         |
| ng:prev       | default    | previous navgroup                                                     |
| ng:last       |            | Go to last selected navgroup                                          |
| ng:{{#}}      |            | Go to the given navgroup by index                                     |
| ng:{{name}}   |            | Go to the navgroup by name                                            |
| hook:{{name}} |            | add the name of your custom hook (must be set up in custom methods  ) |

> It's important to note that `navitem's` instructions take priority over `navgroup's` instructions


**Concatenate instructions**
> Instructions can be concatenated together by using the pipe operator  (```| ```) 
For example ```ng:{{#}}|ni:{{#}} ```

**Programmatically run instruction**
> Instructions can be concatenated together by using the pipe operator  (```| ```) 
For example ```ng:{{#}}|ni:{{#}} ```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [React](https://facebook.github.io/react/) - A JavaScript library for building user interfaces
* [TypeScript](https://www.typescriptlang.org/) - JavaScript that scales.

## Authors

* **Rhys Devine-Davies** - *Profile* - [Profile](http://www.mrdevinedavies.co.uk)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
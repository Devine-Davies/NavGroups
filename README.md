# NavGroups

A react library for mapping web layout's that can be controlled via a keyboard.

## Getting Started

HTML snippet example

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

| Instructions  | is default | Description                                                           |
|---------------|------------|-----------------------------------------------------------------------|
|               |            |                                                                       |
| ng:*|ni:*     |            | will move to nav group and item at onces, must start with ng          |
|               |            |                                                                       |
| ni:next       | default    | next navitem                                                          |
| ni:prev       | default    | previous navitem                                                      |
| ni:last       |            | Go to last item                                                       |
| ni:first      |            | Go to first item                                                      |
| ni:{{#}}      |            | Go to the given index of an item                                      |
| ni:{{name}}   |            | Go to the item with that name                                         |
|               |            |                                                                       |
| ng:next       | default    | next navgroup                                                         |
| ng:prev       | default    | previous navgroup                                                     |
| ng:last       |            | Go to last selected navgroup                                          |
| ng:{{#}}      |            | Go to the given navgroup by index                                     |
| ng:{{name}}   |            | Go to the navgroup by name                                            |
|               |            |                                                                       |
| hook:{{name}} |            | add the name of your custom hook (must be set up in custom methods  ) |

### Installing

A step by step series of examples to get a development env running

Install all dependencies

```
npm install
```

Run Development environment

```
npm run dev
```

End with an example of getting some data out of the system or using it for a little demo

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [React](https://facebook.github.io/react/) - A JavaScript library for building user interfaces
* [TypeScript](https://www.typescriptlang.org/) - JavaScript that scales.

## Authors

* **Rhys Devine-Davies** - *Profile* - [Profile](http://www.mrdevinedavies.co.uk)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
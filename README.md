[![Build Status](https://travis-ci.org/dipcode-software/jquery-applyonscreen.svg?branch=master)](https://travis-ci.org/dipcode-software/jquery-applyonscreen)
[![BCH compliance](https://bettercodehub.com/edge/badge/dipcode-software/jquery-applyonscreen?branch=master)](https://bettercodehub.com/)

# Apply on Screen
jQuery plugin to apply function when screen size is reached

## How to Install:
* BOWER
```bash
bower install applyonscreen
```
* NPM:
```bash
npm i jquery-applyonscreen
```

## Default Variables:

```javascript
options = {
  min: {
    mobile: 0,
    tablet: 768,
    desktop: 992,
    large: 1200
  },
  max: {
    mobile: 767,
    tablet: 991,
    desktop: 1199,
    large: 7680
  }
};
```

## Usage:
 - HTML

 	```html
    <div class="selector"></div>
    ```

 - JavaScript
	 - Applied when the screen is between **0** and **767**
        ```javascript
        $('.selector').applyOnScreen(function() {...}).range(0, 767);
        ```
	 - Applied when the screen is between **0** and **767**
        ```javascript
        $('.selector').applyOnScreen(function() {...}).range('mobile', 'mobile');
        ```
	 - Applied when the screen is between **0** and **767**
        ```javascript
        $('.selector').applyOnScreen(function() {...}).max(767);
        ```
	 - Applied when the screen is between **0** and **767**
		```javascript
		$('.selector').applyOnScreen(function() {...}).max('mobile');
		```
	 - To extend **options** variable
        ```javascript
        $('.selector').applyOnScreen(function() {...}, {max: {xs: 480}}).max('xs');
        ```

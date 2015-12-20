# Front-End Test: Programming
This is my submitted answer for the programming element of a technical test for a front-end role.
## Introduction
The below code snippet was provided to be used in the answer.
```JavaScript
(function() {
    function cb(data) {
        //use returned data
    }
    var tags = 'london';
    var script = document.createElement('script');
    script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=cb&tags=' + tags;
    document.head.appendChild(script);
})();
```
In the snippet, an immediately invoked function creates a JSONP sourced `script` element, with the callback specified as a function `cb`. However, due to the functional scoping of the IIFE, the returned code from the API cannot reach the callback function - resulting in an error. In my answer I have moved the callback to the global scope - to allow it to be accessible from the created script.
## Compatability
The solution has been tested on Chrome v47, Safari 9 and Internet Explorer 11 browsers, and should work on most modern browsers. Due to the use of `localStorage`, and `map`/`filter` array functions, it requires at least Internet Explorer 9.

# Front-End Test: Programming
This is my submitted answer for the programming element of a technical test for a front-end role.
## Introduction
A task was set to consume a JSON API, process the results and display them. Specifically, the Flickr public image feed was provided, with the expectation that returned images should be presented in a grid. Favourite images were to be able to be selected by clicking on them (and tagging them with a `selected` class), with selections persisting through refreshes of the site.

No time limit was set for the task, although it was to expected to be completed in under 2 hours. Free choice of CSS and JS framework was allowed.

The below code snippet was provided to be used in the answer.
```html
<!doctype html>
<html>
<head>
    <script type="text/javascript">
    (function() {
        function cb(data) {
            //use returned data
        }
        var tags = 'london';
        var script = document.createElement('script');
        script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=cb&tags=' + tags;
        document.head.appendChild(script);
    })();
    </script>
</head>
<body>
</body>
</html>
```
In the snippet, an immediately invoked function creates a JSONP sourced `script` element, with the callback specified as a function `cb`. However, due to the functional scoping of the IIFE, the returned code from the API cannot reach the callback function - resulting in an error. In my answer I have moved the callback to the global scope - to allow it to be accessible from the created script.
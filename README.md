# Resizox - Resizing. Redefined.

`const resizox = require('resizox');`

Choose element(s) to make resizable:
```
// selector
resizox.makeResizable('.resizable');
// HTML element
resizox.makeResizable(document.querySelector('#resizable'));
// array of HTML elements
resizox.makeResizable([document.querySelector('#resizable'), document.querySelector('#resizable-2')]);
```

Add Options:
```
resizox.makeResizable('.resizable', { minWidth: 500, outlineSize: 30 });
```

Possible Options:
  - outlineSize (number): size of the area near borders that triggers resizing
  - minWidth (number),
  - maxWidth (number),  
  - minHeight (number),
  - maxHeight (number),

Note:
  - element passed to makeResizable() will be referred to as container
  - setting certain styles on container may break resizing (eg. borders)
  - this package will get improved significantly, so feel free to use it in production

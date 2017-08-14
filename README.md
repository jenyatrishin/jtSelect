## jtSelect
Vanilla JS select styling plugin. Includes two variants ES6 and ES5.

## Installation

ES5
<script type="text/javascript" src="js/jtSelect.js"></script>

ES6

```js
import jtSelect from 'jtSelect.js';
```

## Using

```js
let selectElement = document.querySelector('select');
new jtSelect(selectElement, options);
```
options
searchField - true|false
onStateChange - function - callback for change event
placeholder - string - placeholder for element.
Placeholder can set via data html5 attribute data-placeholder=""
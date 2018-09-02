## jtSelect
Vanilla JS select styling plugin. Two variants ES6 and ES5 are included.

## Installation

ES5
<script type="text/javascript" src="js/jtSelect.js"></script>

ES6

```js
import jtSelect from 'jtSelect.js';
```

## Using

```js
const selectElement = document.querySelector('select');
new jtSelect(selectElement, options);
```
options
searchField - true|false,
onStateChange - function - callback change event,
placeholder - string - placeholder for element. 
Placeholder can be set via data html5 attribute data-placeholder=""

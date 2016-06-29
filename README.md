# Knockout Moment Component

> A simple knockout extender that wraps [moment.js](http://momentjs.com/).

## Installation

```
npm install knockout-moment
```

Then add `knockout-moment.js` to your project.

## Usage

`require` the script in your bundle, then:

```js
var myDate = ko.observable().extend({moment: true});
myDate("May 15, 2014");

console.log("YYYY-MM-DD-HH[h]mm[m]s[s]: " + myDate.linkable());
console.log("YYYY-MM-DD: " + myDate.nativeFormat());
console.log("MM/DD/YYYY: " + myDate.usFormat());
console.log("MMMM Do, YYYY: " + myDate.articleFormat());
console.log("h:mm a: " + myDate.localTime());
console.log("HH:mm: " + myDate.localTime24());
console.log("MMM: " + myDate.monthName());
console.log("DD: " + myDate.dayOfMonth());
console.log("ISO8601: " + myDate.iso8601());
```

This will coerce all values passed to the observable to type of `moment` and add the aforementioned computed values.
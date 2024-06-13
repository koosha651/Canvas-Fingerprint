## Overview
This project consists of two main JavaScript files: `modifiedCanvasAPI.js` and `randomSupplies.js`. Below is a diagram illustrating how these components interact:


### Project Description

| **modifiedCanvasAPI.js**     |                       | **randomSupplies.js**      |
|---------------------------|-----------------------|--------------------------|
| Intercepts Canvas methods     |                       | Provides RNGs        |
|                    |                       |                          |
| Adds noise to canvas data  | ---- **requests** --->    | Manages randomnumber generation       |
|                       |                       |        |
| Uses RNGs to modifypixel data   | <--- ***supplies*** ---     | Supplies randomvalues for noise      |
|                |                       |       |
|                           |                       | Ensures consistency for persistent RNGs  |
|                           |                       |       |



## Random Noise Application
In the `modifiedCanvasAPI.js`, the `randomSupply.getPixelRng` function is a critical component where the noise is generated and applied to each pixel. During the interception process, `modifiedCanvasAPI.js` requests random values from `randomSupplies.js` to ensure each pixel data is uniquely modified, maintaining the consistency required for persistent RNGs.




## The role of Color Statistics in the Code
The `colorStatistics.js` code looks at all the colors in the canvas and counts the color frequency. Then it decides to ignore the most frequently colors during randomization and only changes the less common ones.

```javascript
class Statistic {
    constructor() {
        this.colors = Object.create(null);    // Keeps track of all the colors
        this.numberOfColors = 0;          // Counts the total number of different colors

        this.minBoundary = {count: Number.NEGATIVE_INFINITY};
        this.maxBoundary = {count: Number.POSITIVE_INFINITY, previousColor: this.minBoundary};
        this.minBoundary.nextColor = this.maxBoundary;
    }

```



```javascript
getMaxColors(n) {
    n = Math.min(n, this.numberOfColors);   // "n" is the most frequent colors.
    const colors = Object.create(null);
    let current = this.maxBoundary;
    for (; n && current; n -= 1) {
        current = current.previousColor;
        colors[current.index] = current;
    }
    return colors;
}
```
### Key Points:
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
## Analyzing "randomSupply.getPixelRng" Function:

```javascript
function randomMixImageData(window, imageData1, imageData2){
		const data1 = imageData1.data;     // it assigned data1 to first pixel which containing the pixel data (R, G, B, A values)
		const data2 = imageData2.data;      // same thing with next pixel data
		const l = data1.length;		//Check if the length of the pixel data are same
		if (l === data2.length){
			const rng = randomSupply.getPixelRng(l, window, {});
			
			for (let i = 0; i < l; i += 4){		// Calculating Sign: calculate the pixel value for each pixel color and choosing the sign if it is -1 or 1
				const signR = data1[i + 0] > data2[i + 0]? -1: 1;	
				const signG = data1[i + 1] > data2[i + 1]? -1: 1;
				const signB = data1[i + 2] > data2[i + 2]? -1: 1;
				const signA = data1[i + 3] > data2[i + 3]? -1: 1;
				
				const [deltaR, deltaG, deltaB, deltaA] = rng(
					signR * (data2[i + 0] - data1[i + 0]),				// find the Random Delta Values for the Red 
					signG * (data2[i + 1] - data1[i + 1]),
					signB * (data2[i + 2] - data1[i + 2]),
					signA * (data2[i + 3] - data1[i + 3]),
					i / 4
				);
				data2[i + 0] = data1[i + 0] + signR * deltaR;
				data2[i + 1] = data1[i + 1] + signG * deltaG;
				data2[i + 2] = data1[i + 2] + signB * deltaB;
				data2[i + 3] = data1[i + 3] + signA * deltaA;
			}
		}
		return imageData2;
	}
```

The `randomSupply.getPixelRng` function is where the noise is generated and applied to each pixel
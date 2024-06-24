## Overview
This extension consists of one main JavaScript files: `content.js` and the `Fox_reverser.html` is the file that include the reversing technique

### Project Description

+ **canvasProtection function**: iterating over each pixel in the canvas image data randomly shifting the color values and choosing a random number between (-5 and 5)

```javascript
HTMLCanvasElement.prototype.noise = function () {
    const { width, height } = this;
    const context = this.getContext('2d');
    const shift = () => Math.floor(Math.random() * 10) - 5;

    const iData = context.getImageData(0, 0, width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const index = ((i * (width * 4)) + (j * 4));
            iData.data[index] = iData.data[index] + shift();
            iData.data[index + 1] = iData.data[index + 1] + shift();
            iData.data[index + 2] = iData.data[index + 2] + shift();
            iData.data[index + 3] = iData.data[index + 3] + shift();
        }
    }
    context.putImageData(iData, 0, 0);
};


```

+ **Overriding Canvas Methods**: The extension only overrides the toBlob and toDataURL methods

## Tactic for reversing Random Noise Application

define a the purpose of reversing the random niose I define a HTML page that turns the entire canvas into a `dataurl` and then define timer in order to run the hash 
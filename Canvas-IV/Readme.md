## Overview
This project consists of two main JavaScript files: `modifiedCanvasAPI.js` and `randomSupplies.js`. Below is a diagram illustrating how these components interact:


### Project Description

| **modifiedCanvasAPI.js **     |                       | **randomSupplies.js  **      |
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





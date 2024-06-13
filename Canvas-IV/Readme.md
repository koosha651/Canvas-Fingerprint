## Overview
This project consists of two main JavaScript files: `modifiedCanvasAPI.js` and `randomSupplies.js`. Below is a diagram illustrating how these components interact:

+-----------------------+                    +-----------------------+
|   modifiedCanvasAPI.js|                    |      randomSupplies.js|
|-----------------------|                    |-----------------------|
| - Intercepts Canvas   |                    | - Provides RNGs       |
|   methods             |                    | - Manages random      |
| - Adds noise to canvas|---- requests --->  |   number generation   |
|   data                |                    | - Supplies random     |
| - Uses RNGs to modify |<--- supplies ---   |   values for noise    |
|   pixel data          |                    | - Ensures consistency |
|                       |                    |   for persistent RNGs |
+-----------------------+                    +-----------------------+


`Random Noise Application:`

In the "modifiedCanvasAPI.js" the "randomSupply.getPixelRng" function is where the noise is generated and applied to each pixel. During the interception, "modifiedCanvasAPI.js" requests random values from "randomSupplies.js"


### Project Components

**`modifiedCanvasAPI.js`**

| Functionality            | Interaction |
|--------------------------|-------------|
| Intercepts Canvas methods| Requests    |
| Adds noise to canvas data|             |
| Uses RNGs to modify pixel data | Supplies |

**`randomSupplies.js`**

| Functionality                | Interaction |
|------------------------------|-------------|
| Provides RNGs                | Supplies    |
| Manages random number generation |         |
| Supplies random values for noise | Requests |
| Ensures consistency for persistent RNGs |   |


## Random Noise Application
In the `modifiedCanvasAPI.js`, the `randomSupply.getPixelRng` function is a critical component where the noise is generated and applied to each pixel. During the interception process, `modifiedCanvasAPI.js` requests random values from `randomSupplies.js` to ensure each pixel data is uniquely modified, maintaining the consistency required for persistent RNGs.

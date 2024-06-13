
+-----------------------+                    +-----------------------+
|   modifiedCanvasAPI.js|                    |      randomSupplies.js|
|-----------------------|                    |-----------------------|
| - Intercepts Canvas   |                    | - Provides RNGs       |
|   methods             |                    | - Manages random      |
| - Adds noise to canvas|---- requests --->  |   number generation   |
|   data                |                    | - Supplies random     |
| - Uses RNGs to modify |<--- supplies ---  |   values for noise    |
|   pixel data          |                    | - Ensures consistency |
|                       |                    |   for persistent RNGs |
+-----------------------+                    +-----------------------+

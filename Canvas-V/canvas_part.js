(function () { // Canvas
    let origGetContext		= HTMLCanvasElement.prototype.getContext;
    let origGetImageData	= CanvasRenderingContext2D.prototype.getImageData;
    let origReadPixels1		= WebGLRenderingContext.prototype.readPixels;
    let origReadPixels2		= WebGL2RenderingContext.prototype.readPixels;
    let origToDataURL		= HTMLCanvasElement.prototype.toDataURL;
    let origToBlob			= HTMLCanvasElement.prototype.toBlob;
    let getImageData = function getImageData() {
        let imageData = origGetImageData.apply(this, arguments);
        for (let i = 0; i < imageData.data.length; i++) {
            imageData.data[i] += Math.round((Math.random() - 0.5) * 4.9);
        }
        return imageData;
    };
    CanvasRenderingContext2D.prototype.getImageData = getImageData;
    CanvasRenderingContext2D.prototype.getImageData.toString = origGetImageData.toString.bind(origGetImageData);
    let origIsPointInPath = CanvasRenderingContext2D.prototype.isPointInPath;
    CanvasRenderingContext2D.prototype.isPointInPath = function isPointInPath() {
        return false;
    };
    CanvasRenderingContext2D.prototype.isPointInPath.toString = origIsPointInPath.toString.bind(origIsPointInPath);
    let readPixels1 = function readPixels() {
        origReadPixels1.apply(this, arguments);
        let pixels = arguments[6];
        for (let i = 0; i < pixels.length; i++) {
            pixels[i] += Math.round((Math.random() - 0.5) * 4.9);
        }
    };
    WebGLRenderingContext.prototype.readPixels = readPixels1;
    WebGLRenderingContext.prototype.readPixels.toString = origReadPixels1.toString.bind(origReadPixels1);
    let readPixels2 = function readPixels() {
        origReadPixels2.apply(this, arguments);
        let pixels = arguments[6];
        for (let i = 0; i < pixels.length; i++) {
            pixels[i] += Math.round((Math.random() - 0.5) * 4.9);
        }
    };
    WebGL2RenderingContext.prototype.readPixels = readPixels2;
    WebGL2RenderingContext.prototype.readPixels.toString = origReadPixels2.toString.bind(origReadPixels2);
    let toDataURL = function toDataURL() {
        let context = origGetContext.apply(this, ["2d"]);
        let imageData = origGetImageData.apply(context, [0, 0, this.height, this.width]), origImageData = origGetImageData.apply(context, [0, 0, this.height, this.width]), ret;// imageData :canvas after added random noise || origImageData :canvas before adding any noise
        for (let i = 0; i < imageData.data.length; i++) {
            imageData.data[i] += Math.round((Math.random() - 0.5) * 4.9);
        }
        context.putImageData(imageData, 0, 0);
        ret = origToDataURL.apply(this, arguments);
        context.putImageData(origImageData, 0, 0);
        return ret;
    };
    let hookWebGLGetParameter = function (target) {
        let random = {
            "item": function (e) {
                let rand = e.length * Math.random();
                return e[Math.floor(rand)];
            },
            "number": function (power) {
                let tmp = [];
                for (let i = 0; i < power.length; i++) {
                    tmp.push(Math.pow(2, power[i]));
                }
                return random.item(tmp);
            },
            "int": function (power) {
                let tmp = [];
                for (let i = 0; i < power.length; i++) {
                    let n = Math.pow(2, power[i]);
                    tmp.push(new Int32Array([n, n]));
                }
                return random.item(tmp);
            },
            "float": function (power) {
                let tmp = [];
                for (let i = 0; i < power.length; i++) {
                    let n = Math.pow(2, power[i]);
                    tmp.push(new Float32Array([1, n]));
                }
                return random.item(tmp);
            }
        };
        let origGetParameter = target.getParameter;
        target.getParameter = function (a1) {
            if (a1 === this.STENCIL_BITS							) { return 0;																						}
            if (a1 === this.DEPTH_BITS								) { return 24;																						}
            if (a1 === this.MAX_VARYING_VECTORS						) { return 30;																						}
            if (a1 === this.VENDOR									) { return "WebKit";																				}
            if (a1 === 37445										) { return "Google Inc.";																			}
            if (a1 === this.RENDERER								) { return "WebKit WebGL";																			}
            if (a1 === this.MAX_TEXTURE_SIZE						) { return random.number([14, 15]);																	}
            if (a1 === this.MAX_VERTEX_UNIFORM_VECTORS				) { return random.number([12, 13]);																	}
            if (a1 === this.MAX_CUBE_MAP_TEXTURE_SIZE				) { return random.number([14, 15]);																	}
            if (a1 === this.MAX_RENDERBUFFER_SIZE					) { return random.number([14, 15]);																	}
            if (a1 === this.MAX_VIEWPORT_DIMS						) { return random.int([13, 14, 15]);																}
            if (a1 === this.ALPHA_BITS								) { return random.number([1, 2, 3, 4]);																}
            if (a1 === this.BLUE_BITS								) { return random.number([1, 2, 3, 4]);																}
            if (a1 === this.GREEN_BITS								) { return random.number([1, 2, 3, 4]);																}
            if (a1 === this.RED_BITS								) { return random.number([1, 2, 3, 4]);																}
            if (a1 === 34047										) { return random.number([1, 2, 3, 4]);																}
            if (a1 === this.MAX_TEXTURE_IMAGE_UNITS					) { return random.number([1, 2, 3, 4]);																}
            if (a1 === this.MAX_VERTEX_ATTRIBS						) { return random.number([1, 2, 3, 4]);																}
            if (a1 === this.MAX_VERTEX_TEXTURE_IMAGE_UNITS			) { return random.number([1, 2, 3, 4]);																}
            if (a1 === this.MAX_COMBINED_TEXTURE_IMAGE_UNITS		) { return random.number([4, 5, 6, 7, 8]);															}
            if (a1 === this.MAX_FRAGMENT_UNIFORM_VECTORS			) { return random.number([10, 11, 12, 13]);															}
            if (a1 === this.ALIASED_LINE_WIDTH_RANGE				) { return random.float([0, 10, 11, 12, 13]);														}
            if (a1 === this.ALIASED_POINT_SIZE_RANGE				) { return random.float([0, 10, 11, 12, 13]);														}
            if (a1 === 37446										) { return random.item(["Graphics", "HD Graphics", "Intel(R) HD Graphics"]);						}
            if (a1 === this.VERSION									) { return random.item(["WebGL 1.0", "WebGL 1.0 (OpenGL)", "WebGL 1.0 (OpenGL Chromium)"]);			}
            if (a1 === this.SHADING_LANGUAGE_VERSION				) { return random.item(["WebGL", "WebGL GLSL", "WebGL GLSL ES", "WebGL GLSL ES (OpenGL Chromium"]);	}					
            return origGetParameter.apply(this, arguments);
        };
        target.getParameter.toString = origGetParameter.toString.bind(origGetParameter);
    };
    hookWebGLGetParameter(WebGLRenderingContext.prototype);
    hookWebGLGetParameter(WebGL2RenderingContext.prototype);
    HTMLCanvasElement.prototype.toDataURL = toDataURL;
    HTMLCanvasElement.prototype.toDataURL.toString = origToDataURL.toString.bind(origToDataURL);
    let toBlob = function toBlob(callback, type, encoderOptions) {
        let context = origGetContext.apply(this, ["2d"]);
        let imageData = origGetImageData.apply(context, [0, 0, this.height, this.width]), imageDataOrig = origGetImageData.apply(context, [0, 0, this.height, this.width]);
        for (let i = 0; i < imageData.data.length; i++) {
            imageData.data[i] += Math.round((Math.random() - 0.5) * 4.9);
        }
        context.putImageData(imageData, 0, 0);
        return origToBlob.apply(this, [function (blob) {
            context.putImageData(imageDataOrig, 0, 0);
            callback(blob);
        }, type, encoderOptions]);
    };
    HTMLCanvasElement.prototype.toBlob = toBlob;
    HTMLCanvasElement.prototype.toBlob.toString = origToBlob.toString.bind(origToBlob);
})();
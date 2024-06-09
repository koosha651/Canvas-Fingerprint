document.documentElement.setAttribute("randFingerprintInjected", "true");
if (!(ignoredSites = ["https://www.google.com/maps", "https://accounts.google.com", "www.figma.com", "www.canva.com", "designer.microsoft.com", "create.vista.com", "console.aws.amazon.com", "www.coze.com"].some(h=>window.location.href.startsWith(h) || window.location.host.endsWith(h)))) {
    let h = function(n) {
        window.dispatchEvent(new CustomEvent("chrome.runtime.sendMessage",{
            detail: n
        }))
    }
      , y = function(n) {
        var t;
        const e = [];
        for (let o = 0; o < window.location.ancestorOrigins.length; o++) {
            const a = (t = window.location.ancestorOrigins[o].match(/^https?:\/\/([^\/]+)/)) == null ? void 0 : t[1];
            a && e.push(a)
        }
        if (n.type !== "CANVAS") {
            const o = C[n.type] || 0;
            if (Date.now() - o < 1e3)
                return
        }
        C[n.type] = Date.now(),
        h({
            action: "setDetected",
            src: window.location.href,
            origins: e,
            detection: n
        })
    }
      , m = function(n) {
        const e = window[n];
        if (!e)
            return;
        const t = new Proxy(e,{
            get: function(o, a) {
                const r = o[a];
                return typeof r == "function" ? function() {
                    return r.apply(o, arguments)
                }
                : r
            }
        });
        Object.defineProperty(window, n, {
            get() {
                return t
            }
        })
    }
      , l = function(n, e, t) {
        const o = "function " + n + "() { [native code] }"
          , a = e[n];
        e.constructor.name,
        e[n] = new Proxy(a,{
            get: function(r, i) {
                if (i === "toString")
                    return o;
                const f = r[i];
                return typeof f == "function" ? function() {
                    return f.apply(r, arguments)
                }
                : f
            },
            apply: t
        })
    }
      , E = function(n, e, t) {
        const o = n.apply(e, t);
        return s ? o : t[0] === 37445 || t[0] === 37446 ? o + " #" + P : o
    }
      , D = function(n, e, t) {
        if (s || !!e.parentElement && e.parentElement.offsetHeight > 1 && e.parentElement.offsetWidth > 1 && e.offsetHeight > 0 && e.offsetWidth > 0 && e.style.display !== "none" && e.style.visibility !== "hidden" && e.style.opacity !== "0")
            return n.apply(e, t);
        if (t.length == 0 || t[0] === "image/png") {
            const i = e.width
              , f = e.height
              , d = e.getContext("2d", {
                willReadFrequently: !0
            });
            if (d !== null) {
                const c = d.getImageData(0, 0, i, f)
                  , u = Math.max(1, Math.floor(f / 7))
                  , w = Math.max(1, Math.floor(i / 7));
                for (let v = 0; v < f; v += u)
                    for (let b = 0; b < i; b += w) {
                        const p = (v + Math.floor(Math.random() * u)) * (i * 4) + (b + Math.floor(Math.random() * w)) * 4;
                        p < c.data.length && (c.data[p + 0] = c.data[p + 0] + M.r,  //The value of the Red component is incremented by M.r to alter the pixel's color
                        c.data[p + 1] = c.data[p + 1] + M.g,
                        c.data[p + 2] = c.data[p + 2] + M.b)
                    }
                d.putImageData(c, 0, 0)
            }
        } else
            t.length === 1 ? t.push(.5 + g) : t[1] > .9 ? t[1] = t[1] - g : t[1] = t[1] + g;
        const r = n.apply(e, t);
        return y({
            type: "CANVAS",
            occurredAt: Date.now(),
            canvas: r,
            canvasSize: e.width + "x" + e.height
        }),
        r
    }
      , s = !!document.documentElement.getAttribute("data-afd-disabled");
    s && document.documentElement.removeAttribute("data-afd-disabled"),
    window.addEventListener("afd-disabled", function() {
        document.documentElement.removeAttribute("data-afd-disabled"),
        s = !0
    }, {
        once: !0
    }),
    h({
        action: "resetDetection",
        host: window.location.host
    });
    const A = (()=>{
        const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return function(e) {
            let t = "";
            const o = n.length;
            for (let a = 0; a < e; a++)
                t += n.charAt(Math.floor(Math.random() * o));
            return t
        }
    }
    )()
      , C = {};
    (function() {
        const n = window.screen.availWidth
          , e = window.screen.availHeight + Math.floor(Math.random() * (n / 80) - n / 80 / 2)
          , t = window.screen
          , o = new Proxy(t,{
            get: function(a, r) {
                if (!s) {
                    if (r === "availWidth")
                        return n;
                    if (r === "availHeight")
                        return e
                }
                const i = a[r];
                return typeof i == "function" ? function() {
                    return i.apply(a, arguments)
                }
                : i
            }
        });
        Object.defineProperty(window, "screen", {
            get() {
                return o
            }
        })
    }
    )(),
    m("navigator"),
    m("speechSynthesis"),
    m("Notification");
    const P = A(10);
    l("getParameter", WebGLRenderingContext.prototype, E),
    l("getParameter", WebGL2RenderingContext.prototype, E),
    l("getContext", HTMLCanvasElement.prototype, function(n, e, t) {
        return n.apply(e, t)
    });
    const g = Math.random() * .05
      , M = {
        r: Math.floor(Math.random() * 10),
        g: Math.floor(Math.random() * 10),
        b: Math.floor(Math.random() * 10)
    };
    l("toDataURL", HTMLCanvasElement.prototype, D),
    window.addEventListener("message", function(n) {
        if (n.data && n.data === "injectFrameFingerprint" && (n.preventDefault(),
        n.stopPropagation(),
        n.source)) {
            const e = n.source;
            e.HTMLCanvasElement && l("toDataURL", e.HTMLCanvasElement.prototype, D)
        }
    }, !1);
    const x = function(n, e, t) {
        if (s)
            return n.apply(e, t);
        const o = e.canvas;
        if (o instanceof HTMLCanvasElement && !!o.parentElement && o.parentElement.offsetHeight > 1 && o.parentElement.offsetWidth > 1 && o.offsetHeight > 0 && o.offsetWidth > 0 && o.style.display !== "none" && o.style.visibility !== "hidden" && o.style.opacity !== "0")
            return n.apply(e, t);
        let r = -1;
        if (t.length > 0 && (t[0].length ? r = 0 : t.length > 1 && t[1].length && (r = 1)),
        r >= 0) {
            let i = 0;
            for (let f = 0; f < 4; f++) {
                for (; i < t[r].length && t[r][i] === 0; i++)
                    ;
                if (i > t[r].length)
                    break;
                const d = t[r].constructor;
                let c = 0;
                if (d == Float32Array)
                    c = (Math.random() * .05 + .1) * (Math.random() > .5 ? 1 : -1);
                else if (d == Int16Array || d == Int32Array || d == Uint16Array || d == Uint32Array) {
                    const u = Math.min(...t[r])
                      , w = Math.max(...t[r]);
                    c = Math.floor(Math.random() * (w - u + 1)) + u
                }
                t[r][i] += c,
                i++
            }
        }
        return y({
            type: "WEBGL",
            occurredAt: Date.now()
        }),
        n.apply(e, t)
    };
    l("bufferData", WebGLRenderingContext.prototype, x),
    l("bufferData", WebGL2RenderingContext.prototype, x);
    {
        let n = function(a) {
            return t ? !0 : (o.add(a),
            o.size > 300 ? (t = !0,
            o.clear(),
            y({
                type: "FONT",
                occurredAt: Date.now()
            }),
            !0) : !1)
        }
          , e = function(a, r, i) {
            try {
                return r === HTMLElement.prototype ? void 0 : s ? Reflect.apply(a, r, i) : r.tagName !== "IMG" && r.childElementCount === 0 && n(r.style.fontFamily) ? Reflect.apply(a, r, i) + Math.random() * .1 - .05 : Reflect.apply(a, r, i)
            } catch {}
        }
          , t = !1
          , o = new Set;
        Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
            get: new Proxy(Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight").get,{
                apply(a, r, i) {
                    return e(a, r, i)
                }
            })
        }),
        Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
            get: new Proxy(Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetWidth").get,{
                apply(a, r, i) {
                    return e(a, r, i)
                }
            })
        })
    }
    l("getChannelData", AudioBuffer.prototype, function(n, e, t) {
        const o = n.apply(e, t);
        if (s)
            return o;
        y({
            type: "AUDIO",
            occurredAt: Date.now()
        });
        for (let a = 0; a < o.length; a += o.length / 10)
            a += Math.floor(Math.random() * o.length / 10),
            a >= o.length && (a = o.length - 1),
            o[a] += Math.random() * 1e-7 - 5e-8;
        return o
    })
}

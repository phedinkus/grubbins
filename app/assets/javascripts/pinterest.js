(function(h, i, j) {
    var a = h[j.k] = {w: h,d: i,a: j,s: {},f: function() {
            return {callback: [],get: function(b, c) {
                    var d = null;
                    return d = typeof b[c] === "string" ? b[c] : b.getAttribute(c)
                },getData: function(b, c) {
                    c = a.a.dataAttributePrefix + c;
                    return a.f.get(b, c)
                },set: function(b, c, d) {
                    if (typeof b[c] === "string")
                        b[c] = d;
                    else
                        b.setAttribute(c, d)
                },make: function(b) {
                    var c = false, d, e;
                    for (d in b)
                        if (b[d].hasOwnProperty) {
                            c = a.d.createElement(d);
                            for (e in b[d])
                                b[d][e].hasOwnProperty && typeof b[d][e] === "string" && a.f.set(c, e, b[d][e]);
                            break
                        }
                    return c
                },
                kill: function(b) {
                    if (typeof b === "string")
                        b = a.d.getElementById(b);
                    b && b.parentNode && b.parentNode.removeChild(b)
                },call: function(b, c) {
                    var d, e, g = "?";
                    d = a.v.nextCallback;
                    a.v.nextCallback += 1;
                    e = a.a.k + ".f.callback[" + d + "]";
                    a.f.callback[d] = function(f) {
                        c(f, d);
                        a.f.kill(e)
                    };
                    if (b.match(/\?/))
                        g = "&";
                    a.d.b.appendChild(a.f.make({SCRIPT: {id: e,type: "text/javascript",charset: "utf-8",src: b + g + "callback=" + e}}));
                    a.f.debug("Calling: " + b + g + "callback=" + e)
                },debug: function(b) {
                    a.w.console && a.w.console.log && a.v.config.debug && a.w.console.log(b)
                },
                getSelection: function() {
                    return ("" + (a.w.getSelection ? a.w.getSelection() : a.d.getSelection ? a.d.getSelection() : a.d.selection.createRange().text)).replace(/(^\s+|\s+$)/g, "")
                },getWindowHeight: function() {
                    return Math.max(Math.max(a.d.b.scrollHeight, a.d.d.scrollHeight), Math.max(a.d.b.offsetHeight, a.d.d.offsetHeight), Math.max(a.d.b.clientHeight, a.d.d.clientHeight))
                },ping: {log: function() {
                        a.v.callbacksHaveReturned += 1
                    },domain: function(b) {
                        a.v.callbacksHaveReturned += 1;
                        var c, d;
                        if (b && b.disallowed_domains && b.disallowed_domains.length) {
                            c = 
                            0;
                            for (d = b.disallowed_domains.length; c < d; c += 1) {
                                if (b.disallowed_domains[c] === a.w.location.host)
                                    a.v.data.blacklistedDomain = true;
                                a.v.checkDomainBlacklist[b.disallowed_domains[c]] = true
                            }
                            c = 0;
                            for (d = a.v.data.thumb.length; c < d; c += 1)
                                if (a.v.checkDomainBlacklist[a.v.data.thumb[c].domain] === true) {
                                    a.v.data.thumb[c].blacklistedImageSource = true;
                                    a.f.log("image_from_blacklisted_domain", a.v.data.thumb[c].domain)
                                }
                        }
                    },preferred: function(b) {
                        a.v.callbacksHaveReturned += 1;
                        if (b.data) {
                            a.f.debug("preferred data received");
                            a.v.data.preferred = 
                            b.data.reply;
                            var c;
                            c = {};
                            c.partner = b.data.src;
                            if (b.data.reply.media !== "image")
                                c.multimedia = true;
                            if (a.a.lookup[b.data.src] && a.a.lookup[b.data.src].page && a.a.lookup[b.data.src].page.multimedia)
                                c.multimedia = true;
                            if (a.v.data.preferred.img.src)
                                c.src = a.v.data.preferred.img.src;
                            else {
                                a.f.debug("preferred data did not include image source");
                                c.src = a.v.pref.og.media || a.v.pref.pin.media
                            }
                            c.url = b.data.reply.page;
                            c.description = a.v.data.preferred.title || a.d.title;
                            c.override = true;
                            a.f.thumbPreferred(c)
                        }
                    },thumb: function(b, 
                    c) {
                        var d, e;
                        a.v.callbacksHaveReturned += 1;
                        if (b.data) {
                            d = 0;
                            for (e = a.v.data.thumb.length; d < e; d += 1)
                                if (a.v.data.thumb[d].callback === c) {
                                    if (b.data.reply) {
                                        a.v.data.thumb[d].extended = b.data.reply;
                                        if (a.v.data.thumb[d].extended && a.v.data.thumb[d].extended.media && a.v.data.thumb[d].extended.media !== "image")
                                            a.v.data.thumb[d].multimedia = true
                                    }
                                    break
                                }
                        }
                    },media: function(b, c) {
                        var d, e;
                        a.v.callbacksHaveReturned += 1;
                        if (b.data) {
                            d = 0;
                            for (e = a.v.data.thumb.length; d < e; d += 1)
                                if (a.v.data.thumb[d].callback === c) {
                                    if (b.data.reply)
                                        a.v.data.thumb[d].extended = 
                                        b.data.reply;
                                    break
                                }
                        }
                    }},thumbPreferred: function(b) {
                    a.f.debug("thumbing preferred");
                    a.f.debug(b);
                    b.preferred = true;
                    var c = new Image;
                    c.onload = function() {
                        b.height = this.height;
                        b.width = this.width;
                        if (b.override === true) {
                            a.v.hazHadPreferred && a.v.data.thumb.shift();
                            a.v.hazOverridden = true;
                            a.v.data.thumb.unshift(b)
                        } else
                            a.v.hazOverridden || a.v.data.thumb.unshift(b)
                    };
                    c.src = b.src;
                    a.v.hazHadPreferred = true
                },checkDomains: function() {
                    var b = a.a.checkDomain.url + "?domains=", c, d = 0;
                    for (c in a.v.checkDomain)
                        if (a.v.checkDomain[c].hasOwnProperty)
                            if (!a.v.checkDomainDone[c]) {
                                a.v.checkDomainDone[c] = 
                                true;
                                if (d)
                                    b += ",";
                                d += 1;
                                b += encodeURIComponent(c);
                                if (d > a.a.maxCheckCount) {
                                    a.f.call(b, a.f.ping.domain);
                                    b = a.a.checkDomain.url + "?domains=";
                                    d = 0
                                }
                            }
                    d > 0 && a.f.call(b, a.f.ping.domain)
                },getArgs: function() {
                    var b = a.d.getElementsByTagName("SCRIPT"), c = b.length, d = 0, e = 0, g = a.a.validConfigParam.length, f = null, m = "", n = function(k) {
                        a.w.setTimeout(function() {
                            a.f.kill(k)
                        }, 10)
                    };
                    for (d = 0; d < c; d += 1)
                        if (b[d].src.match(a.a.me)) {
                            for (e = 0; e < g; e += 1) {
                                m = a.a.validConfigParam[e];
                                if (f = b[d].getAttribute(m))
                                    a.v.config[m] = f
                            }
                            n(b[d]);
                            break
                        }
                },hasValidSource: function(b) {
                    var c = 
                    false;
                    if (b.src && b.src.match(/^http/i))
                        c = true;
                    c === false && a.f.debug("Skipping an image with an unpinnable URL prefix: " + b.src.substr(0, 16));
                    return c
                },pinOkayPerSite: function(b) {
                    var c = false;
                    if (a.f.get(b, "nopin"))
                        a.f.debug("image " + b.src + " has inline nopin set");
                    else
                        c = true;
                    return c
                },lookupThumb: function(b, c) {
                    var d = b.src.split("#")[0].split("?")[0];
                    b = b.partner + ":" + d;
                    var e = "source";
                    if (c)
                        e = "link";
                    if (a.v.hazCalledForInfo[b])
                        a.f.debug("duplicate lookup query " + b);
                    else {
                        a.v.hazCalledForInfo[b] = true;
                        c = a.a.embed + 
                        "?" + e + "=" + encodeURIComponent(d).replace(/^https/, "http");
                        a.f.call(c, a.f.ping.thumb)
                    }
                },lookupMedia: function(b, c) {
                    var d = a.a.embed;
                    if (c === "id")
                        d = d + b.partner + "/";
                    else
                        c = "link";
                    if (a.v.hazCalledForInfo[b.source])
                        a.f.debug("duplicate lookup query " + b.source);
                    else {
                        a.v.hazCalledForInfo[b.source] = true;
                        a.f.call(d + "?" + c + "=" + encodeURIComponent(b.source).replace(/^https/, "http"), a.f.ping.media)
                    }
                },grovel: function(b, c) {
                    var d, e, g, f = null;
                    for (d in a.a.lookup)
                        if (a.a.lookup[d].hasOwnProperty && typeof a.a.lookup[d][c] === 
                        "object" && typeof a.a.lookup[d][c].seek === "object") {
                            e = 0;
                            for (g = a.a.lookup[d][c].seek.length; e < g; e += 1)
                                if (b.match(a.a.lookup[d][c].seek[e])) {
                                    f = d;
                                    break
                                }
                        }
                    return f
                },getImageSize: function(b) {
                    b.loaded = false;
                    var c = new Image;
                    c.onload = function() {
                        b.loaded = true;
                        b.height = this.height;
                        b.width = this.width
                    };
                    c.src = b.src;
                    if (b.patchedSource) {
                        c = new Image;
                        c.onload = function() {
                            b.loaded = true;
                            b.height = this.height;
                            b.width = this.width;
                            b.src = this.src
                        };
                        c.src = b.patchedSource
                    }
                    a.v.data.thumb.push(b)
                },thumbImg: function(b, c) {
                    var d, e, g, 
                    f = {src: b.src,height: b.height,width: b.width};
                    if (c)
                        f.partner = c;
                    f.domain = b.src.split("/")[2];
                    a.v.checkDomain[f.domain] = true;
                    if (d = a.f.get(b, "alt") || a.f.get(b, "title"))
                        f.description = d;
                    d = 0;
                    for (e = a.a.validDataAtt.length; d < e; d += 1)
                        if (g = a.f.getData(b, a.a.validDataAtt[d])) {
                            if (!f.suggested)
                                f.suggested = {};
                            f.suggested[a.a.validDataAtt[d]] = g
                        }
                    if (a.f.pinOkayPerSite(b))
                        if (c) {
                            if (typeof a.a.lookup[c].img.patch === "function") {
                                f.patchedSource = a.a.lookup[c].img.patch(b.src);
                                a.f.getImageSize(f)
                            }
                            if (a.a.lookup[c].img.act === 
                            "lookup") {
                                f.callback = a.v.nextCallback;
                                a.f.lookupThumb(f, a.a.lookup[c].img.link);
                                a.v.data.thumb.push(f)
                            }
                        } else
                            a.f.getImageSize(f);
                    else {
                        a.f.debug("nopin directive found locally for " + b.src);
                        f.nopin = true
                    }
                },thumbMedia: function(b, c, d) {
                    b = {source: b,partner: c,callback: a.v.nextCallback,multimedia: true};
                    a.f.lookupMedia(b, d);
                    a.v.data.thumb.push(b)
                },getPinnableTags: function() {
                    var b = ["iframe", "embed", "video", "img"], c = ["src", "src", "src", "src"], d, e, g, f, m, n, k, l, o = {};
                    e = 0;
                    for (g = b.length; e < g; e += 1) {
                        n = a.d.getElementsByTagName(b[e]);
                        m = n.length;
                        for (f = 0; f < m; f += 1) {
                            k = n[f];
                            if (!(b[e] === "img" && !a.f.hasValidSource(k))) {
                                l = k.parentNode;
                                for (d = false; l && l.tagName !== "HTML"; ) {
                                    if (l.currentStyle && l.currentStyle.display === "none" || h.getComputedStyle && h.getComputedStyle(k).getPropertyValue("display") === "none") {
                                        d = true;
                                        break
                                    }
                                    l = l.parentNode
                                }
                                if (!d)
                                    if ((l = a.f.get(k, c[e])) && !o[l]) {
                                        o[l] = true;
                                        if (d = a.f.grovel(l, b[e]))
                                            if (b[e] !== "img") {
                                                if (typeof a.a.lookup[d][b[e]].patch === "function" && a.a.lookup[d][b[e]].att && a.f.get(k, a.a.lookup[d][b[e]].att))
                                                    l = a.a.lookup[d][b[e]].patch(a.f.get(k, 
                                                    a.a.lookup[d][b[e]].att));
                                                a.f.thumbMedia(l, d, a.a.lookup[d][b[e]].via)
                                            }
                                        if (b[e] === "img")
                                            if (a.f.get(k, "nopin"))
                                                a.f.log("image_with_inline_nopin", k.src);
                                            else
                                                a.f.getData(k, "nopin") || a.f.thumbImg(k, d)
                                    }
                            }
                        }
                    }
                },checkPage: function() {
                    a.f.debug("checking page for nopins or preferences");
                    var b, c = a.f.grovel(a.d.URL, "page"), d, e, g, f;
                    if (c) {
                        a.v.pagePartner = c;
                        b = a.a.lookup[c].page;
                        if (b.act === "close") {
                            f = a.v.msg[b.msg];
                            if (typeof b.patch === "function")
                                f = b.patch(f);
                            a.v.data.close = f
                        }
                        if (b.act === "bustFrame") {
                            a.v.data.confirm = 
                            a.v.msg[c].replace(/%s%/g, b.serviceName);
                            d = 0;
                            for (e = b.frameId.length; d < e; d += 1)
                                if ((f = a.d.getElementById(b.frameId[d])) && f.tagName === "IFRAME" && f.src)
                                    a.v.data.frameBust = f.src
                        }
                        if (b.act === "lookup") {
                            a.f.debug("page lookup");
                            d = b.via === "id" ? a.a.embed + c + "/?id=" + encodeURIComponent(a.d.URL) : a.a.embed + "?" + b.via + "=" + encodeURIComponent(a.d.URL);
                            a.f.call(d, a.f.ping.preferred)
                        }
                        if (b.doNotCrawl)
                            a.v.doNotCrawl = true;
                        !a.v.data.close && typeof b.patch === "function" && b.patch(a)
                    }
                    if (!a.v.data.close && !a.v.data.confirm) {
                        d = 0;
                        for (e = 
                        a.v.meta.length; d < e; d += 1) {
                            b = a.f.get(a.v.meta[d], "name");
                            c = a.f.get(a.v.meta[d], "property");
                            g = a.f.get(a.v.meta[d], "content");
                            f = a.f.get(a.v.meta[d], "description");
                            if (b && g) {
                                if (b.toLowerCase() === "pinterest" && g.toLowerCase() === "nopin") {
                                    a.v.data.close = f || a.v.msg.noPinMeta;
                                    a.f.log("found_nopin_meta")
                                }
                                b.toLowerCase() === "pinterest-rich-pin" && g.toLowerCase() === "false" && a.f.log("found_no_rich_pin_meta")
                            }
                            if (!a.v.data.close && c && g) {
                                if (c === "og:image") {
                                    a.v.pref.og.media = g;
                                    a.f.debug("found og:image meta")
                                }
                                if (c === "og:url") {
                                    a.v.pref.og.url = 
                                    g;
                                    a.f.debug("found og:url meta")
                                }
                                if (c === "og:title") {
                                    a.v.pref.og.description = g;
                                    a.f.debug("found og:description meta")
                                }
                                if (c === "pin:media") {
                                    a.v.pref.pin.media = g;
                                    a.f.debug("found pin:image meta")
                                }
                                if (c === "pin:url") {
                                    a.v.pref.pin.url = g;
                                    a.f.debug("found pin:url meta")
                                }
                                if (c === "pin:description") {
                                    a.v.pref.pin.description = g;
                                    a.f.debug("found pin:description meta")
                                }
                            }
                        }
                    }
                },pinDefault: function(b) {
                    var c, d;
                    if (b.url && b.media) {
                        a.v.data.preferred = b;
                        a.f.debug("found preferred media");
                        if ((c = a.f.grovel(b.url, "page")) && a.a.lookup[c] && 
                        a.a.lookup[c].page) {
                            a.f.debug("have partner page from OG");
                            if (b.media && a.a.lookup[c].page.patch && typeof a.a.lookup[c].page.patch.img === "function")
                                b.media = a.a.lookup[c].page.patch.img(b.media)
                        }
                        d = {};
                        if (c)
                            d.partner = c;
                        d.src = b.media;
                        d.description = b.description || a.d.title;
                        a.f.thumbPreferred(d)
                    }
                },checkSize: function(b) {
                    var c = b.height, d = b.width, e = false;
                    if (b.extended && b.extended.img) {
                        d = b.extended.img.width;
                        c = b.extended.img.height
                    }
                    if (c > a.a.imgSizeFloor && d > a.a.imgSizeFloor)
                        if (c > a.a.imgSizeMin || d > a.a.imgSizeMin)
                            e = 
                            true;
                    return e
                },noPinnablesFound: function() {
                    a.v.data.close = a.v.msg.noPinnablesFound
                },collate: function() {
                    var b, c;
                    if (a.v.data.blacklistedDomain) {
                        a.v.data.thumb = [];
                        a.v.data.close = a.v.msg.noPinDomain;
                        a.f.log("domain_blacklisted")
                    } else if (!a.v.data.close && !a.v.data.confirm) {
                        for (b = a.v.data.thumb.length - 1; b > -1; b -= 1) {
                            c = a.v.data.thumb[b];
                            c.extended && c.extended.nopin && a.f.log("api_nopin", c.src);
                            if (!a.f.checkSize(c) || c.nopin || c.extended && c.extended.nopin || c.blacklistedImageSource)
                                a.v.data.thumb.splice(b, 1);
                            else {
                                c.url = 
                                a.d.URL;
                                c.media = c.src;
                                if (c.suggested) {
                                    if (c.suggested.url)
                                        c.url = c.suggested.url;
                                    if (c.suggested.media)
                                        c.src = c.suggested.media;
                                    if (c.suggested.description)
                                        c.description = c.suggested.description
                                }
                                if (c.extended) {
                                    if (c.extended.page)
                                        c.url = c.extended.page;
                                    if (c.extended.media)
                                        c.media = c.extended.media;
                                    if (c.extended.img && c.extended.img.src)
                                        c.src = c.extended.img.src;
                                    if (c.extended.description)
                                        c.description = c.extended.description
                                }
                            }
                        }
                        !a.v.data.thumb.length && !a.v.data.preferred && a.f.noPinnablesFound()
                    }
                    a.f.debug("done collating")
                },
                done: function() {
                    a.f.collate();
                    var b = false;
                    if (a.v.config.render && typeof a.w[a.v.config.render] === "function") {
                        a.f.debug("firing custom render callback " + a.v.config.render);
                        a.w[a.v.config.render](a.v.data);
                        b = true
                    }
                    if (a.v.data.close) {
                        a.v.config.quiet || alert(a.v.data.close);
                        a.f.close()
                    } else if (a.v.data.confirm) {
                        if (!a.v.config.quiet)
                            if (a.v.data.frameBust)
                                if (a.w.confirm(a.v.data.confirm))
                                    a.w.location = a.v.data.frameBust;
                                else
                                    a.f.close()
                    } else if (!b) {
                        a.f.debug("ready to render");
                        a.f.render()
                    }
                },ponder: function() {
                    var b, 
                    c, d;
                    if (a.v.nextCallback) {
                        b = (new Date).getTime();
                        c = function() {
                            if (a.v.nextCallback > a.v.callbacksHaveReturned) {
                                d = (new Date).getTime();
                                if (d < b + a.a.maxWait)
                                    a.w.setTimeout(function() {
                                        c()
                                    }, 100);
                                else {
                                    a.v.data.timedOut = true;
                                    a.f.debug("timed out - done looking for pinnables");
                                    a.f.done()
                                }
                            } else {
                                a.f.debug("all callbacks received - done looking for pinnables");
                                a.f.done()
                            }
                        };
                        c()
                    } else {
                        a.f.debug("no callbacks to worry about - done looking for pinnables");
                        a.f.done()
                    }
                },scaleThumb: function(b, c) {
                    var d = a.a.thumbCellSize, 
                    e = a.a.thumbCellSize, g = 0, f = 0;
                    if (b > c) {
                        d = Math.floor(a.a.thumbCellSize * (b / c));
                        f = 0 - Math.floor((d - a.a.thumbCellSize) / 2)
                    } else if (b < c) {
                        e = Math.floor(a.a.thumbCellSize * (c / b));
                        g = 0 - Math.floor((e - a.a.thumbCellSize) / 2)
                    }
                    return {height: d,width: e,top: f,left: g}
                },thumb: function(b) {
                    var c = a.f.make({SPAN: {className: a.a.k + "_thumb"}}), d, e, g, f;
                    if (b.extended && b.extended.img && b.extended.img.src) {
                        d = b.extended.img.src;
                        e = b.extended.img.height;
                        g = b.extended.img.width
                    } else {
                        d = b.src;
                        e = b.height;
                        g = b.width
                    }
                    if (!a.v.renderedThumb[d]) {
                        a.v.renderedThumb[d] = 
                        true;
                        f = a.f.scaleThumb(e, g);
                        d = a.f.make({IMG: {src: d,nopin: true,height: "" + f.height,width: "" + f.width,style: "max-width:" + f.width + "px!important;margin:" + f.top + "px 0 0 " + f.left + "px!important;height:" + f.height + "px!important;width:" + f.width + "px!important;"}});
                        c.appendChild(d);
                        e = a.f.make({SPAN: {className: a.a.k + "_info",innerHTML: g + " x " + e}});
                        if (a.v.hazIE)
                            e.className = e.className + " " + a.a.k + "_hazIE";
                        if (b.partner)
                            e.style.backgroundImage = "url(" + a.a.cdn[a.w.location.protocol] + "/images/attrib/" + b.partner + ".png)";
                        c.appendChild(e);
                        e = a.f.make({SPAN: {className: a.a.k + "_pin","data-pin-url": b.url,"data-pin-description": a.f.getSelection() || b.description || a.d.title,"data-pin-media": b.src}});
                        if (b.multimedia === true) {
                            c.appendChild(a.f.make({SPAN: {className: a.a.k + "_play"}}));
                            a.f.set(e, "data-pin-multimedia", true)
                        }
                        c.appendChild(e);
                        a.s.bd.appendChild(c)
                    }
                },contents: function() {
                    var b, c;
                    a.f.debug("rendering contents");
                    a.f.debug("rendering " + a.v.data.thumb.length + " real thumbs");
                    b = 0;
                    for (c = a.v.data.thumb.length; b < c; b += 1)
                        a.f.thumb(a.v.data.thumb[b])
                },
                presentation: function() {
                    var b, c, d;
                    b = a.f.make({STYLE: {type: "text/css"}});
                    c = a.a.cdn[a.w.location.protocol] || a.a.cdn["http:"];
                    d = a.v.css;
                    d = d.replace(/#_/g, "#" + j.k + "_");
                    d = d.replace(/\._/g, "." + j.k + "_");
                    d = d.replace(/;/g, "!important;");
                    d = d.replace(/_cdn/g, c);
                    if (b.styleSheet)
                        b.styleSheet.cssText = d;
                    else
                        b.appendChild(a.d.createTextNode(d));
                    a.d.h ? a.d.h.appendChild(b) : a.d.b.appendChild(b)
                },makeStyleFrom: function(b, c) {
                    var d, e, g, f;
                    d = "";
                    c = c || "";
                    for (g in b)
                        if (b[g].hasOwnProperty)
                            if (typeof b[g] === "string")
                                d = d + g + ": " + 
                                b[g] + "; ";
                    if (c && d)
                        a.v.css = a.v.css + c + " { " + d + "}\n";
                    for (g in b)
                        if (b[g].hasOwnProperty)
                            if (typeof b[g] === "object") {
                                d = g.split(", ");
                                for (e = 0; e < d.length; e += 1) {
                                    f = "";
                                    if (d[e].match(/^&/))
                                        d[e] = d[e].split("&")[1];
                                    else if (c)
                                        f = " ";
                                    a.f.makeStyleFrom(b[g], c + f + d[e].replace(/^\s+|\s+$/g, ""))
                                }
                            }
                },log: function(b, c, d) {
                    var e = "?page=" + encodeURIComponent(d || a.d.URL) + "&reason=" + encodeURIComponent(b);
                    if (c)
                        e = e + "&image=" + encodeURIComponent(c);
                    a.w.setTimeout(function() {
                        a.f.call(a.a.log + e, a.f.ping.log)
                    }, a.a.maxWait)
                },close: function() {
                    window.hazPinningNow = 
                    false;
                    if (a.s.bg) {
                        a.f.listen(a.d, "keydown", a.f.keydown, "detach");
                        a.f.listen(a.d, "click", a.f.click, "detach");
                        a.f.kill(a.s.shim);
                        a.f.kill(a.s.bg);
                        a.f.kill(a.s.bd);
                        a.w.scroll(0, a.v.saveScrollTop)
                    }
                },pin: function(b) {
                    var c = a.a.pin + "/" + a.a.pinMethod + "/?", d = a.f.getData(b, "multimedia"), e = a.f.getData(b, "media"), g = a.f.getData(b, "url") || a.d.URL;
                    b = a.f.getData(b, "description") || a.d.title;
                    c = c + "media=" + encodeURIComponent(e);
                    c = c + "&url=" + encodeURIComponent(g);
                    c = c + "&description=" + encodeURIComponent(b);
                    if (d)
                        c = c + "&is_video=" + 
                        d;
                    if (a.v.hazIOS)
                        a.w.location = "http://" + c;
                    else
                        a.w.open("http://" + c, "pin" + (new Date).getTime(), a.a.pop);
                    a.f.close()
                },click: function(b) {
                    b = a.f.getEl(b || a.w.event);
                    if (b === a.s.x) {
                        a.f.log("bookmarklet_cancel_click");    
                        a.f.close()
                    }
                    var c = a.f.getData(b, "url"), d = a.f.getData(b, "media");
                    if (d && c) {
                        a.f.log("bookmarklet_pin", d);
                        a.f.pin(b)
                    }
                },keydown: function(b) {
                    if (((b || a.w.event).keyCode || null) === 27) {
                        a.f.log("bookmarklet_cancel_esc");
                        a.f.close()
                    }
                },getEl: function(b) {
                    var c = null;
                    return c = b.target ? b.target.nodeType === 3 ? 
                    b.target.parentNode : b.target : b.srcElement
                },listen: function(b, c, d, e) {
                    if (e)
                        if (typeof b.removeEventListener !== "undefined")
                            b.removeEventListener(c, d, false);
                        else
                            typeof b.detachEvent !== "undefined" && b.detachEvent("on" + c, d);
                    else if (typeof a.w.addEventListener !== "undefined")
                        b.addEventListener(c, d, false);
                    else
                        typeof a.w.attachEvent !== "undefined" && b.attachEvent("on" + c, d)
                },structure: function() {
                    a.w.scroll(0, 0);
                    a.s.shim = a.f.make({IFRAME: {}});
                    a.s.shim.style.position = "absolute";
                    a.s.shim.style.zIndex = "2147483640";
                    a.s.shim.style.top = "0";
                    a.s.shim.style.left = "0";
                    a.s.shim.style.height = "100%";
                    a.s.shim.style.width = "100%";
                    a.d.b.appendChild(a.s.shim);
                    a.s.bg = a.f.make({DIV: {id: a.a.k + "_bg"}});
                    a.d.b.appendChild(a.s.bg);
                    a.s.bd = a.f.make({DIV: {id: a.a.k + "_bd"}});
                    a.s.hd = a.f.make({DIV: {id: a.a.k + "_hd"}});
                    a.f.debug("config");
                    a.f.debug(a.v.config);
                    if (a.v.config.noHeader)
                        a.s.hd.className = a.a.k + "_noHeader";
                    else {
                        a.s.bd.appendChild(a.f.make({DIV: {id: a.a.k + "_spacer"}}));
                        a.s.hd.appendChild(a.f.make({SPAN: {id: a.a.k + "_logo"}}));
                        if (a.v.config.noCancel !== 
                        true) {
                            a.s.x = a.f.make({A: {id: a.a.k + "_x",innerHTML: a.v.msg.cancelTitle}});
                            a.s.hd.appendChild(a.s.x)
                        }
                    }
                    a.s.bd.appendChild(a.s.hd);
                    a.d.b.appendChild(a.s.bd);
                    var b = a.f.getWindowHeight();
                    if (a.s.bd.offsetHeight < b) {
                        a.s.bd.style.height = b + "px";
                        a.s.bg.style.height = b + "px";
                        a.s.shim.style.height = b + "px"
                    }
                    a.f.kill("tumblr_controls")
                },render: function() {
                    a.f.contents();
                    a.f.listen(a.d, "keydown", a.f.keydown);
                    a.f.listen(a.d, "click", a.f.click);
                    a.f.log("bookmarklet_rendered")
                },getPreferred: function() {
                    var b = false;
                    if (a.v.pref.pin.media && 
                    a.v.pref.pin.url && a.v.pref.pin.description) {
                        a.f.pinDefault(a.v.pref.pin);
                        b = true
                    } else if (a.v.pref.og.media && a.v.pref.og.url && a.v.pref.og.description) {
                        a.f.pinDefault(a.v.pref.og);
                        b = true
                    }
                    return b
                },init: function() {
                    a.d.d = a.d.documentElement;
                    a.d.b = a.d.getElementsByTagName("BODY")[0];
                    a.v = {callbacksHaveReturned: 0,checkDomain: {},checkDomainDone: {},checkDomainBlacklist: {},config: {},css: "",data: {thumb: []},done: false,hazCalledForInfo: {},hazIE: false,hazIOS: false,meta: a.d.getElementsByTagName("META"),nextCallback: 0,
                        pref: {pin: {},og: {}},renderedThumb: {},saveScrollTop: a.w.pageYOffset,msg: a.a.msg.en};
                    var b = a.d.getElementsByTagName("HTML")[0].getAttribute("lang");
                    if (b) {
                        b = b.toLowerCase();
                        if (typeof a.a.msg[b] === "object")
                            a.v.msg = a.a.msg[b];
                        else {
                            b = b.split("-")[0];
                            if (typeof a.a.msg[b] === "object")
                                a.v.msg = a.a.msg[b]
                        }
                    }
                    if (a.d.b) {
                        if (/msie/i.test(a.w.navigator.userAgent) && !/opera/i.test(a.w.navigator.userAgent))
                            a.v.hazIE = true;
                        if (a.w.navigator.userAgent.match(/iP/) !== null)
                            a.v.hazIOS = true;
                        a.f.getArgs();
                        a.f.checkPage();
                        if (!a.v.config.render) {
                            if (window.hazPinningNow === 
                            true)
                                return;
                            else
                                window.hazPinningNow = true;
                            a.f.makeStyleFrom(a.a.presentation);
                            a.f.structure();
                            a.f.presentation()
                        }
                        if (a.v.config.pinMethod)
                            a.a.pinMethod = a.v.config.pinMethod;
                        if (!a.v.data.close && !a.v.data.confirm && !a.v.data.blacklistedDomain) {
                            b = a.f.getPreferred();
                            a.f.debug("page partner: " + a.v.pagePartner);
                            if (a.v.pagePartner && b && a.v.doNotCrawl)
                                a.f.debug("preferred media found on partner page " + a.v.pagePartner + ", doNotCrawl set. Not looking further");
                            else {
                                a.f.debug("getting pinnable tags");
                                a.f.getPinnableTags()
                            }
                        }
                        a.f.debug("checking for restricted domains");
                        a.f.checkDomains();
                        a.w.setTimeout(function() {
                            a.f.ponder()
                        }, 100)
                    } else {
                        a.v.data.msg = a.v.msg.noPinIncompletePage;
                        a.f.done()
                    }
                }}
        }()};
    a.f.init()
})(window, document, {maxWait: 4E3,k: "PIN_" + (new Date).getTime(),me: /pinmarklet/,log: "//api.pinterest.com/v3/callback/nopin/",checkDomain: {url: "//api.pinterest.com/v2/domains/filter_nopin/"},cdn: {"https:": "https://s-passets.pinimg.com","http:": "http://passets.pinterest.com"},maxCheckCount: 10,thumbCellSize: 200,validConfigParam: ["debug", "noCancel", "noHeader", "pinMethod", 
        "render", "quiet"],embed: "//api.pinterest.com/v3/embed/",pin: "pinterest.com/pin/create",pinMethod: "bookmarklet",dataAttributePrefix: "data-pin-",imgSizeMin: 119,imgSizeFloor: 79,validDataAtt: ["url", "media", "description"],pop: "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=632,height=270,left=0,top=0",msg: {en: {cancelTitle: "Cancel",noPinIncompletePage: "Sorry, can't pin from non-HTML pages. If you're trying to upload an image, please visit pinterest.com.",
            stumbleuponFrame: "We need to hide the %s% toolbar to pin from this page.  After pinning, you can use the back button in your browser to return to %s%. Click OK to continue or Cancel to stay here.",noPinDomain: "Sorry, pinning is not allowed from this domain. Please contact the site operator if you have any questions.",noPinMeta: "Sorry, pinning is not allowed from this page. Please contact the site operator if you have any questions.",privateDomain: "Sorry, can't pin directly from %privateDomain%.",
            noPinnablesFound: "Sorry, couldn't find any pinnable things on this page.",installed: "Sorry, no pinning from Pinterest or its subdomains."},de: {cancelTitle: "Abbrechen",noPinIncompletePage: "Es tut uns leid, aber du kannst keine Inhalte pinnen, die nicht von HTML-Seiten stammen. Falls du versuchst, ein Bild hochzuladen, gehe bitte zu pinterest.com.",stumbleuponFrame: "Wir m\u00fcssen die %s% Symbolleiste ausblenden, damit du von dieser Seite pinnen kannst. Nachdem du deine Inhalte gepinnt hast, kannst du mit der Schlatfl\u00e4che Zur\u00fcck in deinem Browser zur\u00fcck zu %s% gelangen. Klicke auf OK, um fortzufahren, oder auf Abbrechen, um auf dieser Seite zu bleiben.",
            noPinDomain: "Es tut uns leid, aber von dieser Domain kann nichts gepinnt werden. Bitte kontaktiere den Website-Betreiber, falls du weitere Fragen hast.",noPinMeta: "Es tut uns leid, aber von dieser Seite kann nichts gepinnt werden. Bitte kontaktiere den Website-Betreiber, falls du weitere Fragen hast.",privateDomain: "Es tut uns leid, aber du kannst nicht direkt von %privateDomain% pinnen",noPinnablesFound: "Es tut uns leid, aber wir konnten auf dieser Seite nichts finden, was du pinnen k\u00f6nntest.",
            installed: "Es tut uns leid, aber du kannst von Pinterest und seinen Unterdom\u00e4nen nichts pinnen."},es: {cancelTitle: "Cancelar",noPinIncompletePage: "Lo sentimos, no es posible pinear desde p\u00e1ginas que no sean HTML. Si intentas subir una imagen, visita pinterest.com.",stumbleuponFrame: "Para pinear desde esta p\u00e1gina, es necesario ocultar la barra de herramientas de %s%. Despu\u00e9s de pinear, puedes usar el bot\u00f3n de vuelta atr\u00e1s del navegador para volver a %s%. Haz clic en Aceptar para continuar o en Cancelar para permanecer aqu\u00ed.",
            noPinDomain: "Lo sentimos, no est\u00e1 permitido pinear desde este dominio. Ponte en contacto con el operador del sitio si tienes alguna pregunta.",noPinMeta: "Lo sentimos, no est\u00e1 permitido pinear desde esta p\u00e1gina. Ponte en contacto con el operador del sitio si tienes alguna pregunta.",privateDomain: "Lo sentimos, no es posible pinear directamente desde %privateDomain%.",noPinnablesFound: "Lo sentimos, no hemos encontrado ning\u00fan elemento que se pueda pinear en esta p\u00e1gina.",installed: "Lo sentimos, no es posible pinear desde Pinterest ni desde sus subdominios."},
        "es-mx": {cancelTitle: "Cancelar",noPinIncompletePage: "Lamentablemente, no es posible pinear desde p\u00e1ginas que no sean HTML. Si est\u00e1s intentando subir una imagen, accede a pinterest.com.",stumbleuponFrame: "Para poder pinear desde esta p\u00e1gina, es necesario ocultar la barra de herramientas %s%. Despu\u00e9s de pinear, usa el bot\u00f3n de flecha hacia atr\u00e1s del navegador para volver a %s%. Haz clic en Aceptar para continuar o en Cancelar para permanecer aqu\u00ed.",noPinDomain: "Lamentablemente, no est\u00e1 permitido pinear desde este dominio. Si quieres hacer consultas, comun\u00edcate con el operador del sitio.",
            noPinMeta: "Lamentablemente, no est\u00e1 permitido pinear desde esta p\u00e1gina. Si quieres hacer consultas, comun\u00edcate con el operador del sitio.",privateDomain: "Lamentablemente, no es posible pinear directamente desde %privateDomain%.",noPinnablesFound: "Lamentablemente, no se encontraron cosas para pinear en esta p\u00e1gina.",installed: "Lamentablemente, no es posible pinear desde Pinterest ni desde sus subdominios."},fr: {cancelTitle: "Annuler",noPinIncompletePage: "D\u00e9sol\u00e9, mais vous pouvez uniquement \u00e9pingler les contenus issus de pages HTML. Si vous essayez d'importer une image, acc\u00e9dez au site pinterest.com.",
            stumbleuponFrame: "Nous devons masquer la barre d'outils %s% pour \u00e9pingler des contenus \u00e0 partir de cette page. Une fois l'\u00e9pinglage effectu\u00e9, vous pourrez utiliser le bouton Retour de votre navigateur pour retourner \u00e0 %s%. Cliquez sur OK pour continuer ou sur Annuler pour rester sur cette page.",noPinDomain: "D\u00e9sol\u00e9, mais vous ne pouvez pas \u00e9pingler les contenus de ce domaine. Pour toute question, veuillez contacter l'administrateur du site.",noPinMeta: "D\u00e9sol\u00e9, mais vous ne pouvez pas \u00e9pingler les contenus de cette page. Pour toute question, veuillez contacter l'administrateur du site.",
            privateDomain: "D\u00e9sol\u00e9, mais vous ne pouvez pas \u00e9pingler directement les contenus de %privateDomain%.",noPinnablesFound: "D\u00e9sol\u00e9, mais aucun contenu susceptible d'\u00eatre \u00e9pingl\u00e9 n'a \u00e9t\u00e9 trouv\u00e9 sur cette page.",installed: "D\u00e9sol\u00e9, mais vous ne pouvez pas \u00e9pingler les contenus de Pinterest et de ses sous-domaines."},nl: {cancelTitle: "Annuleren",noPinIncompletePage: "Sorry, je kunt niet pinnen vanaf pagina's die geen of ongeldige HTML bevatten. Je kunt afbeeldingen uploaden op pinterest.com.",
            stumbleuponFrame: "We moeten de %s%-werkbalk verbergen om te kunnen pinnen vanaf deze pagina. Na het pinnen kun je met de terugknop van je browser teruggaan naar %s%. Klik op OK om door te gaan of op Annuleren om hier te blijven.",noPinDomain: "Sorry, het is niet toegestaan om vanaf dit domein te pinnen. Neem contact op met de beheerder van deze website als je vragen hebt.",noPinMeta: "Sorry, het is niet toegestaan om vanaf dit domein te pinnen. Neem contact op met de beheerder van deze website als je vragen hebt.",
            privateDomain: "Sorry, je kunt niet direct pinnen vanaf %privateDomain%.",noPinnablesFound: "Sorry, er is niets wat je kunt pinnen op deze pagina.",installed: "Sorry, je kunt niet pinnen vanaf Pinterest of een subdomein van Pinterest."},pt: {cancelTitle: "Cancelar",noPinIncompletePage: "Lamentamos, mas n\u00e3o \u00e9 poss\u00edvel afixar pins a partir de p\u00e1ginas HTML. Se est\u00e1s a tentar carregar uma imagem, acede a pinterest.com.",stumbleuponFrame: "\u00c9 necess\u00e1rio ocultar a barra de ferramentas %s% para afixar pins a partir desta p\u00e1gina.  Depois de afixares o pin, podes utilizar o bot\u00e3o Anterior do teu browser, para regressar a %s%. Clica em OK para continuar ou em Cancelar para ficar aqui.",
            noPinDomain: "Lamentamos, mas n\u00e3o \u00e9 permitido afixar pins a partir deste dom\u00ednio. Em caso de d\u00favidas, contacta o operador do site.",noPinMeta: "Lamentamos, mas n\u00e3o \u00e9 permitido afixar pins a partir desta p\u00e1gina. Em caso de d\u00favidas, contacta o operador do site.",privateDomain: "Lamentamos, mas n\u00e3o \u00e9 poss\u00edvel afixar pins diretamente de %privateDomain%.",noPinnablesFound: "Lamentamos, mas n\u00e3o foi poss\u00edvel encontrar nesta p\u00e1gina nenhum conte\u00fado que possa ser afixado.",
            installed: "Lamentamos, mas n\u00e3o \u00e9 poss\u00edvel afixar fins do Pinterest ou dos respetivos subdom\u00ednios."},"pt-br": {cancelTitle: "Cancelar",noPinIncompletePage: "N\u00e3o \u00e9 poss\u00edvel pinar a partir de p\u00e1ginas que n\u00e3o sejam HTML. Se estiver tentando fazer o upload de uma imagem, acesse pinterest.com.",stumbleuponFrame: "\u00c9 necess\u00e1rio ocultar a barra de ferramentas %s% para pinar a partir desta p\u00e1gina. Ap\u00f3s a pinagem, voc\u00ea poder\u00e1 usar o bot\u00e3o Voltar do navegador para retornar a %s%. Clique em OK para continuar ou Cancelar para permanecer aqui.",
            noPinDomain: "N\u00e3o \u00e9 poss\u00edvel pinar a partir deste dom\u00ednio. Entre em contato com o operador do site se tiver d\u00favidas.",noPinMeta: "N\u00e3o \u00e9 poss\u00edvel pinar a partir desta p\u00e1gina. Entre em contato com o operador do site se tiver d\u00favidas.",privateDomain: "N\u00e3o \u00e9 poss\u00edvel pinar diretamente de %privateDomain%.",noPinnablesFound: "N\u00e3o foi poss\u00edvel encontrar nesta p\u00e1gina conte\u00fado que possa ser pinado.",installed: "N\u00e3o \u00e9 poss\u00edvel pinar a partir do Pinterest ou de seus subdom\u00ednios."}},
    presentation: {"div#_bg": {position: "fixed",top: "0px",left: "0px",right: "0px",bottom: "0px",height: "100%",width: "100%",background: "#eee","z-index": "2147483641"},"div#_bd": {"z-index": "2147483642","text-align": "center",position: "absolute",width: "100%",top: "0",left: "0",right: "0",font: "16px hevetica neue,arial,san-serif","#_spacer": {display: "block",height: "50px"},"div#_hd": {"z-index": "2147483643","-moz-box-shadow": "0 1px 2px #aaa","-webkit-box-shadow": "0 1px 2px #aaa","box-shadow": "0 1px 2px #aaa",position: "fixed",
                "*position": "absolute",width: "100%",top: "0",left: "0",right: "0",height: "45px","line-height": "45px","font-size": "14px","font-weight": "bold",display: "block",margin: "0",background: "#fbf7f7","border-bottom": "1px solid #aaa","&._noHeader": {height: "1px","background-color": "#f2f2f2","-moz-box-shadow": "none","-webkit-box-shadow": "none","box-shadow": "none",border: "none"},"a#_x": {display: "inline-block",cursor: "pointer",color: "#524D4D","line-height": "45px","text-shadow": "0 1px #fff","float": "right","text-align": "center",
                    width: "100px","border-left": "1px solid #aaa","&:hover": {color: "#524D4D",background: "#e1dfdf","text-decoration": "none"},"&:active": {color: "#fff",background: "#cb2027","text-decoration": "none","text-shadow": "none"}},"#_logo": {height: "43px",width: "100px",display: "inline-block","margin-right": "-100px",background: "transparent url(_cdn/images/LogoRed.png) 50% 50% no-repeat",border: "none"}},"span._thumb": {height: "200px",width: "200px",display: "inline-block",background: "#fff",position: "relative","-moz-box-shadow": "0 0 2px #555",
                "-webkit-box-shadow": "0 0 2px #555","box-shadow": "0 0 2px #555",margin: "10px",overflow: "hidden","vertical-align": "top","&._fake": {background: "#eee url(_cdn/images/rotating_pin.png) 50% 50% no-repeat"},"span._pin": {position: "absolute",top: "0",left: "0",height: "100%",width: "100%",cursor: "pointer",zoom: "1","background-position": "50% 50%","background-repeat": "no-repeat","-moz-transition-property": "background-color","-moz-transition-duration": ".25s","-webkit-transition-property": "background-color","-webkit-transition-duration": ".25s",
                    "transition-property": "background-color","transition-duration": ".25s",img: {border: "none",margin: "0",padding: "0"}},"&:hover": {"span._pin": {"background-image": "url(_cdn/images/bm/button.png)","background-color": "rgba(0, 0, 0, .5)"}},"span._play": {position: "absolute",top: "0",left: "0",height: "200px",width: "200px",background: "transparent url(_cdn/images/bm/play.png) 50% 50% no-repeat"},"span._info": {position: "absolute",bottom: "0",left: "0",right: "0",width: "200px",color: "#000",height: "22px","line-height": "24px",
                    "font-size": "10px","font-style": "normal","font-weight": "normal","text-align": "center","text-shadow": "none",overflow: "hidden","background-color": "rgba(255, 255, 255, .75)","background-position": "180px 3px","background-repeat": "no-repeat","&._hazIE": {"background-color": "#eee",filter: "alpha(opacity=75)"}}}},"@media only screen and (-webkit-min-device-pixel-ratio: 2)": {"#_logo": {"background-size": "100px 26px","background-image": "url(_cdn/images/LogoRed.2x.png)"}}},lookup: {artsy: {page: {seek: [/^https?:\/\/(.*?\.|)artsy\.net\/artwork\//, 
                    /^https?:\/\/(.*?\.|)artsy\.net\/post\//]},img: {seek: [/^https?:\/\/(.*?\.|)artsy\.net\//],act: "lookup"}},behance: {img: {seek: [/^http:\/\/behance\.vo\.llnwd\.net\//],act: "lookup"}},dasauge: {img: {seek: [/^https?:\/\/cdn?[0-9]\.dasauge\.net\//],act: "lookup"}},dailymotion: {page: {seek: [/^https?:\/\/.*?\.dailymotion\.com\//],act: "lookup",via: "id",multimedia: true,doNotCrawl: true}},dreamstime: {img: {seek: [/(.*?)\.dreamstime\.com\//],act: "lookup"}},etsy: {page: {seek: [/^https?:\/\/.*?\.etsy\.com\/listing\//],patch: {img: function(h) {
                        return h.replace(/il_(.*?)\./, 
                        "il_570xN.")
                    }}},img: {seek: [/^https?:\/\/.*?\.etsystatic\.com\//],patch: function(h) {
                    return h.replace(/il_(.*?)\./, "il_570xN.")
                },act: "lookup"}},fivehundredpx: {page: {seek: [/^https?:\/\/500px\.com\/photo\//],act: "lookup",via: "id",doNotCrawl: true},img: {seek: [/pcdn\.500px\.net\//],act: "lookup"}},facebook: {page: {seek: [/^https?:\/\/(.*?\.|)facebook\.com\//],act: "close",msg: "privateDomain",patch: function(h) {
                    return h.replace(/%privateDomain%/, "Facebook")
                }}},flickr: {page: {seek: [/^https?:\/\/www\.flickr\.com\//],
                act: "lookup",via: "id",doNotCrawl: true},img: {seek: [/staticflickr.com\//, /static.flickr.com\//],act: "lookup"}},geograph: {img: {seek: [/^https?:\/\/(.*?)\.geograph\.org\./],act: "lookup"}},googleReader: {page: {seek: [/^https?:\/\/.*?\.google\.com\/reader\//],act: "close",msg: "privateDomain",patch: function(h) {
                    return h.replace(/%privateDomain%/, "Google Reader")
                }}},googleList: {page: {seek: [/^https?:\/\/www\.google\.com\/search(.*&tbm=isch.*)/],patch: function(h) {
                    h.f.debug("patching Google Image Search results");
                    var i, j, a, b, c, d;
                    if (i = h.d.getElementById("ires")) {
                        i = i.getElementsByTagName("A");
                        j = 0;
                        for (a = i.length; j < a; j += 1) {
                            d = c = "";
                            if (i[j].href) {
                                b = i[j].href.split("imgrefurl=");
                                if (b[1])
                                    c = b[1].split("&")[0];
                                b = i[j].href.split("imgurl=");
                                if (b[1])
                                    d = b[1].split("&")[0]
                            }
                            if (c && d) {
                                b = i[j].getElementsByTagName("IMG");
                                if (b[0]) {
                                    h.f.set(b[0], "data-pin-url", decodeURIComponent(c));
                                    h.f.set(b[0], "data-pin-media", decodeURIComponent(d))
                                }
                            }
                        }
                    }
                }}},imdb: {img: {seek: [/^https?:\/\/(.*?)\.media-imdb\.com\/images\//],patch: function(h) {
                    return h.replace(/@@(.*)/, 
                    "@@._V1_SX800.jpg")
                }}},kickstarter: {page: {seek: [/^https?:\/\/.*?\.kickstarter\.com\/projects\//],act: "lookup",via: "id",multimedia: true}},pinterest: {page: {seek: [/^https?:\/\/(.*?\.|)pinterest\.com\//],act: "close",msg: "installed"}},polyvore: {page: {seek: [/^https?:\/\/(.*?\.|)polyvore\.com\//],act: "lookup",via: "id",doNotCrawl: true},img: {seek: [/^https?:\/\/(.*?)\.polyvoreimg\.com\//],act: "lookup"}},shutterstock: {img: {seek: [/^https?:\/\/image.shutterstock\.com\//, /^https?:\/\/thumb(.*?).shutterstock\.com\//],
                act: "lookup"}},slideshare: {page: {seek: [/^https?:\/\/.*?\.slideshare\.net\//],act: "lookup",via: "id",multimedia: true,doNotCrawl: true}},soundcloud: {page: {seek: [/^https?:\/\/soundcloud\.com\//],act: "lookup",via: "id",multimedia: true,doNotCrawl: true}},stumbleuponFrame: {page: {seek: [/^https?:\/\/(.*?\.|)stumbleupon\.com\/su/],act: "bustFrame",serviceName: "StumbleUpon",frameId: ["tb-stumble-frame", "stumbleFrame"]}},ted: {page: {seek: [/^https?:\/\/(.*?)\.ted\.com\/talks\//],act: "lookup",via: "id",multimedia: true,
                doNotCrawl: true},img: {seek: [/^https?:\/\/(.*?)\.ted\.com\//],act: "lookup"},iframe: {seek: [/^https?:\/\/(.*?)\.ted\.com\//],act: "lookup",via: "id"}},tumblr: {img: {seek: [/^https?:\/\/.*?\.media\.tumblr\.com\//],patch: function(h) {
                    return h.replace(/_(\d+)\.jpg$/, "_1280.jpg")
                }}},tumblrList: {page: {seek: [/^https?:\/\/www\.tumblr\.com\/tagged/, /^https?:\/\/www\.tumblr\.com\/dashboard/],patch: function(h) {
                    h.f.debug("patching Tumblr search or index");
                    var i, j, a, b, c, d, e, g;
                    i = h.d.getElementsByTagName("LI");
                    j = 0;
                    for (a = 
                    i.length; j < a; j += 1) {
                        g = h.f.get(i[j], "data-tumblelog-content-rating");
                        b = i[j].getElementsByTagName("A");
                        e = "";
                        c = 0;
                        for (d = b.length; c < d; c += 1)
                            if (b[c].id && b[c].id.split("permalink_")[1]) {
                                e = b[c].href;
                                break
                            }
                        if (e) {
                            b = i[j].getElementsByTagName("IMG");
                            c = 0;
                            for (d = b.length; c < d; c += 1)
                                if (g === "adult") {
                                    h.f.set(b[c], "data-pin-nopin", true);
                                    h.f.debug("do not pin per Tumblr content rating: " + b[c].src);
                                    h.f.log("nsfw_per_domain", b[c].src, e)
                                } else
                                    h.f.set(b[c], "data-pin-url", e)
                        }
                    }
                }}},vimeo: {page: {seek: [/^https?:\/\/vimeo\.com\//],
                act: "lookup",via: "link",patch: function(h) {
                    h.f.debug("patching Vimeo page");
                    var i, j, a, b, c, d;
                    i = h.d.getElementsByTagName("LI");
                    j = 0;
                    for (a = i.length; j < a; j += 1) {
                        if (i[j].id && i[j].id.match(/^clip/)) {
                            b = i[j].id.split("clip");
                            if (b[1]) {
                                b[1] = b[1].replace(/_/, "");
                                h.f.thumbMedia("http://vimeo.com/" + b[1], "vimeo", "link")
                            }
                        } else {
                            b = i[j].getElementsByTagName("A");
                            if (b[0])
                                (b = h.f.get(b[0], "data-id")) && h.f.thumbMedia("http://vimeo.com/" + b, "vimeo", "link")
                        }
                        b = i[j].getElementsByTagName("IMG");
                        c = 0;
                        for (d = b.length; c < d; c += 1)
                            h.f.set(b[c], 
                            "data-pin-nopin", true)
                    }
                }},iframe: {seek: [/^http?s:\/\/vimeo\.com\/(\d+)/, /^http:\/\/player\.vimeo\.com\/video\/(\d+)/],act: "lookup",via: "link",patch: function(h) {
                    var i = null;
                    h = h.split("#")[0].split("?")[0].split("/").pop();
                    if (h > 1E3)
                        i = "http://vimeo.com/" + h;
                    return i
                },att: "src"}},youtube: {page: {seek: [/^https?:\/\/www\.youtube\.com\/watch/],act: "lookup",via: "link",multimedia: true,extended: true},video: {seek: [/^https?:\/\/(.*?\.|)youtube\.com\/videoplayback/],act: "lookup",via: "link",att: "data-youtube-id",
                patch: function(h) {
                    var i = null;
                    if (h)
                        i = "http://www.youtube.com/embed/" + h;
                    return i
                }},iframe: {seek: [/^https?:\/\/(.*?\.|)youtube\.com\/embed\//],act: "lookup",via: "link"},embed: {seek: [/^http:\/\/s\.ytimg\.com\/yt\//],patch: function(h) {
                    var i = null;
                    h = h.split("video_id=");
                    if (h[1]) {
                        i = h[1].split("&")[0];
                        i = "http://www.youtube.com/embed/" + i
                    }
                    return i
                },att: "flashvars"},img: {seek: [/^https?:\/\/(.*?\.|)ytimg\.com\/(vi|li)\//, /img.youtube.com\/vi\//],act: "lookup"}}}});

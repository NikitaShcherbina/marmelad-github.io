/*! jQuery SOFTFORM Plugin - v1.0 - 03/15/2018
 * https://salesof.tech
 * Copyright (c) 2018 SalesOfTech; Licensed MIT */
function logTime() {
    var e = Cookies.get("timeLog_softform");
    null == e ? Cookies.set("timeLog_softform", 1, {
        expires: 1
    }) : $("html").is(":hover") && (e++,
    Cookies.set("timeLog_softform", e, {
        expires: 1
    }))
}
!function(e) {
    var t = !1;
    if ("function" == typeof define && define.amd && (define(e),
    t = !0),
    "object" == typeof exports && (module.exports = e(),
    t = !0),
    !t) {
        var i = window.Cookies
          , s = window.Cookies = e();
        s.noConflict = function() {
            return window.Cookies = i,
            s
        }
    }
}(function() {
    function e() {
        for (var e = 0, t = {}; e < arguments.length; e++) {
            var i = arguments[e];
            for (var s in i)
                t[s] = i[s]
        }
        return t
    }
    return function t(i) {
        function s(t, n, r) {
            var a;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if ("number" == typeof (r = e({
                        path: "/"
                    }, s.defaults, r)).expires) {
                        var o = new Date;
                        o.setMilliseconds(o.getMilliseconds() + 864e5 * r.expires),
                        r.expires = o
                    }
                    r.expires = r.expires ? r.expires.toUTCString() : "";
                    try {
                        a = JSON.stringify(n),
                        /^[\{\[]/.test(a) && (n = a)
                    } catch (e) {}
                    n = i.write ? i.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    t = (t = (t = encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                    var l = "";
                    for (var h in r)
                        r[h] && (l += "; " + h,
                        !0 !== r[h] && (l += "=" + r[h]));
                    return document.cookie = t + "=" + n + l
                }
                t || (a = {});
                for (var u = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, c = 0; c < u.length; c++) {
                    var m = u[c].split("=")
                      , f = m.slice(1).join("=");
                    this.json || '"' !== f.charAt(0) || (f = f.slice(1, -1));
                    try {
                        var g = m[0].replace(d, decodeURIComponent);
                        if (f = i.read ? i.read(f, g) : i(f, g) || f.replace(d, decodeURIComponent),
                        this.json)
                            try {
                                f = JSON.parse(f)
                            } catch (e) {}
                        if (t === g) {
                            a = f;
                            break
                        }
                        t || (a[g] = f)
                    } catch (e) {}
                }
                return a
            }
        }
        return s.set = s,
        s.get = function(e) {
            return s.call(s, e)
        }
        ,
        s.getJSON = function() {
            return s.apply({
                json: !0
            }, [].slice.call(arguments))
        }
        ,
        s.defaults = {},
        s.remove = function(t, i) {
            s(t, "", e(i, {
                expires: -1
            }))
        }
        ,
        s.withConverter = t,
        s
    }(function() {})
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    e.extend(e.fn, {
        validate: function(t) {
            if (this.length) {
                var i = e.data(this[0], "validator");
                return i || (this.attr("novalidate", "novalidate"),
                i = new e.validator(t,this[0]),
                e.data(this[0], "validator", i),
                i.settings.onsubmit && (this.on("click.validate", ":submit", function(t) {
                    i.submitButton = t.currentTarget,
                    e(this).hasClass("cancel") && (i.cancelSubmit = !0),
                    void 0 !== e(this).attr("formnovalidate") && (i.cancelSubmit = !0)
                }),
                this.on("submit.validate", function(t) {
                    function s() {
                        var s, n;
                        return i.submitButton && (i.settings.submitHandler || i.formSubmitted) && (s = e("<input type='hidden'/>").attr("name", i.submitButton.name).val(e(i.submitButton).val()).appendTo(i.currentForm)),
                        !i.settings.submitHandler || (n = i.settings.submitHandler.call(i, i.currentForm, t),
                        s && s.remove(),
                        void 0 !== n && n)
                    }
                    return i.settings.debug && t.preventDefault(),
                    i.cancelSubmit ? (i.cancelSubmit = !1,
                    s()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0,
                    !1) : s() : (i.focusInvalid(),
                    !1)
                })),
                i)
            }
            t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
        },
        valid: function() {
            var t, i, s;
            return e(this[0]).is("form") ? t = this.validate().form() : (s = [],
            t = !0,
            i = e(this[0].form).validate(),
            this.each(function() {
                (t = i.element(this) && t) || (s = s.concat(i.errorList))
            }),
            i.errorList = s),
            t
        },
        rules: function(t, i) {
            var s, n, r, a, o, l, h = this[0];
            if (null != h && (!h.form && h.hasAttribute("contenteditable") && (h.form = this.closest("form")[0],
            h.name = this.attr("name")),
            null != h.form)) {
                if (t)
                    switch (s = e.data(h.form, "validator").settings,
                    n = s.rules,
                    r = e.validator.staticRules(h),
                    t) {
                    case "add":
                        e.extend(r, e.validator.normalizeRule(i)),
                        delete r.messages,
                        n[h.name] = r,
                        i.messages && (s.messages[h.name] = e.extend(s.messages[h.name], i.messages));
                        break;
                    case "remove":
                        return i ? (l = {},
                        e.each(i.split(/\s/), function(e, t) {
                            l[t] = r[t],
                            delete r[t]
                        }),
                        l) : (delete n[h.name],
                        r)
                    }
                return (a = e.validator.normalizeRules(e.extend({}, e.validator.classRules(h), e.validator.attributeRules(h), e.validator.dataRules(h), e.validator.staticRules(h)), h)).required && (o = a.required,
                delete a.required,
                a = e.extend({
                    required: o
                }, a)),
                a.remote && (o = a.remote,
                delete a.remote,
                a = e.extend(a, {
                    remote: o
                })),
                a
            }
        }
    }),
    e.extend(e.expr.pseudos || e.expr[":"], {
        blank: function(t) {
            return !e.trim("" + e(t).val())
        },
        filled: function(t) {
            var i = e(t).val();
            return null !== i && !!e.trim("" + i)
        },
        unchecked: function(t) {
            return !e(t).prop("checked")
        }
    }),
    e.validator = function(t, i) {
        this.settings = e.extend(!0, {}, e.validator.defaults, t),
        this.currentForm = i,
        this.init()
    }
    ,
    e.validator.format = function(t, i) {
        return 1 === arguments.length ? function() {
            var i = e.makeArray(arguments);
            return i.unshift(t),
            e.validator.format.apply(this, i)
        }
        : void 0 === i ? t : (arguments.length > 2 && i.constructor !== Array && (i = e.makeArray(arguments).slice(1)),
        i.constructor !== Array && (i = [i]),
        e.each(i, function(e, i) {
            t = t.replace(new RegExp("\\{" + e + "\\}","g"), function() {
                return i
            })
        }),
        t)
    }
    ,
    e.extend(e.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: e([]),
            errorLabelContainer: e([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(e) {
                this.lastActive = e,
                this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass),
                this.hideThese(this.errorsFor(e)))
            },
            onfocusout: function(e) {
                this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
            },
            onkeyup: function(t, i) {
                9 === i.which && "" === this.elementValue(t) || -1 !== e.inArray(i.keyCode, [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]) || (t.name in this.submitted || t.name in this.invalid) && this.element(t)
            },
            onclick: function(e) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
            },
            highlight: function(t, i, s) {
                "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(s) : e(t).addClass(i).removeClass(s)
            },
            unhighlight: function(t, i, s) {
                "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(s) : e(t).removeClass(i).addClass(s)
            }
        },
        setDefaults: function(t) {
            e.extend(e.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: e.validator.format("Please enter no more than {0} characters."),
            minlength: e.validator.format("Please enter at least {0} characters."),
            rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
            range: e.validator.format("Please enter a value between {0} and {1}."),
            max: e.validator.format("Please enter a value less than or equal to {0}."),
            min: e.validator.format("Please enter a value greater than or equal to {0}."),
            step: e.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function t(t) {
                    !this.form && this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0],
                    this.name = e(this).attr("name"));
                    var i = e.data(this.form, "validator")
                      , s = "on" + t.type.replace(/^validate/, "")
                      , n = i.settings;
                    n[s] && !e(this).is(n.ignore) && n[s].call(i, this, t)
                }
                this.labelContainer = e(this.settings.errorLabelContainer),
                this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm),
                this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer),
                this.submitted = {},
                this.valueCache = {},
                this.pendingRequest = 0,
                this.pending = {},
                this.invalid = {},
                this.reset();
                var i, s = this.groups = {};
                e.each(this.settings.groups, function(t, i) {
                    "string" == typeof i && (i = i.split(/\s/)),
                    e.each(i, function(e, i) {
                        s[i] = t
                    })
                }),
                i = this.settings.rules,
                e.each(i, function(t, s) {
                    i[t] = e.validator.normalizeRule(s)
                }),
                e(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", t).on("click.validate", "select, option, [type='radio'], [type='checkbox']", t),
                this.settings.invalidHandler && e(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(),
                e.extend(this.submitted, this.errorMap),
                this.invalid = e.extend({}, this.errorMap),
                this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]),
                this.showErrors(),
                this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++)
                    this.check(t[e]);
                return this.valid()
            },
            element: function(t) {
                var i, s, n = this.clean(t), r = this.validationTargetFor(n), a = this, o = !0;
                return void 0 === r ? delete this.invalid[n.name] : (this.prepareElement(r),
                this.currentElements = e(r),
                (s = this.groups[r.name]) && e.each(this.groups, function(e, t) {
                    t === s && e !== r.name && ((n = a.validationTargetFor(a.clean(a.findByName(e)))) && n.name in a.invalid && (a.currentElements.push(n),
                    o = a.check(n) && o))
                }),
                i = !1 !== this.check(r),
                o = o && i,
                this.invalid[r.name] = !i,
                this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)),
                this.showErrors(),
                e(t).attr("aria-invalid", !i)),
                o
            },
            showErrors: function(t) {
                if (t) {
                    var i = this;
                    e.extend(this.errorMap, t),
                    this.errorList = e.map(this.errorMap, function(e, t) {
                        return {
                            message: e,
                            element: i.findByName(t)[0]
                        }
                    }),
                    this.successList = e.grep(this.successList, function(e) {
                        return !(e.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                e.fn.resetForm && e(this.currentForm).resetForm(),
                this.invalid = {},
                this.submitted = {},
                this.prepareForm(),
                this.hideErrors();
                var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(t)
            },
            resetElements: function(e) {
                var t;
                if (this.settings.unhighlight)
                    for (t = 0; e[t]; t++)
                        this.settings.unhighlight.call(this, e[t], this.settings.errorClass, ""),
                        this.findByName(e[t].name).removeClass(this.settings.validClass);
                else
                    e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(e) {
                var t, i = 0;
                for (t in e)
                    void 0 !== e[t] && null !== e[t] && !1 !== e[t] && i++;
                return i
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(e) {
                e.not(this.containers).text(""),
                this.addWrapper(e).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid)
                    try {
                        e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (e) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === e.grep(this.errorList, function(e) {
                    return e.element.name === t.name
                }).length && t
            },
            elements: function() {
                var t = this
                  , i = {};
                return e(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var s = this.name || e(this).attr("name");
                    return !s && t.settings.debug && window.console && console.error("%o has no name assigned", this),
                    this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0],
                    this.name = s),
                    !(s in i || !t.objectLength(e(this).rules()) || (i[s] = !0,
                    0))
                })
            },
            clean: function(t) {
                return e(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.split(" ").join(".");
                return e(this.settings.errorElement + "." + t, this.errorContext)
            },
            resetInternals: function() {
                this.successList = [],
                this.errorList = [],
                this.errorMap = {},
                this.toShow = e([]),
                this.toHide = e([])
            },
            reset: function() {
                this.resetInternals(),
                this.currentElements = e([])
            },
            prepareForm: function() {
                this.reset(),
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(e) {
                this.reset(),
                this.toHide = this.errorsFor(e)
            },
            elementValue: function(t) {
                var i, s, n = e(t), r = t.type;
                return "radio" === r || "checkbox" === r ? this.findByName(t.name).filter(":checked").val() : "number" === r && void 0 !== t.validity ? t.validity.badInput ? "NaN" : n.val() : (i = t.hasAttribute("contenteditable") ? n.text() : n.val(),
                "file" === r ? "C:\\fakepath\\" === i.substr(0, 12) ? i.substr(12) : (s = i.lastIndexOf("/")) >= 0 ? i.substr(s + 1) : (s = i.lastIndexOf("\\")) >= 0 ? i.substr(s + 1) : i : "string" == typeof i ? i.replace(/\r/g, "") : i)
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var i, s, n, r, a = e(t).rules(), o = e.map(a, function(e, t) {
                    return t
                }).length, l = !1, h = this.elementValue(t);
                if ("function" == typeof a.normalizer ? r = a.normalizer : "function" == typeof this.settings.normalizer && (r = this.settings.normalizer),
                r) {
                    if ("string" != typeof (h = r.call(t, h)))
                        throw new TypeError("The normalizer should return a string value.");
                    delete a.normalizer
                }
                for (s in a) {
                    n = {
                        method: s,
                        parameters: a[s]
                    };
                    try {
                        if ("dependency-mismatch" === (i = e.validator.methods[s].call(this, h, t, n.parameters)) && 1 === o) {
                            l = !0;
                            continue
                        }
                        if (l = !1,
                        "pending" === i)
                            return void (this.toHide = this.toHide.not(this.errorsFor(t)));
                        if (!i)
                            return this.formatAndAdd(t, n),
                            !1
                    } catch (e) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + n.method + "' method.", e),
                        e instanceof TypeError && (e.message += ".  Exception occurred when checking element " + t.id + ", check the '" + n.method + "' method."),
                        e
                    }
                }
                if (!l)
                    return this.objectLength(a) && this.successList.push(t),
                    !0
            },
            customDataMessage: function(t, i) {
                return e(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || e(t).data("msg")
            },
            customMessage: function(e, t) {
                var i = this.settings.messages[e];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function() {
                for (var e = 0; e < arguments.length; e++)
                    if (void 0 !== arguments[e])
                        return arguments[e]
            },
            defaultMessage: function(t, i) {
                "string" == typeof i && (i = {
                    method: i
                });
                var s = this.findDefined(this.customMessage(t.name, i.method), this.customDataMessage(t, i.method), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[i.method], "<strong>Warning: No message defined for " + t.name + "</strong>")
                  , n = /\$?\{(\d+)\}/g;
                return "function" == typeof s ? s = s.call(this, i.parameters, t) : n.test(s) && (s = e.validator.format(s.replace(n, "{$1}"), i.parameters)),
                s
            },
            formatAndAdd: function(e, t) {
                var i = this.defaultMessage(e, t);
                this.errorList.push({
                    message: i,
                    element: e,
                    method: t.method
                }),
                this.errorMap[e.name] = i,
                this.submitted[e.name] = i
            },
            addWrapper: function(e) {
                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))),
                e
            },
            defaultShowErrors: function() {
                var e, t, i;
                for (e = 0; this.errorList[e]; e++)
                    i = this.errorList[e],
                    this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass),
                    this.showLabel(i.element, i.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)),
                this.settings.success)
                    for (e = 0; this.successList[e]; e++)
                        this.showLabel(this.successList[e]);
                if (this.settings.unhighlight)
                    for (e = 0,
                    t = this.validElements(); t[e]; e++)
                        this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow),
                this.hideErrors(),
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return e(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, i) {
                var s, n, r, a, o = this.errorsFor(t), l = this.idOrName(t), h = e(t).attr("aria-describedby");
                o.length ? (o.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
                o.html(i)) : (s = o = e("<" + this.settings.errorElement + ">").attr("id", l + "-error").addClass(this.settings.errorClass).html(i || ""),
                this.settings.wrapper && (s = o.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()),
                this.labelContainer.length ? this.labelContainer.append(s) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, s, e(t)) : s.insertAfter(t),
                o.is("label") ? o.attr("for", l) : 0 === o.parents("label[for='" + this.escapeCssMeta(l) + "']").length && (r = o.attr("id"),
                h ? h.match(new RegExp("\\b" + this.escapeCssMeta(r) + "\\b")) || (h += " " + r) : h = r,
                e(t).attr("aria-describedby", h),
                (n = this.groups[t.name]) && (a = this,
                e.each(a.groups, function(t, i) {
                    i === n && e("[name='" + a.escapeCssMeta(t) + "']", a.currentForm).attr("aria-describedby", o.attr("id"))
                })))),
                !i && this.settings.success && (o.text(""),
                "string" == typeof this.settings.success ? o.addClass(this.settings.success) : this.settings.success(o, t)),
                this.toShow = this.toShow.add(o)
            },
            errorsFor: function(t) {
                var i = this.escapeCssMeta(this.idOrName(t))
                  , s = e(t).attr("aria-describedby")
                  , n = "label[for='" + i + "'], label[for='" + i + "'] *";
                return s && (n = n + ", #" + this.escapeCssMeta(s).replace(/\s+/g, ", #")),
                this.errors().filter(n)
            },
            escapeCssMeta: function(e) {
                return e.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function(e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
            },
            validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name)),
                e(t).not(this.settings.ignore)[0]
            },
            checkable: function(e) {
                return /radio|checkbox/i.test(e.type)
            },
            findByName: function(t) {
                return e(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']")
            },
            getLength: function(t, i) {
                switch (i.nodeName.toLowerCase()) {
                case "select":
                    return e("option:selected", i).length;
                case "input":
                    if (this.checkable(i))
                        return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(e, t) {
                return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t)
            },
            dependTypes: {
                boolean: function(e) {
                    return e
                },
                string: function(t, i) {
                    return !!e(t, i.form).length
                },
                function: function(e, t) {
                    return e(t)
                }
            },
            optional: function(t) {
                var i = this.elementValue(t);
                return !e.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            },
            startRequest: function(t) {
                this.pending[t.name] || (this.pendingRequest++,
                e(t).addClass(this.settings.pendingClass),
                this.pending[t.name] = !0)
            },
            stopRequest: function(t, i) {
                this.pendingRequest--,
                this.pendingRequest < 0 && (this.pendingRequest = 0),
                delete this.pending[t.name],
                e(t).removeClass(this.settings.pendingClass),
                i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (e(this.currentForm).submit(),
                this.submitButton && e("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(),
                this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]),
                this.formSubmitted = !1)
            },
            previousValue: function(t, i) {
                return i = "string" == typeof i && i || "remote",
                e.data(t, "previousValue") || e.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, {
                        method: i
                    })
                })
            },
            destroy: function() {
                this.resetForm(),
                e(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : e.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var i = {}
              , s = e(t).attr("class");
            return s && e.each(s.split(" "), function() {
                this in e.validator.classRuleSettings && e.extend(i, e.validator.classRuleSettings[this])
            }),
            i
        },
        normalizeAttributeRule: function(e, t, i, s) {
            /min|max|step/.test(i) && (null === t || /number|range|text/.test(t)) && (s = Number(s),
            isNaN(s) && (s = void 0)),
            s || 0 === s ? e[i] = s : t === i && "range" !== t && (e[i] = !0)
        },
        attributeRules: function(t) {
            var i, s, n = {}, r = e(t), a = t.getAttribute("type");
            for (i in e.validator.methods)
                "required" === i ? ("" === (s = t.getAttribute(i)) && (s = !0),
                s = !!s) : s = r.attr(i),
                this.normalizeAttributeRule(n, a, i, s);
            return n.maxlength && /-1|2147483647|524288/.test(n.maxlength) && delete n.maxlength,
            n
        },
        dataRules: function(t) {
            var i, s, n = {}, r = e(t), a = t.getAttribute("type");
            for (i in e.validator.methods)
                s = r.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()),
                this.normalizeAttributeRule(n, a, i, s);
            return n
        },
        staticRules: function(t) {
            var i = {}
              , s = e.data(t.form, "validator");
            return s.settings.rules && (i = e.validator.normalizeRule(s.settings.rules[t.name]) || {}),
            i
        },
        normalizeRules: function(t, i) {
            return e.each(t, function(s, n) {
                if (!1 !== n) {
                    if (n.param || n.depends) {
                        var r = !0;
                        switch (typeof n.depends) {
                        case "string":
                            r = !!e(n.depends, i.form).length;
                            break;
                        case "function":
                            r = n.depends.call(i, i)
                        }
                        r ? t[s] = void 0 === n.param || n.param : (e.data(i.form, "validator").resetElements(e(i)),
                        delete t[s])
                    }
                } else
                    delete t[s]
            }),
            e.each(t, function(s, n) {
                t[s] = e.isFunction(n) && "normalizer" !== s ? n(i) : n
            }),
            e.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }),
            e.each(["rangelength", "range"], function() {
                var i;
                t[this] && (e.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/),
                t[this] = [Number(i[0]), Number(i[1])]))
            }),
            e.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max],
            delete t.min,
            delete t.max),
            null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength],
            delete t.minlength,
            delete t.maxlength)),
            t
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var i = {};
                e.each(t.split(/\s/), function() {
                    i[this] = !0
                }),
                t = i
            }
            return t
        },
        addMethod: function(t, i, s) {
            e.validator.methods[t] = i,
            e.validator.messages[t] = void 0 !== s ? s : e.validator.messages[t],
            i.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, i, s) {
                if (!this.depend(s, i))
                    return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var n = e(i).val();
                    return n && n.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : t.length > 0
            },
            email: function(e, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
            },
            url: function(e, t) {
                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(e)
            },
            date: function(e, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString())
            },
            dateISO: function(e, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
            },
            number: function(e, t) {
                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
            },
            digits: function(e, t) {
                return this.optional(t) || /^\d+$/.test(e)
            },
            minlength: function(t, i, s) {
                var n = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || n >= s
            },
            maxlength: function(t, i, s) {
                var n = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || n <= s
            },
            rangelength: function(t, i, s) {
                var n = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || n >= s[0] && n <= s[1]
            },
            min: function(e, t, i) {
                return this.optional(t) || e >= i
            },
            max: function(e, t, i) {
                return this.optional(t) || e <= i
            },
            range: function(e, t, i) {
                return this.optional(t) || e >= i[0] && e <= i[1]
            },
            step: function(t, i, s) {
                var n, r = e(i).attr("type"), a = "Step attribute on input type " + r + " is not supported.", o = new RegExp("\\b" + r + "\\b"), l = function(e) {
                    var t = ("" + e).match(/(?:\.(\d+))?$/);
                    return t && t[1] ? t[1].length : 0
                }, h = function(e) {
                    return Math.round(e * Math.pow(10, n))
                }, u = !0;
                if (r && !o.test(["text", "number", "range"].join()))
                    throw new Error(a);
                return n = l(s),
                (l(t) > n || h(t) % h(s) != 0) && (u = !1),
                this.optional(i) || u
            },
            equalTo: function(t, i, s) {
                var n = e(s);
                return this.settings.onfocusout && n.not(".validate-equalTo-blur").length && n.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    e(i).valid()
                }),
                t === n.val()
            },
            remote: function(t, i, s, n) {
                if (this.optional(i))
                    return "dependency-mismatch";
                n = "string" == typeof n && n || "remote";
                var r, a, o, l = this.previousValue(i, n);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}),
                l.originalMessage = l.originalMessage || this.settings.messages[i.name][n],
                this.settings.messages[i.name][n] = l.message,
                s = "string" == typeof s && {
                    url: s
                } || s,
                o = e.param(e.extend({
                    data: t
                }, s.data)),
                l.old === o ? l.valid : (l.old = o,
                r = this,
                this.startRequest(i),
                (a = {})[i.name] = t,
                e.ajax(e.extend(!0, {
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: a,
                    context: r.currentForm,
                    success: function(e) {
                        var s, a, o, h = !0 === e || "true" === e;
                        r.settings.messages[i.name][n] = l.originalMessage,
                        h ? (o = r.formSubmitted,
                        r.resetInternals(),
                        r.toHide = r.errorsFor(i),
                        r.formSubmitted = o,
                        r.successList.push(i),
                        r.invalid[i.name] = !1,
                        r.showErrors()) : (s = {},
                        a = e || r.defaultMessage(i, {
                            method: n,
                            parameters: t
                        }),
                        s[i.name] = l.message = a,
                        r.invalid[i.name] = !0,
                        r.showErrors(s)),
                        l.valid = h,
                        r.stopRequest(i, h)
                    }
                }, s)),
                "pending")
            }
        }
    });
    var t, i = {};
    return e.ajaxPrefilter ? e.ajaxPrefilter(function(e, t, s) {
        var n = e.port;
        "abort" === e.mode && (i[n] && i[n].abort(),
        i[n] = s)
    }) : (t = e.ajax,
    e.ajax = function(s) {
        var n = ("mode"in s ? s : e.ajaxSettings).mode
          , r = ("port"in s ? s : e.ajaxSettings).port;
        return "abort" === n ? (i[r] && i[r].abort(),
        i[r] = t.apply(this, arguments),
        i[r]) : t.apply(this, arguments)
    }
    ),
    e
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "../jquery.validate.min"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    return e.extend(e.validator.messages, {
        required: "Это поле необходимо заполнить.",
        remote: "Пожалуйста, введите правильное значение.",
        email: "Пожалуйста, введите корректный адрес электронной почты.",
        url: "Пожалуйста, введите корректный URL.",
        date: "Пожалуйста, введите корректную дату.",
        dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
        number: "Пожалуйста, введите число.",
        digits: "Пожалуйста, вводите только цифры.",
        creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
        equalTo: "Пожалуйста, введите такое же значение ещё раз.",
        extension: "Пожалуйста, выберите файл с правильным расширением.",
        maxlength: e.validator.format("Пожалуйста, введите не больше {0} символов."),
        minlength: e.validator.format("Пожалуйста, введите не меньше {0} символов."),
        rangelength: e.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
        range: e.validator.format("Пожалуйста, введите число от {0} до {1}."),
        max: e.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
        min: e.validator.format("Пожалуйста, введите число, большее или равное {0}.")
    }),
    e
}),
setInterval(logTime, 1e3);

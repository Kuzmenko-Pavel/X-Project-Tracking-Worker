'use strict';

// Add ECMA262-5 method binding if not supported natively
//
if (!('bind' in Function.prototype)) {
    Function.prototype.bind= function(owner) {
        var that= this;
        if (arguments.length<=1) {
            return function() {
                return that.apply(owner, arguments);
            };
        } else {
            var args= Array.prototype.slice.call(arguments, 1);
            return function() {
                return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)));
            };
        }
    };
};

// Add ECMA262-5 string trim if not supported natively
//
if (!('trim' in String.prototype)) {
    String.prototype.trim= function() {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
};

// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i /*opt*/) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;
        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
};
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf= function(find, i /*opt*/) {
        if (i===undefined) i= this.length-1;
        if (i<0) i+= this.length;
        if (i>this.length-1) i= this.length-1;
        for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
};
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach= function(action, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
};
if (!('map' in Array.prototype)) {
    Array.prototype.map= function(mapper, that /*opt*/) {
        var other= new Array(this.length);
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                other[i]= mapper.call(that, this[i], i, this);
        return other;
    };
};
if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
};
if (!('every' in Array.prototype)) {
    Array.prototype.every= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
};
if (!('some' in Array.prototype)) {
    Array.prototype.some= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
};
;function yottos_Snowball(lng) {
        function Among(s, substring_i, result, method) {
            this.s_size = s.length;
            this.s = this.toCharArray(s);
            this.substring_i = substring_i;
            this.result = result;
            this.method = method;
        }
        Among.prototype.toCharArray = function(s) {
            var sLength = s.length, charArr = new Array(sLength), i = 0;
            for (i = 0; i < sLength; i++)
                charArr[i] = s.charCodeAt(i);
            return charArr;
        }
        function SnowballProgram() {
            var current;
            return {
                b : 0,
                k : 0,
                l : 0,
                c : 0,
                lb : 0,
                s_c : function(word) {
                    current = word;
                    this.c = 0;
                    this.l = word.length;
                    this.lb = 0;
                    this.b = this.c;
                    this.k = this.l;
                },
                g_c : function() {
                    var result = current;
                    current = null;
                    return result;
                },
                i_g : function(s, min, max) {
                    if (this.c < this.l) {
                        var ch = current.charCodeAt(this.c);
                        if (ch <= max && ch >= min) {
                            ch -= min;
                            if (s[ch >> 3] & (0X1 << (ch & 0X7))) {
                                this.c++;
                                return true;
                            }
                        }
                    }
                    return false;
                },
                i_g_b : function(s, min, max) {
                    if (this.c > this.lb) {
                        var ch = current.charCodeAt(this.c - 1);
                        if (ch <= max && ch >= min) {
                            ch -= min;
                            if (s[ch >> 3] & (0X1 << (ch & 0X7))) {
                                this.c--;
                                return true;
                            }
                        }
                    }
                    return false;
                },
                o_g : function(s, min, max) {
                    if (this.c < this.l) {
                        var ch = current.charCodeAt(this.c);
                        if (ch > max || ch < min) {
                            this.c++;
                            return true;
                        }
                        ch -= min;
                        if (!(s[ch >> 3] & (0X1 << (ch & 0X7)))) {
                            this.c++;
                            return true;
                        }
                    }
                    return false;
                },
                o_g_b : function(s, min, max) {
                    if (this.c > this.lb) {
                        var ch = current.charCodeAt(this.c - 1);
                        if (ch > max || ch < min) {
                            this.c--;
                            return true;
                        }
                        ch -= min;
                        if (!(s[ch >> 3] & (0X1 << (ch & 0X7)))) {
                            this.c--;
                            return true;
                        }
                    }
                    return false;
                },
                e_s : function(s_size, s) {
                    var i;
                    if (this.l - this.c < s_size)
                        return false;
                    for (i = 0; i < s_size; i++)
                        if (current.charCodeAt(this.c + i) != s.charCodeAt(i))
                            return false;
                    this.c += s_size;
                    return true;
                },
                e_s_b : function(s_size, s) {
                    var i;
                    if (this.c - this.lb < s_size)
                        return false;
                    for (i = 0; i < s_size; i++)
                        if (current.charCodeAt(this.c - s_size + i) != s
                                .charCodeAt(i))
                            return false;
                    this.c -= s_size;
                    return true;
                },
                f_a : function(v, v_size) {
                    var i = 0, j = v_size, c = this.c, l = this.l, common_i = 0, common_j = 0, first_key_inspected = false, k,w,i2,res,diff,common;
                    while (true) {
                        k = i + ((j - i) >> 1), diff = 0, common = common_i < common_j
                                ? common_i
                                : common_j, w = v[k];
                        for (i2 = common; i2 < w.s_size; i2++) {
                            if (c + common == l) {
                                diff = -1;
                                break;
                            }
                            diff = current.charCodeAt(c + common) - w.s[i2];
                            if (diff)
                                break;
                            common++;
                        }
                        if (diff < 0) {
                            j = k;
                            common_j = common;
                        } else {
                            i = k;
                            common_i = common;
                        }
                        if (j - i <= 1) {
                            if (i > 0 || j == i || first_key_inspected)
                                break;
                            first_key_inspected = true;
                        }
                    }
                    while (true) {
                        w = v[i];
                        if (common_i >= w.s_size) {
                            this.c = c + w.s_size;
                            if (!w.method)
                                return w.result;
                            res = w.method();
                            this.c = c + w.s_size;
                            if (res)
                                return w.result;
                        }
                        i = w.substring_i;
                        if (i < 0)
                            return 0;
                    }
                },
                f_a_b : function(v, v_size) {
                    var i = 0, j = v_size, c = this.c, lb = this.lb, common_i = 0, common_j = 0, first_key_inspected = false,k,i2,w,res,diff,common;
                    while (true) {
                        k = i + ((j - i) >> 1), diff = 0, common = common_i < common_j
                                ? common_i
                                : common_j, w = v[k];
                        for (i2 = w.s_size - 1 - common; i2 >= 0; i2--) {
                            if (c - common == lb) {
                                diff = -1;
                                break;
                            }
                            diff = current.charCodeAt(c - 1 - common) - w.s[i2];
                            if (diff)
                                break;
                            common++;
                        }
                        if (diff < 0) {
                            j = k;
                            common_j = common;
                        } else {
                            i = k;
                            common_i = common;
                        }
                        if (j - i <= 1) {
                            if (i > 0 || j == i || first_key_inspected)
                                break;
                            first_key_inspected = true;
                        }
                    }
                    while (true) {
                        w = v[i];
                        if (common_i >= w.s_size) {
                            this.c = c - w.s_size;
                            if (!w.method)
                                return w.result;
                            res = w.method();
                            this.c = c - w.s_size;
                            if (res)
                                return w.result;
                        }
                        i = w.substring_i;
                        if (i < 0)
                            return 0;
                    }
                },
                r_s : function(c_bra, c_ket, s) {
                    var adjustment = s.length - (c_ket - c_bra), left = current
                            .substring(0, c_bra), right = current.substring(c_ket);
                    current = left + s + right;
                    this.l += adjustment;
                    if (this.c >= c_ket)
                        this.c += adjustment;
                    else if (this.c > c_bra)
                        this.c = c_bra;
                    return adjustment;
                },
                s_ch : function() {
                    if (this.b < 0 || this.b > this.k || this.k > this.l
                            || this.l > current.length)
                        throw ("faulty slice operation");
                },
                s_f : function(s) {
                    this.s_ch();
                    this.r_s(this.b, this.k, s);
                },
                s_d : function() {
                    this.s_f("");
                },
                i_ : function(c_bra, c_ket, s) {
                    var adjustment = this.r_s(c_bra, c_ket, s);
                    if (c_bra <= this.b)
                        this.b += adjustment;
                    if (c_bra <= this.k)
                        this.k += adjustment;
                },
                s_t : function() {
                    this.s_ch();
                    return current.substring(this.b, this.k);
                },
                e_v_b : function(s) {
                    return this.e_s_b(s.length, s);
                }
            };
        }
        var stemName, stemFactory = {
            RussianStemmer : function() {
                var a_0 = [new Among("\u0432", -1, 1),
                        new Among("\u0438\u0432", 0, 2),
                        new Among("\u044B\u0432", 0, 2),
                        new Among("\u0432\u0448\u0438", -1, 1),
                        new Among("\u0438\u0432\u0448\u0438", 3, 2),
                        new Among("\u044B\u0432\u0448\u0438", 3, 2),
                        new Among("\u0432\u0448\u0438\u0441\u044C", -1, 1),
                        new Among("\u0438\u0432\u0448\u0438\u0441\u044C", 6, 2),
                        new Among("\u044B\u0432\u0448\u0438\u0441\u044C", 6, 2)], a_1 = [
                        new Among("\u0435\u0435", -1, 1),
                        new Among("\u0438\u0435", -1, 1),
                        new Among("\u043E\u0435", -1, 1),
                        new Among("\u044B\u0435", -1, 1),
                        new Among("\u0438\u043C\u0438", -1, 1),
                        new Among("\u044B\u043C\u0438", -1, 1),
                        new Among("\u0435\u0439", -1, 1),
                        new Among("\u0438\u0439", -1, 1),
                        new Among("\u043E\u0439", -1, 1),
                        new Among("\u044B\u0439", -1, 1),
                        new Among("\u0435\u043C", -1, 1),
                        new Among("\u0438\u043C", -1, 1),
                        new Among("\u043E\u043C", -1, 1),
                        new Among("\u044B\u043C", -1, 1),
                        new Among("\u0435\u0433\u043E", -1, 1),
                        new Among("\u043E\u0433\u043E", -1, 1),
                        new Among("\u0435\u043C\u0443", -1, 1),
                        new Among("\u043E\u043C\u0443", -1, 1),
                        new Among("\u0438\u0445", -1, 1),
                        new Among("\u044B\u0445", -1, 1),
                        new Among("\u0435\u044E", -1, 1),
                        new Among("\u043E\u044E", -1, 1),
                        new Among("\u0443\u044E", -1, 1),
                        new Among("\u044E\u044E", -1, 1),
                        new Among("\u0430\u044F", -1, 1),
                        new Among("\u044F\u044F", -1, 1)], a_2 = [
                        new Among("\u0435\u043C", -1, 1),
                        new Among("\u043D\u043D", -1, 1),
                        new Among("\u0432\u0448", -1, 1),
                        new Among("\u0438\u0432\u0448", 2, 2),
                        new Among("\u044B\u0432\u0448", 2, 2),
                        new Among("\u0449", -1, 1),
                        new Among("\u044E\u0449", 5, 1),
                        new Among("\u0443\u044E\u0449", 6, 2)], a_3 = [
                        new Among("\u0441\u044C", -1, 1),
                        new Among("\u0441\u044F", -1, 1)], a_4 = [
                        new Among("\u043B\u0430", -1, 1),
                        new Among("\u0438\u043B\u0430", 0, 2),
                        new Among("\u044B\u043B\u0430", 0, 2),
                        new Among("\u043D\u0430", -1, 1),
                        new Among("\u0435\u043D\u0430", 3, 2),
                        new Among("\u0435\u0442\u0435", -1, 1),
                        new Among("\u0438\u0442\u0435", -1, 2),
                        new Among("\u0439\u0442\u0435", -1, 1),
                        new Among("\u0435\u0439\u0442\u0435", 7, 2),
                        new Among("\u0443\u0439\u0442\u0435", 7, 2),
                        new Among("\u043B\u0438", -1, 1),
                        new Among("\u0438\u043B\u0438", 10, 2),
                        new Among("\u044B\u043B\u0438", 10, 2),
                        new Among("\u0439", -1, 1),
                        new Among("\u0435\u0439", 13, 2),
                        new Among("\u0443\u0439", 13, 2),
                        new Among("\u043B", -1, 1),
                        new Among("\u0438\u043B", 16, 2),
                        new Among("\u044B\u043B", 16, 2),
                        new Among("\u0435\u043C", -1, 1),
                        new Among("\u0438\u043C", -1, 2),
                        new Among("\u044B\u043C", -1, 2),
                        new Among("\u043D", -1, 1),
                        new Among("\u0435\u043D", 22, 2),
                        new Among("\u043B\u043E", -1, 1),
                        new Among("\u0438\u043B\u043E", 24, 2),
                        new Among("\u044B\u043B\u043E", 24, 2),
                        new Among("\u043D\u043E", -1, 1),
                        new Among("\u0435\u043D\u043E", 27, 2),
                        new Among("\u043D\u043D\u043E", 27, 1),
                        new Among("\u0435\u0442", -1, 1),
                        new Among("\u0443\u0435\u0442", 30, 2),
                        new Among("\u0438\u0442", -1, 2),
                        new Among("\u044B\u0442", -1, 2),
                        new Among("\u044E\u0442", -1, 1),
                        new Among("\u0443\u044E\u0442", 34, 2),
                        new Among("\u044F\u0442", -1, 2),
                        new Among("\u043D\u044B", -1, 1),
                        new Among("\u0435\u043D\u044B", 37, 2),
                        new Among("\u0442\u044C", -1, 1),
                        new Among("\u0438\u0442\u044C", 39, 2),
                        new Among("\u044B\u0442\u044C", 39, 2),
                        new Among("\u0435\u0448\u044C", -1, 1),
                        new Among("\u0438\u0448\u044C", -1, 2),
                        new Among("\u044E", -1, 2),
                        new Among("\u0443\u044E", 44, 2)], a_5 = [
                        new Among("\u0430", -1, 1),
                        new Among("\u0435\u0432", -1, 1),
                        new Among("\u043E\u0432", -1, 1),
                        new Among("\u0435", -1, 1),
                        new Among("\u0438\u0435", 3, 1),
                        new Among("\u044C\u0435", 3, 1),
                        new Among("\u0438", -1, 1),
                        new Among("\u0435\u0438", 6, 1),
                        new Among("\u0438\u0438", 6, 1),
                        new Among("\u0430\u043C\u0438", 6, 1),
                        new Among("\u044F\u043C\u0438", 6, 1),
                        new Among("\u0438\u044F\u043C\u0438", 10, 1),
                        new Among("\u0439", -1, 1),
                        new Among("\u0435\u0439", 12, 1),
                        new Among("\u0438\u0435\u0439", 13, 1),
                        new Among("\u0438\u0439", 12, 1),
                        new Among("\u043E\u0439", 12, 1),
                        new Among("\u0430\u043C", -1, 1),
                        new Among("\u0435\u043C", -1, 1),
                        new Among("\u0438\u0435\u043C", 18, 1),
                        new Among("\u043E\u043C", -1, 1),
                        new Among("\u044F\u043C", -1, 1),
                        new Among("\u0438\u044F\u043C", 21, 1),
                        new Among("\u043E", -1, 1), new Among("\u0443", -1, 1),
                        new Among("\u0430\u0445", -1, 1),
                        new Among("\u044F\u0445", -1, 1),
                        new Among("\u0438\u044F\u0445", 26, 1),
                        new Among("\u044B", -1, 1), new Among("\u044C", -1, 1),
                        new Among("\u044E", -1, 1),
                        new Among("\u0438\u044E", 30, 1),
                        new Among("\u044C\u044E", 30, 1),
                        new Among("\u044F", -1, 1),
                        new Among("\u0438\u044F", 33, 1),
                        new Among("\u044C\u044F", 33, 1)], a_6 = [
                        new Among("\u043E\u0441\u0442", -1, 1),
                        new Among("\u043E\u0441\u0442\u044C", -1, 1)], a_7 = [
                        new Among("\u0435\u0439\u0448\u0435", -1, 1),
                        new Among("\u043D", -1, 2),
                        new Among("\u0435\u0439\u0448", -1, 1),
                        new Among("\u044C", -1, 3)], g_v = [33, 65, 8, 232], I_p2, I_pV, sbp = new SnowballProgram();
                this.setCurrent = function(word) {
                    sbp.s_c(word);
                };
                this.getCurrent = function() {
                    return sbp.g_c();
                };
                function habr3() {
                    while (!sbp.i_g(g_v, 1072, 1103)) {
                        if (sbp.c >= sbp.l)
                            return false;
                        sbp.c++;
                    }
                    return true;
                }
                function habr4() {
                    while (!sbp.o_g(g_v, 1072, 1103)) {
                        if (sbp.c >= sbp.l)
                            return false;
                        sbp.c++;
                    }
                    return true;
                }
                function r_mark_regions() {
                    I_pV = sbp.l;
                    I_p2 = I_pV;
                    if (habr3()) {
                        I_pV = sbp.c;
                        if (habr4())
                            if (habr3())
                                if (habr4())
                                    I_p2 = sbp.c;
                    }
                }
                function r_R2() {
                    return I_p2 <= sbp.c;
                }
                function habr2(a, n) {
                    var a_v, v_1;
                    sbp.k = sbp.c;
                    a_v = sbp.f_a_b(a, n);
                    if (a_v) {
                        sbp.b = sbp.c;
                        switch (a_v) {
                            case 1 :
                                v_1 = sbp.l - sbp.c;
                                if (!sbp.e_s_b(1, "\u0430")) {
                                    sbp.c = sbp.l - v_1;
                                    if (!sbp.e_s_b(1, "\u044F"))
                                        return false;
                                }
                            case 2 :
                                sbp.s_d();
                                break;
                        }
                        return true;
                    }
                    return false;
                }
                function r_perfective_gerund() {
                    return habr2(a_0, 9);
                }
                function habr1(a, n) {
                    var a_v;
                    sbp.k = sbp.c;
                    a_v = sbp.f_a_b(a, n);
                    if (a_v) {
                        sbp.b = sbp.c;
                        if (a_v == 1)
                            sbp.s_d();
                        return true;
                    }
                    return false;
                }
                function r_adjective() {
                    return habr1(a_1, 26);
                }
                function r_adjectival() {
                    if (r_adjective()) {
                        habr2(a_2, 8);
                        return true;
                    }
                    return false;
                }
                function r_reflexive() {
                    return habr1(a_3, 2);
                }
                function r_verb() {
                    return habr2(a_4, 46);
                }
                function r_noun() {
                    habr1(a_5, 36);
                }
                function r_derivational() {
                    var a_v;
                    sbp.k = sbp.c;
                    a_v = sbp.f_a_b(a_6, 2);
                    if (a_v) {
                        sbp.b = sbp.c;
                        if (r_R2() && a_v == 1)
                            sbp.s_d();
                    }
                }
                function r_tidy_up() {
                    var a_v;
                    sbp.k = sbp.c;
                    a_v = sbp.f_a_b(a_7, 4);
                    if (a_v) {
                        sbp.b = sbp.c;
                        switch (a_v) {
                            case 1 :
                                sbp.s_d();
                                sbp.k = sbp.c;
                                if (!sbp.e_s_b(1, "\u043D"))
                                    break;
                                sbp.b = sbp.c;
                            case 2 :
                                if (!sbp.e_s_b(1, "\u043D"))
                                    break;
                            case 3 :
                                sbp.s_d();
                                break;
                        }
                    }
                }
                this.stem = function() {
                    r_mark_regions();
                    sbp.c = sbp.l;
                    if (sbp.c < I_pV)
                        return false;
                    sbp.lb = I_pV;
                    if (!r_perfective_gerund()) {
                        sbp.c = sbp.l;
                        if (!r_reflexive())
                            sbp.c = sbp.l;
                        if (!r_adjectival()) {
                            sbp.c = sbp.l;
                            if (!r_verb()) {
                                sbp.c = sbp.l;
                                r_noun();
                            }
                        }
                    }
                    sbp.c = sbp.l;
                    sbp.k = sbp.c;
                    if (sbp.e_s_b(1, "\u0438")) {
                        sbp.b = sbp.c;
                        sbp.s_d();
                    } else
                        sbp.c = sbp.l;
                    r_derivational();
                    sbp.c = sbp.l;
                    r_tidy_up();
                    return true;
                }
            }}
        stemName = lng.substring(0, 1).toUpperCase()
                + lng.substring(1).toLowerCase() + "Stemmer";
        return new stemFactory[stemName]();
};
;function YottosTracker(){
    this.snowball_cache = {};
    this.y_url = window.location;
    this.parser = document.createElement('a');
    this.parser.href = this.y_url;
    this.referrer = document.referrer;
    this.parser_ref = document.createElement('a');
    this.parser_ref.href = this.referrer;
    this.title = document.title.replace(/[^a-zA-Zа-яА-Я]/g,' ').replace(/\s+$/g,'').replace(/^\s+/g,'').replace(/[\n\t\r\f\s]{2,}/g,' ');
    this.keyword_ignore = (function(){
        var yottos_o = {}, i=0, yottos_iCount, keyword_ignore = ['бол','больш','будет','будут','как','пок','коментар','будт','был','быт','вдруг','вед','впроч','всегд','всег','всех',
            'говор','главн','даж','друг','дальш','добав','есл','ест','жизн','зач','зде','иногд','кажет','кажд','как','когд','конечн','котор','куд',
            'лучш','либ','межд','мен','долж','смысл','след','чита','люб','постара','помим','числ','соб','ждат','част','использ','велик','член','некотор',
            'мног','может','можн','наконец','нег','нельз','нибуд','никогд','нич','один','опя','опубликова','перед','посл','пот','почт','разв','сво',
            'себ','сегодн','сейчас','сказа','совс','так','теб','тепер','тогд','тог','тож','тольк','хорош','хот','чег','человек','пут','вполн','возможн',
            'через','чтоб','чут','эт','позж','все','поэт','точн','этот','над','итог','недел','сведен','тем','город','гроз','зон','принят','балл','перв',
            'вход','лент','оста','мир','образ','идет','выйт','нол','сил','наш','мнен','одн','ищ','выш','взял','откр','нов','удив','всем','важн','ожида',
            'сам','ход','пущ','тег','выж','комментар','ваш','цен','коснут','слаб','ситуац','назов','уход','дол','основн','ряд','заверш','дополнен','влия',
            'описа','меньш','двум','слаб','стал','новост','отраз','вопрос','выбор','сдела','смерт','последн','поворот','высок','опозор','текст',
            'назов','основн','причин','групп','похож','with','that','this','about','above','after','again','against','because','been','before','being',
            'below','between','both','cannot','could','does','down','than','that','important','partner','border','link','text','radius','none','document',
            'height','color','title','normal','font','down','display','width','block','margin','yandex','item','type','left','padding','auto','inner',
            'function','decorati','google','position','http','align','webkit','inherit','direct','hover','referrer','write','size','math','spacing',
            'line','sizing','float','bottom','vert','charset','vertical','background','underline','visited','inline','unescape','value','style','visible',
            'address','else','true','tail','iframe','adriver','white','space','collapse','content','list','window','absolute','script','random','transparent',
            'repeat','scroll','container','piclayout','email','site','form','location','place','table','show','indent','visibility','clickable','last',
            'agewarn','opts','toggler','errormsg','getcode','href','relative','overflow','clear','cursor','outline','index','full','baseline','hide',
            'focus','catch','async','https','escape','round','target','blank','frameborder','scrolling','click','hidden','empty','cells','letter','static',
            'layout','transform','word','right','weight','warn','active','used','context','undefined','counter','page','mail','body','domain','region',
            'pointer','nowrap','family','first','data','online','push','metrika','callbacks','image','classname','protocol','init','icon','wrap','root',
            'solid','facebook','options','defaults','offset','false','return','like','opera','frames','typeof','decoration','куп','магазин','каталог'];
        yottos_iCount = keyword_ignore.length;
        for (i=0;i<yottos_iCount;i++){
            yottos_o[keyword_ignore[i]] = true;
        }
        return yottos_o;
    }());
    this.rus_Snowball = new yottos_Snowball('russian');
    this.getSW = function(word){
        var w = '';
        if (this.snowball_cache[word]){
            w = this.snowball_cache[word];
        }
        else{
            this.rus_Snowball.setCurrent(word);
            this.rus_Snowball.stem();
            w = this.rus_Snowball.getCurrent();
            this.snowball_cache[word] = w;
        }
        return w;
    }; 
    this.getText = function(){
        var result = (document.title.replace(/[^a-zA-Zа-яА-Я]/g,' ').replace(/\s+$/g,'').replace(/^\s+/g,'').replace(/[\n\t\r\f\s]{2,}/g,' ')), metas = document.getElementsByTagName('meta'),
        y,x,splitted = [],collector = {},counter = {}, key,streem_key,arr = [],sort_arr =[],out,i,sWord;
        if (metas) {
            for (x=0,y=metas.length; x<y; x++) {
                if (metas[x].name.toLowerCase() == "description") {
                    result += ' ' + (metas[x].content.replace(/[^a-zA-Zа-яА-Я]/g,' ').replace(/\s+$/g,'').replace(/^\s+/g,'').replace(/[\n\t\r\f\s]{2,}/g,' ')) + ' ';
                }
                if (metas[x].name.toLowerCase() == "keywords") {
                    result += ' ' + (metas[x].content.replace(/[^a-zA-Zа-яА-Я]/g,' ').replace(/\s+$/g,'').replace(/^\s+/g,'').replace(/[\n\t\r\f\s]{2,}/g,' ')) + ' ';
                }
            }
        }
       splitted = result.toLowerCase().split(' ');
        for (i = 0; i < splitted.length; i++) {
           key = splitted[i].replace(/^\s*/, "").replace(/\s*$/, "");
           if (key.length > 3){
                streem_key = this.getSW(key);
                if (!this.keyword_ignore[streem_key]) {
                    collector[streem_key] = key;
                    counter[streem_key] = counter[streem_key] || 0;
                    counter[streem_key]++;
                }
            }
        }
        arr = [];
        for (sWord in counter) {
            if (counter[sWord] > 1){
                arr.push({
                t: collector[sWord],
                s:sWord,
                f:counter[sWord]
                });
            }
        }
        sort_arr = arr.sort(function(a,b){return (a.f > b.f) ? -1 : ((a.f < b.f) ? 1 : 0);});
        out = [];
        for (i=0; i<sort_arr.length; i++) {
            out.push(sort_arr[i].t);
        }
        return out.join(' ');
    };
    this.rand = Math.floor(Math.random() * 1000000);
    this.iframe_id = 'yottos_remarketing' + this.rand;
    try {
        this.el = document.createElement('<iframe name='+ this.iframe_id +'>');
    } catch (ex) {
        this.el = document.createElement("iframe");
        this.el.name = this.iframe_id;
    }
    this.elf = document.createElement("form");
    this.el.id = this.iframe_id;
    this.elf.id = "f" + this.iframe_id;
    this.elf.name = "f" + this.iframe_id;
    this.elf.target = this.iframe_id;
    this.elf.method = "POST";
    this.el.style.width = '0px';
    this.el.marginHeight = '0px';
    this.el.marginWidth = '0px';
    this.el.style.height = '0px';
    this.elf.style.width = '0px';
    this.elf.style.height = '0px';
    this.elf.style.border = '0px';
    this.el.style.border = '0px';
    this.el.style.margin = '0px';
    this.elf.style.margin = '0px';
    this.el.style.display = 'none';
    this.elf.style.display = 'none';
    this.el.style.visibility = 'hidden';
    this.elf.style.visibility = 'hidden';
    this.el.style.position = 'absolute';
    this.elf.style.position = 'absolute';
    this.el.scrolling='no';
    this.el.vspace='0';
    this.el.hspace='0';
    this.el.frameborder ='0';
    this.el.allowtransparency='true';
    this.yottos_remarketing_time = typeof yottos_remarketing_time == 'number' ? yottos_remarketing_time : 365;
    this.yottos_price = typeof yottos_price == 'number' ? yottos_price : 0;
    this.yottos_gender = typeof yottos_gender == "string" ? yottos_gender : 'n';
    this.yottos_ac = typeof yottos_ac == "string" ? yottos_ac : '';
    this.yottos_remarketing_offer_id = typeof yottos_remarketing_offer_id == 'string' || typeof yottos_remarketing_offer_id == 'number' || typeof  yottos_remarketing_offer_id == 'object' ? yottos_remarketing_offer_id : undefined;
    this.yottos_exclude_offer_id = typeof yottos_exclude_offer_id == 'string' || typeof yottos_exclude_offer_id == 'number' ||typeof yottos_exclude_offer_id == 'object' ? yottos_exclude_offer_id : undefined;
    this.offer_id = typeof yottos_offer_id == 'string' || typeof yottos_offer_id == 'number' ||typeof yottos_offer_id == 'object'  ? yottos_offer_id : undefined;
    this.yottos_target = typeof yottos_target == 'string' ? yottos_target : '';
    this.yottos_action = typeof yottos_action == 'string' ? yottos_action : 'add';
    this.cid = '';
    this.getQueryVariable = function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return '';
    };
    this.getCook = function (cookiename) {
        var cookiestring= new RegExp(""+cookiename+"[^;]+").exec(document.cookie);
        return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
    };
    this.setCook = function (name, value, options) {
        options = options || {};
        if (options.expires && options.expires.toUTCString) {
            options.expires = options.expires.toUTCString();
        }
        var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (var optionKey in options) {
            if (options.hasOwnProperty(optionKey)) {
                updatedCookie += "; " + optionKey;
                var optionValue = options[optionKey];
                if (optionValue !== true) {
                  updatedCookie += "=" + optionValue;
                }
            }
        }
        document.cookie = updatedCookie;

    };
    this.isGuid = function (stringToTest) {
        if (stringToTest[0] === "{") {
            stringToTest = stringToTest.substring(1, stringToTest.length - 1);
        }
        var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
        return regexGuid.test(stringToTest);
    };
    this.load_cid = function () {
        var yt_url_cid = this.getQueryVariable('yt_cid');
        var yt_cook_cid = this.getCook('yt_cid');
        if (this.isGuid(yt_url_cid)){
            this.cid = yt_url_cid;
        }
        else {
            if (this.isGuid(yt_cook_cid)){
                this.cid = yt_cook_cid;
            }
        }
        if (this.isGuid(this.cid)){
            this.setCook('yt_cid', this.cid, {'max-age': 1800});
        }
    };
    this.strVal = function(string)
        {
            var c, n = 0, utftext = "";
            for (n = 0; n < string.length; n++) {
                    c = string.charCodeAt(n);
                    if((c > 47) && (c < 58))
                    {
                        utftext += String.fromCharCode(c);
                    }
                    else if ((c > 64) && (c < 91))
                    {
                        utftext += String.fromCharCode(c);
                    }
                    else if ((c > 96) && (c < 123))
                    {
                        utftext += String.fromCharCode(c);
                    }
                    else if ((c > 1039) && (c < 1104))
                    {
                        utftext += String.fromCharCode(c);
                    }
                    else
                    {
                        utftext += String.fromCharCode(32);
                    }
            }
            return utftext;
    };
    this.getCost = function(){
            return this.yottos_price;
    };
    this.getGender = function(){
            var g = this.yottos_gender.toLowerCase();
            if (g == 'm')
            {
                return 'm';
            }
            else if (g == 'w')
            {
                return 'w';
            }
            else
            {
                return 'n';
            }
    };
    this.getSearch = function(pars){
        var y=0, param = '', i=0, z=0, result = [], search_engines=[ 
            {"name":"Mail", "pattern":"go.mail.ru", "param":"q"}, 
            {"name":"Google", "pattern":"google.", "param":"q"}, 
            {"name":"Google", "pattern":"google.", "param":"as_q"}, 
            {"name":"Live Search", "pattern":"search.live.com", "param":"q"}, 
            {"name":"Bing", "pattern":"bing", "param":"q"}, 
            {"name":"Rambler", "pattern":"rambler.ru", "param":"query"}, 
            {"name":"Rambler", "pattern":"rambler.ru", "param":"words"}, 
            {"name":"Yahoo!", "pattern":"search.yahoo.com", "param":"p"}, 
            {"name":"Nigma", "pattern":"nigma.ru", "param":"s"}, 
            {"name":"Nigma", "pattern":"nigma.ru", "param":"q"}, 
            {"name":"MSN", "pattern":"search.msn.com", "param":"q"}, 
            {"name":"Ask", "pattern":"ask.com", "param":"q"}, 
            {"name":"QIP", "pattern":"search.qip.ru", "param":"query"}, 
            {"name":"RapidAll", "pattern":"rapidall.com", "param":"keyword"}, 
            {"name":"Яндекс.Картинки", "pattern":"images.yandex", "param":"text"}, 
            {"name":"Яндекс.Mobile", "pattern":"m.yandex", "param":"query"}, 
            {"name":"Яндекс", "pattern":"hghltd.yandex", "param":"text"}, 
            {"name":"Яндекс", "pattern":"yandex", "param":"text"},
            {"name":"УкрНет", "pattern":"ukr.net", "param":"q"},
            {"name":"УкрНет", "pattern":"ukr.net", "param":"q"},
            {"name":"meta", "pattern":"meta.ua", "param":"q"},
            {"name":"findes", "pattern":"findes.com.ua", "param":"q"}, 
            {"name":"webalta", "pattern":"webalta", "param":"q"}, 
            {"name":"bigmir", "pattern":"bigmir.net", "param":"z"}, 
            {"name":"i.ua", "pattern":"i.ua", "param":"q"}, 
            {"name":"online.ua", "pattern":"online.ua", "param":"q"}, 
            {"name":"liveinternet.ru", "pattern":"liveinternet.ru", "param":"q"}, 
            {"name":"all.by", "pattern":"all.by", "param":"query"}
            ];
            for (z=0; z<pars.length; z++)
            {
            for (i=0; i<search_engines.length; i++)
                {
                    if (-1 < pars[z].hostname.indexOf(search_engines[i]['pattern']))
                    {
                        param = pars[z].search.replace(new RegExp("\\?",'g'),"").split('&');
                        for (y=0; y<param.length; y++)
                        {
                            if (param[y].split('=')[0] == search_engines[i]['param'])
                            {
                                result.push(decodeURIComponent(param[y].split('=')[1]));
                            }
                        }
                    }
                }
            }
            return result.join(' ');
    };
    this.elfs = function(e)
    {
        var key,hiddenField, p = { url: this.y_url,
                        referrer: this.referrer,
                        title: this.title,
                        offer_id: this.offer_id,
                        time: this.yottos_remarketing_time,
                        ac: this.yottos_ac,
                        gender: this.getGender(),
                        cost: this.getCost(),
                        context: this.getText(),
                        search: this.getSearch([this.parser, this.parser_ref])
                        };
        while (e.firstChild) {
            e.removeChild(e.firstChild);
            }
        for(key in p) {
            hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", p[key]);
            e.appendChild(hiddenField);
        }
    };
    this.setOfferId = function(dyn_offer_id, action, target, offer_type)
    {
        var offer_ids = [];
        offer_type = typeof offer_type == 'string' && (offer_type == 'retargeting' || offer_type == 'exclude_advertizer') ? offer_type : 'retargeting';
        if (!(typeof dyn_offer_id == 'string' || typeof dyn_offer_id == 'number' || dyn_offer_id instanceof Array))
        {
            if (typeof this.yottos_remarketing_offer_id != 'undefined')
            {
                dyn_offer_id = this.yottos_remarketing_offer_id;
                offer_type = 'remarketing'; 
            }
            else if (typeof this.yottos_remarketing_offer_id == 'undefined' && typeof this.yottos_exclude_offer_id != 'undefined')
            {
                dyn_offer_id = this.yottos_exclude_offer_id;
                offer_type = 'exclude_advertizer'; 
            }
            else
            {
                offer_type = 'remarketing'; 
                if (typeof product != 'undefined')
                {
                    if (typeof product.identifier != 'undefined')
                    {
                        dyn_offer_id = product.identifier;
                    }
                }
                if (typeof google_tag_params != 'undefined')
                {
                    if (typeof google_tag_params.ecomm_prodid != 'undefined')
                    {
                        dyn_offer_id = google_tag_params.ecomm_prodid;
                    }
                }
                if (dyn_offer_id === undefined)
                {
                    dyn_offer_id = ''
                }
            }
        }
        action = typeof action == 'string' && (action == 'add' || action == 'remove') ? action : this.yottos_action;
        target = typeof target == 'string' ? target : this.yottos_target; 
        if ( typeof dyn_offer_id == 'string')
        {
            offer_ids = dyn_offer_id.replace(new RegExp("\\|","g"),',').split(',');
        }
        else if ( typeof dyn_offer_id == 'number')
        {
            offer_ids = [dyn_offer_id.toString(),];
        }
        else if (dyn_offer_id instanceof Array)
        {
            offer_ids = dyn_offer_id;
        }
        offer_ids = offer_ids.map(function(id) {
             if ( typeof id == 'string')
             {
                return id;
             }
             else if ( typeof id == 'number')
             {
                return id.toString();
             }
             else
             {
                return '';
             }
        }
        );
        offer_ids = offer_ids.map(function(id) {
            return action + '~' + id + '~' + target + '~' + offer_type;
        }
        );
        this.offer_id = offer_ids.join(',');
    };
    this.get_utm = function()
    {
        var a, b, utm = ['',], source = '', medium = '', campaign = '', term = '', content = '', q = this.parser.search;
        q = q.substring(1,q.length);
        q = q.split('&');
        for(a in q) {
         if (q.hasOwnProperty(a)){
          b = q[a].split('=');
          if(b[0] == 'utm_source' ) {
              if (source.length == 0 )
              {
                source = b[1];
              }
          }
          if(b[0] == 'utm_medium' ) {
              if (medium.length == 0 )
              {
                medium = b[1];
              }
          }
          if(b[0] == 'utm_campaign' ) {
              if (campaign.length == 0 )
              {
                campaign = b[1];
              }
          }
          if(b[0] == 'utm_term' ) {
              if (term.length == 0 )
              {
                term = b[1];
              }
          }
          if(b[0] == 'utm_content' ) {
              if (content.length == 0 )
              {
                content = b[1];
              }
          }
         }
        }
        q = this.parser_ref.search;
        q = q.substring(1,q.length);
        q = q.split('&');
        for(a in q) {
         if (q.hasOwnProperty(a)){
          b = q[a].split('=');
          if(b[0] == 'utm_source' ) {
              if (source.length == 0 )
              {
                source = b[1];
              }
          }
          if(b[0] == 'utm_medium' ) {
              if (medium.length == 0 )
              {
                medium = b[1];
              }
          }
          if(b[0] == 'utm_campaign' ) {
              if (campaign.length == 0 )
              {
                campaign = b[1];
              }
          }
          if(b[0] == 'utm_term' ) {
              if (term.length == 0 )
              {
                term = b[1];
              }
          }
          if(b[0] == 'utm_content' ) {
              if (content.length == 0 )
              {
                content = b[1];
              }
          }
         }
        }
        if (source.length > 0)
        {
            utm.push('utm_source='+source);
        }
        if (medium.length > 0)
        {
            utm.push('utm_medium='+medium);
        }
        if (campaign.length > 0)
        {
            utm.push('utm_campaign='+campaign);
        }
        if (term.length > 0)
        {
            utm.push('utm_term='+term);
        }
        if (content.length > 0)
        {
            utm.push('utm_content='+content);
        }
        return utm.join('&');
    };
    this.query = function()
    {
        return '?rand=' + this.rand + this.get_utm();
    };
    this.elf.action = 'http://0.0.0.0:10000/track.fcgi' + this.query();
    this.send = function(){
        ;if (document.body != null)
        {
            if(window.yhhIntervalID)
            {
                clearInterval(window.yhhIntervalID);
                window.yhhIntervalID = false;
            }
            ;document.body.appendChild(this.elf);
            ;document.body.appendChild(this.el);
            this.elfs(this.elf)
            ;document.forms[this.elf.id].submit();
        }
        else
        {
            if(window.yhhIntervalID == null)
            {
                 window.yhhIntervalID = setInterval(
                         (function(self) {
                             return function() {
                                 self.send();
                             }
                         })(this),
                         2000
                         ); 
            }
        }
    };
    this.revent = function(id, action, target){
        this.setOfferId(id, action, target, 'retargeting')
        this.send();
    };
    this.aevent = function(id, action, target){
        this.setOfferId(id, action, target, 'exclude_advertizer')
        this.send();
    };
    this.event = this.revent;
    this.start = function(){
        this.setOfferId();
        this.send();
        this.load_cid();
    };
    this.goal = function (price, currency) {
        currency = currency || 'UAH';
        currency = currency + '';
        if (currency.length !== 3){
            currency = 'UAH';
        }
        price = price || '0';
        price = price + '';
        var i = new Image();
        i.src = 'https://rg.yottos.com/pixel/track.png?id=' + this.yottos_ac + '&price=' + price + '&currency=' + currency + '&action=goal&cid=' + this.cid;
    };
};

window.yhhIntervalID = window.yhhIntervalID || null;
(window.ytt = window.ytt || new YottosTracker()).start();

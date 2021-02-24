!function (e) {
    var t = {};
    function r(n) {
        if (t[n]) return t[n].exports;
        var l = t[n] = { i: n, l: !1, exports: {} };
        return e[n].call(l.exports, l, l.exports, r), l.l = !0, l.exports
    }
    r.m = e, r.c = t, r.d = function (e, t, n) { r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n }) },
        r.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
                Object.defineProperty(e, "__esModule", { value: !0 })
        },
        r.t = function (e, t) {
            if (1 & t && (e = r(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null); if (r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
                for (var l in e) r.d(n, l, function (t) { return e[t] }.bind(null, l)); return n
        },
        r.n = function (e) {
            var t = e && e.__esModule ? function () { return e.default } : function () { return e };
            return r.d(t, "a", t), t
        }, r.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, r.p = "",
        r(r.s = 0)
}([function (e, t, r) {
    const n = r(1), l = r(3); r(6),
        window.CrosswordsJS = { compileCrossword: n, CrosswordDOM: l },
        e.exports = window.CrosswordsJS
},
function (e, t, r) {
    const n = r(2);
    e.exports = function (e) {
        if (!e) throw new Error("The Crossword must be initialised with a crossword definition.");
        const t = { width: e.width, height: e.height, acrossClues: [], downClues: [], cells: [] };
        if (void 0 === t.width || null === t.width || t.width < 0 || void 0 === t.height || null === t.height || t.height < 0) throw new Error("The crossword bounds are invalid.");
        t.cells = function (e) {
            const t = e.width, r = e.height, n = new Array(t);
            for (let t = 0; t < r; t++) {
                n[t] = new Array(r);
                for (let l = 0; l < r; l++)n[t][l] = { crossword: e, x: t, y: l }
            } return n
        }(t);
        const r = e.acrossClues.concat(e.downClues);
        for (let l = 0; l < r.length; l++) {
            const s = r[l], o = l < e.acrossClues.length, c = n(s.clue);
            if (c.code = c.number + (o ? "a" : "d"), c.answer = s.answer, c.x = s.x - 1, c.y = s.y - 1, c.across = o, c.cells = [], t[o ? "acrossClues" : "downClues"].push(c), c.x < 0 || c.x >= t.width || c.y < 0 || c.y >= t.height) throw new Error(`Clue ${c.code} doesn't start in the bounds.`);
            if (o) {
                if (c.x + c.totalLength > t.width) throw new Error(`Clue ${c.code} exceeds horizontal bounds.`)
            } else if (c.y + c.totalLength > t.height) throw new Error(`Clue ${c.code} exceeds vertical bounds.`);
            let { x: a } = c, { y: u } = c;
            for (let e = 0; e < c.totalLength; e++) {
                const r = t.cells[a][u];
                if (r.light = !0, r[o ? "acrossClue" : "downClue"] = c, r[o ? "acrossClueLetterIndex" : "downClueLetterIndex"] = e, c.cells.push(r), c.answer) {
                    if (void 0 !== r.answer && " " !== r.answer && r.answer !== c.answer[e]) throw new Error(`Clue ${c.code} answer at (${a + 1}, ${u + 1}) is not coherent with previous clue (${r.acrossClue.code}) answer.`);
                    r.answer = c.answer[e]
                } if (0 === e) { if (r.clueLabel && r.clueLabel !== c.number) throw new Error(`Clue ${c.code} has a label which is inconsistent with another clue (${r.acrossClue.code}).`); r.clueLabel = c.number } o ? a++ : u++
            }
        } return t
    }
},
function (e, t) {
    const r = new RegExp(/^(\d+).[\s]*(.*)[\s]*\(([\d,-]+)\)$/);
    e.exports = function (e) {
        if (!e) throw new Error("'clue' is required");
        if (!r.test(e)) throw new Error(`Clue '${e}' does not meet the required structured '<Number>. Clue Text (<Answer structure>)'`);
        const [, t, n, l] = r.exec(e), s = parseInt(t, 10), o = [], c = new RegExp(/([\d]+)([,-]?)(.*)/); let a = l;
        for (; c.test(a);) {
            const [, e, t, r] = c.exec(a);
            o.push({ length: parseInt(e, 10), terminator: t }), a = r
        }
        const u = o.reduce((e, t) => e + t.length, 0), i = `(${o.map(e => `${e.length}${e.terminator}`).join("")})`;
        return { number: s, clue: n, answerStructure: o, answerStructureText: i, totalLength: u }
    }
},
function (e, t, r) {
    const n = r(4),
        { removeClass: l, addClass: s } = r(5), o = new n;
    function c(e, t) {
        let r = t;
        for (let t = 0; t < e.length; t++) {
            if (r <= e[t].length) return [e[t], r]; r -= e[t].length
        }
    }
    function a(e, t, r) {
        const { document: n } = e; this.crossword = t, this.parentElement = r; const l = n.createElement("div"); l.className = "crossword"; for (let e = 0; e < t.height; e++) { const r = n.createElement("div"); r.className = "cwrow", l.appendChild(r); for (let l = 0; l < t.width; l++) { const s = t.cells[l][e], c = this._createCellDOM(n, s); r.appendChild(c), o.add(s, c) } } const s = e => { const t = e.children[0].children[0].clientWidth; e.style.fontSize = `${.6 * t}px` }; e.addEventListener("resize", () => s(l)), r.appendChild(l), s(l), this.updateFontSize = () => s(l), this.crosswordElement = l
    }
    a.prototype.selectClue = function (e) {
        this.currentClue = e,
            this._updateDOM(),
            o.getCellElement(e.cells[0]).focus(),
            this._stateChange("clueSelected")
    },
        a.prototype.destroy = function () {
            o.removeCrosswordCells(this.crossword),
                this.parentElement.removeChild(this.crosswordElement),
                this.onStateChanged = null
        },
        a.prototype._stateChange = function (e, t) {
            const r = this.onStateChanged;
            r && r({ message: e, data: t })
        },
        a.prototype._createCellDOM = function (e, t) {
            const r = this, n = e.createElement("div");
            if (n.className = "cwcell", t.cellElement = n, n.className += t.light ? " light" : " dark", !t.light) return n;
            const l = e.createElement("input");
            if (l.maxLength = 1, t.answer && (l.value = t.answer), n.appendChild(l), t.clueLabel) {
                const r = e.createElement("div");
                r.className = "cwcluelabel",
                    r.innerHTML = t.clueLabel, n.appendChild(r)
            }
            const { acrossClue: s, acrossClueLetterIndex: a, downClue: u, downClueLetterIndex: i } = t;
            if (t.acrossClue) {
                const [t, r] = c(s.answerStructure, a);
                if (r === t.length - 1 && "" !== t.terminator) if ("," === t.terminator) n.className += " cw-across-word-separator";
                else { const r = e.createElement("div"); r.className = "cw-across-terminator", r.innerHTML = t.terminator.replace(",", "|"), n.appendChild(r) }
            }
            if (t.downClue) {
                const [t, r] = c(u.answerStructure, i);
                if (r === t.length - 1 && "" !== t.terminator)
                    if ("," === t.terminator) n.className += " cw-down-word-separator";
                    else {
                        const r = e.createElement("div"); r.className = "cw-down-terminator", r.innerHTML = t.terminator.replace(",", "|"), n.appendChild(r)
                    }
            }
            return l.addEventListener("focus", e => {
                const t = e.target.parentNode, n = o.getCell(t), { crossword: l } = n, s = n.acrossClue, c = n.downClue; (!r.currentClue || r.currentClue !== s && r.currentClue !== c) && (r.currentClue = s && !c || !s && c ? s || c : 0 === n.downClueLetterIndex && 0 !== n.acrossClueLetterIndex ? c : s, r._updateDOM(), r._stateChange("clueSelected"))
            }), n.addEventListener("keydown", e => {
                if (8 === e.keyCode) {
                    e.preventDefault(), e.target.value = ""; var t = e.target.parentNode; const l = ((n = o.getCell(t)).acrossClue === r.currentClue ? n.acrossClueLetterIndex : n.downClueLetterIndex) - 1; l >= 0 && r.currentClue.cells[l].cellElement.querySelector("input").focus()
                } else if (9 === e.keyCode) {
                    e.preventDefault();
                    t = e.target.parentNode;
                    var n = o.getCell(t), { crossword: l } = n;
                    const s = r.currentClue, c = s.across ? l.acrossClues : l.downClues;
                    for (let t = 0; t < c.length; t++)
                        if (s === c[t]) {
                            let n = null;
                            n = e.shiftKey ? t > 0 ? c[t - 1] : s.across ? l.downClues[l.downClues.length - 1] : l.acrossClues[l.acrossClues.length - 1] : t < c.length - 1 ? c[t + 1] : s.across ? l.downClues[0] : l.acrossClues[0],
                                r.currentClue = n,
                                r._updateDOM(),
                                o.getCellElement(n.cells[0]).querySelector("input").focus(); break
                        }
                }
                else if (13 === e.keyCode) {
                    e.preventDefault(); t = e.target.parentNode, n = o.getCell(t);
                    var { crossword: l } = n; n.acrossClue && n.downClue && (r.currentClue = n.acrossClue === r.currentClue ? n.downClue : n.acrossClue, r._updateDOM())
                }
            }), n.addEventListener("keypress", e => {
            32 === e.keyCode && e.preventDefault(), e.target.value = "";
                const t = e.target.parentNode, n = o.getCell(t), { crossword: l } = n, s = r.currentClue;
                function c(e, t, r) {
                    let n = null == e ? "" : e, l = "";
                    for (; n.length <= t;)n += " ";
                    const s = Math.max(t, n.length);
                    for (let e = 0; e < s; e++)l += e == t ? r : n[e];
                    return l
                }
                const a = String.fromCharCode(e.keyCode);
                n.acrossClue && (n.acrossClue.answer = c(n.acrossClue.answer, n.acrossClueLetterIndex, a)), n.downClue && (n.downClue.answer = c(n.downClue.answer, n.downClueLetterIndex, a));
                const u = (n.acrossClue === s ? n.acrossClueLetterIndex : n.downClueLetterIndex) + 1;
                u < s.cells.length && s.cells[u].cellElement.querySelector("input").focus()
            }), n.addEventListener("keyup", e => { switch (e.keyCode) { case 37: var t = e.target.parentNode, r = o.getCell(t), { x: n } = r, { y: l } = r; r.x > 0 && !0 === r.crossword.cells[n - 1][l].light && o.getCellElement(r.crossword.cells[n - 1][l]).querySelector("input").focus(); break; case 38: t = e.target.parentNode, r = o.getCell(t); var { x: n } = r, { y: l } = r; r.y > 0 && !0 === r.crossword.cells[n][l - 1].light && o.getCellElement(r.crossword.cells[n][l - 1]).querySelector("input").focus(); break; case 39: t = e.target.parentNode, r = o.getCell(t); var { width: s } = r.crossword, { x: n } = r, { y: l } = r; r.x + 1 < s && !0 === r.crossword.cells[n + 1][l].light && o.getCellElement(r.crossword.cells[n + 1][l]).querySelector("input").focus(); break; case 40: t = e.target.parentNode, r = o.getCell(t); var { height: c } = r.crossword, { x: n } = r, { y: l } = r; r.y + 1 < c && !0 === r.crossword.cells[n][l + 1].light && o.getCellElement(r.crossword.cells[n][l + 1]).querySelector("input").focus() } }), n
        }, a.prototype._updateDOM = function () { const e = this.currentClue, { crossword: t } = this; for (let r = 0; r < t.cells.length; r++)for (let n = 0; n < t.cells[r].length; n++) { const c = t.cells[r][n]; !0 === c.light && (c.acrossClue === e || c.downClue === e ? s(o.getCellElement(c).querySelector("input"), "active") : l(o.getCellElement(c).querySelector("input"), "active")) } }, e.exports = a
}, function (e, t) { function r() { this.map = [] } r.prototype.add = function (e, t) { this.map.push({ cell: e, cellElement: t }) }, r.prototype.getCellElement = function (e) { for (let t = 0; t < this.map.length; t++)if (this.map[t].cell === e) return this.map[t].cellElement; return null }, r.prototype.getCell = function (e) { for (let t = 0; t < this.map.length; t++)if (this.map[t].cellElement === e) return this.map[t].cell; return null }, r.prototype.removeCrosswordCells = function (e) { for (let t = 0; t < this.map.length; t++)this.map[t].cell.crossword === e && this.map.splice(t, 1) }, e.exports = r }, function (e, t) { e.exports = { removeClass: function (e, t) { const r = new RegExp(`(?:^|\\s)${t}(?!\\S)`, "g"); e.className = e.className.replace(r, "") }, addClass: function (e, t) { e.className += ` ${t}` } } }, function (e, t, r) { }]);
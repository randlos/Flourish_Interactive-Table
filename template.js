var template = function (e) {
    "use strict";
    var r = {
            zeilenOn: !0,
            hauptzeile: "Hauptzeile",
            unterzeile: "Unterzeile",
            hauptzeilen_font_size: "2.625rem",
            unterzeilen_font_size: "1.5rem",
            hauptzeilen_height: "2.800rem",
            unterzeilen_height: "1.850rem",
            sortingColumn: "A",
            sortingOrder: "asc",
            numberOfEntries: 10,
            reload: 1,
            layout: "pitr",
            yscroll: "500px",
            headerColor: "#dadada",
            headerSortingColor: "#000000",
            Haupt_Farbe: "green",
            Green: "#6CBA6C",
            darkGreen: "#45891B",
            Blue: "#42A8CC",
            darkBlue: "#036E93",
            Background_Transparent: "transparent",
            Background_Color_Haupt_opacity: "rgba(211, 45, 32, 0.5)",
            cdu_csu_farbe: "#143d4b",
            cdu_farbe: "#162129",
            csu_farbe: "#1782d1",
            spd_farbe: "#e0341f",
            afd_farbe: "#00b8e3",
            fdp_farbe: "#f4d50b",
            gruene_farbe: "#3bae53",
            dielinke_farbe: "#a00163",
            sonstige_parteien_farbe: "#c5cad0",
            nichtwahler_farbe: "#dce1e0",
            suchfeld: "pitr",
            search_column: "B",
            quelle: "| Quelle: ",
            imgsize_h: 200,
            imgsize_w: 200,
            bar_switch: !0,
            bar_column: "B"
        },
        n = {};

    function t() {
        let e = n.Data;

        function t(e) {
            let r, n = [],
                t = [{
                    number: 1,
                    string: "A"
                }, {
                    number: 2,
                    string: "B"
                }, {
                    number: 3,
                    string: "C"
                }, {
                    number: 4,
                    string: "D"
                }, {
                    number: 5,
                    string: "E"
                }, {
                    number: 6,
                    string: "F"
                }, {
                    number: 7,
                    string: "G"
                }, {
                    number: 8,
                    string: "H"
                }, {
                    number: 9,
                    string: "I"
                }, {
                    number: 10,
                    string: "J"
                }, {
                    number: 11,
                    string: "K"
                }, {
                    number: 12,
                    string: "L"
                }, {
                    number: 13,
                    string: "M"
                }, {
                    number: 14,
                    string: "N"
                }, {
                    number: 15,
                    string: "O"
                }, {
                    number: 16,
                    string: "P"
                }, {
                    number: 17,
                    string: "Q"
                }, {
                    number: 18,
                    string: "R"
                }, {
                    number: 19,
                    string: "S"
                }, {
                    number: 20,
                    string: "T"
                }, {
                    number: 21,
                    string: "U"
                }, {
                    number: 22,
                    string: "V"
                }, {
                    number: 23,
                    string: "W"
                }, {
                    number: 24,
                    string: "X"
                }, {
                    number: 25,
                    string: "Y"
                }, {
                    number: 26,
                    string: "Z"
                }];
            if (!isNaN(e)) return console.log(e), e;
            if (e.length > 1) {
                let r = e.split(","),
                    n = [];
                for (let e = 0; e < r.length; e++)
                    for (let a = 0; a < t.length; a++) r[e] == t[a].string && n.push(t[a].number - 1);
                return n
            }
            if ("object" == typeof e) {
                for (let r in e) {
                    let a;
                    for (a = 0; a < t.length; a++) t[a].string == e[r] && n.push(t[a].number - 1)
                }
                return n
            } {
                let n;
                for (n = 0; n < t.length; n++)
                    if (t[n].string == e) return r = t[n].number - 1
            }
        }
        $("#myTable").dataTable({
            data: n.Data.map(e => e.values),
            responsive: {
                details: {
                    type: "inline",
                    target: 0
                }
            },
            colReorder: {
                enable: !0
            },
            dom: r.layout,
            columnDefs: [{
                targets: 0,
                data: 0,
                render: function (e, n, t, a) {
                    return e.indexOf("https://") > -1 ? '<img src="' + e + '"height="' + r.imgsize_h + '"width="' + r.imgsize_w + '">' : e
                }
            }, {
                targets: t(r.bar_column),
                render: function (n, t, a, i) {
                    let l = function (r) {
                            let n = r,
                                t = e,
                                a = new Array;
                            return t.forEach(function (e, r, t) {
                                let i = e.values.slice(n)[0];
                                a.push(i)
                            }), Math.max.apply(Math, a)
                        }(i.col),
                        u = function (r) {
                            let n = r,
                                t = e,
                                a = new Array;
                            return t.forEach(function (e, r, t) {
                                let i = e.values.slice(n)[0];
                                a.push(i)
                            }), Math.min.apply(Math, a)
                        }(i.col),
                        s = (n - u + 1) / (l - u) * 90;
                    if (r.bar_switch || r.bar_column > 0) {
                        if (isNaN(n)) return n;
                        return '<div class="barcont">' + ('<div class="bardiv"> <span class="bar" style="height:20px;width:' + s + '%; background: #DD0000"></span></div>') + ('<div class="bartext"><p style="color:#000000">' + n + "</p></div>") + "</div>"
                    }
                    return n
                }
            }],
            paging: !1,
            scrollY: r.yscroll,
            pageLength: r.numberOfEntries,
            order: [t(r.sortingColumn), r.sortingOrder],
            columns: function () {
                let e = [];
                for (var r = 0; r < n.Data.column_names.values.length; r++) e.push({
                    title: n.Data.column_names.values[r]
                });
                return e
            }(),
            language: {
                url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/German.json"
            },
            drawCallback: function (e) {
                $(".dataTables_scrollHead").css("background", r.headerColor)
            }
        });
        $("#mySearch").on("keyup", function () {
            let e = r.search_column.length - 1;
            console.log(e), e <= 1 ? $("#myTable").DataTable().columns(t(r.search_column)).search(this.value).draw() : $("#myTable").DataTable().search(this.value).draw()
        }), "t" == r.layout && $("#mySearch").remove(), 1 == r.zeilenOn && ($("#hauptzeile").text(r.hauptzeile), $("#unterzeile").text(r.unterzeile), $("#hauptzeile").css("font-size", r.hauptzeilen_font_size), $("#unterzeile").css("font-size", r.unterzeilen_font_size), $("#hauptzeile").css("line-height", r.hauptzeilen_height), $("#unterzeile").css("line-height", r.unterzeilen_height)), r.quelle && $("#quelle").text(r.quelle), $("iframe[name='preview']").each(function () {
            this.sandbox += " allow-modals"
        })
    }
    return e.state = r, e.data = n, e.draw = function () {
        t()
    }, e.update = t, e
}({});
//# sourceMappingURL=template.js.map
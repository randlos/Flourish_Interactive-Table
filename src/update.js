import state from "./state";
import data from "./data";
import * as transform from "./helper/values";
import * as stats from "./helper/stats";
import * as options from "./helper/options";
import * as viz from "./helper/viz";


function update() {

    function rm_zeile_height(height) {

        // Get zeilen_height while creating zeilen in zeilen():553 / If recieved in this. function, the DOM isn't fully loaded yet 
        let zeilen_height = zeilen();
        let search_height = document.getElementById("search").clientHeight;
        let quelle_height = document.getElementById("quelle").clientHeight;
        let table_height = parseInt(height) - zeilen_height - search_height - quelle_height + "px";
        return table_height;
    }

    let table = $('#myTable').dataTable({
        data: data.Data.map(e => e.values),
        responsive: {
            details: {
                type: 'inline',
                target: 0,
                // display: $.fn.dataTable.Responsive.display.modal( {
                //     header: function ( row ) {
                //         var data = row.data()[0];
                //         return data;
                //     }
                // } )
            }
        },
        "ordering": state.ordering,
        colReorder: {
            enable: false,
            //     order: [ 5, 4, 3, 2, 1, 0 ],
            //     realtime: false,

        },
        'infoCallback': function(settings, start, end, max, total, pre) {

            // Callback to change information on top of table -> in this particular example: show the number of all entries in the table
            return start + " bis " + end + " von " + transform.number_format(max) + " Einträgen";
        },

        // "drawCallback": function( settings ) {
        //     let api = this.api();
        //     // console.log( api.rows( {page:'current'} ).data() );
        //     //console.log(api.columns( {page:'current'}).data());
        //     //var api = new $.fn.dataTable.Api( settings );


        //     // Output the data for the visible rows to the browser's console
        //     // You might do something more useful with it!
        //     //console.log(api.search);
        //     //console.log( api.rows( {page:'current'} ).data().table );

        //     // $('#mySearch').on( 'keyup', function () {
        //     //     table.search( this.value );
        //     // } );
        // },
        "dom": state.layout,
        // "infoCallback": function(settings, start, end, max, total, pre) {
        //     var api = this.api();
        //     var pageInfo = api.page.info();
        //     var entriesInfo = api;
        //     console.log(pageInfo);
        //     console.log(entriesInfo);



        //     return 'Page ' + (number_format(pageInfo.page + 1)) + ' of ' + number_format(pageInfo.pages);
        // },
        // buttons: [
        //     {
        //         extend: 'columnsToggle',
        //     }
        // ],
        //responsive: true,
        //"autoWidth": true,
        "columnDefs": [{
                "targets": 0,
                className: 'firstColumn'
            },
            {
                "targets": 0,
                "data": 0,
                "render": function(data, type, row, meta) {
                    return viz.show_img(data, type, row, meta);
                },
            },
            {
                "targets": viz.without_bar(transform.tranlsateSortingAlphaToNumber(state.bar_column), data),
                "render": function(data, type, row, meta) {
                    return viz.without_viz(data, type, row, meta);
                }
            },
            {
                "targets": transform.tranlsateSortingAlphaToNumber(state.bar_column),
                "render": function(data, type, row, meta) {
                    return viz.barchart(data, type, row, meta);
                }

            }
        ],
        "paging": false,
        "scrollY": rm_zeile_height(state.yscroll),
        //"scrollCollapse": true,
        "pageLength": state.numberOfEntries,
        "order": options.sortingswitch(state.sortingColumn, state.sortingOrder), //[transform.tranlsateSortingAlphaToNumber(state.sortingColumn), state.sortingOrder],
        columns: options.c_names(),
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/German.json"
        },
        "drawCallback": function(settings) {
            if (state.sortingColumn)
            // Change Header Color
                $('.dataTables_scrollHead').css("background", state.headerColor);
            //$('.dataTables_scrollHead th.sorting_desc').css("background-color", state.headerSortingColor);          

        }
    });


    // Responsive Configuration
    // $(".addbtn").on('click',function(){
    //     var data = table.row(0).data();
    //     data[3] = "<button type='button' class='btn btn-info btn-xs' style='font-size: 9px;'>New BtN</button>";
    //     table.row(0).data(data);
    //     table.draw();
    //   });
    // console.log(getOrderedColumn(table));

    $('#mySearch').on('keyup', function() {
        let searcher_var = state.search_column;
        let count_search_column = searcher_var.length - 1;

        let all = $('#myTable').DataTable().columns()[0]


        if (state.search_column == "alle") {

            $('#myTable').DataTable().search(this.value).columns(all).draw();
        } else if (count_search_column < 1) {
            $('#myTable').DataTable().columns(transform.tranlsateSortingAlphaToNumber(state.search_column)).search(this.value).draw();
        } else {
            $('#myTable').DataTable().search(this.value).draw();

        }
    });

    // Deactivate Search for Grafik PNG Export
    function deactivateSearch() {
        if (!state.searchswitch) {
            $('#mySearch').remove();
        }
    }

    deactivateSearch();


    // Schriftgrösse anpassen

    function mod_font() {
        $('.table.dataTable thead th').css("font-size", state.schriftgroesse)
        $('.table.dataTable thead td').css("font-size", state.schriftgroesse)
        $('.table.dataTable tbody th').css("font-size", state.schriftgroesse)
        $('.table.dataTable tbody td ').css("font-size", state.schriftgroesse)
    }

    window.onload = mod_font();

    // Zeilen

    function zeilen() {

        if (state.zeilenOn == true) {
            $('#zeilen').css("display", "block");
            $('#hauptzeile').text(state.hauptzeile);
            $('#unterzeile').text(state.unterzeile);

            $('#hauptzeile').css("font-size", state.hauptzeilen_font_size);
            $('#unterzeile').css("font-size", state.unterzeilen_font_size);

            $('#hauptzeile').css("line-height", state.hauptzeilen_height);
            $('#unterzeile').css("line-height", state.unterzeilen_height);

        } else {
            $('#zeilen').css("display", "none");
        }

        let zeilen_height = document.getElementById("zeilen").clientHeight;
        return zeilen_height;
    }

    zeilen();

    // Quelle

    function quelle() {
        if (state.quelle) {
            $('#quelle').text(state.quelle);
        }

    }


    quelle();

    // Reloading Problem

    $("iframe[name='preview']").each(function() {
        this.sandbox += ' allow-modals';
    });

}

export default update;
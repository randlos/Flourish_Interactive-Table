
import state from "./state";
import data from "./data";


import {numconvert} from './numberConversion.js';


function update() {
    
/*     function sortingOrderTranlsate(order) {
        if (state.sortingOrder == "Aufsteigend") {
            state.sortingOrder = "asc";
            return state.sortingOrder;
        }
    
        else if (state.sortingOrder == "Absteigend"){
            state.sortingOrder = "desc";
            return state.sortingOrder;
        }
        else {
            return state.sortingOrder;
        }

    } */

    function reloadTable(variable) {
        
        table.ajax.reload();
        return variable;
    }

    
    function maxValue(data) {
        let dataArray = new Array();

        data.forEach(function(item, index, array) {
            // GET THE LAST ITEM (LAST COLUMN CELL) IN A ARRAY
            //console.log(item.values.slice(-1)[0], index);
            dataArray.push(item.values.slice(-1)[0]);

        });
        
        let maxValue = Math.max.apply(Math, dataArray);
        console.log(maxValue);

        return maxValue;
    }

    let maxVal = maxValue(data.Data);
   
    // function balken(data) {
        
    //     // let chart = d3.select("body")//d3.select("td:nth-last-child(1)")
    //     // .append("svg")
    //     // .attr("class", "barchart")
    //     // .attr("width", "100%")
    //     // .attr("height", "70%");
      

    //     // let bar = chart.select("g")
    //     // .data(data)    
    //     // .enter()
    //     // .append("g");
        
        
    //     let bar = d3.append("rect")
    //     .attr("width", function(d) { return 100/d + "%"}) //function(d) { return (d/(d3.sum(data)))*100 + "%"; } )   // function(d) { return d + "%"})
    //     .attr("x", "0")
    //     .attr("y", "50%")
    //     .attr("height", "80%")
    //     .attr("fill", "#000");
    // }

    function tranlsateSortingAlphaToNumber(alpha) {
        let alphaList = [{number:1, string:'A'},
                         {number:2, string:'B'},
                         {number:3, string:'C'},
                         {number:4, string:'D'},
                         {number:5, string:'E'},
                         {number:6, string:'F'},
                         {number:7, string:'G'},
                         {number:8, string:'H'},
                         {number:9, string:'I'},
                         {number:10, string:'J'},
                         {number:11, string:'K'},
                         {number:12, string:'L'},
                         {number:13, string:'M'},
                         {number:14, string:'N'},
                         {number:15, string:'O'},
                         {number:16, string:'P'},
                         {number:17, string:'Q'},
                         {number:18, string:'R'},
                         {number:19, string:'S'},
                         {number:20, string:'T'},
                         {number:21, string:'U'},
                         {number:22, string:'V'},
                         {number:23, string:'W'},
                         {number:24, string:'X'},
                         {number:25, string:'Y'},
                         {number:26, string:'Z'}
                        ];
        
        let i;
        for (i=0; i < alphaList.length; i++) {
            if (alphaList[i].string == alpha) {
                //console.log("Output:" + typeof(alphaList[i].number));
                return alphaList[i].number -1;
            };
        };       
        

    }


    function c_names() {
        let column_data = [];
        for(var i=0; i<data.Data.column_names.values.length; i++){
            column_data.push({"title": data.Data.column_names.values[i]});     
        };
        //console.log(column_data);
        return column_data;
    }
    
    
    
    let table = $('#myTable').dataTable( {
        data: data.Data.map(e => e.values),
        colReorder: {
            enable: true,
        //     order: [ 5, 4, 3, 2, 1, 0 ],
        //     realtime: false,

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
        // buttons: [
        //     {
        //         extend: 'columnsToggle',
        //     }
        // ],
        responsive: true,
        "columnDefs" : [{
            "targets": 0,
            "data": 0,
            "render": function ( data, type, row, meta ) {
                if (data.indexOf("//www.bild.de/") > -1){
                    var img_tag = '<img src="'+data+'" height="100" weight="100">';
                    return img_tag;
                }
                else {
                    return data;
                }
              },
        },{
            "targets": -1,
            "render": function (data, type, row, meta) {

                if (!isNaN(data)) {
                    
                   
                    // var canvas = d3.select("td") //:nth-last-child(1)
                    // .append('canvas')
                    // .attr('width', '100%')
                    // .attr('height', '100%');

                    // var context = canvas.node().getContext('2d');

                    // console.log(context);
                    // let chart = d3.select
                    // ("td:nth-last-child(1)")
                    // .append("svg")
                    // .attr("class", "barchart")
                    // .attr("width", "100%")
                    // .attr("height", "70%");
                  


                    // let bar = chart.select("g")
                    // .data(data)    
                    // .enter()
                    // .append("g");
                    
                    // console.log(bar);
                    
                    // bar.append("rect")
                    // .attr("width", function(d) { return 100/d + "%"}) //function(d) { return (d/(d3.sum(data)))*100 + "%"; } )   // function(d) { return d + "%"})
                    // .attr("x", "0")
                    // .attr("y", "50%")
                    // .attr("height", "80%")
                    // .attr("fill", "#000");

                    // //console.log(d3.sum(data));
                    
                    //let c = $("td:nth-last-child(1)").append("<svg> Test </svg>");
                    
                    let bar = '<svg style="height:20%; width:' + data/maxVal * 100 +  '%; background:#000000">Test</svg>';
                    return bar;
                    
                }
                else {
                    return data;
                }
            }
        }],
        "paging": false,
        "scrollY": state.yscroll,
        //"scrollCollapse": true,
        "pageLength":state.numberOfEntries,
        "order": [tranlsateSortingAlphaToNumber(state.sortingColumn), state.sortingOrder], 
        columns: c_names(),
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/German.json"
        },
        "drawCallback": function ( settings ) {

            // Change Header Color
            $('.dataTables_scrollHead').css("background", state.headerColor);          
            //console.log("Table reload!");
            //console.log(state.headerColor);
        }
    });


    $('#mySearch').on( 'keyup', function() {
        $('#myTable').DataTable().search( this.value ).draw();
    } );

    // Deactivate Search for Grafik PNG Export
    function deactivateSearch() {
        if (state.layout == "t") {
            $('#mySearch').remove();
        }
    }
    
    deactivateSearch()
    
    
    $("iframe[name='preview']").each(function() {
        this.sandbox += ' allow-modals';
    });


;


    // .map(function(d) { return comma_to_point(d.schlusskurs) })
}

export default update;

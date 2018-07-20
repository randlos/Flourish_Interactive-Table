export var data = {};
// If your template includes data tables, use this variable to access the data.
// Each of the 'datasets' in data.json file will be available as properties of the data.

export var state = {
  

  // Haupt-Farben
  Haupt_Farbe: "rgba(211, 45, 32, 1)",
  Green: '#6CBA6C',
  darkGreen: '#45891B',
  Blue: '#42A8CC',
  darkBlue: '#036E93',

  // BG-Farben
  Background_Transparent: "transparent",
  Background_Color_Haupt_opacity: "rgba(211, 45, 32, 0.5)",

  // Partei-Farben

  cdu_csu_farbe: '#143d4b',
  cdu_farbe: '#162129',
  csu_farbe: '#1782d1',
  spd_farbe: '#e0341f',
  afd_farbe: '#00b8e3',
  fdp_farbe: '#f4d50b',
  gruene_farbe: '#3bae53',
  dielinke_farbe: '#a00163',
  sonstige_parteien_farbe: '#c5cad0',
  nichtwahler_farbe: '#dce1e0',
  
 };

export function update() {

function c_names() {
    var column_data = [];
    for(var i=0; i<data.Data.column_names.values.length; i++){
        column_data.push({"title": data.Data.column_names.values[i]});     
    };
    //console.log(column_data);
    return column_data;
}



var table = $('#myTable').DataTable( {
    data: data.Data.map(e => e.values),
    "columnDefs" : [{
        "targets": 0,
        "data": 0,
        "render": function ( data, type, row, meta ) {
            var img_tag = '<img src="'+data+'" height="100" weight="100">';
            return img_tag;
          },
    }],
    columns: c_names(),
    "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/German.json"
    }
});

$(document).ready( function () {
    table.draw();
} );
};


// .map(function(d) { return comma_to_point(d.schlusskurs) })

export function draw() {
  // The draw function is called when the template first loads
  update();
}


// column_data.push({
//     "render": function (data, type, data, meta) {
//         return '<img src="'+data.Data[0].values[i]+'">';
//     }
//     });


// if (data.Data.column_names.values[i] == "ID_live"){
//     //var url = "https://bilder.bild.de/fotos/dr-michael-abercron-mdb-200545806-53423098/Bild/2.bild.jpg"
//     column_data.push({
//         "render": function (data, type, data, meta) {
//             return '<img src="'+data.Data[0].values[i]+'">';
//         }
//         });
//     console.log(data.Data[0].values[i])
// };
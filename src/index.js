import Chart from "chart.js";
import datalabels from "chartjs-plugin-datalabels";

export var data = {};
// If your template includes data tables, use this variable to access the data.
// Each of the 'datasets' in data.json file will be available as properties of the data.

export var state = {
  

  // Haupt-Farben

  Haupt_Farbe: "rgba(211, 45, 32, 1)",//'#D32D20', // Bild-Rot
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
  

  // weitere Optionen

  Tooltips_On: false,
  filled_chart: 'transparent',
  weiche_kurve: 0,


  Label_Beschriftung: 'Schlusskurs in Euro',
  Punkt_Radius: 0,
  Punkt_Highlight_Radius: 1,
  farbe_highlight_punkte: '#D32D20',
  position_highlight_kasten: 'bottom',

  offset_textbox: 25,
  align_textbox_text: 'left'

  // The current state of template. You can make some or all of the properties
  // of the state object available to the user as settings in settings.js.
};

export function update() {

  function comma_to_point(num){
    if (num.indexOf(',') > -1){
      var raw = num;
      var comma = raw.split(',');
      var pointer = comma.join('.');
      return pointer
      
    }
    return num
  }


  function date_converter_us_eu(datum){
    var date_raw = datum;
    var us_date = date_raw.split('/');
    var euro_date = us_date[1] + "." + us_date[0] + "." + us_date[2];
    return euro_date


  }


  function thousand_space(num){
    if (num >= 1000){
      var thousand = num/1000
      thousand = thousand.toFixed(3)
      thousand = thousand.toString()
      var re = /\./;
      var thousand_space = thousand.replace(re, " ")
      return thousand_space

    }
    
     return num
  }


  function highlight_title_formatter(hightlight_title) {
    var string_title = hightlight_title.toString();
    string_title = "<h2>" + string_title + "</h2>"
    //console.log(string_title);
    return string_title

  }

// Hintegrundbild

  var ctx = document.getElementById('chart').getContext('2d');

  // var img = new Image();
  // img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
  // img.onload = function() {
  //   var ctx = document.getElementById('chart').getContext('2d');
  //   var fillPattern = ctx.createPattern(img, 'repeat');
  // }

  var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: data.kurs.map(function(d) { return date_converter_us_eu(d.datum_schlusskurs)}),
          datasets: [{
              highlights: data.kurs.map(function(d) { return d.highlights; }),
              label: state.Label_Beschriftung,
              backgroundColor: state.filled_chart,
              opacity: 0.8,
              borderColor: state.Haupt_Farbe,
              data: data.kurs.map(function(d) { return comma_to_point(d.schlusskurs) }),
              radius: state.Punkt_Radius,
          }]
      },  
      options: {
          elements: {
          line: {
            tension: state.weiche_kurve,
            cubicInterpolationMode: 'monotone'
          }
        },
        tooltips: {
          enabled: state.Tooltips_On,
          hover: {
            mode: 'dataset',
            animationDuration: 1000
          }
        },
        scales: {
          yAxes: [{
            stacked: false,
            ticks: {
              callback: function(value){
                return thousand_space(value);
              }
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            fontStyle: 'bold',
            fontColor: state.Haupt_Farbe,
          },
        },
        plugins: {
          datalabels: {
            backgroundColor: 'white',
            borderColor: state.Haupt_Farbe,
            borderRadius: 0,
            borderWidth: 1,
            opacity: '0.9',
            offset: state.offset_textbox,
            align: state.position_highlight_kasten,
            anchor: 'center',
            color: 'black',
            textAlign: state.align_textbox_text,
            rotation: '0',
            font: {
              weight: 'bold',
              size: '13',
              lineHeight: '1.2'
            },
            display: function(context) {
              return context.dataset.highlights; 
              //return context.data;
              },
            formatter: function(value, context) {
              var i = 0
              if (context.dataset.highlights[context.dataIndex] != ""){
                //console.log(context.dataset.highlights[context.dataIndex]);
                var legend_text = context.dataset.highlights[context.dataIndex];
                var textarray = legend_text.split(' ');
                //console.log(textarray)
                if (textarray.length >= 5){
                  for (i = 5; i < textarray.length; i = i + 5){
                    //console.log(textarray[i])
                    if (textarray[i] == " "){
                      //print("loop!")
                      textarray.shift();
                      //textarray.splice(i, i,"")
                    }
                    textarray.splice(i, 0, '\n');
                    //console.log(i)
                  }
                  legend_text = textarray.join(' ');

                }
                      
                
                return context.chart.data.labels[context.dataIndex] + ': ' + '\n' + legend_text;
              }}
          
        }
      
      }
  }});

  Chart.plugins.register({
    afterDraw: function (chart) {
      var ctx = chart.ctx;
      chart.data.datasets.forEach(function (dataset, i) {
        var meta = chart.getDatasetMeta(i)
        dataset.highlights.forEach(function (highlight, i){
          if (!meta.hidden) {
            if (highlight != "") {
                var label_position = meta.data[i].tooltipPosition();
                
                ctx.beginPath();
                ctx.arc(label_position.x,label_position.y, 6, 0, 2*Math.PI, false);
                ctx.strokeStyle = "#ffffff";//state.farbe_highlight_punkte;
                ctx.fillStyle = state.farbe_highlight_punkte;
                ctx.lineWidth = 6;
                ctx.stroke();
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(label_position.x, label_position.y);
                if (state.position_highlight_kasten == 'bottom'){
                  ctx.lineTo(label_position.x, label_position.y + state.offset_textbox);
                }
                if (state.position_highlight_kasten == 'top'){
                  ctx.lineTo(label_position.x, label_position.y - state.offset_textbox);
                }
                if (state.position_highlight_kasten == 'left'){
                  ctx.lineTo(label_position.x - state.offset_textbox, label_position.y)
                }
                if (state.position_highlight_kasten == 'right'){
                  ctx.lineTo(label_position.x + state.offset_textbox, label_position.y)
                }
                
                ctx.strokeStyle = state.farbe_highlight_punkte;
                ctx.fillStyle = state.farbe_highlight_punkte;
                ctx.lineWidth = 1;
                ctx.stroke();
                //ctx.fill();
            }
          
          }
          
        })
      })
    }
  })
  



 
  // The update function is called whenever the user changes a data table or settings
  // in the visualisation editor, or when changing slides in the story editor.

  // Tip: to make your template work nicely in the story editor, ensure that all user
  // interface controls such as buttons and sliders update the state and then call update.
}

export function draw() {
  // The draw function is called when the template first loads
  update();
}

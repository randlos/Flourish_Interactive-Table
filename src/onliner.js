var maincolor = 'rgb(255, 99, 132)';

var ctx = document.getElementById('chart').getContext('2d');

var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.kurs.map(function(d) { return d.datum_schlusskurs; }),
        datasets: [{
            highlights: data.kurs.map(function(d) { return d.highlights; }),
            label: "Schlusskurs in Euro",
            backgroundColor: 'transparent',
            borderColor: maincolor,
            data: data.kurs.map(function(d) { return d.schlusskurs; }),
            radius: 3,
        }]
    },  
    options: {
      tooltips: {
        enabled: true
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          fontStyle: 'bold',
          fontColor: maincolor,
        },
      },
      plugins: {
        datalabels: {
          backgroundColor: 'white',
          borderColor: 'rgb(255, 99, 132)',
          borderRadius: 8,
          borderWidth: 1,
          opacity: '0.7',
          offset: '8',
          align: 'bottom',
          anchor: 'start',
          color: 'black',
          textAlign: 'center',
          rotation: '0',
          font: {
            weight: 'bold',
            size: '13',
            lineHeight: '1.2'
          },
          display: function(context) {
            return context.dataset.highlights; // display labels with an odd index
            //return context.data;
            },
          formatter: function(value, context) {
            if (context.dataset.highlights[context.dataIndex] != ""){
              var legend_text = context.dataset.highlights[context.dataIndex];
              var textarray = legend_text.split(' ');
              if (textarray.length >= 7){
                for (i = 5; i < textarray.length; i = i + 5){
                  textarray.splice(i, 0, '\n');
                  //console.log(textarray)
                }
                legend_text = textarray.join(' ');

              }
              var legend_datum = context.chart.dataset
              //console.log(legend_datum)
              //console.log(legend_text.split(' ', 6) + (legend_text - legend_text.split(' ', 6)));
              return context.chart.data.labels[context.dataIndex] + ': ' + '\n' + legend_text;
            }}
        
      }
     
    }
}});

Chart.pluginService.register({
  afterDraw: function (chart) {
    var ctx = chart.ctx;
    //console.log(ctx)
    chart.data.datasets.forEach(function (dataset, i) {
      var meta = chart.getDatasetMeta(i)
      //console.log(meta)
      dataset.highlights.forEach(function (highlight, i){
        if (!meta.hidden) {
          if (highlight != "") {
              var label_position = meta.data[i].tooltipPosition();
              //console.log(label_position)
              ctx.beginPath();
              ctx.arc(label_position.x,label_position.y, 6, 0, 2*Math.PI, false);
              ctx.fillStyle = 'black';
              ctx.strokeStyle = 'white';
              ctx.lineWidth = '7';
              ctx.stroke();
              ctx.fill();
          }
        
        }
        
      })
    })
  }
})
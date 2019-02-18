var template=function(r){"use strict";let e={sortingColumn:"A",sortingOrder:"asc",numberOfEntries:10,reload:1,layout:"pitr",yscroll:"500px",headerColor:"#dadada",Haupt_Farbe:"rgba(211, 45, 32, 1)",Green:"#6CBA6C",darkGreen:"#45891B",Blue:"#42A8CC",darkBlue:"#036E93",Background_Transparent:"transparent",Background_Color_Haupt_opacity:"rgba(211, 45, 32, 0.5)",cdu_csu_farbe:"#143d4b",cdu_farbe:"#162129",csu_farbe:"#1782d1",spd_farbe:"#e0341f",afd_farbe:"#00b8e3",fdp_farbe:"#f4d50b",gruene_farbe:"#3bae53",dielinke_farbe:"#a00163",sonstige_parteien_farbe:"#c5cad0",nichtwahler_farbe:"#dce1e0",imgsize:[100,150],bar_switch:!0,bar_column:"D"};var n={};function a(){let r=function(r){let n=new Array;return r.forEach(function(r,t,s){let i=r.values.slice(a(e.bar_column))[0];n.push(i)}),Math.max.apply(Math,n)}(n.Data);function a(r){let e,n=[{number:1,string:"A"},{number:2,string:"B"},{number:3,string:"C"},{number:4,string:"D"},{number:5,string:"E"},{number:6,string:"F"},{number:7,string:"G"},{number:8,string:"H"},{number:9,string:"I"},{number:10,string:"J"},{number:11,string:"K"},{number:12,string:"L"},{number:13,string:"M"},{number:14,string:"N"},{number:15,string:"O"},{number:16,string:"P"},{number:17,string:"Q"},{number:18,string:"R"},{number:19,string:"S"},{number:20,string:"T"},{number:21,string:"U"},{number:22,string:"V"},{number:23,string:"W"},{number:24,string:"X"},{number:25,string:"Y"},{number:26,string:"Z"}];for(e=0;e<n.length;e++)if(n[e].string==r)return n[e].number-1}$("#myTable").dataTable({data:n.Data.map(r=>r.values),responsive:{details:!0,breakpoints:[{name:"stationär",width:1/0},{name:"mobil",width:705}]},colReorder:{enable:!0},dom:e.layout,columnDefs:[{targets:0,data:0,render:function(r,n,a,t){return r.indexOf("/")>-1?'<img src="'+r+'"height="'+e.imgsize[0]+'"width="'+e.imgsize[1]+'">':r}},{targets:a(e.bar_column),render:function(n,a,t,s){if(e.bar_switch){if(isNaN(n))return n;{let e='<div class="bartext"><p>'+n+"</p></div>";return'<div class="barcont">'+('<div class="bar"><svg class="barsvg" style="height:10px;width:'+n/r*100+"%; background:"+function(e){return d3.scale.linear().domain([0,r]).range(["green","red"])(e)}(n)+'";> </svg> </div>')+e+"</div>"}}return n}}],paging:!1,scrollY:e.yscroll,pageLength:e.numberOfEntries,order:[a(e.sortingColumn),e.sortingOrder],columns:function(){let r=[];for(var e=0;e<n.Data.column_names.values.length;e++)r.push({title:n.Data.column_names.values[e]});return r}(),language:{url:"//cdn.datatables.net/plug-ins/1.10.19/i18n/German.json"},drawCallback:function(r){$(".dataTables_scrollHead").css("background",e.headerColor)}});$("#mySearch").on("keyup",function(){$("#myTable").DataTable().search(this.value).draw()}),"t"==e.layout&&$("#mySearch").remove(),$("iframe[name='preview']").each(function(){this.sandbox+=" allow-modals"})}return r.state=e,r.data=n,r.draw=function(){a()},r.update=a,r}({});
//# sourceMappingURL=template.js.map

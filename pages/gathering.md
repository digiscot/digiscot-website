---
layout: page
permalink: /gathering/
---

<script type='text/javascript' src='http://www.google.com/jsapi'></script>
<script type='text/javascript'>
    google.load('visualization', '1', {'packages':['corechart','table']});
    google.setOnLoadCallback(drawChart1);
    function drawChart1() {

        setInterval(function(){ 

        var query1 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1SBMunDPjhCspmjLzQSKx0wyFeDTDWLcSzffKtAWvZ_0/gviz/tq?gid=1727737465&headers=1');
        query1.setQuery('select A, B, C, D');
        query1.send(handleQueryResponse);

        var query2 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1SBMunDPjhCspmjLzQSKx0wyFeDTDWLcSzffKtAWvZ_0/gviz/tq?headers=1&gid=1260510879#gid=1260510879');
        query2.setQuery('select A, B, C');
        query2.send(handleQueryResponse2);

        var query3 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1SBMunDPjhCspmjLzQSKx0wyFeDTDWLcSzffKtAWvZ_0/gviz/tq?headers=1&gid=1260510879#gid=1260510879');
        query3.setQuery('select E');
        query3.send(handleQueryResponse3);

        // var query4 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1SBMunDPjhCspmjLzQSKx0wyFeDTDWLcSzffKtAWvZ_0/gviz/tq?gid=1727737465&headers=1');
        // query4.setQuery('select A, E');
        // query4.send(handleQueryResponse4);

    }, 2000);
    }

    function handleQueryResponse(response) {         
        var data1 = response.getDataTable();         
        var chart1 = new google.visualization.BarChart(document.getElementById('chart_div1'));
        var options = {             
        //'title':'none',              
        //'legend':'none',
        'isStacked':'percent',              
        'colors': ['#9BC53D','#FF9F1C','#E71D36'],             
        'chartArea':{left:200,top:0,width:'100%',height:'80%'}         
        }
    chart1.draw(data1, options);       
    }

    function handleQueryResponse2(response) {
    var data2 = response.getDataTable();
    var chart2 = new google.visualization.PieChart(document.getElementById('chart_div2'));
    var options = {
        //'title':'Download/save a photo you found online', 
        //'legend': {position: 'top', maxLines: 3},
        'legend':'none', 
        //'isStacked':'percent',
        'colors':['#FF9F1C','#9BC53D'],
        'height': '350',
        'bar': {groupWidth: '100%'},
        'chartArea':{left:0,top:0,width:'100%',height:'80%'}
    }
    chart2.draw(data2, options);
   }

    function handleQueryResponse3(response) {
    var data3 = response.getDataTable();
    //var chart3 = new google.visualization.Table(document.getElementById('chart_div3'));
    var total = data3.getValue(0,0);
    var totaldiv = document.getElementById('total');
    totaldiv.innerHTML = total+"";
    var x = 0;
    // var options = {
    //     'title':'Respondants', 
    //     'legend':'none',
    //     // 'pieSliceText':'value'
    }
    //chart3.draw(data3, options);
  //}

  //   function handleQueryResponse4(response) {
  //   var data4 = response.getDataTable();
  //   var chart4 = new google.visualization.PieChart(document.getElementById('chart_div4'));
  //   var options = {'title':'Find a website you have visited before', 'legend':'none'}
  //   chart4.draw(data4, options);
  // }

</script>

<h1 class="text-center">Basic Digital Skills - live results</h1>

<div id='chart_div1' style="height: 600px; width: 100%;"></div>

<div class="row">
    <div class="col-lg-8">
        <div id='chart_div2'></div>
    </div>
    <div class="col-lg-3">
        <div class="panel panel-success">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-5">
                        <i class="fa fa-check fa-5x"></i>
                    </div>
                    <div class="col-xs-5 text-right">
                        <p id="total" class="announcement-heading"></p>
                        <p class="announcement-text">Respondents</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
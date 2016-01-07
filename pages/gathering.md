---
layout: page
title: Gathering
permalink: /gathering/
---

<html>
  <head>
    <!--Load the AJAX API-->
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">

      // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
    function drawSheetName() {
      var queryString = encodeURIComponent('SELECT B');

      var query = new google.visualization.Query(
          'https://docs.google.com/spreadsheets/d/1SBMunDPjhCspmjLzQSKx0wyFeDTDWLcSzffKtAWvZ_0/gviz/tq?tq=&range=B2:B4' + queryString);
      query.send(handleSampleDataQueryResponse);
    }

    function handleSampleDataQueryResponse(response) {
      if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
      }

      var data = response.getDataTable();
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, { height: 400 });
    }

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    </script>
  </head>

  <body>
    <div id="chart_div"></div>

    <div>
    	<p>hello</p>
    </div>
  </body>

</html>
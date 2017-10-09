(function () {
    var tag;

    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@50896fdf5c15388f8976945e5582a856.eu-west-1.aws.found.io',
        apiVersion: '2.4'
    });

    getProjects();

    function getProjects() {
        var fundType = 'scvo-grant-digital'; // scvo-grant-digital or scvo-grant-ccrf or scvo-grant-ccrf-additional
        var payload = {
            index: 'web-content-production',
            type: fundType,
            body: {
                query: {
                    bool: {
                        must: []
                    }
                }
            },
            size: 1000
        }

        client.search(payload).then(function(results){
            var grantsExport = {};
            grantsExport.grants = [];
            var hits = results.hits.hits;
            for (var i = 0; i < hits.length; i++) {
                var grant_data = hits[i]._source;
                var grant = {};

                if (grant_data.rendered.threesixtygiving) {
                    var json = grant_data.rendered.threesixtygiving;
                    json = json.replace(/(?:\r\n|\r|\n)/g,'')
                               .replace(/\\"/g, '"')
                               .replace(/\\./g, ".")
                               .replace(/\\&/g, "\\&")
                               .replace(/\\t/g, "\\t")
                               .replace(/\\b/g, "\\b")
                               .replace(/\\f/g, "\\f")
                               .replace(/[\u0000-\u0019]+/g,"");
                    grant = JSON.parse(json);
                }
                grantsExport.grants.push(grant);
            }

            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(grantsExport));
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", fundType+".json");
        }).catch(function(err){
            console.error('ES Query Error:', err);
        });
    }

    function formatDate(date) {
        var d = new Date(date);
        return d.getUTCFullYear()+"-"+("0"+(d.getUTCMonth()+1)).slice(-2)+"-"+("0"+d.getUTCDate()).slice(-2);
    }

    function createProject(project){
        var cell = $('<div />');
        var card = $('<div />').addClass('card hoverable').appendTo(cell);
        var content = $('<div />').addClass('card-content').appendTo(card);
        var organisation = $('<a />')
            .addClass('card-title')
            .attr('href', 'participation/project/#' + project.Id)
            .text(project.recipient_name)
            .appendTo(content);
        var title = $('<p />').appendTo(content);
        var titleBold = $('<strong />').text(project.title).appendTo(title);
        var exerpt = $('<p />').text(S(project.project_overview).truncate(140, '...').s).appendTo(content);
        var actions = $('<div />').addClass('card-action').appendTo(card);

        return cell;
    }
}())

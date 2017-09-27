(function () {
    var tag, call;

    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@50896fdf5c15388f8976945e5582a856.eu-west-1.aws.found.io',
        //log: 'trace',
        apiVersion: '2.4'
    });

    window.addEventListener('hashchange', doSearch, false);
    $('#projects-search').on('keyup', delaySearch);
    getTags();
    getCalls();
    doSearch();

    var searchDelay = null;
    function delaySearch(){
        window.clearTimeout(searchDelay);
        searchDelay = window.setTimeout(function(){
            doSearch();
        }, 1000);
    }

    function doSearch() {
        $('#projects-container').hide();
        $('#projects-loading').show();
        if (/^#tag-/.test(window.location.hash)) {
            tag = window.location.hash.replace(/\#tag-/, '');
            call = '';
        } else if (/^#calendar-/.test(window.location.hash)) {
            tag = '';
            call = window.location.hash.replace(/\#calendar-/, '');
        } else {
            tag = '';
            call = '';
        }
        var search = $('#projects-search').val();
        getProjects(search);
    }

    function getTags() {
        $('#projects-tags')
            .empty()
            .on('change', function() {
                window.location.hash = $(this).val();
            });

        var payload = {
            "index": "web-content-production",
            "type": "scvo-grant-digital",
            "body": {
                "aggs": {
                    "tags": {
                        "terms": {
                            "field": "individuals_supported",
                            "order" : { "_term" : "asc" }
                        }
                    }
                }
            }
        }

        client.search(payload).then(function(results){
            var any = $('<option />').attr('value', '').text('All tags (' + results.hits.total + ')');
            $('#projects-tags').append(any);

            var buckets = results.aggregations.tags.buckets;
            buckets.forEach(function(bucket){
                var tagName = bucket.key;
                var text = tagName + ' (' + bucket.doc_count + ')';
                var option = $('<option />').attr('value', 'tag-' + tagName).text(text);
                option.prop('selected', 'tag-' + tagName === tag);
                $('#projects-tags').append(option);
            });
        });
    }

    function getCalls() {
        $('#projects-calls')
            .empty()
            .on('change', function() {
                window.location.hash = $(this).val();
            });

        var payload = {
            "index": "web-content-production",
            "type": "scvo-grant-digital",
            "body": {
                "aggs": {
                    "tags": {
                        "terms": {
                            "field": "call",
                            "order" : { "_term" : "desc" }
                        }
                    }
                }
            }
        }

        client.search(payload).then(function(results){
            var any = $('<option />').attr('value', '').text('All calls (' + results.hits.total + ')');
            $('#projects-calls').append(any);

            var buckets = results.aggregations.tags.buckets;
            buckets.forEach(function(bucket){
                var tagName = bucket.key;
                var text = tagName + ' - ' + createCallDetail(tagName) + ' (' + bucket.doc_count + ')';
                var option = $('<option />').attr('value', 'calendar-' + createCallDetail(tagName)).text(text);
                option.prop('selected', 'calendar-' + tagName === tag);
                $('#projects-calls').append(option);
            });
        });
    }

    function getProjects(search) {
        if (tag) {
            $('#projects-tags').val('tag-'+tag);
        } else {
            $('#projects-tags').val('');
        }
        if (call) {
            $('#projects-calls').val('calendar-'+call);
            var selected = $('#projects-calls option:selected').text();
            var call_label = selected.split("-")[0].trim();
        } else {
            $('#projects-calls').val('');
        }

        var payload = {
            "index": "web-content-production",
            "type": "scvo-grant-digital",
            "body": {
                "query": {
                    "bool": {
                        "must": []
                    }
                },
                "sort": "recipient_name"
            },
            size: 1000
        }

        client.search(payload).then(function(results){
            $('#projects-total').text(results.hits.total);
        });

        if (!tag && !call && !search) {
            payload.body.query.bool.must.push({ match_all: {} });
        } else {
            if (tag) {
                payload.body.query.bool.must.push({ terms: { individuals_supported: [tag] } });
            }
            if (call) {
                payload.body.query.bool.must.push({ match: { call: call_label } });
            }
            if (search) {
                payload.body.query.bool.must.push({ simple_query_string: { analyzer: 'snowball', query: search } });
            }
        }

        // console.log(payload);

        client.search(payload).then(function(results){
            var hits = results.hits;
            // console.log(hits);
            $('#projects-container').show();
            $('#projects-loading').hide();
            $('#projects-count').text(hits.total);
            $('#projects-results').empty();

            var projectCards = [];
            hits.hits.forEach(function(hit){
                var project = hit._source;
                var projectCard = createProject(project);
                projectCards.push(projectCard);
            });

            for (var i = 0, j = projectCards.length, chunk = 3; i < j; i += chunk) {
                var temp = projectCards.slice(i, i + chunk);
                var row = $('<div />').addClass('row');
                temp.forEach(function(cell){
                    cell.addClass('col s12 m' + (18/chunk) + ' l' + (12/chunk));
                    row.append(cell);
                });
                $('#projects-results').append(row);
            }
        }).catch(function(err){
            console.error('ES Query Error:', err);
        });
    }

    function createProject(project){
        if (project.call == 'Call 1' || project.call == 'Call 2') {
            var cell = $('<div />');
            var card = $('<div />').addClass('card hoverable').appendTo(cell);
            var content = $('<div />').addClass('card-content').appendTo(card);
            var title = $('<a />')
                .addClass('card-title')
                .attr('href', 'projects/'+(project.title+'-'+project.recipient_name).replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/-+/g,'-').toLowerCase())
                .text(project.title)
                .appendTo(content);
            var organisation = $('<p />').appendTo(content);
            var organisationBold = $('<strong />').text(project.recipient_name).appendTo(organisation).appendTo(content);
            // var exerpt = $('<p />').text(S(project.description).truncate(140, '...').s).appendTo(content);
            var actions = $('<div />').addClass('card-action').appendTo(card);

            actions.append(createTag(createCallDetail(project.call), "calendar"));

        } else {
            var cell = $('<div />');
            var card = $('<div />').addClass('card hoverable').appendTo(cell);
            var content = $('<div />').addClass('card-content').appendTo(card);
            var title = $('<a />')
                .addClass('card-title')
                .attr('href', 'participation/project/#' + project.Id)
                .text(project.title)
                .appendTo(content);
            var organisation = $('<p />').appendTo(content);
            var organisationBold = $('<strong />').text(project.recipient_name).appendTo(organisation).appendTo(content);
            // var exerpt = $('<p />').text(S(project.description).truncate(140, '...').s).appendTo(content);
            var actions = $('<div />').addClass('card-action').appendTo(card);

            actions.append(createTag(createCallDetail(project.call), "calendar"));

            project.individuals_supported.forEach(function(tag){
                actions.append(createTag(tag, "tag"));
            });
        }

        return cell;
    }

    function createTag(tagLabel, tagType){
        var colours = 'grey lighten-2 blue-text text-darken-4';
        // console.log(call);
        if (tag) {
            colours = tag === tagLabel ? 'blue darken-4 white-text' : 'grey lighten-2 blue-text text-darken-4';
        } else if (call) {
            colours = call === tagLabel ? 'blue darken-4 white-text' : 'grey lighten-2 blue-text text-darken-4';
        }
        var chip = $('<a />')
            .addClass('chip ' + colours)
            .attr('href', 'participation/projects/#' + tagType + '-' + tagLabel)
            .html('<i class="fa fa-fw fa-'+tagType+'"></i> ' + tagLabel)
            .on('click', function(){ $.scrollTo('#projects-filters') });
        return chip;
    }

    function createCallDetail(call) {
        var call_detail = "";
        switch (call) {
            case "Call 1":
                call_detail = "Winter 2014";
                break;
            case "Call 2":
                call_detail = "Spring 2015";
                break;
            case "Call 3":
                call_detail = "Winter 2015";
                break;
            case "Call 4":
                call_detail = "Spring 2017";
                break;
            case "Call 5":
                call_detail = "Autumn 2017";
                break;
            default:
                call_detail = "TBC";
                break;
        }
        return call_detail;
    }
}())

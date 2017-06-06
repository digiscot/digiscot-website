(function () {
    var tag;

    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@4c19757a0460c764d6e4712b0190cc21.eu-west-1.aws.found.io',
        //log: 'trace',
        apiVersion: '2.4'
    });

    window.addEventListener('hashchange', doSearch, false);
    $('#projects-search').on('keyup', delaySearch);
    getTags();
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
        tag = window.location.hash.replace(/\#/, '');
        var search = $('#projects-search').val();
        getProjects(search);
    }

    function getTags() {
        $('#projects-tags')
            .empty()
            .on('change', function() {
                console.log(this);
                console.log($(this).val());
                window.location.hash = $(this).val();
            });

        var payload = {
            index: 'funded-projects-call-4',
            type: 'project',
            body: {
                aggs: {
                    tags: {
                        terms: {
                            field: 'individuals_supported'
                        }
                    }
                }
            }
        }

        client.search(payload).then(function(results){
            var any = $('<option />').attr('value', '').text('Any tag (' + results.hits.total + ')');
            $('#projects-tags').append(any);

            var buckets = results.aggregations.tags.buckets;
            buckets.forEach(function(bucket){
                var tagName = bucket.key;
                var text = tagName + ' (' + bucket.doc_count + ')';
                var option = $('<option />').attr('value', tagName).text(text);
                option.prop('selected', tagName === tag);
                $('#projects-tags').append(option);
            });
        });
    }

    function getProjects(search) {
        $('#projects-tags').val(tag);

        var payload = {
            index: 'funded-projects-call-4',
            type: 'project',
            body: {
                query: {
                    bool: {
                        must: []
                    }
                },
                sort: 'organisation_name'
            },
            size: 1000
        }

        client.search(payload).then(function(results){
            $('#projects-total').text(results.hits.total);
        });

        if (!tag && !search) {
            payload.body.query.bool.must.push({ match_all: {} });
        } else {
            if (tag) {
                payload.body.query.bool.must.push({ terms: { individuals_supported: [tag] } });
            }
            if (search) {
                payload.body.query.bool.must.push({ simple_query_string: { analyzer: 'snowball', query: search } });
            }
        }

        client.search(payload).then(function(results){
            var hits = results.hits;
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
        var cell = $('<div />');
        var card = $('<div />').addClass('card hoverable').appendTo(cell);
        var content = $('<div />').addClass('card-content').appendTo(card);
        var organisation = $('<a />')
            .addClass('card-title')
            .attr('href', 'participation/project/#' + project.Id)
            .text(project.organisation_name)
            .appendTo(content);
        var title = $('<p />').appendTo(content);
        var titleBold = $('<strong />').text(project.project_title).appendTo(title);
        var exerpt = $('<p />').text(S(project.project_overview).truncate(140, '...').s).appendTo(content);
        var actions = $('<div />').addClass('card-action').appendTo(card);

        project.individuals_supported.forEach(function(tag){
            actions.append(createTag(tag));
        });

        return cell;
    }

    function createTag(tagLabel){
        var colours = tag === tagLabel ? 'grey lighten-2 blue-text text-darken-4' : 'blue darken-4 white-text';
        var chip = $('<a />')
            .addClass('chip ' + colours)
            .attr('href', 'participation/projects/#' + tagLabel)
            .html('<i class="fa fa-fw fa-tag"></i> ' + tagLabel)
            .on('click', function(){ $.scrollTo('#projects-filters') });
        return chip;
    }
}())

(function () {
    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@50896fdf5c15388f8976945e5582a856.eu-west-1.aws.found.io',
        apiVersion: '2.4'
    });

    window.addEventListener('hashchange', loadProject, false);

    loadProject();

    function loadProject() {
        getProject(window.location.hash.replace(/\#/, ''));
    }

    function getProject(slug) {
        client.search(
            {
                "index": 'web-content-production',
                "type": 'scvo-grant-charter',
                "body": {
                    "query": {
                        "bool": {
                            "must": [
                                {
                                    "term": {
                                        "slug": slug
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ).then(function(results) {
            var project = results.hits.hits[0]._source;

            var html = '';
            if (project.rendered.full) {
                html = project.rendered.full;
            }

            $('#project-container').html(html);
        }).catch(function(err){
            console.error('ES Query Error:', err);
            window.location.href = '/participation/projects';
        });
    }
}());

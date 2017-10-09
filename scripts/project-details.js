(function () {
    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@50896fdf5c15388f8976945e5582a856.eu-west-1.aws.found.io',
        apiVersion: '2.4'
    });

    window.addEventListener('hashchange', loadProject, false);

    loadProject();

    function loadProject() {
        var projectId = window.location.hash;
        projectId = projectId.replace(/\#/, '');
        getProject(projectId);
    }

    function getProject(projectId) {
        client.get({ index: 'web-content-production', type: 'scvo-grant-digital', id: projectId }).then(function(result){
            var project = result._source;

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

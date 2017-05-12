(function () {
    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@4c19757a0460c764d6e4712b0190cc21.eu-west-1.aws.found.io:9243',
        //log: 'trace',
        apiVersion: '2.4'
    });

    window.addEventListener('hashchange', loadProject, false);
    loadProject();

    function loadProject() {
        $('#project-container').hide();
        $('#project-loading').show();
        var projectId = window.location.hash;
        projectId = projectId.replace(/\#/, '');
        getProject(projectId);
    }

    function getProject(projectId) {
        client.get({ index: 'funded-projects', type: 'project', id: projectId }).then((result) => {
            var project = result._source;
            displayProjectInfo(project);
            $('#project-container').show();
            $('#project-loading').hide();
        }).catch((err) => {
            console.error('ES Query Error:', err);
            window.location.href = '/404';
        });
    }

    function displayProjectInfo(project) {
        var start = project['start_date'] ? moment(project['start_date']).format('Do MMM YYYY') : 'TBD';
        var end = project['end_date'] ? moment(project['end_date']).format('Do MMM YYYY') : 'TBD';
        var amount = project['amount_awarded'] || 'TBD'

        $('#project-project_title').text(project['project_title']);
        $('#project-organisation_name').text(project['organisation_name']);
        $('#project-organisation_overview').text(project['organisation_overview']);
        $('#project-project_overview').text(project['project_overview']);
        $('#project-start_date').text(start);
        $('#project-end_date').text(end);
        $('#project-amount_awarded').text(amount);

        setAttrOrHide('project-website', 'href', project, 'website');
        setAttrOrHide('project-twitter', 'href', project, 'twitter');
        setAttrOrHide('project-facebook', 'href', project, 'facebook');

        $('#project-tags').empty();
        project.individuals_supported.forEach((tag) => {
            var tagElement = createTag(tag)
            $('#project-tags').append(tagElement);
        });
    }

    function setAttrOrHide(id, attr, project, field) {
        if (project.hasOwnProperty(field) && project[field]) {
            $('#' + id).attr({ [attr]: fixUrl(project[field]) });
        } else {
            $('#' + id).hide();
        }
    }

    function fixUrl(url){
        if(url.indexOf('http') !== 0){
            url = 'http://' + url;
        }
        return url;
    }

    function createTag(tag){
        var chip = $('<a />')
            .addClass('chip blue darken-4 white-text')
            .attr('href', 'participation/projects-new/#' + tag)
            .html('<i class="fa fa-fw fa-tag"></i> ' + tag);
        return chip;
    }
}())

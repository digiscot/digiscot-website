(function () {
    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@4c19757a0460c764d6e4712b0190cc21.eu-west-1.aws.found.io',
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
        client.get({ index: 'funded-projects-call-4', type: 'project', id: projectId }).then(function(result){
            var project = result._source;
            console.log(result._source);
            displayProjectInfo(project);
            $('#project-container').show();
            $('#project-loading').hide();
        }).catch(function(err){
            console.error('ES Query Error:', err);
            window.location.href = '/participation/project';
        });
    }

    function displayProjectInfo(project) {
        var start = project['start_date'] ? moment(project['start_date']).format('Do MMM YYYY') : 'TBD';
        var end = project['end_date'] ? moment(project['end_date']).format('Do MMM YYYY') : 'TBD';

        if (project['amount_requested'] == null) project['amount_requested'] = 0;
        if (project['amount_requested'] == '')
            var amount_requested = 'TBC';
        else
            var amount_requested = '£' + addCommas(project['amount_requested']);

        if (project['amount_awarded'] == null) project['amount_awarded'] = 0;
        if (project['amount_awarded'] == '')
            var amount_awarded = 'TBC';
        else
            var amount_awarded = '£' + addCommas(project['amount_awarded']);

        var organisation_overview = project['organisation_overview'] || 'TBC';
        var project_overview = project['project_overview'] || 'TBC';
        var project_milestone_1_desc = project['milestone_1_desc'] || 'TBC';
        var project_milestone_2_desc = project['milestone_2_desc'] || 'TBC';
        var project_milestone_3_desc = project['milestone_3_desc'] || 'TBC';
        var project_milestone_4_desc = project['milestone_4_desc'] || 'TBC';
        var project_evaluation = project['project_evaluation'] || 'TBC';

        var project_updates = '';
        if (project['project_updates']) {
            for (var i = 0; i < project['project_updates'].length; i++) {
                project_updates += ''+project['project_updates'][i].Project_Update__c+' ';
            }
        }
        var project_updates = project_updates || 'TBC';

        $('#project-title').text(project['project_title']);
        $('#project-organisation_name').text(project['organisation_name']);
        $('#project-organisation_overview').text(organisation_overview);
        $('#project-start_date').text(start);
        $('#project-end_date').text(end);
        // $('#project-amount_awarded').text(amount_awarded);
        $('#project-amount_requested').text(amount_requested);
        $('#project-amount_awarded').text(amount_awarded);

        $('#project-overview').text(project_overview);
        if (project_overview == 'TBC')
            $('.project-overview').hide();

        $('#project-milestone_1').text(project_milestone_1_desc);
        if (project_milestone_1_desc == 'TBC')
            $('.project-milestone_1').hide();

        $('#project-milestone_2').text(project_milestone_2_desc);
        if (project_milestone_2_desc == 'TBC')
            $('.project-milestone_2').hide();

        $('#project-milestone_3').text(project_milestone_3_desc);
        if (project_milestone_3_desc == 'TBC')
            $('.project-milestone_3').hide();
        $('#project-milestone_4').text(project_milestone_4_desc);
        if (project_milestone_4_desc == 'TBC')
            $('.project-milestone_4').hide();

        if (project_milestone_1_desc == 'TBC' &&
            project_milestone_2_desc == 'TBC' &&
            project_milestone_3_desc == 'TBC' &&
            project_milestone_4_desc == 'TBC')
            $('.project-milestones').hide();

        $('#project-outputs').text(project_evaluation);
        if (project_evaluation == 'TBC')
            $('.project-outputs').hide();

        $('#project-updates').text(project_updates);
        if (project_updates == 'TBC')
            $('.project-updates').hide();

        if (project_evaluation == 'TBC' &&
            project_updates == 'TBC')
            $('.project-evaluation').hide();

        setAttrOrHide('project-website', 'href', project, 'website');
        setAttrOrHide('project-twitter', 'href', project, 'twitter');
        setAttrOrHide('project-facebook', 'href', project, 'facebook');

        $('#project-tags').empty();
        project.individuals_supported.forEach(function(tag){
            var tagElement = createTag(tag)
            $('#project-tags').append(tagElement);
        });
    }

    function setAttrOrHide(id, attr, project, field) {
        if (project.hasOwnProperty(field) && project[field])
            $('#' + id).attr(attr, fixUrl(project[field]));
        else
            $('#' + id).hide();
    }

    function addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    function fixUrl(url) {
        if (url.indexOf('http') !== 0){
            url = 'http://' + url;
        }
        return url;
    }

    function createTag(tag){
        var chip = $('<a />')
            .addClass('chip blue darken-4 white-text')
            .attr('href', 'participation/projects/#' + tag)
            .html('<i class="fa fa-fw fa-tag"></i> ' + tag);
        return chip;
    }
}())

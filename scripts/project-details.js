(function () {
    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@50896fdf5c15388f8976945e5582a856.eu-west-1.aws.found.io',
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
        client.get({ index: 'web-content-production', type: 'scvo-grant-digital', id: projectId }).then(function(result){
            var project = result._source;
            var html = 'Loading...'

            if (project.full) {
                html = project.full;
            }

            $('#project-container').html(html);

            // displayProjectInfo(project);
            $('#project-container').show();
            $('#project-loading').hide();
        }).catch(function(err){
            console.error('ES Query Error:', err);
            window.location.href = '/participation/projects';
        });
    }

    function displayProjectInfo(project) {
        var start = project['planned_start'] ? moment(project['planned_start']).format('Do MMM YYYY') : 'TBD';
        var end = project['planned_end'] ? moment(project['planned_end']).format('Do MMM YYYY') : 'TBD';

        if (project['amount_requested'] == null) project['amount_requested'] = 0;
        if (project['amount_requested'] == '')
            var amount_requested = 'TBC';
        else
            var amount_requested = '£' + addCommas(project['amount_requested']);

        if (project['call'] == 'Call 4')
            var call_detail = 'Spring 2017';
        else if (project['call'] == 'Call 3')
            var call_detail = 'Winter 2015';
        else
            var call_detail = 'N/A';

        if (!project['amount_awarded'] || project['amount_awarded'] == 0) {
            if (!project['amount_requested'] || project['amount_requested'] == 0) {
                if (!project['amount_requested_total'] || project['amount_requested_total'] == 0) {
                    var amount_awarded = 'TBC';
                } else {
                    var amount_awarded = '£' + addCommas(project['amount_requested_total']);
                }
            } else {
                var amount_awarded = '£' + addCommas(project['amount_requested']);
            }
        } else {
            var amount_awarded = '£' + addCommas(project['amount_awarded']);
        }

        var recipient_overview = project['recipient_overview'] || 'TBC';
        var description = project['description'] || 'TBC';
        var project_milestone_1_desc = project['milestone_1_desc'] || 'TBC';
        var project_milestone_2_desc = project['milestone_2_desc'] || 'TBC';
        var project_milestone_3_desc = project['milestone_3_desc'] || 'TBC';
        var project_milestone_4_desc = project['milestone_4_desc'] || 'TBC';
        var project_evaluation = project['project_evaluation'] || 'TBC';

        var project_updates = 'TBC';
        if (project['project_updates']) {
            for (var i = 0; i < project['project_updates'].length; i++) {
                project_updates = '<p>' + (project['project_updates'][i].Project_Update__c || '').split(/[\r\n\t]+/gm).join('</p><p>') + '</p>';
            }
        }

        $('#project-title').text(project['title']);
        $('#project-recipient_name').text(project['recipient_name']);
        $('#project-recipient_overview').html(recipient_overview);
        if (recipient_overview == 'TBC')
            $('#project-recipient_overview').hide();
        $('#project-planned_start').text(start);
        $('#project-planned_end').text(end);
        // $('#project-amount_awarded').text(amount_awarded);
        $('#project-amount_requested').text(amount_requested);
        $('#project-amount_awarded').text(amount_awarded);

        $('#project-call').text(project['call']);
        $('#project-call_detail').text(call_detail);

        $('#project-overview').html(description);
        if (description == 'TBC')
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

        $('#project-outputs').html(project_evaluation);
        if (project_evaluation == 'TBC')
            $('.project-outputs').hide();

        $('#project-updates').html(project_updates);
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
            var tagElement = createTag(tag);
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
            .addClass('chip grey lighten-2 blue-text text-darken-4')
            .attr('href', 'participation/projects/#tag-' + tag)
            .html('<i class="fa fa-fw fa-tag"></i> ' + tag);
        return chip;
    }
}())

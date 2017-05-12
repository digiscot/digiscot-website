(function(){
    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@4c19757a0460c764d6e4712b0190cc21.eu-west-1.aws.found.io:9243',
        //log: 'trace',
        apiVersion: '2.4'
    });

    var projectId = window.location.hash.replace(/\#/, '');

    client.get({ index: 'funded-projects', type: 'project', id: projectId }).then((result) => {
        var project = result._source;
        $(document).ready(() => {
            $('#project-title').text(project['project-title']);
            $('#project-organisation').text(project['organisation']);
            $('#project-organisation-overview').text(project['organisation-overview']);
            $('#project-date-start').text(project['date-start']);
            $('#project-date-end').text(project['date-end']);
            $('#project-amount-requested').text(project['amount-requested']);

            setAttrOrHide('project-website', 'href', project, 'website');
            setAttrOrHide('project-email', 'href', project, 'email');
            setAttrOrHide('project-twitter-url', 'href', project, 'twitter');
            setAttrOrHide('project-facebook-url', 'href', project, 'facebook');
            setAttrOrHide('project-image', 'src', project, 'image');
        });
    }).catch((err) => {
        console.error('ES Query Error:', err);
        window.location.href = '/404';
    });

    function setAttrOrHide(id, attr, project, field){
        if(project.hasOwnProperty(field) && project[field]){
            $('#' + id).attr({ [attr]: project[field] });
        }else{
            $('#' + id).hide();
        }
    }
}())

(function () {
    var tag;

    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@4c19757a0460c764d6e4712b0190cc21.eu-west-1.aws.found.io',
        //log: 'trace',
        apiVersion: '2.4'
    });

    getProjects();

    function getProjects() {
        var payload = {
            index: 'grants',
            type: 'grant',
            body: {
                query: {
                    bool: {
                        must: []
                    }
                },
                sort: 'title'
            },
            size: 1000
        }

        client.search(payload).then(function(results){
            var grants = [];
            var hits = results.hits.hits;
            for (var i = 0; i < hits.length; i++) {
                var grant = hits[i]._source;

                grant.id = 'SCVO-' + grant.Id;
                delete grant.Id;

                grant.currency = "GBP";

                if (grant.awardDate) {
                    grant.awardDate = new Date(grant.awardDate).toISOString();
                } else {
                    grant.awardDate = '';
                }

                grant.plannedDates = {};
                if (grant.plannedStart) {
                    grant.plannedDates.startDate = new Date(grant.plannedStart).toISOString();
                } else {
                    grant.plannedDates.startDate = '';
                }
                delete grant.plannedStart;

                if (grant.plannedEnd) {
                    grant.plannedDates.endDate = new Date(grant.plannedEnd).toISOString();
                } else {
                    grant.plannedDates.endDate = '';
                }
                delete grant.plannedEnd;

                grant.actualDates = {};
                if (grant.actualStart) {
                    grant.actualDates.startDate = new Date(grant.actualStart).toISOString();
                } else {
                    grant.actualDates.startDate = '';
                }
                delete grant.actualStart;

                if (grant.actualEnd) {
                    grant.actualDates.endDate = new Date(grant.actualEnd).toISOString();
                } else {
                    grant.actualDates.endDate = '';
                }
                delete grant.actualEnd;

                if (grant.dateModified) {
                    grant.dateModified = new Date(grant.dateModified).toISOString();
                } else {
                    grant.dateModified = '';
                }

                grant.recipientOrganization = {};
                if (grant.recipientOrganizationCharityNumber) {
                    grant.recipientOrganization.id = 'GB-SC-' + grant.recipientOrganizationCharityNumber;
                    grant.recipientOrganization.charityNumner = grant.recipientOrganizationCharityNumber;
                } else if (grant.recipientOrganizationId) {
                    grant.recipientOrganization.id = 'SCVO-' + grant.recipientOrganizationId;
                } else {
                    grant.recipientOrganization.id = '';
                }
                delete grant.recipientOrganizationId;

                if (grant.recipientOrganizationName) {
                    grant.recipientOrganization.name = grant.recipientOrganizationName;
                } else {
                    grant.recipientOrganization.name = '';
                }
                delete grant.recipientOrganizationName;

                if (grant.recipientOrganizationUrl) {
                    var url = grant.recipientOrganizationUrl;
                    var prefix = 'http://';
                    if (url.substr(0, prefix.length) !== prefix) url = prefix + url;
                    grant.recipientOrganization.url = url;
                } else {
                    grant.recipientOrganization.url = '';
                }
                delete grant.recipientOrganizationUrl;

                grant.fundingOrganization = {};
                grant.fundingOrganization.id = 'GB-SC-SC003558';
                grant.fundingOrganization.name = 'Scottish Council For Voluntary Organisations';
                grant.fundingOrganization.charityNumber = 'SC003558';
                grant.fundingOrganization.url = 'http://scvo.org';

                grant.grantProgramme = {};
                grant.grantProgramme.code = 'digital-challenge-fund';
                grant.grantProgramme.title = 'Digital Participation Challenge Fund';
                grant.grantProgramme.description = 'Our Digital Participation Challenge Fund, supported by by the Scottish Government, the ERDF and BT, invests in community digital participation projects across Scotland. The projects that we’re supporting will enable groups and organisations to digitise content, build digital networks and improve the digital skills of their members, so that they can continue to thrive in the digital world.';
                grant.grantProgramme.url = 'http://digital.scvo.org.uk/participation/challenge-fund/';

                grant.fromOpenCall = 'Yes'

                if (grant.call == 'Call 4') {
                    grant.url = 'http://digital.scvo.org.uk/participation/project/#' + grant.slug;
                } else {
                    grant.url = '';
                }
                delete grant.call;
                delete grant.slug;

                grants.push(grant);
            }

            console.log(grants);

            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(grants));
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "digital-challenge-fund.json");
            // dlAnchorElem.click();

            // $('#projects-container').show();
            // $('#projects-loading').hide();
            // $('#projects-count').text(hits.total);
            // $('#projects-results').empty();
            //
            // var projectCards = [];
            // hits.hits.forEach(function(hit){
            //     var project = hit._source;
            //     var projectCard = createProject(project);
            //     projectCards.push(projectCard);
            // });
            //
            // for (var i = 0, j = projectCards.length, chunk = 3; i < j; i += chunk) {
            //     var temp = projectCards.slice(i, i + chunk);
            //     var row = $('<div />').addClass('row');
            //     temp.forEach(function(cell){
            //         cell.addClass('col s12 m' + (18/chunk) + ' l' + (12/chunk));
            //         row.append(cell);
            //     });
            //     $('#projects-results').append(row);
            // }
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

        return cell;
    }
}())

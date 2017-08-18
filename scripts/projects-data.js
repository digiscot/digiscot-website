(function () {
    var tag;

    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@4c19757a0460c764d6e4712b0190cc21.eu-west-1.aws.found.io',
        //log: 'trace',
        apiVersion: '2.4'
    });

    getProjects();

    function getProjects() {
        var fundType = 'grants-ccrf'; // grants-ccrf or grants-digital
        var payload = {
            index: fundType,
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
            var grantsExport = {};
            grantsExport.grants = [];
            var hits = results.hits.hits;
            for (var i = 0; i < hits.length; i++) {
                var grant = hits[i]._source;

                grant.id = "360G-SCVO-" + grant.Id;
                delete grant.Id;

                grant.currency = "GBP";

                if (!grant.description) {
                    grant.description = "Detailed information not yet available.";
                }

                if (grant.totalAmountRequested) {
                    grant.amountAppliedFor = grant.totalAmountRequested;
                    grant.amountAwarded = grant.totalAmountRequested;
                } else {
                    grant.amountAwarded = grant.amountAppliedFor;
                }
                delete grant.totalAmountRequested;

                if (grant.plannedStart) {
                    grant.awardDate = formatDate(grant.plannedStart);
                } else {
                    grant.awardDate = '2014-01-01';
                }

                var plannedDates = {};
                var addPlannedDates = false;
                if (grant.plannedStart) {
                    plannedDates.startDate = formatDate(grant.plannedStart);
                    addPlannedDates = true;
                }
                delete grant.plannedStart;
                if (grant.plannedEnd) {
                    plannedDates.endDate = formatDate(grant.plannedEnd);
                    addPlannedDates = true;
                }
                delete grant.plannedEnd;
                if (addPlannedDates) {
                    grant.plannedDates = [];
                    if (grant.dateModified) {
                        plannedDates.dateModified = formatDate(grant.dateModified);
                    }
                    grant.plannedDates.push(plannedDates);
                }

                var actualDates = {};
                var addActualDates = false;
                if (grant.actualStart) {
                    actualDates.startDate = formatDate(grant.actualStart);
                    addActualDates = true;
                }
                delete grant.actualStart;
                if (grant.actualEnd) {
                    actualDates.endDate = formatDate(grant.actualEnd);
                    addActualDates = true;
                }
                delete grant.actualEnd;
                if (addActualDates) {
                    grant.actualDates = [];
                    if (grant.dateModified) {
                        actualDates.dateModified = formatDate(grant.dateModified);
                    }
                    grant.actualDates.push(actualDates);
                }

                // Date modified
                if (grant.dateModified) {
                    grant.dateModified = formatDate(grant.dateModified);
                }

                // Set up recipient org
                var recipientOrganization = {};
                if (grant.recipientOrganizationCharityNumber) {
                    // Charity number as ID
                    recipientOrganization.id = "GB-SC-" + grant.recipientOrganizationCharityNumber;
                    recipientOrganization.charityNumber = grant.recipientOrganizationCharityNumber;
                } else if (grant.recipientOrganizationId) {
                    // Salesforce Id as ID
                    recipientOrganization.id = "SCVO-" + grant.recipientOrganizationId;
                } else {
                    // No ID?!
                    recipientOrganization.id = "";
                }
                delete grant.recipientOrganizationCharityNumber;
                delete grant.recipientOrganizationId;
                if (grant.recipientOrganizationName) {
                    // Organisation name
                    recipientOrganization.name = grant.recipientOrganizationName;
                } else {
                    // No name?!
                    recipientOrganization.name = "";
                }
                delete grant.recipientOrganizationName;
                // Address street
                if (grant.addressStreet) {
                    recipientOrganization.streetAddress = grant.addressStreet;
                }
                delete grant.addressStreet;
                // Address town
                if (grant.addressTown) {
                    recipientOrganization.addressLocality = grant.addressTown;
                }
                delete grant.addressTown;
                // Address region
                if (grant.addressRegion) {
                    recipientOrganization.addressRegion = grant.addressRegion;
                }
                delete grant.addressRegion;
                // Address postcode
                if (grant.addressPostcode) {
                    recipientOrganization.postalCode = grant.addressPostcode;
                    if (grant.addressLocation.latitude && grant.addressLocation.longitude) {
                        var location = {};
                        location.latitude = ""+grant.addressLocation.latitude;
                        location.longitude = ""+grant.addressLocation.longitude;
                        recipientOrganization.location = [];
                        recipientOrganization.location.push(location);
                    }
                }
                delete grant.addressPostcode;
                delete grant.addressLocation;
                delete grant.addressLocation_coords;
                // Address country
                recipientOrganization.addressCountry = "Scotland";
                // URL
                if (grant.recipientOrganizationUrl) {
                    var url = grant.recipientOrganizationUrl;
                    var prefix = "http://";
                    if (url.substr(0, prefix.length) !== prefix) url = prefix + url;
                    recipientOrganization.url = url;
                }
                delete grant.recipientOrganizationUrl;
                grant.recipientOrganization = [];
                grant.recipientOrganization.push(recipientOrganization);

                var location = {};
                var fundingOrganization = {};
                fundingOrganization.id = "GB-SC-SC003558";
                fundingOrganization.name = "Scottish Council For Voluntary Organisations";
                fundingOrganization.charityNumber = "SC003558";
                if (fundType == 'grants-digital') {
                    fundingOrganization.department = "Digital";
                    fundingOrganization.streetAddress = "Hayweight House, 23 Lauriston Street";
                    location.latitude = "55.945492";
                    location.longitude = "-3.201152";
                } else {
                    fundingOrganization.department = "Policy";
                    fundingOrganization.streetAddress = "Mansfield Traquair, 15 Mansfield Place";
                    location.latitude = "55.959611";
                    location.longitude = "-3.190946";
                }
                fundingOrganization.location = [];
                fundingOrganization.location.push(location);
                fundingOrganization.addressLocality = "Edinburgh";
                fundingOrganization.addressRegion = "City of Edinburgh";
                fundingOrganization.addressCountry = "Scotland";
                fundingOrganization.postalCode = "EH3 9DQ";
                fundingOrganization.description = "The Scottish Council for Voluntary Organisations is the membership organisation for Scotland's charities, voluntary organisations and social enterprises.";
                fundingOrganization.url = "http://scvo.org";
                grant.fundingOrganization = [];
                grant.fundingOrganization.push(fundingOrganization);

                var grantProgramme = {};
                var call, call_detail = "";
                if (grant.call) {
                    call = "-" + grant.call.replace(/\s+/g, '-').toLowerCase();
                    switch (grant.call) {
                        case "Call 1":
                            call_detail = " (Winter 2014)";
                            break;
                        case "Call 2":
                            call_detail = " (Spring 2015)";
                            break;
                        case "Call 3":
                            call_detail = " (Winter 2015)";
                            break;
                        case "Call 4":
                            call_detail = " (Spring 2017)";
                            break;
                        case "Call 5":
                            call_detail = " (Autumn 2017)";
                            break;
                        default:
                            call_detail = "";
                            break;
                    }
                }
                if (fundType == 'grants-digital') {
                    if (grant.call == "Call 1" || grant.call == "Call 2" || grant.call == "Call 3") {
                        grantProgramme.code = "scvo-digital-challenge-fund" + call;
                        grantProgramme.title = "Digital Participation Challenge Fund - " + grant.call + call_detail;
                        grantProgramme.description = "Our Digital Participation Challenge Fund, supported by by the Scottish Government, the ERDF and BT, invests in community digital participation projects across Scotland. The projects that we're supporting will enable groups and organisations to digitise content, build digital networks and improve the digital skills of their members, so that they can continue to thrive in the digital world.";
                        grantProgramme.url = "http://digital.scvo.org.uk/participation/challenge-fund/";
                    } else {
                        grantProgramme.code = "scvo-digital-charter-fund" + call;
                        grantProgramme.title = "Digital Participation Charter Fund - " + grant.call + call_detail;
                        grantProgramme.description = "Our Digital Participation Charter Fund, supported by by the Scottish Government, the ERDF and BT, invests in community digital participation projects across Scotland. The projects that we're supporting will enable groups and organisations to digitise content, build digital networks and improve the digital skills of their members, so that they can continue to thrive in the digital world.";
                        grantProgramme.url = "http://digital.scvo.org.uk/participation/charter-fund/";
                    }
                } else {
                    grantProgramme.code = "scvo-community-capacity-and-resilience-fund" + call;
                    grantProgramme.title = "Community Capacity & Resilience Fund - " + grant.call;
                    grantProgramme.description = "Funding to help local third sector groups and organisations across Scotland tackle poverty and mitigate against UK government welfare changes.";
                    grantProgramme.url = "http://www.scvo.org/running-your-organisation/funding/capacity-resilience-fund/";
                }
                grant.grantProgramme = [];
                grant.grantProgramme.push(grantProgramme);

                grant.fromOpenCall = "Yes";

                if (grant.individuals_supported) {
                    // for (var i = 0; i < grant.individuals_supported.length; i++) {
                    //     var fundingType = {};
                    //     fundingType.vocabulary = "tags";
                    //     fundingType.title = grant.individuals_supported[i];
                    //     grant.fundingType = [];
                    //     grant.fundingType.push(fundingType);
                    // }
                }
                delete grant.individuals_supported;

                if (grant.call == "Call 4" || grant.call == "Call 5") {
                    grant.url = "http://digital.scvo.org.uk/participation/project/#" + grant.slug;
                }
                delete grant.call;
                delete grant.slug;

                if (grant.id &&
                    grant.title &&
                    grant.description &&
                    grant.currency &&
                    grant.amountAwarded &&
                    grant.awardDate &&
                    grant.recipientOrganization &&
                    grant.fundingOrganization) {
                    grantsExport.grants.push(grant);
                }
            }

            console.log(grantsExport.grants);

            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(grantsExport));
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", fundType+".json");
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
            .text(project.organisation_name)
            .appendTo(content);
        var title = $('<p />').appendTo(content);
        var titleBold = $('<strong />').text(project.project_title).appendTo(title);
        var exerpt = $('<p />').text(S(project.project_overview).truncate(140, '...').s).appendTo(content);
        var actions = $('<div />').addClass('card-action').appendTo(card);

        return cell;
    }
}())

(function () {
    var tag;

    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@50896fdf5c15388f8976945e5582a856.eu-west-1.aws.found.io',
        //log: 'trace',
        apiVersion: '2.4'
    });

    getProjects();

    function getProjects() {
        var fundType = 'scvo-grant-digital'; // scvo-grant-digital or scvo-grant-ccrf or scvo-grant-ccrf-additional
        var payload = {
            index: 'web-content-test',
            type: fundType,
            body: {
                query: {
                    bool: {
                        must: []
                    }
                }
                // sort: 'title'
            },
            size: 1000
        }

        client.search(payload).then(function(results){
            var grantsExport = {};
            grantsExport.grants = [];
            var hits = results.hits.hits;
            for (var i = 0; i < hits.length; i++) {
                var grant_data = hits[i]._source;
                var grant = {};

                if (grant_data.views) {
                    for (var k = 0; k < grant_data.views.length; k++) {
                        if (grant_data.views[k].name == 'threesixtygiving') {
                            var json = grant_data.views[k].json;
                            json = json.replace(/(?:\r\n|\r|\n)/g,'')
                                       .replace(/\\"/g, '"')
                                       .replace(/\\./g, ".")
                                       .replace(/\\&/g, "\\&")
                                       .replace(/\\t/g, "\\t")
                                       .replace(/\\b/g, "\\b")
                                       .replace(/\\f/g, "\\f")
                                       .replace(/[\u0000-\u0019]+/g,"");
                            // console.log(json);
                            grant = JSON.parse(json);
                        }
                    }
                }
                grantsExport.grants.push(grant);

                // var grant = {};
                // grant.id = "360G-SCVO-" + grant_data.Id;
                // grant.call = grant_data.call;
                // grant.title = grant_data.title;
                // grant.description = grant_data.description;
                //
                // grant.currency = "GBP";
                //
                // if (!grant_data.description) {
                //     grant.description = "Detailed information not yet available.";
                // }
                //
                // if (grant_data.amount_requested) {
                //     grant.amountAppliedFor = grant_data.amount_requested;
                // }
                // if (grant_data.amount_awarded) {
                //     grant.amountAwarded = grant_data.amount_awarded;
                // } else {
                //     if (grant_data.amount_requested_total) {
                //         grant.amountAppliedFor = grant_data.amount_requested_total;
                //         grant.amountAwarded = grant_data.amount_requested_total;
                //     } else {
                //         grant.amountAwarded = grant_data.amount_requested;
                //     }
                // }
                //
                // if (grant_data.planned_start) {
                //     grant.awardDate = formatDate(grant_data.planned_start);
                // } else {
                //     if (grant_data.actual_start) {
                //         grant.awardDate = formatDate(grant_data.actual_start);
                //     } else {
                //         grant.awardDate = '2014-01-01';
                //     }
                // }
                //
                // var plannedDates = {};
                // var addPlannedDates = false;
                // if (grant_data.planned_start) {
                //     plannedDates.startDate = formatDate(grant_data.planned_start);
                //     addPlannedDates = true;
                // }
                // if (grant_data.planned_end) {
                //     plannedDates.endDate = formatDate(grant_data.planned_end);
                //     addPlannedDates = true;
                // }
                // if (addPlannedDates) {
                //     grant.plannedDates = [];
                //     if (grant_data.date_modified) {
                //         plannedDates.dateModified = formatDate(grant_data.date_modified);
                //     }
                //     grant.plannedDates.push(plannedDates);
                // }
                //
                // var actualDates = {};
                // var addActualDates = false;
                // if (grant_data.actual_start) {
                //     actualDates.startDate = formatDate(grant_data.actual_start);
                //     addActualDates = true;
                // }
                // if (grant_data.actual_end) {
                //     actualDates.endDate = formatDate(grant_data.actual_end);
                //     addActualDates = true;
                // }
                // if (addActualDates) {
                //     grant.actualDates = [];
                //     if (grant_data.last_modified) {
                //         actualDates.dateModified = formatDate(grant_data.last_modified);
                //     }
                //     grant.actualDates.push(actualDates);
                // }
                //
                // // Date modified
                // if (grant_data.last_modified) {
                //     grant.dateModified = formatDate(grant_data.last_modified);
                // }
                //
                // // Set up recipient org
                // var recipientOrganization = {};
                // if (grant_data.recipient_charity_number) {
                //     // Charity number as ID
                //     recipientOrganization.id = "GB-SC-" + grant_data.recipient_charity_number;
                //     recipientOrganization.charityNumber = grant_data.recipient_charity_number;
                // } else if (grant.recipientOrganizationId) {
                //     // Salesforce Id as ID
                //     recipientOrganization.id = "SCVO-" + grant_data.recipient_id;
                // } else {
                //     // No ID?!
                //     recipientOrganization.id = "";
                // }
                // if (grant_data.recipient_name) {
                //     // Organisation name
                //     recipientOrganization.name = grant_data.recipient_name;
                // } else {
                //     // No name?!
                //     recipientOrganization.name = "";
                // }
                // // Address street
                // if (grant_data.recipient_address_street) {
                //     recipientOrganization.streetAddress = grant_data.recipient_address_street;
                // }
                // // Address town
                // if (grant_data.recipient_address_town) {
                //     recipientOrganization.addressLocality = grant_data.recipient_address_town;
                // }
                // // Address region
                // if (grant_data.recipient_address_region) {
                //     recipientOrganization.addressRegion = grant_data.recipient_address_region;
                // }
                // // Address postcode
                // if (grant_data.recipient_address_postcode) {
                //     recipientOrganization.postalCode = grant_data.recipient_address_postcode;
                //     if (grant_data.recipient_address_location_coords.lat && grant_data.recipient_address_location_coords.lon) {
                //         var location = {};
                //         location.latitude = ""+grant_data.recipient_address_location_coords.lat;
                //         location.longitude = ""+grant_data.recipient_address_location_coords.lon;
                //         recipientOrganization.location = [];
                //         recipientOrganization.location.push(location);
                //     }
                // }
                // // Address country
                // recipientOrganization.addressCountry = "Scotland";
                // // URL
                // if (grant_data.recipient_url) {
                //     var url = grant_data.recipient_url;
                //     var prefix = "http://";
                //     if (url.substr(0, prefix.length) !== prefix) url = prefix + url;
                //     recipientOrganization.url = url;
                // }
                // grant.recipientOrganization = [];
                // grant.recipientOrganization.push(recipientOrganization);
                //
                // var location = {};
                // var fundingOrganization = {};
                // fundingOrganization.id = "GB-SC-SC003558";
                // fundingOrganization.name = "Scottish Council For Voluntary Organisations";
                // fundingOrganization.charityNumber = "SC003558";
                // if (fundType == 'scvo-grant-digital') {
                //     fundingOrganization.department = "Digital";
                //     fundingOrganization.streetAddress = "Hayweight House, 23 Lauriston Street";
                //     location.latitude = "55.945492";
                //     location.longitude = "-3.201152";
                // } else {
                //     fundingOrganization.department = "Policy";
                //     fundingOrganization.streetAddress = "Mansfield Traquair, 15 Mansfield Place";
                //     location.latitude = "55.959611";
                //     location.longitude = "-3.190946";
                // }
                // fundingOrganization.location = [];
                // fundingOrganization.location.push(location);
                // fundingOrganization.addressLocality = "Edinburgh";
                // fundingOrganization.addressRegion = "City of Edinburgh";
                // fundingOrganization.addressCountry = "Scotland";
                // fundingOrganization.postalCode = "EH3 9DQ";
                // fundingOrganization.description = "The Scottish Council for Voluntary Organisations is the membership organisation for Scotland's charities, voluntary organisations and social enterprises.";
                // fundingOrganization.url = "http://scvo.org";
                // grant.fundingOrganization = [];
                // grant.fundingOrganization.push(fundingOrganization);
                //
                // var grantProgramme = {};
                // var call, call_detail = "";
                // if (fundType == 'scvo-grant-digital' && grant_data.call) {
                //     call = "-" + grant_data.call.replace(/\s+/g, '-').toLowerCase();
                //     switch (grant_data.call) {
                //         case "Call 1":
                //             call_detail = " (Winter 2014)";
                //             break;
                //         case "Call 2":
                //             call_detail = " (Spring 2015)";
                //             break;
                //         case "Call 3":
                //             call_detail = " (Winter 2015)";
                //             break;
                //         case "Call 4":
                //             call_detail = " (Spring 2017)";
                //             break;
                //         case "Call 5":
                //             call_detail = " (Autumn 2017)";
                //             break;
                //         default:
                //             call_detail = "";
                //             break;
                //     }
                // }
                // if (fundType == 'scvo-grant-digital') {
                //     if (grant_data.call == "Call 1" || grant_data.call == "Call 2" || grant_data.call == "Call 3") {
                //         grantProgramme.code = "scvo-digital-challenge-fund" + call;
                //         grantProgramme.title = "Digital Participation Challenge Fund - " + grant_data.call + call_detail;
                //         grantProgramme.description = "Our Digital Participation Challenge Fund, supported by by the Scottish Government, the ERDF and BT, invests in community digital participation projects across Scotland. The projects that we're supporting will enable groups and organisations to digitise content, build digital networks and improve the digital skills of their members, so that they can continue to thrive in the digital world.";
                //         grantProgramme.url = "http://digital.scvo.org.uk/participation/challenge-fund/";
                //     } else {
                //         grantProgramme.code = "scvo-digital-charter-fund" + call;
                //         grantProgramme.title = "Digital Participation Charter Fund - " + grant_data.call + call_detail;
                //         grantProgramme.description = "Our Digital Participation Charter Fund, supported by by the Scottish Government, the ERDF and BT, invests in community digital participation projects across Scotland. The projects that we're supporting will enable groups and organisations to digitise content, build digital networks and improve the digital skills of their members, so that they can continue to thrive in the digital world.";
                //         grantProgramme.url = "http://digital.scvo.org.uk/participation/charter-fund/";
                //     }
                // } else {
                //     grantProgramme.code = "scvo-community-capacity-and-resilience-fund" + call;
                //     grantProgramme.title = "Community Capacity & Resilience Fund - " + grant_data.call;
                //     grantProgramme.description = "Funding to help local third sector groups and organisations across Scotland tackle poverty and mitigate against UK government welfare changes.";
                //     grantProgramme.url = "http://www.scvo.org/running-your-organisation/funding/capacity-resilience-fund/";
                // }
                // grant.grantProgramme = [];
                // grant.grantProgramme.push(grantProgramme);
                //
                // grant.fromOpenCall = "Yes";
                //
                // if (grant_data.individuals_supported) {
                //     // for (var i = 0; i < grant_data.individuals_supported.length; i++) {
                //     //     var fundingType = {};
                //     //     fundingType.vocabulary = "tags";
                //     //     fundingType.title = grant.individuals_supported[i];
                //     //     grant.fundingType = [];
                //     //     grant.fundingType.push(fundingType);
                //     // }
                // }
                //
                // if (grant_data.call == "Call 4" || grant_data.call == "Call 5") {
                //     grant.url = "http://digital.scvo.org.uk/participation/project/#" + grant.slug;
                // }
                //
                // // console.log(grant_data);
                // console.log(grant);

                // grantsExport.grants.push(grant);
            }

            // console.log(grantsExport.grants);

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
            .text(project.recipient_name)
            .appendTo(content);
        var title = $('<p />').appendTo(content);
        var titleBold = $('<strong />').text(project.title).appendTo(title);
        var exerpt = $('<p />').text(S(project.project_overview).truncate(140, '...').s).appendTo(content);
        var actions = $('<div />').addClass('card-action').appendTo(card);

        return cell;
    }
}())

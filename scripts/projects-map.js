(function () {
    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@50896fdf5c15388f8976945e5582a856.eu-west-1.aws.found.io',
        //log: 'trace',
        apiVersion: '2.4'
    });

    var payload = {
        "index": "digital-funded-projects",
        "type": "project",
        "body": {
            "query": {
                "bool": {
                    "must": []
                }
            },
            "sort": "recipient_name"
        },
        size: 1000
    }

    payload.body.query.bool.must.push({ match_all: {} });

    client.search(payload).then(function(results){
        var hits = results.hits.hits;

        for (var i = 0; i < hits.length; i++) {
            if (hits[i]._source.address_postcode) {
                postcodes.push(hits[i]._source.address_postcode);
                console.log(hits[i]._source.address_location.latitude);
                console.log(hits[i]._source.address_location.longitude);
            }
        }
        console.log(postcodes);

    }).catch(function(err){
        console.error('ES Query Error:', err);
    });
}())

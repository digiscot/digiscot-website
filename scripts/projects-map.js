(function () {
    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@50896fdf5c15388f8976945e5582a856.eu-west-1.aws.found.io',
        //log: 'trace',
        apiVersion: '2.4'
    });

    var payload = {
        "index": "web-content-production",
        "type": "scvo-grant-charter",
        "body": {
            "query": {
                "bool": {
                    "must": []
                }
            }
        },
        size: 1000
    }

    payload.body.query.bool.must.push({ match_all: {} });

    client.search(payload).then(function(results){
        var hits = results.hits.hits;

        for (var i = 0; i < hits.length; i++) {
            if (hits[i]._source.recipient_address_location_coords) {
                postcodes.push(hits[i]._source.recipient_address_postcode);
                console.log(hits[i]._source.recipient_address_location_coords.lat);
                console.log(hits[i]._source.recipient_address_location_coords.log);
            }
        }
        console.log(postcodes);

    }).catch(function(err){
        console.error('ES Query Error:', err);
    });
}())

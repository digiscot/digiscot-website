(function(){
    var elasticsearch = require('elasticsearch');
    var client = new elasticsearch.Client({
        host: 'https://readonly:onlyread@4c19757a0460c764d6e4712b0190cc21.eu-west-1.aws.found.io:9243',
        //log: 'trace',
        apiVersion: '2.4'
    });

    client.search({ index: goodmoves, type: job, query: { match_all: {} } }).then((results) => {
        console.log('ES Query', results);
    }).catch((err) => {
        console.error('ES Query Error:', err);
    });
}())

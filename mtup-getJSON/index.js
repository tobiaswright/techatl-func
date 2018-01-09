module.exports = function (context, myTimer, inputBlob) {
    let request = require('request');
    let grps = inputBlob.groups;
    let grpsJoin = grps.join();
    let events = []

    request('https://api.meetup.com/2/events?key=487d5f252445191353615c2177144025&sign=true&group_id=' + grpsJoin, function (error, response, body) {

        var res = JSON.parse(body);
        var arr = res.results
        var d = new Date(res.results[0].time)

        arr.forEach(function(element) {
            events.push({
                name: element.name,
                time:element.time,
                url:element.event_url,
                desc: element.description,
                group:element.group.name,

            })
        });
       
        context.bindings.outputBlob = { "events":events}
        context.log(context.bindings);
        context.done();
    });
    
};
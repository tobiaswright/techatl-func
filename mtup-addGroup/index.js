const request = require('request');

module.exports = (context, req, inputBlob) => { 
    request('https://api.meetup.com/' + req.body, (error, response, body) => {
        let result = JSON.parse(body);
        let groups = inputBlob.groups;
        let message;

        if (result.errors) {
            message = result.errors[0].message;
        }
        
        if (result.id) {
            if (groups.includes(result.id)) {
                message = "Group already exist";
            } else {
                groups.push(result.id);
                context.bindings.outputBlob = {groups: groups};
                message = result.name + ' added!';
            }
        }

        context.res.body = message;
        context.done();
    });
};
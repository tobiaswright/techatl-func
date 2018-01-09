module.exports = function (context, trigger, inputBlob) {
    context.res.body = inputBlob;
    context.done();
};
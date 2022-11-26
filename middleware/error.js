module.exports = function(err, req, res, next){
    //Still need to log the exception
    res.status(500).send('something failed.')
}
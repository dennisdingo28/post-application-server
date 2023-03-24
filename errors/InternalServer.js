const CustomError = require('./CustomError');

class InternalServer extends CustomError {
    constructor(message){
        super(message);
        this.statusCode=500;
    }
}

module.exports = InternalServer;
//200-ok
//201-created
//400-bad request
//401-unauthorized
//404-not found
//500-internal server error
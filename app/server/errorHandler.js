class NotFound extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFound';
      this.statusCode = 404;
    }
  }
  
  class BadRequest extends Error {
    constructor(message) {
      super(message);
      this.name = 'BadRequest';
      this.statusCode = 400;
    }
  }
  
  const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err instanceof NotFound || err instanceof BadRequest) {
      return res.status(err.statusCode).json({ message: err.message });
    }
  
    res.status(500).json({ message: 'Internal Server Error' });
  };
  
module.exports = { NotFound, BadRequest, errorHandler };
  
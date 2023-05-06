class BadRequest extends Error {
    constructor(message) {
      super(message);
      this.name = 'BadRequest';
      this.statusCode = 400;
    }
  }


  class NotFound extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFound';
      this.statusCode = 404;
    }
  }

  module.exports = {
    BadRequest,
    NotFound
  }
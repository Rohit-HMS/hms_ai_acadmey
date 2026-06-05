class APIError extends Error {
  constructor(message, status, data, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.data = data;
    this.isPublic = isPublic;
  }
}

module.exports = APIError;
module.exports.default = APIError;

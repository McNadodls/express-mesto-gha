const { NOT_FOUND, NOT_VALID, SERVER_ERROR } = require('./constatnts');
function validityErr(res, err) {
    if (err.statusCode === 404) {
        res.status(NOT_FOUND.statusCode).send({ message: err.message });
        return;
      } if (err.name === 'CastError' || err.name === "ValidationError") {
        res.status(NOT_VALID.statusCode).send({ message: NOT_VALID.message });
        return;
      }
      res.status(SERVER_ERROR.statusCode).send({ message: SERVER_ERROR.message });
}
module.exports = validityErr;
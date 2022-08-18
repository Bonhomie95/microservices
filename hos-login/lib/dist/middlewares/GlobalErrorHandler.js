import K from "../constants/index.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GlobalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || K.HttpStatusCode.SERVER_ERROR;
    const message = err.message || K.ResponseMessage.ERR_SERVER;
    const metaData = err.metaData || {};
    res.status(statusCode).send(Object.assign({ message }, metaData));
};
export default GlobalErrorHandler;

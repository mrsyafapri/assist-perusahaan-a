const responseSuccess = (res, data, message, status) => {
    const response = {
        status,
        message,
        data,
    };
    return res.status(status).json(response);
};

const responseError = (res, message, status) => {
    const response = {
        status,
        message,
    };
    return res.status(status).json(response);
};

const handleAxiosError = (error, res) => {
    if (error.response) {
        responseError(res, error.response.data.message, error.response.status);
    } else {
        responseError(res, 'Internal server error', 500);
    }
};

module.exports = { responseSuccess, responseError, handleAxiosError };

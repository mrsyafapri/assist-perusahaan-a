const { responseError } = require('../utils/responseHandler');

const requireAdmin = (req, res, next) => {
    const { employee } = req;

    if (!employee.isAdmin) {
        return responseError(res, 'Access denied! Only admin are allowed', 403);
    }

    next();
};

module.exports = requireAdmin;

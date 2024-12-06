"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res, next) => {
    const status = !error.status ? 500 : error.status;
    const message = status === 500 ? "Internal sever error" : error.message;
    res.status(status).json({
        message,
        payload: error.payload,
        status,
        success: false,
    });
};
exports.errorMiddleware = errorMiddleware;

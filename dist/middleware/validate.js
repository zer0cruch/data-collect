"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedResult = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
    });
    if (parsedResult.success)
        return next();
    const result = {};
    for (const entry of parsedResult.error.errors) {
        const key = entry.path[entry.path.length - 1];
        result[key] = entry.message;
    }
    return next({
        message: "An error occurred while validating the request",
        payload: result,
        status: 400,
        success: false,
    });
});
exports.validate = validate;

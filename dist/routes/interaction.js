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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionRouter = void 0;
const express_1 = __importDefault(require("express"));
const node_ipinfo_1 = require("node-ipinfo");
const request_ip_1 = __importDefault(require("request-ip"));
const useragent_1 = __importDefault(require("useragent"));
const zod_1 = require("zod");
const validate_1 = require("../middleware/validate");
const clicks_1 = require("../models/clicks");
const devices_1 = require("../models/devices");
const hovers_1 = require("../models/hovers");
const locations_1 = require("../models/locations");
const session_1 = require("../models/session");
const interactionRouter = express_1.default.Router();
exports.interactionRouter = interactionRouter;
const clickValidator = zod_1.z.object({
    clickedAt: zod_1.z.string().datetime(),
    contentId: zod_1.z.string().optional(),
    type: zod_1.z.literal("click"),
});
const hoverValidator = zod_1.z.object({
    contentId: zod_1.z.string(),
    mouseEnteredAt: zod_1.z.string().datetime(),
    mouseExitedAt: zod_1.z.string().datetime(),
    type: zod_1.z.literal("hover"),
});
const sessionValidator = zod_1.z.object({
    contentId: zod_1.z.string().optional(),
    endDate: zod_1.z.string().datetime(),
    startDate: zod_1.z.string().datetime(),
    type: zod_1.z.literal("session"),
});
const collectInteractionValidator = zod_1.z.object({
    body: zod_1.z.discriminatedUnion("type", [
        clickValidator,
        hoverValidator,
        sessionValidator,
    ]),
});
interactionRouter.post("/interactions", [
    (0, validate_1.validate)(collectInteractionValidator),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const rawUserAgent = req.headers["user-agent"];
        const agent = useragent_1.default.parse(rawUserAgent);
        const existingUserAgent = yield devices_1.DeviceModel.findOne({
            userAgent: rawUserAgent,
        });
        let deviceId = undefined;
        if (!existingUserAgent) {
            const createdUserAgent = yield devices_1.DeviceModel.create({
                browser: agent.toAgent(),
                device: agent.device.toString(),
                os: agent.os.toString(),
                userAgent: rawUserAgent,
            });
            deviceId = createdUserAgent._id;
        }
        deviceId = deviceId;
        const ip = request_ip_1.default.getClientIp(req);
        if (ip) {
            const existingLocation = yield locations_1.LocationModel.findOne({ ip });
            if (!existingLocation) {
                const ipInfoAccessKey = process.env.IP_INFO_ACCESS_KEY;
                const ipInfoWrapper = new node_ipinfo_1.IPinfoWrapper(ipInfoAccessKey);
                const details = yield ipInfoWrapper.lookupIp(ip);
                yield locations_1.LocationModel.create({
                    city: details.city,
                    country: details.country,
                    ip: details.ip,
                    region: details.region,
                });
            }
        }
        const interactionType = req.body.type;
        if (interactionType === "click") {
            const clickedAt = new Date(req.body.clickedAt);
            const contentId = req.body.contentId;
            yield clicks_1.ClickModel.create({
                clickedAt,
                contentId,
                deviceId,
            });
        }
        if (interactionType === "hover") {
            const contentId = req.body.contentId;
            const mouseEnteredAt = new Date(req.body.mouseEnteredAt);
            const mouseExitedAt = new Date(req.body.mouseExitedAt);
            const duration = mouseExitedAt.getTime() - mouseEnteredAt.getTime();
            yield hovers_1.HoverModel.create({
                contentId,
                deviceId,
                duration,
                mouseEnteredAt,
                mouseExitedAt,
            });
        }
        if (interactionType === "session") {
            const contentId = req.body.contentId;
            const startDate = new Date(req.body.startDate);
            const endDate = new Date(req.body.endDate);
            const duration = endDate.getTime() - startDate.getTime();
            yield session_1.SessionModel.create({
                contentId,
                deviceId,
                duration,
                endDate,
                startDate,
            });
        }
        res.status(200).send({ success: true });
    }),
]);

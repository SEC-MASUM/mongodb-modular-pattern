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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
// using cors
app.use((0, cors_1.default)());
//parse data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const { URI } = process.env;
const port = process.env.PORT || 5000;
console.log(URI);
// connect to server
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!URI) {
        throw new Error("URI is not defined");
    }
    yield mongoose_1.default.connect(URI).then(() => console.log("Database Connected"));
    const db = mongoose_1.default.connection;
    //collection name
    const collection = yield db.collection("students");
    app.get("/students", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield collection.find({}).limit(10).toArray();
        res.send(result);
    }));
});
dbConnect();
//route
app.get("/", (req, res) => {
    res.send({
        message: "Our server is ready",
        status: 200,
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

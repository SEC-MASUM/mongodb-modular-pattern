import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { dbConnect } from "./app/utils/dbConnect";
const app: Application = express();
// using cors
app.use(cors());

//parse data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db connection
dbConnect();

// we will import all routes here

// here will be default routes

// custom routes path

export { app };

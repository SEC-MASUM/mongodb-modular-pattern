import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const app: Application = express();

// using cors
app.use(cors());

//parse data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { URI } = process.env;
const port = process.env.PORT || 5000;
console.log(URI);

// connect to server
const dbConnect = async (): Promise<void> => {
  if (!URI) {
    throw new Error("URI is not defined");
  }
  await mongoose.connect(URI).then(() => console.log("Database Connected"));
  const db = mongoose.connection;

  //collection name
  const collection = await db.collection("students");

  app.get("/students", async (req, res) => {
    const result = await collection.find({}).limit(10).toArray();
    res.send(result);
  });
};

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

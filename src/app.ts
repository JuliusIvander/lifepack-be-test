import dotenv from "dotenv";
import express, { Response, Request } from "express";
import * as http from "http";
import router from "./routes";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }), express.json());

// Inserting routes
app.use("/api", router);

// Handling 404 routes
app.use((req: Request, res: Response, next: Function) => {
  res.status(404).json({
    success: false,
    message: "Path not found!",
  });
});

// Error handling
app.use((err: any, req: Request, res: Response, next: Function) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

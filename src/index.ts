import express, { Request, Response } from "express";
import taskRoutes from "./routes/task";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Add this line to enable JSON parsing in the request body
app.use(taskRoutes); // Add this line to mount the Task API routes

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

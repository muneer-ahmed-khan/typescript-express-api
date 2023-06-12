import express, { Request, Response, NextFunction } from "express";
import taskRoutes from "./routes/task";

const app = express();
const port = process.env.PORT || 3000;

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.use(express.json()); // Add this line to enable JSON parsing in the request body
app.use(taskRoutes); // Add this line to mount the Task API routes

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import app from "./app.js";
import connectDb from "./src/db/mongoDb.config.js";

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`server running http://localhost:${port}`);
  await connectDb();
});

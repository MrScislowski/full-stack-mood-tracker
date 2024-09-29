import * as express from "express";

const app = express();
const PORT = 3000;

app.use("/api/hello", (req, res) => {
  res.send("hello!");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

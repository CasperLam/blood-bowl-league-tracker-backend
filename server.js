const express = require(`express`);
const app = express();
require(`dotenv`).config();
const port = process.env.PORT || 5050;
const cors = require(`cors`);

app.use(cors(process.env.CORS_ORIGIN));
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

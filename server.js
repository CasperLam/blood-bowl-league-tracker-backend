const express = require(`express`);
const app = express();
require(`dotenv`).config();
const port = process.env.PORT || 5050;
const cors = require(`cors`);
const leagueRoutes = require(`./routes/leagueRoute`);
const teamRoutes = require(`./routes/teamRoute`);

app.use(cors(process.env.CORS_ORIGIN));
app.use(express.json());

app.use(`/api/leagues`, leagueRoutes);
app.use(`/api/teams`, teamRoutes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

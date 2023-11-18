import express from "express";
import db_connect from "./db_connect.js";
import userRoutes from "./User/user.routes.js";
import postRoutes from "./post/blog/post.js";

const app = express();

app.use(express.json());

//!acces control
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Expose-Headers", "accessToken, refreshToken,");
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET, OPTIONS"
    );
    return res.status(200).json({});
  }

  return next();
});

/*ROUTES */

app.use(userRoutes);
app.use(postRoutes);

/* database and port */
await db_connect();

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`App is listening at ${port}`);
});

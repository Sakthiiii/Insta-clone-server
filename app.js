const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

const connectDB = require("./config/db.config");


require("dotenv").config();

// Connection to DB
connectDB();

// Create the Express application object
const app = express();

// Compress the HTTP response sent back to a client
app.use(compression()); //Compress all routes

// Use Helmet to protect against well known vulnerabilities
app.use(helmet());

// use Morgan dep in dev mode
app.use(morgan("dev"));

// Set up cors to allow us to accept requests from our client
// app.use(
// 	cors({
// 		origin: "http://localhost:3001", // <-- location of the react app were connecting to
// 		credentials: true,
// 	})
// );
app.use(cors());


// Parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- ROUTES ----------------
 */

require("./routes/auth.route")(app);
require("./routes/post.route")(app);
require("./routes/user.route")(app);

/**
 * -------------- SERVER ----------------
 */

// Specify the PORT which will the server running on
const PORT = process.env.PORT || 3000;

// Disabling Powered by tag
app.disable("x-powered-by");

app.listen(PORT, () => {
	console.log(`Server is running under port ${PORT}.`);
});


// ${process.env.NODE_ENV}

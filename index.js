const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") {
	// Load environment variables from .env file in non prod environments
	require("dotenv").config();
}

//add new connection
const dbo = require("./utils/newConnection");

const shopRouter = require("./routes/shopRoutes");
const goodsRouter = require("./routes/goodsRoutes");

const app = express();

app.use(express.static('public'));
app.use('/images', express.static('images'));  //http://localhost:8081/images/0000000.png

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
	? process.env.WHITELISTED_DOMAINS.split(",")
	: [];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},

	credentials: true,
};

app.use(cors(corsOptions));

app.use("/shops", shopRouter);
app.use("/goods", goodsRouter);


app.get("/", function (req, res) {
	res.send({ status: "success" });
});
dbo.connectToServer(function (err) {
	if (err) {
		console.error(err);
		process.exit();
	}

	// start the Express server
	const server = app.listen(process.env.PORT || 8081, function () {
		const port = server.address().port;

		console.log("App started at port:", port);
	});
});
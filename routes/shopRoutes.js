const express = require("express");
const routerShops = express.Router();

const dbo = require('../utils/newConnection');

routerShops.get("/getshops", (req, res, next) => {
	const dbConnect = dbo.getDb();

	dbConnect
		.collection('shops')
		.find({})
		.limit(50)
		.toArray(function (err, result) {
			if (err) {
				res.status(400).send('Error fetching listings!');
			} else {
				res.json(result);
			}
		});
});

module.exports = routerShops;
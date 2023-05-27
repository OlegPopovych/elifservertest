const express = require("express");
const routerGoods = express.Router();

const dbo = require('../utils/newConnection');

routerGoods.post("/neworder", (req, res, next) => {

	const dbConnect = dbo.getDb();
	const matchDocument = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		shopList: req.body.shopList,
		total: req.body.total,
		create_date: new Date()
	};

	dbConnect
		.collection('orders')
		.insertOne(matchDocument, function (err, result) {
			if (err) {
				res.status(400).send('Error inserting matches!');
			} else {
				res.status(204).send();
			}
		});
});

routerGoods.get("/getgoods/:shop", (req, res, next) => {
	const dbConnect = dbo.getDb();

	dbConnect
		.collection(req.params.shop)
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

routerGoods.get("/getorders", (req, res, next) => {
	const dbConnect = dbo.getDb();

	dbConnect
		.collection("orders")
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

module.exports = routerGoods;
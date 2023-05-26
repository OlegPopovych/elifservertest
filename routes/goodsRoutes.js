const express = require("express");
const routerGoods = express.Router();
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const dbo = require('../utils/newConnection');

const { verifyUser } = require("../authenticate");

routerGoods.post("/neworder", (req, res, next) => {

	const dbConnect = dbo.getDb();
	const matchDocument = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		shopList: req.body.shopList,
		create_date: new Date()
	};

	dbConnect
		.collection('orders')
		.insertOne(matchDocument, function (err, result) {
			if (err) {
				res.status(400).send('Error inserting matches!');
			} else {
				console.log(`Added a new match with id ${result.insertedId}`);
				res.status(204).send();
			}
		});
	// console.log(req.body);
	// res.send(req.body);
});

routerGoods.get("/getgoods/:shop", (req, res, next) => {
	// console.log(`req ${req}`);
	const dbConnect = dbo.getDb();
	console.log(req.params.shop);

	dbConnect
		.collection(req.params.shop)
		.find({})
		.limit(50)
		.toArray(function (err, result) {
			if (err) {
				res.status(400).send('Error fetching listings!');
			} else {
				console.log(result);
				res.json(result);
			}
		});
	// console.log(req.body);
	// res.send(req.body);
});

// routerCar.get("/car/:vin", verifyUser, (req, res, next) => {
// 	console.log(`req ${req.params.vin}`);
// 	const dbConnect = dbo.getDb();

// 	dbConnect
// 		.collection('cars')
// 		.findOne({ vin: req.params.vin })
// 		.then((result, err) => {
// 			if (result) {
// 				console.log(`Found a list in the collection with the vin '${req.params.vin}'`);
// 				console.log("result", result);
// 				res.json(result);
// 			} else {
// 				console.log("error", err);
// 			};
// 		})

// });

// routerCar.get("/car/diagnostic/:group", verifyUser, (req, res, next) => {
// 	console.log(`req catalogue ${req.params.group}`);
// 	const dbConnect = dbo.getDb();

// 	dbConnect
// 		.collection('catalogue')
// 		.findOne({ groupOfVehicles: req.params.group })
// 		.then((result, err) => {
// 			if (result) {
// 				console.log(`Found a listing in the collection with the group '${req.params.group}'`);
// 				console.log("result", result);
// 				res.json(result);
// 			} else {
// 				console.log("error", err);
// 			};
// 		})

// });

module.exports = routerGoods;
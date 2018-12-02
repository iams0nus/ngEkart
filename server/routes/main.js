const router = require('express').Router();
const	async = require('async');
const	auth = require('../middleware/auth');
const	db = require('../models');

router.get('/products', (req, res, next) => {
	const paginate = 10;
	const page = req.query.page;
	async.parallel(
		[
			callback => {
				db.Product.count({}, (err, count) => {
					callback(err, count);
				});
			},
			callback => {
				db.Product.find({})
					.skip(paginate * page)
					.limit(paginate)
					.populate('category')
					.populate('owner')
					.exec((err, products) => {
						if (err) return next(err);
						callback(err, products);
					});
			}
		],
		(err, results) => {
			const totalProducts = results[0];
			const products = results[1];

			res.json({
				success: true,
				message: 'category',
				products,
				totalProducts,
				pages: Math.floor(totalProducts / paginate)
			});
		}
	);
});

router.get('/product/:id', (req, res) => {
	db.Product.findById(req.params.id)
		.populate('category')
		.populate('owner')
		.deepPopulate('reviews.owner')
		.exec((err, product) => {
			if (err) {
				res.json({
					success: false,
					message: 'Product not found'
				});
			} else {
				res.json({
					success: true,
					product
				});
			}
		});
});

module.exports = router;

const router = require('express').Router();
const	auth = require('../middleware/auth');
const	db = require('../models');

router.post('/', auth, (req, res) => {
			const {products, totalPrice} = req.body;
			const order = new db.Order({
				owner: req.decoded._id,
				totalPrice
			});
			products.map(product =>
				order.products.push({
					product: product.product,
					quantity: product.quantity
				})
			);
			order.save();
			res.json({
				success: true,
				message: 'Successfully made payment'
			});
});

module.exports = router;

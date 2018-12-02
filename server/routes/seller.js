const router = require('express').Router();
	// aws = require('aws-sdk'),
	// multer = require('multer'),
	// multerS3 = require('multer-s3'),
const	faker = require('faker');

const db = require('../models'),
	auth = require('../middleware/auth');

// const s3 = new aws.S3({
// 	accessKeyId: process.env.AWS_KEY,
// 	secretAccessKey: process.env.AWS_SECRET
// });
// const bucket = process.env.AWS_BUCKET;

// const upload = multer({
// 	storage: multerS3({
// 		s3,
// 		bucket,
// 		metadata: (req, file, cb) => {
// 			cb(null, { fieldName: file.fieldname });
// 		},
// 		key: (req, file, cb) => {
// 			cb(null, Date.now().toString());
// 		}
// 	})
// });

// router
// 	.route('/products')
// 	.get(auth, (req, res, next) => {
// 		db.Product.find({ owner: req.decoded.user._id })
// 			.populate('owner')
// 			.populate('category')
// 			.exec((err, products) => {
// 				if (products) {
// 					res.json({
// 						success: true,
// 						message: 'Products',
// 						products: products
// 					});
// 				}
// 			});
// 	})
// 	.post([auth, upload.single('product_picture')], (req, res) => {
// 		const owner = req.decoded.user._id;
// 		const { title, price, description } = req.body;
// 		const category = req.body.categoryId;
// 		const image = req.file.location;

// 		let product = new db.Product({
// 			owner,
// 			title,
// 			price,
// 			description,
// 			category,
// 			image
// 		});
// 		product.save();
// 		res.json({
// 			success: true,
// 			message: 'Successfully added product'
// 		});
// 	});

router.get('/faker/test', (req, res, next) => {
	for (i = 0; i < 20; i++) {
		let product = new db.Product();
		product.category = '5c03b5bacf8ee02678370323';
		product.owner = '5c02c757833d9c3a2c772390';
		product.image = faker.image.fashion();
		product.title = faker.commerce.productName();
		product.description = faker.lorem.words();
		product.price = faker.commerce.price();
		product.save();
	}

	res.json({ message: 'Successfully added 20 pictures' });
});

module.exports = router;

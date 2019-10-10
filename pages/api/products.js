import PRODUCTS from '../../static/products.json';
import connectDb from '../../utils/connectDb';
import Product from '../../models/Product';

connectDb();

export default async (req, res) => {
	try {
		const products = await Product.find();

		// If product list is empty manually export them
		if (!products.length) {
			console.log('Executing this statement');

			PRODUCTS.forEach(async (product) => {
				const prod = new Product();
				prod.name = product.name;
				prod.price = product.price;
				prod.description = product.description;
				prod.sku = product.sku;
				prod.mediaUrl = product.mediaUrl;

				return await prod.save();
			});
		}

		res.status(200).json(products);
	} catch (err) {
		console.log(err);
	}
};

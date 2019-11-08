import PRODUCTS from '../../static/products.json';
import connectDb from '../../utils/connectDb';
import Product from '../../models/Product';

connectDb();

export default async (req, res) => {
  try {
    const products = await Product.find();

    // If product list is empty manually export them
    if (!products.length) {
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
    const { page, size } = req.query;
    const pageNum = Number(page);
    const pageSize = Number(size);
    let paginatedProducts = [];
    const totalDocs = await Product.countDocuments();
    const totalPages = Math.ceil(totalDocs / pageSize);
    if (pageNum === 1) {
      paginatedProducts = await Product.find().limit(pageSize);
    } else {
      const skips = pageSize * (pageNum - 1);
      paginatedProducts = await Product.find()
        .skip(skips)
        .limit(pageSize);
    }

    res.status(200).json({ products: paginatedProducts, totalPages });
  } catch (err) {
    console.error(err);
  }
};

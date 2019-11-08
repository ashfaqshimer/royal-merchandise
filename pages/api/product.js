import Product from '../../models/Product';
import Cart from '../../models/Cart';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;

    case 'POST':
      await handlePostRequest(req, res);
      break;

    case 'DELETE':
      await handleDeleteRequest(req, res);
      break;

    default:
      res.status(405).send(`Method ${req.method} not allowed.`);
      break;
  }
};

const handleGetRequest = async (req, res) => {
  try {
    const { _id } = req.query;
    const product = await Product.findById(_id);
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
  }
};

const handlePostRequest = async (req, res) => {
  try {
    const { name, price, description, mediaUrl } = req.body;
    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).send('Product missing one or more fields.');
    }
    const product = await new Product({
      name,
      price,
      description,
      mediaUrl
    }).save();
    res.status(201).json(product);
  } catch (err) {
    res.send(500).send('Server error in creating product');
  }
};

const handleDeleteRequest = async (req, res) => {
  try {
    const { _id } = req.query;
    // Delete product by ID
    const product = await Product.findOneAndDelete({ _id });
    // Remove product from all carts, referenced as 'Product'
    await Cart.updateMany(
      { 'products.product': _id },
      { $pull: { products: { product: _id } } }
    );
    res.status(204).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting product');
  }
};

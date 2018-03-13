const cart = [];

const getCart = (req, res) => {
  res.status(200).json(cart);
};

const addToCart = (req, res) => {
  cart.push(req.body);
  res.status(200).json(cart);
};

module.exports = {
  getCart,
  addToCart
};

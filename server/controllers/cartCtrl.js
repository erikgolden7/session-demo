const getCart = (req, res) => {
  if (!req.session.cart) {
    // Create a global cart object on session
    req.session.cart = [];
  }
  res.status(200).json(req.session.cart);
};

const addToCart = (req, res) => {
  // Not required usually
  if (!req.session.cart) {
    req.session.cart = [];
  }
  req.session.cart.push(req.body);
  res.status(200).json(req.session.cart);
};

const editCart = (req, res) => {
  const { cart } = req.session;
  if (cart) {
    let index = cart.findIndex(item => item.id === parseInt(req.params.id, 10));
    if (index !== -1) {
      let editedItem = { ...cart[index], ...req.body };
      cart.splice(index, 1, editedItem);
      req.status(200).json(cart);
    } else {
      res.status(500).json({ message: "No Cart" });
    }
  }
};

const deleteItem = (req, res) => {
  const { cart } = req.session;
  if (cart) {
    let index = cart.findIndex(item => item.id === parseInt(req.params.id, 10));
    if (index !== -1) {
      let editedItem = { ...cart[index], ...req.body };
      cart.splice(index, 1);
      req.status(200).json(cart);
    } else {
      res.status(500).json({ message: "Error on delete" });
    }
  }
};

module.exports = {
  getCart,
  addToCart,
  editCart,
  deleteItem
};

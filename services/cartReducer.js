export default function cartReducer(cart, action) {
  switch (action.type) {
    case "empty":
      return [];
    case "updateQuantity": {
      const { quantity, id } = action;
      return cart.map((el) => (el.id === id ? { ...el, quantity } : el));
    }
    case "add":
      const { id, quantity } = action;
      const itemInCart = cart.find((el) => el.id === id);
      if (itemInCart) {
        // Return new array with the matching item replaced
        return cart.map((el) => (el.id === id ? { ...el, quantity } : el));
      } else {
        // Return new array with the new item appended
        return [...cart, { id, quantity }];
      }
    case "delete":
      const { id: deletedId } = action;
      return cart.filter((el) => el.id !== deletedId);

    default:
      throw new Error("Unhandled action " + action.type);
  }
}

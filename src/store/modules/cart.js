export default {
  namespaced: true,
  state() {
    return {
      items: [],
      total: 0,
      qty: 0,
    };
  },
  mutations: {
    removeProductFromCart(state, payload) {
      const prodId = payload.productId;
      const productInCartIndex = state.items.findIndex(
        (cartItem) => cartItem.productId === prodId
      );
      const prodData = state.items[productInCartIndex];
      state.items.splice(productInCartIndex, 1);
      state.qty -= prodData.qty;
      state.total -= prodData.price * prodData.qty;
    },
    addProductToCart(state, payload) {
      const productData = payload.product;
      const productInCartIndex = state.items.findIndex(
        (ci) => ci.productId === productData.id
      );

      if (productInCartIndex >= 0) {
        state.items[productInCartIndex].qty++;
      } else {
        const newItem = {
          productId: productData.id,
          title: productData.title,
          image: productData.image,
          price: productData.price,
          qty: 1,
        };
        state.items.push(newItem);
      }
      state.qty++;
      state.total += productData.price;
    },
  },
  actions: {
    addToCart(context, payload) {
      context.commit('addProductToCart', { product: payload });
    },
    removeFromCart(context, payload) {
      context.commit('removeProductFromCart', payload);
    },
  },

  getters: {
    products(state) {
      return state.items;
    },
    total(state) {
      return state.total;
    },
    quantity(state) {
      return state.qty;
    },
  },
};

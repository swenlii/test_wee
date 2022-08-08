import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      count: 0,
      cart: []
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    addToCart (state, good) {
      state.cart.push(good);
    },
    removeFromCart (state, id) {
      let removeIndex = state.cart.map(item => item.id).indexOf(id);
      if (removeIndex >= 0) state.cart.splice(removeIndex, 1);
    },
    changeCountInCart (state, {id, count}) {
      let inCart = state.cart.find(x => x.id === id);
      if(inCart && inCart.cart < inCart.rest) {
        inCart.cart = count;
      }
    }
  }
})

export default store
import { createStore } from 'vuex'

// Здесь хранится корзина
// В задании нет задачи корзины
// Но почему бы и нет?
const store = createStore({
  state () {
    return {
      cart: []
    }
  },
  mutations: {
    addToCart (state, good) { // добавить новый товар
      state.cart.push(good);
    },
    removeFromCart (state, id) { // удалить товар по id
      let removeIndex = state.cart.map(item => item.id).indexOf(id);
      if (removeIndex >= 0) state.cart.splice(removeIndex, 1);
    }
  },
  getters: {
    // вернуть товар из корзины по id
    cart: state => id => state.cart.find(p => p.id === id),
    // вывести корзину как строку
    cartToString (state) {
      let str = 'id - name - count\n---------------------\n';
      state.cart.forEach(product => {
        str += `${product.id} - ${product.title.slice(0, 43)} - ${product.cart}\n`
      });
      return str
    }
  }
})

export default store
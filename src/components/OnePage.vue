<template>
  <section class="page">
    <div class="container">
      <div v-for="good in goods" v-bind:key="'good' + good.id" class="good">
        <div class="discount" v-if="good.discount !== 0">-{{ Math.floor(good.discount) }}%</div>
        <a href="#"><img :src="good.img" alt="img"></a>
        <a href="#">{{ good.title.slice(0, 43) }}{{good.title.length > 45 ? '...' : ''}}</a>
        <div class="price">
         <span :class="good.discount === 0 ? 'without-real' : 'disc'">
           {{ Math.floor(good.price - (good.price * good.discount) / 100) }}
           <span class="zeros">.00 </span>
           <span class="curr">AED</span>
         </span>
          <span class="real" v-if="good.discount !== 0">
           {{ good.price }}
           <span class="zeros">.00 </span>
           <span class="curr">AED</span>
         </span>
        </div>
        <transition-group name="good-buttons">
          <div class="count-in-cart" v-if="cart.find(x => x.id === good.id)" key="count-in-cart">
            <button class="add" @click="subRest(good.id)">
              <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.75" y="0.25" width="10.5" height="1.5" fill="#366E36"/>
              </svg>
            </button>
            <span>{{ cart.find(x => x.id === good.id) ? cart.find(x => x.id === good.id).cart : 0 }}</span>
            <button class="sub"
                    @click="addRest(good.id)"
                    :disabled="cart.find(x => x.id === good.id).cart === good.rest">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25001 5.25009H0.75V6.75009H5.25001V11.25H6.75001V6.75009H11.25V5.25009H6.75001V0.749977H5.25001V5.25009Z"
                      fill="#366E36"/>
              </svg>
            </button>
          </div>
          <button v-else
                  @click="addToCart(good)"
                  key="good-button"
                  :class="good.rest > 0 ? 'add-to-cart' : 'out-of-stock'"
                  :disabled="good.rest === 0">{{ good.rest > 0 ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </transition-group>
        <div class="time">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.77717 2.72865H2.32985L2.95637 1.94159H5.40369L4.77717 2.72865ZM9.18411 2.66968C9.86747 2.28439 10.1109 1.4155 9.72742 0.728625C9.34413 0.0416888 8.47931 -0.202781 7.79577 0.18266C7.11225 0.5681 6.86891 1.4371 7.25252 2.12397C7.63581 2.81067 8.50063 3.05494 9.18408 2.66968H9.18411ZM0.626519 5.18824L0 5.97521H2.44732L3.07384 5.18816H0.626519V5.18824ZM4.13111 3.56492H1.68379L1.05727 4.35198H3.50459L4.13111 3.56492ZM11.4924 5.40814L9.82882 5.33966L8.65588 3.25082L7.83498 2.7804C7.69494 2.70704 7.20947 2.42463 6.72875 2.80875L3.6568 5.37555C3.42711 5.58888 3.28298 5.91428 3.58632 6.26473C3.79742 6.50228 4.16229 6.47991 4.38527 6.30729L6.44489 4.44549L6.1783 6.13845L4.93186 8.42401L3.10611 9.40479C2.55266 9.80858 2.77564 10.2651 2.86613 10.3916C3.00165 10.5819 3.38024 10.8545 3.82194 10.5793L6.12055 9.18078L6.99174 7.56681L8.52964 8.81453L8.43999 11.365C8.45155 11.7582 8.80059 11.9977 9.10594 12C9.50386 11.9901 9.7544 11.738 9.79098 11.3047L9.86204 9.16288C9.87284 8.75935 9.95454 8.26344 9.6573 8.00393L8.10779 6.61464L8.3886 5.18708L9.31437 6.47593L11.3623 6.57351C11.7909 6.58941 11.9822 6.27236 11.9977 6.0087C12.0288 5.69349 11.7439 5.44314 11.4924 5.40815L11.4924 5.40814Z"
                  fill="#A1A1A1"/>
          </svg>
          {{good.timing}} min
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'OnePage',
  props: {
    goods: {
      type: Array,
      default: new Array([
        {
          id: 1,
          title: 'HP Laptop 14s-fq0005ne, 14" HD, AMD Ryzen™ 3 ',
          img: 'https://wee.ae/images/product/00254_00000043_62cf8eac18dd26.98655982.jpeg',
          price: 1799.00,
          discount: 5,
          rest: 20,
          timing: 59
        },
        {
          id: 2,
          title: 'Samsung 55-Inch 4K UHD Smart LED TV UA55TU7000 ',
          img: 'https://wee.ae/images/product/00254_00000050_62c6c013d85b79.41233488.jpeg',
          price: 2499.00,
          discount: 23,
          rest: 10,
          timing: 59
        }
      ])
    },
    page: {
      type: Number,
      default: 1
    },
    pages: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      cart: []
    }
  },
  methods: {
    addToCart(good) {
      let addGood = {
        id: good.id,
        title: good.title,
        price: good.price,
        discount: good.discount,
        rest: good.rest,
        img: good.img,
        cart: 1
      }
      this.cart.push(addGood);
      this.$emit('popup', {
        show: true,
        img: good.img,
        head: 'You add new product!',
        text: good.title
      })

      this.$store.commit('addToCart', addGood);

      console.log('Add to cart: ' + good.title);
      console.log('Cart:\n' + JSON.stringify(this.$store.state.cart));
    },
    addRest(id) {
      let inCart = this.cart.find(x => x.id === id);
      if(inCart && inCart.cart < inCart.rest) {
        inCart.cart++;
      }
      this.$store.commit('changeCountInCart', id, inCart.cart);
      console.log(`${inCart.title}: ${inCart.cart}`)
    },
    subRest(id) {
      let inCart = this.cart.find(x => x.id === id);
      if (inCart && inCart.cart > 0) {
        inCart.cart--;
        if (inCart.cart !== 0) {
          this.$store.commit('changeCountInCart', {id: id, count: inCart.cart});
          console.log(`${inCart.title}: ${inCart.cart}`)
        }
      }
      if(inCart && inCart.cart === 0) {
        this.$emit('popup', {
          show: true,
          img: inCart.img,
          head: 'Deleted product',
          text: inCart.title
        })
        this.cart.splice(this.cart.indexOf(inCart), 1);
        this.$store.commit('removeFromCart', id);
        console.log('Remove from cart: ' + inCart.title);
        console.log('Cart:\n' + JSON.stringify(this.$store.state.cart));
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
rose = #FF0A47
rose_trans = rgba(255, 49, 62, 0.1)
green = #366E36
green_01 = rgba(54, 110, 54, 0.1)
green_02 = rgba(54, 110, 54, 0.2)

white = #FFF
ll_gray = #F5F5F6
l_gray = #F3F3F5
m_gray = #A1A1A1
d_gray = #282828
black = #000

.page
  display flex
  justify-content center

.container
  max-width: 1200px
  gap 16px 30px
  display grid
  justify-content: center;
  width 100%
  grid-template-columns repeat(auto-fill, 160px)

.good
  position relative
  overflow hidden

  .discount
    position absolute
    background-color rose
    color white
    width 68px
    height 12px
    right -21px
    top 7px
    transform rotate(45deg)
    font-size 10px
    text-align center
    line-height 12px

  img
    width 160px
    height 160px
    object-fit contain
    background-color ll_gray

  a
    font-weight 500
    text-decoration none
    line-height 15px
    letter-spacing -0.03em
    color d_gray
    transition all 0.2s ease

    &:hover
      color black
      text-decoration underline
      cursor pointer

  .add-to-cart
    background-color rose_trans
    padding 7px 12px
    border-radius 4px
    color rose
    border none
    margin-top 6px
    cursor pointer
    transform scale(1)
    transition: all 0.3s ease-in-out

    &:hover
      box-shadow 0 0 0 20px rose inset
      color white

    &:active
      transform scale(0.9)

  .out-of-stock
    background-color l_gray
    padding 7px 12px
    border-radius 4px
    color m_gray
    border none
    margin-top 6px
    cursor default

  .count-in-cart
    margin-top 6px

    button
      border-radius 4px
      background-color green_01
      color green
      border none
      transition all 0.2s ease
      cursor pointer

      &.add
        height 29px
        padding 7px 0 7px 12px
        border-radius 4px 0 0 4px

        &:hover
          box-shadow 15px 0 5px 0 green_02 inset

        &:active svg
          transform scale(1.5)

        svg
          top -4px
          transform scale(1)
          transition all 0.2s ease

      &.sub
        height 29px
        padding 7px 12px 7px 0
        border-radius 0 4px 4px 0

        &:hover
          box-shadow -15px 0 5px 0 green_02 inset

        &:active svg
          transform scale(1.5)

        svg
          top 1px
          transform scale(1)
          transition all 0.2s ease

      &:disabled svg
        opacity 0.3

        &:active
          transform scale(1)

      &:disabled:hover
        box-shadow none

      svg
        position relative

    span
      height 29px
      padding 7px 10px
      background-color green_01
      color green

  .time
    color m_gray
    font-size 10px
    margin-top 3px

    svg
      position relative
      top 2px

  .price
    display flex

    .without-real
      display flex
      font-size 14px
      font-weight 700
      line-height 17px

      .zeros
        font-size 8px
        position relative
        top -2px
        font-weight 700

      .curr
        font-size 8px
        position relative
        top -2px
        margin-left 3px
        font-weight 700

    .disc
      display flex
      color rose
      font-size 14px
      font-weight 700
      line-height 17px

      .zeros
        font-size 8px
        position relative
        top -2px
        font-weight 700

      .curr
        font-size 8px
        position relative
        top -2px
        margin-left 3px
        font-weight 700

    .real
      font-size 10px
      color m_gray
      display flex
      align-items start
      margin-left 4px
      position relative
      top -1px

      &:before
        content ""
        width 100%
        height 1px
        background-color rose
        position absolute
        top 6px
        left 0

      .zeros
        font-size 8px
        font-weight 600

      .curr
        font-size 6px
        font-weight 600
        position relative
        top -2px
        margin-left 3px


.good-buttons-enter-from
  position relative
  transform translateX(50px)
  opacity 0

.good-buttons-enter-to
  opacity 1
  transform translateX(0)

.good-buttons-leave-from
  position absolute
  transform translateX(0)
  opacity 1

.good-buttons-leave-to
  position absolute
  transform translateY(50px)
  opacity 0

.good-buttons-enter-active
  transition all 0.7s ease;

.good-buttons-leave-active
  position absolute
  transition all 0.4s ease;

@media screen and (max-width: 600px)
  .container
    grid-template-columns: repeat(auto-fill, 138px);
    gap 16px 12px

  .good img
    width 138px
    height 138px
</style>
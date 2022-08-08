<template>
  <div class="logo">
    <img alt="Wee logo" src="./assets/Vector.png">
  </div>
  <div class="content">
    <transition-group name="pages" mode="in-out">
      <OnePage v-show="page_now === page"
               :goods="goods.slice(limit * (page - 1), limit * page)"
               :page="page"
               :pages="pages"
               v-for="page in pages"
               v-bind:key="'comp-page' + page"
               @popup="showPopup"></OnePage>
    </transition-group>
  </div>
  <div class="pagination">
    <button @click="goToPage(ind)"
            :class="ind === page_now ? 'pagination-page active' : 'pagination-page'"
            v-for="ind in arrpages"
            v-bind:key="'page' + ind">{{ ind }}
    </button>
  </div>
  <div :class="popup.show ? 'popup show' : 'popup'">
    <img :src="popup.img" alt="image">
    <h2>{{popup.head}}</h2>
    <p>{{popup.text}}</p>
  </div>
</template>

<script>
import OnePage from '@/components/OnePage';

export default {
  name: 'App',
  components: {
    OnePage
  },
  data() {
    return {
      goods: [
        {
          id: 1,
          title: 'HP Laptop 14s-fq0005ne, 14" HD, AMD Ryzen™ 3 ',
          img: 'https://wee.ae/images/product/00254_00000043_62cf8eac18dd26.98655982.jpeg',
          price: 1799.00,
          discount: 5.55,
          rest: 20,
          timing: 59
        },
        {
          id: 2,
          title: 'Samsung 55-Inch 4K UHD Smart LED TV UA55TU7000 ',
          img: 'https://wee.ae/images/product/00254_00000050_62c6c013d85b79.41233488.jpeg',
          price: 2499.00,
          discount: 23.8,
          rest: 10,
          timing: 59
        },
        {
          id: 3,
          title: 'Neo / Hair lotion',
          img: 'https://wee.ae/images/product/00254_00000053_62baae74628dd1.25661320.jpeg',
          price: 20,
          discount: 0,
          rest: 0,
          timing: 10
        },
        {
          id: 4,
          title: 'Storage boxes organisers, SSZ266, Collapsible, Bra, underwear closet organizer, Black, 3 pcs',
          img: 'https://wee.ae/images/product/00254_00000090_62c6cfb7d6ece5.89271699.jpeg',
          price: 22,
          discount: 0,
          rest: 100,
          timing: 48
        },
        {
          id: 5,
          title: 'SHOWAY / Air Fryer Disposable Paper Liners, Non-Stick Parchment, 100 PCS',
          img: 'https://wee.ae/images/product/00254_00000098_62c6e111f313a5.53737069.jpeg',
          price: 19.15,
          discount: 0,
          rest: 5,
          timing: 42
        },
        {
          id: 6,
          title: 'Godrej aer / Car air freshener, Twist, fresh lush green, 45G',
          img: 'https://wee.ae/images/product/undefined_undefined_6286448a4fa045.73362303.jpeg',
          price: 20,
          discount: 20,
          rest: 2,
          timing: 10
        },
        {
          id: 7,
          title: 'Terminator / Power strip, 3 way universal plug sockets',
          img: 'https://wee.ae/images/product/undefined_undefined_62b58979672c73.04289017.jpeg',
          price: 22.99,
          discount: 5,
          rest: 10,
          timing: 42
        },
        {
          id: 8,
          title: 'Neutrogena / Face cream-gel, Hydro Boost, 50 ml',
          img: 'https://wee.ae/images/product/undefined_undefined_6287c0df112822.35225896.jpeg',
          price: 26.95,
          discount: 15,
          rest: 30,
          timing: 42
        },
        {
          id: 9,
          title: 'Generic / Disposable prayer mat, 120 cm x 65 cm, Pack of 12 pcs',
          img: 'https://wee.ae/images/product/00254_00000073_62c80af53965c5.89920763.jpeg',
          price: 21.69,
          discount: 5,
          rest: 1,
          timing: 48
        },
        {
          id: 10,
          title: 'Anker / headphones, Soundcore Life P2 Mini, bluetooth, 10 Mm drivers',
          img: 'https://wee.ae/images/product/undefined_undefined_62874710515a44.25754157.jpeg',
          price: 99,
          discount: 0,
          rest: 100,
          timing: 42
        },
        {
          id: 11,
          title: 'HP Laptop 14s-fq0005ne, 14" HD, AMD Ryzen™ 3 ',
          img: 'https://wee.ae/images/product/00254_00000043_62cf8eac18dd26.98655982.jpeg',
          price: 1799.00,
          discount: 5.55,
          rest: 20,
          timing: 59
        },
        {
          id: 12,
          title: 'Samsung 55-Inch 4K UHD Smart LED TV UA55TU7000 ',
          img: 'https://wee.ae/images/product/00254_00000050_62c6c013d85b79.41233488.jpeg',
          price: 2499.00,
          discount: 23.8,
          rest: 10,
          timing: 59
        },
        {
          id: 13,
          title: 'Neo / Hair lotion',
          img: 'https://wee.ae/images/product/00254_00000053_62baae74628dd1.25661320.jpeg',
          price: 20,
          discount: 0,
          rest: 2,
          timing: 10
        },
        {
          id: 14,
          title: 'Storage boxes organisers, SSZ266, Collapsible, Bra, underwear closet organizer, Black, 3 pcs',
          img: 'https://wee.ae/images/product/00254_00000090_62c6cfb7d6ece5.89271699.jpeg',
          price: 22,
          discount: 0,
          rest: 100,
          timing: 48
        },
        {
          id: 15,
          title: 'SHOWAY / Air Fryer Disposable Paper Liners, Non-Stick Parchment, 100 PCS',
          img: 'https://wee.ae/images/product/00254_00000098_62c6e111f313a5.53737069.jpeg',
          price: 19.15,
          discount: 0,
          rest: 5,
          timing: 42
        },
        {
          id: 16,
          title: 'Godrej aer / Car air freshener, Twist, fresh lush green, 45G',
          img: 'https://wee.ae/images/product/undefined_undefined_6286448a4fa045.73362303.jpeg',
          price: 20,
          discount: 20,
          rest: 2,
          timing: 10
        },
        {
          id: 17,
          title: 'Terminator / Power strip, 3 way universal plug sockets',
          img: 'https://wee.ae/images/product/undefined_undefined_62b58979672c73.04289017.jpeg',
          price: 22.99,
          discount: 5,
          rest: 10,
          timing: 42
        },
        {
          id: 18,
          title: 'Neutrogena / Face cream-gel, Hydro Boost, 50 ml',
          img: 'https://wee.ae/images/product/undefined_undefined_6287c0df112822.35225896.jpeg',
          price: 26.95,
          discount: 15,
          rest: 30,
          timing: 42
        },
        {
          id: 19,
          title: 'Generic / Disposable prayer mat, 120 cm x 65 cm, Pack of 12 pcs',
          img: 'https://wee.ae/images/product/00254_00000073_62c80af53965c5.89920763.jpeg',
          price: 21.69,
          discount: 5,
          rest: 1,
          timing: 48
        },
        {
          id: 20,
          title: 'Anker / headphones, Soundcore Life P2 Mini, bluetooth, 10 Mm drivers',
          img: 'https://wee.ae/images/product/undefined_undefined_62874710515a44.25754157.jpeg',
          price: 99,
          discount: 0,
          rest: 100,
          timing: 42
        },
        {
          id: 21,
          title: 'HP Laptop 14s-fq0005ne, 14" HD, AMD Ryzen™ 3 ',
          img: 'https://wee.ae/images/product/00254_00000043_62cf8eac18dd26.98655982.jpeg',
          price: 1799.00,
          discount: 5.55,
          rest: 20,
          timing: 59
        },
        {
          id: 22,
          title: 'Samsung 55-Inch 4K UHD Smart LED TV UA55TU7000 ',
          img: 'https://wee.ae/images/product/00254_00000050_62c6c013d85b79.41233488.jpeg',
          price: 2499.00,
          discount: 23.8,
          rest: 10,
          timing: 59
        },
        {
          id: 23,
          title: 'Neo / Hair lotion',
          img: 'https://wee.ae/images/product/00254_00000053_62baae74628dd1.25661320.jpeg',
          price: 20,
          discount: 0,
          rest: 2,
          timing: 10
        },
        {
          id: 24,
          title: 'Storage boxes organisers, SSZ266, Collapsible, Bra, underwear closet organizer, Black, 3 pcs',
          img: 'https://wee.ae/images/product/00254_00000090_62c6cfb7d6ece5.89271699.jpeg',
          price: 22,
          discount: 0,
          rest: 100,
          timing: 48
        },
        {
          id: 25,
          title: 'SHOWAY / Air Fryer Disposable Paper Liners, Non-Stick Parchment, 100 PCS',
          img: 'https://wee.ae/images/product/00254_00000098_62c6e111f313a5.53737069.jpeg',
          price: 19.15,
          discount: 0,
          rest: 5,
          timing: 42
        },
        {
          id: 26,
          title: 'Godrej aer / Car air freshener, Twist, fresh lush green, 45G',
          img: 'https://wee.ae/images/product/undefined_undefined_6286448a4fa045.73362303.jpeg',
          price: 20,
          discount: 20,
          rest: 2,
          timing: 10
        },
        {
          id: 27,
          title: 'Terminator / Power strip, 3 way universal plug sockets',
          img: 'https://wee.ae/images/product/undefined_undefined_62b58979672c73.04289017.jpeg',
          price: 22.99,
          discount: 5,
          rest: 10,
          timing: 42
        },
        {
          id: 28,
          title: 'Neutrogena / Face cream-gel, Hydro Boost, 50 ml',
          img: 'https://wee.ae/images/product/undefined_undefined_6287c0df112822.35225896.jpeg',
          price: 26.95,
          discount: 15,
          rest: 30,
          timing: 42
        },
        {
          id: 29,
          title: 'Generic / Disposable prayer mat, 120 cm x 65 cm, Pack of 12 pcs',
          img: 'https://wee.ae/images/product/00254_00000073_62c80af53965c5.89920763.jpeg',
          price: 21.69,
          discount: 5,
          rest: 1,
          timing: 48
        },
        {
          id: 30,
          title: 'Anker / headphones, Soundcore Life P2 Mini, bluetooth, 10 Mm drivers',
          img: 'https://wee.ae/images/product/undefined_undefined_62874710515a44.25754157.jpeg',
          price: 99,
          discount: 0,
          rest: 100,
          timing: 42
        },
        {
          id: 31,
          title: 'HP Laptop 14s-fq0005ne, 14" HD, AMD Ryzen™ 3 ',
          img: 'https://wee.ae/images/product/00254_00000043_62cf8eac18dd26.98655982.jpeg',
          price: 1799.00,
          discount: 5.55,
          rest: 20,
          timing: 59
        },
        {
          id: 32,
          title: 'Samsung 55-Inch 4K UHD Smart LED TV UA55TU7000 ',
          img: 'https://wee.ae/images/product/00254_00000050_62c6c013d85b79.41233488.jpeg',
          price: 2499.00,
          discount: 23.8,
          rest: 10,
          timing: 59
        },
        {
          id: 33,
          title: 'Neo / Hair lotion',
          img: 'https://wee.ae/images/product/00254_00000053_62baae74628dd1.25661320.jpeg',
          price: 20,
          discount: 0,
          rest: 2,
          timing: 10
        },
        {
          id: 34,
          title: 'Storage boxes organisers, SSZ266, Collapsible, Bra, underwear closet organizer, Black, 3 pcs',
          img: 'https://wee.ae/images/product/00254_00000090_62c6cfb7d6ece5.89271699.jpeg',
          price: 22,
          discount: 0,
          rest: 100,
          timing: 48
        },
        {
          id: 35,
          title: 'SHOWAY / Air Fryer Disposable Paper Liners, Non-Stick Parchment, 100 PCS',
          img: 'https://wee.ae/images/product/00254_00000098_62c6e111f313a5.53737069.jpeg',
          price: 19.15,
          discount: 0,
          rest: 5,
          timing: 42
        },
        {
          id: 36,
          title: 'Godrej aer / Car air freshener, Twist, fresh lush green, 45G',
          img: 'https://wee.ae/images/product/undefined_undefined_6286448a4fa045.73362303.jpeg',
          price: 20,
          discount: 20,
          rest: 2,
          timing: 10
        },
        {
          id: 37,
          title: 'Terminator / Power strip, 3 way universal plug sockets',
          img: 'https://wee.ae/images/product/undefined_undefined_62b58979672c73.04289017.jpeg',
          price: 22.99,
          discount: 5,
          rest: 10,
          timing: 42
        },
        {
          id: 38,
          title: 'Neutrogena / Face cream-gel, Hydro Boost, 50 ml',
          img: 'https://wee.ae/images/product/undefined_undefined_6287c0df112822.35225896.jpeg',
          price: 26.95,
          discount: 15,
          rest: 30,
          timing: 42
        },
        {
          id: 39,
          title: 'Generic / Disposable prayer mat, 120 cm x 65 cm, Pack of 12 pcs',
          img: 'https://wee.ae/images/product/00254_00000073_62c80af53965c5.89920763.jpeg',
          price: 21.69,
          discount: 5,
          rest: 1,
          timing: 48
        },
        {
          id: 40,
          title: 'Anker / headphones, Soundcore Life P2 Mini, bluetooth, 10 Mm drivers',
          img: 'https://wee.ae/images/product/undefined_undefined_62874710515a44.25754157.jpeg',
          price: 99,
          discount: 0,
          rest: 100,
          timing: 42
        }
      ],
      count: 40,
      limit: 12,
      page_now: 1,
      popup: {
        show: false,
        img: '/Vector.png',
        head: 'Hello!',
        text: 'some text here'
      },
      clearMessage: null
    }
  },
  async mounted() {
    // Сайт wee.ae не позволяет делать запрос с другого источника
    // (не возвращает заголовок `Access-Control-Allow-Origin`)

    let list;
    await fetch("goods.json")
    .then(response => response.json())
    .then(json => { list = JSON.parse(JSON.stringify(json))});
    console.log(list);
    this.goods = list.items;
    this.count = list.pagination.count;
    this.limit = list.pagination.limit;
  },
  methods: {
    async goToPage(ind) {
      this.page_now = ind;
      window.scrollTo(0, 0);
    },
    showPopup(messObj) {
      this.popup = messObj;
      if (this.clearMessage) clearTimeout(this.clearMessage)
      this.clearMessage = setTimeout(() => {
        this.popup.show = false;
      }, 3000);
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.limit)
    },
    arrpages() {
      let arr = [];
      for(let i = 1; i <= this.pages; i++) {
        if(i === 1 || i === this.pages || i === this.page_now) arr.push(i);
        else if(this.page_now < 4 && i <= 4) arr.push(i)
        else if(this.page_now > this.pages - 3 && i >= this.pages - 3) arr.push(i)
        // page >= 4 && page <= pages - 3
        else if(i === this.page_now + 1) arr.push(i)
        else if(i === this.page_now - 1) arr.push(i)
      }
      return arr
    }
  }
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap')

l_gray = #F5F5F6
m_gray = #F3F3F5
d_gray = #e3e3e3
rose = #FF0A47

*
  box-sizing border-box
  font-family 'Montserrat'
  font-size 12px
  font-weight 600
  line-height 14px

body
  padding 0
  margin 0

html
  min-height 100vh
  position relative
  overflow hidden

.logo
  background-color l_gray
  display flex
  justify-content center
  padding 12px

.content
  padding: 51px 20px 37px 20px;
  position relative

.pagination
  display flex
  justify-content center
  gap 8px
  padding-bottom 40px

  .pagination-page
    background-color m_gray
    border-radius 12px
    min-width 40px
    min-height 40px
    border none
    cursor pointer
    transition 0.2s all ease
    transform translateY(0)

    &:hover
      background-color d_gray
      transform translateY(-5px)

    &:active
      transform translateY(0)

    &.active
      opacity 0.3
      cursor default

      &:hover
        background-color m_gray
        transform translateY(0)

      &:active
        transform translateY(0)

.popup
  position absolute
  bottom -150px
  right 0
  background-color m_gray
  border-radius 15px 0 0 0
  padding 20px 40px
  max-width 400px
  min-width 250px
  transition all 0.7s ease
  opacity 0
  &.show
    bottom 0
    opacity 1
  img
    float right
    width 70px
    margin-left 10px
  h2
    color rose
    font-size 16px
    font-weight 700

.pages-enter-from
  position relative
  transform translateX(100%)
  opacity 0

.pages-enter-to
  transform translateX(0)
  opacity 1

.pages-leave-from
  position absolute
  transform translateX(-20px)
  opacity 1

.pages-leave-to
  position absolute
  opacity 0
  transform translateX(-100%)

.pages-enter-active
  transition all 0.7s ease;

.pages-leave-active
  top 51px
  position absolute
  transition all 0.7s ease;

@media screen and (max-width: 600px)
  .content
    padding: 46px 15px 53px 15px;

  .logo
  .logo
    padding 3px

    img
      width 58px

  .pages-leave-active
    top 46px
</style>

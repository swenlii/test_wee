<template>
  <div class="logo">
    <img alt="Wee logo" src="./assets/Vector.png">
  </div>
  <!-- Страницы -->
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
  <!-- Номера страниц -->
  <div class="pagination">
    <button @click="goToPage(ind)"
            :class="ind === page_now ? 'pagination-page active' : 'pagination-page'"
            v-for="ind in arrpages"
            v-bind:key="'page' + ind">{{ ind }}
    </button>
  </div>
  <!-- Всплывающее сообщение -->
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
      goods: [],
      count: 0,
      limit: 12,
      page_now: 1, // на какой странице находимся
      popup: { // всплывающее сообщение
        show: false,
        img: '/Vector.png',
        head: 'Hello!',
        text: 'some text here'
      },
      clearMessage: null // setTimeOut всплывающего сообщения
    }
  },
  async mounted() {
    // Сайт wee.ae не позволяет делать запрос с другого источника (CORS)
    // (не возвращает заголовок `Access-Control-Allow-Origin`)
    // Поэтому все данные запросов (которые выполнены через Postman)
    // скопированны в goods.json

    let list;
    await fetch("goods.json")
    .then(response => response.json())
    .then(json => { list = JSON.parse(JSON.stringify(json))});

    this.goods = list.items;
    this.count = list.pagination.count;
    this.limit = list.pagination.limit;
  },
  methods: {
    async goToPage(ind) { // onclick на pagination
      this.page_now = ind;
      window.scrollTo(0, 0);
    },
    showPopup(messObj) { // всплывающее сообщение при добавлении и удалении товара
      this.popup = messObj;
      if (this.clearMessage) clearTimeout(this.clearMessage);
      this.clearMessage = setTimeout(() => {
        this.popup.show = false;
      }, 3000);
    }
  },
  computed: {
    pages() { // сколько страниц всего
      return Math.ceil(this.count / this.limit)
    },
    arrpages() { // array для v-for в pagination
      let arr = [];
      for(let i = 1; i <= this.pages; i++) {
        // всегда видимые номера страниц
        if(i === 1 || i === this.pages || i === this.page_now) arr.push(i);
        // граничные значения page_now (первые и последние 3 страницы)
        else if(this.page_now < 4 && i <= 4) arr.push(i)
        else if(this.page_now > this.pages - 3 && i >= this.pages - 3) arr.push(i)
        // все остальные значения page_now
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

<template>
  <div
    id="classSlide"
    class="position-relative d-flex flex-column justify-content-between align-items-center w-100 h-100 pt-5"
  >
    <h4 class="title text-center w-50 p-1 mt-5">{{ classe }} :</h4>
    <div class="row pb-5 animated zoomInUp">
      <div class="col d-flex flex-column align-items-center mx-5">
        <h5 class="name text-center mb-4">{{ hero1.name }}</h5>
        <img
          :src="hover === 1 ? hero1.mini2 : hero1.mini1"
          class=""
          alt="mini Pavel"
          @mouseenter="hover = 1"
          @mouseleave="hover = 0"
          @click="click === 1 ? (click = 0) : (click = 1)"
        />
      </div>
      <div class="col d-flex flex-column align-items-center mx-5">
        <h5 class="name text-center mb-4">{{ hero2.name }}</h5>
        <img
          :src="hover === 2 ? hero2.mini2 : hero2.mini1"
          class=""
          alt="mini Lina"
          @mouseenter="hover = 2"
          @mouseleave="hover = 0"
          @click="click === 2 ? (click = 0) : (click = 2)"
        />
      </div>
    </div>
    <CharacDetails v-show="click === 1" class="left" :hero="hero1" />
    <CharacDetails v-show="click === 2" class="right" :hero="hero2" />
  </div>
</template>

<script>
import CharacDetails from "./CharacDetails";
export default {
  props: {
    hero1: {
      type: Object,
      required: true
    },
    hero2: {
      type: Object,
      required: true
    },
    classe: {
      type: String,
      required: true
    }
  },
  components: {
    CharacDetails
  },
  data() {
    return {
      hover: 0,
      click: 0
    };
  }
};
</script>

<style lang="sass" scoped>
#classSlide
  .title
    z-index: 2
    top: 3%
    left: 0
    right: 0
    background: rgb(0,0,0)
    background: radial-gradient(circle, rgba(0,0,0,0.6) 45%, rgba(255,255,255,0) 100%)
  .name
    background-color: darkblue
    border: ridge white 3px
    border-radius: 5px
    padding: 5px 10px
  .left
    top: 25%
    left: 10%
  .right
    top: 25%
    right: 10%
</style>

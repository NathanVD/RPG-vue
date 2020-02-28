<template>
  <div id="selectionScreen" class="position-relative">
    <h2 class="title position-absolute text-center py-2">
      Selection de personnage :
    </h2>
    <div
      id="classesCarousel"
      class="carousel slide h-100"
      data-ride="carousel"
      data-interval="false"
    >
      <ul class="carousel-indicators">
        <img
          :src="indic1"
          alt="indic1"
          data-target="#classesCarousel"
          data-slide-to="0"
          class="indic mx-1 active"
        />
        <img
          :src="indic2"
          alt="indic2"
          data-target="#classesCarousel"
          data-slide-to="1"
          class="indic mx-1"
        />
        <img
          :src="indic3"
          alt="indic3"
          data-target="#classesCarousel"
          data-slide-to="2"
          class="indic mx-1"
        />
      </ul>
      <div class="carousel-inner h-100">
        <div class="carousel-item bg1 w-100 h-100 active">
          <ClassSlide
            classe="Seigneurs"
            :hero1="Heroes[0]"
            :hero2="Heroes[1]"
          />
        </div>
        <div class="carousel-item bg2 w-100 h-100">
          <ClassSlide
            classe="Guerriers"
            :hero1="Heroes[2]"
            :hero2="Heroes[3]"
          />
        </div>
        <div class="carousel-item bg3 w-100 h-100">
          <ClassSlide classe="Mages" :hero1="Heroes[4]" :hero2="Heroes[5]" />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#classesCarousel"
        role="button"
        data-slide="prev"
      >
        <img class="arrowLeft" :src="arrow" alt="Previous" />
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#classesCarousel"
        role="button"
        data-slide="next"
      >
        <img class="arrowRight" :src="arrow" alt="Next" />
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
import Heroes from "../assets/pools/heroes";
import ClassSlide from "../components/ClassSlide";

export default {
  components: {
    ClassSlide
  },
  data() {
    return {
      Heroes: Heroes,
      arrow: require("@/assets/img/icons/Stat-Up.gif"),
      indic1: require("@/assets/img/icons/Venus_Star.gif"),
      indic2: require("@/assets/img/icons/Mars_Star.gif"),
      indic3: require("@/assets/img/icons/Jupiter_Star.gif")
    };
  }
};
</script>

<style lang="sass" scoped>
#selectionScreen
  width: 100%
  height: 100%
  background: red
  .title
    z-index: 2
    top: 3%
    left: 0
    right: 0
    background: rgb(0,0,0)
    background: radial-gradient(circle, rgba(0,0,0,0.6) 45%, rgba(255,255,255,0) 100%)
  .arrowLeft
    transform: rotate(-135deg)
  .arrowRight
    transform: rotate(45deg)
  .carousel-control-prev, .carousel-control-next
    top: 90%
  .indic
    cursor: pointer
    opacity: .5
    transition: opacity 0.6s ease
    &.active
      opacity: 1
  .bg1
    background: url(../assets/img/backgrounds/Mars_Lighthouse_Aerie.gif)
  .bg2
    background: url(../assets/img/backgrounds/Magma_Rock2.png)
  .bg3
    background: url(../assets/img/backgrounds/Airs_Rock_Inside.gif)
</style>

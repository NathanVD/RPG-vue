<template>
  <transition
    appear
    mode="in-out"
    enter-active-class="animated zoomIn faster"
    leave-active-class="animated zoomOut faster"
  >
    <div class="position-absolute">
      <img
        :src="hero.portrait"
        class="portrait"
        :alt="hero.name + '-portrait'"
      />
      <div class="details">
        <div
          v-for="(value, name) in hero"
          v-if="
            name === 'hp' ||
              name === 'mp' ||
              name === 'atk' ||
              name === 'speed' ||
              name === 'spellBook'
          "
        >
          <p
            v-if="
              name === 'hp' ||
                name === 'mp' ||
                name === 'atk' ||
                name === 'speed'
            "
            :key="name"
            class="text-capitalize m-0"
          >
            {{ name }}: {{ value }}
          </p>
          <div v-if="name === 'spellBook'">
            <p class="text-capitalize m-0">{{ name }}:</p>
            <div class="d-flex justify-content-center">
              <img
                class="m-1"
                :title="spell.name"
                v-for="spell in value"
                :src="spell.icon"
                :key="spell.name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="valider text-center p-1">
        <p class="m-0">Choisir ce personnage ?</p>
        <input
          type="image"
          :src="yes"
          title="Oui"
          class="actionIcon"
          @click="select(hero)"
          alt="Oui"
        />
      </div></div
  ></transition>
</template>

<script>
import { eventTrain } from "../main";

export default {
  props: {
    hero: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      yes: require("@/assets/img/icons/Yes.gif")
    };
  },
  methods: {
    select(hero) {
      eventTrain.$emit("logIt", `Vous avez choisi ${hero.name}.`);
      eventTrain.$emit("selectHero", hero.name);
      eventTrain.$emit("changeRoom");
    }
  }
};
</script>

<style lang="sass" scoped>
.details, .portrait, .valider
  background-color: darkblue
  border: ridge white 3px
  border-radius: 5px
.details
  padding: 5px 10px
.valider
  width: 130px
  .actionIcon
    width: 30px
  .actionIcon:hover
    animation: pulse 0.5s infinite
</style>

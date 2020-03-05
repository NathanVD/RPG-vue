<template>
  <div id="statsBox">
    <span v-if="this.character.class === 'Boss'" class="h6 text-danger">
      <strong>☠</strong>
    </span>
    {{ this.character.name }} <br />
    <div class="bars">
      <span>Hp</span>
      <span class="value">
        {{ this.character.hp }} / {{ this.character.hpMax }}
      </span>
      <progress :max="this.character.hpMax" :value="this.character.hp" />
    </div>
    <div class="bars" v-if="this.character.mpMax">
      <span>Mp</span>
      <span class="value">
        {{ this.character.mp }} / {{ this.character.mpMax }}
      </span>
      <progress
        class="manaBar"
        :max="this.character.mpMax"
        :value="this.character.mp"
      />
    </div>
    <span class="gold">⚔</span> {{ this.character.atk }}
  </div>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="sass" scoped>
#statsBox
  background-color: darkblue
  color: white
  text-align: center
  border: ridge white 3px
  border-radius: 5px
  padding: 5px
  width: 200px
  .bars
    position: relative
    display: flex
    align-items: center
    justify-content: space-around
    .value
      position: absolute
      z-index: 2
      margin-right: auto
      margin-left: auto
      right: 0
      left: 20%
  progress[value]
    -webkit-appearance: none
    height: 15px
  .healthBar[value]::-webkit-progress-value
    background-color: green
  .manaBar[value]::-webkit-progress-value
    background-color: dodgerblue
    position: relative
    left: -1px
  .blue
    color: dodgerblue
  .red
    color: red
  .gold
    color: gold
</style>

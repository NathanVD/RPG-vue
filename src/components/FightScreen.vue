<template>
  <div id="fightScreen">
    <div id="left-window" class="window">
      <p id="statsBoxLeft" class="statBox">
        <span id="monsterStats"></span>
      </p>
      <div id="displayLeft" class="display"></div>
    </div>

    <div id="right-window" class="window">
      <p id="statsBoxRight" class="statBox">
        <span id="heroStats"></span>
      </p>
      <div id="displayRight" class="display">
        <img :src="heroSprite" />
      </div>
      <div id="actions">
        <button id="action1" value="1" class="button m-5" disabled>
          Attaque
        </button>
        <button id="action2" value="2" class="button m-5" disabled>
          Magie
        </button>
        <button id="action3" value="3" class="button m-5" disabled>
          Objets
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heroes: [
        {
          name: "Pavel",
          class: "Lord1",
          hp: 100,
          hpMax: 100,
          mp: 60,
          mpMax: 60,
          atk: 10,
          speed: 10,
          inventory: [],
          sprite: "../src/assets/img/joueur/Lord1/Lord1.gif"
        },
        {
          name: "Phœnixia",
          class: "War2",
          hp: 150,
          hpMax: 150,
          mp: 30,
          mpMax: 30,
          atk: 15,
          speed: 5,
          inventory: [],
          sprite: "../assets/img/joueur/War2/War2.gif"
        }
      ]
    };
  },
  computed: {
    heroSprite() {
      return this.heroes[0].sprite;
    }
  }
};
</script>

<style lang="sass" scoped>

#fightScreen
  width: 100%
  display: flex

.window
  position: relative
  color: white
  display: flex
  flex-flow: column
  justify-content: flex-end
  align-items: center
  width: 50%

.display
  display: flex
  justify-content: center
  height: fit-content
  width: 250px
  margin: 10px 0

.statBox
  background-color: darkblue
  color: white
  text-align: center
  border: solid white 2px
  padding: 5px
  width: 180px

#actions
  background-color: darkblue
  color: white
  text-align: center
  border: solid white 2px
  border-radius: 10px
  margin-bottom: 5px
  padding: 5px

.m-5
  margin: 5px

.w-100
  width: 100%
</style>

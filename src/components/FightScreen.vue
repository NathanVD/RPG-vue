<template>
  <div id="fightScreen" :style="{ backgroundImage: `url(${stage})` }">
    <div id="left-window" class="window">
      <StatsBox :character="Monster" />

      <div id="displayLeft" class="display">
        <img :src="monster.sprite" :class="monsterClasses" />
        <img id="anim" v-show="this.spellcast.state" :src="frame" />
      </div>
    </div>

    <div id="right-window" class="window">
      <StatsBox :character="Hero" />

      <div id="displayRight" class="display">
        <img :src="heroSprite" :class="heroClasses" />
      </div>

      <Menu
        :character="hero"
        :menuType="menuActive"
        @closeMenu="toggleMenu"
        @castSpell="castSpell"
        @useItem="useItem"
      />

      <div id="actions">
        <button value="1" class="m-1" @click="attack" :disabled="disabled">
          Attaque
        </button>
        <button
          value="2"
          class="m-1"
          @click="toggleMenu(2)"
          :disabled="disabled"
        >
          Magie
        </button>
        <button
          value="3"
          class="m-1"
          @click="toggleMenu(3)"
          :disabled="disabled"
        >
          Objets
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StatsBox from "./StatsBox.vue";
import Menu from "./Menu.vue";

export default {
  props: {
    stage: {
      type: Number,
      required: true
    },
    hero: {
      type: Object,
      required: true
    },
    monster: {
      type: Object,
      required: true
    },
    stage: {
      type: String,
      required: true
    },
    attackType: {
      type: String,
      required: true
    }
  },
  components: {
    StatsBox,
    Menu
  },
  data() {
    return {
      Hero: this.hero,
      Monster: this.monster,
      heroAttacking: false,
      monsterState: "neutral", // "hit", "attacking", "dead"
      heroAttacked: false,
      monsterAttacked: false,
      isOpen: false,
      disabled: false,
      spriteSelect: "Passif", // "Attack1", "Attack2", "Cast1", "Cast2", "Hit", "Downed"
      menuActive: 0,
      spellcast: { state: false, spell: "" },
      frame: require("@/assets/img/Psy_Seal.gif")
    };
  },
  computed: {
    heroSprite() {
      return require(`@/assets/img/joueur/${this.hero.class}/${this.spriteSelect}.gif`);
    },
    heroClasses() {
      return this.heroAttacking
        ? "w-100 attack " + this.attackType
        : this.heroAttacked
        ? "w-100 hit right"
        : "w-100";
    },
    monsterClasses() {
      switch (this.monsterState) {
        case "attacking":
          return "w-100 monsterAttack";
        case "hit":
          return "w-100 hit left";
        case "dead":
          return "w-100 dead";
        default:
          return "w-100";
      }
    }
  },
  methods: {
    toggleMenu(id) {
      this.menuActive = id;
      this.disabled = !this.disabled;
    },
    async castSpell(spell) {
      this.hero.mp -= spell.cost;
      this.spellcast.state = true;
      this.spellcast.spell = spell.name;
      this.spriteSelect = "Cast1";
      setTimeout(() => {
        spell.cast(this.hero, this.frame);
        this.spriteSelect = "Cast2";
        setTimeout(() => {
          this.monsterState = "hit";
          setTimeout(() => {
            this.monsterState = "neutral";
            this.spriteSelect = "Passif";
            this.spellcast.state = false;
          }, 800);
        }, 200);
      }, 200);
    },
    useItem(item) {
      this.spriteSelect = "Cast1";
      setTimeout(() => {
        this.spriteSelect = "Cast2";
        setTimeout(() => {
          this.spriteSelect = "Passif";
        }, 1000);
      }, 200);
    },
    attack() {
      this.disabled = true;
      this.heroAttacking = true;
      this.spriteSelect = "Attack1";
      setTimeout(() => {
        this.monsterState = "hit";
        setTimeout(() => {
          this.monsterState = "neutral";
        }, 200);
        this.spriteSelect = "Attack2";
        setTimeout(async () => {
          this.heroAttacking = false;
          this.spriteSelect = "Passif";
          if (this.monster.hp - this.hero.atk > 0) {
            this.monster.hp -= this.hero.atk;
            //await this.monsterAttack();
          } else {
            this.monster.hp = 0;
            this.monsterDeath();
          }
          this.disabled = false;
        }, 300);
      }, 300);
    },
    monsterAttack() {
      return new Promise(resolve => {
        this.monsterState = "attacking";
        setTimeout(() => {
          this.heroAttacked = true;
          this.spriteSelect = "Hit";
          setTimeout(() => {
            this.heroAttacked = false;
          }, 100);
          setTimeout(() => {
            this.monsterState = "neutral";
            this.spriteSelect = "Passif";
            if (this.hero.hp - this.monster.atk > 0) {
              //this.hero.hp -= this.monster.atk;
            } else {
              this.hero.hp = 0;
              this.spriteSelect = "Downed";
            }
            resolve();
          }, 300);
        }, 300);
      });
    },
    monsterDeath() {
      this.monsterState = "dead";
    }
  }
};
</script>

<style lang="sass" scoped>
#fightScreen
  width: 100%
  height: 100%
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

#displayLeft
  margin-bottom: 65px

#actions
  background-color: darkblue
  color: white
  text-align: center
  border: inset white 2px
  border-radius: 5px
  margin-bottom: 10px
  padding: 5px

#anim
  position: absolute
  z-index: 10
  bottom: 5%

.jump
  animation: jump 0.5s

.run
  animation: run 0.5s

.monsterAttack
  animation: monsterAttack 0.5s

.hit
  filter: invert(13%) sepia(96%) saturate(5587%) hue-rotate(9deg) brightness(102%) contrast(116%)

.dead
  animation: death 1s forwards

.left
  transform: translate(-15%)

.right
  transform: translate(15%)

@keyframes jump
  0%
    transform: translate(0)
  50%
    transform: translate(-75%, -50%)
  100%
    transform: translate(-150%, 0)

@keyframes run
  0%
    transform: translate(0)
  100%
    transform: translate(-155%)

@keyframes monsterAttack
  0%
    transform: translate(0)
  100%
    transform: translate(155%)

@keyframes death
  0%
    filter: saturate(100%)
  100%
    filter: saturate(0)
</style>

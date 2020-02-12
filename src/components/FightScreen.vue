<template>
  <div id="fightScreen" :style="{ backgroundImage: `url(${stage})` }">
    <div id="left-window" class="window">
      <StatsBox v-if="alive1a" :character="Monster" />

      <div v-if="alive1b" id="displayLeft" class="display">
        <img :src="monster.sprite" :class="monsterClasses" />
        <img
          class="animSpell"
          v-show="this.spellcast.target === 1"
          :src="frame"
        />
      </div>
    </div>

    <div id="right-window" class="window">
      <StatsBox v-if="alive2" :character="Hero" />

      <div id="displayRight" class="display">
        <img :src="heroSprite" :class="heroClasses" />
        <img
          class="animSpell"
          v-show="this.spellcast.target === 2"
          :src="frame"
        />
      </div>

      <Menu
        :character="hero"
        :menuType="menuActive"
        @closeMenu="toggleMenu"
        @castSpell="castSpell"
        @useItem="useItem"
      />

      <div id="actions" class="p-1">
        <input
          type="image"
          :src="attackIcon"
          value="1"
          title="Attaque"
          class="actionIcon"
          @click="attack"
          alt="attack"
          :disabled="disabled"
        />
        <input
          type="image"
          :src="magicIcon"
          value="2"
          title="Magie"
          class="actionIcon"
          @click="toggleMenu(2)"
          alt="magic"
          :disabled="disabled"
        />
        <input
          type="image"
          :src="itemIcon"
          value="3"
          title="Objets"
          class="actionIcon"
          @click="toggleMenu(3)"
          alt="items"
          :disabled="disabled"
        />
        <input
          type="image"
          :src="devIcon"
          value="4"
          title="Dev"
          class="actionIcon"
          @click="devHeal"
          alt="dev"
          :disabled="disabled"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatsBox from "./StatsBox.vue";
import Menu from "./Menu.vue";
import { eventTrain } from "../main";
//import Anim from "./Spells.vue";

export default {
  props: {
    stage: {
      type: String,
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
    attackType: {
      type: String,
      required: true
    }
  },
  components: {
    StatsBox,
    Menu
    //Anim
  },
  data() {
    return {
      Hero: this.hero,
      Monster: this.monster,
      alive1a: true,
      alive1b: true,
      alive2: true,
      heroAttacking: false,
      monsterState: "neutral", // "hit", "attacking", "dead"
      heroAttacked: false,
      monsterAttacked: false,
      isOpen: false,
      disabled: false,
      spriteSelect: "Passif", // "Attack1", "Attack2", "Cast1", "Cast2", "Hit", "Downed"
      menuActive: 0,
      spellcast: { target: 0, spell: "" },
      frame: require("@/assets/img/Psy_Seal.gif"), //Placeholder
      attackIcon: require("@/assets/img/Attack.gif"),
      magicIcon: require("@/assets/img/Psynergy.gif"),
      itemIcon: require("@/assets/img/Item.gif"),
      devIcon: require("@/assets/img/Lucky_Medals.gif")
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
    castSpell(spell) {
      eventTrain.$emit("logIt", `${this.hero.name} lance ${spell.name} !!!`);
      this.hero.mp -= spell.cost;
      this.spriteSelect = "Cast1";
      this.spellcast.spell = spell.name;
      setTimeout(async () => {
        if (spell.self) {
          this.spellcast.target = 2;
          this.spriteSelect = "Cast2";
          await spell.anim(this.hero);
          spell.log(this.hero.name);
          if (this.hero.hp + spell.power <= this.hero.hpMax) {
            this.hero.hp += spell.power;
          } else {
            this.hero.hp = this.hero.hpMax;
          }
        } else {
          this.spellcast.target = 1;
          this.spriteSelect = "Cast2";
          setTimeout(() => {
            this.monsterState = "hit";
            setTimeout(() => {
              this.monsterState = "neutral";
            }, 200);
          }, 600);
          spell.log(this.monster.name);
          await spell.anim(this.monster);
          this.monster.hp -= spell.power;
        }
        this.spriteSelect = "Passif";
        this.spellcast.target = 0;
        this.monster.hp > 0 ? await this.monsterAttack() : this.monsterDeath();
      }, 200);
    },
    useItem(item) {
      eventTrain.$emit(
        "logIt",
        `${this.hero.name} utilise un(e) ${item.name}.`
      );
      this.spriteSelect = "Cast1";
      this.hero.inventory.splice(this.hero.inventory.indexOf(item), 1);
      setTimeout(() => {
        this.spriteSelect = "Cast2";
        item.use(this.hero);
        setTimeout(async () => {
          this.spriteSelect = "Passif";
          this.monster.hp > 0
            ? await this.monsterAttack()
            : this.monsterDeath();
        }, 1000);
      }, 200);
    },
    attack() {
      eventTrain.$emit("logIt", `${this.hero.name} attaque !`);
      this.disabled = true;
      this.heroAttacking = true;
      this.spriteSelect = "Attack1";
      setTimeout(() => {
        this.monsterState = "hit";
        eventTrain.$emit(
          "logIt",
          `${this.monster.name} perd ${this.hero.atk}hp .`
        );
        this.monster.hp - this.hero.atk > 0
          ? (this.monster.hp -= this.hero.atk)
          : "";
        setTimeout(() => {
          this.monsterState = "neutral";
        }, 200);
        this.spriteSelect = "Attack2";
        setTimeout(async () => {
          this.heroAttacking = false;
          this.spriteSelect = "Passif";
          this.monster.hp - this.hero.atk > 0
            ? await this.monsterAttack()
            : this.monsterDeath();
          this.disabled = false;
        }, 300);
      }, 300);
    },
    monsterAttack() {
      return new Promise(resolve => {
        eventTrain.$emit("logIt", `${this.monster.name} attaque !`);
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
              eventTrain.$emit(
                "logIt",
                `${this.hero.name} perd ${this.monster.atk}hp .`
              );
              this.hero.hp -= this.monster.atk;
            } else {
              this.hero.hp = 0;
              this.spriteSelect = "Downed";
              eventTrain.$emit("logIt", `${this.hero.name} est K.O. ...`);
              setTimeout(() => {
                this.alive2 = false;
              }, 500);
            }
            resolve();
          }, 300);
        }, 300);
      });
    },
    monsterDeath() {
      eventTrain.$emit("logIt", `${this.monster.name} est vaincu !`);
      this.monster.hp = 0;
      this.monsterState = "dead";
      setTimeout(() => {
        this.alive1a = false;
        setTimeout(() => {
          this.alive1b = false;
        }, 500);
      }, 1000);
    },
    devHeal() {
      this.hero.hp = this.hero.hpMax;
      this.hero.mp = this.hero.mpMax;
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../animate.css"
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
    display: flex
    background-color: darkblue
    border: inset white 2px
    border-radius: 5px
    margin-bottom: 8px
    height: fit-content
    .actionIcon
      display: block
    .actionIcon:hover
      animation: pulse 0.5s infinite

.animSpell
  position: absolute
  z-index: 10
  bottom: 15%

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

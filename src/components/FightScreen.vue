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

      <div id="actions">
        <div v-if="actions === 'combat'" class="actions p-1">
          <input
            type="image"
            :src="attackIcon"
            value="1"
            title="Attaque"
            :class="!disabled ? 'actionIcon' : 'disabled'"
            @click="attack"
            alt="attack"
            :disabled="disabled"
          />
          <input
            type="image"
            :src="magicIcon"
            value="2"
            title="Magie"
            :class="!disabled ? 'actionIcon' : 'disabled'"
            @click="toggleMenu(2)"
            alt="magic"
            :disabled="disabled"
          />
          <input
            type="image"
            :src="itemIcon"
            value="3"
            title="Objets"
            :class="!disabled ? 'actionIcon' : 'disabled'"
            @click="toggleMenu(3)"
            alt="items"
            :disabled="disabled"
          />
          <input
            type="image"
            :src="devIcon"
            value="4"
            title="Dev"
            :class="!disabled ? 'actionIcon' : 'disabled'"
            @click="devHeal"
            alt="dev"
            :disabled="disabled"
          />
        </div>
        <div
          v-if="actions === 'continuer'"
          class="actions align-items-center p-1"
        >
          <p class="m-0 mr-2">Continuer ?</p>
          <input
            type="image"
            :src="yes"
            title="Oui"
            class="actionIcon"
            @click="continuer"
            alt="Oui"
          />
        </div>
      </div>
    </div>
    <audio autoplay v-if="this.Monster.class === 'Monster'" @ended="loop">
      <source src="@/assets/soudtrack/Battle1.mp3" type="audio/mpeg" />
    </audio>
    <audio loop autoplay v-else-if="this.Monster.class === 'Boss'">
      <source src="@/assets/soudtrack/Boss1.mp3" type="audio/mpeg" />
    </audio>
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
      actions: "combat",
      disabled: false,
      spriteSelect: "Passif", // "Attack1", "Attack2", "Cast1", "Cast2", "Hit", "Downed"
      menuActive: 0,
      spellcast: { target: 0, spell: "" },
      frame: require("@/assets/img/Psy_Seal.gif"), //Placeholder
      attackIcon: require("@/assets/img/icons/Attack.gif"),
      magicIcon: require("@/assets/img/icons/Psynergy.gif"),
      itemIcon: require("@/assets/img/icons/Item.gif"),
      devIcon: require("@/assets/img/icons/Lucky_Medals.gif"),
      yes: require("@/assets/img/icons/Yes.gif")
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
  mounted: function() {
    this.monster.class === "Boss"
      ? eventTrain.$emit(
          "logIt",
          `Vous appercevez la fin de la zone, cependant un(e) <span class="text-danger">${this.monster.name}</span> se dresse sur votre chemin. Preparez vous a vous battre !`
        )
      : eventTrain.$emit(
          "logIt",
          `Vous rencontrez un(e) ${this.monster.name}. Preparez vous a vous battre !`
        );
  },
  methods: {
    loop: e => {
      event.target.currentTime = 1.85;
      event.target.play();
    },
    toggleMenu(id) {
      this.menuActive = id;
      this.disabled = !this.disabled;
    },
    castSpell(spell) {
      eventTrain.$emit("logIt", `${this.hero.name} lance ${spell.name} !!!`);
      this.disabled = true;
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
          this.monster.hp - spell.power > 0
            ? (this.monster.hp -= spell.power)
            : (this.monster.hp = 0);
        }
        this.spriteSelect = "Passif";
        this.spellcast.target = 0;
        this.monster.hp === 0 ? this.monsterDeath() : this.monsterAttack();
      }, 200);
    },
    useItem(item) {
      eventTrain.$emit(
        "logIt",
        `${this.hero.name} utilise un(e) ${item.name}.`
      );
      this.disabled = true;
      this.spriteSelect = "Cast1";
      this.hero.inventory.splice(this.hero.inventory.indexOf(item), 1);
      setTimeout(() => {
        this.spriteSelect = "Cast2";
        item.use(this.hero);
        setTimeout(() => {
          this.spriteSelect = "Passif";
          this.monster.hp > 0 ? this.monsterAttack() : this.monsterDeath();
          this.disabled = false;
        }, 1000);
      }, 200);
    },

    attack() {
      eventTrain.$emit("logIt", `${this.hero.name} attaque !`);
      this.disabled = true;
      this.heroAttacking = true;
      this.spriteSelect = "Attack1";
      setTimeout(() => {
        this.spriteSelect = "Attack2";
        this.monsterState = "hit";
        eventTrain.$emit(
          "logIt",
          `${this.monster.name} perd ${this.hero.atk}hp .`
        );
        this.monster.hp - this.hero.atk > 0
          ? (this.monster.hp -= this.hero.atk)
          : (this.monster.hp = 0);
        setTimeout(() => {
          this.monsterState = "neutral";
          setTimeout(() => {
            this.heroAttacking = false;
            this.spriteSelect = "Passif";
            this.monster.hp === 0 ? this.monsterDeath() : this.monsterAttack();
          }, 100);
        }, 200);
      }, 300);
    },

    monsterAttack() {
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
            this.disabled = false;
          } else {
            this.playerDeath();
          }
        }, 300);
      }, 300);
    },

    monsterDeath() {
      eventTrain.$emit("logIt", `${this.monster.name} est vaincu !`);
      this.monsterState = "dead";
      setTimeout(() => {
        this.alive1a = false;
        setTimeout(() => {
          this.alive1b = false;
          if (this.monster.class === "Boss") {
            eventTrain.$emit("bossDeath");
            eventTrain.$emit(
              "logIt",
              `Vous avez defait le boss de cette zone !`
            );
          }
          this.actions = "continuer";
        }, 500);
      }, 1000);
    },

    playerDeath() {
      eventTrain.$emit("logIt", `${this.hero.name} est K.O. ...`);
      this.hero.hp = 0;
      this.spriteSelect = "Downed";
      setTimeout(() => {
        this.disabled = false;
        this.alive2 = false;
        this.actions = "continuer";
      }, 500);
    },

    devHeal() {
      this.hero.hp = this.hero.hpMax;
      this.hero.mp = this.hero.mpMax;
    },

    continuer() {
      this.alive2
        ? eventTrain.$emit("changeRoom")
        : eventTrain.$emit("changeRoom", "gameover");
      this.actions = "combat";
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
    display: flex
    flex-flow: column
    justify-content: flex-end
    align-items: center
    text-shadow: 2px 2px black
    width: 50%
  .display
    display: flex
    justify-content: center
    height: fit-content
    width: 250px
    margin: 10px 0
  #displayLeft
    margin-bottom: 65px
  .actions
    display: flex
    background-color: darkblue
    border: inset white 2px
    border-radius: 5px
    margin-bottom: 5px
    height: fit-content
    .actionIcon
      display: block
    .actionIcon:hover
      animation: pulse 0.5s infinite
    .disabled
      display: block
      filter: grayscale(100%)

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

<template>
  <div id="chestScreen" :style="{ backgroundImage: `url(${stage})` }">
    <div
      class="position-relative"
      v-if="isOpen"
      @mouseover="showStats = true"
      @mouseleave="showStats = false"
    >
      <img :src="relic.sprite" alt="Relique" />
      <div v-if="showStats">
        <div class="statsBox1">
          <p class="text-center text-warning mb-2">{{ relic.name }}</p>
          <p v-if="relic.bonusHp" class="d-flex justify-content-between">
            Vie :
            <span> {{ relic.bonusHp }}</span>
          </p>
          <p v-if="relic.bonusMp" class="d-flex justify-content-between">
            Mana :
            <span> {{ relic.bonusMp }}</span>
          </p>
          <p v-if="relic.bonusAtk" class="d-flex justify-content-between">
            Attaque :
            <span> {{ relic.bonusAtk }}</span>
          </p>
          <p v-if="relic.bonusSpd" class="d-flex justify-content-between">
            Vitesse :
            <span> {{ relic.bonusSpd }}</span>
          </p>
        </div>
        <div class="statsBox2">
          <p class="text-center text-danger mb-2">{{ Hero.name }}</p>
          <p v-if="relic.bonusHp" class="d-flex justify-content-between">
            Vie :
            <span
              >{{ Hero.hpMax }}<img :src="statUp" alt="Stat Up" />
              {{ Hero.hpMax + relic.bonusHp }}</span
            >
          </p>
          <p v-if="relic.bonusMp" class="d-flex justify-content-between">
            Mana :
            <span
              >{{ Hero.mpMax }}<img :src="statUp" alt="Stat Up" />
              {{ Hero.mpMax + relic.bonusMp }}</span
            >
          </p>
          <p v-if="relic.bonusAtk" class="d-flex justify-content-between">
            Attaque :
            <span
              >{{ Hero.atk }}<img :src="statUp" alt="Stat Up" />
              {{ Hero.atk + relic.bonusAtk }}</span
            >
          </p>
          <p v-if="relic.bonusSpd" class="d-flex justify-content-between">
            Vitesse :
            <span
              >{{ Hero.speed }}<img :src="statUp" alt="Stat Up" />
              {{ Hero.speed + relic.bonusSpd }}</span
            >
          </p>
        </div>
      </div>
    </div>
    <img :src="chest" class="m-2" alt="Coffre" />
    <div class="actions">
      <p v-if="action === 'ouvrir'">Ouvrir le coffre ?</p>
      <div class="icones">
        <input
          v-if="action === 'ouvrir'"
          type="image"
          :src="yes"
          title="Oui"
          :class="!disabled ? 'actionIcon mr-1' : 'disabled mr-1'"
          @click="open"
          alt="Oui"
          :disabled="disabled"
        />
        <input
          v-if="action === 'ouvrir'"
          type="image"
          :src="no"
          title="Non"
          :class="!disabled ? 'actionIcon ml-1' : 'disabled ml-1'"
          @click="ignore"
          alt="Non"
          :disabled="disabled"
        />
        <p v-if="action === 'continuer'" class="mr-2">Continuer ?</p>
        <input
          v-if="action === 'continuer'"
          type="image"
          :src="yes"
          title="Oui"
          class="actionIcon"
          @click="continuer"
          alt="Oui"
        />
      </div>
    </div>
    <audio loop autoplay>
      <source src="@/assets/soudtrack/soundtrack42.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
import { eventTrain } from "../main";

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
    relic: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      Hero: this.hero,
      Relic: this.relic,
      action: "ouvrir",
      disabled: false,
      isOpen: false,
      showStats: false,
      yes: require("@/assets/img/icons/Yes.gif"),
      no: require("@/assets/img/icons/No.gif"),
      statUp: require("@/assets/img/icons/Stat-Up.gif"),
      atkUp: require("@/assets/img/icons/attack_up.gif")
    };
  },

  computed: {
    chest() {
      let sprite;
      this.isOpen
        ? (sprite = require("@/assets/img/relics/openChest.png"))
        : (sprite = require("@/assets/img/relics/chest.png"));
      return sprite;
    }
  },

  methods: {
    open() {
      this.isOpen = true;
      eventTrain.$emit("logIt", `Vous ouvrez le coffre.`);
      setTimeout(() => {
        eventTrain.$emit(
          "logIt",
          `Le coffre contenait un(e) "${this.relic.name}" que vous equippez.`
        );
      }, 200);
      this.action = "continuer";
    },

    ignore() {
      this.isOpen = false;
      eventTrain.$emit("logIt", `Vous ignorez le coffre.`);
      this.action = "continuer";
    },

    continuer() {
      this.Relic.equip(this.Hero);
      this.action = "ouvrir";
      this.isOpen = false;
      eventTrain.$emit("changeRoom");
    }
  },
  mounted: function() {
    eventTrain.$emit("logIt", `Vous trouvez un coffre !`);
  }
};
</script>

<style lang="sass" scoped>
p
  margin: 0

#chestScreen
  width: 100%
  height: 100%
  display: flex
  flex-flow: column
  justify-content: flex-end
  align-items: center
  .statsBox1
    position: absolute
    bottom: 75%
    right: 125%
      background-color: #00008b7c
    background-color: darkblue
    color: white
    text-align: center
    border: ridge white 3px
    border-radius: 5px
    padding: 5px
    width: 175px
  .statsBox2
    position: absolute
    bottom: 75%
    left: 125%
    background-color: darkblue
    border: ridge white 3px
    border-radius: 5px
    padding: 5px
    width: 175px
  .actions
    display: flex
    flex-flow: column
    align-items: center
    background-color: darkblue
    border: inset white 2px
    border-radius: 5px
    padding: 5px
    margin-bottom: 5px
    .icones
      display: flex
      align-items: center
    .actionIcon
      display: block
    .actionIcon:hover
      animation: pulse 0.5s infinite
    .disabled
      display: block
      margin: 5px 5px 0 5px
      filter: grayscale(100%)
</style>

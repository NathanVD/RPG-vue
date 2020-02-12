import { eventTrain } from "../../main";

export default [
  {
    type: "spell",
    name: "Soin",
    power: 15,
    cost: 10,
    effect: "Rend 15hp au lanceur.",
    self: true,
    icon: require("@/assets/img/sorts/Cure_Well.gif"),
    log(cible) {
      eventTrain.$emit("logIt", `${cible.name} récupère 15hp !`);
    },
    anim(cible) {
      return new Promise(resolve => {
        setTimeout(() => {
          //console.log(cible);
          resolve();
        }, 1000);
      });
    }
  },
  {
    type: "spell",
    name: "Explosion",
    power: 30,
    cost: 20,
    effect: "Crée une explosion qui inflige 30 points de dégâts.",
    self: false,
    icon: require("@/assets/img/sorts/Blast2.gif"),
    log(cible) {
      eventTrain.$emit("logIt", `${cible.name} perd 30hp !!`);
    },
    anim(cible) {
      return new Promise(resolve => {
        setTimeout(() => {
          //console.log(cible);
          resolve();
        }, 1000);
        // for (let i = 1; i <= 25; i++) {
        //   setTimeout(() => {
        //     cible = require(`@/assets/img/sorts/animations/blast/blast${i}.png`);
        //   }, (i - 1) * 55);
        // }
        // resolve();
      });
    }
  },
  {
    type: "spell",
    name: "Stalactite",
    power: 40,
    cost: 30,
    effect:
      "Crée une stalactite qui tombe sur la cible et inflige 40 points de dégâts.",
    self: false,
    icon: require("@/assets/img/sorts/Spire.gif"),
    log(cible) {
      eventTrain.$emit("logIt", `${cible.name} perd 40hp !!!`);
    },
    anim(cible) {
      return new Promise(resolve => {
        setTimeout(() => {
          //console.log(cible);
          resolve();
        }, 1000);
        // for (let i = 1; i <= 30; i++) {
        //   setTimeout(() => {
        //     this.frame = require(`@/assets/img/sorts/animations/spire/spire${i}.png`);
        //   }, (i - 1) * 55);
        // }
        // resolve();
      });
    }
  }
];

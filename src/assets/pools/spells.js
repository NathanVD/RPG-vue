export default [
  {
    type: "spell",
    name: "Soin",
    power: 15,
    cost: 10,
    effect: "Rend 15hp au lanceur.",
    icon: require("@/assets/img/sorts/Cure_Well.gif"),
    cast(cible) {
      setTimeout(() => {
        if (cible.hp + this.power > cible.hpMax) {
          cible.hp = cible.hpMax;
        } else {
          cible.hp += this.power;
        }
      }, 1100);
    }
  },
  {
    type: "spell",
    name: "Explosion",
    power: 30,
    cost: 20,
    effect: "Crée une explosion qui inflige 30 points de dégâts.",
    icon: require("@/assets/img/sorts/Blast2.gif"),
    cast(cible, zone) {
      for (let i = 1; i <= 25; i++) {
        setTimeout(() => {
          zone = require(`@/assets/img//sorts/animations/blast/blast${i}.png`);
        }, i * 55);
      }
      setTimeout(() => {
        if (cible.hp + this.power > cible.hpMax) {
          cible.hp = cible.hpMax;
        } else {
          cible.hp += this.power;
        }
      }, 1100);
    }
  },
  {
    type: "spell",
    name: "Stalactite",
    power: 40,
    cost: 30,
    effect:
      "Crée une stalactite qui tombe sur la cible et inflige 40 points de dégâts.",
    icon: require("@/assets/img/sorts/Spire.gif"),
    cast(user, zone) {
      for (let i = 1; i <= 30; i++) {
        setTimeout(() => {
          zone = require(`@/assets/img//sorts/animations/spire/spire${i}.png`);
        }, i * 55);
      }
      setTimeout(() => {
        if (user.hp + this.power > user.hpMax) {
          user.hp = user.hpMax;
        } else {
          user.hp += this.power;
        }
      }, 1100);
    }
  }
];

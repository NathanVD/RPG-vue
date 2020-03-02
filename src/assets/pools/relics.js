export default [
  {
    name: "Mimique",
    class: "Monster",
    screen: "chest",
    hp: 50,
    hpMax: 50,
    atk: 20,
    speed: 20,
    sprite: require("@/assets/img/monstres/Mimic.gif")
  },
  {
    name: "Epee de vitesse",
    class: "Relic",
    screen: "chest",
    bonusHp: 0,
    bonusMp: 0,
    bonusAtk: 10,
    bonusSpd: 10,
    sprite: require("@/assets/img/relics/sword.png"),
    equip(hero) {
      hero.atk += this.bonusAtk;
      hero.speed += this.bonusSpd;
    }
  },
  {
    name: "Bottes de celerite",
    class: "Relic",
    screen: "chest",
    bonusHp: 10,
    bonusMp: 5,
    bonusAtk: 0,
    bonusSpd: 10,
    sprite: require("@/assets/img/relics/boots.png"),
    equip(hero) {
      hero.hp += this.bonusHp;
      hero.hpMax += this.bonusHp;
      hero.mp += this.bonusMp;
      hero.mpMax += this.bonusMp;
      hero.speed += this.bonusSpd;
    }
  },
  {
    name: "Armure doree",
    class: "Relic",
    screen: "chest",
    bonusHp: 20,
    bonusMp: 10,
    bonusAtk: 0,
    bonusSpd: 0,
    sprite: require("@/assets/img/relics/armor.png"),
    equip(hero) {
      hero.hp += this.bonusHp;
      hero.hpMax += this.bonusHp;
      hero.mp += this.bonusMp;
      hero.mpMax += this.bonusMp;
    }
  },
  {
    name: "Anneau de perfection",
    class: "Relic",
    screen: "chest",
    bonusHp: 10,
    bonusMp: 5,
    bonusAtk: 5,
    bonusSpd: 10,
    sprite: require("@/assets/img/relics/ring.png"),
    equip(hero) {
      hero.hp += this.bonusHp;
      hero.hpMax += this.bonusHp;
      hero.mp += this.bonusMp;
      hero.mpMax += this.bonusMp;
      hero.atk += this.bonusAtk;
      hero.speed += this.bonusSpd;
    }
  },
  {
    name: "Casque a cornes",
    class: "Relic",
    screen: "chest",
    bonusHp: 15,
    bonusMp: 0,
    bonusAtk: 5,
    bonusSpd: 0,
    sprite: require("@/assets/img/relics/helmet.png"),
    equip(hero) {
      hero.hp += this.bonusHp;
      hero.hpMax += this.bonusHp;
      hero.atk += this.bonusAtk;
    }
  }
];

import { eventTrain } from "../../main";

export default [
  {
    type: "item",
    name: "Potion",
    dropRate: 0.33,
    effect: "Rend 30hp.",
    sprite: require("@/assets/img/items/potion.gif"),
    use(user) {
      eventTrain.$emit("logIt", `${user.name} récupère 30hp.`);
      if (user.hp + 30 > user.hpMax) {
        user.hp = user.hpMax;
      } else {
        user.hp += 30;
      }
    }
  },
  {
    type: "item",
    name: "Élixir de force",
    dropRate: 0.2,
    effect: "Augmente l'atk de 5.",
    sprite: require("@/assets/img/items/elixir.gif"),
    use(user) {
      eventTrain.$emit("logIt", `${user.name} gagne 5 atk.`);
      user.atk += 5;
    }
  },
  {
    type: "item",
    name: "Fiole",
    dropRate: 0.45,
    effect: "Rend 20mp.",
    sprite: require("@/assets/img/items/Vial.gif"),
    use(user) {
      eventTrain.$emit("logIt", `${user.name} récupère 30mp.`);
      if (user.mp + 20 > user.mpMax) {
        user.mp = user.mpMax;
      } else {
        user.mp += 20;
      }
    }
  }
];

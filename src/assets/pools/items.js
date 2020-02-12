export default [
  {
    type: "item",
    name: "Potion",
    dropRate: 0.33,
    effect: "Rend 30hp.",
    sprite: require("@/assets/img/items/potion.gif"),
    use(user) {
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
      user.atk += 5;
    }
  }
];

<template>
  <div>
    <!-- Spells -->
    <div class="menu" v-show="menuType === 2">
      <div class="menuHeader">
        Sorts
        <input
          class="cancel"
          type="image"
          :src="closeIco"
          alt="close"
          @click="close"
        />
      </div>
      <hr />
      <p class="d-flex m-0" v-for="(spell, index) in spellBook" :key="index">
        <abbr :title="spell.effect" class="noStyle">
          <button
            :class="
              character.mp - spell.cost >= 0
                ? 'noStyle'
                : 'noStyle text-secondary'
            "
            @click="cast(spell)"
            :disabled="character.mp - spell.cost < 0"
          >
            <img :src="spell.icon" alt="spell" />
            {{ spell.name }}
          </button>
        </abbr>
        <span
          :class="
            character.mp - spell.cost >= 0 ? 'ml-auto' : 'ml-auto text-danger'
          "
        >
          {{ spell.cost }}
        </span>
      </p>
    </div>

    <!-- Items -->
    <div class="menu" v-show="menuType === 3">
      <div class="menuHeader">
        Objets
        <input
          class="cancel"
          type="image"
          :src="closeIco"
          alt="close"
          @click="close"
        />
      </div>
      <hr />
      <abbr
        v-for="(item, index) in inventory"
        :key="index"
        :title="item.effect"
      >
        <input
          type="image"
          class="item"
          :src="item.sprite"
          @click="use(item)"
          alt="item"
        />
      </abbr>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true
    },
    menuType: {
      type: Number,
      required: true
    }
  },
  computed: {
    closeIco() {
      return require("@/assets/img/lowercase-x.gif");
    },
    inventory() {
      return this.character.inventory;
    },
    spellBook() {
      return this.character.spellBook;
    }
  },
  methods: {
    close() {
      this.$emit("closeMenu", 0);
    },
    cast(spell) {
      this.close();
      this.$emit("castSpell", spell);
    },
    use(item) {
      this.close();
      this.$emit("useItem", item);
    }
  }
};
</script>

<style lang="sass" scoped>
.menu
  width: 150px
  height: 150px
  background-color: #00008b7c
  color: white
  border: ridge white 3px
  border-radius: 5px
  position: absolute
  z-index: 10
  bottom: 61px
  right: 150px
  .menuHeader
    display: flex
    justify-content: space-between
    padding-left: 5px
    .cancel
      background: red
      width: 24px
      border: white solid 1px
      border-radius: 5%
  .item
    width: 30px
  .noStyle
    all: unset
  hr
    margin: 0
    background: white
</style>

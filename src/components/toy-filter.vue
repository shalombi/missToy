<template>
  <section class="toy-filter">
    <input v-focus v-model="filterBy.name" @input="setFilter" type="text" class="form-input"
      placeholder="Search name..." />

    <!-- <label for="">All -->
      <select @change="setFilter" v-model="filterBy.label">
        <option value="All">All</option>
        <option value="Doll">Doll</option>
        <option value="Battery Powered">Battery Powered</option>
        <option value="Baby">Baby</option>
      </select>
    <!-- </label> -->


    <label>
      Show only toys in stock
      <input name="inStock" @change="setFilter" checked="true" type="checkbox" />
      <!-- <input name="inStock" @change="setFilter" type="checkbox" /> -->
    </label>

  </section>
  {{ filterBy }}
</template>

<script>
export default {
  name: 'toy-filter',
  data() {
    return {
      filterBy: {
        name: '',
        label: '',
        inStock: true,
      },
    }
  },
  created() {
    this.$emit('setFilter', this.filterBy)
    // this.filterBy.inStock = true
    // this.setFilter()
  },

  methods: {
    setFilter({ target }) {
      console.log(target, '>>> target')
      if (target.name === 'inStock') {
        this.filterBy.inStock = !this.filterBy.inStock
      }

      this.$emit('setFilter', this.filterBy)
    },
  },

}
</script>

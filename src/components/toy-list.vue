<template>
  <ul class="toy-list clean-list grid gap-1">
    <toy-preview @removeToy="removeToy" v-for="toy in toys.filteredToys" :toy="toy" :key="toy.id" />
  </ul>

  <!-- <pre v-if="toys">{{ toys }}</pre> -->
  <details>
      <summary>{{ toys.filteredToys.length }} items</summary>
      <pre v-if="toys">{{ toys }}</pre> 
  </details>
  
</template>


<script>

import toyPreview from './toy-preview.vue'

export default {
  props: {
    toys: {
      type: Object,
      required: true,
    },
  },
  components: {
    toyPreview,
  },
  methods: {
    removeToy(toyId) {
      this.$emit('removeToy', toyId)
    },
  },
}
</script>

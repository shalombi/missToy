<template>
  kmkkm
  <section v-if="toyToEdit" class="toy-edit py-2">
    <!-- {{  toyToEdit }} -->
    <form @submit.prevent="saveToy" class="form">
      <div class="form-control">
        <label for="txt" class="form-label">Toy Vendor</label>
        <input required v-model="toyToEdit.vendor" id="txt" type="text" class="form-input"
          placeholder="Enter your toy vendor here..." />
      </div>
      <div class="form-control">
        <label for="speed" class="form-label">Toy Speed</label>
        <input required v-model.number="toyToEdit.speed" id="speed" type="number" class="form-input" />
      </div>
      <div class="btn-group">
        <button @click="saveToy" class="btn btn-info">save</button>
        <button @click="goBack" class="btn btn-danger-text">go back</button>
      </div>
    </form>
  </section>
</template>

<script>

import { httpService } from '../services/http.service'
import { toyService } from '../services/toy-service'

export default {
  name: 'toy-edit',
  data() {
    return {
      toyToEdit: null,
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      httpService.get(`toy/${id}`)
        .then((toy) => {
        this.toyToEdit = toy
        })
    }
     else this.toyToEdit = toyService.getEmptyToy()
  },
  methods: {
    goBack() {
      this.$router.push('/toy')
    },
    saveToy() {
      this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit })
        .then(() => {
          this.$router.push('/toy')
        })
    },
  },
}
</script>

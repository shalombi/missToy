<template>
  <section v-if="toy" class="toy-details flex flex-col items-center gap-2">
    <article>
      {{ toy }}
      <!-- <p><span class="fw-bold">ID:</span> {{ toy.id }}</p>
      <p><span class="fw-bold">Name:</span> {{ toy.name }}</p>
      <p><span class="fw-bold">Price:</span> {{ toy.price }}</p> -->
    </article>
    <button @click="goBack" class="btn btn-primary">go back</button>
  </section>
</template>

<script>
import { httpService } from '../services/http.service'
import { toyService } from '../services/toy-service.js'

export default {
  name: 'toy-detail',
  data() {
    return {
      toy: null,
    }
  },
  created() {
    const { id } = this.$route.params
    httpService.get(`toy/${id}`)
      .then((toy) => {
        this.toy = toy
      })
  },
  methods: {
    goBack() {
      this.$router.push('/toy')
    },
  },
}
</script>

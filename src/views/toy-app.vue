<template>
  <section class="toy-app container flex flex-col gap-1">
    <button @click="goToEdit" class="btn btn-secondary">Add a new toy</button>
    <toy-filter @setFilter="setFilter" />
    <toy-list @removeToy="removeToy" v-if="toys" :toys="toys" />

    <router-link to="/chart"> <button class="btn btn-info">Chart</button></router-link>

    <button @click="setPage(-1)" class="btn btn-primary">Prev</button>
    <button @click="setPage(1)" class="btn btn-primary">Next</button>
  </section>
</template>

<script>
import { toyService } from '../services/toy-service.js'
import toyFilter from '../components/toy-filter.vue'
import toyList from '../components/toy-list.vue'
// import toysChart from '../components/toys-chart.vue'

// toys-chart.vue
import { httpService } from '../services/http.service'

export default {
  name: 'toy-app',
  data() {
    return {
      toys: [],
      filterBy: {
        byName: '',
        page: 0,
      },
      totalPages: 0,
    }
  },
  methods: {

  },
  computed: {
    toys() {
      return this.$store.getters.toys
    },

    // toysToShow() {
    //   if (!this.filterBy) return this.toys
    //   const regex = new RegExp(this.filterBy.name, 'i')
    //   const filtered = this.toys.filteredToys.filter((toy) => regex.test(toy.name))
    //   return filtered
    // },
  },
  created() { },
  methods: {
    loadToys() {
      this.$store.dispatch({ type: 'loadToys', filterBy: this.filterBy })
        .then(({ totalPages, filteredToys }) => {
          ; (this.totalPages = totalPages), (this.toys = filteredToys)
        })
    },

    goToEdit() {
      this.$router.push(`/toy/edit`)
    },
    removeToy(toyId) {
      this.$store.dispatch({ type: 'removeToy', id: toyId })
    },
    setPage(dir) {
      // console.log(this.filterBy);
      this.filterBy.page += +dir
      if (this.filterBy.page > this.totalPages - 1) this.filterBy.page = 0
      if (this.filterBy.page < 0) this.filterBy.page = this.totalPages - 1
      this.$store.commit({ type: "updatePage", page: this.filterBy.page })

      this.loadToys()
    },
    setFilter(filterBy) {
      console.log(';;;pppsdcdknckwdncnii')
      this.filterBy = { ...filterBy, page: this.filterBy.page }
      this.loadToys()
    },

  },
  components: {
    toyList,
    toyFilter,
  },
}
</script>

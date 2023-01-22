<template>
  <section class="toy-app container flex flex-col gap-1">
    <button @click="goToEdit" class="btn btn-secondary">Add a new toy</button>
    <toy-filter @setFilter="setFilter" />
    <toy-list @removeToy="removeToy" v-if="toys" :toys="toys" />

    <button @click="setPage(-1)" class="btn btn-primary">Prev</button>
    <button @click="setPage(1)" class="btn btn-primary">Next</button>
    <!-- <toy-list @removeToy="removeToy" v-if="toys" :toys="toys" /> -->
    <!-- <pre>{{ toys }}</pre> -->

  </section>
</template>

<script>
import { toyService } from '../services/toy-service.js'
import toyFilter from '../components/toy-filter.vue'
import toyList from '../components/toy-list.vue'
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

    toysToShow() {
      // console.log('this.toys', '$$$$$', this.toys.filteredToys);
      if (!this.filterBy) return this.toys
      const regex = new RegExp(this.filterBy.name, 'i')
      const filtered = this.toys.filteredToys.filter((toy) => regex.test(toy.name))
      // console.log('filtered $$$$', filtered);
      return filtered
      // return this.toys.filteredToys.filter((toy) => regex.test(toy.name))
    },
  },
  created() { },
  methods: {
    loadToys() {
      // toyService.query().then((toys) => (this.toys = toys))
      this.$store.dispatch({ type: 'loadToys', filterBy: this.filterBy })
        // .then((some) => console.log(some, 'some'))

        .then(({ totalPages, filteredToys }) => {
          // console.log(filteredToys, 'filteredToys FRONTEND')
          // console.log(totalPages, 'totalPages FRONTEND')

          ; (this.totalPages = totalPages), (this.toys = filteredToys)
        })
// n
    },
    // setFilter(filterBy) {
    //   this.filterBy = filterBy
    // },
    goToEdit() {
      this.$router.push(`/toy/edit`)
    },
    removeToy(toyId) {
      this.$store.dispatch({ type: 'removeToy', id: toyId })
    },
    // setPage(dir) {
    //   this.$store.dispatch({ type: 'setPage', dir })
    // },
    setPage(dir) {
      console.log(this.filterBy);
      this.filterBy.page += +dir
      if (this.filterBy.page > this.totalPages - 1) this.filterBy.page = 0
      if (this.filterBy.page < 0) this.filterBy.page = this.totalPages - 1
      this.$store.commit({ type: "updatePage", page: this.filterBy.page })

      this.loadToys()
    },
    setFilter(filterBy) {
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

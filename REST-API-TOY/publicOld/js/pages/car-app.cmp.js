import { toyService } from '../services/toy.service.js'
import toyFilter from '../cmps/toy-filter.cmp.js'
import toyList from '../cmps/toy-list.cmp.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

export default {
  template: `
        <section class="toy-app">
            <toy-filter @filtered="setFilter" />
            <h2>Total Pages {{totalPages}}</h2>
            <toy-list :toys="toys" @remove="removeToy" />
            <button @click="setPage(-1)">Prev</button>
            <button @click="setPage(1)">Next</button>
            <router-link to="/toy/edit">Add a new toy!</router-link>
        </section>
    `,
  data() {
    return {
      toys: [],
      filterBy: {
        byVendor: '',
        page: 0,
      },
      totalPages: 0,
    }
  },
  methods: {
    loadToys() {
      toyService.query(this.filterBy).then(({ totalPages, filteredToys }) => {
        ; (this.totalPages = totalPages), (this.toys = filteredToys)
      })
    },
    removeToy(toyId) {
      toyService.remove(toyId).then(() => {
        showSuccessMsg('Toy removed')
        const idx = this.toys.findIndex((toy) => toy._id === toyId)
        this.toys.splice(idx, 1)
      })
    },
    setFilter(filterBy) {
      this.filterBy = { ...filterBy, page: this.filterBy.page }
      this.loadToys()
    },
    setPage(dir) {
      this.filterBy.page += +dir
      if (this.filterBy.page > this.totalPages - 1) this.filterBy.page = 0
      if (this.filterBy.page < 0) this.filterBy.page = this.totalPages - 1
      this.loadToys()
    },
  },
  computed: {
    toysToShow() {
      if (!this.filterBy) return this.toys
      const searchStr = this.filterBy.byVendor.toLowerCase()
      const toysToShow = this.toys.filter((toy) => {
        return toy.vendor.toLowerCase().includes(searchStr)
      })
      return toysToShow
    },
  },
  created() {
    this.loadToys()
  },
  components: {
    toyFilter,
    toyList,
  },
}

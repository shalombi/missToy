import { httpService } from '../../services/http.service'
import { toyService } from '../../services/toy-service'

export default {
  state: {
    toys: null,
    page: null,

  },
  getters: {
    toys(state) {
      return state.toys
    },
    page(state) {
      return state.page
    },
  },
  mutations: {
    // srtChart(state) {
    //   console.log('page ppppp', page)
    // },
    updatePage(state, { page }) {
      // console.log('page ppppp', page)
      state.page = page
    },
    setToys(state, { toys }) {
      state.toys = toys
    },
    removeToy(state, { id }) {
      const idx = state.toys.filteredToys.findIndex((toy) => toy.id === id)
      state.toys.filteredToys.splice(idx, 1)
    },
    saveToy(state, { toy }) {

      const idx = state.toys.filteredToys.findIndex((currToy) => currToy._id === toy._id)
      if (idx !== -1) {
        state.toys.filteredToys.splice(idx, 1, toy)
      }
      else {
        state.toys.filteredToys.push(toy)
      }

    }
  },
  actions: {
    loadToys({ commit }, { filterBy }) {
      return httpService.get('toy/', filterBy)
        .then(toys => {
          commit({ type: 'setToys', toys })
          return Promise.resolve(toys)
        })
    },
    removeToy({ commit }, { id }) {
      httpService.delete(`toy/${id}`)
        .then(() => {
          commit({ type: 'removeToy', id })
        })
    },
    saveToy({ commit }, { toy }) {
      // console.log(toy, 'toy>>>');
      if (toy._id) {
        // console.log('TOY@@@@@', toy)
        httpService.put(`toy/${toy._id}`, toy)
          .then(toy => {
            commit({ type: 'saveToy', toy })
          })
      }
      else {
        httpService.post('toy/', toy)
          .then(toy => {
            // console.log(toy,'toy>>>')
            commit({ type: 'saveToy', toy })
          })
      }
      // toyService.save(toy).then((toy) => {
      //   commit({ type: 'saveToy', toy })
      // })

    },

    // setPage(context, { dir }) {
    //   this.filterBy.page += +dir
    //   if (this.filterBy.page > this.totalPages - 1) this.filterBy.page = 0
    //   if (this.filterBy.page < 0) this.filterBy.page = this.totalPages - 1
    //   this.loadCars()
    // }
  },
}

import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export default {
    template: `
   <section v-if="toyToEdit" class="toy-edit app-main">
        <h3>{{title}}</h3>
        <form @submit.prevent="save">
            <input type="text" placeholder="Vendor" v-model="toyToEdit.vendor">
            <input type="number" placeholder="Speed" v-model.number="toyToEdit.speed">
            <button>Save</button>
        </form>
   </section>
    `,
    data() {
        return {
            toyToEdit: null
        }
    },

    methods: {
        save() {
            toyService.save(this.toyToEdit)
                .then(toy => {
                    console.log('Saved Toy:', toy)
                    showSuccessMsg('Toy saved succesfully')
                    this.$router.push('/toy-app')
                })
                .catch(err => {
                    console.log(err)
                    showErrorMsg('Error, please try again later')
                })
        }
    },
    computed: {
        title() {
            return this.toyId ? 'Toy Edit' : 'Toy Add'
        },
        toyId() {
            return this.$route.params.toyId
        }
    },
    created() {
        if (this.toyId) {
            toyService.getById(this.toyId).then(toy => this.toyToEdit = toy)
        } else {
            this.toyToEdit = toyService.getEmptyToy()
        }
    }

}

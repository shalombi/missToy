import { toyService } from "../services/toy.service.js"

export default {
    template: `
    <section v-if="toy" class="toy-details app-main">
        <h2>{{toy.vendor}}</h2>
        <p>Speed: {{toy.speed.toLocaleString()}}</p>
        <hr />
        <h6>Details</h6>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic sint, ut praesentium consequatur a doloremque facere eligendi libero. Sit delectus iste dolores sed culpa in illo tempora quo officiis labore?</p>
        <router-link to="/toy-app">Back</router-link>
    </section>
    `,
    data() {
        return {
            toy: null,
        }
    },
    created() {
        this.loadToy()
    },
    computed: {

    },
    methods: {
        loadToy() {
            const id = this.$route.params.toyId
            toyService.getById(id)
                .then(toy => {
                    this.toy = toy
                })

        }
    },
    watch: {
        '$route.params.toyId'(id) {
            console.log('Changed to', id)
            this.loadToy()
        }
    }
}

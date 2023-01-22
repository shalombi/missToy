import toyPreview from './toy-preview.cmp.js'

export default {
    props: ['toys'],
    template: `
    <ul class="toy-list">
        <li v-for="toy in toys" :key="toy._id" class="toy-preview-container" >
            <toy-preview :toy="toy" />
            <div class="btns-container">
                <button @click="remove(toy._id)">X</button> | 
                <router-link :to="'/toy/'+toy._id">Details</router-link> | 
                <router-link :to="'/toy/edit/'+toy._id">Edit</router-link>
            </div>
        </li>
    </ul>
    `,
    methods: {
        remove(toyId) {
            this.$emit('remove', toyId)
        }
    },
    components: {
        toyPreview
    }
}

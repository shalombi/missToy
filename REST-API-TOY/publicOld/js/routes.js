import toyApp from './pages/toy-app.cmp.js'
// import todoApp from './pages/todo-app.cmp.js'
import homePage from './pages/home-page.cmp.js'
import toyEdit from './pages/toy-edit.cmp.js'
import toyDetails from './pages/toy-details.cmp.js'
import about from './pages/about.cmp.js'


const aboutTeam = {
    template: `
        <section>
            <h2>Our Team is Amazing!</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, porro odit minima vitae aspernatur, dolore explicabo eius ut ducimus numquam laborum repudiandae assumenda suscipit non perferendis obcaecati inventore vel est!</p>
        </section>
    `
}
const aboutServices = {
    template: `
        <section>
            <h2>Our Services are Awesome</h2>
            <p>Services are Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, porro odit minima vitae aspernatur, dolore explicabo eius ut ducimus numquam laborum repudiandae assumenda suscipit non perferendis obcaecati inventore vel est!</p>
            <h4>We are everywhere</h4>
            <input type="text" ref="loc" placeholder="Your location" />
        </section>
    `,
    mounted() {
        const el = this.$refs.loc
        el.focus()
        el.scrollIntoView()
    }
}


const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/toy-app',
        component: toyApp,
    },
    // {
    //     path: '/todo-app',
    //     component: todoApp,
    // },
    {
        path: '/about',
        component: about,
        children: [
            {
                path: 'team',
                component: aboutTeam
            },
            {
                path: 'services',
                component: aboutServices
            },
            {
                path: '/',
                component: aboutTeam
            },
        ]
    },
    {
        path: '/toy/edit/:toyId?',
        component: toyEdit
    },
    {
        path: '/toy/:toyId',
        component: toyDetails
    },
]

export const myRouter = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})
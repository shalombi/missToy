import { createApp } from 'vue'
import { httpService } from './services/http.service'

import App from './app.vue'
import router from './router'
import store from './store'
// import axios from 'axios'

import {
  focusDirective,
  rainbowDirective,
  customOnDirective,
  clickOutsideDirective,
} from './directives'
import './styles/styles.css'

const app = createApp(App)

const url = 'toy/'

// const express = require('express')
// const appEx = express()
// appEx.use(express.json())

// axios.get(url).then((res) => res.data).then((toys) => console.log(toys))

// httpService.get(url)
//   .then(toys => {
//     console.log('Toys', toys)
//   })

// httpService.post(url, {
//   "vendor": "best_best toy",
//   "speed": 5566,
// })

// httpService.delete(url, {
//   "vendor": "best_best toy",
//   "speed": 5566,
//   "_id": "0qEJb"
// })

// httpService.delete('toy/0qEJb')


// delete(endpoint, data)

// in Vue3 filters are deprecated and instead we need to use computed to get the same behavior.
// one way to make a computed globally is by app.config.globalProperties
app.config.globalProperties.$filters = {
  currencyUSD(amount) {
    // look implementation inside toy-preview.vue
    return '$' + amount
  },
}
console.log('app', app)

app.directive('focus', focusDirective)
app.directive('rainbow', rainbowDirective)
app.directive('custom-on', customOnDirective)
app.directive('click-outside', clickOutsideDirective)

app.use(router)
app.use(store)

app.mount('#app')

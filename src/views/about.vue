<template>
  <div class="py-4 flex flex-col gap-2">
    <fancy-text txt="Lets try this text!" :num="'4'" :testTxt="'hello'" />
    <input v-focus v-rainbow :value="query" @input="query = $event.target.value" class="form-input" type="text"
      placeholder="Search anything..." />
    <pre>
      {{ query }}
    </pre>
    <hr />

    <h1 class="v-model-title">v-model on components</h1>
    <div class="flex items-center justify-between gap-1">
      <div class="flex flex-col text-center gap-1">
        <color-picker v-model="color" />
        <div :style="{ backgroundColor: color }" class="fw-bold">Hello</div>
      </div>
      <div class="flex-flex-col text-center">
        <custom-dropdown v-model="section" />
        <p>Selected Section: {{ section }}</p>
      </div>
    </div>

    <toggle-btn v-model="isOn" />

    <hr />
    <h1>Custom-on directive</h1>
    <button v-custom-on:click.prevent="clicked" class="btn btn-primary">click me!</button>

    <h2>Dynamic function</h2>
    <input v-custom-on:change="onChange" type="text" class="form-input" />

    <h1>Click-outside directive</h1>
    <button @click="onToggleModal" class="btn btn-success">open modal</button>
    <about-modal v-if="isModalOpen" v-click-outside="onToggleModal" />

    <hr />
    <h1>Animation</h1>
    <button class="btn btn-secondary" @click="isShow = !isShow">Toggle Text</button>
    <Transition name="fade">
      <h1 v-if="isShow">hello</h1>
    </Transition>

    <h1>Animation between components</h1>
    <label> <input type="radio" v-model="activeComponent" value="cmp-a" /> A </label>
    <label> <input type="radio" v-model="activeComponent" value="cmp-b" /> B </label>
    <Transition name="fade" mode="out-in">
      <component :is="activeComponent" />
    </Transition>
  </div>
</template>

<script>
import aboutModal from '@/components/about-modal.vue'
import fancyText from '../components/fancy-text.vue'
import colorPicker from '../components/color-picker.vue'
import customDropdown from '../components/custom-dropdown.vue'
import toggleBtn from '../components/toggle-btn.vue'
import helloWorld from '../components/hello-world.vue'
import cmpA from '../components/cmp-a.vue'
import cmpB from '../components/cmp-b.vue'

export default {
  name: 'about',
  data() {
    return {
      query: 'Regular v-model',
      color: '',
      section: null,
      isOn: false,
      isShow: false,
      isModalOpen: false,
      activeComponent: 'cmp-a',
      fn: console.log,
      msg: 'console.log',
    }
  },
  methods: {
    clicked() {
      alert('I got clicked!')
    },
    onChange(ev) {
      console.log('Look ma! I use custom input')
      console.log('ev.target.value :>> ', ev.target.value)
    },
    onToggleModal() {
      this.isModalOpen = !this.isModalOpen
    },

  },
  components: {
    aboutModal,
    fancyText,
    colorPicker,
    customDropdown,
    toggleBtn,
    helloWorld,
    cmpA,
    cmpB,
  },
}
</script>

<style>
.v-model-title {
  /* use v-bind to bind css properties to cmp data */
  color: v-bind(color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

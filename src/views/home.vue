<template>
  <section class="py-4 flex flex-col gap-2">
    <h1>Home page</h1>
    <h1>Teleport Component</h1>
    <notification-handler msg="it worked!" type="success" />
    <custom-card>
      <template #header>
        <h1>This is my custom header title</h1>
      </template>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eum, velit
        doloribus perspiciatis odit autem numquam harum quaerat impedit reprehenderit excepturi
        amet? Consequatur non facere rem quos quasi autem impedit?
      </p>

      <template #footer>
        <h1>This is the footer</h1>
      </template>
    </custom-card>

    <custom-card>
      <template #header>
        <h1>This is another header</h1>
      </template>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eum, velit
        doloribus perspiciatis odit autem numquam harum quaerat impedit reprehenderit excepturi
        amet? Consequatur non facere rem quos quasi autem impedit?
      </p>
      <template #footer>
        <h1>coffeeRights &copy; 2022</h1>
      </template>
    </custom-card>

    <custom-button> Click me </custom-button>
  </section>
</template>

<script>
import customCard from '../components/custom-card.vue'
import notificationHandler from '../components/notification-handler.vue'
import customButton from '../components/custom-button.vue'

export default {
  name: 'home',
  components: {
    customCard,
    notificationHandler,
    customButton,
  },
}
</script>

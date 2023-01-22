
export default {
    template: `
   <header class="app-header">
       <div class="logo">
           <h1>Toys</h1>
       </div>
       <nav>
           <router-link active-class="active-link" to="/" exact>Home</router-link> |
           <router-link to="/toy-app">Toys App</router-link> |
           <router-link to="/todo-app">Todos App</router-link> |
           <router-link to="/about">About</router-link>

       </nav>
    </header>
    `,

}

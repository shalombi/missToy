export default {
    props: ['toy'],
    template: `
    <section class="toy-preview">
        <h3>⛐</h3>
        <h2>{{toy.vendor}}</h2>
        <p>Speed: {{toy.speed}}</p>
    </section>
    `,

}


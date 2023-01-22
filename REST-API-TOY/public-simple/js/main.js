
window.loadToys = loadToys


function loadToys() {
    fetch('/api/toy')
        .then(res => res.json())
        .then(toys => {
            console.log('Got Toys', toys)
            renderToys(toys)
        })
}

function renderToys(toys) {

    const strHTMLs = toys.map(toy => `<li>${toy.vendor}</li>`)

    const el = document.querySelector('.toy-list')
    el.innerHTML = strHTMLs.join('')

}
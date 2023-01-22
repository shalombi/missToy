import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    getById,
    query,
    remove,
    save,
    getEmptyToy
}

const STORAGE_KEY = 'toysDB'

function query(filterBy) {
    let toys = _loadFromStorage()
    if (!toys) {
        toys = _createToys()
        _saveToStorage(toys)
    }

    if (filterBy) {
        let { vendor, minSpeed, maxSpeed } = filterBy
        if (!minSpeed) minSpeed = 0;
        if (!maxSpeed) maxSpeed = Infinity
        toys = toys.filter(toy => (
            toy.vendor.includes(vendor) &&
            toy.speed >= minSpeed &&
            toy.speed <= maxSpeed
        ))
    }

    return Promise.resolve(toys)
}

function getById(toyId) {
    const toys = _loadFromStorage()
    const toy = toys.find(toy => toyId === toy._id)
    return Promise.resolve(toy)
}

function remove(toyId) {
    // return Promise.reject('Not now!!!')
    let toys = _loadFromStorage()
    toys = toys.filter(toy => toy._id !== toyId)
    _saveToStorage(toys)
    return Promise.resolve()
}

function save(toy) {
    if (toy._id) return _update(toy)
    else return _add(toy)
}

function _add({ vendor, speed }) {
    let toys = _loadFromStorage()
    const toy = _createToy(vendor, speed)
    toys = [toy, ...toys]
    _saveToStorage(toys)
    return Promise.resolve(toy)
}

function _update(toyToUpdate) {
    let toys = _loadFromStorage()
    toys = toys.map(toy => toy._id === toyToUpdate._id ? toyToUpdate : toy)
    _saveToStorage(toys)
    return Promise.resolve(toyToUpdate)
}

function _createToy(vendor, speed = utilService.getRandomIntInclusive(1, 200)) {
    const toy = getEmptyToy()
    toy._id = utilService.makeId()
    toy.desc = utilService.makeLorem()
}

function getEmptyToy() {
    return {
        _id: '',
        vendor: '',
        speed: 0,
        desc: ''
    }
}


function _createToys() {
    var vendors = ['audi', 'fiat', 'suzuki', 'honda', 'mazda']
    const toys = []
    for (let i = 0; i < 20; i++) {
        const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
        toys.push(_createToy(vendor))
    }
    return toys
}

function _saveToStorage(toys) {
    storageService.saveToStorage(STORAGE_KEY, toys)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}
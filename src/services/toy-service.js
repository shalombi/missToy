import { storageService } from './storage-service.js'
import { utilService } from './util-service.js'

const KEY = 'toys_db'
_createToys()

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
}

function query() {
  return storageService.query(KEY)
}

function getById(toyId) {
  return storageService.get(KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(KEY, toyId)
}

function save(toy) {
  if (toy.id) return storageService.put(KEY, toy)
  return storageService.post(KEY, toy)
}

function getEmptyToy() {
  return {
    vendor: '',
    speed: 0,
    price: 0,
  }
}



// const toy = {
//   "_id": "t101",
//   "name": "Talking Doll",
//   "price": 123,
//   "labels": ["Doll", "Battery Powered", "Baby"],
//   "createdAt": 1631031801011,
//   "inStock": true
//   }

// function getEmptyToy() {
//   return {
// vendor: '',
//     name: '',
//     inStock: true,
//     price: 0,
//     createdAt: Date.now(),
//     labels: ['Doll', 'Battery Powerd'],
//     reviews: [],
//   }
// }

function _createToys() {
  let toys = utilService.loadFromStorage(KEY)
  if (!toys || !toys.length) {
    toys = [
      { id: utilService.makeId(), vendor: 'Fiat', speed: 30, price: 980 },
      { id: utilService.makeId(), vendor: 'Honda', speed: 87, price: 500 },
      { id: utilService.makeId(), vendor: 'Toyota', speed: 54, price: 305 },
    ]
    utilService.saveToStorage(KEY, toys)
  }
  return toys
}

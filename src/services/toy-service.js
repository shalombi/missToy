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

// function getEmptyToy() {
//   return {
//     name: '',
//     price: 0,
//     price: 0,
//   }//
// }


function getEmptyToy() {
  return {
    name: '',
    inStock: true,
    price: 0,
    createdAt: Date.now(),
    // labels: ['All','Doll', 'Battery Powered'],
    labels: ['All'],
    reviews: [],
  }
}

function _createToys() {
  let toys = utilService.loadFromStorage(KEY)
  if (!toys || !toys.length) {
    toys = [
      { id: utilService.makeId(), name: 'Fiat', price: 30, price: 980 },
      { id: utilService.makeId(), name: 'Honda', price: 87, price: 500 },
      { id: utilService.makeId(), name: 'Toyota', price: 54, price: 305 },
    ]
    utilService.saveToStorage(KEY, toys)
  }
  return toys
}

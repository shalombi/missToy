export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
}

const BASE_URL = `/api/toy/`

function query(filterBy) {
  console.log('filterBy:', filterBy)
  return axios.get(BASE_URL, { params: filterBy }).then((res) => res.data)
}
function getById(toyId) {
  return axios.get(BASE_URL + toyId).then((res) => res.data)
}
function remove(toyId) {
  return axios.delete(BASE_URL + toyId).then((res) => res.data)
}

function save(toy) {
  if (toy._id) {
    return axios.put(BASE_URL + toy._id, toy).then((res) => res.data)
  } else {
    return axios.post(BASE_URL, toy).then((res) => res.data)
  }
  //   const url = BASE_URL + 'save'
  //   var queryParams = `?vendor=${toy.vendor}&speed=${toy.speed}`
  //   if (toy._id) queryParams += `&_id=${toy._id}`

  //   return axios.get(url + queryParams).then((res) => res.data)
}

function getEmptyToy() {
  return {
    _id: '',
    vendor: '',
    speed: 0,
    desc: '',
  }
}

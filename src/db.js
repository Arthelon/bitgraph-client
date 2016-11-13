import Pouch from 'pouchdb'
import { CLUSTER_ID, CLUSTER_DATA, CLUSTER_INDEX } from './constants'
import uuid from 'uuid'
import { setCluster } from './utils'

const pouch = new Pouch("BitGraph")

// pouch.destroy()
// pouch.put({
//     _id: "users",
//     users: [
//         {name: "Daniel", id: uuid.v4(), online: true},
//         {name: "Kenta", id: uuid.v4(), online: false},
//         {name: "Kris", id: uuid.v4(), online: false},
//         {name: "John", id: uuid.v4(), online: false},
//         {name: "David", id: uuid.v4(), online: false},
//         {name: "Akhan", id: uuid.v4(), online: false}
//     ]
// })
// pouch.get("users").then(users => {
//     users.users.forEach(user => {
//         pouch.put({
//             _id: user.id,
//             messages: []
//         })
//     })
// })
// setCluster(2, pouch)
export default pouch
import Pouch from 'pouchdb'
import { CLUSTER_ID, CLUSTER_DATA, CLUSTER_INDEX } from './constants'
import uuid from 'uuid'

const pouch = new Pouch("BitGraph")

// pouch.destroy()
// pouch.put({
//     _id: "users",
//     users: [
//         {name: "Daniel", id: uuid.v4(), online: true},
//         {name: "Kenta", id: uuid.v4(), online: false}
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
// pouch.put({
//     _id: CLUSTER_ID,
//     stocks: CLUSTER_DATA[CLUSTER_INDEX],
//     messages: []
// })
export default pouch
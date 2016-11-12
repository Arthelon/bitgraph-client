import Pouch from 'pouchdb'

const pouch = new Pouch("BitGraph")

// pouch.put({
//     _id: "users",
//     users: [
//         {name: "Daniel", id: uuid.v4(), online: true},
//         {name: "Kenta", id: uuid.v4(), online: false}
//     ]
// })
// pouch.put({
//     _id: "d0ff4ef0-c991-462b-b917-294cfe8019fd",
//     messages: []
// })
// pouch.put({
//     _id: "0eb973a3-45de-43e1-99bb-2d33c7685013",
//     messages: []
// })
export default pouch
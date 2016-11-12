import axios from 'axios'

export const csvJSON = csv => {
  const data = csv.split(",")
  const result = {
      dayLow: data[0],
      dayHigh: data[1],
      ask: data[2],
      bid: data[3],
      name: data[4]
  }
  return result; //JSON
}

export const getStockData = symbol => {
    return new Promise((resolve, reject) => {
        axios.get(`http://finance.yahoo.com/d/quotes.csv`, {
            params: {
                s: symbol.toUpperCase(),
                f: "ghabn"
            }
        }).then(res => {
            resolve(csvJSON(res.data))
        }, err => {
            reject(err)
        })
    })
}


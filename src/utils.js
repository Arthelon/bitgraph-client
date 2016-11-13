import axios from 'axios'
import dc from 'dc'
import crossfilter from 'crossfilter'
import d3 from 'd3'
import data from './ndx.csv'
import db from './db'
import { CLUSTER_ID, CLUSTER_DATA } from './constants'

let clusterRev = null
 
export const setCluster = (index, pouch) => {
     const database = pouch || db
     database.put({
        _id: CLUSTER_ID,
        stocks: CLUSTER_DATA[index],
        messages: [],
        _rev: clusterRev
    }).then(res => {
        console.log(res)
        clusterRev = res.rev
    })
}

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

const colorbrewer = {YlGn:{3:["#f7fcb9","#addd8e","#31a354"],4:["#ffffcc","#c2e699","#78c679","#238443"],5:["#ffffcc","#c2e699","#78c679","#31a354","#006837"],6:["#ffffcc","#d9f0a3","#addd8e","#78c679","#31a354","#006837"],7:["#ffffcc","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],8:["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"],9:["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"]},YlGnBu:{3:["#edf8b1","#7fcdbb","#2c7fb8"],4:["#ffffcc","#a1dab4","#41b6c4","#225ea8"],5:["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"],6:["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#2c7fb8","#253494"],7:["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"],8:["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#0c2c84"],9:["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]},GnBu:{3:["#e0f3db","#a8ddb5","#43a2ca"],4:["#f0f9e8","#bae4bc","#7bccc4","#2b8cbe"],5:["#f0f9e8","#bae4bc","#7bccc4","#43a2ca","#0868ac"],6:["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#43a2ca","#0868ac"],7:["#f0f9e8","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"],8:["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#08589e"],9:["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"]},BuGn:{3:["#e5f5f9","#99d8c9","#2ca25f"],4:["#edf8fb","#b2e2e2","#66c2a4","#238b45"],5:["#edf8fb","#b2e2e2","#66c2a4","#2ca25f","#006d2c"],6:["#edf8fb","#ccece6","#99d8c9","#66c2a4","#2ca25f","#006d2c"],7:["#edf8fb","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],8:["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],9:["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"]},PuBuGn:{3:["#ece2f0","#a6bddb","#1c9099"],4:["#f6eff7","#bdc9e1","#67a9cf","#02818a"],5:["#f6eff7","#bdc9e1","#67a9cf","#1c9099","#016c59"],6:["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#1c9099","#016c59"],7:["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"],8:["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"],9:["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"]},PuBu:{3:["#ece7f2","#a6bddb","#2b8cbe"],4:["#f1eef6","#bdc9e1","#74a9cf","#0570b0"],5:["#f1eef6","#bdc9e1","#74a9cf","#2b8cbe","#045a8d"],6:["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#2b8cbe","#045a8d"],7:["#f1eef6","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],8:["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],9:["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"]},BuPu:{3:["#e0ecf4","#9ebcda","#8856a7"],4:["#edf8fb","#b3cde3","#8c96c6","#88419d"],5:["#edf8fb","#b3cde3","#8c96c6","#8856a7","#810f7c"],6:["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8856a7","#810f7c"],7:["#edf8fb","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"],8:["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#6e016b"],9:["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"]},RdPu:{3:["#fde0dd","#fa9fb5","#c51b8a"],4:["#feebe2","#fbb4b9","#f768a1","#ae017e"],5:["#feebe2","#fbb4b9","#f768a1","#c51b8a","#7a0177"],6:["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#c51b8a","#7a0177"],7:["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"],8:["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177"],9:["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"]},PuRd:{3:["#e7e1ef","#c994c7","#dd1c77"],4:["#f1eef6","#d7b5d8","#df65b0","#ce1256"],5:["#f1eef6","#d7b5d8","#df65b0","#dd1c77","#980043"],6:["#f1eef6","#d4b9da","#c994c7","#df65b0","#dd1c77","#980043"],7:["#f1eef6","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"],8:["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#91003f"],9:["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"]},OrRd:{3:["#fee8c8","#fdbb84","#e34a33"],4:["#fef0d9","#fdcc8a","#fc8d59","#d7301f"],5:["#fef0d9","#fdcc8a","#fc8d59","#e34a33","#b30000"],6:["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#e34a33","#b30000"],7:["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],8:["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"],9:["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]},YlOrRd:{3:["#ffeda0","#feb24c","#f03b20"],4:["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"],5:["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026"],6:["#ffffb2","#fed976","#feb24c","#fd8d3c","#f03b20","#bd0026"],7:["#ffffb2","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],8:["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"],9:["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"]},YlOrBr:{3:["#fff7bc","#fec44f","#d95f0e"],4:["#ffffd4","#fed98e","#fe9929","#cc4c02"],5:["#ffffd4","#fed98e","#fe9929","#d95f0e","#993404"],6:["#ffffd4","#fee391","#fec44f","#fe9929","#d95f0e","#993404"],7:["#ffffd4","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],8:["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#8c2d04"],9:["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"]},Purples:{3:["#efedf5","#bcbddc","#756bb1"],4:["#f2f0f7","#cbc9e2","#9e9ac8","#6a51a3"],5:["#f2f0f7","#cbc9e2","#9e9ac8","#756bb1","#54278f"],6:["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#756bb1","#54278f"],7:["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"],8:["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#4a1486"],9:["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"]},Blues:{3:["#deebf7","#9ecae1","#3182bd"],4:["#eff3ff","#bdd7e7","#6baed6","#2171b5"],5:["#eff3ff","#bdd7e7","#6baed6","#3182bd","#08519c"],6:["#eff3ff","#c6dbef","#9ecae1","#6baed6","#3182bd","#08519c"],7:["#eff3ff","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],8:["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],9:["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"]},Greens:{3:["#e5f5e0","#a1d99b","#31a354"],4:["#edf8e9","#bae4b3","#74c476","#238b45"],5:["#edf8e9","#bae4b3","#74c476","#31a354","#006d2c"],6:["#edf8e9","#c7e9c0","#a1d99b","#74c476","#31a354","#006d2c"],7:["#edf8e9","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],8:["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],9:["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"]},Oranges:{3:["#fee6ce","#fdae6b","#e6550d"],4:["#feedde","#fdbe85","#fd8d3c","#d94701"],5:["#feedde","#fdbe85","#fd8d3c","#e6550d","#a63603"],6:["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#e6550d","#a63603"],7:["#feedde","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],8:["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"],9:["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"]},Reds:{3:["#fee0d2","#fc9272","#de2d26"],4:["#fee5d9","#fcae91","#fb6a4a","#cb181d"],5:["#fee5d9","#fcae91","#fb6a4a","#de2d26","#a50f15"],6:["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"],7:["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],8:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],9:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"]},Greys:{3:["#f0f0f0","#bdbdbd","#636363"],4:["#f7f7f7","#cccccc","#969696","#525252"],5:["#f7f7f7","#cccccc","#969696","#636363","#252525"],6:["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#636363","#252525"],7:["#f7f7f7","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"],8:["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"],9:["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"]},PuOr:{3:["#f1a340","#f7f7f7","#998ec3"],4:["#e66101","#fdb863","#b2abd2","#5e3c99"],5:["#e66101","#fdb863","#f7f7f7","#b2abd2","#5e3c99"],6:["#b35806","#f1a340","#fee0b6","#d8daeb","#998ec3","#542788"],7:["#b35806","#f1a340","#fee0b6","#f7f7f7","#d8daeb","#998ec3","#542788"],8:["#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788"],9:["#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788"],10:["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],11:["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"]},BrBG:{3:["#d8b365","#f5f5f5","#5ab4ac"],4:["#a6611a","#dfc27d","#80cdc1","#018571"],5:["#a6611a","#dfc27d","#f5f5f5","#80cdc1","#018571"],6:["#8c510a","#d8b365","#f6e8c3","#c7eae5","#5ab4ac","#01665e"],7:["#8c510a","#d8b365","#f6e8c3","#f5f5f5","#c7eae5","#5ab4ac","#01665e"],8:["#8c510a","#bf812d","#dfc27d","#f6e8c3","#c7eae5","#80cdc1","#35978f","#01665e"],9:["#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e"],10:["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"],11:["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"]},PRGn:{3:["#af8dc3","#f7f7f7","#7fbf7b"],4:["#7b3294","#c2a5cf","#a6dba0","#008837"],5:["#7b3294","#c2a5cf","#f7f7f7","#a6dba0","#008837"],6:["#762a83","#af8dc3","#e7d4e8","#d9f0d3","#7fbf7b","#1b7837"],7:["#762a83","#af8dc3","#e7d4e8","#f7f7f7","#d9f0d3","#7fbf7b","#1b7837"],8:["#762a83","#9970ab","#c2a5cf","#e7d4e8","#d9f0d3","#a6dba0","#5aae61","#1b7837"],9:["#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837"],10:["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"],11:["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"]},PiYG:{3:["#e9a3c9","#f7f7f7","#a1d76a"],4:["#d01c8b","#f1b6da","#b8e186","#4dac26"],5:["#d01c8b","#f1b6da","#f7f7f7","#b8e186","#4dac26"],6:["#c51b7d","#e9a3c9","#fde0ef","#e6f5d0","#a1d76a","#4d9221"],7:["#c51b7d","#e9a3c9","#fde0ef","#f7f7f7","#e6f5d0","#a1d76a","#4d9221"],8:["#c51b7d","#de77ae","#f1b6da","#fde0ef","#e6f5d0","#b8e186","#7fbc41","#4d9221"],9:["#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221"],10:["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"],11:["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"]},RdBu:{3:["#ef8a62","#f7f7f7","#67a9cf"],4:["#ca0020","#f4a582","#92c5de","#0571b0"],5:["#ca0020","#f4a582","#f7f7f7","#92c5de","#0571b0"],6:["#b2182b","#ef8a62","#fddbc7","#d1e5f0","#67a9cf","#2166ac"],7:["#b2182b","#ef8a62","#fddbc7","#f7f7f7","#d1e5f0","#67a9cf","#2166ac"],8:["#b2182b","#d6604d","#f4a582","#fddbc7","#d1e5f0","#92c5de","#4393c3","#2166ac"],9:["#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac"],10:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],11:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"]},RdGy:{3:["#ef8a62","#ffffff","#999999"],4:["#ca0020","#f4a582","#bababa","#404040"],5:["#ca0020","#f4a582","#ffffff","#bababa","#404040"],6:["#b2182b","#ef8a62","#fddbc7","#e0e0e0","#999999","#4d4d4d"],7:["#b2182b","#ef8a62","#fddbc7","#ffffff","#e0e0e0","#999999","#4d4d4d"],8:["#b2182b","#d6604d","#f4a582","#fddbc7","#e0e0e0","#bababa","#878787","#4d4d4d"],9:["#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d"],10:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"],11:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"]},RdYlBu:{3:["#fc8d59","#ffffbf","#91bfdb"],4:["#d7191c","#fdae61","#abd9e9","#2c7bb6"],5:["#d7191c","#fdae61","#ffffbf","#abd9e9","#2c7bb6"],6:["#d73027","#fc8d59","#fee090","#e0f3f8","#91bfdb","#4575b4"],7:["#d73027","#fc8d59","#fee090","#ffffbf","#e0f3f8","#91bfdb","#4575b4"],8:["#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4"],9:["#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4"],10:["#a50026","#d73027","#f46d43","#fdae61","#fee090","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],11:["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"]},Spectral:{3:["#fc8d59","#ffffbf","#99d594"],4:["#d7191c","#fdae61","#abdda4","#2b83ba"],5:["#d7191c","#fdae61","#ffffbf","#abdda4","#2b83ba"],6:["#d53e4f","#fc8d59","#fee08b","#e6f598","#99d594","#3288bd"],7:["#d53e4f","#fc8d59","#fee08b","#ffffbf","#e6f598","#99d594","#3288bd"],8:["#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd"],9:["#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd"],10:["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],11:["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]},RdYlGn:{3:["#fc8d59","#ffffbf","#91cf60"],4:["#d7191c","#fdae61","#a6d96a","#1a9641"],5:["#d7191c","#fdae61","#ffffbf","#a6d96a","#1a9641"],6:["#d73027","#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850"],7:["#d73027","#fc8d59","#fee08b","#ffffbf","#d9ef8b","#91cf60","#1a9850"],8:["#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850"],9:["#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850"],10:["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],11:["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]},Accent:{3:["#7fc97f","#beaed4","#fdc086"],4:["#7fc97f","#beaed4","#fdc086","#ffff99"],5:["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0"],6:["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f"],7:["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17"],8:["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"]},Dark2:{3:["#1b9e77","#d95f02","#7570b3"],4:["#1b9e77","#d95f02","#7570b3","#e7298a"],5:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e"],6:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02"],7:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d"],8:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]},Paired:{3:["#a6cee3","#1f78b4","#b2df8a"],4:["#a6cee3","#1f78b4","#b2df8a","#33a02c"],5:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99"],6:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c"],7:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f"],8:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00"],9:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6"],10:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"],11:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99"],12:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]},Pastel1:{3:["#fbb4ae","#b3cde3","#ccebc5"],4:["#fbb4ae","#b3cde3","#ccebc5","#decbe4"],5:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6"],6:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc"],7:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd"],8:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec"],9:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]},Pastel2:{3:["#b3e2cd","#fdcdac","#cbd5e8"],4:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4"],5:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9"],6:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae"],7:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc"],8:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"]},Set1:{3:["#e41a1c","#377eb8","#4daf4a"],4:["#e41a1c","#377eb8","#4daf4a","#984ea3"],5:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00"],6:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33"],7:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628"],8:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf"],9:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"]},Set2:{3:["#66c2a5","#fc8d62","#8da0cb"],4:["#66c2a5","#fc8d62","#8da0cb","#e78ac3"],5:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854"],6:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f"],7:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494"],8:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]},Set3:{3:["#8dd3c7","#ffffb3","#bebada"],4:["#8dd3c7","#ffffb3","#bebada","#fb8072"],5:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3"],6:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462"],7:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69"],8:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5"],9:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9"],10:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd"],11:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5"],12:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]}};

export const ManyGraphsSetup = () => {    
    var gainOrLossChart = dc.pieChart('#gain-loss-chart');
    var fluctuationChart = dc.barChart('#fluctuation-chart');
    var quarterChart = dc.pieChart('#quarter-chart');
    var dayOfWeekChart = dc.rowChart('#day-of-week-chart');
    var moveChart = dc.lineChart('#monthly-move-chart');
    var volumeChart = dc.barChart('#monthly-volume-chart');
    var yearlyBubbleChart = dc.bubbleChart('#yearly-bubble-chart');
    var nasdaqCount = dc.dataCount('.dc-data-count');
    var nasdaqTable = dc.dataTable('.dc-data-table');

    // ### Anchor Div for Charts
    /*
    // A div anchor that can be identified by id
        <div id='your-chart'></div>
    // Title or anything you want to add above the chart
        <div id='chart'><span>Days by Gain or Loss</span></div>
    // ##### .turnOnControls()

    // If a link with css class `reset` is present then the chart
    // will automatically hide/show it based on whether there is a filter
    // set on the chart (e.g. slice selection for pie chart and brush
    // selection for bar chart). Enable this with `chart.turnOnControls(true)`

    // dc.js >=2.1 uses `visibility: hidden` to hide/show controls without
    // disrupting the layout. To return the old `display: none` behavior,
    // set `chart.controlsUseVisibility(false)` and use that style instead.
        <div id='chart'>
        <a class='reset'
            href='javascript:myChart.filterAll();dc.redrawAll();'
            style='visibility: hidden;'>reset</a>
        </div>
    // dc.js will also automatically inject the current filter value into
    // any html element with its css class set to `filter`
        <div id='chart'>
            <span class='reset' style='visibility: hidden;'>
            Current filter: <span class='filter'></span>
            </span>
        </div>
    */

    //### Load your data

    //Data can be loaded through regular means with your
    //favorite javascript library
    //
    //```javascript
    //d3.csv('data.csv', function(data) {...});
    //d3.json('data.json', function(data) {...});
    //jQuery.getJson('data.json', function(data){...});
    //```
    // d3.csv('ndx.csv', function (data) {
        // console.log(data)
        // Since its a csv file we need to format the data a bit.
        var dateFormat = d3.time.format('%m/%d/%Y');
        var numberFormat = d3.format('.2f');

        data.forEach(function (d) {
            console.log(d)
            d.dd = dateFormat.parse(d.date);
            d.month = d3.time.month(d.dd); // pre-calculate month for better performance
            d.close = +d.close; // coerce to number
            d.open = +d.open;
        });

        //### Create Crossfilter Dimensions and Groups

        //See the [crossfilter API](https://github.com/square/crossfilter/wiki/API-Reference) for reference.
        var ndx = crossfilter(data);
        var all = ndx.groupAll();

        // Dimension by year
        var yearlyDimension = ndx.dimension(function (d) {
            return d3.time.year(d.dd).getFullYear();
        });
        // Maintain running tallies by year as filters are applied or removed
        var yearlyPerformanceGroup = yearlyDimension.group().reduce(
            /* callback for when data is added to the current filter results */
            function (p, v) {
                ++p.count;
                p.absGain += v.close - v.open;
                p.fluctuation += Math.abs(v.close - v.open);
                p.sumIndex += (v.open + v.close) / 2;
                p.avgIndex = p.sumIndex / p.count;
                p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
                p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
                return p;
            },
            /* callback for when data is removed from the current filter results */
            function (p, v) {
                --p.count;
                p.absGain -= v.close - v.open;
                p.fluctuation -= Math.abs(v.close - v.open);
                p.sumIndex -= (v.open + v.close) / 2;
                p.avgIndex = p.count ? p.sumIndex / p.count : 0;
                p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
                p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
                return p;
            },
            /* initialize p */
            function () {
                return {
                    count: 0,
                    absGain: 0,
                    fluctuation: 0,
                    fluctuationPercentage: 0,
                    sumIndex: 0,
                    avgIndex: 0,
                    percentageGain: 0
                };
            }
        );

        // Dimension by full date
        var dateDimension = ndx.dimension(function (d) {
            return d.dd;
        });

        // Dimension by month
        var moveMonths = ndx.dimension(function (d) {
            return d.month;
        });
        // Group by total movement within month
        var monthlyMoveGroup = moveMonths.group().reduceSum(function (d) {
            return Math.abs(d.close - d.open);
        });
        // Group by total volume within move, and scale down result
        var volumeByMonthGroup = moveMonths.group().reduceSum(function (d) {
            return d.volume / 500000;
        });
        var indexAvgByMonthGroup = moveMonths.group().reduce(
            function (p, v) {
                ++p.days;
                p.total += (v.open + v.close) / 2;
                p.avg = Math.round(p.total / p.days);
                return p;
            },
            function (p, v) {
                --p.days;
                p.total -= (v.open + v.close) / 2;
                p.avg = p.days ? Math.round(p.total / p.days) : 0;
                return p;
            },
            function () {
                return {days: 0, total: 0, avg: 0};
            }
        );

        // Create categorical dimension
        var gainOrLoss = ndx.dimension(function (d) {
            return d.open > d.close ? 'Loss' : 'Gain';
        });
        // Produce counts records in the dimension
        var gainOrLossGroup = gainOrLoss.group();

        // Determine a histogram of percent changes
        var fluctuation = ndx.dimension(function (d) {
            return Math.round((d.close - d.open) / d.open * 100);
        });
        var fluctuationGroup = fluctuation.group();

        // Summarize volume by quarter
        var quarter = ndx.dimension(function (d) {
            var month = d.dd.getMonth();
            if (month <= 2) {
                return 'Q1';
            } else if (month > 2 && month <= 5) {
                return 'Q2';
            } else if (month > 5 && month <= 8) {
                return 'Q3';
            } else {
                return 'Q4';
            }
        });
        var quarterGroup = quarter.group().reduceSum(function (d) {
            return d.volume;
        });

        // Counts per weekday
        var dayOfWeek = ndx.dimension(function (d) {
            var day = d.dd.getDay();
            var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return day + '.' + name[day];
        });
        var dayOfWeekGroup = dayOfWeek.group();

        //### Define Chart Attributes
        // Define chart attributes using fluent methods. See the
        // [dc.js API Reference](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md) for more information
        //

        //#### Bubble Chart

        //Create a bubble chart and use the given css selector as anchor. You can also specify
        //an optional chart group for this chart to be scoped within. When a chart belongs
        //to a specific group then any interaction with the chart will only trigger redraws
        //on charts within the same chart group.
        // <br>API: [Bubble Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#bubble-chart)

        yearlyBubbleChart /* dc.bubbleChart('#yearly-bubble-chart', 'chartGroup') */
            // (_optional_) define chart width, `default = 200`
            .width(990)
            // (_optional_) define chart height, `default = 200`
            .height(250)
            // (_optional_) define chart transition duration, `default = 750`
            .transitionDuration(1500)
            .margins({top: 10, right: 50, bottom: 30, left: 40})
            .dimension(yearlyDimension)
            //The bubble chart expects the groups are reduced to multiple values which are used
            //to generate x, y, and radius for each key (bubble) in the group
            .group(yearlyPerformanceGroup)
            // (_optional_) define color function or array for bubbles: [ColorBrewer](http://colorbrewer2.org/)
            .colors(colorbrewer.RdYlGn[9])
            //(optional) define color domain to match your data domain if you want to bind data or color
            .colorDomain([-10, 10])
        //##### Accessors

            //Accessor functions are applied to each value returned by the grouping

            // `.colorAccessor` - the returned value will be passed to the `.colors()` scale to determine a fill color
            .colorAccessor(function (d) {
                return d.value.absGain;
            })
            // `.keyAccessor` - the `X` value will be passed to the `.x()` scale to determine pixel location
            .keyAccessor(function (p) {
                return p.value.absGain;
            })
            // `.valueAccessor` - the `Y` value will be passed to the `.y()` scale to determine pixel location
            .valueAccessor(function (p) {
                return p.value.percentageGain;
            })
            // `.radiusValueAccessor` - the value will be passed to the `.r()` scale to determine radius size;
            //   by default this maps linearly to [0,100]
            .radiusValueAccessor(function (p) {
                return p.value.fluctuationPercentage;
            })
            .maxBubbleRelativeSize(0.3)
            .x(d3.scale.linear().domain([-5000, 5000]))
            .y(d3.scale.linear().domain([-100, 100]))
            .r(d3.scale.linear().domain([0, 4000]))
            //##### Elastic Scaling

            //`.elasticY` and `.elasticX` determine whether the chart should rescale each axis to fit the data.
            .elasticY(true)
            .elasticX(true)
            //`.yAxisPadding` and `.xAxisPadding` add padding to data above and below their max values in the same unit
            //domains as the Accessors.
            .yAxisPadding(100)
            .xAxisPadding(10)
            // (_optional_) render horizontal grid lines, `default=false`
            .renderHorizontalGridLines(true)
            // (_optional_) render vertical grid lines, `default=false`
            .renderVerticalGridLines(true)
            // (_optional_) render an axis label below the x axis
            .xAxisLabel('Index Gain')
            // (_optional_) render a vertical axis lable left of the y axis
            .yAxisLabel('Index Gain %')
            //##### Labels and  Titles

            //Labels are displayed on the chart for each bubble. Titles displayed on mouseover.
            // (_optional_) whether chart should render labels, `default = true`
            .renderLabel(true)
            .label(function (p) {
                return p.key;
            })
            // (_optional_) whether chart should render titles, `default = false`
            .renderTitle(true)
            .title(function (p) {
                return [
                    p.key,
                    'Index Gain: ' + numberFormat(p.value.absGain),
                    'Index Gain in Percentage: ' + numberFormat(p.value.percentageGain) + '%',
                    'Fluctuation / Index Ratio: ' + numberFormat(p.value.fluctuationPercentage) + '%'
                ].join('\n');
            })
            //#### Customize Axes

            // Set a custom tick format. Both `.yAxis()` and `.xAxis()` return an axis object,
            // so any additional method chaining applies to the axis, not the chart.
            .yAxis().tickFormat(function (v) {
                return v + '%';
            });

        // #### Pie/Donut Charts

        // Create a pie chart and use the given css selector as anchor. You can also specify
        // an optional chart group for this chart to be scoped within. When a chart belongs
        // to a specific group then any interaction with such chart will only trigger redraw
        // on other charts within the same chart group.
        // <br>API: [Pie Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#pie-chart)

        gainOrLossChart /* dc.pieChart('#gain-loss-chart', 'chartGroup') */
        // (_optional_) define chart width, `default = 200`
            .width(180)
        // (optional) define chart height, `default = 200`
            .height(180)
        // Define pie radius
            .radius(80)
        // Set dimension
            .dimension(gainOrLoss)
        // Set group
            .group(gainOrLossGroup)
        // (_optional_) by default pie chart will use `group.key` as its label but you can overwrite it with a closure.
            .label(function (d) {
                if (gainOrLossChart.hasFilter() && !gainOrLossChart.hasFilter(d.key)) {
                    return d.key + '(0%)';
                }
                var label = d.key;
                if (all.value()) {
                    label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
                }
                return label;
            })
        /*
            // (_optional_) whether chart should render labels, `default = true`
            .renderLabel(true)
            // (_optional_) if inner radius is used then a donut chart will be generated instead of pie chart
            .innerRadius(40)
            // (_optional_) define chart transition duration, `default = 350`
            .transitionDuration(500)
            // (_optional_) define color array for slices
            .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
            // (_optional_) define color domain to match your data domain if you want to bind data or color
            .colorDomain([-1750, 1644])
            // (_optional_) define color value accessor
            .colorAccessor(function(d, i){return d.value;})
            */;

        quarterChart /* dc.pieChart('#quarter-chart', 'chartGroup') */
            .width(180)
            .height(180)
            .radius(80)
            .innerRadius(30)
            .dimension(quarter)
            .group(quarterGroup);

        //#### Row Chart

        // Create a row chart and use the given css selector as anchor. You can also specify
        // an optional chart group for this chart to be scoped within. When a chart belongs
        // to a specific group then any interaction with such chart will only trigger redraw
        // on other charts within the same chart group.
        // <br>API: [Row Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#row-chart)
        dayOfWeekChart /* dc.rowChart('#day-of-week-chart', 'chartGroup') */
            .width(180)
            .height(180)
            .margins({top: 20, left: 10, right: 10, bottom: 20})
            .group(dayOfWeekGroup)
            .dimension(dayOfWeek)
            // Assign colors to each value in the x scale domain
            .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
            .label(function (d) {
                return d.key.split('.')[1];
            })
            // Title sets the row text
            .title(function (d) {
                return d.value;
            })
            .elasticX(true)
            .xAxis().ticks(4);

        //#### Bar Chart

        // Create a bar chart and use the given css selector as anchor. You can also specify
        // an optional chart group for this chart to be scoped within. When a chart belongs
        // to a specific group then any interaction with such chart will only trigger redraw
        // on other charts within the same chart group.
        // <br>API: [Bar Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#bar-chart)
        fluctuationChart /* dc.barChart('#volume-month-chart', 'chartGroup') */
            .width(420)
            .height(180)
            .margins({top: 10, right: 50, bottom: 30, left: 40})
            .dimension(fluctuation)
            .group(fluctuationGroup)
            .elasticY(true)
            // (_optional_) whether bar should be center to its x value. Not needed for ordinal chart, `default=false`
            .centerBar(true)
            // (_optional_) set gap between bars manually in px, `default=2`
            .gap(1)
            // (_optional_) set filter brush rounding
            .round(dc.round.floor)
            .alwaysUseRounding(true)
            .x(d3.scale.linear().domain([-25, 25]))
            .renderHorizontalGridLines(true)
            // Customize the filter displayed in the control span
            .filterPrinter(function (filters) {
                var filter = filters[0], s = '';
                s += numberFormat(filter[0]) + '% -> ' + numberFormat(filter[1]) + '%';
                return s;
            });

        // Customize axes
        fluctuationChart.xAxis().tickFormat(
            function (v) { return v + '%'; });
        fluctuationChart.yAxis().ticks(5);

        //#### Stacked Area Chart

        //Specify an area chart by using a line chart with `.renderArea(true)`.
        // <br>API: [Stack Mixin](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#stack-mixin),
        // [Line Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#line-chart)
        moveChart /* dc.lineChart('#monthly-move-chart', 'chartGroup') */
            .renderArea(true)
            .width(990)
            .height(200)
            .transitionDuration(1000)
            .margins({top: 30, right: 50, bottom: 25, left: 40})
            .dimension(moveMonths)
            .mouseZoomable(true)
        // Specify a "range chart" to link its brush extent with the zoom of the current "focus chart".
            .rangeChart(volumeChart)
            .x(d3.time.scale().domain([new Date(2006, 10, 13), new Date(2016, 10, 12)]))
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .elasticY(true)
            .renderHorizontalGridLines(true)
        //##### Legend

            // Position the legend relative to the chart origin and specify items' height and separation.
            .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
            .brushOn(false)
            // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
            // legend.
            // The `.valueAccessor` will be used for the base layer
            .group(indexAvgByMonthGroup, 'Monthly Index Average')
            .valueAccessor(function (d) {
                return d.value.avg;
            })
            // Stack additional layers with `.stack`. The first paramenter is a new group.
            // The second parameter is the series name. The third is a value accessor.
            .stack(monthlyMoveGroup, 'Monthly Index Move', function (d) {
                return d.value;
            })
            // Title can be called by any stack layer.
            .title(function (d) {
                var value = d.value.avg ? d.value.avg : d.value;
                if (isNaN(value)) {
                    value = 0;
                }
                return dateFormat(d.key) + '\n' + numberFormat(value);
            });

        //#### Range Chart

        // Since this bar chart is specified as "range chart" for the area chart, its brush extent
        // will always match the zoom of the area chart.
        volumeChart.width(990) /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
            .height(40)
            .margins({top: 0, right: 50, bottom: 20, left: 40})
            .dimension(moveMonths)
            .group(volumeByMonthGroup)
            .centerBar(true)
            .gap(1)
            .x(d3.time.scale().domain([new Date(2006, 10, 13), new Date(2016, 10, 12)]))
            .round(d3.time.month.round)
            .alwaysUseRounding(true)
            .xUnits(d3.time.months);

        //#### Data Count

        // Create a data count widget and use the given css selector as anchor. You can also specify
        // an optional chart group for this chart to be scoped within. When a chart belongs
        // to a specific group then any interaction with such chart will only trigger redraw
        // on other charts within the same chart group.
        // <br>API: [Data Count Widget](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#data-count-widget)
        //
        //```html
        //<div class='dc-data-count'>
        //  <span class='filter-count'></span>
        //  selected out of <span class='total-count'></span> records.
        //</div>
        //```

        nasdaqCount /* dc.dataCount('.dc-data-count', 'chartGroup'); */
            .dimension(ndx)
            .group(all)
            // (_optional_) `.html` sets different html when some records or all records are selected.
            // `.html` replaces everything in the anchor with the html given using the following function.
            // `%filter-count` and `%total-count` are replaced with the values obtained.
            .html({
                some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
                    ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
                all: 'All records selected. Please click on the graph to apply filters.'
            });

        //#### Data Table

        // Create a data table widget and use the given css selector as anchor. You can also specify
        // an optional chart group for this chart to be scoped within. When a chart belongs
        // to a specific group then any interaction with such chart will only trigger redraw
        // on other charts within the same chart group.
        // <br>API: [Data Table Widget](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#data-table-widget)
        //
        // You can statically define the headers like in
        //
        // ```html
        //    <!-- anchor div for data table -->
        //    <div id='data-table'>
        //       <!-- create a custom header -->
        //       <div class='header'>
        //           <span>Date</span>
        //           <span>Open</span>
        //           <span>Close</span>
        //           <span>Change</span>
        //           <span>Volume</span>
        //       </div>
        //       <!-- data rows will filled in here -->
        //    </div>
        // ```
        // or do it programmatically using `.columns()`.

        nasdaqTable /* dc.dataTable('.dc-data-table', 'chartGroup') */
            .dimension(dateDimension)
            // Data table does not use crossfilter group but rather a closure
            // as a grouping function
            .group(function (d) {
                var format = d3.format('02d');
                return d.dd.getFullYear() + '/' + format((d.dd.getMonth() + 1));
            })
            // (_optional_) max number of records to be shown, `default = 25`
            .size(10)
            // There are several ways to specify the columns; see the data-table documentation.
            // This code demonstrates generating the column header automatically based on the columns.
            .columns([
                // Use the `d.date` field; capitalized automatically
                'date',
                // Use `d.open`, `d.close`
                'open',
                'close',
                {
                    // Specify a custom format for column 'Change' by using a label with a function.
                    label: 'Change',
                    format: function (d) {
                        return numberFormat(d.close - d.open);
                    }
                },
                // Use `d.volume`
                'volume'
            ])

            // (_optional_) sort using the given field, `default = function(d){return d;}`
            .sortBy(function (d) {
                return d.dd;
            })
            // (_optional_) sort order, `default = d3.ascending`
            .order(d3.ascending)
            // (_optional_) custom renderlet to post-process chart using [D3](http://d3js.org)
            .on('renderlet', function (table) {
                table.selectAll('.dc-table-group').classed('info', true);
            });

        /*
        //#### Geo Choropleth Chart

        //Create a choropleth chart and use the given css selector as anchor. You can also specify
        //an optional chart group for this chart to be scoped within. When a chart belongs
        //to a specific group then any interaction with such chart will only trigger redraw
        //on other charts within the same chart group.
        // <br>API: [Geo Chroropleth Chart][choro]
        // [choro]: https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#geo-choropleth-chart
        dc.geoChoroplethChart('#us-chart')
            // (_optional_) define chart width, default 200
            .width(990)
            // (optional) define chart height, default 200
            .height(500)
            // (optional) define chart transition duration, default 1000
            .transitionDuration(1000)
            // set crossfilter dimension, dimension key should match the name retrieved in geojson layer
            .dimension(states)
            // set crossfilter group
            .group(stateRaisedSum)
            // (_optional_) define color function or array for bubbles
            .colors(['#ccc', '#E2F2FF','#C4E4FF','#9ED2FF','#81C5FF','#6BBAFF','#51AEFF','#36A2FF','#1E96FF','#0089FF',
                '#0061B5'])
            // (_optional_) define color domain to match your data domain if you want to bind data or color
            .colorDomain([-5, 200])
            // (_optional_) define color value accessor
            .colorAccessor(function(d, i){return d.value;})
            // Project the given geojson. You can call this function multiple times with different geojson feed to generate
            // multiple layers of geo paths.
            //
            // * 1st param - geojson data
            // * 2nd param - name of the layer which will be used to generate css class
            // * 3rd param - (_optional_) a function used to generate key for geo path, it should match the dimension key
            // in order for the coloring to work properly
            .overlayGeoJson(statesJson.features, 'state', function(d) {
                return d.properties.name;
            })
            // (_optional_) closure to generate title for path, `default = d.key + ': ' + d.value`
            .title(function(d) {
                return 'State: ' + d.key + '\nTotal Amount Raised: ' + numberFormat(d.value ? d.value : 0) + 'M';
            });

            //#### Bubble Overlay Chart

            // Create a overlay bubble chart and use the given css selector as anchor. You can also specify
            // an optional chart group for this chart to be scoped within. When a chart belongs
            // to a specific group then any interaction with the chart will only trigger redraw
            // on charts within the same chart group.
            // <br>API: [Bubble Overlay Chart][bubble]
            // [bubble]: https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#bubble-overlay-chart
            dc.bubbleOverlay('#bubble-overlay', 'chartGroup')
                // The bubble overlay chart does not generate its own svg element but rather reuses an existing
                // svg to generate its overlay layer
                .svg(d3.select('#bubble-overlay svg'))
                // (_optional_) define chart width, `default = 200`
                .width(990)
                // (_optional_) define chart height, `default = 200`
                .height(500)
                // (_optional_) define chart transition duration, `default = 1000`
                .transitionDuration(1000)
                // Set crossfilter dimension, dimension key should match the name retrieved in geo json layer
                .dimension(states)
                // Set crossfilter group
                .group(stateRaisedSum)
                // Closure used to retrieve x value from multi-value group
                .keyAccessor(function(p) {return p.value.absGain;})
                // Closure used to retrieve y value from multi-value group
                .valueAccessor(function(p) {return p.value.percentageGain;})
                // (_optional_) define color function or array for bubbles
                .colors(['#ccc', '#E2F2FF','#C4E4FF','#9ED2FF','#81C5FF','#6BBAFF','#51AEFF','#36A2FF','#1E96FF','#0089FF',
                    '#0061B5'])
                // (_optional_) define color domain to match your data domain if you want to bind data or color
                .colorDomain([-5, 200])
                // (_optional_) define color value accessor
                .colorAccessor(function(d, i){return d.value;})
                // Closure used to retrieve radius value from multi-value group
                .radiusValueAccessor(function(p) {return p.value.fluctuationPercentage;})
                // set radius scale
                .r(d3.scale.linear().domain([0, 3]))
                // (_optional_) whether chart should render labels, `default = true`
                .renderLabel(true)
                // (_optional_) closure to generate label per bubble, `default = group.key`
                .label(function(p) {return p.key.getFullYear();})
                // (_optional_) whether chart should render titles, `default = false`
                .renderTitle(true)
                // (_optional_) closure to generate title per bubble, `default = d.key + ': ' + d.value`
                .title(function(d) {
                    return 'Title: ' + d.key;
                })
                // add data point to its layer dimension key that matches point name: it will be used to
                // generate a bubble. Multiple data points can be added to the bubble overlay to generate
                // multiple bubbles.
                .point('California', 100, 120)
                .point('Colorado', 300, 120)
                // (_optional_) setting debug flag to true will generate a transparent layer on top of
                // bubble overlay which can be used to obtain relative `x`,`y` coordinate for specific
                // data point, `default = false`
                .debug(true);
        */

        //#### Rendering

        //simply call `.renderAll()` to render all charts on the page
        dc.renderAll();
        /*
        // Or you can render charts belonging to a specific chart group
        dc.renderAll('group');
        // Once rendered you can call `.redrawAll()` to update charts incrementally when the data
        // changes, without re-rendering everything
        dc.redrawAll();
        // Or you can choose to redraw only those charts associated with a specific chart group
        dc.redrawAll('group');
        */

    // });

    //#### Versions

    //Determine the current version of dc with `dc.version`
    d3.selectAll('#version').text(dc.version);

    // Determine latest stable version in the repo via Github API
    d3.json('https://api.github.com/repos/dc-js/dc.js/releases/latest', function (error, latestRelease) {
        /*jshint camelcase: false */
        d3.selectAll('#latest').text(latestRelease.tag_name); /* jscs:disable */
    });

}


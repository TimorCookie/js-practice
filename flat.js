let arr = [1,2,[3,4],[[5,6],7]]
let res = arr.flat(Infinity)

console.log('flat:', res)

const str = `[${JSON.stringify(arr).replace(/(\[|\])/g,'')}]`

let res1 = JSON.parse(str)
console.log('序列化后正则：', res1)


function myFlat(arr) {
  let result = []
  for (item of arr) {
    if(item instanceof Array) {
      result = result.concat(myFlat(item))
    } else {
      result.push(item)
    }
  }
  return result
}

let res2 = myFlat(arr)
console.log('递归版：', res2)


function reduceFlat(arr) {
  return arr.reduce((prev, cur)=> {
    return prev.concat(cur instanceof Array ? reduceFlat(cur) : cur)
  }, [])
}

const res3 = reduceFlat(arr)
console.log('reduce flat:', res3)


while(arr.some(Array.isArray)){
  arr = [].concat(...arr)
}

console.log('while:', arr)
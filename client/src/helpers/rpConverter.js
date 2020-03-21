 const rpConverter = (int) => {
     let arr = int.toString().split('')
     let arr_rvrsd = arr.reverse()
     let temp = []
     for (let i = 0; i < arr_rvrsd.length; i++) {
         if (i % 3 == 0 && i != 0) {
             temp.push('.')
         }
         temp.push(arr_rvrsd[i])
     }
     let result = temp.reverse().join('')
     return `Rp. ${result}`
 }
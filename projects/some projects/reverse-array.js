const array = [1, 5, 9, 21, 4, 6, 8, 19, 15, 21];
const array2 = [];
for(let i = array.length - 1; i > 0 ; i--){
    array2.push(array[i]);
}

console.log(array2);
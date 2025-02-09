let word = '';
for(let i = 0; i < 6; i++){
    for(let c = 0; c < 6; c++){
        word += '*';
    }
    word += '\n';
}
console.log(word);



let word2 = '';
for(let i = 0; i < 6; i++){
    for(let c = i; c < 6; c++){
        word2 += '*';
    }
    word2 += '\n';
}
console.log(word2);



// let word3 = '';
// for(let i = 0; i < 6; i++){
//     for(let c = 0; c < i+1; c++){
//         word3 += '*';
//     }
//     word3 += '\n';
// }
// console.log(word3);



let word4 = '';
for(let i = 0; i < 6; i++){
    for(let c = 0; c < i; c++){
        word4 += ' ';
    }
    for(let j = i; j < 6; j++){
        word4 += '*';
    }
    word4 += '\n';
}
console.log(word4);
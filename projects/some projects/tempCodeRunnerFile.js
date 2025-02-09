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
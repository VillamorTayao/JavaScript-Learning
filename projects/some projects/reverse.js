let name1 = 'DRACULA';
let reversedName = '';

for(let i = name1.length; i >= 0; i--){
    let eachLetter = name1.charAt(i);

    reversedName += eachLetter;
}

console.log(reversedName);
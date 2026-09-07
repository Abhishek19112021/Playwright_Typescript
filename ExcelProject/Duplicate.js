let str = "Programming";
let frequency =[];
for(let char of str){
frequency[char] = (frequency[char]||0)+1;
}
for (let char of str){
if(frequency[char]>1){
console.log(char);
}
}
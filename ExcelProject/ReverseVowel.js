let str = "I attend for a Interview";
let count =0;
let vowels = "";
for(let i =str.length-1;i>=0 ; i--){
    if("aeiouAEIOU".includes(str[i])){
    vowels =vowels+str[i];
    count++;
    }
}
console.log(vowels);
console.log(count);
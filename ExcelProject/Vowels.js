let str = "I attend for a Interview"
let vowels = "";
for(let i =0; i<str.length;i++){
    if("aeiouAEIOU".includes(str[i])){
        vowels =vowels+str[i];
    
    }
}
console.log(vowels);
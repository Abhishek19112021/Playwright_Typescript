const base = require('@playwright/test');
exports.customtest = base.test.extend(
{
testDataForOrder :    {
    username : "abcd@abhi.com",
    password : "Abc@987654321",
    productName:"ADIDAS ORIGINAL" 
    },
}
)





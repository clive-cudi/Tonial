function genCHID(){
    let tailNum = `${Math.floor(Math.random()*9999)}`;
    let Alphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let randomUpper = Alphabets[Math.floor(Math.random()*Alphabets.length)];
    let randomLower = Alphabets[Math.floor(Math.random()*Alphabets.length)].toLowerCase();
    let hexNum = `${Math.floor(Math.random()*999)}${randomUpper}${Math.floor(Math.random()*999)}${randomLower}`;
    let dbHex = `${Math.floor(Math.random()*999)}chat${randomUpper}${Math.floor(Math.random()*999)}${randomLower}`
    let CHID = `${randomLower}${randomUpper}${dbHex}tonial${hexNum.substr(0,3)}${tailNum}`
    return CHID;
}
console.log(genCHID())
module.exports = genCHID;
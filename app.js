// console.log ("Teste está funcionando")

console.log("Início");

setTimeout(()=>{
    console.log('Esperou 2 segundos...');
}, 2000);

console.log("Fim");

const somar = require('./somar');
console.log(somar(5,3));
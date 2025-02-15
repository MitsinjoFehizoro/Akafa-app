//ARRAY
let numbers1: number[] = [1, 2, 3, 4]
let numbers: Array<number> = [1, 2, 3]
let empty: Array<number> = []
numbers.push(4) //ajouter a la fin
numbers.unshift(5)//ajouter au debut
numbers.pop() //Retirer le dernier et le retourne
numbers.shift() //Retirer le premier et le rourne
numbers.map(n => console.log(n))
numbers.filter(n => n % 2 == 0)
numbers.reverse()

//SET : comme array mais pas de doublon
let set: Set<number> = new Set([1, 2, 3])
set.add(4)
set.delete(1)
set.has(3) // true si existe
set.size
set.clear()

//MAP : clé valeur
let map: Map<string, number> = new Map([["one", 1], ['two', 2]])
map.set('three', 3)
map.get('one')
map.has('three')
map.delete('one')
map.size
map.clear()

//Condition 
//if else
let age = 20
let statys = age >= 18 ? 'majeur' : 'mineur'

//shitch case
let fruit = "apple";

switch (fruit) {
  case "apple":
    console.log("C'est une pomme.");
    break;
  case "banana":
    console.log("C'est une banane.");
    break;
  default:
    console.log("Fruit inconnu.");
}

//typeof et instanceof
let number = 2
typeof number
if(typeof number == 'number'){}
//instanceof pour object

//String
let myName : string = "rakoto"
myName.length
myName.toUpperCase()
myName.toLowerCase()
myName.charAt(0) //retourne r
myName.includes('ra')  // true
myName.indexOf('ako') //1
myName.lastIndexOf('o') //5
myName.slice(0, 3) //rak
myName.substring(0, 3) //rak
myName.replace('a', 'b')
// myName.replaceAll('a', 'b')
myName.split('/') //retourne Array
let myLastName = "Mitsinjo"
myName.concat(', ', myLastName)
myName.startsWith('ra')
myName.endsWith('ra')
myName.repeat(4) //mamerimberina
myName.search('ra') //return index



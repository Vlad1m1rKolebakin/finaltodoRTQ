import { log } from "node:console"

const numbers = [1, 2, 3, 4]
const transformNumberToString = (num: number) => `Number: ${num}`
 
const result = mapArray(numbers, transformNumberToString)
console.log(result) // ["Number: 1", "Number: 2", "Number: 3", "Number: 4"]
 
// Пример 2: Преобразование строк в их длины
const words = ['hello', 'world', 'typescript']
const getLength = (word: string) => word.length
 
const lengthResults = mapArray(words, getLength)
console.log(lengthResults) // [5, 5, 10]
 
// Пример 3: Преобразование объектов в строки
type Person = { name: string; age: number }
const people: Person[] = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
]
const toDescription = (person: Person) => `${person.name} is ${person.age} years old`
 
const descriptions = mapArray(people, toDescription)
console.log(descriptions) 

function mapArray<T, U>(array: T[], callback: (item: T) => U): U[] {
  return array.map(callback)
}

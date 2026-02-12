import { Book } from "./entities/Book.js"; // Importe sua classe Book

export const seedBooks = [
  new Book(
    "1984", 
    "George Orwell",
    328, 
    "./public/covers/1984.jpg",
    32
  ),
  new Book(
    "A Revolução dos Bichos", 
    "George Orwell",
    152, 
    "./public/covers/revolucao.jpg",
    3
  ),
  new Book(
    "Eu, Robô",
    "Isaac Asimov", 
    320, 
    "./public/covers/eu-robo.jpg",
    7
  ),
  new Book(
    "O Alienista", 
    "Machado de Assis",
    160, 
    "./public/covers/alienista.jpg",
    11
  ),
  new Book(
    "Sherlock Holmes - Um Estudo em Vermelho", 
    "Arthur Conan Doyle",
    160, 
    "./public/covers/sherlock.jpg",
    16
  ),
  new Book(
    "Frankenstein", 
    "Mary Shelley",
    304, 
    "./public/covers/frankenstein.jpg",
    9
  ),
  new Book(
    "Fahrenheit 451", 
    "Ray Bradbury",
    216, 
    "./public/covers/fahrenheit.jpg",
    7
  )
];
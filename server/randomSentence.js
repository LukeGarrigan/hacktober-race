module.exports = () => {
  const sentences = [
    'int main(){printf ("Hi World\\n");return 0;}',
    'console.log("Hi World")',
    'print("Hi World")',
    'echo Hi world',
    'npm start',
    'git push',
    'git add -A',
    'const express = require(\'express\')',
    'const socket = require(\'socket.io\')' // add or change the list
  ]
  return sentences[Math.floor(Math.random() * sentences.length)]
}

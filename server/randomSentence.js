module.exports = () => {
  const sentences = [
    'int main(){printf ("Hi World\\n");return 0;}',
    'public static void main(String[] args) {}',
    'def __init__(self, width, height, color=\'black\'):',
    'SELECT * FROM programming_languages WHERE syntax=\'dodgy\'',
    'npm run my-funky-build-script',
    'find . -type f -name "*.php"',
    ':(){ :|: & };:',
    'const express = require(\'express\')',
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
};

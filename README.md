npm init -y
yarn add -D typescript 
tsc --init 
yarn add -D  @types/express
yarn add -D @types/cors
yarn add -D ts-node-dev
yarn add dotenv
yarn add  cors
yarn add express mongoose

for setup eslint  prettier (https://blog.logrocket.com/linting-typescript-eslint-prettier/)
 npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
yarn add -D prettier
yarn add -D eslint-config-prettier
{
    "semi": false, // Specify if you want to print semicolons at the end of statements
    "singleQuote": true, // If you want to use single quotes
    "arrowParens": "avoid", // Include parenthesis around a sole arrow function parameter
  }


  husky=> ami jody kono kichu fixed korte vhule jai bhe bhul code or code format bhul vabey push kore dey tkn husky push korar agey eslint and prettier check kore push hbe

  ami jokon push korbo tkn husky dayotho hbe eslint and format check kora thn push kora and error asle push hbe na , push cancel hoiye jabe 
  yarn add husky --dev
  yarn husky install
  yarn husky add .husky/pre-commit "npm test"
  yarn dlx husky-init --yarn2 && yarn
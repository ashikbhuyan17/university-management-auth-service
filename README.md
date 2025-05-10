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


  husky=> ami jody kono kichu fixed korte vhule jai bhe bhul code or code format bhul vabey push kore dey tokon husky push korar agey eslint and prettier check kore and sob tik takle push kore 

  ami jokon push korbo tkn husky dayotho hbe eslint and format check kora thn push kora and error asle push hbe na , push cancel hoiye jabe 
  yarn add husky --dev
  yarn husky install
  yarn husky add .husky/pre-commit "npm test"
  yarn dlx husky-init --yarn2 && yarn


lint-staged => shudhu stagging file gulu ke lint korbe 
yarn add -D lint-staged


http://localhost:5000/api/v1/users/create-user
{
    "user":{
        "role":"admin"
    }
}
http://localhost:5000/api/v1/users/list


📝 Logger কি ও কেন দরকার (Express JS)
Logger হলো এমন একটি টুল যা অ্যাপের ভেতরে কী কী হচ্ছে (যেমন: রিকোয়েস্ট, রেসপন্স, এরর) — সেগুলো ট্র্যাক ও রেকর্ড করে।

কেন দরকার?
🐞 বাগ খোঁজার জন্য (Debug)

📊 অ্যাপ মনিটর করার জন্য – কোন API কতবার কল হচ্ছে, ইউজার কী করছে — এসব দেখা যায়।

📁 প্রোডাকশন লগ রাখার জন্য – অ্যাপ লাইভ হলে কোন সমস্যা হচ্ছে, সেটা জানার একমাত্র উপায় হলো লগ।

সাধারণ Logger Tools:
morgan → HTTP request log করার জন্য

winston → কাস্টম লগ ও ফাইল লগ করার জন্য



<!-- CLI to generate module boilerplate
yarn run generate:module students
 -->
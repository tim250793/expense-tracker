# Expense Tracker 家庭記帳本

線上的個人化記帳本，依支出分類清楚羅列。


## 功能
- 可瀏覽個人支出紀錄
- 可瀏覽個人支出總金額
- 可依支出類別瀏覽紀錄
- 可依支出類別瀏覽總金額
- 新增、修改、刪除支出紀錄
- 可新增帳戶
- 以信箱登入後閱覽個人化帳本


## 頁面預覽
![Home page](./public/images/img_expense-tracker.jpg)


## 使用說明
1. 將專案clone至本地
   
   `git clone https://github.com/weizi0328/ac_expense-tracker.git`
2. 至本地安裝資料夾，安裝npm
   
   `npm install`
   
3. 參考 ".env.example" 以設置環境變數

4. 建立種子資料
   
   `npm run seed`

5. 啟動程式
   
   `npm run start`

6. 看到以下訊息，打開瀏覽器進入頁面

   `Express is running on http://localhost:3000`
   `mongodb connected!`



## 預設種子資料：
- 預設類別5組
- email: `root@example.com`
- password: `12345678`


## 開發工具
- "bcryptjs": "^2.4.3",
- "body-parser": "^1.20.0",
- "connect-flash": "^0.1.1",
- "dotenv": "^16.0.3",
- "express": "^4.18.1",
- "express-handlebars": "^6.0.6",
- "express-session": "^1.17.3",
- "method-override": "^3.0.0",
- "mongoose": "^6.6.3",
- "nodemon": "^2.0.20",
- "passport": "^0.6.0",
- "passport-facebook": "^3.0.0",
- "passport-local": "^1.0.0"
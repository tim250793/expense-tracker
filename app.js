const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


// handlebars 樣板引擎
const exphbs = require('express-handlebars')
// mongoose 連線狀態
const db = mongoose.connection
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const http = require('http');
const cors = require('cors');  
const cookieParser = require('cookie-parser'); // Thêm cookie-parser để xử lý cookie

const db = require('./configs/db');
db.connect();

const app = express();
const httpServer = http.createServer(app);

const port = process.env.PORT || 3000;

const route = require('./api/routes'); 


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser()); 

// Cấu hình CORS
app.use(cors({
  origin: process.env.FRONTEND_URL, // Địa chỉ của ứng dụng font-end
  credentials: true // Cho phép gửi cookie
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.use(morgan('combined'));

route(app);


// Xử lý lỗi 404 - Route không tồn tại
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route không tồn tại',
    error: 'Not Found'
  });
});

// Middleware xử lý lỗi tổng quát
app.use((err, req, res, next) => {
  console.error(err.stack); // Log lỗi ra console
  res.status(err.status || 500).json({
    message: err.message || 'Đã xảy ra lỗi trên server',
    error: err.stack
  });
});


httpServer.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
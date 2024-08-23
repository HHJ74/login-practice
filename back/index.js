const express = require('express');
const cors = require('cors');
const PORT = 8080;
const cookieParser = require('cookie-parser');

const app = express(); // express 모듈을 사용하기 위해 app 변수에 할당

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(require('./routes/postRoutes'));
app.listen(PORT, () => console.log(`Server is runnig on ${PORT}`)); // 서버 실행 시 메세지 출력


// {
//   "name": "gpgus0704",
//   "email": "gpgus0704@gmail.com",
//   "password":"1234"
// }



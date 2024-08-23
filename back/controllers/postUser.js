const database = require('../database/database');
const bcrypt = require('bcrypt');
const salt = 10; 
const jwt =require('jsonwebtoken')

exports.postUser = async(req, res) => {
    try {
    const hash = await bycrpt.hash(req.body.password, salt);
    const values = [req.body.name, req.body.email, hash]; 

    await database.query(
        'INSERT INTO users_tut (name, email, password) values ($1, $2, $3)',
        values
      );
  
      return res.status(201).json({ message: 'Account Created Successfully' })
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
  try {
    const { rows } = await database.query(
      'SELECT * FROM users_tut WHERE email = $1',
      [req.body.email]
    );


    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }


    const compare = await bcrypt.compare(req.body.password, rows[0].password);


    if (!compare) {
      return res.status(401).json({ message: 'Password not matched' });
    }


    const name = rows[0].name;
    const email = rows[0].email;
    const token = jwt.sign({ name, email }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });


    res.cookie('token', token, {
      httpOnly: true, // 클라이언트에서 쿠키를 자바스크립트로 접근하지 못하게 함
      sameSite: 'None', // CORS 상황에서 쿠키가 전달될 수 있도록 설정
    });


    return res.status(201).json({ token: token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

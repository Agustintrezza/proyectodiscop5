const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX      
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
        } else {
        console.log(decode)
          req.user = decode;
          next();
        }
      });

    } else {
      res.status(500).send({ message: 'No hay token' });
    }
  };

  module.exports =  isAuth
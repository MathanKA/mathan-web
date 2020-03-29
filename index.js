const express = require('express');
const port = process.env.PORT || 1337;
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',(req,res) => {
  res.sendFile(path.join(__dirname +  '/public/index.html'));
});

router.get('/blog',(req,res) => {
  res.sendFile(path.join(__dirname + '/public/blog.html'));
});

app.use(express.static(__dirname + '/public'));
app.use('/', router);

app.listen(port);

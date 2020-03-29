const express = require('express');
const port = process.env.PORT || 1337;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.rendex('index')
});

app.get('/blog', (req, res) => {
  res.render('blog')
})

app.listen(port);

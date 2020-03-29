const express = require('express');
const port = process.env.PORT || 1337;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
});

app.get('/blog', (req, res) => {
  res.write('Redirecting to blog. Please wait...'); 
})

app.listen(port);

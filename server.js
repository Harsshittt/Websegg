const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));
app.use(fileUpload());

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.get('/images', (req, res) => {
  res.sendFile(path.join(publicPath, 'images.html'));
});

app.get('/editor', (req, res) => {
  res.sendFile(path.join(publicPath, 'editor.html'));
});

app.get('/editor.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(publicPath, 'editor.js'));
});


app.post('/upload', (req, res) => {
  let file = req.files.image;
  let date = new Date();
  let imageName = date.getDate() + date.getTime() + file.name;
  let imagePath = 'public/upload/' + imageName;

  file.mv(imagePath, (err) => {
    if (err) {
      throw err;
    } else {
      res.json(`upload/${imageName}`);
    }
  });
});


app.get('/:blog', (req, res) => {
    res.sendFile(path.join(publicPath, "blog.html"));
 });

app.use((req, res) => {
  res.json("404");
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

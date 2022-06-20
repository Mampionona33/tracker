const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server Start on port ${port}`);
});

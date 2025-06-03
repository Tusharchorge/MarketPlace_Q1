const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./controller/AddItems'));
app.use('/api', require('./controller/AllMarketPlaceItems'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

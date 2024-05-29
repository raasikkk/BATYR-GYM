const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/assets/index.html'));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, '/assets/dashboard.html'));
});

////////////////////////////Step 2 Connection with Postgres////////////////////////////////////////////
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'registration_db',
  password: 'Patricktop1',
  port: 5432,
});

// Handle registration
app.post("/register", (req, res) => {
  const { fname, fsurname, flogin, fpassword } = req.body;

  pool.query('INSERT INTO batyr_gym_registration VALUES ($1, $2, $3, $4)', [fname, fsurname, flogin, fpassword], (err, result) => {
    if (err) {
      console.error('Error inserting data into database', err.stack);
      res.status(500).send('Error inserting data into database');
    } else {
      console.log('Data inserted successfully');
      res.status(200).send('Done');
    }
  });
});


// Handle login
app.post("/login", (req, res) => {
  const { login, password } = req.body;

  pool.query('SELECT * FROM batyr_gym_registration WHERE login = $1 AND password = $2', [login, password], (err, result) => {
    if (err) {
      console.error('Error querying data from database', err.stack);
      res.status(500).send('Error querying data from database');
    } else if (result.rows.length > 0) {
      const userName = result.rows[0].name;
      const userId = result.rows[0].id;
      res.status(200).send(`
      <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting...</title>
    <style>
      .userName {
        color: #fff;
        font-size: 1.5rem;
        font-weight: 700;
      }
    </style>
   </head>
      <script>
        sessionStorage.setItem('userName', '${userName}');
        sessionStorage.setItem('userId', '${userId}');
        window.location.href = '/dashboard';
      </script>`);
    } else {
      res.status(401).send('Invalid login or password');
    }
  });
});


// email

app.post("/email", (req, res) => {
  const { email_address } = req.body;

  pool.query('INSERT INTO batyr_gym_email VALUES ($1)', [email_address], (err, result) => {
    if (err) {
      console.error('Error inserting data into database', err.stack);
      res.status(500).send('Error inserting data into database');
    } else {
      console.log('Data inserted successfully');
      res.status(200).send('Done');
    }
  });
});

// Handle purchase
app.post("/purchase", (req, res) => {
  const { name, class_name, coach_name, price } = req.body;
  const format = 'online';

  pool.query('INSERT INTO batyr_gym_subscriptions (name, class_name, coach_name, price, format) VALUES ($1, $2, $3, $4, $5) RETURNING id', [name, class_name, coach_name, price, format], (err, result) => {
    if (err) {
      console.error('Error inserting data into database', err.stack);
      res.status(500).send('Error inserting data into database');
    } else {
      const purchaseId = result.rows[0].id;
      console.log('Purchase recorded successfully');
      res.status(200).send(`Purchase recorded with ID: ${purchaseId}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

////////////////////////////Step 3  Inserting the values////////////////////////////////////////////
// app.post("/", (req, res) => {
//   const { f_name, mail, phone } = req.body;

//   pool.query('INSERT INTO Register VALUES ($1, $2, $3)', [f_name, mail, phone], (err, result) => {
//     if (err) {
//       console.error('Error inserting data into database', err.stack);
//       res.status(500).send('Error inserting data into database');
//     } else {
//       console.log('Data inserted successfully');
//       res.status(200).send('Data inserted successfully');
//     }
//   });
// });
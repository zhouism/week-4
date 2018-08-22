const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const text = 'SELECT * FROM famous_people WHERE (first_name = $1) OR (last_name = $1)';
const lookUp = [process.argv[2]];

//const birthday = ${result.birthdate}

let num = 1;

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching...');

  client.query(text, lookUp, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name of '${lookUp}':`);
    for (result of result.rows) {
        console.log(
        `- ${num++}: ${result.first_name} ${result.last_name}, born '${result.birthdate.toISOString().split('T')[0]}'`);
    }; 
    client.end();
  });
});



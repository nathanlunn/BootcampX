const { Pool } = require('pg');
const args = process.argv.slice(2);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id, students.name AS student_name, cohorts.name AS cohort_name
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${args[0]}%'
LIMIT ${args[1] || 5};
`)
.then(res => {    
  for (let obj of res.rows) {
    console.log(`${obj.student_name} has an id of ${obj.id} and was in the ${obj.cohort_name} cohort`);
  }
})
.catch(err => console.error('query error', err.stack));
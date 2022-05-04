const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT(teachers.name) AS teacher, cohorts.name AS cohort
FROM assistance_requests
JOIN teachers ON assistance_requests.teacher_id = teachers.id
JOIN students ON assistance_requests.student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`;

const values = [`%${process.argv[2]}%`];

pool.query(queryString, values).then(res => {
  res.rows.forEach(row => console.log(`${row.cohort}: ${row.teacher}`));
}).catch(err => {
  console.log(err);
});
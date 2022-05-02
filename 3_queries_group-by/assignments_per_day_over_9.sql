SELECT day, COUNT(*) AS num_of_assignments
FROM assignments
GROUP BY day
HAVING COUNT(*) > 9
ORDER BY day;

SELECT day, COUNT(*) AS num_of_assignments
FROM assignments
GROUP BY day
ORDER BY day;
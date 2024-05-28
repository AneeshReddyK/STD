// studentRoutes.js

const express = require('express');
const router = express.Router();
const connection = require('./database');
const db = require('./database');



router.post('/studentform', (req, res) => {
    const { stdname, hallticketNo, english, java, python, cpp } = req.body;
    console.log(req.body);
    if (!stdname || !hallticketNo || isNaN(hallticketNo) || isNaN(english) || isNaN(java) || isNaN(python) || isNaN(cpp)) {
        return res.status(400).send('Invalid data format.');
    }

    const checkHallticketQuery = 'SELECT hallticketNo FROM students WHERE hallticketNo = ?';
    connection.query(checkHallticketQuery, [hallticketNo], (err, results) => {
        if (err) {
            console.error('Error checking hallticketNo:', err);
            connection.rollback(() => {
                //   connection.release();
                res.status(500).send('Database error.');
            });
            return;
        }

        if (results.length > 0) {
            connection.rollback(() => {
                //connection.release();
                res.status(400).send('Hallticket number already exists. Please use a different hallticket number.');
            });
            return;
        }

        // connection.getConnection((err, connection) => {
        //     if (err) {
        //         console.error('Error getting connection from pool:', err);
        //         return res.status(500).send('Database error.');
        //     }

        // connection.beginTransaction((err) => {
        //     if (err) {
        //         console.error('Error beginning transaction:', err);
        //         connection.release();
        //         return res.status(500).send('Database error.');
        //     }

        const insertStudentQuery = `
                INSERT INTO students (hallticketNo, stdname)
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE stdname = VALUES(stdname);
            `;

        const insertSubjectsQuery = `
                INSERT INTO subjects (hallticketNo, english, java, python, cpp)
                VALUES (?, ?, ?, ?, ?);
            `;

        const updateStudentMarksQuery = `
    UPDATE students
    SET 
        totalmarks = (
            SELECT SUM(english + java + python + cpp)
            FROM subjects
            WHERE subjects.hallticketNo = students.hallticketNo
        ),
        result = (
            CASE
                WHEN (
                    SELECT SUM(english + java + python + cpp)
                    FROM subjects
                    WHERE subjects.hallticketNo = students.hallticketNo
                ) > 200 THEN 'Pass'
                ELSE 'Fail'
            END
        )
    WHERE hallticketNo = ?;
`;

        connection.query(insertStudentQuery, [hallticketNo, stdname], (err) => {
            if (err) {
                console.error('Error inserting into students:', err);
                connection.rollback(() => {
                    // connection.release();
                    res.status(500).send('Error inserting into students.');
                });
                return;
            }

            connection.query(insertSubjectsQuery, [hallticketNo, english, java, python, cpp], (err) => {
                if (err) {
                    console.error('Error inserting into subjects:', err);
                    connection.rollback(() => {
                        // connection.release();
                        res.status(500).send('Error inserting into subjects.');
                    });
                    return;
                }

                connection.query(updateStudentMarksQuery, [hallticketNo], (err) => {
                    if (err) {
                        console.error('Error updating student marks:', err);
                        connection.rollback(() => {
                            // connection.release();
                            res.status(500).send('Error updating student marks.');
                        });
                        return;
                    }

                    connection.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                            connection.rollback(() => {
                                // connection.release();
                                res.status(500).send('Error committing transaction.');
                            });
                            return;
                        }

                        // connection.release();
                        res.status(200).send('Student data inserted successfully');
                    });
                });
            });
        });
        // });
        // });
    });


    //The below code is for the Resultspage//

    router.get('/ResultsPage/:hallticketno', (req, res) => {
        const hallticketno = req.params.hallticketno;

        let sql = `
    SELECT
        s.hallticketNo,
        s.stdname,
        sc.english,
        sc.java,
        sc.python,
        sc.cpp,
        (sc.english + sc.java + sc.python + sc.cpp) AS totalMarks,
        s.result
    FROM
        students s
    JOIN
        subjects sc ON s.hallticketNo = sc.hallticketNo
    WHERE
        s.hallticketNo = ?;
    `;

        connection.query(sql, [hallticketno], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length === 0) {
                return res.status(404).send('Hall ticket number not found');
            }
            res.json(results[0]);
        });
    });

});

module.exports = router;

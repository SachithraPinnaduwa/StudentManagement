import { insertStudent, getAllStudents, deleteStudent, updateStudent } from '../studentFunctions.js'; 
import { Router } from 'express';
const studentRouter = Router();

studentRouter.get('/', async (req, res) => {
    const userId = req.query.userId;
    try {
        if (!userId) {
            res.status(400).send("Missing user ID");
            return;
        }
        const students = await getAllStudents(userId);
        res.json(students);
    } catch (err) {
        res.status(500).send('Failed to retrieve students');
    }
});

studentRouter.post('/', async (req, res) => {
    const { userId, name, age, status } = req.body;
    if (!userId || !name || !age || !status) {
        res.status(400).send('Missing required fields');
        return;
    }
    try {
        await insertStudent(userId, name, age, status);
        res.status(201).send('Student added');
    } catch (err) {
        res.status(500).send(`Error adding student: ${err.message}`);
    }
});

studentRouter.put('/:id', async (req, res) => {
    const { name, age, status } = req.body;
    const { id } = req.params;
    if (!name || !age || !status) {
        res.status(400).send('Missing required fields');
        return;
    }
    try {
        const updatedFields = { name, age, status };
        const updatedStudent = await updateStudent(id, updatedFields);
        if (!updatedStudent) {
            res.status(404).send('Student not found');
            return;
        }
        res.status(200).send(updatedStudent);
    } catch (err) {
        res.status(500).send(`Error updating student: ${err.message}`);
    }
});

studentRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send("Missing student ID");
        return;
    }
    try {
        const result = await deleteStudent(id);
        if (result.deletedCount === 0) {
            res.status(404).send('No student found with that ID');
        } else {
            res.status(200).send({ message: 'Student deleted' });
        }
    } catch (err) {
        res.status(500).send(`Error deleting student: ${err.message}`);
    }
});

export default studentRouter;

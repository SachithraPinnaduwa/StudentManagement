import { insertStudent, getAllStudents, deleteStudent, updateStudentStatus } from '../studentFunctions.js'; 
import { Router } from 'express';
const studentRouter = Router();

studentRouter.get('/', async (req, res) => {
    try {
        const students = await getAllStudents();
        res.json(students);
    } catch (err) {
        res.status(500).send('Failed to retrieve students');
    }
});

studentRouter.post('/', async (req, res) => {
    const { name, age, status } =req.body;
    if (!name || !age || typeof status === 'undefined'){
        res.status(400).send('Missing required fields');
        return;
    }
    try {
        await insertStudent(name, age, status);
        res.status(201).send('Student added');
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

studentRouter.put('/:id', async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    if (typeof status === 'undefined') {
        res.status(400).send('Missing status field');
        return;
    }
    try {
        const updatedStudent = await updateStudentStatus(id, status);
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

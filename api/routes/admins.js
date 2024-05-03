import { Router } from "express";
import { getAllAdmins, addAdmin, deleteAdmin, getAdmin } from '../adminFunctions.js'; 
const adminRouter = Router();

// Admins
adminRouter.get('/', async (req, res) => { 
  try {
    const admins = await getAllAdmins(); 
    res.json(admins); 
  } catch (err) {
    res.status(500).send('Failed to retrieve admins'); 
  }
});

adminRouter.post('/', async (req, res) => { 
  const { name, password } = req.body; 
  if (!name || !password) {
    res.status(400).send('Missing name or password'); 
    return;
  }
  try {
    const newAdmin = await addAdmin(name, password); 
    res.status(201).json(newAdmin); 
  } catch (err) {
    res.status(500).send(`Error creating admin: ${err.message}`); 
  }
});

adminRouter.post('/check', async (req, res) => { 
  const { name, password } = req.body; 
  if (!name || !password) {
    res.status(400).send('Missing name or password'); 
    return;
  }
  try {
    const checkAdmin = await getAdmin(name, password); 
    res.status(200).json(checkAdmin); 
  } catch (err) {
    res.status(500).send(`Error checking admin: ${err.message}`); 
  }
});

adminRouter.delete('/:name', async (req, res) => { 
  const { name } = req.params; 
  try {
    const result = await deleteAdmin(name); 
    if (result.deletedCount === 0) {
      res.status(404).json('No admin found with that name.'); 
    } else {
      res.status(200).json({ message: 'Admin deleted', ...result }); 
    }
  } catch (err) {
    res.status(500).json(`Error deleting admin: ${err.message}`); 
  }
});

export default adminRouter;

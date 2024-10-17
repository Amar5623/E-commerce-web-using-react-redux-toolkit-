// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getAllUsers, deleteUser, updateUserRole, addUserByAdmin } = require('../controllers/userController');
const { authMiddleware, adminMiddleware, sellerMiddleware, shopperMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

//admin routes
router.get('/all', authMiddleware,  adminMiddleware, getAllUsers); 
router.delete('/delete/:id', authMiddleware,adminMiddleware, deleteUser); 
router.put('/role/:id', authMiddleware, adminMiddleware, updateUserRole);
router.post('/add', authMiddleware, adminMiddleware, addUserByAdmin); 

module.exports = router;

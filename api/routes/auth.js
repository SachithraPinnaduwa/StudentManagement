import {Router} from 'express';
import passport from 'passport';


const router = Router();
router.get('/google/callback', passport.authenticate('google',{
    successRedirect: 'http://localhost:5173',
    failureRedirect: '/login/failed'
})
);

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'user failed to login'
    });
});


router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'user has successfully logged in',
            user: req.user
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'user failed to login'
        });
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:5173');
});


export default router;
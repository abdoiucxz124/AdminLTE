import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { openDb } from '../db/db.js';

const router = Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const db = await openDb();
    const hash = await bcrypt.hash(password, 10);
    await db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', username, hash, role || 'publisher');
    res.redirect('/login');
  } catch (err) {
    next(err);
  }
});

export default router;

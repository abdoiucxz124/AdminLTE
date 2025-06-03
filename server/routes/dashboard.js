import { Router } from 'express';

const router = Router();

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/', ensureAuth, (req, res) => {
  res.render('dashboard', { user: req.user });
});

export default router;

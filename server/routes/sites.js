import { Router } from 'express';
import { openDb } from '../db/db.js';
import { getPosts, getPlugins, updatePlugin } from '../services/wpAPI.js';
import { getAdxReport } from '../services/googleAdManager.js';

const router = Router();

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/', ensureAuth, async (req, res, next) => {
  try {
    const db = await openDb();
    const sites = await db.all('SELECT * FROM sites');
    res.render('sites', { user: req.user, sites });
  } catch (err) {
    next(err);
  }
});

router.get('/:id/posts', ensureAuth, async (req, res, next) => {
  try {
    const db = await openDb();
    const site = await db.get('SELECT * FROM sites WHERE id = ?', req.params.id);
    const posts = await getPosts(site);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/plugins', ensureAuth, async (req, res, next) => {
  try {
    const db = await openDb();
    const site = await db.get('SELECT * FROM sites WHERE id = ?', req.params.id);
    const plugins = await getPlugins(site);
    res.json(plugins);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/plugins/update', ensureAuth, async (req, res, next) => {
  try {
    const { plugin } = req.body;
    const db = await openDb();
    const site = await db.get('SELECT * FROM sites WHERE id = ?', req.params.id);
    const result = await updatePlugin(site, plugin);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/adx', ensureAuth, async (req, res, next) => {
  try {
    const db = await openDb();
    const site = await db.get('SELECT * FROM sites WHERE id = ?', req.params.id);
    const report = await getAdxReport(site.google_ad_manager_credentials);
    res.json(report);
  } catch (err) {
    next(err);
  }
});

export default router;

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import { openDb, init } from './db/db.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import siteRoutes from './routes/sites.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
init().catch(err => console.error('DB init error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change_this_secret',
    resave: false,
    saveUninitialized: false,
  }),
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const db = await openDb();
      const user = await db.get('SELECT * FROM users WHERE username = ?', username);
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: 'Incorrect password.' });
      return done(null, { id: user.id, username: user.username, role: user.role });
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const db = await openDb();
    const user = await db.get('SELECT id, username, role FROM users WHERE id = ?', id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/sites', siteRoutes);

app.listen(3001, () => {
  console.log('Dashboard running on http://localhost:3001');
});

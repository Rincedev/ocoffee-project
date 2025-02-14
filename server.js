import 'dotenv/config';
import express from "express";
import localsMiddleware from './app/middleware/locals-middleware.js';
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import session from 'express-session';
import router from './app/router.js';
import pgSession from "connect-pg-simple";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default __dirname;

const app = express();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL, // Assure-toi que cette variable est définie dans ton environnement
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Configuration de pg-connect-simple avec PostgreSQL
const store = new (pgSession(session))({
  pool: pool, // La connexion à la base de données
  tableName: 'session', // Nom de la table pour stocker les sessions
});

// Configuration de express-session
app.use(
  session({
    store: store, // Le store PostgreSQL
    secret: process.env.SESSION_SECRET, // Défini ton secret ici
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Utiliser secure en production
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // Durée de la session (ici 1 jour)
    },
  })
);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(localsMiddleware.listAllCategories);

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

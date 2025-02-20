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

// Créer une app
const app = express();
app.set("trust proxy", 1);

const pool = new pg.Pool({
  connectionString: process.env.PG_URL, // Assure-toi que cette variable est définie dans ton environnement
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




  // Configurer le moteur de rendu (EJS)
  app.set("view engine", "ejs");
  app.set("views", "views");

  // Configurer un dossier d'assets statiques
  app.use(express.static("public"));

  // Ajout d'un body parser
  app.use(express.urlencoded({ extended: true }));
  app.use(localsMiddleware.listAllCategories);

  // Brancher le routeur
  app.use(router);

  // Lancer un serveur
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    // console.log(Server started at http://localhost:${port});
  });




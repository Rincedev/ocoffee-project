import 'dotenv/config';
import express from "express";
import localsMiddleware from './app/middleware/locals-middleware.js';
import path from "path";
import { fileURLToPath } from "url";
import session from 'express-session';
import router from './app/router.js';
import { RedisStore } from "connect-redis";
import { createClient } from "redis";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default __dirname;

const app = express();

async function startServer() {
  let sessionMiddleware;

  if (process.env.NODE_ENV === "production") {
    // Création du client Redis en production
    const redisClient = createClient({ url: process.env.REDIS_URL,  socket: { family: 4 } });
    
    redisClient.on("error", (err) => console.error("❌ Redis Error:", err));
    redisClient.on("reconnecting", () => console.log("🔄 Redis essaie de se reconnecter..."));
    redisClient.on("end", () => console.log("🚨 Redis connexion terminée"));
    redisClient.on("error", (err) => console.error("Redis Error:", err));

    (async () => {
      try {
          await redisClient.connect();
          console.log("✅ Redis connecté !");
      } catch (err) {
          console.error("❌ Impossible de connecter Redis:", err);
      }
  })();
    
    

    const redisStore = new RedisStore({
      client: redisClient,
      disableTouch: true,
    });

    sessionMiddleware = session({
      store: redisStore,
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: { secure: true, httpOnly: true, maxAge: 1000 * 60 * 60 * 24, sameSite: 'None' },
    });
  } else {
    // Utilisation de la session Express classique en développement
    sessionMiddleware = session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
    });
  }
  app.use((req, res, next) => {
    console.log("Session ID:", req.sessionID);  // Vérifier si un ID de session est généré
    next();
  });
  
  app.use(sessionMiddleware);

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
    // console.log(`Server started at http://localhost:${port}`);
  });
}

// Lancer l'application
startServer().catch((err) => {
  console.error("Error starting server:", err);
});


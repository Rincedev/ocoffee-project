import express from 'express'; 
import mainController from './controllers/mainController.js';
import catalogController from './controllers/catalogController.js';
import adminController from './controllers/adminController.js';
import multer from "multer";
import storage from './middleware/multer-storage.js';
import isAdmin from './middleware/is-admin.js';

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", mainController.renderHomePage);
router.get("/about", mainController.renderAboutPage);
router.get("/contact", mainController.renderContactPage);

router.get("/catalog", catalogController.renderCatalogPage);
router.get("/catalog/all", catalogController.renderAllCatalogPage);
router.get("/catalog/category", catalogController.renderProductsByCategory);
router.get("/product/:id", catalogController.renderProductPage);

router.get("/login", adminController.renderAdminConnectionPage)
router.post("/login", adminController.giveUserAdminRole)
router.get("/logout", adminController.adminLogout)
router.get("/login/admin", isAdmin, adminController.renderAdminPage)
router.get("/admin/product/add", adminController.renderAddProductPage);
router.post("/admin/product/add", upload.single('uploaded_file'), adminController.addProductToDatabase);
router.get("/admin/product/modify", adminController.renderModifyProductsPage)
router.get("/admin/product/modify/search", adminController.foundProductsByNameOrReference)
router.get("/admin/product/delete/:id", adminController.deleteProductFromDatabase)
router.get("/admin/product/modify/:id", adminController.renderModifyProductPage)
router.post("/admin/product/modify", adminController.modifyProduct)

router.get('/test-session', async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    const redisClient = createClient({ url: process.env.REDIS_URL });
    await redisClient.connect();
    // Vérifie si Redis est bien connecté avant de procéder
    redisClient.on("connect", () => console.log("Connected to Redis"));
    redisClient.on("error", (err) => console.error("Redis Error:", err));
  }
  
  // Utilisation de la session après avoir vérifié Redis
  req.session.test = 'value'; // Ceci va générer le cookie de session
  res.send('Session cookie set');
});

router.use((req, res) => {
  res.status(404).render("404", { title: " - Erreur 404" });
});

export default router;
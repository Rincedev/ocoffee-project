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

router.get("/admin/login", adminController.renderAdminConnectionPage)
router.post("/admin/login", adminController.giveUserAdminRole)
router.get("/logout", adminController.adminLogout)
router.get("/admin", isAdmin, adminController.renderAdminPage)
router.get("/admin/product/add", isAdmin, adminController.renderAddProductPage);
router.post("/admin/product/add", upload.single('uploaded_file'), adminController.addProductToDatabase);
router.get("/admin/product/modify", isAdmin, adminController.renderModifyProductsPage)
router.get("/admin/product/modify/search", isAdmin, adminController.foundProductsByNameOrReference)
router.get("/admin/product/delete/:id", isAdmin, adminController.deleteProductFromDatabase)
router.get("/admin/product/modify/:id", isAdmin, adminController.renderModifyProductPage)
router.post("/admin/product/modify", adminController.modifyProduct)


router.use((req, res) => {
  res.status(404).render("404", { title: " - Erreur 404" });
});

export default router;
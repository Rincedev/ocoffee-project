import dataMapper from "../dataMapper.js";
import refineProductBody from "../middleware/refine-product-body.js"
import fs from  "fs";
import path from "path";
import __dirname from "../../server.js";
import bcrypt from "bcryptjs";

// const adminUser = {
//   username: 'admin',
//   password: '$2a$10$Qtu7drKZ4L2sD0oZLiYOueCgvV2m4qX6XSP2quyymbTcn45.pYkvC'
// };

const adminController = {

  renderAdminConnectionPage(req, res) {
    res.render("admin-login", { title: " - Admin" })
  },

  async giveUserAdminRole(req, res) {
    try {
      const { username, password } = req.body;

    // Fonction bcrypt.hash pour recréer le mdp si besoin

    // bcrypt.hash(password, 10, (err, hashedPassword) => {
    //   if (err) throw err;
    //   console.log(hashedPassword);  // Copie ce hash dans adminUser.password
    // });

    const user = await dataMapper.getUserByUsername(username); 
     
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    req.session.username = user.username;
    req.session.isAdmin = user.admin;
    
    console.log(req.session)   
    res.redirect('/admin');
    
    } catch (error) {
      console.error(error);
      res.status(500).send("Serveur en PLS :(");
    }  
  },

  adminLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Erreur lors de la déconnexion");
      }
      res.redirect('/');
    });
  },

  renderAdminPage(req, res) {
    res.render("admin", { title: " - Admin" })
  },

  renderAddProductPage(req, res) {
    res.render("add-product", { title: " - Admin" });
  },

  async addProductToDatabase(req, res) {
    try {
      const productBody = req.body;   
      const product = refineProductBody(productBody);    
      await dataMapper.insertProductToDatabase(product);
    
      res.redirect("/admin/product/add");
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      res.status(500).send("Serveur en PLS :(");
    }    
  },

  async renderModifyProductsPage(req, res) {
    try {
      const allProducts = await dataMapper.getAllProducts();
      res.render("modify-products", { title: " - Modifier vos produits", allProducts });
    } catch (error) {
      console.error(error);
      res.status(500).send("Serveur en PLS :(");
    }    
  },

  async deleteProductFromDatabase(req, res) {
    try {
      const productId = req.params.id;

      const foundProduct = await dataMapper.getProductById(productId);
      if (!foundProduct || foundProduct.length === 0) {
        return res.status(404).json({ message: "Produit non trouvé" });
      }
  
      const imageRef = foundProduct.reference_number;
      const imagePath = path.join(__dirname, "public", "assets", "coffees", `${imageRef}.png`);  
      
      await dataMapper.deleteProductFromDatabase(productId);
  
      // Suppression de l'image avec fs.unlink !!!!
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression du fichier :", err);
          return res.status(500).json({ message: "Produit supprimé, mais impossible de supprimer l'image" });
        }       
        res.json({ message: `Produit ${imageRef} et son image supprimés avec succès` }); 
        
      });
  
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      res.status(500).send("Serveur en PLS :(");
    }
  },

  async renderModifyProductPage(req, res) {
    try {
      const productId = req.params.id;
      const product = await dataMapper.getProductById(productId);
      res.render("modify-product", { title: " - Admin", product });
    } catch (error) {
      console.error("Erreur lors du chargement du produit :", error);
      res.status(500).send("Serveur en PLS :(");
    }
    
  },

  async modifyProduct(req, res) {
    try {
      const productBody = req.body;
      console.log(productBody)
      const product = refineProductBody(productBody);
      console.log(product)
      await dataMapper.modifyProductInDatabase(product);
      res.redirect(`/product/${product.id}`)
    } catch (error) {
      console.error("Erreur lors de la modification du produit :", error);
      res.status(500).send("Serveur en PLS :(");
    }
  },

  async foundProductsByNameOrReference(req, res) {
    try {
      const search = req.query.search;
      console.log(search)
      const foundProducts = await dataMapper.getProductsByNameOrReference(search);
      res.render("modify-product-search", { foundProducts, title: " - Admin" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Serveur en PLS :(");
    }
  }
}

export default adminController;
import dataMapper from "../dataMapper.js";

const localsMiddleware = {
  async listAllCategories(req, res, next) {
    try {
      const allCategories = await dataMapper.getAllCategories();      
      res.locals.allCategories = allCategories;
      next();
    } catch (error) {
      console.error("Erreur lors de la récupération des caractéristiques :", error);
      res.locals.allCategories = [];
      next();
    }
  },
};

export default localsMiddleware;
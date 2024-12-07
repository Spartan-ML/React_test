module.exports = app => {
    const companies = require("../controllers/company.controller.js");
  
    var router = require("express").Router();
  
    router.post("/contacts/:contactId/companies", companies.create);
  
    router.get("/contacts/:contactId/companies", companies.findAll);
  
    router.get("/contacts/:contactId/companies/:company_id", companies.findOne);
  
    router.put("/contacts/:contactId/companies/:company_id", companies.update);
  
    router.delete("/contacts/:contactId/companies/:company_id", companies.delete);
  
    app.use('/api', router);
};
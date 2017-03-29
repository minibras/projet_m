var express = require("express");
var router = express.Router();
var url = require("url");

function dynamicRouter(app) {
    // automatisme
    router.use(manageAction);
    app.use(router);
}

function manageAction(req, res, next) {
    var path = url.parse(req.url).pathname; //le pathname (après le 3000 dans l'url)
    var type = req.method // la méthode (get post etc... methode http)
    var controler; //nom du controleur à charger
    //il faut supprimer pour le routage le paramètre apres l'action
    if (path.split('/').length > 0) path = '/' + path.split('/')[1]

    req.message = {};
    req.message.action = type + path;
    if (GLOBAL.actions_json[type + path].view)
        req.message.view = GLOBAL.actions_json[type + path].view;
    else
        req.message.view = null;
    if (GLOBAL.actions_json[type + path].sql_query)
        req.message.sql_query = GLOBAL.actions_json[type + path].sql_query;
    else
        req.message.sql_query = null;
    if (typeof GLOBAL.actions_json[type + path] == 'undefined') {
        console.log("erreur pas d'action : " + path);
        next();
    } else {
        instanceModule = require('./routes/' + GLOBAL.actions_json[type + path].controler);
        router.use(path, instanceModule);
        next();
    }
}

module.exports = dynamicRouter;
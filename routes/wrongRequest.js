var express = require('express');
var router = express.Router();

router.get('*', function(req, res, next) {
    res.status(200).send("<html><body><p>wrong request</p></body></html>");
});

module.exports = router;

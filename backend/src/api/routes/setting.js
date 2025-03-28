const express = require('express');
const router = express.Router();
const SettingController = require('../controllers/SettingController');

router.get('/', SettingController.getAllSettings);
router.patch('/domains', SettingController.updateDomains);
router.get('/domains', SettingController.getDomains);

module.exports = router;
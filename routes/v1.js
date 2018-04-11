const express = require('express');
const router = express.Router();
const playlists = require('../bin/playlists');

router.get('/playlists', (req, res) => {
	playlists.request_handlers.get(req,res);
});

module.exports = {
	router: router,
	stack: router.stack
};
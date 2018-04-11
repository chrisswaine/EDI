const Promise = require('bluebird');

let playlists = require('../data/playlists.json');



function getPlaylists(){
	return new Promise((resolve, reject) => {
		if(Array.isArray(playlists)){
			resolve(playlists)
		}else{
			reject(new Error('Playlists data not in Array format'))
		}
	})
}


const request_handlers = {
	get:(req,res) => {
		getPlaylists()
			.then((playlists) => {
				res.status(200).json(playlists);
			})
			.catch((err) => {
				res.status(500).json(err);
			})
	}
};

module.exports = {
	request_handlers: request_handlers,
	getPlaylists: getPlaylists
};
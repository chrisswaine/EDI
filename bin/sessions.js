let sessions_list = [];

const Session = {

};


module.exports = {
	sessions_list: sessions_list,
	Session: Session,
	addSession:function(session){
		sessions_list.push(session);
		return session;
	},
	removeSession:function(session){
		let removed = false;
		sessions_list.some(sesh => {
			if(session.id === sesh.id){
				sessions_list = sessions_list.splice(sessions_list.indexOf(sesh),1);
				removed = true;
				return removed;
			}
		})
		return removed;
	}
};
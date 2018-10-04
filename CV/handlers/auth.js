var companyRegister = (req, res)=> {
	res.send("Registriraj se kako kompanija");
};

var userRegister = (req, res)=> {
	res.send("Registriraj se kako user");
};

var login = (req, res)=> {
	res.send("Log in");
};

var logout = (req, res)=> {
	res.send("Logout");
};

module.exports = {
	companyRegister,
	userRegister,
	login,
	logout
};
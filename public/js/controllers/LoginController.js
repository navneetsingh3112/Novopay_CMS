
npCmsLoginApp.controller('LoginController', ['LoginService', function(LoginService) {
	var loginScope = this;
	loginScope.signIn = function(){
    	console.log(loginScope.user.userName );
    	LoginService.LoginManagement.Login.save(loginScope.user, function(data) {
			console.log(data);
		}, function(error){
      		console.log('ooooppppss!!!');
      	});
	};
}]);
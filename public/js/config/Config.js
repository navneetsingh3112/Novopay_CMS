npCmsLoginApp.run(function($rootScope){
	$rootScope.on('$routeChangeStart',function(event,next)){
		$rootScope.docTitle = next.docTitle ;

	}

})
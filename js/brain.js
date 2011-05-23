var Player = (function(plugins) {
	
	for(var i in plugins) {
		(function(id) {
			$.getScript('./js/plugins/' + id + '/index.js', function() {
				new Plugins[id]().merge();
			});
		})(plugins[i]);
	}
	
	return new Player_View();
	
})([
	
	// plugins
	'title-info' ,
	'getglue-artist'
	
]);
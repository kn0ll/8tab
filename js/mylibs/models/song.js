// class for creating "song" objects
// retains the original file upload
// and augments w/ other stuff

var Song = (function() {
	
	var win = window;
	
	// utils
	
	function getUrl(file) {
		
		var url;
		
		if (win.createObjectURL) {
			url = win.createObjectURL(file);
			
		} else if (win.createBlobURL) {
			url = win.createBlobURL(file);
			
		} else if (win.URL && win.URL.createObjectURL) {
			url = win.URL.createObjectURL(file);
			
		} else if (win.webkitURL && win.webkitURL.createObjectURL) {
			url = win.webkitURL.createObjectURL(file);
			
		}
		
		return url;
		
	}
	
	// model
	
	return Backbone.Model.extend({
		
		defaults: {
			url: null,
			file: null,
			tags: null
		},
		
		initialize: function() {
			
			// pass in file as main attribute
			// augment song w/ url && tags
			
			var self = this,
				file = self.get('file');
				
			self.set({
				url: getUrl(file)
			});
			
			ID3v2.parseFile(file, function(tags) {
				self.set({ tags: tags });
			});
			
		}

	});
	
})();
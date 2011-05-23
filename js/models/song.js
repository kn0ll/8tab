// class for creating "song" objects
// retains the original file upload
// and augments w/ tags and blob url
var Song = (function() {
	
	// util to get blob path from file object
	function getUrl(file) {
		
		var  win = window,
			url;
		
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
	
	// actual song model
	return Backbone.Model.extend({
		
		// pass in only "file",
		// url and tags are derived from it during init
		defaults: {
			file: null,
			url: null,
			tags: null
		},
		
		// set url / tags based on file
		initialize: function() {
			
			var self = this,
				file = self.get('file');
			
			// set blob url
			self.set({ url: getUrl(file) });
			
			// set tags via id3
			ID3v2.parseFile(file, function(tags) {
				self.set({ tags: tags });
			});
			
		}

	});
	
})();
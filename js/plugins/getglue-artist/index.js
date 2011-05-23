var Plugins = (function(plugins) {
	
	plugins['getglue-artist'] = Plugin.extend({
		
		id: 'getglue-artist',
		
		lib: ['getglue.js', 'style.css'],
		
		defaults: {
			title: false,
			description: false,
			image: false
		},
		
		initialize: function() {
			
			var self = this;
			
			Player.bind('play', function(song) {
				GetGlue.Objects.search(song.get('tags').Artist, 'recording_artists', function(matches) {
					var result = GetGlue.Utils.getFirstSearchResult(matches);
					GetGlue.Objects.get(result.key, function(artist) {
						self.render(artist);
					});
				});
			});
			
			Plugin.prototype.initialize.call(self);
			
		}
		
	});
	
	return plugins;
	
})(Plugins || {});
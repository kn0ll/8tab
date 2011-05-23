var Plugins = (function(plugins) {
	
	var timer;
	
	function getText(song) {
		
		var text = [' ::'],
			tags = song.get('tags'),
			artist = tags.Artist,
			title = tags.Title;

		if(artist) {
			text.push(artist);
		}

		if(artist && title) {
			text.push('-');
		}

		if(title) {
			text.push(title);
		}
		
		return text.join(' ');
		
	}
	
	plugins['title-info'] = Plugin.extend({
		
		id: 'title-info',
		
		el: $('title'),
		
		defaults: {
			Artist: false,
			Title: false
		},
		
		initialize: function() {
			
			var self = this;
			
			Player.bind('play', function(song) {
				
				var text = getText(song);
					
				clearTimeout(timer);
				
				timer = setTimeout(function poll() {
					self.render(text);
					text += text.slice(0, 1);
					text = text.substring(1, text.length);
					timer = setTimeout(poll, 500);
				}, 500);
				
			});
			
			Plugin.prototype.initialize.call(self);
			
		},
		
		render: function(text) {
			this.el.text(text);
		}
		
	});
	
	return plugins;
	
})(Plugins || {});
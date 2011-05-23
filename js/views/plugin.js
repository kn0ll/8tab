var Plugin = Backbone.View.extend({

	id: false,
	defaults: false,
	lib: [],

	initialize: function() {

		for(var i in this.lib) {
			
			var self = this;
			
			(function(path) {
				
				if(path.match(/(\.js)/)) {
					$.getScript(path);
					
				} else if(path.match(/(\.css)/)) {
					$(document.createElement('link')).attr({
						href: path,
						media: 'all',
						type: 'text/css',
						rel: 'stylesheet'
					}).appendTo('head');
				}
				
			})('./js/plugins/' + self.id + '/lib/' + this.lib[i]);
			
		}

		this.render();

	},

	render: function(params) {
		
		var self = this,
			$el = $(self.el);

		params = params? params: self.defaults;

		if(self.tmpl) {
			$el.html(self.tmpl(params));

		} else {
			$.get('./js/plugins/' + self.id + '/template.html', function(res) {
				self.tmpl = _.template(res);
				$el.html(self.tmpl(params));
			});
		}

		return self;
		
	},
	
	merge: function() {
		$(this.el).appendTo($('body'));
	}


});
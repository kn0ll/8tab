var GetGlue = (function() {
	
	function get(method, params, cb) {
		var url = 'http://ws.getglue.com/v2' + method;
		log(url, params);
		$.ajax({
			url: url, 
			data: $.extend(params, {
				token: 'c817f58e3843bfc50863c1cc5973d53b',
				format: 'json'
			}),
			success: cb,
			dataType: 'jsonp'
		});
	}
	
	return {
		
		Objects: {
			
			search: function(q, category, cb) {
				get('/glue/findObjects', { q: q, category: category }, function(res) {
					cb(res.matches);
				});
			},
			
			get: function(objectKey, cb) {
				get('/object/get', { objectId: objectKey }, function(res) {
					var obj;
					for(var i in res) {
						obj = res[i];
						break;
					}
					cb(obj);
				});
			}
			
		},
		
		Utils: {
			
			getFirstSearchResult: function(matches) {
				var result;
				for(var i in matches) {
					if(matches[i][0]) {
						result = matches[i][0];
					} else {
						for(var j in matches[i]) {
							if(matches[i][j][0]) {
								result = matches[i][j][0];
							} else {
								result = matches[i][j];
							}
							break;
						}
					}
					break;
				}
				return result;
			}
			
		}
		
	};
	
})();
;(function($){
	$.extend({
		GSForm: {
			get: function(){
				var data = [],
				    $text = $('input[type="text"]'),
				    $radio = $('input[type="radio"]'),
				    $checkbox = $('input[type="checkbox"]'),
				    $select = $('select');

				$text.each(function(){
					var $this = $(this),
					    id = $this.attr('id');
					if( id && id.indexOf('.')!==-1 ){
						data.push({name: id,value: $this.val()});
					}
				});

				$radio.each(function(){
					var $this = $(this),
					    id = $this.attr('id'),
					    name,
					    $radio;
					if( id && id.indexOf('.')!==-1 ){
						name = $this.attr('name');
					  $radio = $(':radio[name="'+name+'"]:checked');
					  if($radio.length > 0){
					  	data.push({name: id,value: $radio.val()});
					  }
					}
				});

				$checkbox.each(function(){
					var $this = $(this),
					    id = $this.attr('id');
					if( id && id.indexOf('.')!==-1 && $this.attr('checked')){
						data.push({name: id,value: $this.val()});
					}
				});

				$select.each(function(){
					var $this = $(this),
					    id = $this.attr('id');
					if( id && id.indexOf('.')!==-1 ){
						data.push({name: id,value: $this.val()});
					}
				});

				return data;
			},
			set: function(data){
				var len = data.length,
				    temp = null,
				    name,
				    value,
				    $input,
				    tagName,
				    tagType,
				    $radios;
				if(len){
					for(var i=0;i<len;i++){
						temp = data[i];
						name = temp.name;
						value = temp.value;
						$input = $('#' + name.replace('.','\\.'));
						tagName = $input[0].tagName.toUpperCase();
						tagType = $input.attr('type').toUpperCase();
						if($input.length && (tagName==='INPUT' || tagName==='SELECT')){
							if(tagName==='INPUT'){
								if(tagType === 'TEXT'){
									$input.val(value);
								}else if(tagType === 'RADIO'){
									$radios = $(':radio[name="'+name+'"]').attr('checked',true);
								}else if(tagType === 'CHECKBOX'){
									$input.attr('checked',true);
								}
							}

							if(tagName==='SELECT'){
								$input.val(value);
							}
							
						}
					}
				}
			}
		}
	});
})(jQuery)
;(function($){
	$.extend({
		GSForm: {
			get: function(){
				var data = [],
				    $text = $('input[type="text"]'),
				    $radio = $('input[type="radio"]:checked'),
				    $checkbox = $('input[type="checkbox"]'),
				    $select = $('select'),
				    $textarea = $('textarea');

				$text.each(function(){
					var $this = $(this),
					    id = $this.attr('id');
					if( id && id.indexOf('.')!==-1 ){
						data.push({name: id,value: $this.val()});
					}
				});
        //alert(0);
				$radio.each(function(){
					var $this = $(this),
					    id = $this.attr('id'),
					    name,
					    $radio;
					if( id && id.indexOf('.')!==-1 ){
						//alert(1);
						name = $this.attr('name');
					  //$radio = $(':radio[name="'+name+'"]:checked');
					  //if($this.attr("checked")){
					  	data.push({name: name,value: id});
					  //}
					  //alert(2);
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

				$textarea.each(function(){
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
						//alert(3);
						if(!$input.length){
							if(value && value!='/'){
								$input = $('#' + value.replace('.','\\.'));
							}
							//alert(4);
						}

						if($input.length){

							tagName = $input[0].tagName.toUpperCase();
							tagType = $input.attr('type').toUpperCase();
						
							if(tagName==='INPUT'){
								if(tagType === 'TEXT'){
									$input.val(value);
								}else if(tagType === 'RADIO'){
									$radios = $(':radio[id="'+value+'"]').attr('checked',true);
								}else if(tagType === 'CHECKBOX'){
									$input.attr('checked',true);
								}
							}

							if(tagName==='SELECT'){
								$input.val(value);
							}

							if(tagName==='TEXTAREA'){
								$input.val(value);
							}
							
						}
					}
				}
			},
			getTable: function(tableId){
				var data = [],
				    $table = $('#' + tableId),
				    $thead = $table.find('thead'),
				    $th = $thead.find('td'),
				    $tr = $table.find('tbody:visible>tr'),
				    names = [];
				$th.each(function(){
					names.push($(this).attr('data-name'));
				});    
        
				$tr.each(function(){
					var $td = $(this).children('td'),
					    item = {},
					    name;
					for(i=0,len=$td.length;i<len;i++){
						name = names[i];
						item[name] = $($td[i]).find('textarea').val();
					}
					data.push(item);
				});
				return data;
			},
			setTable: function(data,tableId){
				var $table = $('#' + tableId),
				    $tbody = $table.find('tbody'),
				    len = data.length,
				    html,
				    temp;
				if(len){
					for(var i=0;i<len;i++){
            temp = data[i];
            html += '<tr>';
            for(var t in temp){
            	var _tempin = temp[t];
            	html += '<td>' + _tempin + '</td>'
            }
            html += '</tr>';
					}
					$tbody.html(html);
				}
			}
		}
	});
})(jQuery)
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
        
				$radio.each(function(){
					var $this = $(this),
					    id = $this.attr('id'),
					    name,
					    $radio;
					if( id && id.indexOf('.')!==-1 ){						
						name = $this.attr('name');
					  data.push({name: name,value: id});					  
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

						if(!$input.length){
							//if(value && !/[/]/.test(value)){
							if(value && value!='/'){
								$input = $('#' + value.replace('.','\\.'));
							}
						}

						if($input.length){

							tagName = $input[0].tagName.toUpperCase();
							tagType = $input.attr('type');
							if(tagType){
								tagType = tagType.toUpperCase();
							}
						
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
				    $tbody1 = $table.find('tbody:eq(0)'),
				    $tbody2 = $table.find('#addtr'),
				    len = data.length,
				    html1 = '',
				    html2 = '',
				    temp;
				if(len){
					for(var i=0;i<len;i++){
						temp = data[i];

						if(i===0){
							html1 += '<tr>';
	            for(var t in temp){
	            	var _tempin = temp[t];
	            	html1 += '<td><textarea>' + _tempin + '</textarea></td>'
	            }
	            html1 += '</tr>';
						}else{
							html2 += '<tr>';
	            for(var t in temp){
	            	var _tempin = temp[t];
	            	html2 += '<td><textarea>' + _tempin + '</textarea></td>'
	            }
	            html2 += '</tr>';
						}
					}
					$tbody1.html(html1);
					$tbody2.html(html2);
				}
			},
			advanceTable: function(tableId){
				var $table = $('#' + tableId),
				    $textarea = $table.find('textarea:visible'),
				    $advanceTable = null,
				    $btnAdd = $('<div class="advance-table-btn advance-table-btn-add">+</div>'),
				    $btnDel = $('<div class="advance-table-btn advance-table-btn-del">-</div>');

				//将表格用一个相对定位的div包裹
        $table.wrap('<div id="advance-table" style="position: relative;"></div>');
        $advanceTable = $('#advance-table');
        //增加两个按钮，新增和删除
        $advanceTable.append($btnAdd)
                     .append($btnDel);

        //文本域绑定点击事件
				$textarea.click(function(){
					var $this = $(this),
					    $tr = $this.parents('tr');

          //$table.find('.advance-table-current-row').removeClass('advance-table-current-row');  
					$tr.addClass('advance-table-current-row');  
					console.log($tr); 
					refreshBtnPos();
				}); 

				//文本域失去焦点事件
				$textarea.blur(function(){
					var $this = $(this),
					    $tr = $this.parents('tr');
          $tr.removeClass('advance-table-current-row');
          console.log($tr); 
					refreshBtnPos();
				}); 

				//刷新按钮位置
				function refreshBtnPos(){
					var $cRow = $table.find('.advance-table-current-row');
					if($cRow.length){

					}else{
						hideBtn();
					}
				}   
				//显示按钮
				function showBtn(){
					$btnAdd.show();
					$btnDel.show();
				}
				//隐藏按钮
				function hideBtn(){
					$btnAdd.hide();
					$btnDel.hide();
				}
			}
		}
	});
})(jQuery)
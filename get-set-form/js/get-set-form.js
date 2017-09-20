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
					if( id && id.indexOf('.')!==-1 && !$this.hasClass('text-placeholder')){
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
									$input.removeClass('text-placeholder');
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
				    $tbody = $('#addtr'),
				    $textarea = $table.find('textarea:visible'),
				    $advanceTable = null,
				    $btnAdd = $('<div class="advance-table-btn advance-table-btn-add">+</div>'),
				    $btnDel = $('<div class="advance-table-btn advance-table-btn-del">-</div>'),
				    template = '';

				//获取模板
				template = $('#ACE_HIDDEN_TABLE').html().replace(/id="[^"]*"/,'');
				//$template = $(template).removeAttr('id');

				//将表格用一个相对定位的div包裹
        $table.wrap('<div id="advance-table" style="position: relative;"></div>');
        $advanceTable = $('#advance-table');

        //增加两个按钮，新增和删除
        $advanceTable.append($btnAdd)
                     .append($btnDel);
        //点击新增按钮，增加一行
        $btnAdd.click(function(){
        	var $tr = $table.find('.advance-table-current-row'),
        	    $t = $(template).addClass('advance-table-current-row');
        	$tr.removeClass('advance-table-current-row');
        	if(isFirstRow($tr)){
        		$tbody.prepend($t);
        	}else{
            $tr.after($t);
        	}
        	refreshBtnPos();
        });
        //点击删除按钮
        $btnDel.click(function(){
        	var $tr = $table.find('.advance-table-current-row'),
        	    $nextTr;

        	if($tr.prev('tr').length){
        		$nextTr = $tr.prev('tr');
        	}else if($tr.next('tr').length){
        		$nextTr = $tr.next('tr');
        	}else{
        		$nextTr = $tbody.prev('tbody').children('tr');
        	}
        	$tr.remove();
        	$nextTr.addClass('advance-table-current-row');
        	refreshBtnPos();
        });

        //初始化控制按钮
        $tbody.prev('tbody').children('tr').addClass('advance-table-current-row');
        refreshBtnPos();

        //文本域绑定点击事件
        $('#' + tableId + ' textarea').live('click',function(){
				//$textarea.click(function(){
					var $this = $(this),
					    $tr = $this.parents('tr');

					if(!$tr.hasClass('advance-table-current-row')){
						$table.find('.advance-table-current-row').removeClass('advance-table-current-row');  
						$tr.addClass('advance-table-current-row');  
						refreshBtnPos();
					}    	
				}); 

				//文本域失去焦点事件
				/*$textarea.blur(function(){
					var $this = $(this),
					    $tr = $this.parents('tr');
          $tr.removeClass('advance-table-current-row');
					refreshBtnPos();
				});*/ 

				//刷新按钮位置
				function refreshBtnPos(){
					var $cRow = $table.find('.advance-table-current-row'),
					    top = 0,
					    trHeight = 0;
					if($cRow.length){
						//将按钮移动到合适的位置
						top = $cRow.offset().top - $table.offset().top;
						trHeight = $cRow.height() / 2 - 15;
						top += trHeight;
						$btnAdd.css('top',top);
						$btnDel.css('top',top);
						showBtn();
						if(isFirstRow($cRow)){
							$btnDel.hide();
						}
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
				//判断是否是第一行
				function isFirstRow($tr){
					return !$tr.parent().attr('id');
				}
			},
			required: function(){
				var $r = $('.required'),
				    that = this;
				$r.live('blur keyup input change select',function(){
					that.validSingle($(this));
				});
			},
			validSingle: function($e){
				var isValid = true,
				    $this = $e,
					  tagName = $this[0].tagName.toUpperCase(),
					  tagType = '',
					  msg = '<div style="background: #f44336;color: #fff;position: absolute;padding: 2px 7px;font-size: 12px;border-radius: 4px;margin-left: 15px;"><div style="position: absolute;left: -12px;top: 50%;margin-top: -6px;width: 0;height: 0;border-width: 6px;border-style: solid;border-color: transparent #f44336 transparent transparent;"></div>必填项</div>',
					  $msg = $(msg);

			  if(tagName === 'INPUT'){
					tagType = $this.attr('type');
					if(tagType){
						tagType = tagType.toUpperCase();
					}
				
					if(tagName==='INPUT'){
						if(tagType === 'TEXT'){
							if(!($this.val() && !$this.hasClass('text-placeholder'))){
								isValid = false;
								$this.addClass('invalid');
							}else{
								$this.removeClass('invalid');
							}
						}else if(tagType === 'RADIO'){
							var $radios = $('[name="' + $this.attr('name').replace('.','\\.') + '"]'),
							    $radio = $radios.filter(':checked');
							if($radio.length === 0){
								isValid = false;
								$radios.addClass('invalid');
							}else{
								$radios.removeClass('invalid');
							}
						}else if(tagType === 'CHECKBOX'){
							var $radios = $('[name="' + $this.attr('name').replace('.','\\.') + '"]'),
							    $radio = $radios.filter(':checked');
							if($radio.length === 0){
								isValid = false;
								$radios.addClass('invalid');
							}else{
								$radios.removeClass('invalid');
							}
						}
					}
				}else if(tagName === 'TEXTAREA'){
					if(!($this.val() && !$this.hasClass('text-placeholder'))){
						isValid = false;
						$this.addClass('invalid');
					}else{
						$this.removeClass('invalid');
					}
				}else if(tagName==='SELECT'){
					if(!$this.val()){
						isValid = false;
						$this.addClass('invalid');
					}else{
						$this.removeClass('invalid');
					}
				}  

				if(!isValid){
					//给出提示语，提示语展示几秒钟后消失，只留下红色的边框
					$msg.css({
						"top": $this.offset().top,
						"left": $this.offset().left + $this.width()
					});
					$this.after($msg);
					$msg.fadeOut(5000,function(){
						$msg.remove();
					});
				}

				return isValid;
			},
			valid: function(){
				var isValid = true,
				    invalidElements = [],
				    $r = $('.required'),
				    that = this;

				$r.each(function(){
					var $this = $(this);
					if(!that.validSingle($this)){
						isValid = false;
						invalidElements.push($this);
					}
				});

				if(invalidElements.length){
					invalidElements[0].focus();
				}

				return isValid;
			}
		}
	});
})(jQuery)
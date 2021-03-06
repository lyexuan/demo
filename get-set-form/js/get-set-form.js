;(function($){
	var TEXTAREA_DEFAULT_HEIGHT = 30;
	$.extend({
		GSForm: {
			get: function(){
				var data = [],
				    $text = $('input[type="text"]'),
				    $radio = $('input[type="radio"]:checked'),
				    $checkbox = $('input[type="checkbox"]'),
				    $select = $('select'),
				    $textarea = $('textarea'),
				    $span = $('span'),
				    $imgWrap = $('.pictures'),
				    imgs = [],
				    imgName = '';

				$text.each(function(){
					var $this = $(this),
					    id = $this.attr('id');
					if( id /*&& id.indexOf('.')!==-1*/ && !$this.hasClass('text-placeholder')){
						data.push({name: id,value: $this.val()});
					}
				});

				$radio.each(function(){
					var $this = $(this),
					    id = $this.attr('id'),
					    name,
					    $radio;
					if( id /*&& id.indexOf('.')!==-1*/ ){
						name = $this.attr('name');
					  data.push({name: name,value: id});
					}
				});

				$checkbox.each(function(){
					var $this = $(this),
					    id = $this.attr('id');
					if( id /*&& id.indexOf('.')!==-1*/ && $this.attr('checked')){
						data.push({name: id,value: $this.val()});
					}
				});

				$select.each(function(){
					var $this = $(this),
					    id = $this.attr('id');
					if( id /*&& id.indexOf('.')!==-1*/ ){
						data.push({name: id,value: $this.val()});
					}
				});

				$textarea.each(function(){
					var $this = $(this),
					    id = $this.attr('id');
					if( id /*&& id.indexOf('.')!==-1*/ ){
						data.push({name: id,value: $this.val()});
					}
				});

				$span.each(function(){
					var $this = $(this),
					    id = $this.attr('id');
					if( id /*&& id.indexOf('.')!==-1*/ ){
						data.push({name: id,value: $this.text()});
					}
				});

				$imgWrap.each(function () {
				    var $this = $(this),
					    $imgItems = $this.find('.picture-item');

				    imgName = $this.attr('name');

				    $imgItems.each(function () {
				        var $this = $(this),
                            $img = $this.children('img'),
                            src = $img.attr('src');
				        imgs.push(src);
				    });
				});

				

				if (imgName) {
					if(imgs.length){
						data.push({name:imgName,value:imgs.join(',')});
					}else{
						data.push({name:imgName,value:''});
					}
        }


				return data;
			},
			set: function(data,callback){
				var len = data.length,
				    temp = null,
				    name,
				    value,
				    $input,
				    tagName,
				    tagType,
				    $radios,
				    isImage;

				callback = $.extend({}, {
        	beforeSetData: function(){},
        	afterSetData: function(){}
        }, callback);

        callback.beforeSetData(data);

				if(len){
					for(var i=0;i<len;i++){
						temp = data[i];
						name = temp.name;
						value = temp.value;
						$input = $('#' + name.replace('.','\\.'));
						isImage = name.split('.')[1];

						if(isImage === 'image'){
							if($('.pictures[name="'+name+'"]').length){
								if(window.initImages){
									initImages(value);
								}else{
									alert('common.js中找不到initImages方法');
								}
							}
						}else{
						    if (!$input.length) {
						        try{
							//if(value && !/[/]/.test(value)){
							if(value && value!='/'){
									$input = $('#' + value.replace('.','\\.'));
								}
						        }catch(e){}
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
									$input.removeClass('text-placeholder');
									$input.val(value);
								}

								if(tagName==='SPAN'){
									$input.text(value);
								}

							}
						}


					}
					callback.afterSetData(data);
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
				
				if($tbody2.length==0){
					$tbody2 = $table.find('.addtr');
				}    

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
					if ($.fn.TextAreaExpander) {
					  $('textarea').TextAreaExpander(TEXTAREA_DEFAULT_HEIGHT);
        	}
				}
			},
			advanceTable: function(tableId){
				var $table = $('#' + tableId),
				    $tbody = $table.find('.addtr'),
				    $templateWrap = $table.find('.ACE_HIDDEN_TABLE'),
				    $textarea = $table.find('textarea:visible'),
				    $advanceTable = null,
				    $btnAdd = $('<div id="js-advance-table-btn1-'+ tableId +'" class="js-advance-table-btn advance-table-btn advance-table-btn-add">+</div>'),
				    $btnDel = $('<div id="js-advance-table-btn2-'+ tableId +'" class="js-advance-table-btn advance-table-btn advance-table-btn-del">-</div>'),
				    template = '';

        if($tbody.length===0){
 					$tbody = $table.find('#addtr');
        }

        if($templateWrap.length===0){
 					$templateWrap = $table.find('#ACE_HIDDEN_TABLE');
        }

				//获取模板
				template = $templateWrap.html().replace(/id="[^"]*"/,'');
				//$template = $(template).removeAttr('id');

				//将表格用一个相对定位的div包裹
        $table.wrap('<div id="advance-table-'+tableId+'" style="position: relative;"></div>');
        $advanceTable = $('#advance-table-'+tableId);

			  //增加两个按钮，新增和删除
        $('#js-advance-table-btn1-' + tableId).remove();//显示按钮之前先移除先前的按钮
        $('#js-advance-table-btn2-' + tableId).remove();//显示按钮之前先移除先前的按钮

        $advanceTable.append($btnAdd)
                     .append($btnDel);

        // alert(0);
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
        	if ($.fn.TextAreaExpander) {
        	    $t.find('textarea').TextAreaExpander(TEXTAREA_DEFAULT_HEIGHT);
        	}
        	refreshBtnPos();
        });
        //点击删除按钮
        $btnDel.click(function(){
        	var $tr = $table.find('.advance-table-current-row'),
        	    $nextTr;
          if(confirm('确认要删除该行？')){
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
          }
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
						hideBtn();
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
					return !($tr.parent().attr('id') || $tr.parent().attr('class'));
				}
			},
			advanceInfoGroup: function(wrapId,moreInfo,callback){
				var $wrap = $('#' + wrapId),
				    $ibody = $wrap.find('.info-group-body'),
				    $btnAdd = $wrap.find('.add'),
				    $btnDel = $wrap.find('.del'),
				    template = $wrap.find('.template').html().replace(/text-placeholder/g,'');

				callback = $.extend({}, {
        	afterAddInfoGroup: function(){},
        	afterDelInfoGroup: function(){}
        }, callback);

        //点击一组内容
        $btnAdd.click(function(){
        	var _template = template,
        	    $_template = $(_template);
        	if(moreInfo && moreInfo.length>0){
        	    var len = $ibody.find('.info-item').length;
        		if (moreInfo[len]) {
        		    _template = template.replace(/###yx###/g, moreInfo[len]);
        		    $_template = $(_template);
        		}else{
        			alert('不能再增加更多了!');
        			return false;
        		}
				  }
        	$ibody.append($_template.removeClass('text-placeholder'));
        	callback.afterAddInfoGroup($_template);
        });
        //点击删除最后一组内容
        $btnDel.click(function(){
        	if($ibody.find('.info-item').length>1){
        		$ibody.find('.info-item:last').remove();
        		callback.afterDelInfoGroup();
        	}
        });
			},
			getInfoGroup: function(id,callback){
				var data = [],
				    $wrap = $('#' + id),
				    $items = $wrap.find('.info-group-body').children('.info-item');

        callback = $.extend({}, {
        	beforeGetInfoGroup: function(){}
        }, callback);

        callback.beforeGetInfoGroup();

        $items.each(function () {

					var $input = $(this).find('.info-unit'),
					    item = {};
					$input.each(function () {

						var $this = $(this),
						    key = $this.attr('data-name'),
						    value = $this.val();
						item[key] = value;

					});
					data.push(item);
				});
				return data;
			},
			setInfoGroup: function(data,id,moreInfo,callback){
				var $wrap = $('#' + id),
				    $ibody = $wrap.find('.info-group-body'),
				    len = data.length,
				    template = $wrap.find('.template').html().replace(/text-placeholder/g,''),
				    _template = template,
				    $template,
				    temp = {};

				callback = $.extend({}, {
        	afterSetInfoItem: function(){}
        }, callback);

				$ibody.empty();
				if(len){
					for(var i=0;i<len;i++){
            temp = data[i];
            if(moreInfo){
        			_template = template.replace(/###yx###/g,moreInfo[i]);
        		}
          	$template = $(_template);
            for(var _t in temp){
              $template.find('[data-name="' + _t + '"]').text(temp[_t]);
            	$template.find('[data-name="' + _t + '"]').val(temp[_t]);
            }
            $ibody.append($template);
            callback.afterSetInfoItem($template);
					}
				}

			},
			complexAdvanceTable: function(id){
				var $wrap = $('#' + id),
				    $table = $wrap.children('.complex-table-content').children('table'),
				    $btnAdd = $('<div id="js-advance-table-btn1-'+ id +'" class="js-complex-advance-table-btn advance-table-btn advance-table-btn-add">增加一组</div>'),
				    $btnDel = $('<div id="js-advance-table-btn2-'+ id +'" class="js-complex-advance-table-btn advance-table-btn advance-table-btn-del">删除该组</div>'),
				    $btnAdd2 = $('<div id="js-advance-table-btn3-'+ id +'" class="js-complex-advance-table-btn advance-table-btn advance-table-btn-add">增加一行</div>'),
				    $btnDel2 = $('<div id="js-advance-table-btn4-'+ id +'" class="js-complex-advance-table-btn advance-table-btn advance-table-btn-del">删除末行</div>'),
				    template = $wrap.find('.complex-table-template').html();

        //增加两个按钮，新增和删除
        $('#js-advance-table-btn1-' + id).remove();//显示按钮之前先移除先前的按钮
        $('#js-advance-table-btn2-' + id).remove();//显示按钮之前先移除先前的按钮
        $('#js-advance-table-btn3-' + id).remove();//显示按钮之前先移除先前的按钮
        $('#js-advance-table-btn4-' + id).remove();//显示按钮之前先移除先前的按钮

        $wrap.append($btnAdd)
             .append($btnDel)
             .append($btnAdd2)
             .append($btnDel2);
        //点击新增按钮，增加一组
        $btnAdd.click(function(){
        	var $tbody = $wrap.find('.advance-table-current-tbody'),
        	    $t = $(template).addClass('advance-table-current-tbody');
        	$tbody.removeClass('advance-table-current-tbody');
        	if ($.fn.TextAreaExpander) {
        	    $t.find('textarea').TextAreaExpander(TEXTAREA_DEFAULT_HEIGHT);
        	}
        	$tbody.after($t);
        	refreshBtnPos();
        });
        //点击删除按钮，删除该组
        $btnDel.click(function(){
        	var $tbody = $wrap.find('.advance-table-current-tbody'),
        	    $nextTbody = $tbody;
          if(confirm('确认要删除该组？')){
          	if($tbody.prev('tbody').length){
	        		$nextTbody = $tbody.prev('tbody');
	        	}else if($tbody.next('tbody').length){
	        		$nextTbody = $tbody.next('tbody');
	        	}else{
	        		alert('至少要保留一组数据');
	        		return false;
	        	}
	        	$tbody.remove();
	        	$nextTbody.addClass('advance-table-current-tbody');
	        	refreshBtnPos();
          }
        });
        //点击新增按钮，增加一行
        $btnAdd2.click(function(){
        	var $tbody = $wrap.find('.advance-table-current-tbody'),
        	    $t = $(template).find('tr'),
        	    $tr = $tbody.find('tr:eq(0)'),
        	    $td = $tr.find('td:eq(0)'),
        	    rowspan = parseInt($td.attr('rowspan'));

        	$t.find('td:eq(0)').remove();
        	if ($.fn.TextAreaExpander) {
        	    $t.find('textarea').TextAreaExpander(TEXTAREA_DEFAULT_HEIGHT);
        	}
        	$tbody.append($t);
        	rowspan++;
        	$td.attr('rowspan',rowspan);

        	refreshBtnPos();
        });
        //点击删除按钮，删除末行
        $btnDel2.click(function(){
        	var $tbody = $wrap.find('.advance-table-current-tbody'),
        	    $tr = $tbody.find('tr'),
        	    $td = $tr.filter(':eq(0)').find('td:eq(0)'),
        	    rowspan = parseInt($td.attr('rowspan'));

          if(confirm('确定要删除该组的最后一行？')){
          	if($tr.length>1){
	        		rowspan--;
	        		$td.attr('rowspan',rowspan);
	            $tr.filter(':last').remove();
	        		refreshBtnPos();
	        	}else{
	        		alert('该组只剩最后一行了');
	        	}
          }

        });

        //初始化控制按钮
        $table.find('tbody:eq(0)').addClass('advance-table-current-tbody');
        refreshBtnPos();

        //文本域绑定点击事件
        $('#' + id + ' textarea').live('click',function(){
				//$textarea.click(function(){
					var $this = $(this),
					    $tr = $this.parents('tbody');

					if(!$tr.hasClass('advance-table-current-tbody')){
						$table.find('.advance-table-current-tbody').removeClass('advance-table-current-tbody');
						$tr.addClass('advance-table-current-tbody');
						refreshBtnPos();
					}
				});

				//刷新按钮位置
				function refreshBtnPos(){
					var $cRow = $table.find('.advance-table-current-tbody'),
					    top = 0,
					    trHeight = 0,
					    trHeight2 =0;
					if($cRow.length){
						//将按钮移动到合适的位置
						top = $cRow.offset().top - $wrap.offset().top;
						trHeight = $cRow.height() / 2 - 21;
						trHeight2 = $cRow.height() / 2 + 1;

						$btnAdd.css('top',top + trHeight);
						$btnDel.css('top',top + trHeight);
						$btnAdd2.css('top',top + trHeight2);
						$btnDel2.css('top',top + trHeight2);
					}
				}
			},
			getComplexAdvanceTable: function(id){
				var data = [],
				    $wrap = $('#' + id),
				    $table = $wrap.find('.complex-table-content>table'),
				    $thead = $table.find('thead'),
				    $th = $thead.find('td'),
				    $tbody = $table.find('tbody');
				    names = [];

				$th.each(function(){
					names.push($(this).attr('data-name'));
				});

				$tbody.each(function(){
					var $this = $(this),
					    $tr = $this.children('tr'),
					    item = {},
					    name;

					item.index = $tr.filter(':eq(0)').find('td:eq(0)').find('textarea').val();
					item.content = [];

					$tr.each(function(i){
						var $this = $(this),
						    $tds = $this.find('td'),
						     _item = {};
						/*if(i==0){
							$tds = $tds.filter(':eq(0)');
						}*/
						$tds.each(function(j){
            	var $this = $(this),
            	    _name = names[j];
            	if(!(i==0 && j==0)){
            		if(i!=0){
            			_name = names[j+1]
            		}
            		_item[_name] = $this.find('textarea').val();
            	}

            });
            item.content.push(_item);
					});

					data.push(item);

				});
				return data;
			},
			setComplexAdvanceTable: function(data,id){
				var len = data.length,
				    $wrap = $('#' + id),
				    $table = $wrap.find('.complex-table-content>table'),
				    html = '',
				    temp = {},
				    index,
				    content,
				    innerLen = 0,
				    innerTemp = {},
				    currentClass = '';

				for(var i=0;i<len;i++){
					temp = data[i];
					index = temp.index;
					content = temp.content;
					innerLen = content.length;
					if(i==0){
						currentClass = 'advance-table-current-tbody';
					}else{
						currentClass = '';
					}
					html += '<tbody class="'+currentClass+'">';
					for(var j=0;j<innerLen;j++){
						var tempContent = content[j];
						html += '<tr>';
						if(j==0){
							html += '<td rowspan="'+innerLen+'"><textarea>'+index+'</textarea></td>';
						}
						for(var td in tempContent){
							html += '<td><textarea>'+tempContent[td]+'</textarea></td>';
						}
						html += '</tr>';
					}
					html += '</tbody>';
				}

				$table.find('tbody').remove().end().append(html);
				if ($.fn.TextAreaExpander) {
				  $('textarea').TextAreaExpander(TEXTAREA_DEFAULT_HEIGHT);
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
					  msg = '<div style="background: #f44336;color: #fff;position: absolute;padding: 2px 7px;font-size: 12px;border-radius: 4px;margin-left: 30px;text-indent: 0;"><div style="position: absolute;left: -12px;top: 50%;margin-top: -6px;width: 0;height: 0;border-width: 6px;border-style: solid;border-color: transparent #f44336 transparent transparent;"></div>必填项</div>',
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
					/*$msg.fadeOut(5000,function(){
						$msg.remove();
					});*/
					setTimeout(function(){
						$msg.remove();
					},3000);
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
			},
			autoInputWidth: function(){
				$('body').append('<div id="countInputWidth" style="position: absolute; top: -1000px;left: -1000px;"></div>');

				//设置原始长度属性值
				$('input[type="text"]').each(function(){
					var $this = $(this),
					    width = $this.width();

					$this.attr('oriWidth',width);
				});

				//给输入框绑定值改变的事件
				$('input[type="text"]').bind('input propertychange', function(){
					var $this = $(this),
					    oriWidth = $this.attr('oriWidth'),
					    value = $this.val(),
					    $span = $('<span>' + value + '</span>'),
					    newWidth = oriWidth,
					    $ci = $('#countInputWidth');


          $ci.append($span);


          newWidth = $span.width();

          $span.remove();
					//用一个模拟的span去获取内容的宽度，和初始宽度比对，超多初始宽度则拓宽input否则还原原始长度
					if(oriWidth<newWidth && !$this.hasClass('text-placeholder')){
            $this.width(newWidth);
					}else{
						$this.width(oriWidth);
					}

        });
			},
			advanceEasyTable: function(tbodyId,templateId,callback){
				var $tbody = $('#' + tbodyId),
				    $table = $tbody.parents('table'),
				    $wrap = $table.parents('.advance-table-wrap'),
				    $textarea = $table.find('textarea:visible'),
				    $template = $('#' + templateId),
				    $btnAdd = $('<div id="js-advance-table-btn1-'+ tbodyId +'" class="js-advance-easy-table-btn advance-table-btn advance-table-btn-add">+</div>'),
				    $btnDel = $('<div id="js-advance-table-btn2-'+ tbodyId +'" class="js-advance-easy-table-btn advance-table-btn advance-table-btn-del">-</div>'),
				    template = '';

        callback = $.extend({}, {
        	afterCreateBtn: function($btnAdd,$btnDel){},
        	afterAddRow   : function(){},
        	afterDelRow   : function(){}
        }, callback);

				//获取模板
				template = $template.find('tbody').html().replace(/id="[^"]*"/,'');

			  //增加两个按钮，新增和删除
        $('#js-advance-table-btn1-'+ tbodyId).remove();//显示按钮之前先移除先前的按钮
        $('#js-advance-table-btn2-'+ tbodyId).remove();//显示按钮之前先移除先前的按钮

        $wrap.append($btnAdd)
             .append($btnDel);
        callback.afterCreateBtn($btnAdd,$btnDel);

        //点击新增按钮，增加一行
        $btnAdd.click(function(){
        	var $tr = $tbody.find('.advance-table-current-row'),
        	    $t = $(template).addClass('advance-table-current-row');
        	$tr.removeClass('advance-table-current-row');

          $tr.after($t);
          $t.find('textarea').removeClass('text-placeholder');

        	if ($.fn.TextAreaExpander) {
        		$t.find('textarea').TextAreaExpander(TEXTAREA_DEFAULT_HEIGHT);
        	}
        	refreshBtnPos();

        	callback.afterAddRow($t);
        });
        //点击删除按钮
        $btnDel.click(function(){
        	var $tr = $table.find('.advance-table-current-row'),
        	    $nextTr;
          if(confirm('确认要删除该行？')){
          	if($tr.prev('tr').length){
	        		$nextTr = $tr.prev('tr');
	        		$tr.remove();
	        	  $nextTr.addClass('advance-table-current-row');
	        	  refreshBtnPos();
	        	}else if($tr.next('tr').length){
	        		alert('第一行不能删除');
	        	}

          }
        });

        //初始化控制按钮
        $tbody.children('tr:eq(0)').addClass('advance-table-current-row');
        setTimeout(function () {
            refreshBtnPos();
        }, 1000);


        //文本域绑定点击事件
        $('#' + tbodyId + ' textarea').live('click',function(){
					var $this = $(this),
					    $tr = $this.parents('tr');

					if(!$tr.hasClass('advance-table-current-row')){
						$table.find('.advance-table-current-row').removeClass('advance-table-current-row');
						$tr.addClass('advance-table-current-row');
						refreshBtnPos();
					}
				});

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
						hideBtn();
						$btnAdd.css('top',top);
						$btnDel.css('top',top);
						showBtn();
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
			},
			getAdvanceEasyTable: function(tbodyId,callback){
				var $tbody = $('#' + tbodyId),
				    $table = $tbody.parents('table'),
				    $tr = $tbody.children('tr'),
				    names = $tbody.attr('data-name'),
				    namesLen = 0,
				    data = [];

        callback = $.extend({}, {}, callback);

				if(names){
					names = JSON.parse(names);
					namesLen = names.length;
					if(namesLen){
						$tr.each(function(){
							var $this = $(this),
							    $tds = $this.children('td'),
							    temp = {},
							    name = '',
							    i = 0;
							$tds.each(function(){
								var $this = $(this),
								    $textarea = $this.find('textarea'),
								    value = '',
								    rowspan = $this.attr('rowspan');

								if(!rowspan || rowspan==1){
									if($textarea.length){
										value = $textarea.val();
									}
									name = names[i];
									temp[name] = value;
									++i;
								}    
							});  
							data.push(temp);  
						});
					}
				}

				return data;
			},
			setAdvanceEasyTable: function(data,tbodyId,callback){
				var $tbody = $('#' + tbodyId),
				    $table = $tbody.parents('table'),
				    len = data.length,
				    $firstTr = $tbody.children('tr:eq(0)'),
				    html = '',
				    temp = {},
				    tempArray = [],
				    j=0;

        callback = $.extend({}, {}, callback);

				if(len){
					for(var i=0;i<len;i++){
						temp = data[i];
						tempArray = [];
						j=0;
						for(var item in temp){
							tempArray.push(temp[item]);
						}
						if(i===0){
							//给第一行赋值
							$firstTr.addClass('advance-table-current-row')
							$firstTr.children('td').each(function(index, el) {
								var $this = $(this),
								    $textarea = $this.find('textarea'),
								    rowspan = $this.attr('rowspan');

								if(!rowspan || rowspan==1){
									$textarea.val(tempArray[j])
									         .removeClass('text-placeholder');
									++j;
								}

								if(rowspan>1){
									$this.attr('rowspan',len);
								}
							});
						}else{
							//拼接剩余的行
							html += '<tr>';
							for(var k=0,_len=tempArray.length;k<_len;k++){
								html += '<td><textarea>' + tempArray[k] + '</textarea></td>';
							}
							html += '</tr>';
						}
					}
					//移除除了第一行以外的行
					$firstTr.nextAll('tr').remove();
					//添加剩余行
					$firstTr.after(html);
					if ($.fn.TextAreaExpander) {
        	  $tbody.find('textarea').TextAreaExpander(TEXTAREA_DEFAULT_HEIGHT);
        	}
				}
			}
		}
	});
})(jQuery)

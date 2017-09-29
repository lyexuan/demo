// Array原型链上扩展indexOf方法
if(!Array.prototype.indexOf){
   Array.prototype.indexOf = function(val){
       var value = this;
       for(var i =0; i < value.length; i++){
          if(value[i] == val) return i;
       }
      return -1;
   };
}

(function ($) {



    // jQuery plugin definition

    $.fn.TextAreaExpander = function (minHeight, maxHeight) {



        var hCheck = !($.browser.msie || $.browser.opera);



        // resize a textarea

        function ResizeTextarea(e) {



            // event or initialize element?

            e = e.target || e;



            // find content length and box width

            var vlen = e.value.length, ewidth = e.offsetWidth;

            if (vlen != e.valLength || ewidth != e.boxWidth) {



                if (hCheck && (vlen < e.valLength || ewidth != e.boxWidth)) e.style.height = "0px";

                var h = Math.max(e.expandMin, Math.min(e.scrollHeight, e.expandMax));



                e.style.overflow = (e.scrollHeight > h ? "auto" : "hidden");

                e.style.height = h + "px";



                e.valLength = vlen;

                e.boxWidth = ewidth;

            }



            return true;

        };



        // initialize

        this.each(function () {



            // is a textarea?

            if (this.nodeName.toLowerCase() != "textarea") return;



            // set height restrictions

            var p = this.className.match(/expand(\d+)\-*(\d+)*/i);

            this.expandMin = minHeight || (p ? parseInt('0' + p[1], 10) : 0);

            this.expandMax = maxHeight || (p ? parseInt('0' + p[2], 10) : 99999);



            // initial resize

            ResizeTextarea(this);



            // zero vertical padding and add events

            if (!this.Initialized) {

                //this.Initialized = true;

                $(this).css("padding-top", 0).css("padding-bottom", 0);

                $(this).bind("keyup", ResizeTextarea).bind("focus", ResizeTextarea);

            }

        });



        return this;

    };



})(jQuery);




var DelImgPath = "";
var addId = "";
function getJson() {

    var fields = $(":input").serializeArray();

    var jsonstr = JSON.stringify(fields);

    return jsonstr;
}
function getFormJson() {
    var jsonstr = "[]";

  //  if ($.GSForm) {

        var data = $.GSForm.get();

        jsonstr = JSON.stringify(data);
  //  }


    return jsonstr;

}
function getInfoGroup(wrapId) {
    var jsonstr = "[]";

    //  if ($.GSForm) {
   
    var data = $.GSForm.getInfoGroup(wrapId);

    jsonstr = JSON.stringify(data);
    //  }
 

    return jsonstr;

}
function setFormJson(dataStr) {
    if (dataStr == null) return;

    var objArray = JSON.parse(dataStr);
    if ($.GSForm) {
        $.GSForm.set(objArray);
    }
}

function setInfoGroup(dataStr, wrapId) {

    if (dataStr == null) return;

    var objArray = JSON.parse(dataStr);
    if ($.GSForm) {
        $.GSForm.setInfoGroup(objArray, wrapId);
    }
}

function getTableJson(id) {
    var data = $.GSForm.getTable(id);
    var jsonstr = JSON.stringify(data);

    return jsonstr;

}
function setTableJson(dataStr, id) {

    if (dataStr == null||id==null) return;
    var objArray = JSON.parse(dataStr);
    $.GSForm.setTable(objArray,id);

}

function setPbWay(pbWay) {
    bid.setPbWay(pbWay);
}

function setText(id, text) {

    bid.setText(id, text);
}

function getText(id) {
  return bid.getText(id);
}

function setRadio(name, value) {

    bid.setRadio(name, value);
}

function getRadio(name) {
  return bid.getRadio(name);
}

function saveTxt() {
    var fields = $(":input").serializeArray();
    var jsonstr = JSON.stringify(fields);
    //window.external.saveTXT(jsonstr, DelImgPath,path);
    return jsonstr;
}
function outhtml() {
    var s = document.documentElement.outerHTML;
    return s;
}
function fixedPlaceholder() {
    $('input[type="text"],textarea').textPlaceholder();
}
	 function     EditCell(ff)
	 {
		 if(clipboardData.getData('text').split('\t').length!=1)
		 {
	   window.setTimeout(function(){Edit(ff)}, 1);
		 }

     }
     function     Edit(s)
	 {

	   var   obj=s.parentNode.parentNode.parentNode;

	   var webData=new  Array(clipboardData.getData('text').split('\n').length-1);


       for(var i=0;i<=clipboardData.getData('text').split('\n').length-1;i++)
        {

           webData[i]=clipboardData.getData('text').split('\n')[i].split('\t')
        }

       for(var j=0;j<=document.getElementById(obj.id).rows.length-s.parentNode.rowIndex-2&&j<webData.length;j++)
       {

        for(var n=0;n<webData[j].length;n++)
            {

             if(obj.rows[s.parentNode.rowIndex+j].cells[s.cellIndex+n]!=null&&webData[j][n]!='')
              {

			  obj.rows[s.parentNode.rowIndex+j].cells[s.cellIndex+n].childNodes[0].value=webData[j][n];

              }

            }
        }

	 }


//function document.onkeydown() {
//    if ((window.event.altKey) &&
//             ((window.event.keyCode == 37) ||       //屏蔽   Alt+   方向键   ←
//               (window.event.keyCode == 39)))       //屏蔽   Alt+   方向键   →
//    {
//        //alert("不准你使用ALT+方向键前进或后退网页！");
//        event.returnValue = false;
//    }
//    /*   注：这还不是真正地屏蔽   Alt+   方向键，
//    因为   Alt+   方向键弹出警告框时，按住   Alt   键不放，
//    用鼠标点掉警告框，这种屏蔽方法就失效了。以后若
//    有哪位高手有真正屏蔽   Alt   键的方法，请告知。*/
//    if ((event.keyCode == 8) ||                                   //屏蔽退格删除键
//             (event.keyCode == 116) ||                                   //屏蔽   F5   刷新键
//             (event.ctrlKey && event.keyCode == 82)) {   //Ctrl   +   R
//        event.keyCode = 0;
//        event.returnValue = false;
//    }
//    if (event.keyCode == 122) { event.keyCode = 0; event.returnValue = false; }     //屏蔽F11
//    if (event.ctrlKey && event.keyCode == 78) event.returnValue = false;       //屏蔽   Ctrl+n
//    if (event.shiftKey && event.keyCode == 121) event.returnValue = false;     //屏蔽   shift+F10
//    if (window.event.srcElement.tagName == "A" && window.event.shiftKey)
//        window.event.returnValue = false;                           //屏蔽   shift   加鼠标左键新开一网页
//    if ((window.event.altKey) && (window.event.keyCode == 115))                           //屏蔽Alt+F4
//    {
//        window.showModelessDialog("about:blank", "", "dialogWidth:1px;dialogheight:1px");
//        return false;
//    }
//}



function Init(myData) {
  var strJson = JSON.parse(myData);
  SetInputValue(strJson);
}

function SetInputValue(strjson, imgAttribute) {
    for (var i = 0; i < strjson.length; i++) {
        if (strjson[i].name == imgAttribute) {
            var imgValue = window.external.setImageSize(strjson[i].value, 800, 800)
            AddImage(imgValue);
        }
        else {

            var element = document.getElementById(strjson[i].name)
            if (element != null && !element.readOnly && strjson[i].value != "") {
                //document.getElementById(strjson[i].name).value = strjson[i].value;

                element.value = strjson[i].value;
               // sleep(50);
               // alert(strjson[i].name + ":" + element.value);
            }

            //$("#" + strjson[i].name).val(strjson[i].value);
        }
    }
}

function SetImage(imgPath, id, size, imgName) {
    if (size != "") {
        var sizeArry = size.split(',');
        var liNode = document.createElement('li');
        liNode.id = "li" + id;
        $('#imgul').append(liNode);
        var imgNode = document.createElement('img');
        imgNode.setAttribute('src', imgPath);
        imgNode.setAttribute('name', 'img');
        imgNode.setAttribute('width', sizeArry[0]);
        imgNode.setAttribute('height', sizeArry[1]);
        $("#li" + id).append(imgNode);
        var imgInput = document.createElement('input');
        //imgInput.style.display="none";
        imgInput.type = "hidden";
        imgInput.name = imgName;
        imgInput.value = imgPath;
        $("#li" + id).append(imgInput);
        var html = "<br><a onclick='DeleteImage(this)' style='color:Red;cursor:hand;text-align:center;'>删除</a><br><br><br>";
        $("#li" + id).append(html);
        var pathArray = imgPath.split('\\');
        imgInput.name = imgName;
        imgInput.value = pathArray[pathArray.length - 1];
    }
}

function SetImageSize() {
    var lst = document.getElementsByTagName('img');
   // alert(lst.length);
    var i = 0;
    for (; i < lst.length; ++i) {
        var ele = lst[i];
        var len = ele.getAttribute("height");
        var wid = ele.getAttribute("width");
        if (null == len || null == wid || wid == 0 || len == 0) {
            continue;
        }
        var scale = len / wid;
        if (wid > 680) {
            wid = 680;
            len = wid * scale;
        }

        if (len > 980) {
            len = 980;
            wid = len / scale;
        }
        ele.setAttribute("width", wid);
        ele.setAttribute("height", len);
    }


}
//初始化页面中的图片
//初始化后端调用initImages方法，并传以','分隔的图片路径，图片名称以'$divId'作为后缀
//如'c://test/imgName1$divId.jpg,c://test/imgName2$divId.jpg'
function initImages(images) {
    if (images) {
        var imagesArray = images.split(','),
	    len = imagesArray.length,
	    temp = '',
	    divId = '';
        for (var i = 0; i < len; i++) {
            temp = imagesArray[i];
            divId = temp.split('$')[1].split('.')[0];
            appendImage(divId, temp);
        }
    }
	
}
//插入图片
function AddImage(divId) {
  var imgValue = window.external.AddImage(divId);
  if (imgValue != "") {
    var sizeArry = imgValue.split(',');
    //src:sizeArry[0],width:sizeArry[2],height:sizeArry[3],DelImgPath:sizeArry[1]
    appendImage(divId,sizeArry[0]);
  }
}
//在给定的容器中增加一个图片
function appendImage(divId,imagePath){
  var html = '<div class="picture-item"><img src="' + imagePath + '"><div class="btn-container"><span class="btn-del-img" delImgPath="' + imagePath + '">删除</span></div></div>';
  var $html = $(html);
  $html.find('.btn-del-img').click(function(){
    var $this = $(this),
    delImgPath = $this.attr('delImgPath');
    if(confirm('确定要删除该图片?')){
      window.external.DeleteImg(delImgPath);
      $this.parent().parent().remove();
    }
  });
  $('#' + divId).append($html);
}
///在json数组中查找具有相同name元素的个数
function FindNumByName(strjson, name) {
    var num = 0;
    for (var i = 0; i < strjson.length; i++) {
        if (strjson[i].name == name) {
            num++;
        }
    }
    return num;
}
function SetListValue(strjson, ListName) {
    var list = $("input[name='" + ListName + "']");
    var n = 0;
    for (var i = 0; i < trjson.length; i++) {
        if (strjson[i].name == ListName) {
            d[n].val(strjson[i].value);
            n++;
        }
    }
}
//table属性数据数组
function GetArrayByName(StrJson, Name) {
    var arr = new Array();
    for (var i = 0; i < StrJson.length; i++) {
        if (StrJson[i].name == Name) {
            {
                arr = StrJson[i].value.split("|");

            }
        }
    }
    return arr;
}
function SetTextAreaAutoGrow()
{
    if ($.fn.TextAreaExpander) {
        jQuery("textarea").TextAreaExpander(72);   // textarea根据文本自动变宽
    }


    	/*textarea宽度调节*/
    	$('.body-textarea').each(function(){
    	  var $this = $(this),
    	      width = $this.width();

    	  $this.width(width - 22);
    	});
    	/*textarea宽度调节*/

    	$.GSForm.autoInputWidth();
}
/*
 * ckeditor的html范例
 * <textarea id="editor" style="height: 500px; width: 100%;"></textarea>
 * 初始化组件的js
 * var editor = CKEDITOR.replace('editor');
 * 实例化后存在变量editor中，下方的三个方法都需要传入实例，因为可能存在一个页面有多个实例的情况，要指定对哪个实例进行操作
 * */
//获取ckeditor的内容，传入的参数为editor实例
function getEditorContent(editor){
  return editor.document.getBody().getHtml();
}
//设置ckeditor的内容，传入的参数为editor实例和要传入的内容
function setEditorContent(editor,content){
  editor.setData(content);
}
//给某个editor插入图片，传入的参数为editor实例
function addimg(editor) {
  var ImagePath = window.external.AddOtherImage();
  if (ImagePath != "") {
    str = "<img src='" + ImagePath + "' data-cke-saved-src='"+ImagePath+"' />";
    editor.document.getBody().appendHtml(str);
  }
}

$(function () {

	jQuery("textarea").TextAreaExpander(72);   // textarea根据文本自动变宽


	/*textarea宽度调节*/
	$('.body-textarea').each(function(){
	  var $this = $(this),
	      width = $this.width();

	  $this.width(width - 22);
	});
	/*textarea宽度调节*/

	//$.GSForm.autoInputWidth();
	//插入图片按钮绑定事件
	$('.btn-add-img').click(function(){
      var $this = $(this),
          target = $this.attr('target');
      AddImage(target);
	});
	//删除图片按钮绑定事件
	$('.btn-del-img').click(function(){
      var $this = $(this),
          delImgPath = $this.attr('delImgPath');
      if(confirm('确定要删除该图片?')){
        window.external.DeleteImg(delImgPath);
        $this.parent().parent().remove();
      }
    });
});
$.GSForm.autoInputWidth();

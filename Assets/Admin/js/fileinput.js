/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 2.4.0
 *
 * File input styled for Bootstrap 3.0 that utilizes HTML5 File Input's advanced 
 * features including the FileReader API. 
 * 
 * The plugin drastically enhances the HTML file input to preview multiple files on the client before
 * upload. In addition it provides the ability to preview content of images, text, videos, audio, html, 
 * flash and other objects.
 * 
 * Author: Kartik Visweswaran
 * Copyright: 2014, Kartik Visweswaran, Krajee.com
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
(function ($) {

    var defaultLayoutTemplates = {
        layout:'<form id="{formid}" class="editableform"><input type="file" id="{filetypeid}" name="{filename}" {multiple}/></form>',
        preview:'<span class="file-input " style="display: block;">'+
                '<div class="file-preview " >'+
                '<div id="{previd}" class="file-preview-thumbnails">'+
                '{previewimg}</div>'+
                '<div class="clearfix"></div>'+
                '<div class="file-preview-status text-center text-success"></div>'+
                '</div>'+
                '</span>',
        errormsg:'<div class="alert alert-warning">'+
                 '<strong>Warning!</strong>'+
                 '{errormsg}'+
                 '<br> </div>'


    };
    var defaultPreviewTemplates = {

        image:'<div id="{previewId}" class="file-preview-frame">'+
              '<div >' +
              '<label class="ace-file-input ace-file-multiple">'+
              '<span class="ace-file-container hide-placeholder selected">'+
              '<span class="ace-file-name">'+
              ' <img style="width:80px;height:80px" src="{imgurl}">'+
              '<i class=" ace-icon fa fa-picture-o file-image"></i>'+
              '</span></span><a href="javascript:void(0)" class="remove file-preview-remove" data-previedid="{datapreviedid}"><i class=" ace-icon fa fa-times"></i></a></label>'+
              ' </div> </div>'

    };
   var uniqId = function () {
        return Math.round(new Date().getTime() + (Math.random() * 100));
    };
   var  isSet = function (needle, haystack) {
        return (typeof haystack == 'object' && needle in haystack);
    };
    var isEmpty = function (value, trim) {
            return value === null || value === undefined || value == []
                || value === '' || trim && $.trim(value) === '';
        }


    var FileInput = function (element, options) {
        this.$element = $(element);

        var self=this;

        //加载预览



        this.init(options);

       this.initPreview();
//        this.listen();
////        if (hasFileAPISupport()) {
////
////        } else {
////            this.$element.removeClass('file-loading');
////        }
    };

    FileInput.prototype = {
        constructor: FileInput,
        init: function (options) {
            var self = this, formidId = "form-" + uniqId(),typefileID="typefile-"+uniqId(),mainprewID="mainprew-"+uniqId();
            self.options = options;

            self.mainprewID=mainprewID;

            self.$element.append(this.getLayoutTemplate("layout").replace(/\{multiple\}/g, self.options.multiple?"multiple":"").replace(/\{formid\}/g, formidId).replace(/\{filetypeid\}/g, typefileID).replace(/\{filename\}/g, self.options.filename));
            self.$filelement=  $("#"+typefileID);
            self.$formelement=$("#"+formidId);
            self.options.allowExt=isEmpty(options.allowExt) ? self.allowExt : options.allowExt;
            self.options.maxSize=isEmpty(options.maxSize) ? self.maxSize : options.maxSize;
            self.$filelement.ace_file_input({

                btn_choose:options.btn_choose,
                btn_change:options.btn_choose,
                no_icon:'ace-icon fa fa-cloud-upload',
                droppable:true,
                allowExt:self.options.allowExt,
                maxSize:self.options.maxSize
                //,icon_remove:null//set null, to hide remove/reset button
                /**,before_change:function(files, dropped) {
						//Check an example below
						//or examples/file-upload.html
						return true;
					}*/
                /**,before_remove : function() {
						return true;
					}*/



            }).on('file.error.ace', function(event, info) {

                    //info.file_count > number of files selected
                    //info.invalid_count > number of invalid files

                    //info.error_count['ext'] > number of files with invalid extension (only if allowExt or denyExt is set)
                    //info.error_count['mime'] > number of files with invalid mime type (only if allowMime or denyMime is set)
                    //info.error_count['size'] > number of files with invalid size (only if maxSize option is set)

                     if(info.error_count['ext'] >0)
                    {
                        self.errorMeag("请选择图片文件");
                    }
                    else if(info.error_count['size'] >0)
                     {
                         self.errorMeag("文件最大为1024kb ，请重新选择");
                     }


                    //info.error_list['mime'] > ...
                    //info.error_list['size'] > ...

                    //info.dropped > true if files have been selected by drag & drop


                    event.preventDefault();
                    //it will reset (empty) file input, i.e. no files selected
                }).on('change', function(){
                    var files = $(this).data('ace_input_files');

                    if(files)
                    {
                        if(options.autoupload)
                        {
                            self.upload();
                        }
                    }


                    //console.log($(this).data('ace_input_files'));
                    //console.log($(this).data('ace_input_method'));
                }) ;

            self.$element.on("click",".file-preview-remove",function(){

                    self.removePreview($(this));


            });
        },
        getLayoutTemplate: function(t) {
            var self = this;
            return isSet(t, self.layoutTemplates) ? self.layoutTemplates[t] : defaultLayoutTemplates[t];
        },
        getPreviewTemplate: function(t) {
            var self = this;
            return isSet(t, self.previewTemplates) ? self.previewTemplates[t] : defaultPreviewTemplates[t];
        },

        refresh: function (options) {
            var self = this, params = (arguments.length) ? $.extend(self.options, options) : self.options;
            self.init(params);
        },
        initPreview: function () {
            var self = this, html = '',  previewId = "preview-" + uniqId();

          //  html += this.getPreviewTemplate("image").replace(/\{previewId\}/g, previewId);

            self.$filelement.parent().parent().append(this.getLayoutTemplate("preview").replace(/\{previewimg\}/g, "").replace(/\{previd\}/g, self.mainprewID));
            if(self.options.interPrewview)
            {
                $(self.options.interPrewview).each(function(i,v){
                  self.addPreview(v);
                })
            }
            self.getPrewviewCount();

        },
        errorMeag:function(msg)
        {
            bootbox.dialog({
                message: this.getLayoutTemplate("errormsg").replace(/\{errormsg\}/g, msg),
                buttons:
                {
                    "success" :
                    {
                        "label" : "<i class='icon-ok'></i> 关闭!",
                        "className" : "btn-sm btn-success"
                    }
                }
            });
        },
        addPreview:function(rs)
        {
            var self=this,previewId = "preview-" + uniqId();

            if(!self.options.multiple)
            {
                self.clearPrwview();
            }


            $("#"+self.mainprewID).append(this.getPreviewTemplate("image").replace(/\{previewId\}/g, previewId).replace(/\{datapreviedid\}/g,previewId).replace(/\{imgurl\}/g, rs.url));
            $("#"+previewId).attr("data-imagename",rs.name);
               self.getPrewviewCount();
               self.saveImgageUrls(rs.name);
        },
        clearPrwview:function()
        {
            this.inputfilechange({"no_file":"你选择了0个文件"});
            $("#"+this.mainprewID).empty();
            $("#"+this.options.urlinputId).val("");

        },
        removePreview:function(ev)
        {
            this.removeImgageUrls( $("#"+ev.attr("data-previedid")).attr("data-imagename"));
            $("#"+ev.attr("data-previedid")).remove();
            this.getPrewviewCount();

        },
        getPrewviewCount:function(){
            var self=this;
            var length=$("#"+self.mainprewID).children(".file-preview-frame").length;
            self.inputfilechange({"no_file":"你选择了"+length+"个文件"});
            if(length<1)
            {
                $("#"+self.mainprewID).parent().hide();
            }
            else{
                $("#"+self.mainprewID).parent().show();
            }

        },
        saveImgageUrls:function(filename)
        {
            var self=this;
            var valurarr;
            var inputvalue=$("#"+self.options.urlinputId).val();
            if(inputvalue!="")
            {
                valurarr=inputvalue.split(",");
            }
            else{
                valurarr=[];

            }
            valurarr.push(filename);
            $("#"+self.options.urlinputId).val(valurarr.join(","));
        },
        removeImgageUrls:function(filename)
        {
            var self=this;
            var valurarr;
            var inputvalue=$("#"+self.options.urlinputId).val();
            if(inputvalue!="")
            {
                valurarr=inputvalue.split(",");
            }
            else{
              return;
            }
            valurarr.remove(filename);
            $("#"+self.options.urlinputId).val(valurarr.join(","));
        },
        inputfilechange:function(options)
        {

            this.$filelement.ace_file_input('update_settings', options);
        },
        upload: function() {
            // ***UPDATE AVATAR HERE*** //
            var self=this;
            var submit_url = self.options.url;//please modify submit_url accordingly
            var deferred = null;




            //if value is empty (""), it means no valid files were selected
            //but it may still be submitted by x-editable plugin
            //because "" (empty string) is different from previous non-empty value whatever it was
            //so we return just here to prevent problems
//         var value = $(avatar).next().find('input[type=hidden]:eq(0)').val();
//
//         if(!value || value.length == 0) {
//             deferred = new $.Deferred
//             deferred.resolve();
//             return deferred.promise();
//         }

            var $form = self.$element.find('.editableform:eq(0)');

            var file_input = $form.find('input[type=file]:eq(0)');
            var pk =self.$element.attr('data-pk');//primary key to be sent to server

            var ie_timeout = null


            if( "FormData" in window ) {

                var formData_object = new FormData();//create empty FormData object

                //serialize our form (which excludes file inputs)
                $.each($form.serializeArray(), function(i, item) {
                    //add them one by one to our FormData
                    formData_object.append(item.name, item.value);
                });
                //and then add files
                formData_object.append('pk', pk);
                $form.find('input[type=file]').each(function(){

                    var files = $(this).data('ace_input_files');
                    self.inputfilechange({"no_file":"你选择了"+files.length+"个文件"});
                    if(files && files.length > 0) {

                        formData_object.append(self.options.filename, files[0]);
                        deferred =  $.ajax({
                            url: submit_url,
                            type: 'POST',
                            processData: false,//important
                            contentType: false,//important
                            dataType: 'json',//server response type
                            data: formData_object,
                            success:function(rs)
                            {
                                self.addPreview(rs);

                            }
                        });
                        for(var i=1;i<files.length;i++)
                        {

                            formData_object.append(self.options.filename, files[i]);
                            deferred=  $.ajax({
                                url: submit_url,
                                type: 'POST',
                                processData: false,//important
                                contentType: false,//important
                                dataType: 'json',//server response type
                                data: formData_object,
                                success:function(rs)
                                {

                                    self.addPreview(rs);
                                }
                            })
                        }
                    }


                });

                //append primary key to our formData



            }
            else {
                self.inputfilechange({"no_file":"你选择了1个文件"});
                deferred = new $.Deferred
                var temporary_iframe_id = 'temporary-iframe-'+(new Date()).getTime()+'-'+(parseInt(Math.random()*1000));
                var temp_iframe =
                    $('<iframe id="'+temporary_iframe_id+'" name="'+temporary_iframe_id+'" \
									frameborder="0" width="0" height="0" src="about:blank"\
									style="position:absolute; z-index:-1; visibility: hidden;"></iframe>')
                        .insertAfter($form);

                $form.append('<input type="hidden" name="temporary-iframe-id" value="'+temporary_iframe_id+'" />');

                //append primary key (pk) to our form
                $('<input type="hidden" name="pk" />').val(pk).appendTo($form);

                temp_iframe.data('deferrer' , deferred);
                //we save the deferred object to the iframe and in our server side response
                //we use "temporary-iframe-id" to access iframe and its deferred object

                $form.attr({
                    action: self.options.url,
                    method: 'POST',
                    enctype: 'multipart/form-data',
                    target: temporary_iframe_id //important
                });

                $form.get(0).submit();

                //     var io = document.getElementById(temporary_iframe_id);
                $("#"+temporary_iframe_id).on('load', function(ev){
                    var  iframe = ev.target;

                    try{
                        var doc = iframe.contentDocument || window.frames[iframe.id].document;
                        if (!doc || !doc.body) {

                            return false;
                        }
                        var response = doc.body.innerHTML;
                        //输出为直接退出

                        var a=jQuery.parseJSON(response);
                        a.isiframe=true;

                        deferred.resolve(a);

                        //   if(response == EMPTY) return false;
//                                $("#"+temporary_iframe_id).attr("deferrer").done(function(response){
//
//                                  //  S.JSON.parse(response)
//                                    alert('asdsdd');
//                                    var a= $.toJSON( response );
//                                    alert( a.name);
//                                })
                    }catch (e){
                        deferred.reject({'status':'fail', 'message':e});
                    }

                });
//                        alert(io);
//                        try
//                        {
//                            xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
//                            xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
//
//                        }catch(e)
//                        {
//                          console.log(e);
//                        }
                //if we don't receive any response after 30 seconds, declare it as failed!
                ie_timeout = setTimeout(function(){
                    ie_timeout = null;
                    temp_iframe.attr('src', 'about:blank').remove();
                    deferred.reject({'status':'fail', 'message':'Timeout!'});
                } , 30000);
            }


            //deferred callbacks, triggered by both ajax and iframe solution
            deferred
                .done(function(result) {

                    if(result.isiframe)
                    {
                        self.addPreview(result);
                    }

//                    if(result.status ==true) $(avatar).get(0).src = result.url;
//                    $("#J_Urls").val(result.name);

//                    bootbox.dialog({
//                        message: "<span class='bigger-110'>文件上传成功</span>",
//                        buttons:
//                        {
//                            "success" :
//                            {
//                                "label" : "<i class='icon-ok'></i> 关闭!",
//                                "className" : "btn-sm btn-success"
//                            }
//                        }
//                    });
                })
                .fail(function(result) {//failure

                    bootbox.dialog({
                        message: "<span class='bigger-110'>文件上传失败</span>",
                        buttons:
                        {
                            "success" :
                            {
                                "label" : "<i class='icon-ok'></i> 关闭!",
                                "className" : "btn-sm btn-success"
                            }
                        }
                    });
                })
                .always(function() {//called on both success and failure
                    if(ie_timeout) clearTimeout(ie_timeout)
                    ie_timeout = null;
                });

            return deferred.promise();
            // ***END OF UPDATE AVATAR HERE*** //
        }

    }


    //FileInput plugin definition
    $.fn.fileinput = function (option) {

        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
                data = $this.data('fileinput'),
                options = typeof option === 'object' && option;

            if (!data) {
                $this.data('fileinput',
                    (data = new FileInput(this, $.extend({}, $.fn.fileinput.defaults, options, $(this).data()))));
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.fileinput.defaults = {
        allowExt:  ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
        maxSize:10000000
    };



})(window.jQuery);
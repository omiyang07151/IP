/**
 * Created with JetBrains PhpStorm.
 * User: X25
 * Date: 14-5-14
 * Time: 下午5:14
 * To change this template use File | Settings | File Templates.
 */


/**
 * s删除单个值
 * @param $id 要删除的Id
 */




$.fn.editable.defaults.mode = 'inline';
$.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-blue'></i></div>";
$.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>'+
    '<button type="button" class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';

$(document).ready(function(){
    CommonUtil.Dateinit();

})

CommonUtil={
   Dateinit:function(){
       $('.datetimepicker').datetimepicker({  format: "YYYY-MM-DD",language: 'zh-CN' }).next().on(ace.click_event, function(){
           $(this).prev().focus();
       });
   },
    GetRandomNum:function(Max,Min,px){
        var Range = Max - Min;
        var Rand = Math.random();
        var redom=Min + Math.round(Rand * Range);
        redom+="_"+new Date().getTime();;
       if(px)
           redom=px+"_"+redom;
        return redom;
    },

    Dailydraggable:function()
    {

    $('#external-events div.external-event').each(function() {

        var now = new Date();
        var randId = 'T'+now.getTime();
        // it doesn't need to have a start or end
        var eventObject = {
            id:randId,
            allDayDefault:false,
            lazyFetching:false,
            title: $.trim($(this).text()), // use the element's text as the event title
            className:"itemid_"+$(this).attr("itemid"),
            datepickerlong:$(this).attr("itemtimelong"),
            color:$(this).attr("itemcolor"),   // an option!
            textColor:'#ffffff'// an option!
        };

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject);

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });

    });

},
   initcalendar:function(divid,option)
    {
    var calendarconfig={
        header: {
            left: 'prev,next 今天',
            center: 'title',
            right: 'agendaWeek,agendaDay'
        },
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        today: ["今天"],
        defaultView: 'agendaWeek',
        allDaySlot:false,

        slotDuration:"00:60:00",
        minTime:"10:00:00",
        editable: true,
        selectable: true,
        selectHelper: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!

        drop: function(date, allDay) { // this function is called when something is dropped

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');
            var now = new Date();
            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);
            var randId = 'T'+now.getTime();
            originalEventObject.id = randId;

            // assign it the date that was reported
            copiedEventObject.start = date;
            //      copiedEventObject.end = date.add(originalEventObject.datepickerlong, 'hours');
            var enddate=date.clone();

            enddate.set('hour', date.hours()+parseInt(originalEventObject.datepickerlong));
            copiedEventObject.end = enddate;

            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);


        }
    }
    for(var tem in option){
        calendarconfig[tem]=option[tem];
    }
    var calender=$(divid).fullCalendar(calendarconfig);
    return calender;
},
    formclear:function(id)
    {
        $(':input','#'+id)
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .removeAttr('checked')
        $('#'+id+" select ").removeAttr("selected");
        $('#'+id+" select option[value='']").attr("selected",true);
    },

    ShowSuccessDailog:function(msg,fn)
    {
        bootbox.dialog({
            message: "<span class='bigger-110'>"+msg+"</span>",
            buttons:
            {
                "success" :
                {
                    "label" : "<i class='icon-ok'></i> 确定!",
                    "className" : "btn-sm btn-success",
                    "callback": function() {
                        if(!fn)
                        {
                            window.location.reload();
                        }
                        else{
                            fn();
                        }

                    }
                }
            }
        });



    },
    ShowErrorDailog:function(msg)
    {
        bootbox.dialog({
            message: "<span class='bigger-110'>"+msg+"</span>",
            buttons:
            {
                "click" :
                {
                    "label" : " 关闭!",
                    "className" : "btn-sm btn-primary"
                }
            }
        });


    },
    ShowconfirmDailog:function(msg,fn,btnname)
    {
        bootbox.confirm(msg, function(result) {
            if(result) {
                fn()
            }
        });
    },
    GetCheckBoxValue:function(name)
    {
        var str="";


        $("input[name='"+name+"']:checked").each(function(){

            if(str!="")
            {
                str+=",";
            }
            str+=$(this).val();
            //alert($(this).val());
        })
        return str;
    }
}
Datasource={
    apirl:"/admin/",
    inittable:function(classname,url,config)
    {
        var tableconfig={
            "bProcessing": true,
            "bServerSide":true,
            "bStateSave": true,
            "iDisplayLength":10,
            "sAjaxSource": url,
            "bFilter":false,
            bSort :false,
            "fnDrawCallback" :function()
            {
                $(".mychecker").click(function(){
                    $(this).children("span").toggleClass("checked");
                    if($(this).children("span").hasClass("checked"))
                    {

                        $(this).children("span").children("input").attr("checked","checked");
                    }
                    else
                    {

                        $(this).children("span").children("input").removeAttr("checked");
                    }
                })
                $("#checkall").click(function(){

                    if($(this).parent().hasClass("checked"))
                    {
                        $(".mychecker").children("span").addClass("checked");
                        $(".mychecker").children("span").children("input").attr("checked","checked");
                    }
                    else
                    {
                        $(".mychecker").children("span").removeClass("checked");
                        $(".mychecker").children("span").children("input").removeAttr("checked");
                    }

                })
            },
            "fnServerData": function ( sSource, aoData, fnCallback ) {
                $.ajax( {
                    "cache": false,
                    "dataType": 'jsonp',
                    jsonp: "callback",
                    "type": "POST",
                    "url": sSource,
                    "data": aoData,
                    "success": fnCallback
                } );
            }



        };
        for(var tem in config){
            tableconfig[tem]=config[tem];
        }
        var oTable = $(classname).dataTable(tableconfig);
        $('table th input:checkbox').on('click' , function(){
            var that = this;
            $(this).closest('table').find('tr > td:first-child input:checkbox')
                .each(function(){
                    this.checked = that.checked;
                    $(this).closest('tr').toggleClass('selected');
                });

        });

        return oTable;
    },

    /*
     第一个参数。要渲染的table的class或者id
     第二个参数。读取数据的url
     第三个参数、table组件的参数配置
     */

    Ordertable:function()
    {

        /*
         第一个参数。要渲染的table的class或者id
         第二个参数。读取数据的url
         第三个参数、table组件的参数配置
         */

        var tabale=this.inittable(".datatable",
            this.apirl+"order/indexdata",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[title]", "value":$('#title').val()});
                },
                "aoColumns":  [

                    { "mDataProp": "order_no" },
                    { "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            return data.aData.product.title;
                        }
                    },
                    { "mDataProp": "room_num",
                        "fnRender": function (data, value, full ) {
                            return value+'间';
                        }
                    },
                    { "mDataProp": "bed_type",
                        "fnRender": function (data, value, full ) {
                            if(value==1){
                                return '大床';
                            }
                            else{
                                return "双床";
                            }
                        }
                    },
                    { "mDataProp": "total_price" },
                    { "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            return data.aData.checkin+'<br>'+data.aData.checkout;
                        }
                    },
                    { "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            return data.aData.linkman+'<br>'+data.aData.linkmobile;
                        }
                    },
                    { "mDataProp": "created" },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            if(data.aData.cancel_flag=='1')
                            {
                                return "<span style='color: #ff0000'>用户取消</span>";
                            }
                            else if(data.aData.status=='1')
                            {
                                return "<span style='color: #9AFF02'>已确认</span>";
                            }
                            else if(data.aData.status=='2')
                            {
                                return "<span style='color: #ff0000'>客服取消</span>";
                            }
                            else if(data.aData.pay_status=='0')
                            {
                                return "<span style='color: #921AFF'>待付款</span>";
                            }
                            else if(data.aData.pay_status=='1')
                            {
                                return "<span style='color: green'>已支付</span>";
                            }
                            //   return '<input type="text" class="userName" value="'+data+'"/>';
                        }
                    },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            return "<button class='btn btn-mini btn-primary' onclick='window.location.href=\"/admin/order/detail/id/"+data.aData.id +"\"'>查看详细</button>&nbsp;";
                        }
                    }
                ]
            })
        return tabale;
    },


    Producttable:function()
    {


        var tabale=this.inittable(".datatable",
            this.apirl+"product/indexdata",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[title]", "value":$("#title").val()});
                },
                "aoColumns":  [
                    {
                        "mDataProp":null,
                        "fnRender": function (data, value, full ) {
                            return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';
                        }
                    },

                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            return data.aData.province_name+'/'+data.aData.city_name;
                        }
                    },
                    { "mDataProp": "title" },
                    { "mDataProp": "hotel_name" },
                    { "mDataProp": "coverimg",
                        "fnRender": function (data, value, full ) {
                            return "<img src='"+value+"' width='120' height='80'/>";

                        }
                    },
                    { "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            return data.aData.market_price+"/"+data.aData.p_price;

                        }
                    },
                    { "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            return data.aData.limit_num+"/"+data.aData.max_num+"/"+data.aData.saled_num;
                        }
                    },
                    { "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            return data.aData.startd+"~<br>"+data.aData.endd;
                        }
                    },
                    { "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            return data.aData.checkin_start+"~<br>"+data.aData.checkin_end;
                        }
                    },
                    {
                        "mDataProp": 'status',
                        "fnRender": function (data, value, full ) {
                            if(value=='0')
                            {
                                return "<span style='color: #ff0000'>未上架</span>";
                            }
                            else
                            {
                                return "<span style='color: green'>已上架</span>";
                            }
                        }
                    },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/admin/product/edit/id/'+data.aData.id+'.html\'">'+
                                '<i class="ace-icon fa fa-pencil bigger-120"></i></button>'+
                                '<button class="btn btn-xs btn-danger"  onclick="removeitem(\''+data.aData.id+'\');">'+
                                ' <i class="ace-icon fa fa-trash-o bigger-120"></i> </button>'+
                                ' </div>';
                            return btmhtml;
                            }
                    }
                ]
            })
        return tabale;


    },
    Usertable:function()
    {

        /*
         第一个参数。要渲染的table的class或者id
         第二个参数。读取数据的url
         第三个参数、table组件的参数配置
         */

        var tabale=this.inittable(".datatable",
            this.apirl+"user/indexdata",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[nickname]", "value":$("#nickname").val()});
                },
                "aoColumns":  [
                    { "mDataProp": "openid" },
                    { "mDataProp": "nickname" },
                    {
                        "mDataProp": "sex",
                        "fnRender":function(data, value, full){
                            if(value==1){
                                return '男';
                            }
                            else{
                                return '女';
                            }
                        }
                    },
                    {
                        "mDataProp": "headimgurl",
                        "fnRender":function(data, value, full){
                            var img='<img style="width:50px;" src="'+value+'"/>';
                            return img;
                        }
                    },
                    { "mDataProp": "created" },
                    //{
                    //    "mDataProp": null,
                    //    "fnRender": function (data, value, full ) {
                    //        var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+
                    //
                    //            '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/user/details/userid/'+data.aData.id+'\'">'+
                    //            '<i class="ace-icon fa fa-pencil bigger-120"></i></button>'+
                    //
                    //            ' </div>';
                    //        return btmhtml;
                    //    }
                    //}
                ]
            })
        return tabale;
    },
    Hoteltable:function()
    {

        /*
         第一个参数。要渲染的table的class或者id
         第二个参数。读取数据的url
         第三个参数、table组件的参数配置
         */

        var tabale=this.inittable(".datatable",
            this.apirl+"hotel/indexdata",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[name]", "value":$("#name").val()});
                },
                "aoColumns":  [
                    { "mDataProp": "province_name" },
                    { "mDataProp": "city_name" },
                    { "mDataProp": "name" },
                    { "mDataProp": "intro" },
                    { "mDataProp": "created" },
                    { "mDataProp": "modified" },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/admin/hotel/edit/id/'+data.aData.id+'.html\'">'+
                                '<i class="ace-icon fa fa-pencil bigger-120"></i></button>'+

                                ' </div>';
                            return btmhtml;
                        }
                    }
                ]
            })
        return tabale;
    },

}


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
    Itemtable:function()
    {

        /*
         第一个参数。要渲染的table的class或者id
         第二个参数。读取数据的url
         第三个参数、table组件的参数配置
         */

        var tabale=this.inittable(".datatable",
            this.apirl+"item/itemlist",
          {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[stylist_name]", "value":$("#stylist_name").val()});
                    aoData.push({ "name": "condition[sl_name]", "value":$("#sl_name").val()});
                    aoData.push({ "name": "condition[item_catlog]", "value":$("#item_catlog").val()});
                },
              "aoColumns":  [
                  {
                      "mDataProp":null,
                      "fnRender": function (data, value, full ) {
                          return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';

                      }
                  },
                  { "mDataProp": "id" },
                  {
                      "mDataProp":"image",
                      "fnRender": function (data, value, full ) {
                          return '<img src="'+value+'" width="50">';
                      }
                  },
                  { "mDataProp": "item_name" },
                  {
                      "mDataProp": "item_catlog",
                      "fnRender":function(data,value,full){

                      if(value=='1')
                      {
                          return "<span style='color: blue'>男士</span>";
                      }
                      else if(value=="2")
                      {
                          return "<span style='color: #ff0000'>女士</span>";
                      }
                  } },
                  { "mDataProp": "sl_name" },
                  { "mDataProp": "stylist_name" },
                  { "mDataProp": "cost" },
                  { "mDataProp": "create_date" },
                  {
                      "mDataProp": 'status',
                      "fnRender": function (data, value, full ) {
                          if(value=='0')
                          {
                              return "<span style='color: green'>正常</span>";
                          }
                          else
                          {
                              return "<span style='color: #ff0000'>冻结</span>";
                          }
                       //   return '<input type="text" class="userName" value="'+data+'"/>';
                      }
                  },
                  {
                      "mDataProp": null,
                      "fnRender": function (data, value, full ) {
                          var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                              '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/item/itemadd/itemid/'+data.aData.id+'\'">'+
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
            this.apirl+"order/orderlist",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[stylist_name]", "value":$("#stylist_name").val()});
                    aoData.push({ "name": "condition[order_no]", "value":$('#order_no').val()});
                    aoData.push({ "name": "condition[order_flag]", "value":$('#order_flag').val()});
                    aoData.push({ "name": "condition[title]", "value":$('#title').val()});

                },
                "aoColumns":  [

                    { "mDataProp": "order_no" },
                    { "mDataProp": "user_name" },
                    { "mDataProp": "sl_name" },
                    { "mDataProp": "stylist_name" },
                    { "mDataProp": "title" },
                    { "mDataProp": "price" },
                    { "mDataProp": "createdate" },
                    { "mDataProp": "order_time" },
                    {
                        "mDataProp": 'order_flag',
                        "fnRender": function (data, value, full ) {
                            if(value=='1')
                            {
                                return "<span style='color: green'>待付款</span>";
                            }
                            else if(value=='2')
                            {
                                return "<span style='color: #ff0000'>取消订单</span>";
                            }
                            else if(value=='3')
                            {
                                return "<span style='color: #921AFF'>已付款</span>";
                            }
                            else if(value=='4')
                            {
                                return "<span style='color: #9AFF02'>已使用</span>";
                            }
                            else if(value=='5')
                            {
                                return "<span style='color: #D94600'>申请退款</span>";
                            }
                            else if(value=='6')
                            {
                                return "<span style='color: #E1E100'>已退款</span>";
                            }
                            else if(value=='7')
                            {
                                return "<span style='color: #ff0000'>超时未支付</span>";
                            }
                            //   return '<input type="text" class="userName" value="'+data+'"/>';
                        }
                    },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            return "<button class='btn btn-mini btn-primary' onclick='window.location.href=\"/manager/order/details/orderid/"+data.aData.id +"\"'>查看详细</button>&nbsp;";
                        }
                    }
                ]
            })
        return tabale;
    },
    Refundtable:function()
    {

        /*
         第一个参数。要渲染的table的class或者id
         第二个参数。读取数据的url
         第三个参数、table组件的参数配置
         */

        var tabale=this.inittable(".datatable",
            this.apirl+"refund/refundlist",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[usname]", "value":$("#usname").val()});
                    aoData.push({ "name": "condition[uscode]", "value":$("#uscode").val()});
                    aoData.push({ "name": "condition[order_no]", "value":$('#order_no').val()});
                    aoData.push({ "name": "condition[refund_no]", "value":$('#refund_no').val()});
                    aoData.push({ "name": "condition[refund_flag]", "value":$('#refund_flag').val()});
                },
                "aoColumns":  [

                    { "mDataProp": "refund_no" },
                    { "mDataProp": "usname" },
                    { "mDataProp": "order_no" },
                    { "mDataProp": "price" },
                    { "mDataProp": "num" },
                    { "mDataProp": "total_fee" },
                    { "mDataProp": "apply_date" },
                    { "mDataProp": "refund_date" },

                    {
                        "mDataProp": 'refund_flag',
                        "fnRender": function (data, value, full ) {
                            if(value=='0')
                            {
                                return "<span style='color: green'>待审核</span>";
                            }
                            else if(value=='1')
                            {
                                return "<span style='color: #ff0000'>已审核</span>";
                            }
                            else if(value=='2')
                            {
                                return "<span style='color: #921AFF'>已退款</span>";
                            }
                            else if(value=='99')
                            {
                                return "<span style='color: #9AFF02'>审核失败</span>";
                            }

                            //   return '<input type="text" class="userName" value="'+data+'"/>';
                        }
                    },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            return "<button class='btn btn-mini btn-primary' onclick='window.location.href=\"/manager/refund/detail/refundid/"+data.aData.id +"\"'>查看详细</button>&nbsp;";

                        }
                    }
                ]
            })
        return tabale;
    },
    TopSalontable:function()
    {

        /*
         第一个参数。要渲染的table的class或者id
         第二个参数。读取数据的url
         第三个参数、table组件的参数配置
         */

        var tabale=this.inittable(".datatable",
            this.apirl+"top/salonList",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[title]", "value":$("#title").val()});
                    aoData.push({ "name": "condition[startdate]", "value":$("#startdate").val()});
                    aoData.push({ "name": "condition[enddate]", "value":$('#enddate').val()});
                },
                "aoColumns":  [
                    {
                        "mDataProp":null,
                        "fnRender": function (data, value, full ) {
                            return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';

                        }
                    },
                    { "mDataProp": "city_name" },
                    { "mDataProp": "title" },
                    { "mDataProp": "logo", "fnRender": function (data, value, full ) {
                        return "<img src='"+value+"' style='width:30px;height:30px;'>";
                    }},
                    { "mDataProp": "sort" },
                    { "mDataProp": "startdate"},
                    { "mDataProp": "enddate" },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/top/salonadd/id/'+data.aData.id+'\'">'+
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
    Jobtable:function(){

        var tabale=this.inittable(".datatable",
            this.apirl+"job/joblist",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[brandName]", "value":$("#brandName").val()});

                },
                "aoColumns":  [
                    {
                        "mDataProp":null,
                        "fnRender": function (data, value, full ) {

                            return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';
                        }
                    },

                    { "mDataProp": "shop_name" },
                    { "mDataProp": "job_name" },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/job/jobadd/jobid/'+data.aData.id+'\'">'+
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
    Shoptable:function()
    {

        var tabale=this.inittable(".datatable",
            this.apirl+"shop/shoplist",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[shopName]", "value":$("#shopName").val()});
                },
                "aoColumns":  [
                    {
                        "mDataProp":null,
                        "fnRender": function (data, value, full ) {
                            return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';

                        }
                    },
                    { "mDataProp": "id" },
                    { "mDataProp": "shopName" },
                    { "mDataProp": "shopAddress" },
                    { "mDataProp": "shopPhone" },
                    { "mDataProp": "shopGoway" },
                    { "mDataProp": "shophotcount" },
                    //  <td>  "<img   src= "/assets/img/userImg/".$value." >" style='width:40px'' >";</td>

                    {
                        "mDataProp": 'show_flg',
                        "fnRender": function (data, value, full ) {
                            if(value=='0')
                            {
                                return "<span style='color: #ff0000'>不显示</span>";
                            }
                            else
                            {
                                return "<span style='color: green'>显示</span>";
                            }
                            //   return '<input type="text" class="userName" value="'+data+'"/>';
                        }
                    },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/shop/shopadd/shopid/'+data.aData.id+'\'">'+
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


    /**
     * 发型师
     * @returns {*}
     * @constructor
     */

    Stylisttable:function()
    {

        var tabale=this.inittable(".datatable",
            this.apirl+"stylist/stylistlist",
            {               "fnServerParams": function ( aoData ) {
                   aoData.push({ "name": "condition[haisName]", "value":$("#haisName").val()});
                aoData.push({ "name": "condition[haisJob]", "value":$("#haisJob").val()});
                },
                "aoColumns":  [
                    {
                        "mDataProp":null,
                        "fnRender": function (data, value, full ) {
                            return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';
                        }
                    },

                    { "mDataProp": "haisName" },
                    { "mDataProp": "haisJob" },
                    { "mDataProp": "haisWorkhous" },
                    { "mDataProp": "haisZYBJ" },

                    { "mDataProp": "createdate" },
                    {
                        "mDataProp": 'status',
                        "fnRender": function (data, value, full ) {
                            if(value=='0')
                            {
                                return "<span style='color: green'>正常</span>";
                            }
                            else
                            {
                                return "<span style='color: #ff0000'>冻结</span>";
                            }

                        }
                    },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/stylist/stylistadd/stylistid/'+data.aData.id+'\'">'+
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


    /**
     *  品牌信息
     * @returns {*}
     * @constructor
     */

    Brandtable:function()
    {


        var tabale=this.inittable(".datatable",
            this.apirl+"brand/brandlist",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[brandName]", "value":$("#brandName").val()});

                },
                "aoColumns":  [
                    {
                        "mDataProp":null,
                        "fnRender": function (data, value, full ) {

                            return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';
                        }
                    },

                    { "mDataProp": "brandName" },
                    { "mDataProp": "brandDes" },
                    { "mDataProp": "brandLogoUrl" ,
                        "fnRender": function (data, value, full ) {
                            return "<img src='"+value+"' width='120' height='60'/>";

                        }
                    },
                    { "mDataProp": "createdate" },
                    {
                        "mDataProp": 'status',
                        "fnRender": function (data, value, full ) {
                            if(value=='0')
                            {
                                return "<span style='color: green'>正常</span>";
                            }
                            else
                            {
                                return "<span style='color: #ff0000'>冻结</span>";
                            }

                        }
                    },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/brand/brandadd/brandid/'+data.aData.id+'\'">'+
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

    Producttable:function()
    {


        var tabale=this.inittable(".datatable",
            this.apirl+"product/productlist",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[proName]", "value":$("#proName").val()});
                    aoData.push({ "name": "condition[brandid]", "value":$("#brandid").val()});
                },
                "aoColumns":  [
                    {
                        "mDataProp":null,
                        "fnRender": function (data, value, full ) {
                            return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';
                        }
                    },

                    { "mDataProp": "proName" },
                    { "mDataProp": "proPicUrl",
                        "fnRender": function (data, value, full ) {
                            return "<img src='"+value+"' width='120' height='80'/>";

                        }
                    },
                    { "mDataProp": "proStandard" },
                    { "mDataProp": "proFunction" },
                    {
                        "mDataProp": 'status',
                        "fnRender": function (data, value, full ) {
                            if(value=='0')
                            {
                                return "<span style='color: green'>正常</span>";
                            }
                            else
                            {
                                return "<span style='color: #ff0000'>冻结</span>";
                            }

                        }
                    },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/product/productadd/productid/'+data.aData.id+'\'">'+
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
    Bannertable:function()
    {


        var tabale=this.inittable(".datatable",
            this.apirl+"banner/bannerlist",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[title]", "value":$("#title").val()});
                    aoData.push({ "name": "condition[startdate]", "value":$("#startdate").val()});
                    aoData.push({ "name": "condition[enddate]", "value":$("#enddate").val()});
                },
                "aoColumns":  [
                    {
                        "mDataProp":null,
                        "fnRender": function (data, value, full ) {
                            return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';
                        }
                    },

                    { "mDataProp": "bannerimgurl"  ,
                        "fnRender": function (data, value, full ) {
                            return "<img src='"+value+"' width='120' height='60'/>";

                        }},
                    { "mDataProp": "bannertitle" },
                    { "mDataProp": "urlType" ,
                        "fnRender": function (data, value, full ) {
                            switch(value){
                                case "1": return "外部链接";break;
                                case "2": return "造型";break;
                                case "3": return "沙龙";break;
                                case "4": return "活动";break;
                                case "5": return "随便逛逛";break;
                            }
                        }
                    },
                    { "mDataProp": "bannerurl" },
                    { "mDataProp": "startdate" },
                    { "mDataProp": "enddate" },
                    { "mDataProp": "createdate" },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/banner/edit/bannerid/'+data.aData.id+'\'">'+
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
    Seckilltable:function()
    {


        var tabale=this.inittable(".datatable",
            this.apirl+"seckill/seckilllist",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[is_salled]", "value":$("#is_salled option:selected").val()});
                    aoData.push({ "name": "condition[seckill_start]", "value":$("#seckill_start").val()});
                    aoData.push({ "name": "condition[seckill_end]", "value":$("#seckill_end").val()});
                },
                "aoColumns":  [
                    {
                        "mDataProp":null,
                        "fnRender": function (data, value, full ) {
                            return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';

                        }
                    },

                    { "mDataProp": "seckill_img"  ,
                        "fnRender": function (data, value, full ) {
                            return "<img src='"+value+"' width='120' height='60'/>";

                        }},
                    { "mDataProp": "sl_name" },

                    { "mDataProp": "top_flag" ,
                        "fnRender": function (data, value, full ) {
                            switch(value){
                                case "0": return "普通显示";break;
                                case "1": return "首页置顶";break;
                            }
                        }
                    },

                    { "mDataProp": "seckill_start" },
                    { "mDataProp": "seckill_end" },
                    { "mDataProp": "createdate" },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/seckill/edit/seckillid/'+data.aData.id+'\'">'+
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
    Eventtable:function()
    {


        var tabale=this.inittable(".datatable",
            this.apirl+"events/eventslist",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[startdate]", "value":$("#startdate").val()});
                    aoData.push({ "name": "condition[enddate]", "value":$("#enddate").val()});
                    aoData.push({ "name": "condition[title]", "value":$("#title").val()});

                },
                "aoColumns":  [
                    {
                        "mDataProp":null,
                        "fnRender": function (data, value, full ) {
                            return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';
                        }
                    },

                    { "mDataProp": "city_name" },
                    { "mDataProp": "title" },
                    { "mDataProp": "prize" },
                    { "mDataProp": "prize_total_amount" },
                    { "mDataProp": "startdate" },
                    { "mDataProp": "enddate" },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/events/edit/eventid/'+data.aData.id+'\'">'+
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
    ServiceTable:function()
    {

        /*
         第一个参数。要渲染的table的class或者id
         第二个参数。读取数据的url
         第三个参数、table组件的参数配置
         */

        var tabale=this.inittable(".datatable",
            this.apirl+"service/indexData",
            {
//                "fnServerParams": function ( aoData ) {
//                    aoData.push({ "name": "condition[title]", "value":$("#title").val()});
//                    aoData.push({ "name": "condition[startdate]", "value":$("#startdate").val()});
//                    aoData.push({ "name": "condition[enddate]", "value":$('#enddate').val()});
//                },
                "aoColumns":  [
                    {
                        "mDataProp":null,
                        "fnRender": function (data, value, full ) {
                            return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';

                        }
                    },
                    { "mDataProp": "name" },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/service/add/id/'+data.aData.id+'\'">'+
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
    BusinesszoneTable:function()
    {


        /*
         第一个参数。要渲染的table的class或者id
         第二个参数。读取数据的url
         第三个参数、table组件的参数配置
         */

        var tabale=this.inittable(".datatable",
            this.apirl+"businesszone/zonelist",
            {
                "fnServerParams": function ( aoData ) {
                    aoData.push({ "name": "condition[city_id]", "value":$("#city_id_city").val()});

                },
                "aoColumns":  [
                    {
                        "mDataProp":null,
                        "fnRender": function (data, value, full ) {
                            return '<label><input type="checkbox" class="ace" name="deleteid"   value="'+data.aData.id+'" ><span class="lbl"></span></label>';

                        }
                    },
                    { "mDataProp": "city_name" },
                    { "mDataProp": "zone_name" },
                    { "mDataProp": "sort" },
                    { "mDataProp": "createdate" },
                    {
                        "mDataProp": null,
                        "fnRender": function (data, value, full ) {
                            var btmhtml='<div class="visible-md visible-lg hidden-sm hidden-xs btn-group">'+

                                '<button class="btn btn-xs btn-info" onclick="window.location.href=\'/manager/businesszone/edit/id/'+data.aData.id+'\'">'+
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
    }
}


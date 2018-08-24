var os = '';
var cookieIS = '';
var flashIs = '';
function f() {
    var h = 0;
    var fV = 0;
    var fs = $('#client-flash');
    var swf = '';
    if (window.attachEvent) {
        swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (swf) {
            h = 1;
            fV = swf.GetVariable("$version")
        }
    } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
            swf = navigator.plugins["Shockwave Flash"];
            if (swf) {
                h = 1;
                fV = swf.description.split(" ")
            }
        }
    }
    if (h) {
        fs.text(fV);
        flashIs = fV
    } else {
        fs.text('未安装');
        flashIs = '未安装'
    }
}
function i() {
    var o = navigator.platform;
    os = o;
    if (o) {
        $("#client-system").html(o)
    } else {
        $("#client-system").html('Other')
    }
    var c = navigator.cookieEnabled;
    if (c === true) {
        cookieIS = 'on';
        $('#client-cookie').html('开启')
    } else {
        cookieIS = 'off';
        $('#client-cookie').html('关闭')
    }
}
i();
f();
new $.zui.Messager('正在进行网络检测，请稍候。',{
    type: 'info',
    time: 5000,
    icon: 'bell',
    placement: 'center'
}).show();

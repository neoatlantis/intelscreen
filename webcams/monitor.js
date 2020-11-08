import { newDate } from "./monitor.time.js";



var slotsCount = 6;
var monitorsCount = monitors.length;
var touseSlot = 0;

/****************************************************************************/
/* Backend Cache Controllers
 *
 * Images displayed are cached in backend. They are not requested upon every
 * display, only when its cache life expired.
 */

function resolveUrl(url){
    const now = newDate();

    var day = now.getDate(),
        month = now.getMonth() + 1,
        year = now.getFullYear();
    var hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();
    var utcday = now.getUTCDate(),
        utcmonth = now.getUTCMonth() + 1,
        utcyear = now.getUTCFullYear(),
        utchour = now.getUTCHours(),
        utcminute = now.getUTCMinutes(),
        utcsecond = now.getUTCSeconds();

    var timezoneOffset = -1 * now.getTimezoneOffset(),
        timezoneSign = (timezoneOffset >= 0 ? '+': '-'),
        timezoneHour = Math.floor(timezoneOffset / 60),
        timezoneMinute = timezoneOffset - 60 * timezoneHour;

    console.log(url);
    url = url
        .replace("{yyyy}", year) 
        .replace("{mm}", rjust2(month))
        .replace("{dd}", rjust2(day))
        .replace("{HH}", rjust2(hour))
        .replace("{MM}", rjust2(minute))
        .replace("{SS}", rjust2(second))
        .replace("{MM/10}", rjust2(Math.floor(minute/10) * 10))

        .replace("{UTCyyyy}", utcyear) 
        .replace("{UTCmm}", rjust2(utcmonth))
        .replace("{UTCdd}", rjust2(utcday))
        .replace("{UTCHH}", rjust2(utchour))
        .replace("{UTCMM}", rjust2(utcminute))
        .replace("{UTCSS}", rjust2(utcsecond))

        .replace("{UTCHH/6}", rjust2(Math.floor(utchour/6) * 6))
        .replace("{UTCMM/10}", rjust2(Math.floor(utcminute/10) * 10))
    ;
    console.log(url);

    return url;
}

function cacheGenerate(){
    var imagebox, life, now = (newDate().getTime());
    for(var id=0; id<monitors.length; id++){
        imagebox = $('<span>', { id: 'cacheimage-' + id })
            .addClass('cacheimage')
            .data('url', monitors[id].url)
            .data('title', monitors[id].title)
            .data('life', (monitors[id].life || 600) * 1000)
            .data('nextupdate', 0)
            .appendTo('#cache')
        ;

        $('<img>')
            .addClass('cached')
            .attr("style", monitors[id].css || "")
            .css({
                'height': imageHeight + ' px',
                'width': imageWidth + ' px',
            })
            .hide()
            .on('load', function(){
                $(this).show().parent().find('.loading').hide() ;
            })
            .on('error', function(){
                console.log('Error loading:', $(this).parent().data('url'));
                $(this).parent()
                    .data('nextupdate', now + 15000)
                    .find('.loading').show()
                ;
            })
            .appendTo(imagebox)
        ;
        $('<img>', { 'alt': 'Loading', 'src': 'loading.png' })
            .css({
                'height': imageHeight + ' px',
                'width': imageWidth + ' px',
            })
            .addClass('loading').appendTo(imagebox)
        ;
    }
}

function cacheRefresh(){
    /* manage cached image, and review if any of them shall be reloaded */
    var now = newDate().getTime();
    $('.cacheimage').each(function(){
        if($(this).data('nextupdate') >= now) return;
        $(this)
            .data('nextupdate', now + $(this).data('life'))
            .find('.loading')
                .show()
                .parent()
            .find('.cached')
                .attr('src', resolveUrl($(this).data('url') + '?_' + now))
                .hide()
        ;
    });
}

function fetchCacheImage(targetSelector){
    // fetch the first cached image and fill into target
    return $('#cache .cacheimage:first').detach().appendTo(targetSelector);
}

function recycleCacheImage(targetSelector){
    // detach cache image and put to cache again
    $(targetSelector).find('.cacheimage').detach().appendTo('#cache');
}

/****************************************************************************/

function getBrowserSize() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return [myWidth, myHeight];
}

function allocate(slotID){
    var to = '#' + slotID;
    recycleCacheImage(to);
    
    var fillImage = fetchCacheImage(to);
    var title = fillImage.data('title');
    $(to + ' .title').html(title);
}

function setMonitor(d){  
    if(d == undefined) d = 1;
    if(touseSlot >= slotsCount) touseSlot = 0;
    if(touseSlot < 0) touseSlot = slotsCount - 1;
    allocate('monitor-' + touseSlot);
    touseSlot += d;
}

function rjust2(i){
    i = i.toString();
    return '00'.slice(0, 2-i.length) + i;
}

function setNowtimeSlow(){
    var now = newDate();
    var day = now.getDate(),
        month = now.getMonth() + 1,
        year = now.getFullYear();
    var hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();
    var timezoneOffset = -1 * now.getTimezoneOffset(),
        timezoneSign = (timezoneOffset >= 0 ? '+': '-'),
        timezoneHour = Math.floor(timezoneOffset / 60),
        timezoneMinute = timezoneOffset - 60 * timezoneHour;
    $('.year').text(year);
    $('.month').text(rjust2(month));
    $('.day').text(rjust2(day));
    $('.hour').text(rjust2(hour));
    $('.minute').text(rjust2(minute));
    $('.second').text(rjust2(second));
    $('.tzsign').text(timezoneSign);
    $('.tzhour').text(rjust2(timezoneHour));
    $('.tzminute').text(rjust2(timezoneMinute));
}

function setNowtimeFast(){  
    var c = Math.floor(newDate().getMilliseconds() / 10).toString();
    $('.centisecond').text('00'.slice(0, 2-c.length) + c);
}

function initializeMonitors(){
    var size = getBrowserSize();
    var windowWidth = size[0],
        windowHeight = size[1];

    var colCount = Math.floor(windowWidth / imageWidth);
    if(colCount < 1) colCount = 1;
    var rowCount = Math.floor(windowHeight / imageHeight);
    if(rowCount < 1) rowCount = 1;
    console.debug(windowWidth, windowHeight, colCount, rowCount);

    slotsCount = rowCount * colCount;
    if(slotsCount > monitorsCount) slotsCount = monitorsCount;

    for(var i=0; i < monitorsCount; i++){
        var monitorID = "monitor-" + i;
        
        if($('#' + monitorID).length < 1){
            var newbox = $('<div>',{id: monitorID}).addClass('monitor-box') ;
            $('<div>').addClass('title').appendTo(newbox);
            newbox.appendTo('#monitors');
        }

        if(i < slotsCount){
            $('#' + monitorID).show();
        } else {
            $('#' + monitorID).hide();
            recycleCacheImage('#' + monitorID);
        }

        setMonitor();
    }
}

$(function(){
    cacheGenerate();
    setInterval(cacheRefresh, 5000);
    cacheRefresh();

    initializeMonitors();
    $(window).on('resize', function(){
        setTimeout(initializeMonitors, 500);
    });
    setInterval(setMonitor, refreshInterval);

    //setInterval(setNowtimeFast, 50);
    setInterval(setNowtimeSlow, 500);
    setNowtimeFast();
    setNowtimeSlow();
});



$(document).bind("mousewheel", function(e){
    if(e.originalEvent.ctrlKey) return;
    const delta = e.originalEvent.wheelDelta;

    for(let i=0; i<Math.abs(delta / 120); i++){
        setMonitor((delta > 0 ? 1 : -1));
    }

    e.preventDefault();
});

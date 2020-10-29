var slotsCount = 6;
var monitorsCount = monitors.length;
var touseSlot = 0;

/****************************************************************************/
/* Backend Cache Controllers
 *
 * Images displayed are cached in backend. They are not requested upon every
 * display, only when its cache life expired.
 */

function cacheGenerate(){
    var imagebox, life, now = (new Date().getTime());
    for(var id=0; id<monitors.length; id++){
        imagebox = $('<span>', { id: 'cacheimage-' + id })
            .addClass('cacheimage')
            .data('url', monitors[id].url)
            .data('title', monitors[id].title)
            .data('life', (monitors[id].life || 300) * 1000)
            .data('nextupdate', 0)
            .appendTo('#cache')
        ;

        $('<img>')
            .addClass('cached')
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
    var now = new Date().getTime();
    $('.cacheimage').each(function(){
        if($(this).data('nextupdate') >= now) return;
        $(this)
            .data('nextupdate', now + $(this).data('life'))
            .find('.loading')
                .show()
                .parent()
            .find('.cached')
                .attr('src', ($(this).data('url') + '?' + now))
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

function setMonitor(){  
    if(touseSlot >= slotsCount) touseSlot = 0;
    allocate('monitor-' + touseSlot);
    touseSlot++;
}

function setNowtimeSlow(){
    var now = new Date();
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
    function rjust2(i){
        i = i.toString();
        return '00'.slice(0, 2-i.length) + i;
    }
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
    var c = Math.floor(new Date().getMilliseconds() / 10).toString();
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

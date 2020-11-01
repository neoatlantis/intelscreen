var imageWidth = 400, imageHeight = 300;
var refreshInterval = 15000;
var monitors = [
//////////////////////////////////////////////////////////////////////////////

{
    "title": "Zwinger Palace",
    "city": "Dresden",
    "country": "de",
    "url": "http://www.softed.de/webcam/zwinger.jpg",
    "life": 60,
},

/*{
    "title": "Old Faithful #1",
    "city": "Yellowstone",
    "country": "us",
    "url": "http://www.nps.gov/webcams-yell/oldfaithvc.jpg",
    "life": 60,
},

{
    "title": "Oregon State University",
    "city": "Corvallis",
    "country": "us",
    "url": "http://webcam.oregonstate.edu/cam/hmsc/live/live.jpg",
},*/

/*{
    "title": "World AQI Index",
    "url": "http://lab.neoatlantis.org/aqimap.png",
    "life": 600,
},*/

{
    "title": "Aurora Forecast",
    "city": "N/A",
    "country": "N/A",
    "url": "https://services.swpc.noaa.gov/images/animations/ovation/north/latest.jpg",
    "life": 600,
},

{
    "title": "Estimated Planetary K Index",
    "url": "http://services.swpc.noaa.gov/images/planetary-k-index.gif",
    "life": 1800,
},

{
    "title": "Sun Magnetogram Colorized",
    "url": "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMIBC.jpg",
    "life": 120,
},

{
    "title": "Sun Intensitygram",
    "url": "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMII.jpg",
    "life": 120,
},

{
    "title": "Europe Lightning",
    "url": "https://www.blitzortung.org/en/History/{yyyy}/{mm}/{dd}/{UTCHH}/{MM/10}/image_b_eu.png",
    "css": "background-image: url('https://www.blitzortung.org/en/History/Backgrounds/image_b_eu.png'); background-size: 100%;",
    "life": 600,
},

{
    "title": "Central Europe Lightning",
    "url": "https://www.blitzortung.org/en/History/{yyyy}/{mm}/{dd}/{UTCHH}/{MM/10}/image_b_de.png",
    "css": "background-image: url('https://www.blitzortung.org/en/History/Backgrounds/image_b_de.png'); background-size: 100%;",
    "life": 600,
},

/*{
    "title": "FMI - Hankasalmi",
    "url": "http://aurora.fmi.fi/public_service/latest_SIR_AllSky.jpg",
    "life": 300,
},*/

{
    "title": "Himawari-8 East China",
    "url": "http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/himawari-8_band_13_sector_05.gif",
    "life": 900,
},

{
    "title": "KMA East Asia Analysis",
    "url": "http://web.kma.go.kr/repositary/image/cht/img/sfc3_{UTCyyyy}{UTCmm}{UTCdd}{UTCHH/6}.png",
    "life": 600,
},

{
    "title": "JMA Typhoons",
    "url": "http://www.jma.go.jp/jp/typh/images/wide/all-00.png",
    "life": 900,
},

{
    "title": "Weather Warning Europe",
    "url": "http://www.unwetterzentrale.de/images/map/europe_index.png",
    "life": 180,
},

{
    "title": "Weather Germany",
    "city": "N/A",
    "country": "N/A",
    "url": "http://www.dwd.de/DWD/wetter/aktuell/deutschland/bilder/wx_deutschland.jpg",
    "life": 900,
},

{
    "title": "Weather Warning Germany",
    "url": "http://www.unwetterzentrale.de/images/map/deutschland_index.png",
    "life": 180,
},

{
    "title": "Weather Saxony",
    "url": "http://www.dwd.de/DWD/wetter/aktuell/deutschland/bilder/wx_thu_akt.jpg",
    "life": 900,
},

{
    "title": "Weather Hessen",
    "url": "http://www.dwd.de/DWD/wetter/aktuell/deutschland/bilder/wx_hes_akt.jpg",
    "life": 900,
},

/*{
    "title": "Himawari-8",
    "url": "http://lab.neoatlantis.org/h8color-taiwan.jpg",
    "life": 600,
},*/

{
    "title": "Weather Europe Now",
    "url": "http://www.dwd.de/DWD/wetter/wv_allg/europa/bilder/vhs_euro_heute.jpg",
    "life": 900,
},

{
    "title": "Weather Europe +1d",
    "url": "http://www.dwd.de/DWD/wetter/wv_allg/europa/bilder/vhs_euro_morgen.jpg",
    "life": 1800,
},

{
    "title": "Weather Europe +2d",
    "url": "http://www.dwd.de/DWD/wetter/wv_allg/europa/bilder/vhs_euro_uebermorgen.jpg",
    "life": 1800,
},

{
    "title": "Offenbach West DWD Camera",
    "url": "https://opendata.dwd.de/weather/webcam/Offenbach-W/Offenbach-W_latest_640.jpg",
    "life": 600,
},

{
    "title": "Dresden Altstadt",
    "url": "http://allthos.de/lions/dresden.jpg",
    "life": 300,
},

{
    "title": "Volcano - Popocatepetel",
    "url": "http://www.cenapred.unam.mx/images/popo1.jpg",
    "life": 120,
},

/*{
    "title": "Switzerland Weather",
    "url": "http://lab.neoatlantis.org/swiss-weather.jpg",
    "life": 900,
},

{
    "title": "Current Twitter Trends",
    "url": "http://lab.neoatlantis.org/twitterwc.png",
    "life": 120,
},

{
    "title": "Currency EUR-CNY(via OER) -7d",
    "url": "http://lab.neoatlantis.org/eur_7d.png",
    "life": 1200,
},

{
    "title": "Currency EUR-CNY(via OER) -12h",
    "url": "http://lab.neoatlantis.org/eur_12h.png",
    "life": 1200,
}*/

{
    "title": "Currency EUR-CNY 7d",
    "url": "https://www.google.com/finance/chart?espv=2&q=CURRENCY:EURCNY&tkr=1&p=7d&chst=vkc&chs=600x400&chsc=2",
    "life": 600,
    "css": "filter:invert(100%);"
},

{
    "title": "Twitter Trends Germany",
    "url": "http://intelscreen.neoatlantis.org/twitter/germany.png",
    "life": 300,
},

//////////////////////////////////////////////////////////////////////////////
];

var imageWidth = 400, imageHeight = 300;
var refreshInterval = 15000;
var monitors = [
//////////////////////////////////////////////////////////////////////////////
/*{
    "title": "Elbe River",
    "city": "Dresden",
    "country": "de",
    "url": "http://web.dlz-it.de/ftp/wsa-dd/dresden.jpg",
    "life": 60,
},*/

{
    "title": "Frauenkirche #1",
    "city": "Dresden",
    "country": "de",
    "url": "http://www.frauenkirche.de/webcams/img.php?12&",
    "life": 60,
},

/*{
    "title": "Frauenkirche #2",
    "city": "Dresden",
    "country": "de",
    "url": "http://www.frauenkirche.de/webcams/img.php?22&",
    "life": 60,
},

{
    "title": "Frauenkirche #3",
    "city": "Dresden",
    "country": "de",
    "url": "http://www.frauenkirche.de/webcams/img.php?32&",
    "life": 60,
},*/

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

/*{
    "title": "FMI - Kevo",
    "city": "Kevo",
    "country": "fi",
    "url": "http://aurora.fmi.fi/public_service/latest_KEV.jpg",
    "life": 300,
},

{
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

//////////////////////////////////////////////////////////////////////////////
];

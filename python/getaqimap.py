#!/usr/bin/env python

from math import *
import requests
import json
from PIL import Image, ImageDraw


def colorscale(aqi):
    if aqi <= 50:
        return "#00e400"
    elif aqi <= 100:
        return "#ff0"
    elif aqi <= 150:
        return "#ff7e00"
    elif aqi <= 200:
        return "#ff0000"
    elif aqi <= 300:
        return "#99004c"
    else:
        return "#7e0023"


baseim = Image.open('world600x400.png')
width, height = baseim.size
wpgrade, hpgrade = width / 360.0, height / 180.0 # how many pixels per grade
canvas = ImageDraw.Draw(baseim)

r = requests.get('https://wind.waqi.info/mapq/bounds/?bounds=0,0,89,179')
#r = requests.get('https://wind.waqi.info/mapq/bounds/?bounds=-89,-179,89,179')
if not r.status_code == 200:
    print "Error: %d" % r.status_code
    exit()

try:
    j = r.json()
except:
    print r.text
    exit()

for each in j:
    try:
        v = float(each["aqi"])
    except:
        continue
    lat = float(each["lat"])
    lng = float(each["lon"])

    cx = (lng + 180.0) * wpgrade
    cy = height - (lat + 90.0) * hpgrade

    x0 = cx - 0.5 * wpgrade
    x1 = x0 + wpgrade
    y0 = cy - 0.5 * hpgrade
    y1 = cy + hpgrade

    canvas.ellipse([x0, y0, x1, y1], fill=colorscale(v))


baseim.show()

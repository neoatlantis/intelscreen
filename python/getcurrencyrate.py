#!/usr/bin/env python

import sys
from screenshot_webpage import getScreenshot

try:
    outputpath = sys.argv[1]
except:
    print "Usage: python getcurrencyrate.py <output path>"
    exit()

url = 'http://www.xe.com/de/currencycharts/?from=EUR&to=CNY'
try:
    outputpath = sys.argv[1]
except:
    print "Usage: python getchinaradar.py <output path>"
    exit()

def finder(browser):
    return browser.find_element_by_id('rates_detail')

getScreenshot(url, finder, outputpath)

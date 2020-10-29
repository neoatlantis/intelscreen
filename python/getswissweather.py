#!/usr/bin/env python

import os
import sys
from screenshot_webpage import getScreenshot

try:
    outputpath = sys.argv[1]
except:
    print "Usage: python geth8image.py <output path>"
    exit()

def finder(browser):
    return browser.find_element_by_id('WetterKarteModuleCountryMap')


getScreenshot(
    "http://meteonews.ch/de/",
    finder,
    outputpath,
    windowSize=(1366, 768)
)

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
    return browser.find_element_by_id('im')


getScreenshot(
    "http://www.cwb.gov.tw/V7/observe/satellite/Sat_EA.htm",
    finder,
    outputpath 
)

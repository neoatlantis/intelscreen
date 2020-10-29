#!/usr/bin/env python

import os
import sys
from screenshot_webpage import getScreenshot

try:
    outputpath = sys.argv[1]
except:
    print "Usage: python getchinaradar.py <output path>"
    exit()

def finder(browser):
    return browser.find_element_by_id('imgpath')

url = lambda i: 'http://m.nmc.cn/publish/radar/%s.html' % i
def output(i):
    global outputpath
    name, ext = os.path.splitext(outputpath)
    return name + '-' + i + ext

download = lambda i: getScreenshot(url(i), finder, output(i))

download('chinaall')
download('dongbei')
download('huabei')
download('huadong')

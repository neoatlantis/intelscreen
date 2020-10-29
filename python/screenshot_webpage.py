#!/usr/bin/env python

import os
import StringIO
from selenium import webdriver
from PIL import Image

def getScreenshot(url, finder, saveto, **args):
    windowSize = (600,1366)
    if args.has_key('windowSize'):
        windowSize = args['windowSize']
        del args['windowSize']

    browser = webdriver.PhantomJS('/usr/bin/phantomjs', **args)
    browser.set_window_size(*windowSize)

    try:
        print "Getting page: %s" % url
        browser.get(url)

        print "Locating target..."
        target = finder(browser)
        #target = browser.find_element_by_id('imgpath')

        # take screenshot
        tl = target.location
        ts = target.size

        points = [
            int(tl['x']),
            int(tl['y']),
            int(tl['x'] + ts['width']),
            int(tl['y'] + ts['height']),
        ]

        full = Image.open(StringIO.StringIO(browser.get_screenshot_as_png()))
        img = full.crop(points)

        print "Successfully retrieved image. Saving."

        newimg = Image.new("RGB", img.size, (255,255,255))
        newimg.paste(img, mask=img.split()[3])
        newimg = newimg.resize((400,300), Image.ANTIALIAS)

        newimg.save(saveto, 'JPEG')

        print "File saved to: %s" % saveto
    except Exception,e:
        print "Error:", e

    try:
        browser.close()
        os.system('killall -KILL phantomjs')
    except:
        pass

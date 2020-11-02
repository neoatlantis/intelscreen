#!/usr/bin/env python3

import twitter
import yaml
import sys
import os

import time
import sqlitedict
from wordcloud import WordCloud


TIMESPAN = 7 * 86400



config = yaml.load(open(sys.argv[1], "r").read(), Loader=yaml.SafeLoader)

api = twitter.Api(
    consumer_key=config["consumer-key"],
    consumer_secret=config["consumer-secret-key"],
    access_token_key=config["access-token"],
    access_token_secret=config["access-token-secret"]
)
now = time.time()

# sorting box, for each interval
statistics = {}

# prepare for sorting "boxes"
start = int(now - TIMESPAN)
end = int(now)
interval = 300 # each 5 minute being a window
for t in range(start, end+interval+1, interval):
    statistics[(t, t+interval)] = []


# start database access

database = os.path.join(config["dir"], "twitter-cloud.sqlite")
with sqlitedict.SqliteDict(database, autocommit=False) as db:

    for timestamp in db:
        if now - float(timestamp) > TIMESPAN:
            del db[timestamp]

    db.commit()
   
    try:
        trends = [e.name for e in api.GetTrendsWoeid(config["woeid"])]
        db[now] = trends
        db.commit()
        print("--- updated keywords. ---")
    except Exception as e:
        print(e)
        print("--- no new download of keywords done. ---")

    for timestamp_float in db:
        timestamp = float(timestamp_float)

        for start, end in statistics:
            if start <= timestamp < end:
                statistics[(start, end)] += db[timestamp_float]
                break

# process data

for key in statistics:
    statistics[key] = list(set(statistics[key]))

keywords = []
for key in statistics:
    keywords += statistics[key]
keywords = list(set(keywords))

# calculate keyword weights

keywords_weights = {}
for e in keywords: keywords_weights[e] = 1

total = 1

for start, end in statistics:
    oldness = now - 0.5 * (start+end)
    catalog_weight = 10 * (0.1 ** (1/0.33)) ** (oldness / 86400)

    found = False
    for keyword in keywords_weights:
        if keyword in statistics[(start, end)]:
            keywords_weights[keyword] += catalog_weight
            found = True

    if found: total += catalog_weight

for keyword in keywords_weights:
#    keywords_weights[keyword] /= total
    print(keyword, keywords_weights[keyword])


wc = WordCloud(
    background_color="black",
    width=config["width"],
    height=config["height"],
    colormap="plasma",
    max_words=30
)
wc.generate_from_frequencies(keywords_weights)

wc.to_image().save(os.path.join(config["dir"], config["filename"]))

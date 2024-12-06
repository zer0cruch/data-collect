import numpy as np
import pandas as pd
from pymongo import MongoClient
import matplotlib.pyplot as plt
from collections import Counter
from datetime import datetime

connectionString = 'mongodb+srv://fedi:CvX3Op2RlQJTfcTi@cluster0.akhgk.mongodb.net/?retryWrites=true&w=majority'
database_name = "collect-data"
client = MongoClient(connectionString)
db = client[database_name]

devices = db["devices"]  
locations = db["locations"]  
session = db["session"]  
clicks = db["clicks"]  
hovers = db["hovers"]  
content = db['contents']

devices_data = list(devices.find())
locations_data = list(locations.find())
session_data = list(session.find())
clicks_data = list(clicks.find())
hovers_data = list(hovers.find())
content_data = list(content.find())

dataplot_collection = db['dataplots']

device_counts = {}
device_counts_item = {}
for item in devices_data:
    device = item['device']
    device_counts[device] = device_counts.get(device, 0) + 1
device_counts_item['data'] = device_counts
device_counts_item['title'] = 'Device Distribution'
dataplot_collection.insert_one(device_counts_item)

country_counts = {}
country_counts_item = {}
for item in locations_data:
    country = item['country']
    country_counts[country] = country_counts.get(country, 0) + 1
country_counts_item['data'] = country_counts
country_counts_item['title'] = 'Countries Distribution'
dataplot_collection.insert_one(country_counts_item)

title_clicks = Counter()
title_clicks_item = {}
for click in clicks_data:
    if not ('contentId' in click) :
        continue
    content_id = click['contentId']
    for content in content_data:
        if content['_id'] == content_id:
            title_clicks[content['title']] += 1

tag_clicks = Counter()
tag_clicks_item = {}
for click in clicks_data:
    if not ('contentId' in click) :
        continue
    content_id = click['contentId']
    for content in content_data:
        if content['_id'] == content_id:
            for tag in content['tags']:
                tag_clicks[tag] += 1


title_clicks_item['data'] = title_clicks
title_clicks_item['title'] = 'Most Clicked Titles'
dataplot_collection.insert_one(title_clicks_item)

tag_clicks_item['data'] = tag_clicks
tag_clicks_item['title'] = 'Most Clicked Tags'
dataplot_collection.insert_one(tag_clicks_item)
from os import path
import json
import re

res = []
json_path = path.join(path.dirname(path.abspath(__file__)), "fb_block_domains.json")
with open(json_path) as json_file:
    data = json.load(json_file)
    for item in data:
        res.append(item)

res = sorted(res)
fb_block_domain_pattern = re.compile('|'.join(x.replace('.', '\.') for x in res))

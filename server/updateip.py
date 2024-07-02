import requests
print("Updating whitelisted ip on Ev's Music Spam server...")
new_ip = requests.get('https://checkip.amazonaws.com').content.strip()
API = "???"
requests.get(API + "/OBFUSCATED_ROUTE/?ip=" + str(str(new_ip).replace('b', '').replace("'", "")))

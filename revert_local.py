import os
f = open("localbackup.txt", "r")
html = f.read()

f = open("index.html", "w")
f.write(html)
f.close()

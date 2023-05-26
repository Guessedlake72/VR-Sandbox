import os
f = open("index.html", "r")
html = f.read()
lines = html.splitlines()

for count, line in enumerate(lines):
    if "<!--replace-->" in line:
        editing =lines[count+1]
        if "githubusercontent" in editing:
            exit()
        index = editing.find("src=")
        lines[count+1] = editing[:index+5] + "https://raw.githubusercontent.com/Guessedlake72/VR-Sandbox/main" + editing[index+5:]


with open('index.html', 'w') as f:
    for line in lines:
        f.write("%s\n" % line)

f = open("localbackup.txt", "w")
f.write(html)
f.close()

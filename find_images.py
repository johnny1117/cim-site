import re
text = open('CIM_PRIMEIRO_DEPLOY.html', encoding='utf-8').read()
images = re.findall(r'<img.*?src="(.*?)".*?>', text)
for i in images:
    if 'base64' not in i:
        print(i)

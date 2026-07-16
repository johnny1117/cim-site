import sys

file_path = 'c:/Users/orlan/OneDrive/Documentos/CIM SITE/CIM_PRIMEIRO_DEPLOY.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

new_text = text.replace('src="ultimas publicações/antimicrobianos e genero.png"', 'src="ultimas%20publica%C3%A7%C3%B5es/antimicrobianos%20e%20genero.png"')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Replaced!")

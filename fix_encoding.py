import sys
import ftfy

file_path = 'c:/Users/orlan/OneDrive/Documentos/CIM SITE/CIM_PRIMEIRO_DEPLOY.html'

try:
    with open(file_path, 'r', encoding='latin-1') as f:
        text = f.read()

    fixed_text = ftfy.fix_text(text)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(fixed_text)
    
    print("Success with ftfy")
except Exception as e:
    import traceback
    traceback.print_exc()

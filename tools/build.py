#!/usr/bin/env python3
"""Reproducible browser/standalone/REG.RU build. No third-party dependencies."""
from pathlib import Path
import base64,re,subprocess,zipfile,hashlib,json
ROOT=Path(__file__).resolve().parents[1]
subprocess.run(['node',str(ROOT/'tools/build-catalogs.cjs')],check=True)
html=(ROOT/'index.html').read_text();version=re.search(r'name="app-version" content="(\d+)"',html)[1]
def embed_css(path):
 css=(ROOT/path).read_text()
 def replace(match):
  name=match[2].split('?')[0];asset=ROOT/name
  if not asset.is_file():return match[0]
  mime='font/woff2' if asset.suffix=='.woff2' else 'image/png' if asset.suffix=='.png' else None
  return "url('data:"+mime+';base64,'+base64.b64encode(asset.read_bytes()).decode()+"')" if mime else match[0]
 return re.sub(r"url\((['\"])([^'\"]+)\1\)",replace,css)
for name in ['styles.css','print.css']:
 pattern=r'<link rel="stylesheet" href="'+re.escape(name)+r'\?v='+version+r'"([^>]*)>'
 html=re.sub(pattern,lambda m:'<style'+m[1]+'>'+embed_css(name)+'</style>',html)
scripts=re.findall(r'<script src="([^"?]+)\?v='+version+r'"></script>',html)
for name in scripts:
 text=(ROOT/name).read_text().replace('</script','<\\/script')
 html=html.replace(f'<script src="{name}?v={version}"></script>','<script>'+text+'</script>')
for name,mime in [('favicon.svg','image/svg+xml'),('favicon.ico','image/x-icon'),('apple-touch-icon.png','image/png')]:html=html.replace(name+'?v='+version,'data:'+mime+';base64,'+base64.b64encode((ROOT/name).read_bytes()).decode())
assert not re.search(r'<script src=|<link rel="stylesheet"',html)
(ROOT/'calculator.html').write_text(html)
files=['index.html','styles.css','print.css','calculator.html','README.txt','EMAIL-SETUP.md','FOOD-DATA.md','FEED-DATA.md','SUPPLEMENT-DATA.md','favicon.svg','favicon.ico','apple-touch-icon.png','food-emoji-atlas.png','food-emoji-more.png',*scripts]
for folder in ['api','app','data','database','config','tools','docs','fonts']:
 files.extend(str(p.relative_to(ROOT)) for p in (ROOT/folder).rglob('*') if p.is_file() and '__pycache__' not in p.parts)
files=sorted(set(files));archive=ROOT/'updates'/('gavstronomiya-v'+version+'.zip');archive.parent.mkdir(exist_ok=True)
for name in files:
 if any(secret in name for secret in ['.sqlite','mail-config.php','database-config.php','sessions/','.env']):raise RuntimeError('Private data in deployment list: '+name)
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
 for name in files:
  info=zipfile.ZipInfo(name,date_time=(2020,1,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16
  z.writestr(info,(ROOT/name).read_bytes())
with zipfile.ZipFile(archive) as z:assert z.testzip() is None
print(json.dumps({'version':version,'files':len(files),'archive':str(archive),'bytes':archive.stat().st_size}))

# Fahrzeug-Prüfung Staig – statische Website

Root = fertiges HTML (wird von Vercel 1:1 ausgeliefert, kein Build nötig).
`_quelle/` = React-Quellcode aus Readdy (wird nicht veröffentlicht).

Neu bauen:
```
cd _quelle && npm install && npm run build && python3 scripts/prerender.py
# danach Inhalt von _quelle/out/ ins Repo-Root kopieren
```
Vercel: Framework „Other", Build Command leer, Output Directory leer (Root).

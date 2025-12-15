# Artikel nicht sichtbar? Cache leeren & Server neu starten

## Problem
Der Artikel `comfyui-flux-lokal-einrichten.md` wurde erstellt, ist aber im Blog nicht sichtbar.

## Lösung

### 1. Dev-Server neu starten

**Im Terminal (im KILAMPE_AKTUELL Verzeichnis):**

```bash
# Server stoppen (Ctrl+C im Terminal wo der Server läuft)

# Dann neu starten:
npm run dev
```

### 2. Cache leeren (falls das nicht hilft)

**Option A: .next Ordner löschen**
```bash
# Im KILAMPE_AKTUELL Verzeichnis:
Remove-Item -Recurse -Force .next
npm run dev
```

**Option B: Node Cache leeren**
```bash
# Im KILAMPE_AKTUELL Verzeichnis:
Remove-Item -Recurse -Force node_modules/.cache
npm run dev
```

### 3. Artikel direkt aufrufen

Nach dem Neustart sollte der Artikel hier erreichbar sein:
- URL: `http://localhost:3000/artikel/comfyui-flux-lokal-einrichten`
- Oder in der Artikel-Übersicht: `http://localhost:3000/artikel`

### 4. Prüfen ob Artikel geladen wird

Der Artikel sollte in der Liste erscheinen, sortiert nach Datum (neueste zuerst).

## Artikel-Details

- **Dateiname**: `comfyui-flux-lokal-einrichten.md`
- **Pfad**: `content/articles/comfyui-flux-lokal-einrichten.md`
- **Slug**: `comfyui-flux-lokal-einrichten`
- **Datum**: 2025-01-27 (wird als neuester Artikel angezeigt)

## Falls es immer noch nicht funktioniert

1. Prüfe die Browser-Konsole auf Fehler
2. Prüfe das Terminal wo der Dev-Server läuft auf Fehler
3. Stelle sicher, dass die Datei wirklich existiert:
   ```bash
   Test-Path "content\articles\comfyui-flux-lokal-einrichten.md"
   ```




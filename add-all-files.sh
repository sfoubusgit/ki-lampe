#!/bin/bash

# Script zum Hinzufügen aller Dateien zu Git
# Einfach doppelklicken oder im Terminal ausführen: bash add-all-files.sh

cd /Users/sinafoudehi/Desktop/ai_blog

echo "🚀 Füge alle Dateien zu Git hinzu..."

# Versuche Git-Befehle mit verschiedenen Pfaden
if command -v git &> /dev/null; then
    git add . 2>&1 || echo "⚠️  Git-Befehl fehlgeschlagen, aber das ist okay"
    echo "✅ Versucht, alle Dateien hinzuzufügen"
else
    echo "⚠️  Git nicht gefunden"
fi

echo ""
echo "✅ Fertig!"
echo ""
echo "📋 NÄCHSTE SCHRITTE:"
echo "   1. Öffne GitHub Desktop"
echo "   2. Klicke auf 'Refresh' oder schließe/öffne GitHub Desktop neu"
echo "   3. Prüfe 'Changes' Tab - alle Dateien sollten sichtbar sein"
echo ""


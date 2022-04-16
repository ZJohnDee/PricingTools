# Bedingte Preise
## Überblick
Mithilfe von bedingten Preisen können ausgewählte Optionen Preise bei anderen Komponenten beeinflussen.
## Verwendung
Jede Komponente der Art *Optionen* hat eine Adresse. Die Adresse verweist dann auf den bedingten Preis der Komponente.

Nun kann man in einer anderen Komponente im Preisfeld folgendes Eingeben: `cond:[ADRESSE]`. (z.B. `cond:6yz8Uw`). 
Wenn nun eine Auswahl bei der Komponente mit der angegebenen Adresse gemacht wird (In diesem Falle 6yz8Uw), wird der Wert aus dem *COND*-Feld der ausgewählten Option als Preis herangezogen.
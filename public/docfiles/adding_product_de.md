# Ein Produkt hinzufügen
## Überblick
Produkte sind komplexe und äußerst vielseitige Elemente, die zur Erstellung eines Vertrags verwendet werden können.
## Struktur
Bei einem Produkt handelt es sich in der Regel nicht um einen Artikel, der mehrmals in den Warenkorb gelegt werden kann, sondern um ein großes Projekt. Sie würden also nicht ein einzelnes Foto verkaufen, sondern ein Fotoprojekt mit vielen variablen Bestandteilen, die den Preis beeinflussen. 

Bei einem einzelnen Foto mit festem Preis kennen Sie den Preis im Voraus, so dass diese Anwendung überflüssig ist. Wenn sich der Preis jedoch nach der Art des Fotos (z. B. ein Porträt oder ein Produktbild) oder dem verwendeten Hintergrund richtet, ist ein Produkt mit modularen Bestandteilen sinnvoll. 
## Komponenten
### Überblick
Jedes Produkt benötigt Komponenten, die variabel hinzugefügt werden können.
Jede Komponente kann den resultierenden Preis beeinflussen. Welche Komponente aktiviert, entscheidet dann der Vertrag, welcher das Produkt verwendet. Mit dem Tool zum Hinzufügen/Bearbeiten von Produkten legen Sie einfach nur alle Komponenten, die für das Produkt *verfügbar* sind fest, aber nicht, welche davon tatsächlich *aktiv* sind, außer wenn sie benötigt werden.

### Eine Komponente hinzugügen
Um eine Komponente hinzuzufügen, drücken sie auf *+Komponente*

### Optionen
Jede Komponente hat einen *Namen*, eine *Beschreibung*, eine *Art*, einen *Preis* und kann als *benötigt* markiert werden.

Die Art bestimmt das Verhalten der Komponente und die Art und Weise, wie der Preis berechnet wird.
Der Preis ist der Betrag, der zum Gesamtpreis addiert wird, wenn die Komponente zum Vertrag hinzugefügt wird. Ist die Art ein Betrag, wird der Preis mit einem im Vertrag festgelegten Betrag multipliziert.

### Arten
Jede Komponente kann eine von verschiedenen Arten haben.
* Erweiterung
  * Eine optionale Funktion, die hinzugefügt werden kann (z. B. Bearbeitung nach der Aufnahme des Fotos)
* Anzahl
  * Eine optionale Funktion, die mit einem Betrag versehen werden kann. (z. B. die Anzahl der Kopien des Fotos, die der Kunde erhalten soll)
* Optionen
  * Eine Komponente, die das Verhalten des Produkts verändert, indem Sie eine Auswahl zur verfügung stellt. (z. B. welche Art von Foto gemacht werden soll; welche Kamera verwendet werden).

### Art: Optionen
Nachdem Sie den Typ *Wahl* ausgewählt haben, können Sie nun verschiedene Wahlmöglichkeiten hinzufügen, indem Sie *+Wahl* drücken. 

Jede Auswahl hat einen *Name*, einen *Preis* und ein *COND* Feld. Der Wert, der im Feld *Preis* angegeben wird, ist der Betrag, der zum Gesamtpreis des Produkts hinzugefügt wird, und zwar NUR, wenn die Auswahl ausgewählt wurde. Andernfalls wird der Preis verworfen. Der Wert COND wird für *Bedingte Preise* verwendet. Erfahren Sie mehr über bedingte Preise [hier](/docs/conditional_pricing).

### Was sollte eine Komponente werden?
Eine Komponente, die bereits standardmäßig im Produkt enthalten ist (z.B. das Fotografieren in einem Studio), sollte entweder nicht als Komponente implementiert oder als erforderlich markiert werden. Wenn die Komponente hauptsächlich eine Funktionsangabe ist und bei jedem Produkt enthalten ist, sollte sie nicht als Komponente implementiert werden (z.B. "Professionelle Fotografie!", jedes Ihrer Fotos ist wahrscheinlich professionell).

## Trotz bestehenden Verträgen speichern.
Standardmäßig wird in Verträgen keine Kopie des Produkts gespeichert, sondern eine Referenz. Das bedeutet, dass die Bearbeitung eines Produkts die Vertragsdaten beeinflussen kann. Wenn Sie also eine Komponente umbenennen, wird der Name der Komponente in allen Verträgen geändert, die auf das Produkt verweisen. 

Dies kann jedoch zu unerwartetem Verhalten führen und sogar einen Vertrag zerstören, wenn dieser auf bestimmte Daten angewiesen ist. Daher prüft das System beim Speichern, ob es Verträge gibt, die auf das Produkt verweisen. Sie können dann entscheiden, ob Sie den Vertrag *archivieren* oder mit dem Speichern des Produkts fortfahren wollen. Wenn Sie den Vertrag archivieren, wird im Vertrag eine Kopie der aktuellen Version des Produkts anstelle einer Referenz gespeichert, so dass Änderungen am Produkt keine Auswirkungen auf den Vertrag haben. Wenn Sie sich sicher sind, was Sie tun, können Sie das Produkt auch einfach speichern, wodurch der Vertrag allerdings beschädigt werden könnte.

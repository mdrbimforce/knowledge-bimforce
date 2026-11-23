---
title: 'Geneste families NLRS-conform, tot in de diepste laag'
description: 'Geneste Revit-families zijn een blinde vlek in bijna elke template-audit. Ze zitten in andere families, soms drie of vier niveaus diep, en een gewone naamcontrole komt er niet.'
pubDate: 2026-11-23
tags: []
draft: false
---

Geneste Revit-families zijn een blinde vlek in bijna elke template-audit. Ze zitten in andere families, soms drie of vier niveaus diep, en een gewone naamcontrole komt er niet.

We lieten @Leja dat gat dichten, in drie stappen. Eerst inventariseert hij recursief welke families in welke andere genest zitten. Dan toetst hij elke geneste familie aan de NLRS-naamgeving. Een reviewer beoordeelt de voorstellen. Wat goedgekeurd is schrijft de agent terug: de familie openen, hernoemen, opnieuw laden, laag voor laag. De dialoogvensters waarmee Revit zo'n scan anders stillegt, sluit hij zelf.

Het resultaat op een template van een opdrachtgever: 149 van de 150 geneste families hernoemd, en het aantal conforme geneste families van 24 naar 161 in één ronde.

Twee dingen gingen anders dan verwacht.

De ene familie die mislukte was een botsing in de review: twee families kregen dezelfde nieuwe naam, en hernoemen kan twee families niet samenvoegen. Dat kwam pas boven toen we de werkelijke eindtoestand in het model maten.

En bij het afdalen bleken drie families niet te openen. Revit meldt IsEditable = true, en EditFamily mislukt toch. Het zijn geneste Detail Items binnen een familie die al open staat; Revit laat je zo'n detail vanuit die sessie niet openen. Een beperking van Revit, het model is in orde. De agent registreert de nesting, slaat het afdalen over en zet de regel op de lijst voor handwerk. Een eigenschap in de API zegt wat mogelijk zou moeten zijn; of het lukt, zie je pas als je het doet.

De reviewer blijft beslissen. De automatisering maakt zijn besluit uitvoerbaar op 150 families tegelijk, en laat zien wat er eerder buiten beeld bleef.

Nadat we uitgezocht hoe je dit het beste kunt doen met de #Revit #API voor alle verschillende soorten objecten, is ook deze kennis opgenomen in onze #RevitMCP.

De volgende stap: Materialen en (Shared) Parameters. Maar dat is weer een ander verhaal.

#Leja #BIM #Revit #NLRS #automatisering

![content 1783632479763 geneste families diepste laag](/figures/posts/geneste-families-nlrs-conform-tot-in-de-diepste-laag/content-1783632479763-geneste-families-diepste-laag.png)

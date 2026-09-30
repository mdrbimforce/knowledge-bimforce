---
title: 'Elf dode knoppen in een middag: hoe je een testplan uit de code laat groeien in plaats van uit een spreadsheet'
description: 'Een webapp met 100 popups, 291 knoppen en 134 rechtermuisknop-opties. Niemand heeft tijd om die allemaal met de hand te testen. Dus lieten we de code zelf vertellen wat er getest moet worden.'
pubDate: 2026-09-30
tags: []
draft: false
---

Een webapp met 100 popups, 291 knoppen en 134 rechtermuisknop-opties. Niemand heeft tijd om die allemaal met de hand te testen. Dus lieten we de code zelf vertellen wat er getest moet worden.

Deze zomer wilden we onze nieuwste versie van GRiDS onderwerpen aan een volledige kliktest. We wilden absoluut zeker weten dat de hele applicatie bewezen getest was, van voor naar achter. Ieder obscuur knopje in alle diep weggestopte popups.

De aanpak: geen menselijke tester die schermen afloopt, maar een parser die elke knop volgt naar zijn handler, van de handler naar het endpoint, en van het endpoint naar de database. Per knop komt eruit: wat er zou moeten gebeuren, welke popup opent, welke melding verschijnt. Op basis van deze kennis hebben we het testplan gegenereerd en een dashboard gemaakt wat de status van alle tests kan laten zien.

Daar bovenop een paar kruiscontroles die een mens nooit doet: bestaat elk element dat de code aanspreekt wel in de HTML (hoofdlettergevoelig)? Bestaat elke functie die wordt aangeroepen? Bestaat elke server-actie waar de UI naartoe post? Heeft elk menu-item een handler, en elke handler nog een menu-item?

Uitkomst: 1128 testregels en 17 kandidaten. Na verificatie in de code: elf echte bugs. Een knop die al zeven maanden niets deed door een dubbel getypte functienaam. Een publiceer-flow die blijft hangen omdat een functie is hernoemd maar een aanroep niet. Een pagina die bij elk bezoek een foutmelding geeft sinds een opruimactie twee weken eerder.

![Totale omvang van de testsuite](/figures/posts/elf-dode-knoppen-in-een-middag-hoe-je-een-testplan-uit-de-code-laat/image.png)

De les: in een jQuery-codebase zonder compiler faalt een dode knop pas bij klik, en dan alleen in de console. Statische analyse vangt precies die klasse. En het testplan hoeft niet compleet te zijn omdat iemand hard heeft nagedacht; het is compleet omdat de code de bron is en de tegencontroles bewijzen dat er niets ontbreekt.

De volgende stap is de suite die deze regels uitvoert, wekelijks, met een assert op de database. Zo kunnen we ook bij lopende developments gaan monitoren op het stil falen van knoppen en workflows als (onvoorzien) gevolg van wijzigingen in de code.

De matrix alleen heeft al meer opgeleverd dan een week handmatig klikken, maar wat mij betreft was het ook de laatste keer dat we dit achteraf doen.

#BIM #softwarekwaliteit #testautomatisering #GRiDS

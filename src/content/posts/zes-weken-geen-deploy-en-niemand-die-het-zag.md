---
title: 'Zes weken geen deploy, en niemand die het zag'
description: 'Het deployscript van ons dashboard faalde al zes weken op de eerste stap, zonder dat iemand het merkte. Over twee fouten die elkaar afdekten, en over de controle die we eraan overhielden.'
pubDate: 2026-10-01
tags: ['automatisering', 'betrouwbaarheid', 'monitoring', 'DevOps', 'AI']
draft: false
image: '/og/zes-weken-geen-deploy-en-niemand-die-het-zag.png'
---

Deze zomer experimenteerden we met geautomatiseerde deploys van dagelijkse updates aan ons dashboard. We hadden het zo ingericht dat geautomatiseerde security updates ook direct gedeployed zouden worden. Zo hoefden we ons niet meer druk te maken hierover. Uitgebreid getest, live gegaan. En eerlijk gezegd, niet echt meer aan gedacht. 
Wat blijkt nu: een deploy die niet draait, ziet er precies zo uit als een deploy die niet nodig is.

Dat merkten we toen we een nieuwe functie wilden uitrollen naar de server waarop ons dashboard draait. De uitrol faalde bij de eerste stap. Toen we terugkeken, bleek de server al sinds 22 juli op dezelfde versie te staan. Zes weken werk was nooit live gegaan, en voor iedereen die het dashboard gebruikte zag alles er normaal uit.

Dat is het verraderlijke aan automatische processen: als ze stoppen, merk je het pas als je iets nieuws verwacht. Stilte lijkt op rust.

De oorzaak was klein. Door één instelling in de configuratie werd een nieuw toegangstoken nooit gelezen, en bleef het systeem het oude, verlopen token proberen. De oplossing was eenvoudig: het correcte token toewijzen en klaar.

De les zat in de weken ervoor. Er was geen enkel signaal dat onderscheid maakte tussen "er is niets te doen" en "het lukt niet". Daarom draait er nu elke ochtend een controle die drie dingen meet: kan de server bij elke repository, loopt een werkkopie achter, en hoeveel dagen is het token nog geldig. Hij meldt zich altijd, ook als er niets is.

De eerste proefrun vond meteen iets wat we niet wisten: een tweede repository op dezelfde server liep 104 dagen achter. Een proces dat nooit iets meldt, is pas betrouwbaar als je kunt zien dat het ook echt werkt. Helaas voor mij betekent dat nog steeds dat ik iedere dag weer wat meldingen zie "gedraaid, alles is ok". Maar dan weet ik in ieder geval wel zeker dat alles ok is.

Hoe merk jij het als een automatisch proces al weken stilletjes niets meer doet?

Dit is deel 1 van een korte serie over stille fouten. Leuk feitje trouwens: het concept artikel is anoniem ingeleverd door de betreffende agent.

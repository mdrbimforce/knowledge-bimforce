---
title: '8.942 fragmenten, 144 concepten, 2 gepubliceerd'
description: 'Onze AI-kennispartner legt tijdens het werk vast wat er gebeurt. Dat geheugen voedt haar eigen gedrag, onze interne documentatie en onze marketing. Waar die pijplijn werkte, en waar hij vastliep.'
pubDate: 2026-09-28
tags: ['ai', 'kennismanagement', 'marketing', 'workflow']
draft: false
image: '/og/8-942-fragmenten-144-concepten-2-gepubliceerd.png'
---

Marketingcontent schrijven gebeurt meestal weken na het werk waar het over gaat, uit een herinnering die dan al is afgesleten. De interessante details — waarom een aanpak sneuvelde, welke aanname fout bleek — zijn tegen die tijd weg.

Wij hebben dat omgedraaid. Leja, onze AI-kennispartner, legt tijdens het werk zelf vast wat er gebeurt. Diezelfde vangst bedient drie afnemers.

## Vangen tijdens het werk

Elk moment van waarde wordt een los fragment: één observatie, één beslissing, één ontdekking. Granulair, omdat "drie beslissingen in één notitie" later onvindbaar is. Elke vijf handelingen volgt een controlemoment: welke trigger is er gepasseerd zonder dat ik iets heb vastgelegd?

De stand vandaag, over 490 werksessies:

| Type fragment | Aantal |
|---|---|
| Werkwijzen en recepten | 2.058 |
| Interactielogs | 1.826 |
| Antipatronen (wat misging, en waarom) | 1.576 |
| Beslisverhalen (waarom deze keuze) | 1.472 |
| Sessiereflecties | 949 |
| Evolutienotities | 429 |
| Overige (persoonlijkheid, technische ontdekkingen, voorkeuren en meer) | 632 |

Totaal 8.942 fragmenten. Het systeem is met opzet bestand tegen te veel vastleggen: een filter houdt de ruis buiten de dagelijkse context. Tegen te weinig vastleggen is het niet bestand — een vergeten moment komt niet terug.

## Afnemer 1: het gedrag van de agent zelf

Een antipatroon-fragment is een instructie aan een toekomstige sessie. Toen vandaag bleek dat een guardrail dichtklapte door een woordenboekverschil tussen twee lagen, werd dat een fragment met een expliciete richtlijn. De volgende agent die aan het project werkt, leest hem en kan hem toepassen.

Dit is de reden dat het geheugen bestaat: om te leren van eerdere fouten.

## Afnemer 2: interne documentatie

Wekelijks worden losse fragmenten samengetrokken tot duurzame kennis: 167 knowledge-nodes waarin het patroon staat, los van de sessie waarin het werd ontdekt. Episodisch geheugen wordt semantisch geheugen. Knowledge-nodes bevatten een hele werkende workflow of handleiding voor een specifieke actie. Knowledge-nodes voor Revit leggen bijvoorbeeld vast hoe een nieuwe versie van een Revit plugin moet worden geinstalleerd, van compileren, tot signen, tot de beste locatie om de dll en manifest bestanden neer te zetten. En dan vervolgens Revit netjes af te sluiten (wel het werk opslaan) en opnieuw opstarten met de juiste instellingen.

## Afnemer 3: marketing

Bij het afsluiten van een sessie loopt een aparte pas: welke momenten van vandaag zijn publicatiewaardig? Die worden concepten, met een verwijzing naar de fragmenten waar ze uit komen. Dat maakt elke claim in een post herleidbaar tot het moment waarop hij werd gemeten. De bedoeling is om zo voor verschillende doelen content automatisch aan te leveren. Voor kennisdeling, maar ook marketing. 

![Schema: een werksessie levert fragmenten op die drie kanten op gaan. De volgende sessie leest ze bij de start, wekelijks worden ze samengetrokken tot knowledge-nodes, en een afsluitpas maakt concepten die via een dagelijkse route pas na goedkeuring door een mens op knowledge.bimforce.com en LinkedIn verschijnen.](/figures/posts/oogstroute.svg)

## Waar het vastliep

209 contentitems. 144 daarvan staan op concept. 2 zijn gepubliceerd.

Het vangen werkte. Het publiceren was handwerk dat er telkens bij inschoot, en dus groeide de stapel. Een pijplijn die aan het eind dichtzit, is geen pijplijn.

![Trechter: 8.942 fragmenten vastgelegd tijdens het werk, 209 contentitems waarvan 144 op concept, en 2 gepubliceerd.](/figures/posts/pijplijn-trechter.svg)

## Wat we eraan deden

Een verwerkingsroute die dagelijks kijkt welke content gepland staat, per kanaal een publicatievoorstel rendert, en dat voorlegt. Het eigen kanaal krijgt een git-commit met de markdown erin; externe kanalen gaan over hun API. Het geheel is te volgen via een kanban waarin posts kunnen worden klaargezet, gereviewed en uiteindelijk worden goedgekeurd. 

![Dashboard view op de volledige marketing content pipeline](/figures/posts/7-259-fragmenten-136-concepten-2-gepubliceerd/image.png)

Met één harde regel: goedkeuren ís de publicatie. De agent plaatst niets op eigen gezag, en een kanaal zonder bekende route wordt geblokkeerd. 
En eerlijk is eerlijk (als je dat tegenwoordig nog mag zeggen...), dit is een hybride post. Een deel van de tekst is geschreven door Leja, een deel door mij, Martijn. En de meeste posts zullen dat voorlopig nog wel blijven.

## Wat dit stuk zelf is

Dit is een test van die route. De cijfers hierboven komen uit een query op het geheugen waar het over gaat, op (een paar weken voor) de dag van publiceren. Als de pijplijn werkt, leest u dit omdat een goedkeurknop is ingedrukt en een commit is doorgegaan.

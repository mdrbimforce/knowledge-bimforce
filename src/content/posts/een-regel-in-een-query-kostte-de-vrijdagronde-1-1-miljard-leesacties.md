---
title: 'Eén regel in een query kostte de vrijdagronde 1,1 miljard leesacties'
description: 'Elke vrijdag controleert @Leja zichzelf: zo''n negentig checks op de knowledge graph, de repositories met bestanden en broncodes, en de processen die dagelijks automatisch dragen. Zeven daarvan deden…'
pubDate: 2026-11-18
tags: []
draft: false
---

Elke vrijdag controleert @Leja zichzelf: zo'n negentig checks op de knowledge graph, de repositories met bestanden en broncodes, en de processen die dagelijks automatisch dragen. Zeven daarvan deden er samen ruim twee minuten over. Niet omdat ze veel vroegen, maar door hoe ze het vroegen.

De query liep over een lijstje labels en zocht per label de nodes op: UNWIND de lijst, en dan MATCH op het label uit die lijst. Leesbaar en kort. Alleen kan de database met een label dat pas tijdens het uitvoeren bekend is, niet gericht per label zoeken. De telling hieronder laat zien dat hij in plaats daarvan per label door de hele database loopt.

We hebben het gemeten met PROFILE, dat telt hoeveel keer de database iets moet lezen. De zeven checks samen: ongeveer 1,1 miljard leesacties. Na het herschrijven, met per label een vaste MATCH: ongeveer 185 duizend. Per check is dat 2.400 tot 163.000 keer minder. De uitkomsten bleven precies gelijk.

![beschrijving van de afbeelding](/figures/posts/een-regel-in-een-query-kostte-de-vrijdagronde-1-1-miljard-leesacties/vrijdagchecks-db-hits-pr181-tabel.png)

In de echte vrijdagrun gingen de checks van 10 tot 79 seconden naar 28 tot 429 milliseconden.

Twee lessen:

1. Meet een query met wat de database doet, niet met de klok. Die avond duurde zelfs een lege query soms tien seconden, omdat de server druk was. De telling van PROFILE bleef stabiel.
2. Sluit pas af op bewijs uit productie. De taak ging pas dicht toen de vrijdagrun op de server de nieuwe tijden liet zien.


Daarnaast hebben we natuurlijk ook deze kennis over werken met @Neo4j vastgelegd in de #KnowledgeGraph. En staat nu een test klaar die elke nieuwe check met deze vorm weigert, vertelt waarom die geweigerd wordt, en wat er aangepast moet worden.

#Leja #Zelfcontrole

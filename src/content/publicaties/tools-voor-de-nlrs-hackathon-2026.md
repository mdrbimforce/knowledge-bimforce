---
title: "Tools voor de NLRS (NLRS-hackathon 2026)"
description: "De opening van de NLRS-hackathon: wat de Nederlandse Revit Standaard is, uit welke vier repositories hij bestaat, wat er niet in zit, en vier agents voor Claude als voorbeeld van een tool. 18 slides."
year: 2026
date: "2026-11-26"
venue: "NLRS-hackathon"
speakers:
  - "Martijn de Riet"
lang: "nl"
kind: "presentatie"
image: "/publicaties/tools-voor-de-nlrs-hackathon-2026.jpg"
downloads:
  - label: "Presentatie (18 slides)"
    url: "/publicaties/files/tools-voor-de-nlrs-hackathon-2026.pdf"
    size: "0.7 MB"
    format: "pdf"
    hosted: "site"
links:
  - label: "De NLRS-repositories van de Revit Standards Foundation op GitHub"
    url: "https://github.com/RevitStandards"
  - label: "Broncode van de Revit Agent en de vier skills (MIT)"
    url: "https://github.com/mdrbimforce/revit-agent"
tags:
  - "NLRS"
  - "Revit"
  - "standaarden"
  - "AI"
  - "IFC"
draft: false
---
De NLRS-hackathon van 26 november 2026 had één opdracht: maak de Nederlandse Revit Standaard makkelijker in gebruik. Deze presentatie opende de dag. Ze loopt in een kwartier langs wat de standaard is, wat erin zit en wat niet, en laat vier tools zien als opwarmer.

## Waaruit de NLRS bestaat

De NLRS is een set afspraken en instelbestanden die de Revit Standards Foundation deelt via GitHub. De presentatie loopt de vier repositories langs:

- **NLRS_Revit_Settings**: de regels en lijsten. De Naamgenerator in Excel, de categorielijst met 453 categorieën en 479 subcategorieën, de Assembly Codes volgens NL-SfB, keynotes, DWG-exportlagen en instellingen voor Revit.ini.
- **NLRS_Shared_Parameters**: 1474 parameters in 156 groepen, met per parameter de koppeling aan de ILS Ontwerp & Engineering en de UVIP Aedes ILS.
- **NLRS_IFC_settings**: de instellingen voor de export van Revit naar IFC.
- **NLRS_ModelChecker**: 32 checks voor de Autodesk Model Checker, gemaakt voor NLRS 3.0.1.

Het hart van de standaard is de naamgeving: zeven posities die samen één naam vormen, zoals `NLRS_28_SF_LIB_stalen ligger HEA_gen_rsf`.

## Wat er niet in zit

De standaard ordent namen, maar levert geen families, geen Revit-template en geen IDS-bestand om een IFC mee te toetsen. De checks horen bij versie 3.0.1, de rest van de bestanden bij 3.1.1. De afspraken staan in Excel en tekstbestanden, dus toepassen en controleren is handwerk. Daar ligt de ruimte voor tools.

## Van afspraak naar agent

Het tweede deel laat zien hoe je van een afspraak een agent maakt: een skill die Claude vertelt hoe het werk gaat, een codebase met scripts, en een bridge naar een draaiende Revit. Vier voorbeelden, alle vier te downloaden op [de pagina Skills](/skills):

- **Revit Agent**: Claude werkt mee in je eigen Revit-model.
- **NLRS Agent**: een model nalopen op naamgeving, shared parameters, materialen en classificatie.
- **IFC-export volgens een ILS**: exporteren, nabewerken en toetsen.
- **ILS-check**: vóór de export zien welke eisen uit een ILS het model nog niet haalt.

Alle opdrachten die de addin in Revit kent, staan in [de naslag](/skills/revit-agent/opdrachten/).

## De opdracht

De presentatie sluit af met vijf ideeën voor de dag: checks voor NLRS 3.1.1, een IDS bij de NLRS-parameters en psets, de Naamgenerator in Revit zelf, een controle van de bronbestanden bij elke wijziging, en de regels uit Excel als data die een script kan lezen.

De cijfers in de presentatie komen uit de publieke repositories op GitHub, stand 25 november 2026.

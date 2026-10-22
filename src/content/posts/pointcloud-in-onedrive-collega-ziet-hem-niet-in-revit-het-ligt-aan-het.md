---
title: 'Pointcloud in OneDrive, collega ziet hem niet in Revit? Het ligt aan het pad, niet aan de pointcloud'
description: 'Vandaag een vraag aan de telefoon: twee collega''s werken in Revit 2026.5 met dezelfde pointcloud, netjes in een gedeelde OneDrive-map. De een laadt hem, de ander ziet niets. In Manage Links staat hij…'
pubDate: 2026-10-22
tags: []
draft: false
---

Vandaag een vraag aan de telefoon: twee collega's werken in Revit 2026.5 met dezelfde pointcloud, netjes in een gedeelde OneDrive-map. De een laadt hem, de ander ziet niets. In Manage Links staat hij op "Not Found".

De oorzaak zit niet in de pointcloud en niet in OneDrive, maar in hoe Revit het pad onthoudt. Revit slaat de link naar een pointcloud op relatief aan de Point Cloud Root Path (Options > File Locations). OneDrive synct naar een map per gebruiker: C:\Users\jouwnaam\OneDrive - Bedrijf\... Op de machine van je collega heet die map anders, dus de link wijst nergens heen.

De oplossing in drie stappen, bij elke gebruiker:
1. Zet de Root Path op je eigen OneDrive-projectmap.
2. Laad de pointcloud opnieuw via Manage Links > Point Clouds > Reload From. Het opgeslagen pad wordt dan relatief, en klopt bij iedereen.
3. Zet de map, inclusief de Support-map met de .rcs-bestanden, op "Altijd op dit apparaat bewaren". Een cloud-placeholder kan Revit niet lezen.

Even later de terugkoppeling: werkt.

Sneller alternatief als je veel met pointclouds werkt: niet in een sync-map, maar lokaal op hetzelfde pad op elke machine. Dat is ook wat Autodesk zelf adviseert.

![image](/figures/posts/pointcloud-in-onedrive-collega-ziet-hem-niet-in-revit-het-ligt-aan-het/image.png)

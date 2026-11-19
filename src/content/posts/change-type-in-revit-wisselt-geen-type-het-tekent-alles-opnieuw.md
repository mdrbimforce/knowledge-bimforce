---
title: 'Change Type in Revit wisselt geen type. Het tekent alles opnieuw.'
description: 'Voor de ontwikkeling van een #Revit tool die onze klant in staat stelt om ontwerpmodellen automatisch om te zetten naar productietekeningen voor de prefabricage van leidingstraten was het…'
pubDate: 2026-11-19
tags: []
draft: false
---

Voor de ontwikkeling van een #Revit tool die onze klant in staat stelt om ontwerpmodellen automatisch om te zetten naar productietekeningen voor de prefabricage van leidingstraten was het noodzakelijk om leidingsystemen om te zetten. Denk bijvoorbeeld aan het volgende scenario:

Het model is getekend in generieke content, maar de cv- en gkw-leidingen moeten uiteindelijk gemaakt worden in een dunwandig perssysteem zoals #Mapress of #XPress. Voor de stap naar productietekeningen is het noodzakelijk dat de content van de fabrikant wordt gebruikt, zodat je zeker weet dat het past.
Dus hebben we een workflow bedacht: voor onze klant hebben we een Revit template gemaakt waarin de leidingsystemen waar zij mee werken al helemaal uitgedefinieerd zijn.

In een project kan de gebruiker vervolgens een mapping maken tussen het getekende model en de eigen definities en daarna is het omzetten een druk op de knop. De definities kunnen apart worden opgeslagen zodat een bibliotheek ontstaat met vooraf gedefinieerde mappingen. Het enige wat de gebruiker van de tool hoeft te doen is de juiste definitie inladen.

![beschrijving van de afbeelding](/figures/posts/change-type-in-revit-wisselt-geen-type-het-tekent-alles-opnieuw/image.png)

Maar hoe zet je dit om? Voor een Revit modelleur is dat makkelijk. Je selecteert het component, en in de Property Browser selecteer je dan simpelweg de gewenste variant. Klaar.

Wil je dat programmeren, dan is het een ander verhaal. Want voor buizen lukt dat wel, maar bij Fittings wordt het echt een probleem. Los van het feit dat het een enorme klus is om een heel leidingsysteem om te zetten begint Revit je ook nog eens te bombarderen met gekke foutmeldingen.

Een leidingsysteem van het ene buistype naar het andere zetten, inclusief bochten en T-stukken dan? In Revit is daar één knop voor: Change Type. Selecteer de run, kies het nieuwe type, klaar.

<br>
![beschrijving van de afbeelding](/figures/posts/change-type-in-revit-wisselt-geen-type-het-tekent-alles-opnieuw/image-2.png)

<br>
We wilden dus precies die knop vanuit een eigen tool gebruiken, dus eerst meten wat hij precies doet. Momentopname vooraf van een systeem met 32 buizen en 35 fittingen, luisteren naar elke wijziging, en daarna vergelijken. Het resultaat was schoon: zelfde maten, zelfde aantal bochten en T-stukken, geen foutmeldingen. Maar van de 58 buizen en fittingen die naar het nieuwe type gingen, had er geen één nog zijn oude id. Change Type verwijdert alles en zet er nieuwe elementen voor in de plaats.

Daarna de voorzichtige route: eerst alleen de buizen van type wisselen (dat houdt de ids), dan Reapply Type om de fittingen bij te werken. Zelfde uitkomst: 117 van de 117 ids weg. Reapply bleek dezelfde herbouwmotor, en haalde de elementen ook nog uit hun assembly.

Wat overbleef was de echte vraag: is de herbouw goed? Daar zat het probleem, maar dat is een volgend verhaal.

Les voor wie Revit automatiseert: meet wat een handeling doet voordat je erop bouwt. Een knop die werkt is nog geen knop die doet wat je denkt.

#Leja #Revit #AI #Automatisering

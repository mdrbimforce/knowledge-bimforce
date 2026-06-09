---
title: "Eisenset RWZI Dinther — methanol-doseringsinstallatie"
project: "25.4.007 GMB opleiding"
bron: "Databronnen.xlsx — Eisenset (Relatics-export)"
---

# Eisenset — methanol-doseringsinstallatie RWZI Dinther

36 eisen in drie groepen:

- **Relatics-eisenset** (21) — actuele technische eisen per object, uit `Databronnen.xlsx`
- **ILS Revit A00029** (10) — modelleer- en oplevereisen voor het Revit/IFC-model
- **BUP A00008** (5) — BIM-procesafspraken en doelen

Letterlijk overgenomen uit de project-aanlevering. Disclaimer per eis:
materiaal in eigendom overgedragen aan GMB Civiel B.V. conform offerte 25.4.007.

## Obj-00093 — Methanoldoseringsinstallatie (hoofdobject)

### Normatieve eisen

- [Eis-00035 — PGS 31 richtlijn](eis-00035.md)
- [Eis-00054 — Lospunten](eis-00054.md)
- [Eis-00078 — Locatie C-bron doseerpompen](eis-00078.md)
- [Eis-00079 — Constructie C-bron opslag en doseerinstallatie](eis-00079.md)
- [Eis-00080 — C-bron opslag en doseerinstallatie locatie](eis-00080.md)
- [Eis-00081 — Locatie vulaansluiting C-bron](eis-00081.md)
- [Eis-00082 — Lekbeveiliging vulaansluiting C-bron](eis-00082.md)
- [Eis-00083 — Uitvoering vulleiding C-bron](eis-00083.md)
- [Eis-00133 — C-bron opslag (volume 45 m³)](eis-00133.md)
- [Eis-00134 — C-bron dosering (5–25 l/u)](eis-00134.md)
- [Eis-00135 — C-bron doseerpompen](eis-00135.md)
- [Eis-00136 — Dampretourleiding C-bron](eis-00136.md)

### Uitgangswaardes (uit UO-spec A00095)

- [Eis-00644 — C-brondoseerinstallatie uitgangswaardes](eis-00644.md)
- [Eis-00645 — ATEX C-brondoseerinstallatie uitgangswaardes](eis-00645.md)
- [Eis-00646 — C-brondoseerinstallatie volumes uitgangswaardes](eis-00646.md)
- [Eis-00650 — Kathodische bescherming uitgangswaardes](eis-00650.md)
- [Eis-00704 — C-brondoseerinstallatie fundatie uitgangswaardes](eis-00704.md)

## Obj-00220 — Methanoldoseringsinstallatie vulpunt

- [Eis-00434 — Display druk- en debietmeters](eis-00434.md) *(ook Obj-00221)*
- [Eis-00480 — Instrumentatie (3.6 Lid 4)](eis-00480.md) *(ook Obj-00221)*
- [Eis-00647 — Methanoldoseringsinstallatie vulpunt uitgangswaardes](eis-00647.md)

## Obj-00221 — Methanoldoseringsinstallatie lekbak

- [Eis-00434 — Display druk- en debietmeters](eis-00434.md) *(ook Obj-00220)*
- [Eis-00480 — Instrumentatie (3.6 Lid 4)](eis-00480.md) *(ook Obj-00220)*
- [Eis-00648 — Methanoldoseringsinstallatie lekbak uitgangswaardes](eis-00648.md)

## ILS Revit A00029 — modelleer- en oplevereisen

Sleutel-eisen die het Revit/IFC-model moet halen. Het kader voor scenario E
in workshop 1.

- [ILS-01 — Locatie en oriëntatie](ils-01.md)
- [ILS-02 — Classificatie (NL-SfB)](ils-02.md)
- [ILS-03 — Fasering](ils-03.md)
- [ILS-04 — Materialen (NAA.K.T)](ils-04.md)
- [ILS-05 — Propertieset (minimum)](ils-05.md)
- [ILS-06 — Doorsnijdingen](ils-06.md)
- [ILS-07 — Bouwlaagindeling](ils-07.md)
- [ILS-08 — Naamgeving bestanden](ils-08.md)
- [ILS-09 — BIM basis ILS conformiteit](ils-09.md)
- [ILS-10 — Uitwisselformaten 3D-modellen](ils-10.md)

## BUP A00008 — BIM-procesafspraken

Sleutel-eisen uit het BIM-uitvoeringsplan die de procescontext voor het
project zetten.

- [BUP-01 — CDE & documentbeheer (ACC + SharePoint)](bup-01.md)
- [BUP-02 — Modelleerafspraken & output](bup-02.md)
- [BUP-03 — Asset-data voor WSAM-assetsysteem](bup-03.md)
- [BUP-04 — Uittrekstaten uit 3D-model](bup-04.md)
- [BUP-05 — Informatieleveringen weekcyclus](bup-05.md)

## Verrijkte V&V-eisen (graph-gekoppeld)

Negen sleutel-eisen plus één bonus zijn in `neo4j-leja` (version
`gmb_dinther_v1`) gekoppeld via Mapping aan een Filter en een Bron-document.
Deze koppeling vormt de V&V-keten die in spoor 2 van workshop 1 live
gedemonstreerd wordt: graph → Filter → IfcClass-set in het IFC-model →
match/mismatch met Asset-properties.

De 7 eisen die al een markdown hadden zijn ter plekke verrijkt met een
V&V-sectie. De 3 ILS/BUP-eisen die nieuwe markdowns nodig hadden zijn als
`*-e*.md` toegevoegd om naast de bestaande generieke ILS-/BUP-eisen te
kunnen leven.

### Eisen uit Eisenset (verrijkt)

- [Eis-00035 — PGS 31](eis-00035.md) → `F.PGS31.Tankinstallatie`
- [Eis-00079 — Constructie](eis-00079.md) → `F.Spatial.NutrientenfilterZone`
- [Eis-00080 — Op terp](eis-00080.md) → `F.Spatial.OpTerp`
- [Eis-00133 — Volume 45 m³](eis-00133.md) → `F.Tank.Opslag45m3`
- [Eis-00135 — Doseerpompen (showcase 4 deeleisen)](eis-00135.md) → `F.Tag.Doseerpomp`
- [Eis-00645 — ATEX uitgangswaardes](eis-00645.md) → `F.ATEX.Zone1of2`
- [Eis-00650 — Kathodische bescherming](eis-00650.md) → `F.Tank.KathodischeBescherming`

### Nieuwe V&V-eisen (graph-gestuurd)

- [ILS-E01 — IFC entity-class conform BIM Basis ILS](ils-e01.md) → `F.IfcClass.NietProxy`
- [ILS-E07 — Revit Family Category niet Generic Model](ils-e07.md) → `F.IfcClass.GenericModelCheck`
- [BUP-E04 — 3D-modeldata sluit aan op WAM asset-systeem](bup-e04.md) → `F.Property.WAMAssetID`

## Reproduceerbaarheid

- **Relatics-eisen**: generator `gen_eisen_md.py` in de map daarboven. Bron:
  `Databronnen.xlsx` tab `Eisenset` (32 rijen, 12 kolommen). Dedup op
  `Eis-ID` met objectenboom en verificatiegroepering als lijst bij
  multi-occurrence.
- **ILS-eisen**: handmatig geëxtraheerd uit `Z_DI_3114NT_ALG_RP_CO_ILS Revit
  - A00029.pdf` versie 3.0 (06-03-2025).
- **BUP-eisen**: handmatig geëxtraheerd uit `Z_DI_3114NT_ALG_RP_CO_BUP (BIM
  uitvoeringsplan) - A00008.pdf` versie 3.0 (06-03-2025).
- **Verrijkte V&V-eisen**: generator `gen_enriched_eisen.py` in de map
  daarboven. Bron: `neo4j-leja` (10 RequirementTemplates met
  `version='gmb_dinther_v1'` en HAS_MAPPING → Mapping → HAS_FILTER → Filter).

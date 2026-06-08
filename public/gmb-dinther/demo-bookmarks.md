---
title: "Neo4j browser bookmarks — Spoor 2 demo RWZI Dinther"
demo_runtime: "neo4j-grids-tst-v3 (waar AT + CT + IfcClass samenkomen na pump-over)"
rt_staging: "neo4j-leja (waar de 37 RequirementTemplates nu live staan)"
casus: "Methanol-doseringsinstallatie GMB Dinther"
opmerking: "Per stap een primaire query op de methanol-data. Als die nog niet 100% in tst-v3 is overgepompt vóór de demo, gebruik dan de fallback op de ZGEM-tank — zelfde pattern, andere context."
---

# Demo-bookmarks Spoor 2 — 8 stappen

De demo-script in `demo-spoor2.html` loopt 8 stappen door de keten van fysiek object → property → eis → compliance → wettelijk kader → bron. Hieronder per stap één primaire query + fallback.

**Conventie**: `<methanol-versie>` = na pump-over van leja → tst-v3. `<zgem-fallback>` = werkt al, zelfde GRiDS-pattern, andere assets.

---

## Stap 1 — Open de methanol-opslagtank (asset-template)

**Doel**: één knooppunt, alle properties zichtbaar, klikbare bron-verwijzingen per property.

**Primaire query** — `neo4j-grids-tst-v3`:

```cypher
MATCH (at:AssetTemplate {name: 'Methanol-opslagtank'})-[:HAS_PROPERTY]->(p)
OPTIONAL MATCH (p)-[:HAS_VALUE]->(v)
RETURN at, p, v
```

**Fallback (ZGEM)** — als methanol-AT nog niet over is:

```cypher
MATCH (at:AssetTemplate {name: 'Ondergrondse opslagtank'})-[:HAS_PROPERTY]->(p)
OPTIONAL MATCH (p)-[:HAS_VALUE]->(v)
RETURN at, p, v
```

**Te tonen**: 12+ properties (Locatie, Volume, Vloeistoftype, Fabrikant, etc.) als hangers aan het AT-knooppunt. Eén property aanwijzen — die heeft een Document/Source eraan.

---

## Stap 2 — Klik door naar bsdd (extern)

**Geen query** — dit is een browser-klik vanaf de property `IfcClass` naar:
[https://search.bsdd.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcTank](https://search.bsdd.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcTank)

**Tab open laten**. Punt: officiële IFC 4.3-definitie van IfcTank, een klik vanaf de graph.

---

## Stap 3 — Klik door naar Aquo (extern)

**Geen query** — browser-klik vanaf property `AquoConcept` naar:
[https://www.aquo.nl/index.php/Werkveld_Afvalwaterketen](https://www.aquo.nl/index.php/Werkveld_Afvalwaterketen)

**Punt**: zelfde mechanisme. Open standaard, te raadplegen vanuit de graph.

---

## Stap 4 — Compliance-keten vanuit de tank

**Doel**: AT → 3 Compliance → elk gekoppeld aan LegalFramework, Document, Check, Actor.

**Primaire query** — `neo4j-grids-tst-v3`:

```cypher
MATCH (at:AssetTemplate {name: 'Methanol-opslagtank'})-[:HAS_COMPLIANCE]->(c:Compliance)
OPTIONAL MATCH (c)-[:HAS_LEGALFRAMEWORK]->(lf:LegalFramework)
OPTIONAL MATCH (c)-[:HAS_DOCUMENT]->(d:Document)
OPTIONAL MATCH (c)-[:HAS_CHECK]->(ch:Check)
OPTIONAL MATCH (c)-[:HAS_ACTOR]->(a:Actor)
RETURN at, c, lf, d, ch, a
```

**Fallback (ZGEM)** — werkt nu al:

```cypher
MATCH (at:AssetTemplate {name: 'Ondergrondse opslagtank'})-[:HAS_COMPLIANCE]->(c:Compliance)
OPTIONAL MATCH (c)-[:HAS_LEGALFRAMEWORK]->(lf:LegalFramework)
OPTIONAL MATCH (c)-[:HAS_DOCUMENT]->(d:Document)
OPTIONAL MATCH (c)-[:HAS_CHECK]->(ch:Check)
OPTIONAL MATCH (c)-[:HAS_ACTOR]->(a:Actor)
RETURN at, c, lf, d, ch, a
```

**Te tonen** (ZGEM-fallback resultaat als referentie):
- 3 Compliance: `Opleverdocument`, `3-jaarlijkse keuring`, `15-jaarlijkse inspectie`
- Elke gekoppeld aan LegalFramework `PGS 28/29/30`, Document `Tankinspectiecertificaat`, Check `Keuring ondergrondse tank`, Actor `ODRU/Omgevingsdienst`

**Methanol-versie verwachting**: 3 nieuwe CTs (KIWA-tankcertificaat, ATEX-installatie, Aquo asset-registratie) + de bestaande PGS-keten.

---

## Stap 5 — Requirement-keten vanuit Eis-00135

**Doel**: één eis (Eis-00135 C-bron doseerpompen) terug-traceren naar de RT, properties (Relatics-ID, OG-ID, verificatiegroepering), deeleisen.

**Primaire query A** — `neo4j-leja` (RT-laag staat hier compleet):

```cypher
MATCH (rt:RequirementTemplate {name: 'C-bron doseerpompen', version: 'gmb_dinther_v1'})
OPTIONAL MATCH (rt)-[:HAS_PROPERTY]->(p)-[:HAS_VALUE]->(v)
OPTIONAL MATCH (rt)-[:HAS_ITEM]->(ri)
OPTIONAL MATCH (rt)-[:HAS_DOCUMENT]->(d)
RETURN rt, p, v, ri, d
```

**Primaire query B** — `neo4j-grids-tst-v3` (na pump-over):

```cypher
MATCH (rt:RequirementTemplate {name: 'C-bron doseerpompen'})
OPTIONAL MATCH (rt)-[:HAS_PROPERTY]->(p)-[:HAS_VALUE]->(v)
OPTIONAL MATCH (rt)-[:HAS_ITEM]->(ri)
RETURN rt, p, v, ri
```

**Te tonen**: eis_id_relatics = `Eis-00135`, eis_id_og = `142`, verificatiegroepering = `C-bron doseerpompen_Methanoldoseringsinstallatie`. Eén klik op het Document leidt naar `knowledge.bimforce.com/gmb-dinther/eisen/eis-00135.md`.

---

## Stap 5.b — 9 RTs voor object Obj-00093 Methanoldoseringsinstallatie

**Doel**: RequirementSet met alle eisen die voor het hoofdobject gelden.

**Primaire query** — `neo4j-leja` (na pump-over: `neo4j-grids-tst-v3`):

```cypher
MATCH (rs:RequirementSet {version: 'gmb_dinther_v1'})
WHERE toLower(rs.name) CONTAINS 'methanoldoseringsinstallatie'
   OR toLower(rs.name) CONTAINS 'obj-00093'
OPTIONAL MATCH (rs)-[:HAS_REQUIREMENT|CONTAINS]->(rt:RequirementTemplate)
RETURN rs, collect(rt.name) AS requirements
```

**Te tonen**: een RequirementSet met 9+ RTs, waaronder Eis-00134, 00079, 00080, 00035 (PGS 31), 00133 (opslagvolume 45 m³), en de uitgangswaarden-eisen.

---

## Stap 6 — Filter-vergelijking origineel vs verrijkt IFC

**Doel**: zelfde query, twee modellen, ander resultaat. De power van een IfcClass-as-property tonen.

**Primaire query** — `neo4j-grids-tst-v3` (IFC moet geïmporteerd zijn):

```cypher
// Origineel IFC: alles staat als IfcBuildingElementProxy
MATCH (a:Asset)-[:HAS_IFC_CLASS|:CLASSIFIED_AS]->(ic:IfcClass)
WHERE ic.name = 'IfcTank' AND coalesce(a.source,'') = 'origineel'
RETURN count(a) AS tanks_in_origineel

UNION

MATCH (a:Asset)-[:HAS_IFC_CLASS|:CLASSIFIED_AS]->(ic:IfcClass)
WHERE ic.name = 'IfcTank' AND coalesce(a.source,'') = 'verrijkt'
RETURN count(a) AS tanks_in_verrijkt
```

**Pas property-naam aan** (`source`, `version`, `model_name`) afhankelijk van hoe de import is gelabeld.

**Verwachting**: origineel = 0, verrijkt = 1 (of meer als doseerpomp + lekbak ook herclassificeerd).

**Te tonen**: dit is de hardste boodschap van de hele demo. Eén regel verschil tussen "een blok beton met geometrie" en "een tank met semantische betekenis".

---

## Stap 7 — ILS-compliance-check op tank

**Doel**: dezelfde tank, nu met ILS-eisen (10 RTs uit A00029) als compliance-claim. Per RT: groen vinkje als verifieerbaar, rood kruis als niet aanwezig in het IFC.

**Primaire query** — `neo4j-leja` voor RT-lijst:

```cypher
MATCH (rt:RequirementTemplate {version: 'gmb_dinther_v1'})-[:HAS_PROPERTY]->(p {name: 'bron_document'})-[:HAS_VALUE]->(v)
WHERE v.value CONTAINS 'A00029' OR v.value CONTAINS 'ILS Revit'
RETURN rt.name AS ils_eis, v.value AS bron ORDER BY rt.name
```

**Verwachting**: 10 ILS-RTs (Locatie en oriëntatie, Classificatie, Fasering, Materialen, Propertieset, Doorsnijdingen, Bouwlaagindeling, Naamgeving bestanden, BIM basis ILS, Uitwisselformaten).

**Volgende stap** in de demo (mondeling, of via Slidev): tonen welke 4 van de 10 in het verrijkte IFC nog open staan (NL-SfB, NAA.K.T., Fase, IsExternal — die niet in het bron-IFC zaten).

---

## Stap 8 — Audit-trail rapportage

**Doel**: één query, alle properties + bron-URLs van de tank. De "oplever-bijlage in graph-vorm".

**Primaire query** — `neo4j-grids-tst-v3`:

```cypher
MATCH (at:AssetTemplate {name: 'Methanol-opslagtank'})-[:HAS_PROPERTY]->(p)
OPTIONAL MATCH (p)-[:HAS_VALUE]->(v)
OPTIONAL MATCH (p)-[:HAS_DOCUMENT|REFERENCES]->(d)
OPTIONAL MATCH (at)-[:HAS_COMPLIANCE]->(c)
RETURN p.name AS property,
       coalesce(v.value,'') AS waarde,
       coalesce(d.publishurl, d.url, '') AS bron_url,
       collect(DISTINCT c.name) AS dekt_compliance
ORDER BY property
```

**Fallback (ZGEM)** voor structuurdemonstratie:

```cypher
MATCH (at:AssetTemplate {name: 'Ondergrondse opslagtank'})-[:HAS_PROPERTY]->(p)
OPTIONAL MATCH (p)-[:HAS_VALUE]->(v)
OPTIONAL MATCH (at)-[:HAS_COMPLIANCE]->(c)
RETURN p.name AS property, coalesce(v.value,'') AS waarde, collect(DISTINCT c.name) AS dekt_compliance
ORDER BY property
```

**Te tonen**: tabel-output (browser kan export naar CSV). "Dit is de bijlage die je nu in 14 PDF's bij elkaar zoekt — hier komt het uit één query."

---

## Browser-bookmark setup

In de Neo4j browser:

1. Open browser → klik op het sterretje rechtsboven → **Favorites**
2. Per stap: paste de query → bewaar als bookmark met naam `Demo Spoor 2 — Stap X (titel)`
3. Group ze in een Folder `GMB Dinther Demo 2026-06-09`

Alternatief: dump alle queries als één `.cypher`-script. Per stap een comment-blok `// === Stap N ===` zodat je in volgorde kunt run-and-pause met `Ctrl+Enter` per blok.

## Pre-demo checklist (zelf draaien rond 13:00)

- [ ] tst-v3: methanol AT, CT, IfcClass aanwezig (pump-over gedaan)?
- [ ] tst-v3: bsdd-link op IfcClass-property werkt vanuit browser?
- [ ] tst-v3: minimaal één AT heeft Document-property met klikbare URL
- [ ] neo4j-leja: 37 RTs, 10 Documents met publishurl naar `/gmb-dinther/eisen/`
- [ ] `knowledge.bimforce.com/gmb-dinther/eisen/eis-00135.md` opent in browser
- [ ] Stap 6 query getest — `source`/`version` property-naam klopt voor jouw import

Bij twijfel — val terug op de ZGEM-tank queries. Het GRiDS-verhaal staat dan op de bestaande bibliotheek.

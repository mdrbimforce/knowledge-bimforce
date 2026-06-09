---
title: "Neo4j browser bookmarks — Spoor 2 demo RWZI Dinther"
demo_runtime: "neo4j-leja (AT-batch + RT-staging samen)"
ifc_runtime: "neo4j-grids-tst-v3 (alleen voor stap 6 — IFC-filter-vergelijking)"
casus: "Methanol-doseringsinstallatie GMB Dinther"
assetset_bfguid: "eb60edbf-6fd6-402a-a294-ba17c9c2911b"
version: "gmb_dinther_v1"
laatst_bijgewerkt: "2026-06-08 (build #3 met eigen subgraph per AT + Values + Costs)"
---

# Demo-bookmarks Spoor 2 — 9 stappen

De demo-script in `demo-spoor2.html` loopt 9 stappen door de keten van fysiek
object → property → eis → compliance → wettelijk kader → bron → kosten.
Hieronder per stap één primaire query, plus duiding voor wat je live op het
scherm wilt tonen.

**Belangrijkste runtime**: `neo4j-leja` — daar staan onze 16 AssetTemplates +
de 36 RequirementTemplates + 10 verrijkte V&V-eisen + alle bron-PropertyTemplates
en FilterTemplates. Eén MCP, één browser-tab.

**Uitzondering**: stap 6 (IFC-filter origineel vs verrijkt) draait op
`neo4j-grids-tst-v3` omdat daar het geïmporteerde IFC-model staat.

---

## Stap 1 — Open de methanol-opslagtank (AssetTemplate)

**Doel**: één knooppunt, alle properties zichtbaar via HAS_VALUE → Value met
juiste datatype, plus klikbare bron-verwijzingen via BronDocument property.

**Query** — `neo4j-leja`:

```cypher
MATCH (at:AssetTemplate {name: 'AT.Methanol-opslagtank', version: 'gmb_dinther_v1'})
      -[:HAS_PROPERTY]->(p:Property)-[:HAS_VALUE]->(v:Value)
RETURN at, p, v
```

**Te tonen**: 15 properties (Tag=8600TK50, IfcClass=IfcTank, NominaleDiameter=2.5,
NominaleLengte=9.5, InhoudTankLiter=45000.0, Coating=Permacor 2107 HS,
Dubbelwandig=true, KathodischeBescherming=true, etc.) — elk met eigen Value-node.
Datatypes zijn correct: float voor getallen, boolean voor true/false, string voor tekst.

**Punt**: dit is wat een GRiDS-asset is — geen eindeloze property-bag op één node,
maar een graph waar elke property een **eigen knoop** is met een Value en (later)
een bron-document, een meetdatum, een verificatiedrempel.

---

## Stap 2 — Klik door naar bsdd (extern)

**Geen query** — browser-klik vanaf de property `IfcClass` (waarde `IfcTank`) naar:

[https://search.bsdd.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcTank](https://search.bsdd.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcTank)

**Punt**: de IfcClass-waarde is geen vrij tekstveld maar een verwijzing naar
de officiële buildingSMART Data Dictionary. Eén klik. Tab open laten voor terugkeer.

---

## Stap 3 — Klik door naar Aquo (extern)

**Geen query** — browser-klik vanaf property `AquoConcept` (waarde
`OpslagvoorzieningKoolstofbron`) naar:

[https://www.aquo.nl/index.php/Werkveld_Afvalwaterketen](https://www.aquo.nl/index.php/Werkveld_Afvalwaterketen)

**Punt**: zelfde mechanisme als bsdd. Aquo is de domeinstandaard voor de
waterketen. Vanuit één AT-knoop zijn beide internationaal/nationaal-erkende
woordenlijsten direct te raadplegen.

---

## Stap 4 — Compliance-keten vanuit de tank

**Doel**: AT → 3 Compliance-knopen → elk met eigen LegalFramework, Document,
Check (met CheckItems), Actor. Toont hoe één asset meerdere parallelle
compliance-verplichtingen draagt.

**Query** — `neo4j-leja`:

```cypher
MATCH (at:AssetTemplate {name: 'AT.Methanol-opslagtank', version: 'gmb_dinther_v1'})
      -[:HAS_COMPLIANCE]->(c:Compliance)
OPTIONAL MATCH (c)-[:HAS_LEGALFRAMEWORK]->(lf:LegalFramework)
OPTIONAL MATCH (c)-[:HAS_DOCUMENT]->(d:Document)
OPTIONAL MATCH (c)-[:HAS_ACTOR]->(a:Actor)
OPTIONAL MATCH (c)-[:HAS_CHECK]->(ch:Check)-[:HAS_CHECKITEM]->(ci:CheckItem)
RETURN at, c, lf, d, a, ch, ci
```

**Te tonen** (resultaat):

- 3 Compliances: `Opleverdocument SIKB 7800 / BRL-K903 / PGS 31 certificaat`,
  `Opleverdocument PGS 31 + ATEX 114/153 inspectie`,
  `Jaarlijkse PGS 31 + ATEX-keuring methanol-tankinstallatie`
- Elke Compliance heeft eigen LegalFramework `PGS 31 + ATEX 114/153 + SIKB 7800 + BRL-K903`
- Eigen Document `PGS 31 + ATEX 114/153 inspectiecertificaat methanol-installatie`
- Eigen Check met 4-7 CheckItems (uitvoeringscontroles per Check)
- Eigen Actor `SCIOS-gecertificeerd tankinstallateur (BRL SIKB 7800/BRL-K903)`

**Speaker-note**: voor productie zou per regelgeving een eigen ComplianceTemplate
moeten bestaan met scope-specifieke Checks. Hier hergebruiken we de generieke
bron-Compliances en hernoemen ze voor methanol-context. Beperking, geen blokker.

**Anti-shared-children**: elk AT heeft EIGEN Compliance-children — geen sharing
tussen templates. Klik in browser door naar een ander AT (bv. AT.Vulpunt) om
te zien dat de Compliance-children daar fysiek andere knopen zijn met andere
bfguids, ook al is de naam identiek.

---

## Stap 5 — Requirement-keten vanuit Eis-00135 (showcase)

**Doel**: één eis (Eis-00135 C-bron doseerpompen) terug-traceren naar de RT,
zijn properties, de Mapping → Filter, en het Document met bron-PDF +
referenceurl naar de gepubliceerde markdown.

**Query** — `neo4j-leja`:

```cypher
MATCH (rt:RequirementTemplate {name: 'C-bron doseerpompen', version: 'gmb_dinther_v1'})
OPTIONAL MATCH (rt)-[:HAS_PROPERTY]->(p:Property)-[:HAS_VALUE]->(v:Value)
OPTIONAL MATCH (rt)-[:HAS_REQUIREMENTITEM]->(ri:RequirementItem)
OPTIONAL MATCH (rt)-[:HAS_DOCUMENT]->(d:Document)
OPTIONAL MATCH (rt)-[:HAS_MAPPING]->(m:Mapping)-[:HAS_FILTER]->(f:Filter)
RETURN rt, p, v, ri, d, m, f
```

**Te tonen**:

- `rt.name = "C-bron doseerpompen"`
- Properties: `eis_id_relatics = Eis-00135`, `eis_id_og = 142`,
  `verificatiegroepering = C-bron doseerpompen_Methanoldoseringsinstallatie`,
  `AantalPompen`, `Frequentiegeregeld`, `Membraantype` (de 3 aanvullende deeleisen)
- Mapping → Filter `F.Tag.Doseerpomp` — wat de RT laat triggeren op een tag-match
- Document `UO-spec A00095 sect 2.2 (doseerpomp)` met
  `referenceurl = https://knowledge.bimforce.com/gmb-dinther/eisen/eis-00135.md`

**Klik**: open de referenceurl in nieuwe tab — daar staat de verrijkte
markdown met V&V-koppeling sectie + Cypher voor demo + bron-context uit UO.

---

## Stap 5b — Alle eisen voor object Obj-00093 Methanoldoseringsinstallatie

**Doel**: een RequirementSet met de eisen die voor het hoofdobject gelden,
inclusief de 9 verrijkte V&V-eisen.

**Query** — `neo4j-leja`:

```cypher
MATCH (rs:RequirementSet {version: 'gmb_dinther_v1'})
WHERE toLower(rs.name) CONTAINS 'methanoldoseringsinstallatie'
   OR toLower(rs.name) CONTAINS 'obj-00093'
   OR toLower(rs.name) CONTAINS 'eisenset hoofd'
OPTIONAL MATCH (rs)-[:HAS_REQUIREMENTTEMPLATE|CONTAINS]->(rt:RequirementTemplate)
OPTIONAL MATCH (rt)-[:HAS_MAPPING]->(:Mapping)-[:HAS_FILTER]->(f:Filter)
RETURN rs.name AS set, collect(DISTINCT {rt: rt.name, filter: f.name}) AS requirements
```

**Te tonen**: een lijst met 9+ RTs voor het hoofdobject. De RTs die een
Filter via Mapping hebben zijn de 9 verrijkte V&V-eisen — die kunnen morgen
in stap 6 daadwerkelijk geverifieerd worden tegen het IFC-model.

---

## Stap 6 — Filter-vergelijking origineel vs verrijkt IFC

**Doel**: zelfde Filter (uit graph), twee IFC-modellen, ander resultaat.
De power van een IfcClass-as-property tonen.

**Runtime**: `neo4j-grids-tst-v3` (waar de twee IFC-modellen geïmporteerd zijn —
origineel `Z_DB_8114NT_ALG_3D_CS_Methanoldoseringsinstallatie.ifc` en
`_verrijkt.ifc`).

**Query** — pas property-naam (`source`, `model_version` of equivalent) aan op
de import-conventie:

```cypher
// Origineel IFC: 7 entities staan als IfcBuildingElementProxy
MATCH (a:Asset)
WHERE a.IfcClass = 'IfcBuildingElementProxy'
  AND coalesce(a.source, a.model_version, '') CONTAINS 'origineel'
RETURN count(a) AS proxies_in_origineel

UNION ALL

// Verrijkt IFC: dezelfde 7 entities zijn nu IfcTank/IfcPump/etc.
MATCH (a:Asset)
WHERE a.IfcClass = 'IfcBuildingElementProxy'
  AND coalesce(a.source, a.model_version, '') CONTAINS 'verrijkt'
RETURN count(a) AS proxies_in_verrijkt
```

**Verwachting**: origineel = 7 (alle methanol-componenten als generieke proxy),
verrijkt = 0 (allemaal correct geclassificeerd via `ifc_verrijken.py`).

**Te tonen**: dit is de hardste boodschap van de hele demo. Eén regel
verschil tussen "een blok beton met geometrie" en "een tank met semantische
betekenis". De Filter `F.IfcClass.NietProxy` uit `ils-e01.md` triggert hier
op exact deze conditie.

---

## Stap 7 — ILS-compliance-check (10 ILS-eisen uit A00029)

**Doel**: de 10 ILS-modelleereisen uit A00029 als verifieerbare claims.
Per RT: groen vinkje als er een Filter is en die in het verrijkte model
slaagt, rood kruis als er nog handwerk nodig is.

**Query** — `neo4j-leja`:

```cypher
MATCH (rt:RequirementTemplate {version: 'gmb_dinther_v1'})
      -[:HAS_DOCUMENT]->(d:Document)
WHERE d.name CONTAINS 'A00029' OR d.name CONTAINS 'ILS Revit' OR d.name CONTAINS 'BIM Basis ILS'
OPTIONAL MATCH (rt)-[:HAS_MAPPING]->(:Mapping)-[:HAS_FILTER]->(f:Filter)
RETURN rt.name AS ils_eis, d.name AS bron, f.name AS filter, d.referenceurl AS url
ORDER BY rt.name
```

**Verwachting**: minstens ILS-E01 (IFC entity-class conform BIM Basis ILS,
filter `F.IfcClass.NietProxy`) en ILS-E07 (Generic Model check, filter
`F.IfcClass.GenericModelCheck`) komen terug. Plus de generieke 10 ILS-mds
(zonder Filter — die zijn nog niet geverifieerd in graph, maar wel gedocumenteerd).

**Volgende stap** in de demo (mondeling, of via Slidev): tonen welke ILS-eisen
in het verrijkte IFC slagen en welke nog open staan (NL-SfB, NAA.K.T., Fase,
IsExternal — die hadden ook een Filter nodig).

---

## Stap 8 — Audit-trail rapportage (alle properties + bron-URLs)

**Doel**: één query → tabel met alle properties, hun waarde, hun bron-document.
De "oplever-bijlage in graph-vorm".

**Query** — `neo4j-leja`:

```cypher
MATCH (at:AssetTemplate {name: 'AT.Methanol-opslagtank', version: 'gmb_dinther_v1'})
      -[:HAS_PROPERTY]->(p:Property)-[:HAS_VALUE]->(v:Value)
OPTIONAL MATCH (at)-[:HAS_PROPERTY]->(brondoc:Property {name: 'BronDocument'})
                -[:HAS_VALUE]->(brondoc_v:Value)
OPTIONAL MATCH (at)-[:HAS_COMPLIANCE]->(c:Compliance)
RETURN p.name AS property,
       v.value AS waarde,
       v.datatype AS type,
       brondoc_v.value AS bron_document,
       collect(DISTINCT c.name) AS compliance_keten
ORDER BY property
```

**Te tonen**: tabel-output (browser kan export naar CSV). Per property zijn
waarde, datatype, gemeenschappelijke bron-document referentie, en de 3
Compliances die op dit asset rusten. "Dit is de bijlage die je nu in 14 PDFs
bij elkaar zoekt — hier komt het uit één query."

---

## Stap 9 — Cost-overzicht (MJOP-look)

**Doel**: vanuit het AssetTemplate-niveau de meerjaren-kostenstructuur tonen.
Per AT: 6 Cost-types, elk met value, unit, cycle (jaren) en costBasis (bron).

**Query** — `neo4j-leja`:

```cypher
MATCH (asx:AssetSet {bfguid: 'eb60edbf-6fd6-402a-a294-ba17c9c2911b'})
      -[:HAS_ASSETTEMPLATE]->(at:AssetTemplate)
      -[:HAS_COST]->(c)
RETURN at.code AS code,
       at.name AS asset,
       labels(c)[0] AS cost_type,
       c.value AS euro,
       c.cycle AS cycle_jaren,
       c.costBasis AS bron
ORDER BY at.code, cost_type
```

**Te tonen**: 96 regels (16 ATs × 6 Cost-types). Filter in browser op één
AT (bv. AT.Methanol-opslagtank) om het volledige MJOP-profiel van één asset
te tonen: InitialCost EUR 69.570 (cycle 0, eenmalig, Reehorst-bron),
OperationalMaintenanceCost EUR 2.500 (cycle 1, jaarlijks),
RenovationCost EUR 20.000 (cycle 15j), ReplacementCost EUR 70.000 (cycle 25j),
ResidualValue EUR 3.500 (eenmalig na levensduur).

**Speaker-note**: instrumentatie-ATs (M.10-M.14) hebben kortere cycles
(renov 10j, repl 15j) — sneller verouderd dan structurele componenten.
Hoofdgroep M.00 aggregeert het systeemtotaal EUR 283.072 (Calculatie-xlsx).

**Bonus-query** — totaal MJOP voor de hele installatie over 30 jaar:

```cypher
MATCH (:AssetSet {bfguid: 'eb60edbf-6fd6-402a-a294-ba17c9c2911b'})
      -[:HAS_ASSETTEMPLATE]->(at:AssetTemplate)-[:HAS_COST]->(c)
WHERE at.code <> 'M.00'  // hoofdgroep niet meetellen, anders dubbel
WITH at, labels(c)[0] AS cost_type, c.value AS v, coalesce(c.cycle, 0) AS cy
WITH at.name AS asset,
     sum(CASE WHEN cost_type = 'InitialCost' THEN v END) AS initial,
     sum(CASE WHEN cost_type IN ['OperationalEnergyCost','OperationalMaintenanceCost'] THEN v * 30 END) AS opex_30j,
     sum(CASE WHEN cost_type = 'RenovationCost' AND cy > 0 THEN v * floor(30.0 / cy) END) AS renov_30j,
     sum(CASE WHEN cost_type = 'ReplacementCost' AND cy > 0 THEN v * floor(30.0 / cy) END) AS repl_30j
RETURN asset, initial, opex_30j, renov_30j, repl_30j,
       coalesce(initial,0) + coalesce(opex_30j,0) + coalesce(renov_30j,0) + coalesce(repl_30j,0) AS tco_30j
ORDER BY tco_30j DESC
```

**Te tonen**: TCO-tabel over 30 jaar per AT. Geeft hard cijfer voor het
"hoezo zou je dit allemaal vastleggen?"-argument: omdat de OPEX over 30 jaar
vaak hoger is dan de InitialCost.

---

## Browser-bookmark setup

In de Neo4j browser (https://browser.neo4j.io of self-hosted):

1. Open browser → klik op het sterretje rechtsboven → **Favorites**
2. Per stap: paste de query → bewaar als bookmark met naam
   `Demo Spoor 2 — Stap X (titel)`
3. Groepeer ze in een Folder `GMB Dinther Demo 2026-06-09`

**Alternatief**: dump alle queries als één `.cypher`-script. Per stap een
comment-blok `// === Stap N ===` zodat je in volgorde kunt run-and-pause
met `Ctrl+Enter` per blok.

## Pre-demo checklist (zelf draaien rond 13:00)

- [ ] neo4j-leja: AssetSet `eb60edbf-6fd6-402a-a294-ba17c9c2911b` bestaat,
      16 AssetTemplates onder de naam `AT.Methanol-*`
- [ ] neo4j-leja: stap 1 query geeft 15 properties met values
- [ ] neo4j-leja: stap 4 query geeft 3 Compliances met eigen children
      (geen sharing tussen ATs!)
- [ ] neo4j-leja: stap 5 query geeft Filter `F.Tag.Doseerpomp` voor Eis-00135
- [ ] neo4j-leja: stap 8 query geeft een leesbare tabel met alle properties
- [ ] neo4j-leja: stap 9 query geeft Cost-overzicht met cycles
- [ ] neo4j-grids-tst-v3: IFC-import gedaan, `Asset.IfcClass` + `Asset.source`
      properties aanwezig voor stap 6 query
- [ ] `https://knowledge.bimforce.com/gmb-dinther/eisen/eis-00135.md` opent in browser
- [ ] bsdd-link op IfcTank werkt (`search.bsdd.buildingsmart.org`)

## Cruciale bfguids (cheat sheet voor live demo)

| Naam | bfguid |
|------|--------|
| AssetSet Methanol-doseerinstallatie | `eb60edbf-6fd6-402a-a294-ba17c9c2911b` |
| Department Technisch Beheer | `c644ecb9-9fd1-41e3-94fe-05e1f84c7075` |
| PropertySet Methanol RWZI Dinther | (zoek via `MATCH (ps:PropertySet {version:'gmb_dinther_v1'})`) |

Per individueel AT — zoek live in browser:

```cypher
MATCH (at:AssetTemplate {version: 'gmb_dinther_v1'})
RETURN at.code, at.name, at.bfguid ORDER BY at.code
```

Bij twijfel — alle queries op neo4j-leja werken al, geen pump-over nodig
voor 8 van 9 stappen. Alleen stap 6 (IFC-filter) heeft tst-v3 nodig.

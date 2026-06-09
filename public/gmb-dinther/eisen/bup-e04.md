---
eis_id: BUP-E04
type: verrijkte-vv-eis
eistitel: "3D-modeldata sluit aan op WAM asset-systeem"
bron_document: "A00008 BUP par 2 (asset-systeem koppeling)"
bron_pdf: "01_documenten/_in/Databronnen input sessie 2/Z_DI_3114NT_ALG_RP_CO_BUP (BIM uitvoeringsplan) - A00008.pdf"
project: "RWZI Dinther Nutriëntenverwijdering — methanol-doseringsinstallatie"
graph_rt_bfguid: "d2b72f14-5912-4e6d-9bc0-34460302435b"
graph_filter_bfguid: "af9cd9bb-a5ff-4c4c-9785-dd336cbe6049"
---

# BUP-E04 — 3D-modeldata sluit aan op WAM asset-systeem

## Eis

> 3D-modeldata van assets (pompen, tanks, leidingen, instrumentatie) krijgen een WAM-AssetID property die aansluit op het asset-management-systeem van Waterschap Aa en Maas. Zonder deze koppeling kan de operationele beheerfase de model-data niet hergebruiken.

## Bron

- Document: A00008 BUP par 2 (asset-systeem koppeling)
- Pad: `01_documenten/_in/Databronnen input sessie 2/Z_DI_3114NT_ALG_RP_CO_BUP (BIM uitvoeringsplan) - A00008.pdf`

## V&V-koppeling (graph)

In `neo4j-leja` (version `gmb_dinther_v1`) is deze eis gekoppeld via een Mapping aan een Filter:

| Veld | Waarde |
|------|--------|
| RequirementTemplate | `3D-modeldata sluit aan op WAM asset-systeem` |
| RT-bfguid | `d2b72f14-5912-4e6d-9bc0-34460302435b` |
| Filter | `F.Property.WAMAssetID` |
| Filter-bfguid | `af9cd9bb-a5ff-4c4c-9785-dd336cbe6049` |
| Bron-document | `A00008 BUP par 2 (asset-systeem koppeling)` |
| Bron-PDF | `01_documenten/_in/Databronnen input sessie 2/Z_DI_3114NT_ALG_RP_CO_BUP (BIM uitvoeringsplan) - A00008.pdf` |
| Reference-URL | <https://knowledge.bimforce.com/gmb-dinther/eisen/bup-e04> |

### Cypher voor demo

```cypher
MATCH (rt:RequirementTemplate {bfguid: 'd2b72f14-5912-4e6d-9bc0-34460302435b'})
      -[:HAS_MAPPING]->(m:Mapping)-[:HAS_FILTER]->(f:Filter),
      (rt)-[:HAS_DOCUMENT]->(d:Document)
RETURN rt.name, f.name, d.name, d.path, d.referenceurl
```

## Bron-context

> BUP A00008 par 2 stelt als BIM-doel: '3D-modeldata wordt herbruikbaar gemaakt voor de beheerfase via koppeling aan WAM-asset-systeem'. De Property WAMAssetID is gedefinieerd in de Methanol-installatie PropertySet en moet bij elke project-Asset gevuld zijn.

*Bron: A00008 BIM uitvoeringsplan par 2 BIM-doelen + 3 BIM-toepassingen*

## Demo-context (spoor 2)

Filter F.Property.WAMAssetID triggert als de Property leeg of ontbrekend is. Voor de demo: laat zien dat zonder WAMAssetID de asset niet exporteerbaar is naar WAM, maar mét WAMAssetID de asset rechtstreeks doorgezet kan worden — de hele point van het LD-model.

## Disclaimer

Dit materiaal is in eigendom overgedragen aan GMB Civiel B.V. conform offerte 25.4.007.

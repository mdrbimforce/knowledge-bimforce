---
eis_id: ILS-E07
type: verrijkte-vv-eis
eistitel: "Revit Family Category niet Generic Model"
bron_document: "A00035 modelleerafspraken (geen Generic Model)"
bron_pdf: "01_documenten/_in/Databronnen input sessie 2/Z_DI_3114NT_ALG_RP_CO_Standaard modelleerafspraken - A00035.pdf"
project: "RWZI Dinther Nutriëntenverwijdering — methanol-doseringsinstallatie"
graph_rt_bfguid: "56cbb6ea-0beb-44a7-9e5a-ded844a80d80"
graph_filter_bfguid: "4fa46004-189e-484c-bc50-0218835dcd5d"
---

# ILS-E07 — Revit Family Category niet Generic Model

## Eis

> Revit-families worden gemodelleerd in de juiste discipline-Category (Mechanical Equipment, Plumbing Fixtures, Piping etc.). De Generic Model category mag niet gebruikt worden tenzij geen passende category bestaat en dat in de modelleerafspraken is geaccepteerd.

## Bron

- Document: A00035 modelleerafspraken (geen Generic Model)
- Pad: `01_documenten/_in/Databronnen input sessie 2/Z_DI_3114NT_ALG_RP_CO_Standaard modelleerafspraken - A00035.pdf`

## V&V-koppeling (graph)

In `neo4j-leja` (version `gmb_dinther_v1`) is deze eis gekoppeld via een Mapping aan een Filter:

| Veld | Waarde |
|------|--------|
| RequirementTemplate | `Revit Family Category - geen Generic Model` |
| RT-bfguid | `56cbb6ea-0beb-44a7-9e5a-ded844a80d80` |
| Filter | `F.IfcClass.GenericModelCheck` |
| Filter-bfguid | `4fa46004-189e-484c-bc50-0218835dcd5d` |
| Bron-document | `A00035 modelleerafspraken (geen Generic Model)` |
| Bron-PDF | `01_documenten/_in/Databronnen input sessie 2/Z_DI_3114NT_ALG_RP_CO_Standaard modelleerafspraken - A00035.pdf` |
| Reference-URL | <https://knowledge.bimforce.com/gmb-dinther/eisen/ils-e07> |

### Cypher voor demo

```cypher
MATCH (rt:RequirementTemplate {bfguid: '56cbb6ea-0beb-44a7-9e5a-ded844a80d80'})
      -[:HAS_MAPPING]->(m:Mapping)-[:HAS_FILTER]->(f:Filter),
      (rt)-[:HAS_DOCUMENT]->(d:Document)
RETURN rt.name, f.name, d.name, d.path, d.referenceurl
```

## Bron-context

> De Standaard modelleerafspraken A00035 verbieden Generic Model voor componenten die in IFC een specifieke IfcClass kunnen krijgen. Generic Model resulteert in IFC-export als IfcBuildingElementProxy, wat aan de receiving-kant tot interpretatieverlies leidt.

*Bron: A00035 Standaard modelleerafspraken §3 Family Category-keuze*

## Demo-context (spoor 2)

Deze eis is een soft-rule die als hard-check geïmplementeerd is via Filter F.IfcClass.GenericModelCheck — als IfcBuildingElementProxy én onderdeel van Mechanical/Plumbing discipline → fail.

## Disclaimer

Dit materiaal is in eigendom overgedragen aan GMB Civiel B.V. conform offerte 25.4.007.

---
eis_id: ILS-E01
type: verrijkte-vv-eis
eistitel: "IFC entity-class conform BIM Basis ILS"
bron_document: "A00029 ILS Revit + BIM Basis ILS digiGO"
bron_pdf: "01_documenten/_in/Databronnen input sessie 2/Z_DI_3114NT_ALG_RP_CO_ILS Revit - A00029.pdf"
project: "RWZI Dinther Nutriëntenverwijdering — methanol-doseringsinstallatie"
graph_rt_bfguid: "e5975130-c2e0-4e33-9f3b-f502b39e08cc"
graph_filter_bfguid: "145c490e-ec4a-4c2f-ba17-6de3c4d6d94b"
---

# ILS-E01 — IFC entity-class conform BIM Basis ILS

## Eis

> Elke 3D-object in het IFC-model krijgt een correcte IfcClass conform de BIM Basis ILS van digiGO. Geen IfcBuildingElementProxy tenzij gemotiveerd en geaccepteerd door de informatiemanager.

## Bron

- Document: A00029 ILS Revit + BIM Basis ILS digiGO
- Pad: `01_documenten/_in/Databronnen input sessie 2/Z_DI_3114NT_ALG_RP_CO_ILS Revit - A00029.pdf`

## V&V-koppeling (graph)

In `neo4j-leja` (version `gmb_dinther_v1`) is deze eis gekoppeld via een Mapping aan een Filter:

| Veld | Waarde |
|------|--------|
| RequirementTemplate | `IFC entity-class conform BIM Basis ILS` |
| RT-bfguid | `e5975130-c2e0-4e33-9f3b-f502b39e08cc` |
| Filter | `F.IfcClass.NietProxy` |
| Filter-bfguid | `145c490e-ec4a-4c2f-ba17-6de3c4d6d94b` |
| Bron-document | `A00029 ILS Revit + BIM Basis ILS digiGO` |
| Bron-PDF | `01_documenten/_in/Databronnen input sessie 2/Z_DI_3114NT_ALG_RP_CO_ILS Revit - A00029.pdf` |
| Reference-URL | <https://knowledge.bimforce.com/gmb-dinther/eisen/ils-e01> |

### Cypher voor demo

```cypher
MATCH (rt:RequirementTemplate {bfguid: 'e5975130-c2e0-4e33-9f3b-f502b39e08cc'})
      -[:HAS_MAPPING]->(m:Mapping)-[:HAS_FILTER]->(f:Filter),
      (rt)-[:HAS_DOCUMENT]->(d:Document)
RETURN rt.name, f.name, d.name, d.path, d.referenceurl
```

## Bron-context

> Het originele IFC-model van de methanoldoseringsinstallatie bevatte 7 IFCBUILDINGELEMENTPROXY entities, terwijl die specifieke onderdelen wel correct als IfcTank, IfcPump, IfcPipeSegment, IfcSanitaryTerminal, IfcDistributionFlowElement of IfcFlowFitting geclassificeerd hadden kunnen worden. Via ifc_verrijken.py zijn deze 7 entities + types geherclassificeerd.

*Bron: ILS Revit A00029 + BIM Basis ILS digiGO + ifc_verrijken.py output*

## Demo-context (spoor 2)

Filter F.IfcClass.NietProxy triggert op `IfcClass = 'IfcBuildingElementProxy'`. In spoor-2 demo: laat zien hoe het verrijkte IFC slaagt voor deze filter waar het originele faalt.

## Disclaimer

Dit materiaal is in eigendom overgedragen aan GMB Civiel B.V. conform offerte 25.4.007.

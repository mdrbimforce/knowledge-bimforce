# GMB-opleiding Dag 2 — Workshops

Standalone HTML voor de twee workshops + spoor-2 demo van **dinsdag 9 juni 2026**.

## Bestanden

| Bestand | Inhoud |
|---|---|
| `index.html` | Landingspagina met overzicht, tijdsindeling en bron-documenten |
| `workshop-1.html` | Workshop 1 — Valkuilen, 5 scenario-cards (accordion) |
| `workshop-2.html` | Workshop 2 — Rolprofielen, 5 rollen + plenair template |
| `demo-spoor2.html` | Spoor-2 demo-script in 8 stappen + brug naar Deel 2 |
| `styles.css` | Gedeelde styling — bimforce brand v2.0 |

## Lokaal bekijken

```bash
cd gmb-dinther-workshops
python -m http.server 8080
# open http://localhost:8080
```

Of: dubbelklik `index.html` (werkt ook zonder server).

## Deploy naar knowledge.bimforce.com

Sub-route `knowledge.bimforce.com/gmb-dinther` op Cloudflare Pages (Astro shell uit quest-110).

Twee opties:
1. **Snel**: Cloudflare Pages "Direct Upload" — zip de folder, upload als sub-deployment onder route `/gmb-dinther`.
2. **Astro-integratie**: kopieer de 4 HTML's + `styles.css` naar `apps/astro/public/gmb-dinther/` van knowledge.bimforce.com en `pnpm build`.

Voor de workshop op dinsdag is optie 1 voldoende — minimum vereiste:
- Project URL: `https://knowledge.bimforce.com/gmb-dinther/`
- Navigatie tussen pagina's blijft relatief (werkt out-of-the-box).

## Content-bron

Alle scenarios, citaten en getallen komen uit de aangeleverde projectstukken in:
`Mijn Drive/200_projecten/25.4.008 GMB_opleiding/01_documenten/_in/Databronnen input sessie 2/`

- Offerte Reehorst 4704-rev.02
- Z_DI_3114NT UO-spec A00095
- Databronnen.xlsx (Eisenset + Calculatie)
- Z_DB_8114NT IFC (origineel + `_verrijkt.ifc` na herclassificatie)
- A00008 BUP + A00029 ILS Revit + A00035 Modelleerafspraken

## Datamodel in graph

De spoor-2 demo verwijst naar de template-laag die in `neo4j-grids-tst-v3` staat
onder Department "Technisch Beheer", version `gmb_dinther_v1`:

- 62 PropertyTemplates
- 6 RequirementSets met 36 RequirementTemplates
- 8 Filters (gericht op herclassificeerd IFC)
- 5 nieuwe LegalFrameworks (PGS 28, PGS 31, BRL-K 903, BIM Basis ILS, Aquo)
- 3 ComplianceTemplates
- 1 AssetSet met 16 AssetTemplates

Stap 6 (Asset-instances vanuit verrijkt IFC) wordt na akkoord van het datamodel ingericht.

## Brand-voice

- Lowercase "bimforce" (consistent)
- Geen vermijdings-formules ("niet X, maar Y" — verboden)
- Geen emoji
- Sober, professional, feitelijk
- Conform `leja-brand v2.0` canonical

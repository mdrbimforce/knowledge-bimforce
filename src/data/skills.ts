// Skills voor Claude op /skills (2026-11-25).
//
// Een skill toevoegen: één object hieronder plus één zip in public/skills/<slug>.zip.
// De grootte van de zip leest de pagina bij de build zelf uit het bestand.
// Status 'binnenkort' toont de kaart zonder downloadknop (een zip is dan niet nodig).
// De downloadknop wijst naar /skills/dl/<slug>: die telt de download (zonder
// persoonsgegevens) en stuurt door naar /skills/<slug>.zip.

export type Handleiding = { label: string; href: string };

export type Skill = {
  /** Kleine letters, cijfers en streepjes; ook de naam van de zip en de map in de zip. */
  slug: string;
  titel: string;
  /** Categorie; kaarten worden per categorie gegroepeerd, in de volgorde van eerste voorkomen. */
  kicker: string;
  /** Twee à drie zinnen: wat doet hij, voor wie. */
  tekst: string;
  versie: string;
  /** Datum van deze versie, JJJJ-MM-DD. */
  datum: string;
  /** Bestandsnaam in public/skills/. */
  bestand: string;
  vereisten: string[];
  handleidingen?: Handleiding[];
  status: 'beschikbaar' | 'binnenkort';
};

export const skills: Skill[] = [
  {
    slug: 'presentatie-starter',
    titel: 'Presentatie-starter',
    kicker: 'Presentaties',
    tekst:
      'Claude maakt een presentatie als één HTML-bestand dat je meteen in het gesprek bekijkt en downloadt. ' +
      'Eerst de boodschap en een opzet in kopjes, dan slides met schema’s, sprekersnotities en afdrukken naar PDF. ' +
      'Voor wie zonder installatie wil beginnen.',
    versie: '1.0',
    datum: '2026-11-17',
    bestand: 'presentatie-starter.zip',
    vereisten: [
      'Claude in de browser of in de app, ook op het gratis abonnement',
      'De instelling voor bestanden maken staat aan',
    ],
    handleidingen: [{ label: 'Handleiding: een presentatie bouwen met Claude', href: '/skills/handleiding/presentatie-met-claude.html' }],
    status: 'beschikbaar',
  },
  {
    slug: 'slidev-starter',
    titel: 'Slidev-starter',
    kicker: 'Presentaties',
    tekst:
      'Claude zet een presentatie op in Slidev, schrijft de slides met je mee, toont ze in de browser en exporteert naar PDF en PowerPoint. ' +
      'Voor wie een presentatormodus, thema’s en een uitgebreidere export wil.',
    versie: '1.0',
    datum: '2026-11-17',
    bestand: 'slidev-starter.zip',
    vereisten: [
      'Claude Desktop met een betaald abonnement (onderdeel Code)',
      'Node.js 22.22 of hoger',
    ],
    handleidingen: [{ label: 'Handleiding: een presentatie bouwen met Claude (deel 2)', href: '/skills/handleiding/presentatie-met-claude.html' }],
    status: 'beschikbaar',
  },
  {
    slug: 'neo4j-starter',
    titel: 'Neo4j-starter',
    kicker: 'Neo4j en knowledge graphs',
    tekst:
      'Claude werkt veilig met een Neo4j-database: eerst het schema lezen, elke query in gewone taal uitleggen en vóór elke schrijfactie om akkoord vragen. ' +
      'Helpt ook een datamodel ontwerpen vanuit de vragen die je wilt stellen. Met oefendata in voorbeelddata.zip.',
    versie: '1.0',
    datum: '2026-11-23',
    bestand: 'neo4j-starter.zip',
    vereisten: [
      'Claude Desktop (de app, voor Windows of Mac)',
      'Neo4j Desktop of een andere Neo4j-database, met APOC',
      'De koppeling mcp-neo4j-cypher, gestart met uv',
    ],
    handleidingen: [
      { label: 'Handleiding: Claude koppelen aan Neo4j', href: '/skills/handleiding/claude-koppelen-aan-neo4j.html' },
      { label: 'Handleiding: werken met Neo4j', href: '/skills/handleiding/werken-met-neo4j.html' },
    ],
    status: 'beschikbaar',
  },
  // Revit en NLRS: eerste versie voor de NLRS-hackathon van 26-11-2026. Bron: de repo revit-agent
  // (tools/pak.py bouwt de zips). De skills werken in Revit via de Revit Agent-addin; die staat
  // hieronder, met broncode.
  {
    slug: 'revit-agent',
    titel: 'Revit Agent',
    kicker: 'Revit en NLRS',
    tekst:
      'Claude werkt mee in je eigen Revit: kijken welke modellen open staan, elementen en parameters lezen, views, sheets en materialen maken. ' +
      'Elke wijziging gaat eerst als proef en wordt pas uitgevoerd na jouw akkoord; bewaren doet de skill alleen als je erom vraagt. ' +
      'Eerste versie, gemaakt voor de NLRS-hackathon van 26 november 2026.',
    versie: '0.1',
    datum: '2026-11-25',
    bestand: 'revit-agent.zip',
    vereisten: [
      'Claude Desktop (onderdeel Code) of Claude Code',
      'Revit 2025 of 2026 met de Revit Agent-addin',
      'Python 3.10 of hoger',
    ],
    handleidingen: [{ label: 'Naslag: alle opdrachten van de addin', href: '/skills/revit-agent/opdrachten/' }],
    status: 'beschikbaar',
  },
  {
    slug: 'nlrs-agent',
    titel: 'NLRS Agent',
    kicker: 'Revit en NLRS',
    tekst:
      'Claude controleert of een Revit-model de NLRS volgt: namen tegen de Naamgenerator, shared parameters op naam en GUID, materialen, en de Assembly Code tegen NL-SfB. ' +
      'Je krijgt een rapport met een score per onderdeel en een herstelplan; hernoemen gaat eerst als proef. ' +
      'De skill haalt de NLRS-bestanden zelf op bij de Revit Standards Foundation.',
    versie: '0.1',
    datum: '2026-11-25',
    bestand: 'nlrs-agent.zip',
    vereisten: [
      'Claude Desktop (onderdeel Code) of Claude Code',
      'Python 3.10 of hoger',
      'Voor het uitlezen en herstellen van een model: Revit 2025 of 2026 met de Revit Agent-addin',
    ],
    status: 'beschikbaar',
  },
  {
    slug: 'ifc-ils-export',
    titel: 'IFC-export volgens een ILS',
    kicker: 'Revit en NLRS',
    tekst:
      'Claude exporteert een IFC uit Revit met een vaste export-setup, bewerkt hem na (georeferentie, bouwlagen, ruimtenummers en -namen, zones, classificatie) en toetst het resultaat. ' +
      'Het ruimtemodel voor de ILS Omgevingsvergunning is als voorbeeld uitgewerkt. ' +
      'Nabewerken en toetsen werken ook op een IFC die je al hebt.',
    versie: '0.1',
    datum: '2026-11-25',
    bestand: 'ifc-ils-export.zip',
    vereisten: [
      'Claude Desktop (onderdeel Code) of Claude Code',
      'Python 3.10 of hoger; de skill installeert IfcOpenShell in een eigen omgeving',
      'Voor de export zelf: Revit 2025 of 2026 met de Revit Agent-addin',
    ],
    status: 'beschikbaar',
  },
  {
    slug: 'ils-check',
    titel: 'ILS-check',
    kicker: 'Revit en NLRS',
    tekst:
      'Claude leest een ILS als IDS-bestand, koppelt elke eis aan een Revit-parameter en laat vóór de export zien welke parameters ontbreken, aan een andere categorie hangen of leeg zijn. ' +
      'Na de export toetst hij de IFC tegen dezelfde IDS. ' +
      'Met de koppelingen uit de NLRS voor de ILS Ontwerp & Engineering.',
    versie: '0.1',
    datum: '2026-11-25',
    bestand: 'ils-check.zip',
    vereisten: [
      'Claude Desktop (onderdeel Code) of Claude Code',
      'Python 3.10 of hoger; de skill installeert IfcOpenShell en ifctester in een eigen omgeving',
      'Voor de controle in het model: Revit 2025 of 2026 met de Revit Agent-addin',
    ],
    status: 'beschikbaar',
  },
  {
    slug: 'revit-agent-addin',
    titel: 'Revit Agent-addin',
    kicker: 'Revit en NLRS',
    tekst:
      'De addin die de opdrachten van de vier skills in Revit uitvoert, voor Revit 2025 en 2026, met installatiescript en de volledige broncode om zelf verder te bouwen. ' +
      'Hij luistert alleen op je eigen computer en vraagt bij elk verzoek een token. ' +
      'Getekend door bimforce met een eigen certificaat: Revit vraagt bij de eerste start één keer of hij geladen mag worden.',
    versie: '0.1',
    datum: '2026-11-25',
    bestand: 'revit-agent-addin.zip',
    vereisten: [
      'Windows met Revit 2025 of 2026',
      'Zelf bouwen: de .NET 8 SDK',
    ],
    handleidingen: [
      { label: 'Naslag: alle opdrachten van de addin', href: '/skills/revit-agent/opdrachten/' },
      { label: 'Broncode op GitHub (MIT): addin, skills en tests', href: 'https://github.com/mdrbimforce/revit-agent' },
    ],
    status: 'beschikbaar',
  },
];

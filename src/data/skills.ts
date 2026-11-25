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
  // Revit en NLRS: voor de hackathon van 26-11-2026. Tekst, versie, vereisten en zip volgen.
  {
    slug: 'revit-agent',
    titel: 'Revit-agent',
    kicker: 'Revit en NLRS',
    tekst: 'Beschrijving en download volgen binnenkort.',
    versie: '',
    datum: '',
    bestand: 'revit-agent.zip',
    vereisten: [],
    status: 'binnenkort',
  },
  {
    slug: 'nlrs-agent',
    titel: 'NLRS-agent',
    kicker: 'Revit en NLRS',
    tekst: 'Beschrijving en download volgen binnenkort.',
    versie: '',
    datum: '',
    bestand: 'nlrs-agent.zip',
    vereisten: [],
    status: 'binnenkort',
  },
  {
    slug: 'ifc-ils-export',
    titel: 'IFC-export volgens de ILS',
    kicker: 'Revit en NLRS',
    tekst: 'Beschrijving en download volgen binnenkort.',
    versie: '',
    datum: '',
    bestand: 'ifc-ils-export.zip',
    vereisten: [],
    status: 'binnenkort',
  },
  {
    slug: 'ils-check',
    titel: 'ILS-check',
    kicker: 'Revit en NLRS',
    tekst: 'Beschrijving en download volgen binnenkort.',
    versie: '',
    datum: '',
    bestand: 'ils-check.zip',
    vereisten: [],
    status: 'binnenkort',
  },
];

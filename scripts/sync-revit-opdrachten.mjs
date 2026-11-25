// Synchroniseert de opdrachten van de Revit Agent-addin naar src/data/revit-agent-opdrachten.json.
//
// Gebruik:  node scripts/sync-revit-opdrachten.mjs [pad-naar-revit-agent]   (standaard ../revit-agent)
// Of:       npm run sync:revit-opdrachten
//
// Bronnen (alleen lezen, in de revit-agent-repo):
//   shared/revit_agent/opdrachten_statisch.json     lijst met opdrachten en parameters
//   skills/revit-agent/references/opdrachten.md     voorbeelden en toelichtingen per opdracht
// Pas de pagina niet met de hand aan voor inhoud uit de bron: draai dit script opnieuw.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const hier = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(hier, '..');
const bronRepo = resolve(process.argv[2] ?? join(repoRoot, '..', 'revit-agent'));
const ADDIN_VERSIE = '0.1.0';

// Groepsindeling, in de volgorde van het JSON-bestand. Een opdracht die hier niet staat, komt in "Overig".
const GROEPEN = [
  { id: 'bridge-diagnose', titel: 'Bridge en diagnose', namen: ['ping', 'list_commands', 'get_info', 'get_diagnostics', 'reset_counters'] },
  { id: 'documenten-links', titel: 'Documenten en links', namen: ['get_open_documents', 'open_document', 'open_document_ui', 'save_document', 'save_document_as', 'close_document', 'new_project', 'get_worksets', 'list_link_instances', 'load_links', 'reload_link'] },
  { id: 'elementen-lezen', titel: 'Elementen lezen', namen: ['list_type_catalog', 'query_elements', 'get_element_detail', 'query_category_instances', 'get_family_instances', 'get_families_loaded', 'get_family_detail', 'get_levels', 'get_door_room_relations', 'get_room_geometry'] },
  { id: 'elementen-wijzigen', titel: 'Elementen wijzigen', namen: ['change_element_type', 'rename_element', 'delete_element'] },
  { id: 'parameters', titel: 'Parameters', namen: ['read_parameter_values', 'set_parameter_value', 'set_parameter_values_bulk', 'list_parameter_bindings', 'bind_shared_parameters', 'unbind_shared_parameters', 'set_parameter_binding', 'mirror_parameter_binding', 'report_parameter_usage', 'swap_parameter', 'couple_builtin_parameter', 'enum_system_family_parameters'] },
  { id: 'families', titel: 'Families', namen: ['load_family', 'enum_family_parameters', 'enum_nested_families', 'rename_nested_families', 'rename_nested_families_rfa', 'swap_family_parameter', 'rename_family_parameter', 'delete_family_parameter', 'set_family_formula', 'set_family_type_values', 'set_family_param_kind', 'delete_family_types', 'copy_family_type', 'rename_family_materials', 'export_families_to_folder', 'place_family_instances', 'place_family_grid', 'place_hosted_family'] },
  { id: 'kopieren-tussen-modellen', titel: 'Kopiëren tussen modellen', namen: ['inventory_copy', 'copy_elements', 'diagnose_family_copy', 'transfer_family'] },
  { id: 'materialen', titel: 'Materialen', namen: ['get_materials', 'create_material', 'duplicate_material', 'set_material_class', 'set_material_fill_pattern', 'replace_material', 'enum_material_parameters', 'enum_material_usage', 'asset_rename', 'asset_swap'] },
  { id: 'views-filters', titel: 'Views en filters', namen: ['get_view_structure', 'create_views', 'assign_view_template', 'relink_type_templates', 'set_view_property', 'get_filter_rules', 'create_filter', 'repoint_filter_parameter', 'assign_view_filter', 'set_line_style_graphics', 'query_filled_region_types', 'create_filled_region_type'] },
  { id: 'sheets-export', titel: 'Sheets en export', namen: ['get_sheet_detail', 'create_sheet', 'export_views_image'] },
  { id: 'modelleren', titel: 'Modelleren', namen: ['create_walls', 'create_room', 'create_shaft_opening'] },
  { id: 'mep', titel: 'MEP', namen: ['list_mep_types', 'create_mep_runs', 'connect_to_pipe', 'get_connectors', 'cap_open_ends', 'insert_pipe_accessory', 'duplicate_mep_type'] },
  { id: 'ifc', titel: 'IFC', namen: ['export_ifc', 'get_ifc_export_setups', 'create_ifc_export_views'] },
];

const jsonPad = join(bronRepo, 'shared', 'revit_agent', 'opdrachten_statisch.json');
const mdPad = join(bronRepo, 'skills', 'revit-agent', 'references', 'opdrachten.md');
const uitPad = join(repoRoot, 'src', 'data', 'revit-agent-opdrachten.json');

const bron = JSON.parse(readFileSync(jsonPad, 'utf8'));
// De voetregel "Gemaakt door ..." onderaan het bronbestand hoort niet bij de laatste toelichting.
const md = readFileSync(mdPad, 'utf8').replace(/\r\n/g, '\n').replace(/\n+Gemaakt door [^\n]*\s*$/, '\n');

// De tekst van één "## "-sectie van het markdown-bestand (zonder kopregel).
function sectie(titelStart) {
  const regels = md.split('\n');
  const start = regels.findIndex((r) => r.startsWith('## ') && r.slice(3).startsWith(titelStart));
  if (start < 0) return '';
  let eind = regels.length;
  for (let i = start + 1; i < regels.length; i++) {
    if (regels[i].startsWith('## ')) { eind = i; break; }
  }
  return regels.slice(start + 1, eind).join('\n');
}

// "### naam"-kopjes binnen een sectie; kopjes binnen een codeblok tellen niet mee.
function perOpdracht(tekst) {
  const uit = new Map();
  let naam = null;
  let buf = [];
  let inCode = false;
  const klaar = () => { if (naam) uit.set(naam, buf.join('\n').trim()); };
  for (const regel of tekst.split('\n')) {
    if (regel.startsWith('```')) inCode = !inCode;
    const m = !inCode && regel.match(/^### (.+?)\s*$/);
    if (m) { klaar(); naam = m[1].replace(/`/g, ''); buf = []; } else if (naam) buf.push(regel);
  }
  klaar();
  return uit;
}

const voorbeeldTekst = perOpdracht(sectie('Voorbeelden'));
const toelichtingTekst = perOpdracht(sectie('Toelichting per opdracht'));

const voorbeelden = new Map();
for (const [naam, tekst] of voorbeeldTekst) {
  const m = tekst.match(/```json\n([\s\S]*?)\n```/);
  if (m) voorbeelden.set(naam, m[1].trim());
}

const namen = new Set(bron.commands.map((c) => c.name));
const groepVan = new Map();
let indelingTotaal = 0;
for (const g of GROEPEN) for (const n of g.namen) { groepVan.set(n, g.id); indelingTotaal++; }

const onbekend = bron.commands.map((c) => c.name).filter((n) => !groepVan.has(n));
const verdwenen = GROEPEN.flatMap((g) => g.namen.map((n) => [g.titel, n])).filter(([, n]) => !namen.has(n));
const dubbel = groepVan.size !== indelingTotaal;

const groepen = GROEPEN.map(({ id, titel }) => ({ id, titel }));
if (onbekend.length) groepen.push({ id: 'overig', titel: 'Overig' });

const commands = bron.commands.map((c) => ({
  name: c.name,
  beschrijving: c.beschrijving ?? '',
  schrijft: !!c.schrijft,
  dry_run: !!c.dry_run,
  params: c.params ?? [],
  voorbeeld: voorbeelden.get(c.name) ?? null,
  toelichting: toelichtingTekst.get(c.name) || null,
  groep: groepVan.get(c.name) ?? 'overig',
}));

const verweesdVoorbeeld = [...voorbeelden.keys()].filter((n) => !namen.has(n));
const verweesdToelichting = [...toelichtingTekst.keys()].filter((n) => !namen.has(n));

const uit = {
  versie_addin: ADDIN_VERSIE,
  gesynchroniseerd: new Date().toISOString().slice(0, 10),
  aantal: commands.length,
  groepen,
  commands,
};
mkdirSync(dirname(uitPad), { recursive: true });
writeFileSync(uitPad, JSON.stringify(uit, null, 2) + '\n', 'utf8');

console.log(`Geschreven: ${uitPad}`);
console.log(`Opdrachten: ${commands.length} (lezen ${commands.filter((c) => !c.schrijft).length}, schrijven ${commands.filter((c) => c.schrijft).length})`);
console.log(`Met voorbeeld: ${commands.filter((c) => c.voorbeeld).length}, met toelichting: ${commands.filter((c) => c.toelichting).length}`);
for (const g of groepen) console.log(`  ${g.titel}: ${commands.filter((c) => c.groep === g.id).length}`);
if (onbekend.length) console.warn(`LET OP: opdrachten zonder groep (nu in "Overig"): ${onbekend.join(', ')}`);
if (verdwenen.length) console.warn(`LET OP: namen in de indeling die niet meer bestaan: ${verdwenen.map(([g, n]) => `${n} (${g})`).join(', ')}`);
if (dubbel) console.warn('LET OP: een opdrachtnaam staat in meer dan één groep; de laatste wint.');
if (verweesdVoorbeeld.length) console.warn(`LET OP: voorbeeld voor onbekende opdracht: ${verweesdVoorbeeld.join(', ')}`);
if (verweesdToelichting.length) console.warn(`LET OP: toelichting voor onbekende opdracht: ${verweesdToelichting.join(', ')}`);

// Barrel import of all content JSON files.
// Metro bundles these at build time — do NOT use dynamic paths.
// To add new content: import it here and add it to the registry below.

import type { DayContent, ShlokasFile, SankalpTemplate } from '../src/types/content';

// ─── Day entries ──────────────────────────────────────────────────────────
import amavasya from './days/amavasya.json';
import krishnaChaturthi from './days/krishna-chaturthi-sankashti.json';
import krishnaEkadashi from './days/krishna-ekadashi.json';
import purnima from './days/purnima.json';
import regularDay from './days/regular-day-example.json';
import shuklaEkadashi from './days/shukla-ekadashi.json';
import trayodashiPradosha from './days/trayodashi-pradosha.json';

// ─── Festivals ────────────────────────────────────────────────────────────
import diwali from './festivals/diwali.json';

// ─── Rules ────────────────────────────────────────────────────────────────
import tithiRules from './rules/tithi_rules.json';
import varaRules from './rules/vara_rules.json';
import specialRules from './rules/special_rules.json';

// ─── Sankalp templates ────────────────────────────────────────────────────
import amaavasyaTarpan from './sankalp_templates/amavasya-pitru-tarpan.json';
import ekadashiVrat from './sankalp_templates/ekadashi-vrat.json';
import ganeshSankashti from './sankalp_templates/ganesh-sankashti-vrat.json';
import janmashtami from './sankalp_templates/krishna-janmashtami-vrat.json';
import lakshmiPuja from './sankalp_templates/lakshmi-puja-sankalp.json';
import mahaShivaratri from './sankalp_templates/maha-shivaratri-vrat.json';
import navratriVrat from './sankalp_templates/navratri-vrat.json';
import pradoshaVrat from './sankalp_templates/pradosha-vrat.json';
import purnimaVrat from './sankalp_templates/purnima-vrat.json';
import satyanarayanPuja from './sankalp_templates/satyanarayan-puja.json';
import shravanSomvar from './sankalp_templates/shravan-somvar-vrat.json';

// ─── Shlokas ──────────────────────────────────────────────────────────────
import amaavasyaShlokas from './shlokas/amavasya-pitru-shlokas.json';
import ekadashiShlokas from './shlokas/ekadashi-core-shlokas.json';
import ganeshShlokas from './shlokas/ganesh-shlokas.json';
import kshamaShlokas from './shlokas/kshama-prarthana.json';
import lakshmiShlokas from './shlokas/lakshmi-puja-shlokas.json';
import navratriShlokas from './shlokas/navratri-shlokas.json';
import purnimaShlokas from './shlokas/purnima-shlokas.json';
import satyanarayanShlokas from './shlokas/satyanarayan-shlokas.json';
import shivaShlokas from './shlokas/shiva-shlokas.json';

// ─── Registries ───────────────────────────────────────────────────────────

// JSON content files vary in structure — cast through unknown is intentional.
// The [key: string]: unknown index signature on each interface makes runtime access safe.
const as = <T>(v: unknown): T => v as T;

export const DAY_CONTENT: Record<string, DayContent> = {
  amavasya:                     as<DayContent>(amavasya),
  'krishna-chaturthi-sankashti': as<DayContent>(krishnaChaturthi),
  'krishna-ekadashi':           as<DayContent>(krishnaEkadashi),
  purnima:                      as<DayContent>(purnima),
  'regular-day-example':        as<DayContent>(regularDay),
  'shukla-ekadashi':            as<DayContent>(shuklaEkadashi),
  'trayodashi-pradosha':        as<DayContent>(trayodashiPradosha),
  diwali:                       as<DayContent>(diwali),
};

export const SHLOKAS: Record<string, ShlokasFile> = {
  'amavasya-pitru-shlokas': as<ShlokasFile>(amaavasyaShlokas),
  'ekadashi-core-shlokas':  as<ShlokasFile>(ekadashiShlokas),
  'ganesh-shlokas':         as<ShlokasFile>(ganeshShlokas),
  'kshama-prarthana':       as<ShlokasFile>(kshamaShlokas),
  'lakshmi-puja-shlokas':   as<ShlokasFile>(lakshmiShlokas),
  'navratri-shlokas':       as<ShlokasFile>(navratriShlokas),
  'purnima-shlokas':        as<ShlokasFile>(purnimaShlokas),
  'satyanarayan-shlokas':   as<ShlokasFile>(satyanarayanShlokas),
  'shiva-shlokas':          as<ShlokasFile>(shivaShlokas),
};

export const SANKALP_TEMPLATES: Record<string, SankalpTemplate> = {
  'amavasya-pitru-tarpan':    as<SankalpTemplate>(amaavasyaTarpan),
  'ekadashi-vrat':            as<SankalpTemplate>(ekadashiVrat),
  'ganesh-sankashti-vrat':    as<SankalpTemplate>(ganeshSankashti),
  'krishna-janmashtami-vrat': as<SankalpTemplate>(janmashtami),
  'lakshmi-puja-sankalp':     as<SankalpTemplate>(lakshmiPuja),
  'maha-shivaratri-vrat':     as<SankalpTemplate>(mahaShivaratri),
  'navratri-vrat':            as<SankalpTemplate>(navratriVrat),
  'pradosha-vrat':            as<SankalpTemplate>(pradoshaVrat),
  'purnima-vrat':             as<SankalpTemplate>(purnimaVrat),
  'satyanarayan-puja':        as<SankalpTemplate>(satyanarayanPuja),
  'shravan-somvar-vrat':      as<SankalpTemplate>(shravanSomvar),
};

export const RULES = {
  tithi: tithiRules,
  vara: varaRules,
  special: specialRules,
};

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

export const DAY_CONTENT: Record<string, DayContent> = {
  amavasya: amavasya as DayContent,
  'krishna-chaturthi-sankashti': krishnaChaturthi as DayContent,
  'krishna-ekadashi': krishnaEkadashi as DayContent,
  purnima: purnima as DayContent,
  'regular-day-example': regularDay as DayContent,
  'shukla-ekadashi': shuklaEkadashi as DayContent,
  'trayodashi-pradosha': trayodashiPradosha as DayContent,
  diwali: diwali as DayContent,
};

export const SHLOKAS: Record<string, ShlokasFile> = {
  'amavasya-pitru-shlokas': amaavasyaShlokas as ShlokasFile,
  'ekadashi-core-shlokas': ekadashiShlokas as ShlokasFile,
  'ganesh-shlokas': ganeshShlokas as ShlokasFile,
  'kshama-prarthana': kshamaShlokas as ShlokasFile,
  'lakshmi-puja-shlokas': lakshmiShlokas as ShlokasFile,
  'navratri-shlokas': navratriShlokas as ShlokasFile,
  'purnima-shlokas': purnimaShlokas as ShlokasFile,
  'satyanarayan-shlokas': satyanarayanShlokas as ShlokasFile,
  'shiva-shlokas': shivaShlokas as ShlokasFile,
};

export const SANKALP_TEMPLATES: Record<string, SankalpTemplate> = {
  'amavasya-pitru-tarpan': amaavasyaTarpan as SankalpTemplate,
  'ekadashi-vrat': ekadashiVrat as SankalpTemplate,
  'ganesh-sankashti-vrat': ganeshSankashti as SankalpTemplate,
  'krishna-janmashtami-vrat': janmashtami as SankalpTemplate,
  'lakshmi-puja-sankalp': lakshmiPuja as SankalpTemplate,
  'maha-shivaratri-vrat': mahaShivaratri as SankalpTemplate,
  'navratri-vrat': navratriVrat as SankalpTemplate,
  'pradosha-vrat': pradoshaVrat as SankalpTemplate,
  'purnima-vrat': purnimaVrat as SankalpTemplate,
  'satyanarayan-puja': satyanarayanPuja as SankalpTemplate,
  'shravan-somvar-vrat': shravanSomvar as SankalpTemplate,
};

export const RULES = {
  tithi: tithiRules,
  vara: varaRules,
  special: specialRules,
};

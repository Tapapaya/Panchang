import { getTithiKey, loadDayContent, loadShlokas, getPrimaryShlokaForDay } from '../ContentLoader';

describe('getTithiKey', () => {
  const base = { name: '', number: 0, paksha: 'Shukla' } as const;

  it('returns shukla-ekadashi for number 11 Shukla', () => {
    expect(getTithiKey({ ...base, name: 'Ekadashi', number: 11, paksha: 'Shukla' })).toBe('shukla-ekadashi');
  });

  it('returns krishna-ekadashi for number 11 Krishna', () => {
    expect(getTithiKey({ ...base, name: 'Ekadashi', number: 11, paksha: 'Krishna' })).toBe('krishna-ekadashi');
  });

  it('returns purnima for number 15 Shukla', () => {
    expect(getTithiKey({ ...base, name: 'Purnima', number: 15, paksha: 'Shukla' })).toBe('purnima');
  });

  it('returns amavasya by name regardless of number', () => {
    expect(getTithiKey({ ...base, name: 'Amavasya', number: 30, paksha: 'Krishna' })).toBe('amavasya');
  });

  it('returns amavasya for number 15 Krishna', () => {
    expect(getTithiKey({ ...base, name: 'Chaturdashi', number: 15, paksha: 'Krishna' })).toBe('amavasya');
  });

  it('returns krishna-chaturthi-sankashti for number 4 Krishna', () => {
    expect(getTithiKey({ ...base, name: 'Chaturthi', number: 4, paksha: 'Krishna' })).toBe('krishna-chaturthi-sankashti');
  });

  it('returns trayodashi-pradosha for number 13', () => {
    expect(getTithiKey({ ...base, name: 'Trayodashi', number: 13, paksha: 'Shukla' })).toBe('trayodashi-pradosha');
  });

  it('returns regular-day-example for unrecognized tithi', () => {
    expect(getTithiKey({ ...base, name: 'Tritiya', number: 3, paksha: 'Shukla' })).toBe('regular-day-example');
  });

  it('falls back to regular key when adhika key does not exist in registry', () => {
    const result = getTithiKey({ ...base, name: 'Purnima', number: 15, paksha: 'Shukla' }, 'vaishakha', true);
    // adhika-vaishakha is not in DAY_CONTENT, so falls through to regular logic → purnima
    expect(result).toBe('purnima');
  });
});

describe('loadDayContent', () => {
  it('returns DayContent for a known key', () => {
    const content = loadDayContent('shukla-ekadashi');
    expect(content).not.toBeNull();
    expect(content?.key).toBe('shukla-ekadashi');
    expect(content?.significance?.title).toBeDefined();
  });

  it('returns null for an unknown key', () => {
    expect(loadDayContent('nonexistent-tithi-xyz')).toBeNull();
  });
});

describe('loadShlokas', () => {
  it('returns ShlokasFile for a known file id', () => {
    const file = loadShlokas('ekadashi-core-shlokas');
    expect(file).not.toBeNull();
    expect(Array.isArray(file?.shlokas)).toBe(true);
    expect(file!.shlokas.length).toBeGreaterThan(0);
  });

  it('returns null for an unknown file id', () => {
    expect(loadShlokas('nonexistent-shlokas')).toBeNull();
  });
});

describe('getPrimaryShlokaForDay', () => {
  it('returns a shloka from the day content shlokas list', () => {
    const content = loadDayContent('shukla-ekadashi');
    const shloka = getPrimaryShlokaForDay(content);
    expect(shloka).not.toBeNull();
    expect(typeof shloka?.sanskrit).toBe('string');
    expect(shloka!.sanskrit.length).toBeGreaterThan(0);
  });

  it('falls back to Ganesh shloka when day content is null', () => {
    const shloka = getPrimaryShlokaForDay(null);
    expect(shloka).not.toBeNull();
    expect(shloka?.id).toBeDefined();
    expect(shloka?.name).toBeDefined();
  });
});

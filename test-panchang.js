// Accuracy test: verify panchang-ts output against DrikPanchang.com
// Run: node test-panchang.js
// Then manually cross-check the output at https://www.drikpanchang.com

const { getDailyPanchang } = require('panchang-ts');

// --- Configuration ---
// Change these to match your location for diaspora testing.
// Mumbai (IST): lat 19.076, lon 72.877, tz 330
// London (BST, UTC+1): lat 51.507, lon -0.127, tz 60
// New York (EDT, UTC-4): lat 40.712, lon -74.005, tz -240

const LOCATIONS = {
  mumbai:   { lat: 19.076,  lon: 72.877,  tz: 330,   label: 'Mumbai (IST)' },
  london:   { lat: 51.507,  lon: -0.127,  tz: 60,    label: 'London (BST UTC+1)' },
  newYork:  { lat: 40.712,  lon: -74.005, tz: -240,  label: 'New York (EDT UTC-4)' },
};

function fmt(date) {
  if (!date) return 'N/A';
  const h = String(date.getUTCHours()).padStart(2, '0');
  const m = String(date.getUTCMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

function testDate(label, jsDate, loc) {
  const result = getDailyPanchang(
    jsDate,
    { latitude: loc.lat, longitude: loc.lon },
    { timezone: loc.tz }
  );

  if (!result) {
    console.log(`  ERROR: null result (polar latitude issue?)`);
    return;
  }

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`DATE: ${label}  |  ${loc.label}`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`Vikram Samvat : ${result.samvat.vikramSamvat}`);
  console.log(`Masa (Amanta) : ${result.chandramasa.amantaName}`);
  console.log(`Masa (Purnimanta): ${result.chandramasa.purnimantaName}`);
  console.log(`Is Adhika Masa: ${result.chandramasa.isAdhika}`);
  console.log(`Vara (weekday): ${result.vara.name} / ${result.vara.englishName}`);
  console.log(`Sunrise       : ${fmt(result.sunrise)}`);
  console.log(`Sunset        : ${fmt(result.sunset)}`);

  console.log(`\nTITHI(S):`);
  result.tithis.forEach((t, i) => {
    const end = t.endTime ? fmt(t.endTime) : 'spans full day';
    console.log(`  [${i + 1}] ${t.name} (${t.paksha}) — ends ${end}`);
  });

  console.log(`\nNAKSHATRA(S):`);
  result.nakshatras.forEach((n, i) => {
    const end = n.endTime ? fmt(n.endTime) : 'spans full day';
    console.log(`  [${i + 1}] ${n.name} (pada ${n.pada}) — ends ${end}`);
  });

  console.log(`\nYOGA(S):`);
  result.yogas.forEach((y, i) => {
    const end = y.endTime ? fmt(y.endTime) : 'spans full day';
    console.log(`  [${i + 1}] ${y.name} — ends ${end}`);
  });

  console.log(`\nKARANA(S):`);
  result.karanas.forEach((k, i) => {
    const end = k.endTime ? fmt(k.endTime) : 'spans full day';
    console.log(`  [${i + 1}] ${k.name} (${k.type}) — ends ${end}`);
  });

  if (result.festivals && result.festivals.length > 0) {
    console.log(`\nFESTIVALS / VRATAS:`);
    result.festivals.forEach(f => {
      console.log(`  • ${f.name}${f.type ? ` [${f.type}]` : ''}`);
    });
  }

  if (result.rahuKalam) {
    console.log(`\nRAHU KALAM : ${fmt(result.rahuKalam.start)} – ${fmt(result.rahuKalam.end)}`);
  }
}

// ─── TEST DATES ───────────────────────────────────────────────────────────────
// JS months are 0-indexed: Jan=0, Oct=9, Nov=10

// 1. TODAY — June 15, 2026
//    Verify at: https://www.drikpanchang.com/panchang/day-panchang.html
//    (set the date and your location on the site)
testDate('Today: June 15, 2026', new Date(2026, 5, 15), LOCATIONS.mumbai);
testDate('Today: June 15, 2026', new Date(2026, 5, 15), LOCATIONS.london);

// 2. NEXT EKADASHI — June 24, 2026 (Shukla Ekadashi, Jyeshtha masa)
//    Should show: Ekadashi tithi + Vaishnava Ekadashi / Smarta Ekadashi festivals
testDate('Shukla Ekadashi: June 24, 2026', new Date(2026, 5, 24), LOCATIONS.mumbai);
testDate('Shukla Ekadashi: June 24, 2026', new Date(2026, 5, 24), LOCATIONS.newYork);

// 3. DIWALI 2026 — Nov 8, 2026 (Narak Chaturdashi + Diwali main day)
//    Full arc: Dhanteras Nov 6 → Diwali Nov 8 → Govardhan Puja Nov 10
testDate('Dhanteras: Nov 6, 2026', new Date(2026, 10, 6), LOCATIONS.mumbai);
testDate('Diwali 2026: Nov 8, 2026', new Date(2026, 10, 8), LOCATIONS.mumbai);
testDate('Govardhan Puja: Nov 10, 2026', new Date(2026, 10, 10), LOCATIONS.mumbai);

console.log(`\n${'═'.repeat(60)}`);
console.log('VERIFICATION INSTRUCTIONS:');
console.log('1. Go to https://www.drikpanchang.com/panchang/day-panchang.html');
console.log('2. Set date and location to match each test above');
console.log('3. Compare Tithi, Nakshatra, Yoga, Karana, Sunrise times');
console.log('4. Check festivals match for Ekadashi and Diwali dates');
console.log('═'.repeat(60));

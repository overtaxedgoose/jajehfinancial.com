// Hero decoration: the Jajeh mark as motion. A small fleet of the logo's sailboats (three layered sails
// and a hull, rounded corners like the mark) sails across the hero and off the edge, nearer ships larger
// and faster, each billowing and bobbing, with wind gusts streaming across and two wave lines underneath.
// This file only builds the SVG markup; all movement is CSS (see "Sails and wind" in style.css).
// Skipped entirely when the visitor prefers reduced motion. Retune: the fleet table below, speeds in CSS.
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var hero = document.querySelector('.hero');
  if (!hero) return;

  function f(p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }

  // Polygon with rounded corners: each corner becomes a quadratic curve r units in from the vertex.
  function rounded(pts, r) {
    var n = pts.length, d = '';
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i + n - 1) % n], p1 = pts[i], p2 = pts[(i + 1) % n];
      var l1 = Math.hypot(p0[0] - p1[0], p0[1] - p1[1]), l2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
      var k = Math.min(r, l1 / 2, l2 / 2);
      var a = [p1[0] + (p0[0] - p1[0]) / l1 * k, p1[1] + (p0[1] - p1[1]) / l1 * k];
      var b = [p1[0] + (p2[0] - p1[0]) / l2 * k, p1[1] + (p2[1] - p1[1]) / l2 * k];
      d += (i ? ' L ' : 'M ') + f(a) + ' Q ' + f(p1) + ' ' + f(b);
    }
    return d + ' Z';
  }

  // The mark in a 400 x 470 box: mast foot at (160,400), three sails fanned from it, hull below.
  // The third value is each sail's transform-origin (the mast foot) as a share of its own bounding box.
  var SAILS = [
    ['s3', [[160, 400], [210, 50], [385, 350]], '0% 100%'],
    ['s2', [[160, 400], [160, 50], [378, 330]], '0% 100%'],
    ['s1', [[160, 400], [110, 50], [365, 300]], '20% 100%']
  ];
  var HULL = [[135, 430], [400, 405], [375, 460], [150, 460]];

  function ship(o) {
    var sails = SAILS.map(function (s) {
      return '<path class="sail ' + s[0] + '" style="transform-origin:' + s[2] + '" d="' + rounded(s[1], 18) + '"/>';
    }).join('');
    return '<g class="ship" style="opacity:' + o.opacity + ';animation-duration:' + o.cross + 's;animation-delay:' + o.delay + 's">' +
      '<g transform="translate(0 ' + (o.water - 460 * o.scale).toFixed(1) + ') scale(' + o.scale + ')">' +
      '<g class="bob" style="animation-duration:' + o.bob + 's">' + sails +
      '<path class="hull" d="' + rounded(HULL, 12) + '"/>' +
      '</g></g></g>';
  }

  // Far to near (paint order). scale = size, cross = seconds to sail across, delay = where it starts.
  var fleet = [
    { scale: 0.38, water: 546, opacity: 0.45, cross: 180, delay: -135, bob: 8 },
    { scale: 0.55, water: 552, opacity: 0.6,  cross: 140, delay: -75,  bob: 7 },
    { scale: 0.7,  water: 556, opacity: 0.8,  cross: 115, delay: -100, bob: 6.5 },
    { scale: 0.9,  water: 560, opacity: 0.95, cross: 95,  delay: -30,  bob: 6 }
  ].map(ship).join('');

  var gusts = [
    'M-100 110 C 300 70, 700 170, 1700 80',
    'M-100 200 C 400 160, 900 250, 1700 190',
    'M-100 290 C 350 250, 800 330, 1700 270',
    'M-100 380 C 450 340, 1000 420, 1700 360',
    'M-100 460 C 300 430, 700 490, 1700 440'
  ].map(function (d, i) { return '<path class="gust g' + i + '" pathLength="1000" d="' + d + '"/>'; }).join('');

  // One wave period is 200 units; the path runs past the viewBox so a 200px slide loops seamlessly.
  var wave = 'M0 560 Q 50 548 100 560';
  for (var x = 200; x <= 2000; x += 100) wave += ' T ' + x + ' 560';

  hero.insertAdjacentHTML('afterbegin',
    '<svg class="hero-wind" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
      gusts + fleet +
      '<path class="wave w1" d="' + wave + '"/>' +
      '<path class="wave w2" d="' + wave + '"/>' +
    '</svg>');
})();

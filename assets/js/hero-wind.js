// Hero decoration: the Jajeh mark as motion. A small fleet of the logo's sailboats (three layered sails
// and a hull, rounded corners like the mark) sails across the hero and off the edge, nearer ships larger
// and faster, each billowing and bobbing, with wind gusts that come and go and two wave lines underneath.
// The whole layer breathes (fades in and out slowly, in CSS) so the scene rises and settles like weather.
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
    { scale: 0.34, water: 546, opacity: 0.45, cross: 190, delay: -150, bob: 8.5 },
    { scale: 0.5,  water: 551, opacity: 0.6,  cross: 150, delay: -40,  bob: 7.4 },
    { scale: 0.68, water: 556, opacity: 0.8,  cross: 120, delay: -95,  bob: 6.6 },
    { scale: 0.9,  water: 560, opacity: 0.95, cross: 100, delay: -20,  bob: 6 }
  ].map(ship).join('');

  // Wind: y = height, bend = how much the stream arcs, dash = streak length (of 1000), dur/delay = timing.
  // Each gust fades in, streams across for the first ~70% of its cycle, fades out, then rests (see the
  // gust keyframes in CSS), so the staggered durations make the wind come and go rather than stream.
  var gusts = [
    { y: 80,  bend: -40, dash: 120, dur: 13,   delay: -3,   teal: false, w: 2 },
    { y: 130, bend: 30,  dash: 60,  dur: 9.5,  delay: -6,   teal: true,  w: 1.5 },
    { y: 190, bend: -50, dash: 140, dur: 16,   delay: -10,  teal: true,  w: 2 },
    { y: 240, bend: 20,  dash: 50,  dur: 8.5,  delay: -1,   teal: false, w: 1.5 },
    { y: 300, bend: -35, dash: 110, dur: 14.5, delay: -8,   teal: false, w: 2.2 },
    { y: 350, bend: 45,  dash: 70,  dur: 11,   delay: -4.5, teal: true,  w: 1.5 },
    { y: 410, bend: -30, dash: 130, dur: 17.5, delay: -13,  teal: false, w: 2 },
    { y: 455, bend: 25,  dash: 55,  dur: 10,   delay: -2,   teal: true,  w: 1.5 },
    { y: 505, bend: -45, dash: 100, dur: 13.5, delay: -7,   teal: false, w: 2 }
  ].map(function (g, i) {
    var d = 'M-100 ' + g.y + ' C 350 ' + (g.y + g.bend) + ', 850 ' + (g.y - g.bend) + ', 1700 ' + (g.y + g.bend / 2);
    var style = 'stroke-dasharray:' + g.dash + ' ' + (1000 - g.dash) + ';stroke-width:' + g.w +
      ';animation-duration:' + g.dur + 's;animation-delay:' + g.delay + 's' + (g.teal ? ';stroke:rgba(53,177,135,.4)' : '');
    return '<path class="gust g' + i + '" pathLength="1000" style="' + style + '" d="' + d + '"/>';
  }).join('');

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

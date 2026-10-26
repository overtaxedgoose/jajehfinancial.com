// Hero decoration: the Jajeh mark as motion. Three layered sails and a hull (same geometry as the logo),
// wind gusts streaming across, and a water line, drawn as one inline SVG behind the hero content.
// All movement is CSS (see "Sails and wind" in style.css); this file only builds the markup.
// Skipped entirely when the visitor prefers reduced motion. To retune: boat positions below, speeds in CSS.
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var hero = document.querySelector('.hero');
  if (!hero) return;

  // The mark in a 400 x 470 box: mast foot at (160,400), three sails fanned from it, hull below.
  function boat(x, y, s, cls) {
    var pt = function (q) { return (x + q[0] * s).toFixed(1) + ' ' + (y + q[1] * s).toFixed(1); };
    var poly = function (pts) { return 'M' + pts.map(pt).join(' L ') + ' Z'; };
    var mast = pt([160, 400]).replace(' ', 'px ') + 'px';
    var hullCenter = pt([265, 440]).replace(' ', 'px ') + 'px';
    return '<g class="boat ' + cls + '" style="transform-origin:' + hullCenter + '">' +
      '<path class="sail s3" style="transform-origin:' + mast + '" d="' + poly([[160, 400], [210, 50], [385, 350]]) + '"/>' +
      '<path class="sail s2" style="transform-origin:' + mast + '" d="' + poly([[160, 400], [160, 50], [378, 330]]) + '"/>' +
      '<path class="sail s1" style="transform-origin:' + mast + '" d="' + poly([[160, 400], [110, 50], [365, 300]]) + '"/>' +
      '<path class="hull" d="' + poly([[135, 430], [400, 405], [375, 460], [150, 460]]) + '"/>' +
      '</g>';
  }

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
      gusts +
      boat(1000, 100, 1, 'big') +
      boat(170, 307, 0.55, 'small') +
      '<path class="wave w1" d="' + wave + '"/>' +
      '<path class="wave w2" d="' + wave + '"/>' +
    '</svg>');
})();

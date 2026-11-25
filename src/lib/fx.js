// Playful effects: spice particles, spice burst, scroll pop-in, doodle underlines, heat shimmer.
const FX = (function () {
var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
var started = false;
var COLORS = ["#F5A524", "#D9532B", "#A8C686", "#F3E6C8", "#8A3B1E"];

// Floating spice particles that drift upward and dodge the mouse (canvas).
function particles(canvas) {
  if (!canvas || reduce) return function () {};
  var g = canvas.getContext("2d"), W = 0, H = 0, P = [], mouse = { x: -999, y: -999 }, raf, dpr = Math.min(window.devicePixelRatio || 1, 2);
  function size() { var r = canvas.getBoundingClientRect(); W = r.width; H = r.height; canvas.width = W * dpr; canvas.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); }
  function make(fresh) { return { x: Math.random() * W, y: fresh ? Math.random() * H : H + 10, r: 2 + Math.random() * 4, vx: (Math.random() - 0.5) * 0.3, vy: -(0.2 + Math.random() * 0.5), c: COLORS[(Math.random() * COLORS.length) | 0], a: Math.random() * 6.28, leaf: Math.random() < 0.45 }; }
  function onMove(e) { var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }
  size();
  for (var i = 0; i < 46; i++) P.push(make(true));
  function loop() {
    raf = requestAnimationFrame(loop);
    var r = canvas.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    g.clearRect(0, 0, W, H);
    for (var k = 0; k < P.length; k++) {
      var p = P[k], dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.sqrt(dx * dx + dy * dy);
      if (d < 130 && d > 0) { var f = (130 - d) / 130; p.x += (dx / d) * f * 4; p.y += (dy / d) * f * 4; }
      p.a += 0.02; p.x += p.vx + Math.sin(p.a) * 0.35; p.y += p.vy;
      if (p.y < -10) { var n = make(false); P[k] = n; continue; }
      g.fillStyle = p.c; g.globalAlpha = 0.85;
      g.beginPath();
      if (p.leaf) g.ellipse(p.x, p.y, p.r * 1.6, p.r * 0.7, p.a, 0, 6.28); else g.arc(p.x, p.y, p.r * 0.7, 0, 6.28);
      g.fill();
    }
  }
  addEventListener("mousemove", onMove);
  addEventListener("resize", size);
  loop();
  return function () { cancelAnimationFrame(raf); removeEventListener("mousemove", onMove); removeEventListener("resize", size); };
}

// Spice confetti burst at a point (used when adding a dish and when the wheel stops).
var bp = [], bRun = false, bc = null;
function burst(x, y) {
  if (reduce) return;
  if (!bc) { bc = document.createElement("canvas"); bc.style.cssText = "position:fixed;left:0;top:0;width:100%;height:100%;z-index:97;pointer-events:none"; document.body.appendChild(bc); }
  for (var i = 0; i < 34; i++) bp.push({ x: x, y: y, vx: (Math.random() - 0.5) * 11, vy: -Math.random() * 10 - 2, r: 3 + Math.random() * 4, c: COLORS[(Math.random() * COLORS.length) | 0], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, life: 1, sq: Math.random() < 0.5 });
  if (bRun) return;
  bRun = true;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  bc.width = innerWidth * dpr; bc.height = innerHeight * dpr;
  var g = bc.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
  (function loop() {
    g.clearRect(0, 0, innerWidth, innerHeight);
    bp = bp.filter(function (p) { return p.life > 0; });
    for (var k = 0; k < bp.length; k++) {
      var p = bp[k]; p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 0.016;
      g.save(); g.translate(p.x, p.y); g.rotate(p.rot); g.globalAlpha = Math.max(p.life, 0); g.fillStyle = p.c;
      if (p.sq) g.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); else { g.beginPath(); g.arc(0, 0, p.r * 0.7, 0, 6.28); g.fill(); }
      g.restore();
    }
    if (bp.length) requestAnimationFrame(loop); else { bRun = false; g.clearRect(0, 0, innerWidth, innerHeight); }
  })();
}

// Elements with .rv pop in and .draw underlines draw themselves when they scroll into view.
function reveal() {
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  function watch(el) { if (!el.__fx) { el.__fx = 1; io.observe(el); } }
  function scan(root) { if (root.matches && root.matches(".rv,.draw")) watch(root); root.querySelectorAll && root.querySelectorAll(".rv,.draw").forEach(watch); }
  scan(document);
  new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) scan(n); }); }); }).observe(document.body, { childList: true, subtree: true });
  document.documentElement.classList.add("fx-on");
}

// SVG heat-shimmer filter (the wavy air above hot food).
function heat() {
  var d = document.createElement("div");
  d.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  d.innerHTML = '<svg><filter id="heat"><feTurbulence type="fractalNoise" baseFrequency="0 0.02" numOctaves="1" seed="3"><animate attributeName="baseFrequency" dur="4s" values="0 0.02;0 0.04;0 0.02" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" scale="7"/></filter></svg>';
  document.body.appendChild(d);
  document.documentElement.classList.add("fx-heat");
}

function init() {
  if (started) return;
  started = true;
  try { heat(); reveal(); } catch (e) { console.error(e); document.documentElement.classList.remove("fx-on", "fx-heat"); }
}
return { init: init, particles: particles, burst: burst };

})();

export default FX;

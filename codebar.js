<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap');
  .cb-wrap { background: #0A0A0A; padding: 2.5rem 2rem; display: flex; flex-direction: column; align-items: center; border-radius: 8px; }
  .cb-label { color: #C9A84C; font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.1rem; letter-spacing: 0.12em; margin-bottom: 1.8rem; opacity: 0.85; }
  .codebar { display: flex; align-items: stretch; height: 280px; gap: 0; position: relative; }
  .separator { width: 2px; background: transparent; flex-shrink: 0; }
  .cocktail-pair { display: flex; align-items: stretch; gap: 3px; position: relative; cursor: pointer; padding: 0 8px; }
  .bar { border-radius: 1px; transition: background 0.15s ease; flex-shrink: 0; }
  .bar-w { background: #F5F5F0; }
  .bar-d { background: #555; }
  .cocktail-pair:hover .bar-w,
  .cocktail-pair:hover .bar-d { background: #C9A84C; }
  .popup {
    display: none;
    position: absolute;
    bottom: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(145deg, #1a3a6b, #0d1f3c);
    border: 1px solid #C9A84C;
    width: 190px;
    border-radius: 8px;
    overflow: hidden;
    z-index: 200;
    pointer-events: none;
    box-shadow: 0 12px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.15);
  }
  .popup::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background: linear-gradient(90deg, transparent, #C9A84C, transparent); }
  .popup::after { content:''; position:absolute; bottom:-8px; left:50%; transform:translateX(-50%); width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-top:8px solid #C9A84C; }
  .cocktail-pair:hover .popup { display: block; }
  .popup-img { width:100%; height:100px; object-fit:cover; display:block; background: #1a2a4a; display:flex; align-items:center; justify-content:center; }
  .popup-img-placeholder { width:100%; height:100px; background: linear-gradient(135deg, #1a2a4a, #0d1528); display:flex; align-items:center; justify-content:center; font-size:2rem; }
  .popup-body { padding: 0.75rem 0.9rem 0.85rem; }
  .popup h4 { color:#C9A84C; margin:0 0 0.3rem; font-family:'Playfair Display',serif; font-style:italic; font-size:0.92rem; font-weight:700; }
  .popup-divider { width:28px; height:1px; background: linear-gradient(90deg, transparent, #C9A84C, transparent); margin: 0.3rem auto 0.4rem; }
  .popup p { color:#c8c8c8; font-size:0.72rem; margin:0; line-height:1.5; letter-spacing:0.03em; }
  .alcohol-notice { color: #ff4444; font-size: 0.65rem; margin-top: 0.35rem; font-style: italic; }
</style>

<div class="cb-wrap">
  <div class="cb-label">Nos créations</div>
  <div class="codebar" id="codebar"></div>
</div>

<script>
const cocktails = [
  { name: "Negroni Fumé", ingredients: "Gin · Campari · Vermouth doux · Zeste orange", emoji: "🍊" },
  { name: "Velours Noir", ingredients: "Rhum vieux · Crème de cacao · Espresso · Vanille", emoji: "☕" },
  { name: "Soleil d'Or", ingredients: "Tequila reposado · Yuzu · Miel · Sel de mer", emoji: "✨" },
  { name: "Rose Sauvage", ingredients: "Gin · Eau de rose · Lychee · Citron · Framboise", emoji: "🌹" },
  { name: "Minuit Bleu", ingredients: "Vodka · Curaçao bleu · Citron · Gingembre · Basilic", emoji: "🫐" },
  { name: "Champagne Dorée", ingredients: "Champagne · Cognac · Angostura · Sucre brun", emoji: "🥂" },
];

const patterns = [
  [3,8,3,18,5,3,10,3],
  [6,3,14,4,8,3,16,4,6],
  [4,12,3,8,18,3,6],
  [8,3,16,5,3,12,4,8],
  [5,18,3,8,3,14,4,5],
  [3,8,4,20,3,6,12,3],
];

const cb = document.getElementById('codebar');

cocktails.forEach((c, i) => {
  const pair = document.createElement('div');
  pair.className = 'cocktail-pair';

  const widths = patterns[i];
  widths.forEach((w, j) => {
    const bar = document.createElement('div');
    bar.className = 'bar ' + (w >= 12 ? 'bar-w' : (w >= 6 ? 'bar-w' : 'bar-d'));
    bar.style.width = w + 'px';
    pair.appendChild(bar);
  });

  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <div class="popup-img-placeholder">${c.emoji}</div>
    <div class="popup-body">
      <h4>${c.name}</h4>
      <div class="popup-divider"></div>
      <p>${c.ingredients}</p>
      <p class="alcohol-notice">* Contient de l'alcool</p>
    </div>`;
  pair.appendChild(popup);

  if (i < cocktails.length - 1) {
    const sep = document.createElement('div');
    sep.style.cssText = 'width:14px;flex-shrink:0;';
    cb.appendChild(pair);
    cb.appendChild(sep);
  } else {
    cb.appendChild(pair);
  }
});
</script>

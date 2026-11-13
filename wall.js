// Loads the list of participants and renders each card in a sandboxed iframe.
// sandbox="" means no scripts run inside a card, and a card's CSS can't leak
// out and break anyone else's card. Plain HTML + CSS only.
(async function () {
  const wall = document.getElementById("wall");
  let people = [];
  try {
    people = await (await fetch("participants.json", { cache: "no-store" })).json();
  } catch {
    wall.innerHTML = '<p class="empty">Could not load participants.json. Run <code>npm run dev</code>.</p>';
    return;
  }
  if (!people.length) {
    wall.innerHTML = '<p class="empty">No cards yet. Be the first: copy <code>participants/_template</code>.</p>';
    return;
  }
  for (const name of people) {
    const fig = document.createElement("figure");
    const frame = document.createElement("iframe");
    frame.setAttribute("sandbox", "");
    frame.setAttribute("loading", "lazy");
    frame.title = `Card by ${name}`;
    frame.src = `participants/${encodeURIComponent(name)}/card.html`;
    const cap = document.createElement("figcaption");
    cap.textContent = name;
    fig.append(frame, cap);
    wall.append(fig);
  }
})();

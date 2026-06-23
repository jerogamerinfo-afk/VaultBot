async function lootAnimation(message) {

  const stages = [
    "🎁 Abriendo caja...",
    "✨ Mezclando cartas...",
    "🎲 Calculando suerte...",
    "📦 Preparando resultado...",
    "🧠 Sistema analizando rareza..."
  ];

  for (const step of stages) {
    await new Promise(r => setTimeout(r, 800));
    await message.edit(step);
  }
}

module.exports = { lootAnimation };
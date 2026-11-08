// Escudo local (front-end/public/crests, baixado por scripts/download_crests.py).
// Clube customizado usa customcrestid; time licenciado usa teamId.
export function crestId (clube) {
  if (!clube) return null
  return clube.iscustomteam === 1 ? clube.customcrestid : clube.teamId
}

export function crest (clube) {
  const id = crestId(clube)
  return `${process.env.BASE_URL}crests/${id || 99150901}.png`
}

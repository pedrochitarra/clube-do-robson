// Constantes e cálculos da página de jogador (paginas/jogadores.py do clubedorobson-py)
export const POSICOES_FAV = { goalkeeper: 'Goleiro', defender: 'Defensor', midfielder: 'Meio-campo', forward: 'Atacante' }
// Índices de proPos usados pela API da EA
export const POSICOES = ['GOL', 'LIB', 'ALD', 'LD', 'ZAD', 'ZAG', 'ZAE', 'LE', 'ALE', 'VOD', 'VOL', 'VOE', 'MD', 'MCD', 'MC',
  'MCE', 'ME', 'MAD', 'MEI', 'MAE', 'SAD', 'SA', 'SAE', 'PD', 'ATD', 'ATA', 'ATE', 'PE']
// Ordem dos atributos em vproattr ("088|089|...")
export const ATRIBUTOS = ['aceleracao', 'pique', 'agilidade', 'equilibrio', 'impulsao', 'folego', 'forca', 'reacao',
  'combatividade', 'frieza', 'interceptacao', 'posAtaque', 'visao', 'chuteslonge', 'forcachute',
  'conducao', 'finalizacao', 'cobrancafalta', 'cabeceio', 'lancamento', 'passecurto', 'nocaodefensiva',
  'cruzamento', 'controlebola', 'divididaempe', 'carrinho', 'voleio', 'curva', 'penaltis']

export function parseAttrs (vpro) {
  if (!vpro) return null
  const vals = vpro.split('|').filter(v => v !== '').map(Number)
  return Object.fromEntries(ATRIBUTOS.map((k, i) => [k, vals[i]]))
}

// Python round() arredonda .5 para o par
function pyRound (x) {
  const r = Math.round(x)
  return Math.abs(x % 1) === 0.5 && r % 2 !== 0 ? r - 1 : r
}

export function grupos (s) {
  return {
    RIT: pyRound(s.pique * 0.55 + s.aceleracao * 0.45),
    FIN: pyRound(s.finalizacao * 0.45 + s.chuteslonge * 0.2 + s.forcachute * 0.2 + s.posAtaque * 0.05 + s.penaltis * 0.05 + s.voleio * 0.05),
    PAS: pyRound(s.passecurto * 0.35 + s.visao * 0.2 + s.cruzamento * 0.2 + s.lancamento * 0.15 + s.curva * 0.05 + s.cobrancafalta * 0.05),
    CON: pyRound(s.conducao * 0.5 + s.controlebola * 0.35 + s.agilidade * 0.1 + s.equilibrio * 0.05),
    DEF: pyRound(s.nocaodefensiva * 0.3 + s.divididaempe * 0.3 + s.interceptacao * 0.2 + s.cabeceio * 0.1 + s.carrinho * 0.1),
    FIS: pyRound(s.forca * 0.5 + s.folego * 0.25 + s.combatividade * 0.2 + s.impulsao * 0.05)
  }
}

export const ROTULOS = { RIT: 'Ritmo', FIN: 'Finalização', PAS: 'Passe', CON: 'Condução', DEF: 'Defesa', FIS: 'Físico' }

// Ordem pensada para as duas colunas do mural terem alturas parecidas
export const GRUPOS = [
  ['Finalização', 'FIN', [['Finalização', 'finalizacao'], ['Força do chute', 'forcachute'], ['Chute de longe', 'chuteslonge'],
    ['Posicionamento', 'posAtaque'], ['Voleio', 'voleio'], ['Pênaltis', 'penaltis']]],
  ['Condução', 'CON', [['Condução', 'conducao'], ['Controle de bola', 'controlebola'], ['Agilidade', 'agilidade'],
    ['Equilíbrio', 'equilibrio'], ['Reação', 'reacao'], ['Frieza', 'frieza']]],
  ['Ritmo', 'RIT', [['Aceleração', 'aceleracao'], ['Pique', 'pique']]],
  ['Passe', 'PAS', [['Passe curto', 'passecurto'], ['Visão', 'visao'], ['Cruzamento', 'cruzamento'],
    ['Lançamento', 'lancamento'], ['Curva', 'curva'], ['Cobrança de falta', 'cobrancafalta']]],
  ['Defesa', 'DEF', [['Noção defensiva', 'nocaodefensiva'], ['Dividida em pé', 'divididaempe'],
    ['Interceptação', 'interceptacao'], ['Cabeceio', 'cabeceio'], ['Carrinho', 'carrinho']]],
  ['Físico', 'FIS', [['Força', 'forca'], ['Fôlego', 'folego'], ['Combatividade', 'combatividade'], ['Impulsão', 'impulsao']]]
]

import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

// Cores tiradas do escudo: roxo do fundo e dourado da bola
export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#a77bf0',
        secondary: '#f5c518',
        accent: '#f5c518',
        success: '#3ecf8e',
        error: '#ef5d6b'
      }
    }
  }
})

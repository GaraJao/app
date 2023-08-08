import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string

    colors: {
      primary: string
      statusBar: string

      secondary900: string
      secondary700: string

      text: string
      fontColorButton: string

      background: string
      background300: string
      background400: string

      shimmer300: string
      shimmer: string

      open: string
      close: string
    }
  }
}

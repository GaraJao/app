import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState, createContext } from 'react'
import { ThemeProvider as ThemeProviderStyled } from 'styled-components'

import { dark } from '../styles/themes/dark'
import { light } from '../styles/themes/light'

export enum ThemeType {
  light = 'light',
  dark = 'dark',
}

const themes = {
  [ThemeType.light]: light,
  [ThemeType.dark]: dark,
}

export const ThemeContext = createContext({
  theme: ThemeType.light,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
})

export const ThemeProvider: React.FC = ({ children }: any) => {
  const [theme, setTheme] = useState(ThemeType.light)

  useEffect(() => {
    loadTheme()
  }, [])

  async function loadTheme() {
    const savedTheme = (await AsyncStorage.getItem('@theme')) as ThemeType
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }

  function toggleTheme() {
    let newTheme
    if (theme === ThemeType.light) {
      newTheme = ThemeType.dark
    } else {
      newTheme = ThemeType.light
    }

    AsyncStorage.setItem('@theme', newTheme)
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProviderStyled theme={themes[theme]}>
        {children}
      </ThemeProviderStyled>
    </ThemeContext.Provider>
  )
}

import { useContext } from 'react'

import { ImgsContext } from '../context/ImgsContext'

export function useImgs() {
  const context = useContext(ImgsContext)

  if (!context) {
    console.log("useImgs must be used within an ImgsProvider");
  }

  return context
}
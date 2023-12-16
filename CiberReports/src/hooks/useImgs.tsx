import { useContext } from 'react'

import { ImgsContext } from '../context/ImgsContext'

export function useImgs() {
  const context = useContext(ImgsContext)

  console.log("estou no useImgs ")

  if (!context) {
    console.log("useImgs must be used within an ImgsProvider");
  }

  return context
}
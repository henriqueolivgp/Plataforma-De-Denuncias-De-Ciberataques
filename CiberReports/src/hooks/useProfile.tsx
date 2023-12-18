import { useContext } from 'react'

import { ProfileContext } from '../context/ProfileContext'

export function useProfile() {
  const context = useContext(ProfileContext)

  console.log("estou no useImgs ")

  if (!context) {
    console.log("useImgs must be used within an ImgsProvider");
  }

  return context
}
import { useContext } from 'react'

import { ProfileContext } from '../context/ProfileContext'

export function useProfile() {

  const context = useContext(ProfileContext)

  if (!context) {
    console.log("useProfile must be used within an ProfileProvider");
  }

  return context
}
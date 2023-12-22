import { useContext } from 'react'

import { ReportsContext } from '../context/ReportsContext'

export function useProfile() {

  const context = useContext(ReportsContext)

  if (!context) {
    console.log("useProfile must be used within an ProfileProvider");
  }

  return context
}
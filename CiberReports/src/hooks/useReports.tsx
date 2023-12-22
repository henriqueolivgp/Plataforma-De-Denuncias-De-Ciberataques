import { useContext } from 'react'

import { ReportsContext } from '../context/ReportsContext'

export function useReports() {

  const context = useContext(ReportsContext)

  if (!context) {
    console.log("useProfile must be used within an ProfileProvider");
  }

  return context
}
export interface Treatment {
  id: number
  medicaments: TreatmentMedicament[]
}

export interface TreatmentMedicament {
  medicamentId: number
  dose: string
  takingSchedulesStartingTimestamp: string
  takingSchedulesEndingTimestamp?: string
  takingSchedules: {
    takingSchedule: string
  }[]
}

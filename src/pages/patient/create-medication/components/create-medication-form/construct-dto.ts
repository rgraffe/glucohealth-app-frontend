import { UpdateTreatmentDto } from '~/features/treatments/dto/update'
import { Treatment, TreatmentMedicament } from '~/shared/types/treatment'
import { CreateMedicationFormValues } from './create-medication-form'
import { toIsoString } from '~/shared/utils/construct-date-string'

export function constructUpdateTreatmentDto(
  treatment: Treatment,
  values: CreateMedicationFormValues,
): UpdateTreatmentDto {
  const {
    medicamentId,
    dose,
    initialDate,
    hasFinalization,
    reminderType,
    fixedHours,
    fixedFinalizationType,
    fixedDurationQuantity,
    fixedDurationUnit,
    fixedShotsQuantity,
    intervalInitialHour,
    intervalFinalizationType,
    intervalFinalDate,
    intervalShotsQuantity,
  } = values

  let newMedicament: Partial<TreatmentMedicament> = {
    dose,
    medicamentId: medicamentId!,
    takingSchedulesStartingTimestamp: toIsoString(initialDate),
  }

  if (reminderType === 'fixed') {
    newMedicament.takingSchedules = fixedHours.map(time => {
      const [hour, minutes] = time.split(':')

      return {
        takingSchedule: `0 ${minutes} ${hour} * * *`,
      }
    })
  }

  if (reminderType === 'interval') {
    const [hour, minutes] = intervalInitialHour.split(':')

    newMedicament.takingSchedules = [
      {
        takingSchedule: `0 ${minutes} ${hour} * * *`,
      },
    ]
  }

  if (!hasFinalization)
    return {
      medicaments: [
        ...treatment.medicaments,
        newMedicament as TreatmentMedicament,
      ],
    }

  if (reminderType === 'fixed') {
    if (fixedFinalizationType === 'by-duration') {
      if (fixedDurationUnit === 'hours') {
        const finalDate = new Date(initialDate)
        finalDate.setHours(initialDate.getHours() + fixedDurationQuantity)

        newMedicament.takingSchedulesEndingTimestamp = finalDate.toISOString()
      }

      if (fixedDurationUnit === 'days') {
        const finalDate = new Date(initialDate)
        finalDate.setDate(initialDate.getDate() + fixedDurationQuantity)

        newMedicament.takingSchedulesEndingTimestamp = finalDate.toISOString()
      }

      if (fixedDurationUnit === 'weeks') {
        const finalDate = new Date(initialDate)
        finalDate.setDate(initialDate.getDate() + fixedDurationQuantity * 7)

        newMedicament.takingSchedulesEndingTimestamp = finalDate.toISOString()
      }
    }

    if (fixedFinalizationType === 'by-shots-quantity') {
      const shotsPerDay = fixedHours.length
      const finalDate = new Date(initialDate)
      finalDate.setDate(
        initialDate.getDate() + fixedShotsQuantity / shotsPerDay,
      )

      newMedicament.takingSchedulesEndingTimestamp = new Date(
        finalDate,
      ).toISOString()
    }
  }

  if (reminderType === 'interval') {
    if (intervalFinalizationType === 'by-final-date') {
      newMedicament.takingSchedulesEndingTimestamp =
        intervalFinalDate.toISOString()
    }

    if (intervalFinalizationType === 'by-shots-quantity') {
      const finalDate = new Date(initialDate)
      finalDate.setDate(initialDate.getDate() + intervalShotsQuantity)

      newMedicament.takingSchedulesEndingTimestamp = toIsoString(finalDate)
    }
  }

  return {
    medicaments: [
      ...treatment.medicaments,
      newMedicament as TreatmentMedicament,
    ],
  }
}

import { array, boolean, number, object, string, date } from 'yup'

export const createMedicationFormValuesSchema = object({
  medicamentId: number().required(),
  dose: string().required(),
  initialDate: date().required(),
  hasFinalization: boolean().required(),
  reminderType: string().oneOf(['fixed', 'interval']).required(),
  fixedHours: array(string()).when('reminderType', ([reminderType], schema) =>
    reminderType === 'fixed' ? schema.required().min(1) : schema,
  ),
  fixedFinalizationType: string()
    .oneOf(['by-duration', 'by-shots-quantity'])
    .when(
      ['reminderType', 'hasFinalization'],
      ([reminderType, hasFinalization], schema) =>
        hasFinalization && reminderType === 'fixed'
          ? schema.required()
          : schema.nullable(),
    ),
  fixedDurationQuantity: number().when(
    ['reminderType', 'hasFinalization', 'fixedFinalizationType'],
    ([reminderType, hasFinalization, fixedFinalizationType], schema) =>
      hasFinalization &&
      reminderType === 'fixed' &&
      fixedFinalizationType === 'by-duration'
        ? schema.required().min(1)
        : schema,
  ),
  fixedDurationUnit: string().when(
    ['reminderType', 'hasFinalization', 'fixedFinalizationType'],
    ([reminderType, hasFinalization, fixedFinalizationType], schema) =>
      hasFinalization &&
      reminderType === 'fixed' &&
      fixedFinalizationType === 'by-duration'
        ? schema.required().oneOf(['hours', 'days', 'weeks'])
        : schema,
  ),
  fixedShotsQuantity: number().when(
    ['reminderType', 'hasFinalization', 'fixedFinalizationType'],
    ([reminderType, hasFinalization, fixedFinalizationType], schema) =>
      hasFinalization &&
      reminderType === 'fixed' &&
      fixedFinalizationType === 'by-shots-quantity'
        ? schema.required().min(1)
        : schema,
  ),
  intervalInitialHour: string().when(
    'reminderType',
    ([reminderType], schema) =>
      reminderType === 'interval' ? schema.required() : schema,
  ),
  intervalFinalizationType: string().when(
    ['reminderType', 'hasFinalization'],
    ([reminderType, hasFinalization], schema) =>
      hasFinalization && reminderType === 'interval'
        ? schema.oneOf(['by-final-date', 'by-shots-quantity']).required()
        : schema.nullable(),
  ),
  intervalFinalDate: string().when(
    ['reminderType', 'hasFinalization', 'intervalFinalizationType'],
    ([reminderType, hasFinalization, intervalFinalizationType], schema) =>
      hasFinalization &&
      reminderType === 'interval' &&
      intervalFinalizationType === 'by-final-date'
        ? schema.required().datetime()
        : schema,
  ),
  intervalShotsQuantity: number().when(
    ['reminderType', 'hasFinalization', 'intervalFinalizationType'],
    ([reminderType, hasFinalization, intervalFinalizationType], schema) =>
      hasFinalization &&
      reminderType === 'by-shots-quantity' &&
      intervalFinalizationType === 'by-final-date'
        ? schema.required().min(1)
        : schema,
  ),
})

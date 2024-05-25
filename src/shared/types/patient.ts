import { User } from './user'
import { Treatment } from './treatment'

export interface Patient extends User {
  age: number
  weightInKg: number
  heightInCm: number
  bmi: number
  treatment: Treatment
}

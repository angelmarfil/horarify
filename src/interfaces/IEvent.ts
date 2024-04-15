import type { IEventData } from './IEventData'

export interface IEvent {
  id: number
  startTime: string
  endTime: string
  dayOfWeek: number
  color: string
  subject: IEventData
  classType: IEventData
  building: IEventData
  classroom: IEventData
  teacher: IEventData
}

import { Injectable } from '@angular/core';
import { Run } from '../models/running';

@Injectable({
  providedIn: 'root'
})
export class RunningService {

  // Mock niz dostupnih sesija trcanja
  private availableRunnings: Run[] = [
    {id: '1', title: 'Jogging', date: new Date(), duration: 20, calories: 300, state: null},
    {id: '2', title: 'Hiking', date: new Date(), duration: 60, calories: 150, state: null},
    {id: '3', title: 'Sprint', date: new Date(), duration: 2, calories: 100, state: null},
    {id: '4', title: 'HIIT', date: new Date(), duration: 10, calories: 350, state: null}
  ]

  constructor() { }

  /**
   * @description Getter for returning mock data of available running sessions
   * @returns {Array} - Array of runnings
   */
  getAvailableRunnings(): Run[] {
    return [...this.availableRunnings];
  }

}

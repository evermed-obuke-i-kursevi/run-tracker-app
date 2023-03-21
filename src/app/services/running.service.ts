import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subject } from 'rxjs';
import { Run } from '../models/running';

@Injectable({
  providedIn: 'root'
})
export class RunningService {

  private availableRunnings: Run[];
  public availableRunningsChanged = new Subject<Run[]>();
  // ! Mock niz dostupnih sesija trcanja
  // private availableRunnings: Run[] = [
  //   {id: '1', title: 'Jogging', duration: 20, calories: 300},
  //   {id: '2', title: 'Hiking', duration: 60, calories: 150},
  //   {id: '3', title: 'Sprint', duration: 1, calories: 100},
  //   {id: '4', title: 'HIIT', duration: 10, calories: 350}
  // ]
  private runningStarted: Run | undefined | null;
  public runningChange = new Subject<any>();
  private pastRunnings: any[] = [];

  constructor(private db: AngularFirestore) { }

  /**
   * @description Method for fetching all available running sessions from Firestore DB
   */
  fetchAvailableRunnings() {
    this.db
      .collection('availableRunnings')
      .snapshotChanges()
      .pipe(map(docArray => {
        console.log(docArray);
        return docArray.map((doc) => {
          let item = doc.payload.doc.data() as any;
          return {
            id: doc.payload.doc['id'],
            ...item
          }
        })
      }))
      .subscribe((dataFromDB: Run[]) => {
        this.availableRunnings = dataFromDB;
        this.availableRunningsChanged.next([...this.availableRunnings]);
      });
  }

  /**
   * @description Method for creating new running session in History collection
   * @param {Run} running - completed/stopped running session
   */
  private createRunningInDB(running: any) {
    this.db
      .collection('runningHistory')
      .add(running)
      .then(response => console.log(response));
  }

  /**
   * @description Method for handling running session start
   */
  startRun(runId: string) {
    console.log(`Usao u servis sa IDem ${runId}`);
    console.log(typeof runId);
    this.runningStarted = this.availableRunnings.find(running => {
      return running.id === runId;
    });
    this.runningChange.next(this.runningStarted);
  }

  /**
   * @description Method for handling successfully completed running session
  */
  completeRun() {
    const runCompleted = {
      ...this.runningStarted,
      date: new Date(),
      state: 'completed'
    }
    this.createRunningInDB(runCompleted);
    console.log(`Uspeh `, runCompleted);
    this.pastRunnings.push(runCompleted);
    this.runningStarted = null;
    this.runningChange.next(null);
  }

  /**
   * @description Method for stopping running session
   */
  stopRun(progress: number) {
    const durationDone = this.runningStarted
      ? (this.runningStarted.duration) * (progress / 100)
      : 0;
    const caloriesBurned = this.runningStarted
      ? this.runningStarted.calories * durationDone
      : 0;
    const runStopped = {
      ...this.runningStarted,
      date: new Date(),
      state: 'stopped',
      duration: durationDone,
      calories: caloriesBurned
    }
    this.createRunningInDB(runStopped);
    this.runningStarted = null;
    this.runningChange.next(null);
    this.pastRunnings.push(runStopped);
  }

  /**
   * @description Getter for returning mock data of available running sessions
   * @returns {Array} - Array of runnings
   */
  getAvailableRunnings(): Run[] {
    return [...this.availableRunnings];
  }

  /**
   * @description Getter for returning copy of started running session
   * @returns {Object} - running session started
   */
  getRunningStarted(): any {
    return {...this.runningStarted};
  }

  /**
   * @description Getter for returning copy of history of running sessions
   * @returns {Array} - past running sessions array
  */
  getRunningHistory() {
    return [...this.pastRunnings];
  }

}

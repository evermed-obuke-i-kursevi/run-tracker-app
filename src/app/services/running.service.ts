import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Subject } from 'rxjs';
import { Run } from '../models/running';

@Injectable({
  providedIn: 'root'
})
export class RunningService {

  private availableRunnings: Run[];
  public availableRunningsChanged = new Subject<Run[]>();
  public pastRunningsChanged = new Subject<Run[]>();
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

  constructor(private db: AngularFirestore,
              private matSnackBar: MatSnackBar) { }

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
   * @description Method for fetching history of running sessions from Firestore DB
   */
  public fetchPastRunnings() {
    const userId = localStorage.getItem('currentUserId');
    this.db
      .collection(
        'runningHistory',
        ref => ref.where('userId', '==', userId)
      )
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map((doc) => {
          let item = doc.payload.doc.data() as any;
          return {
            id: doc.payload.doc['id'],
            ...item
          };
        })
      }))
      .subscribe((dataFromDB: Run[]) => {
        this.pastRunnings = dataFromDB;
        this.pastRunningsChanged.next([...this.pastRunnings]);
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
      .then(doc => {
        const docId = doc.id;
        this.db
          .collection('runningHistory')
          .doc(docId)
          .update({
            'historyId': docId
          })
          .catch(e => {
            this.matSnackBar.open(e.message, `Close`);
          });
      });
  }

  /**
   * @description Method for deleting complete history of running sessions for logged user
   */
  deleteAllForUser() {
    const userId = localStorage.getItem('currentUserId');
    let runningHistoryQuery = this.db.collection(
      'runningHistory',
      ref => ref.where('userId', '==', userId)
    );
    runningHistoryQuery
      .get()
      .subscribe(docs => {
        docs.forEach((doc) => {
          doc.ref.delete()
            .then(() => {
              this.matSnackBar.open(`Your history has been emptied!`, `Close`, {
                duration: 2000
              })
            })
            .catch(e => {
              this.matSnackBar.open(e.message, `Close`, {
                duration: 2000
              })
            })
        })
      });
  }

  /**
   * @description Method for deleting single item of running session for logged user
   * @param {string} id - id of document to delete
   */
  deleteOne(id: string) {
    this.db
      .collection('runningHistory')
      .doc(id)
      .delete()
      .then(() => {
        this.matSnackBar.open(`Item deleted`, `Close` , {
          duration: 2000
        })
      })
      .catch(e => this.matSnackBar.open(e.message, 'Close'));
  }

  /**
   * @description Method for handling running session start
   */
  startRun(runId: string) {
    // ? Zakomentarisani kod ispod je primer update-a u DB-u
    // this.db
    //   .doc(`/availableRunnings/${runId}`)
    //   .update({
    //     inProgress: true
    //   })
    //   .then(response => console.log(response))
    //   .catch(e => console.log(e));
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
    const userId = localStorage.getItem('currentUserId'); // nije asinhrona operacija
    const runCompleted = {
      ...this.runningStarted,
      date: new Date(),
      state: 'completed',
      userId
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
    const userId = localStorage.getItem('currentUserId');
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
      calories: caloriesBurned.toFixed(2),
      userId
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

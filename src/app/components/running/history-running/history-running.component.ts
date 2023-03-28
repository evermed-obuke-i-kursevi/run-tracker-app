import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Run } from 'src/app/models/running';
import { RunningService } from 'src/app/services/running.service';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-history-running',
  templateUrl: './history-running.component.html',
  styleUrls: ['./history-running.component.css']
})
export class HistoryRunningComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['title', 'date', 'duration', 'calories', 'state', 'actions'];
  dataSource = new MatTableDataSource<Run>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  paginationSize: number;
  pastRunningsSubscription: Subscription;

  constructor(private runningService: RunningService,
              public dialog: MatDialog) {}

  /**
   * @description Method for browsing and searching running history
   */
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  /**
   * @description Method for opening delete running session dialog
   * @param {number} flag - number that indicates the function invoked
   * @param {string} id - id of item to delete
   */
  openDialog(flag: number, id?: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id
      }
    })
    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result === true && flag === 1) {
          this.runningService.deleteAllForUser();
        } else if (result === true && flag === 2) {
          this.runningService.deleteOne(id as string);
        }
      })
  }

  ngOnInit() {
    // const historyData = this.runningService.getRunningHistory();
    this.pastRunningsSubscription = this.runningService.pastRunningsChanged
      .subscribe((data: Run[]) => {
        this.dataSource.data = data;
        this.paginationSize = this.dataSource.data.length;
      });
    this.runningService.fetchPastRunnings();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.pastRunningsSubscription.unsubscribe();
  }

}

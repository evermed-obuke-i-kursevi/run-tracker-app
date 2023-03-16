import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Run } from 'src/app/models/running';
import { RunningService } from 'src/app/services/running.service';

@Component({
  selector: 'app-history-running',
  templateUrl: './history-running.component.html',
  styleUrls: ['./history-running.component.css']
})
export class HistoryRunningComponent implements OnInit, AfterViewInit {

  displayedColumns = ['title', 'date', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Run>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  paginationSize: number;

  constructor(private runningService: RunningService) {

  }

  /**
   * @description Method for browsing and searching running history
   */
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    const historyData = this.runningService.getRunningHistory();
    this.dataSource.data = historyData;
    this.paginationSize = this.dataSource.data.length;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

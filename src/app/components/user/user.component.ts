import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDtlViewComponent } from '../../dialog-components/user-dtl-view/user-dtl-view.component';
import { GlobalService } from '../../core/services/global.service';

@Component({
  selector: 'app-user',
  // standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['SLNO', 'name', 'username', 'email', 'address', 'phone', 'action'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private global: GlobalService,
  ) { }

  ngOnInit() {
    this.fnGetUsersData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAction(action: string, userData: any) {

    let dialogRef = this.dialog.open(UserDtlViewComponent, {
      width: action == 'delete' ? 'auto' : '60%',
      height: action == 'delete' ? 'auto' : '80%',
      data: {
        action, userData
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.action == 'add') {
        this.fnCreateUsersData(result.userData)
      }
      if (result.action == 'edit') {
        this.fnUpdateUsersData(result.userData)
      }
      else if (result.action == 'delete') {
        this.fndeleteUsersData(result.userData)
      }
    });
  }

  fnGetUsersData() {
    this.userService.getAllUsers().subscribe(users => {
      this.dataSource.data = users;
      this.fnGenerateSerialNum()
    });
  }

  fnCreateUsersData(params: any) {
    this.userService.createUser(params).subscribe((users: any) => {
      this.dataSource.data.push(users)
      this.dataSource.data = [...this.dataSource.data]
      this.fnGenerateSerialNum()
      this.global.showToast("New Record Created Successfully !")
    });
  }

  fnUpdateUsersData(params: any) {
    this.userService.updateUser(params).subscribe((users: any) => {
      const index = this.dataSource.data.findIndex(user => user.id === users.id);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1, users);
      }
      this.dataSource.data = [...this.dataSource.data]
      this.fnGenerateSerialNum()
      this.global.showToast("Record Updated Successfully !")

    });
  }

  fndeleteUsersData(params: any) {
    this.userService.deleteUser(params).subscribe((users: any) => {
      const index = this.dataSource.data.findIndex(user => user.id === params.id);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
      }
      this.dataSource.data = [...this.dataSource.data]
      this.fnGenerateSerialNum()
      this.global.showToast("Record Deleted Successfully !")
    });
  }

  fnGenerateSerialNum() {
    this.dataSource.data.forEach((element: any, index: any) => {
      element.SLNO = index + 1
    });
  }


}


import { Component, OnInit } from '@angular/core';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { AuthService } from '../models/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) {}
  private model = {email: '', password: ''};
  public status;
  ngOnInit() {}
  onSubmit() {
    // console.log(this.model);
    if (this.model.email === '' && this.model.password === '') {
      this.status = 'Invalid Username and password';
    } else if (this.model.email === '') {
      this.status = 'Invalid Username';
    } else if (this.model.password === '') {
      this.status = 'Invalid Password';
    } else {
      this.login(this.model);
    }

  }

  login(model) {
    const that = this;
    this.auth.login(model.email, model.password).then(data => {
      that.router.navigate(['/']);
    }).catch(err => {
      console.log(err)
      alert(err.message);
    });
  }

}

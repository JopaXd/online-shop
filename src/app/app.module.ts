import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductService } from './product.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

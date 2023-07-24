import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [],
  imports: [FormsModule, CommonModule, HttpClientModule, FontAwesomeModule],
  exports: [FormsModule, CommonModule, HttpClientModule, FontAwesomeModule],
})
export class SharedModule {}

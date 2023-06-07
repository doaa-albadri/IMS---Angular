import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SalesReportComponent } from './pages/reports/sales-report/sales-report.component';
import { CustomerReportComponent } from './pages/reports/customer-report/customer-report.component';
import { InventoryReportComponent } from './pages/reports/inventory-report/inventory-report.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    BarChartComponent,
    PieChartComponent,
    LoginComponent,
    ProductsComponent,
    SearchBarComponent,
    ButtonComponent,
    ModalComponent,
    SuppliersComponent,
    ReportsComponent,
    SalesReportComponent,
    CustomerReportComponent,
    InventoryReportComponent,
    DoughnutChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

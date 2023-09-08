import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./common/admin-layout/admin-layout.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { AddPageComponent } from "./add-page/add-page.component";
import { OrdersPageComponent } from "./orders-page/orders-page.component";
import { EditPageComponent } from "./edit-page/edit-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { authGuard } from "../common/auth.guard";
import { QuillModule } from 'ngx-quill';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        AddPageComponent,
        EditPageComponent,
        OrdersPageComponent
    ],
    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent,
                children: [
                    { path: '', redirectTo:'/admin/login',pathMatch:'full' },
                    { path: 'login', component: LoginPageComponent },
                    { path: 'dashboard', component: DashboardPageComponent, canActivate:[ authGuard ]  },
                    { path: 'add', component: AddPageComponent, canActivate:[ authGuard ]  },
                    { path: 'orders', component: OrdersPageComponent, canActivate:[ authGuard ]  },
                    { path: 'product/:id/edit', component: EditPageComponent, canActivate:[ authGuard ]  },
                ]
            }
        ])
    ],
    exports: []
})
export class AdminModule {

}
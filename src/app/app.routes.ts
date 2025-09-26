import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { HomeComponent } from './features/components/home/home.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { BrandsComponent } from './features/components/brands/brands.component';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { CartComponent } from './features/components/cart/cart.component';
import { ProductsComponent } from './features/components/products/products.component';
import { authGuard } from './core/guards/auth-guard';
import { CheckoutComponent } from './features/components/Checkout/checkout/checkout.component';
import { AllordersComponent } from './features/components/AllOrders/allorders/allorders.component';
import { ForgotPasswordComponent } from './features/components/forgot-password/forgot-password.component';
import { RestPasswordServiceService } from './features/components/forgot-password/rest-password-service.service';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { SubCategoryComponent } from './features/sub-category/sub-category.component';
import { BrandProductsComponent } from './features/brand-products/brand-products.component';

export const routes: Routes = [

    {path:'' , redirectTo:'login' , pathMatch:'full'},

    {path:'' , component:AuthLayoutComponent , children:[
        {path: 'login' , component:LoginComponent , title:'Login'},
        {path: 'register' , component:RegisterComponent , title:'Register'},
        {path: 'forget password' , component:ForgotPasswordComponent , title:'Forget Password'}
    ]},

    {path:'' , component:MainLayoutComponent , canActivate:[authGuard]  , children:[
        {path:'home' , component:HomeComponent , title:'Home'},
        {path:'brands' , component:BrandsComponent , title:'Brands'},
        {path:'categories' , component:CategoriesComponent , title:'Categories'},
        {path:'cart'  , component:CartComponent , title:'Cart'},
        {path:'products' , component:ProductsComponent , title:'Products'},
        {path:'checkout/:c_id' , component:CheckoutComponent , title:'Check Out'},
        {path:'allorders' , component:AllordersComponent , title:'Orders'},
        {path:'wishlist' , component:WishlistComponent , title:'Wish list'},
        {path:'subcategory/:s_id' , component:SubCategoryComponent , title:'Sub Category'},
        {path:'brand-products/:b_id' , component:BrandProductsComponent, title:'Poducts of brand'},
        {path:'notfound' , component:NotfoundComponent , title:'Not Found'},
        {path:'p_details/:p_id' , loadComponent: ()=> import('./features/components/p-details/p-details.component').then( (c)=>c.PDetailsComponent )  , title:'Product Details'},
    ]},
    {path:"**" , component:NotfoundComponent , title:'404'}

];

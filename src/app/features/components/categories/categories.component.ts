import { Component, OnInit } from '@angular/core';
import { CatagoriesService } from '../../../shared/services/Categories/catagories.service';
import { ICategory } from '../../../core/interfaces/icategory.interface';
import { SubCategoryComponent } from '../../sub-category/sub-category.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [SubCategoryComponent, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  constructor(private _CatagoriesService: CatagoriesService) { }
  allCategories!: ICategory[];
  selectedSubCategories!: ICategory[];
  activeCategoryId!: string | null;

  ngOnInit(): void {
    this._CatagoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data
        console.log(res.data);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  showSubCategories(category_id: string) {
    this._CatagoriesService.getSubCategories(category_id).subscribe({
      next: (res) => {
        this.selectedSubCategories = res.data,
          console.log(res);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }




}

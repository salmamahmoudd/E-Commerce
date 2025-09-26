import { Component } from '@angular/core';
import { ICategory } from '../../../../../core/interfaces/icategory.interface';
import { CatagoriesService } from '../../../../../shared/services/Categories/catagories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css',
})
export class CategoriesSliderComponent {
  constructor(private _CatagoriesService: CatagoriesService) {}
  allCategories!: ICategory[];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplaySpeed: 500 ,
    autoplayTimeout: 500,
    autoplayHoverPause:true, 
    navText: ['‹','›'],    
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this._CatagoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

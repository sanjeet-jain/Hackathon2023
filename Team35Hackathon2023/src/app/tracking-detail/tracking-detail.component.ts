import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { addCarbonFootprint } from '../helpers/carbon-footprint.helper';

@Component({
  selector: 'app-tracking-detail',
  templateUrl: './tracking-detail.component.html',
  styleUrls: ['./tracking-detail.component.css'],
})
export class TrackingDetailComponent implements OnInit {
  cardData: any[] = [];

  trackingNumber: string = '';
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.trackingNumber =
      this.route.snapshot.paramMap.get('trackingNumber') ?? '';

    this.fetchCardData(this.trackingNumber);
  }
  currentIndex = 0;
  onAnimationEndArr: boolean[] = [];

  onAnimationEnd(currentIndex: number, movingObject: any) {
    if (currentIndex! < this.onAnimationEndArr.length - 1)
      movingObject.style.opacity = 0;
    else {
      movingObject.style.top = '100%';
    }
    this.onAnimationEndArr[currentIndex] = true;
    console.log(this.onAnimationEndArr[currentIndex - 1]);
  }

  fetchCardData(trackingNumber: string) {
    // Replace 'path/to/your/json' with the actual path to your JSON file
    this.http.get<any[]>('assets/transportHistory.json').subscribe((data) => {
      console.log(data);
      this.cardData = data.filter((x) => x.TrackingNumber === trackingNumber);
      for (let i = 0; i < this.cardData.length; i++) {
        this.onAnimationEndArr.push(false);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracking-detail',
  templateUrl: './tracking-detail.component.html',
  styleUrls: ['./tracking-detail.component.css']
})
export class TrackingDetailComponent  implements OnInit{
  cardData: any[] = [];

  trackingNumber: string="";
  constructor(private http: HttpClient,private route: ActivatedRoute) { }


  ngOnInit() {
    this.trackingNumber = this.route.snapshot.paramMap.get('trackingNumber')??"";
    
    this.fetchCardData(this.trackingNumber);
  }
  
 

  fetchCardData(trackingNumber: string) {
    // Replace 'path/to/your/json' with the actual path to your JSON file
    this.http.get<any[]>('assets/transportHistory.json').subscribe(data => {
      console.log(data)
      this.cardData = data.filter(x=>x.TrackingNumber === trackingNumber);
      console.log(this.cardData)
     
    });
  }
}
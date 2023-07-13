import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tracking-list',
  templateUrl: './tracking-list.component.html',
  styleUrls: ['./tracking-list.component.css']
})
export class TrackingListComponent implements OnInit{
  packages: any[] = [];

  CustomerId:number=2345980;
  constructor(private http: HttpClient,private route: ActivatedRoute) { }


  ngOnInit() {
   
    
    this.fetchCardData(this.CustomerId);
  }
  
 

  fetchCardData(CustomerId: number) {
    // Replace 'path/to/your/json' with the actual path to your JSON file
    this.http.get<any[]>('assets/packageDetails.json').subscribe(data => {
      console.log(data)
      this.packages = data.filter(x=>x.CustomerId === CustomerId);
      
    });
  }
}
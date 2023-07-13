import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent implements OnInit{
  rewardPoints: any[] = [];

  CustomerId:number=2345980;
  constructor(private http: HttpClient,private route: ActivatedRoute) { }


  ngOnInit() {
    this.fetchCardData(this.CustomerId);
}

fetchCardData(CustomerId: number) {
  this.http.get<any[]>('assets/customerDetails.json').subscribe(data => {
    this.rewardPoints = data.filter(x=>x.CustomerID === CustomerId);
  });
}
}
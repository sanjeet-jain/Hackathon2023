import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'
import { addCarbonFootprint } from '../helpers/carbon-footprint.helper';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent implements OnInit{
  rewardPoints: any[] = [];
  carbonfootPrintRewardPoints: any[] = [];
  CustomerId:number=2345980;

  constructor(private http: HttpClient,private route: ActivatedRoute) { }
  ngOnInit() {
    this.fetchCardData(this.CustomerId);
    
}

carbonfootPrintReward() {  
  this.carbonfootPrintRewardPoints = addCarbonFootprint();
}

fetchCardData(CustomerId: number) {
  this.http.get<any[]>('assets/customerDetails.json').subscribe(data => {
    this.rewardPoints = data.filter(x=>x.CustomerID === CustomerId);

    let sum = 0;
    this.carbonfootPrintReward();

    if(this.carbonfootPrintRewardPoints != null && this.carbonfootPrintRewardPoints.length > 0){
    for (let i = 0; i < this.carbonfootPrintRewardPoints.length; i++) {
      sum += this.carbonfootPrintRewardPoints[i].RewardsPoints;
      
    }
    if(isNaN(sum))
      sum = 0;
    else
      this.rewardPoints[0].RewardPoints += sum;
  }
  });
  
}
}


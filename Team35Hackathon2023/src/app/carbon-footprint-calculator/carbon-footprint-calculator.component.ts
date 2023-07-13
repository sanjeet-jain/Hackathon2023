import { Component, OnInit } from '@angular/core';
import * as co2Rates from '../../assets/co2Rates.json';
import * as packageDetails from '../../assets/packageDetails.json';
import * as transportHistory from '../../assets/transportHistory.json';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carbon-footprint-calculator',
  templateUrl: './carbon-footprint-calculator.component.html',
  styleUrls: ['./carbon-footprint-calculator.component.css'],
})
export class CarbonFootprintCalculatorComponent implements OnInit {
  carbonRatesData: any[] = co2Rates;
  transportHistoryData: any[] = transportHistory;
  packageData: any[] = packageDetails;
  carbonEmissionData: any[] = [];
  map = new Map<string, number>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.addCarbonFootprint();
  }

  addCarbonFootprint() {
    for (let i = 0; i < this.packageData.length; i++) {
      let number = this.packageData[i].WeightPerVolumeForPackage;
      this.map.set(
        this.packageData[i].TrackingNumber,
        parseFloat(number.match(/[0-9.]+/g))
      );
    }
    for (let i = 0; i < this.transportHistoryData.length; i++) {
      var distance = this.transportHistoryData[i].DistanceCoveredInMiles;
      var shippingMethod = this.transportHistoryData[i].MeansOfTransportation;
      var packageWeight = this.map.get(
        this.transportHistoryData[i].TrackingNumber
      )!;
      var mpg = 0.0;
      var emissionsPerMile = 0.0;
      var maxWeight = 0.0;
      switch (shippingMethod) {
        case 'UPS  Air':
          mpg = this.carbonRatesData[0].GallonsFuelPerMile;
          emissionsPerMile = this.carbonRatesData[0].LBsCO2PerGallonFuel;
          maxWeight = this.carbonRatesData[0].MaxCargoWeightLBs;
          break;
        case 'UPS Truck':
          if ((this.transportHistoryData[i].PackageStatus = 'In transit ')) {
            mpg = this.carbonRatesData[1].GallonsFuelPerMile;
            emissionsPerMile = this.carbonRatesData[1].LBsCO2PerGallonFuel;
            maxWeight = this.carbonRatesData[1].MaxCargoWeightLBs;
          } else {
            mpg = this.carbonRatesData[2].GallonsFuelPerMile;
            emissionsPerMile = this.carbonRatesData[2].LBsCO2PerGallonFuel;
            maxWeight = this.carbonRatesData[2].MaxCargoWeightLBs;
          }
          break;
        default:
          mpg = 0.0;
          emissionsPerMile = 0.0;
          maxWeight = 0.0;
          break;
      }
      var CarbonEmission =
        (packageWeight / maxWeight) * distance * mpg * emissionsPerMile;
      var Rewards = 100 * (1 - (CarbonEmission * 0.0001));
      var pack: transportHistoryCarbon = {
        TrackingNumber: this.transportHistoryData[i].TrackingNumber,
        Location: this.transportHistoryData[i].Location,
        MeansOfTransportation:
          this.transportHistoryData[i].MeansOfTransportation,
        DistanceCoveredInMiles:
          this.transportHistoryData[i].DistanceCoveredInMiles,
        PackageStatus: this.transportHistoryData[i].PackageStatus,
        Timestamp: this.transportHistoryData[i].Timestamp,
        CarbonFootPrint: CarbonEmission,
        RewardsPoints: Rewards,
      };
      this.carbonEmissionData.push(pack);
    }
    // const data = JSON.stringify(this.carbonEmissionData);
    console.log(this.carbonEmissionData);
    return this.carbonEmissionData;
  }
}

interface transportHistoryCarbon {
  TrackingNumber: String;
  Location: String;
  MeansOfTransportation: String;
  DistanceCoveredInMiles: Number;
  PackageStatus: String;
  Timestamp: String;
  CarbonFootPrint: Number;
  RewardsPoints: Number;
}
interface CarbonData {
  VehicleType: String;
  MaxCargoWeightLBs: Number;
  MaxCargoVolumeLBs: Number;
  GallonsFuelPerMile: Number;
  LBsCO2PerGallonFuel: Number;
}
interface packageDetail {
  CustomerId: Number;
  TrackingNumber: String;
  PackageStatus: String;
  DeliveryTimeStamp: String;
  Destination: String;
  ServiceType: String;
  WeightPerVolumeForPackage: String;
}

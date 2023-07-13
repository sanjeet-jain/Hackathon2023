import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carbon-footprint-calculator',
  templateUrl: './carbon-footprint-calculator.component.html',
  styleUrls: ['./carbon-footprint-calculator.component.css'],
})
export class CarbonFootprintCalculatorComponent implements OnInit {
  carbonRatesData: any[] = [];
  transportHistoryData: any[] = [];
  packageData: any[] = [];
  carbonEmissionData: any[] = [];
  map = new Map<string, number>();

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.fetchCarbonRates();
    this.fetchTransportHistory();
    this.fetchPackageData();
    this.addCarbonFootprint();
  }

  fetchCarbonRates() {
    this.http.get<any[]>('assets/co2Rates.json').subscribe((data) => {
      this.carbonRatesData = data;
    });
    console.log(this.carbonRatesData);
  }

  fetchTransportHistory() {
    this.http.get<any[]>('assets/transportHistory.json').subscribe((data) => {
      this.transportHistoryData = data;
    });
    console.log(this.transportHistoryData);
  }

  fetchPackageData() {
    this.http.get<any[]>('assets/packageDetails.json').subscribe((data) => {
      this.packageData = data;
    });
    for (let i = 0; i < this.packageData.length; i++) {
      let number = this.packageData[i].WeightPerVolumeForPackage;
      this.map.set(
        this.packageData[i].TrackingNumber,
        parseFloat(number.match(/[0-9.]+/g))
      );
    }
    console.log(this.packageData);
  }

  addCarbonFootprint() {
    console.log(1);
    for (let i = 0; i < this.transportHistoryData.length; i++) {
      var distance = this.transportHistoryData[i].DistanceCoveredInMiles;
      var shippingMethod = this.transportHistoryData[i].MeansOfTransportation;
      var packageWeight = this.map.get(
        this.transportHistoryData[i].TrackingNumber
      )!;
      console.log(packageWeight);
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
      };
      this.carbonEmissionData.push(pack);
    }
    const data = JSON.stringify(this.carbonEmissionData);
    console.log(JSON.stringify(this.carbonEmissionData));
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

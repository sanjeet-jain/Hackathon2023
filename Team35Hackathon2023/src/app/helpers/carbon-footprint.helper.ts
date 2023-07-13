import * as co2Rates from '../../assets/co2Rates.json';
import * as packageDetails from '../../assets/packageDetails.json';
import * as transportHistory from '../../assets/transportHistory.json';

const carbonRatesData: any[] = co2Rates;
const transportHistoryData: any[] = transportHistory;
const packageData: any[] = packageDetails;
const carbonEmissionData: any[] = [];
const map = new Map<string, number>();

export function addCarbonFootprint() {
  for (let i = 0; i < packageData.length; i++) {
    let number = packageData[i].WeightPerVolumeForPackage;
    map.set(
      packageData[i].TrackingNumber,
      parseFloat(number.match(/[0-9.]+/g))
    );
  }
  for (let i = 0; i < transportHistoryData.length; i++) {
    var distance = transportHistoryData[i].DistanceCoveredInMiles;
    var shippingMethod = transportHistoryData[i].VehicleType;
    var packageWeight = map.get(transportHistoryData[i].TrackingNumber)!;
    var mpg = 0.0;
    var emissionsPerMile = 0.0;
    var maxWeight = 1.0;
    switch (shippingMethod) {
      case 'Boeing767':
        mpg = carbonRatesData[0].GallonsFuelPerMile;
        emissionsPerMile = carbonRatesData[0].LBsCO2PerGallonFuel;
        maxWeight = carbonRatesData[0].MaxCargoWeightLBs;
        break;
      case 'SemiTrailer':
        mpg = carbonRatesData[1].GallonsFuelPerMile;
        emissionsPerMile = carbonRatesData[1].LBsCO2PerGallonFuel;
        maxWeight = carbonRatesData[1].MaxCargoWeightLBs;
        break;
      case 'StepVan':
        mpg = carbonRatesData[2].GallonsFuelPerMile;
        emissionsPerMile = carbonRatesData[2].LBsCO2PerGallonFuel;
        maxWeight = carbonRatesData[2].MaxCargoWeightLBs;
        break;
      default:
        mpg = 0.0;
        emissionsPerMile = 0.0;
        maxWeight = 1.0;
        break;
    }
    var CarbonEmission =
      (packageWeight / maxWeight) * distance * mpg * emissionsPerMile;
    var Rewards = Math.round(100 * (1 - CarbonEmission * 0.0001));
    var pack: transportHistoryCarbon = {
      TrackingNumber: transportHistoryData[i].TrackingNumber,
      Location: transportHistoryData[i].Location,
      MeansOfTransportation: transportHistoryData[i].MeansOfTransportation,
      DistanceCoveredInMiles: transportHistoryData[i].DistanceCoveredInMiles,
      PackageStatus: transportHistoryData[i].PackageStatus,
      Timestamp: transportHistoryData[i].Timestamp,
      VehicleType: transportHistoryData[i].VehicleType,
      CarbonFootPrint: CarbonEmission,
      RewardsPoints: Rewards,
    };
    carbonEmissionData.push(pack);
  }
  // const data = JSON.stringify(carbonEmissionData);
  console.log(carbonEmissionData);
  return carbonEmissionData;
}

interface transportHistoryCarbon {
  TrackingNumber: String;
  Location: String;
  MeansOfTransportation: String;
  DistanceCoveredInMiles: Number;
  PackageStatus: String;
  Timestamp: String;
  VehicleType: String;
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

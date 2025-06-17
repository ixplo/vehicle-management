import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Vehicle } from '../interfaces/vehicle/vehicle';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private readonly apiUrl = environment.apiUrl;

    // Mock data matching the Vehicle interface exactly
    private readonly mockVehicles: Vehicle[] = [
        {
            vehicleId: '1',
            type: 'SUV',
            useOfVehicle: 'Personal',
            derivative: 'Premium',
            registrationDate: '2023-01-15',
            kilometers: 15000,
            description: 'Spacious SUV with excellent fuel efficiency and modern features',
            ecoLabel: 'O',
            numberOfDoors: 5,
            transmissionType: 'Automatic',
            fuelIcon: 'gasoline',
            visitCounter: 45,
            dealerLink: 'https://dealer.example.com/vehicle/1',
            year: 2023,
            price: 35000,
            supplierWebsiteUrl: 'https://supplier.example.com',
            supplierInternalCode: 'SUV-2023-001',
            createdBy: 'admin',
            createdAt: '2023-01-10T10:00:00Z',
            updatedBy: 'admin',
            updatedAt: '2023-01-10T10:00:00Z',
            isActive: true,
            photos: [
                {
                    photoId: 'photo1',
                    vehicle: '1',
                    photoUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    ordering: 1,
                    description: 'Front view of the SUV'
                },
                {
                    photoId: 'photo2',
                    vehicle: '1',
                    photoUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    ordering: 2,
                    description: 'Interior view of the SUV'
                }
            ]
        },
        {
            vehicleId: '2',
            type: 'Sedan',
            useOfVehicle: 'Business',
            derivative: 'Executive',
            registrationDate: '2022-08-20',
            kilometers: 25000,
            description: 'Luxury sedan with advanced safety features and comfort',
            ecoLabel: 'B',
            numberOfDoors: 4,
            transmissionType: 'Manual',
            fuelIcon: 'diesel',
            visitCounter: 72,
            dealerLink: 'https://dealer.example.com/vehicle/2',
            year: 2022,
            price: 28000,
            supplierWebsiteUrl: 'https://supplier.example.com',
            supplierInternalCode: 'SED-2022-002',
            createdBy: 'manager',
            createdAt: '2022-08-15T14:30:00Z',
            updatedBy: 'manager',
            updatedAt: '2022-08-15T14:30:00Z',
            isActive: true,
            photos: [
                {
                    photoId: 'photo3',
                    vehicle: '2',
                    photoUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    ordering: 1,
                    description: 'Side view of the sedan'
                },
                {
                    photoId: 'photo4',
                    vehicle: '2',
                    photoUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    ordering: 2,
                    description: 'Rear view of the sedan'
                }
            ]
        },
        {
            vehicleId: '3',
            type: 'Hatchback',
            useOfVehicle: 'Personal',
            derivative: 'Sport',
            registrationDate: '2024-02-10',
            kilometers: 5000,
            description: 'Compact hatchback perfect for city driving with sporty design',
            ecoLabel: 'ECO',
            numberOfDoors: 3,
            transmissionType: 'Automatic',
            fuelIcon: 'electric',
            visitCounter: 23,
            dealerLink: 'https://dealer.example.com/vehicle/3',
            year: 2024,
            price: 22000,
            supplierWebsiteUrl: 'https://supplier.example.com',
            supplierInternalCode: 'HB-2024-003',
            createdBy: 'admin',
            createdAt: '2024-02-05T09:15:00Z',
            updatedBy: 'admin',
            updatedAt: '2024-02-05T09:15:00Z',
            isActive: true,
            photos: [
                {
                    photoId: 'photo5',
                    vehicle: '3',
                    photoUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    ordering: 1,
                    description: 'Front view of the hatchback'
                },
                {
                    photoId: 'photo6',
                    vehicle: '3',
                    photoUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    ordering: 2,
                    description: 'Dashboard view of the hatchback'
                }
            ]
        },
        {
            "vehicleId": "4",
            "type": "Pickup",
            "useOfVehicle": "Business",
            "derivative": "Off-Road",
            "registrationDate": "2023-05-10",
            "kilometers": 18000,
            "description": "Durable pickup truck ideal for heavy-duty work and rugged terrain",
            "ecoLabel": "C",
            "numberOfDoors": 4,
            "transmissionType": "Automatic",
            "fuelIcon": "diesel",
            "visitCounter": 60,
            "dealerLink": "https://dealer.example.com/vehicle/4",
            "year": 2023,
            "price": 42000,
            "supplierWebsiteUrl": "https://supplier.example.com",
            "supplierInternalCode": "PICKUP-2023-004",
            "createdBy": "salesrep",
            "createdAt": "2023-04-25T11:20:00Z",
            "updatedBy": "salesrep",
            "updatedAt": "2023-04-25T11:20:00Z",
            "isActive": true,
            "photos": [
                {
                    "photoId": "photo7",
                    "vehicle": "4",
                    "photoUrl": "https://images.unsplash.com/photo-1600346021191-5b0b0318a69b?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 1,
                    "description": "Side view of the pickup truck"
                },
                {
                    "photoId": "photo8",
                    "vehicle": "4",
                    "photoUrl": "https://images.unsplash.com/photo-1589571894960-20bbe2828b77?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 2,
                    "description": "Rear cargo area of the pickup"
                }
            ]
        },
        {
            "vehicleId": "5",
            "type": "Convertible",
            "useOfVehicle": "Personal",
            "derivative": "Luxury",
            "registrationDate": "2021-06-18",
            "kilometers": 30000,
            "description": "Stylish convertible perfect for scenic drives and summer cruising",
            "ecoLabel": "B",
            "numberOfDoors": 2,
            "transmissionType": "Automatic",
            "fuelIcon": "gasoline",
            "visitCounter": 89,
            "dealerLink": "https://dealer.example.com/vehicle/5",
            "year": 2021,
            "price": 33000,
            "supplierWebsiteUrl": "https://supplier.example.com",
            "supplierInternalCode": "CONV-2021-005",
            "createdBy": "dealeradmin",
            "createdAt": "2021-06-01T08:45:00Z",
            "updatedBy": "dealeradmin",
            "updatedAt": "2021-06-01T08:45:00Z",
            "isActive": true,
            "photos": [
                {
                    "photoId": "photo9",
                    "vehicle": "5",
                    "photoUrl": "https://images.unsplash.com/photo-1563720227540-6a876f75d61c?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 1,
                    "description": "Convertible with top down"
                },
                {
                    "photoId": "photo10",
                    "vehicle": "5",
                    "photoUrl": "https://images.unsplash.com/photo-1563720227936-91e0a0f61b52?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 2,
                    "description": "Interior view of convertible"
                }
            ]
        },
        {
            "vehicleId": "6",
            "type": "Van",
            "useOfVehicle": "Commercial",
            "derivative": "Cargo",
            "registrationDate": "2021-11-20",
            "kilometers": 65000,
            "description": "Spacious cargo van perfect for deliveries and transportation services",
            "ecoLabel": "C",
            "numberOfDoors": 4,
            "transmissionType": "Manual",
            "fuelIcon": "diesel",
            "visitCounter": 12,
            "dealerLink": "https://dealer.example.com/vehicle/6",
            "year": 2021,
            "price": 25000,
            "supplierWebsiteUrl": "https://supplier.example.com",
            "supplierInternalCode": "VAN-2021-006",
            "createdBy": "logistics",
            "createdAt": "2021-11-15T13:10:00Z",
            "updatedBy": "logistics",
            "updatedAt": "2021-11-15T13:10:00Z",
            "isActive": true,
            "photos": [
                {
                    "photoId": "photo11",
                    "vehicle": "6",
                    "photoUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 1,
                    "description": "Cargo van exterior"
                },
                {
                    "photoId": "photo12",
                    "vehicle": "6",
                    "photoUrl": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 2,
                    "description": "Van cargo compartment"
                }
            ]
        },
        {
            "vehicleId": "7",
            "type": "Coupe",
            "useOfVehicle": "Personal",
            "derivative": "Luxury",
            "registrationDate": "2024-01-08",
            "kilometers": 2500,
            "description": "Elegant two-door coupe with sophisticated styling and premium amenities",
            "ecoLabel": "B",
            "numberOfDoors": 2,
            "transmissionType": "Automatic",
            "fuelIcon": "gasoline",
            "visitCounter": 67,
            "dealerLink": "https://dealer.example.com/vehicle/7",
            "year": 2024,
            "price": 52000,
            "supplierWebsiteUrl": "https://supplier.example.com",
            "supplierInternalCode": "CPE-2024-007",
            "createdBy": "admin",
            "createdAt": "2024-01-03T08:30:00Z",
            "updatedBy": "admin",
            "updatedAt": "2024-01-03T08:30:00Z",
            "isActive": true,
            "photos": [
                {
                    "photoId": "photo13",
                    "vehicle": "7",
                    "photoUrl": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 1,
                    "description": "Coupe front angle view"
                },
                {
                    "photoId": "photo14",
                    "vehicle": "7",
                    "photoUrl": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 2,
                    "description": "Coupe interior dashboard"
                }
            ]
        },
        {
            "vehicleId": "8",
            "type": "Hybrid",
            "useOfVehicle": "Personal",
            "derivative": "Eco Plus",
            "registrationDate": "2023-09-14",
            "kilometers": 12000,
            "description": "Fuel-efficient hybrid with cutting-edge technology and eco-friendly features",
            "ecoLabel": "ECO",
            "numberOfDoors": 4,
            "transmissionType": "CVT",
            "fuelIcon": "hybrid",
            "visitCounter": 156,
            "dealerLink": "https://dealer.example.com/vehicle/8",
            "year": 2023,
            "price": 29000,
            "supplierWebsiteUrl": "https://supplier.example.com",
            "supplierInternalCode": "HYB-2023-008",
            "createdBy": "eco_specialist",
            "createdAt": "2023-09-09T15:25:00Z",
            "updatedBy": "eco_specialist",
            "updatedAt": "2023-09-09T15:25:00Z",
            "isActive": true,
            "photos": [
                {
                    "photoId": "photo15",
                    "vehicle": "8",
                    "photoUrl": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 1,
                    "description": "Hybrid vehicle profile"
                },
                {
                    "photoId": "photo16",
                    "vehicle": "8",
                    "photoUrl": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 2,
                    "description": "Hybrid dashboard display"
                }
            ]
        },
        {
            "vehicleId": "9",
            "type": "SUV",
            "useOfVehicle": "Business",
            "derivative": "Executive",
            "registrationDate": "2022-07-03",
            "kilometers": 38000,
            "description": "Premium executive SUV with all-wheel drive and luxury appointments",
            "ecoLabel": "B",
            "numberOfDoors": 5,
            "transmissionType": "Automatic",
            "fuelIcon": "gasoline",
            "visitCounter": 98,
            "dealerLink": "https://dealer.example.com/vehicle/9",
            "year": 2022,
            "price": 48000,
            "supplierWebsiteUrl": "https://supplier.example.com",
            "supplierInternalCode": "SUV-2022-009",
            "createdBy": "executive_sales",
            "createdAt": "2022-06-28T12:40:00Z",
            "updatedBy": "executive_sales",
            "updatedAt": "2022-06-28T12:40:00Z",
            "isActive": true,
            "photos": [
                {
                    "photoId": "photo17",
                    "vehicle": "9",
                    "photoUrl": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 1,
                    "description": "Executive SUV front view"
                },
                {
                    "photoId": "photo18",
                    "vehicle": "9",
                    "photoUrl": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 2,
                    "description": "Luxury SUV interior"
                }
            ]
        },
        {
            "vehicleId": "10",
            "type": "Electric",
            "useOfVehicle": "Personal",
            "derivative": "Innovation",
            "registrationDate": "2024-03-22",
            "kilometers": 1200,
            "description": "Zero-emission electric vehicle with autonomous driving capabilities",
            "ecoLabel": "B",
            "numberOfDoors": 4,
            "transmissionType": "Single Speed",
            "fuelIcon": "electric",
            "visitCounter": 203,
            "dealerLink": "https://dealer.example.com/vehicle/10",
            "year": 2024,
            "price": 55000,
            "supplierWebsiteUrl": "https://supplier.example.com",
            "supplierInternalCode": "EV-2024-010",
            "createdBy": "tech_team",
            "createdAt": "2024-03-17T10:15:00Z",
            "updatedBy": "tech_team",
            "updatedAt": "2024-03-17T10:15:00Z",
            "isActive": true,
            "photos": [
                {
                    "photoId": "photo19",
                    "vehicle": "10",
                    "photoUrl": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 1,
                    "description": "Electric vehicle charging"
                },
                {
                    "photoId": "photo20",
                    "vehicle": "10",
                    "photoUrl": "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 2,
                    "description": "EV digital dashboard"
                }
            ]
        },
        {
            "vehicleId": "11",
            "type": "Wagon",
            "useOfVehicle": "Personal",
            "derivative": "Family",
            "registrationDate": "2023-04-18",
            "kilometers": 18500,
            "description": "Family-friendly station wagon with ample cargo space and safety features",
            "ecoLabel": "C",
            "numberOfDoors": 5,
            "transmissionType": "Automatic",
            "fuelIcon": "gasoline",
            "visitCounter": 41,
            "dealerLink": "https://dealer.example.com/vehicle/11",
            "year": 2023,
            "price": 31000,
            "supplierWebsiteUrl": "https://supplier.example.com",
            "supplierInternalCode": "WAG-2023-011",
            "createdBy": "family_sales",
            "createdAt": "2023-04-13T14:20:00Z",
            "updatedBy": "family_sales",
            "updatedAt": "2023-04-13T14:20:00Z",
            "isActive": true,
            "photos": [
                {
                    "photoId": "photo21",
                    "vehicle": "11",
                    "photoUrl": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 1,
                    "description": "Station wagon profile"
                },
                {
                    "photoId": "photo22",
                    "vehicle": "11",
                    "photoUrl": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 2,
                    "description": "Wagon cargo area"
                }
            ]
        },
        {
            "vehicleId": "12",
            "type": "Crossover",
            "useOfVehicle": "Personal",
            "derivative": "Adventure",
            "registrationDate": "2023-11-07",
            "kilometers": 9200,
            "description": "Versatile crossover SUV perfect for urban commuting and weekend adventures",
            "ecoLabel": "ECO",
            "numberOfDoors": 5,
            "transmissionType": "CVT",
            "fuelIcon": "gasoline",
            "visitCounter": 76,
            "dealerLink": "https://dealer.example.com/vehicle/12",
            "year": 2023,
            "price": 27500,
            "supplierWebsiteUrl": "https://supplier.example.com",
            "supplierInternalCode": "CRO-2023-012",
            "createdBy": "adventure_sales",
            "createdAt": "2023-11-02T11:30:00Z",
            "updatedBy": "adventure_sales",
            "updatedAt": "2023-11-02T11:30:00Z",
            "isActive": true,
            "photos": [
                {
                    "photoId": "photo23",
                    "vehicle": "12",
                    "photoUrl": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 1,
                    "description": "Crossover on mountain road"
                },
                {
                    "photoId": "photo24",
                    "vehicle": "12",
                    "photoUrl": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 2,
                    "description": "Crossover interior tech"
                }
            ]
        },
        {
            "vehicleId": "13",
            "type": "Sedan",
            "useOfVehicle": "Business",
            "derivative": "Compact",
            "registrationDate": "2021-12-15",
            "kilometers": 52000,
            "description": "Reliable compact sedan ideal for business use with excellent fuel economy",
            "ecoLabel": "A+",
            "numberOfDoors": 4,
            "transmissionType": "Manual",
            "fuelIcon": "gasoline",
            "visitCounter": 29,
            "dealerLink": "https://dealer.example.com/vehicle/13",
            "year": 2021,
            "price": 19500,
            "supplierWebsiteUrl": "https://supplier.example.com",
            "supplierInternalCode": "SED-2021-013",
            "createdBy": "fleet_sales",
            "createdAt": "2021-12-10T09:45:00Z",
            "updatedBy": "fleet_sales",
            "updatedAt": "2021-12-10T09:45:00Z",
            "isActive": true,
            "photos": [
                {
                    "photoId": "photo25",
                    "vehicle": "13",
                    "photoUrl": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 1,
                    "description": "Compact sedan exterior"
                },
                {
                    "photoId": "photo26",
                    "vehicle": "13",
                    "photoUrl": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 2,
                    "description": "Business sedan interior"
                }
            ]
        },
        {
            "vehicleId": "14",
            "type": "Motorcycle",
            "useOfVehicle": "Personal",
            "derivative": "Sport",
            "registrationDate": "2023-08-01",
            "kilometers": 4500,
            "description": "High-performance motorcycle with advanced suspension and aerodynamics",
            "ecoLabel": "O",
            "numberOfDoors": 0,
            "transmissionType": "Manual",
            "fuelIcon": "gasoline",
            "visitCounter": 134,
            "dealerLink": "https://dealer.example.com/vehicle/14",
            "year": 2023,
            "price": 15000,
            "supplierWebsiteUrl": "https://supplier.example.com",
            "supplierInternalCode": "MOTO-2023-014",
            "createdBy": "bike_specialist",
            "createdAt": "2023-07-27T16:50:00Z",
            "updatedBy": "bike_specialist",
            "updatedAt": "2023-07-27T16:50:00Z",
            "isActive": true,
            "photos": [
                {
                    "photoId": "photo27",
                    "vehicle": "14",
                    "photoUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 1,
                    "description": "Sport motorcycle side view"
                },
                {
                    "photoId": "photo28",
                    "vehicle": "14",
                    "photoUrl": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 2,
                    "description": "Motorcycle dashboard and controls"
                }
            ]
        },
        {
            "vehicleId": "15",
            "type": "Minivan",
            "useOfVehicle": "Personal",
            "derivative": "Family Plus",
            "registrationDate": "2022-10-05",
            "kilometers": 35000,
            "description": "Spacious minivan with 8-passenger seating and entertainment system",
            "ecoLabel": "B-",
            "numberOfDoors": 5,
            "transmissionType": "Automatic",
            "fuelIcon": "gasoline",
            "visitCounter": 53,
            "dealerLink": "https://dealer.example.com/vehicle/15",
            "year": 2022,
            "price": 34000,
            "supplierWebsiteUrl": "https://supplier.example.com",
            "supplierInternalCode": "MV-2022-015",
            "createdBy": "family_sales",
            "createdAt": "2022-09-30T12:15:00Z",
            "updatedBy": "family_sales",
            "updatedAt": "2022-09-30T12:15:00Z",
            "isActive": true,
            "photos": [
                {
                    "photoId": "photo29",
                    "vehicle": "15",
                    "photoUrl": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 1,
                    "description": "Minivan exterior view"
                },
                {
                    "photoId": "photo30",
                    "vehicle": "15",
                    "photoUrl": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80",
                    "ordering": 2,
                    "description": "Minivan interior seating"
                }
            ]
        }
        
        
    ];

    constructor(private http: HttpClient) {}

    getVehicles(): Observable<Vehicle[]> {
        // Return mock data instead of HTTP call
        return of(this.mockVehicles);
        
        // Uncomment below line when backend is working
        // return this.http.get<Vehicle[]>(`${this.apiUrl}/v1/vehicles`);
    }

    getVehicleById(id: string): Observable<Vehicle> {
        // // Return mock data for specific vehicle
        // const vehicle = this.mockVehicles.find(v => v.vehicleId === id);
        // if (vehicle) {
        //     return of(vehicle);
        // }
        
        // // Return first vehicle as fallback
        // return of(this.mockVehicles[0]);
        
        // Uncomment below line when backend is working
        return this.http.get<Vehicle>(`${this.apiUrl}/v1/vehicles/${id}`);
    }
}

export interface Photo {
    photoId: string;
    vehicle: string;
    photoUrl: string;
    ordering: number;
    description: string;
}

export interface Vehicle {
    vehicleId: string;
    type: string;
    useOfVehicle: string;
    derivative: string;
    registrationDate: string;
    kilometers: number;
    description: string;
    ecoLabel: string;
    numberOfDoors: number;
    transmissionType: string;
    fuelIcon: string;
    visitCounter: number;
    dealerLink: string;
    year: number;
    price: number;
    supplierWebsiteUrl: string;
    supplierInternalCode: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    isActive: boolean;
    photos: Photo[];
}

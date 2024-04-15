from pydantic import BaseModel

class wastePrediction(BaseModel):
    numberOfGuests: float
    quantityOfFood: float
    typeOfFoodBakedGoods: float
    typeOfFoodDairyProducts: float
    typeOfFoodFruits: float
    typeOfFoodMeat: float
    typeOfFoodVegetables: float
    eventTypeBirthday: float
    eventTypeCorporate: float
    eventTypeSocialGathering: float
    eventTypeWedding: float
    storageConditionsRefrigerated: float
    storageConditionsRoomTemperature: float
    purchaseHistoryOccasional: float
    purchaseHistoryRegular: float
    seasonalityAllSeasons: float
    seasonalitySummer: float
    seasonalityWinter: float
    preparationMethodBuffet: float
    preparationMethodFingerFood: float
    preparationMethodSitDownDinner: float
    geographicalLocationRural: float
    geographicalLocationSubUrban: float
    geographicalLocationUrban: float
    pricingHigh: float
    pricingLow: float
    pricingModerate: float
    

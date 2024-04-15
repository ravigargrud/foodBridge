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
    
class foodBankModel(BaseModel):
    id: int
    bankName: str
    email: str
    password: str
    pincode: int
    area: str
    restaurantsAccepted: str
    restaurantsPending: str

class restaurantModel(BaseModel):
    id: int
    restaurantName: str
    email: str
    password: str
    pincode: int
    area: str
    foodBankAccepted: str
    foodBankPending: str
    foodItems: str

class foodItemModel(BaseModel):
    id: int
    itemName: str
    quantity: int
    expiryDate: str
    price: float
    restaurantId: int
    restaurant: str

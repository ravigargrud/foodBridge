from fastapi import APIRouter
from datamodel import wastePrediction
import pickle


router =  APIRouter()

pickle_in = open("./model.pkl", "rb")
model = pickle.load(pickle_in)

@router.post("/predict", tags=["Machine Learning"])
def predict(data: wastePrediction):
    data = data.model_dump()

    numberOfGuests= data["numberOfGuests"]
    quantityOfFood= data["quantityOfFood"]
    typeOfFoodBakedGoods= data["typeOfFoodBakedGoods"]
    typeOfFoodDairyProducts= data["typeOfFoodDairyProducts"]
    typeOfFoodFruits= data["typeOfFoodFruits"]
    typeOfFoodMeat= data["typeOfFoodMeat"]
    typeOfFoodVegetables= data["typeOfFoodVegetables"]
    eventTypeBirthday= data["eventTypeBirthday"]
    eventTypeCorporate= data["eventTypeCorporate"]
    eventTypeSocialGathering= data["eventTypeSocialGathering"]
    eventTypeWedding= data["eventTypeWedding"]
    storageConditionsRefrigerated= data["storageConditionsRefrigerated"]
    storageConditionsRoomTemperature= data["storageConditionsRoomTemperature"]
    purchaseHistoryOccasional= data["purchaseHistoryOccasional"]
    purchaseHistoryRegular= data["purchaseHistoryRegular"]
    seasonalityAllSeasons= data["seasonalityAllSeasons"]
    seasonalitySummer= data["seasonalitySummer"]
    seasonalityWinter= data["seasonalityWinter"]
    preparationMethodBuffet= data["preparationMethodBuffet"]
    preparationMethodFingerFood= data["preparationMethodFingerFood"]
    preparationMethodSitDownDinner= data["preparationMethodSitDownDinner"]
    geographicalLocationRural= data["geographicalLocationRural"]
    geographicalLocationSubUrban= data["geographicalLocationSubUrban"]
    geographicalLocationUrban= data["geographicalLocationUrban"]
    pricingHigh= data["pricingHigh"]
    pricingLow= data["pricingLow"]
    pricingModerate= data["pricingModerate"]
    
    prediction = model.predict([[numberOfGuests, 
                                 quantityOfFood,
                                 typeOfFoodBakedGoods,
                                 typeOfFoodDairyProducts,
                                 typeOfFoodFruits,
                                 typeOfFoodMeat,
                                 typeOfFoodVegetables,
                                 eventTypeBirthday,
                                 eventTypeCorporate,
                                 eventTypeSocialGathering,
                                 eventTypeWedding,
                                 storageConditionsRefrigerated,
                                 storageConditionsRoomTemperature,
                                 purchaseHistoryOccasional,
                                 purchaseHistoryRegular,
                                 seasonalityAllSeasons,
                                 seasonalitySummer,
                                 seasonalityWinter,
                                 preparationMethodBuffet,
                                 preparationMethodFingerFood,
                                 preparationMethodSitDownDinner,
                                 geographicalLocationRural,
                                 geographicalLocationSubUrban,
                                 geographicalLocationUrban,
                                 pricingHigh,
                                 pricingLow,
                                 pricingModerate
                                 ]])
    return {
        "prediction": prediction[0]
    }

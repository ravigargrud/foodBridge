from fastapi import APIRouter, Depends
from datamodel import restaurantModel
from databaseConnection import SessionLocal
from sqlalchemy.orm import Session
from databaseSchema import restaurantSchema

router = APIRouter(
    prefix="/restaurant",
    tags=["Restaurant"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
async def create_restaurant(restaurant: restaurantModel, db: Session = Depends(get_db)):
    new_restaurant = restaurantSchema(id=restaurant.id, restaurantName=restaurant.restaurantName, email=restaurant.email, password=restaurant.password, pincode=restaurant.pincode, area=restaurant.area, predictedWaste=restaurant.predictedWaste, currentWaste=restaurant.currentWaste ,foodBankAccepted=restaurant.foodBankAccepted, foodBankPending=restaurant.foodBankPending, foodItems=restaurant.foodItems)
    db.add(new_restaurant)
    db.commit()
    db.refresh(new_restaurant)
    return new_restaurant

@router.put("/update")
async def update_restaurant(restaurant: restaurantModel, db: Session = Depends(get_db)):
    #if user exists then update else return invalid user
    if db.query(restaurantSchema).filter(restaurantSchema.id == restaurant.id).first() == None:
        return "Invalid user"
    db.query(restaurantSchema).filter(restaurantSchema.id == restaurant.id).update({restaurantSchema.restaurantName: restaurant.restaurantName, restaurantSchema.email: restaurant.email, restaurantSchema.password: restaurant.password, restaurantSchema.pincode: restaurant.pincode, restaurantSchema.area: restaurant.area, restaurantSchema.predictedWaste: restaurant.predictedWaste, restaurantSchema.currentWaste: restaurant.currentWaste , restaurantSchema.foodBankAccepted: restaurant.foodBankAccepted, restaurantSchema.foodBankPending: restaurant.foodBankPending, restaurantSchema.foodItems: restaurant.foodItems})
    db.commit()
    return restaurant

@router.delete("/delete/{id}")
async def delete_restaurant(id:int, db: Session = Depends(get_db)):
    db.query(restaurantSchema).filter(restaurantSchema.id ==id).delete()
    db.commit()
    return "Successfully deleted restaurant with id: " + str(id)

@router.get("/get")
async def get_restaurants(db: Session = Depends(get_db)):
    return db.query(restaurantSchema).all()

@router.get("/get/{email}")
async def get_restaurant(email:str, db: Session = Depends(get_db)):
    if db.query(restaurantSchema).filter(restaurantSchema.email == email).first() == None:
        return "Invalid user"
    return db.query(restaurantSchema).filter(restaurantSchema.email == email).first()


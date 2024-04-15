from fastapi import APIRouter, Depends
from datamodel import foodItemModel
from databaseConnection import SessionLocal
from sqlalchemy.orm import Session
from databaseSchema import foodItemSchema

router = APIRouter(
    prefix="/foodItem",
    tags=["Food Item"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
async def create_foodItem(foodItem: foodItemModel, db: Session = Depends(get_db)):
    new_foodItem = foodItemSchema(id=foodItem.id, itemName=foodItem.itemName, quantity=foodItem.quantity, expiryDate=foodItem.expiryDate, price=foodItem.price, restaurantId=foodItem.restaurantId, restaurant=foodItem.restaurant)
    db.add(new_foodItem)
    db.commit()
    db.refresh(new_foodItem)
    return new_foodItem

@router.put("/update")
async def update_foodItem(foodItem: foodItemModel, db: Session = Depends(get_db)):
    db.query(foodItemSchema).filter(foodItemSchema.id == foodItem.id).update({foodItemSchema.itemName: foodItem.itemName, foodItemSchema.quantity: foodItem.quantity, foodItemSchema.expiryDate: foodItem.expiryDate, foodItemSchema.price: foodItem.price, foodItemSchema.restaurantId: foodItem.restaurantId, foodItemSchema.restaurant: foodItem.restaurant})
    db.commit()
    return foodItem

@router.delete("/delete/{id}")
async def delete_foodItem(id: int, db: Session = Depends(get_db)):
    db.query(foodItemSchema).filter(foodItemSchema.id == id).delete()
    db.commit()
    return "Successfully deleted food item with id: " + str(id)

@router.get("/get")
async def get_foodItems(db: Session = Depends(get_db)):
    return db.query(foodItemSchema).all()

@router.get("/get/{id}")
async def get_foodItem(id: int, db: Session = Depends(get_db)):
    return db.query(foodItemSchema).filter(foodItemSchema.id == id).first()

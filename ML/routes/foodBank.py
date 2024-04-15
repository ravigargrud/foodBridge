from fastapi import APIRouter, Depends
from datamodel import foodBankModel
from databaseConnection import SessionLocal
from sqlalchemy.orm import Session
from databaseSchema import foodBankSchema

router = APIRouter(
    prefix="/foodBank",
    tags=["Food Bank"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
async def create_foodBank(foodBank: foodBankModel, db: Session = Depends(get_db)):
    new_foodBank = foodBankSchema(id=foodBank.id, bankName=foodBank.bankName, email=foodBank.email, password=foodBank.password, pincode=foodBank.pincode, area=foodBank.area, restaurantsAccepted=foodBank.restaurantsAccepted, restaurantsPending=foodBank.restaurantsPending)
    db.add(new_foodBank)
    db.commit()
    db.refresh(new_foodBank)
    return new_foodBank

@router.put("/update")
async def update_foodBank(foodBank: foodBankModel, db: Session = Depends(get_db)):
    db.query(foodBankSchema).filter(foodBankSchema.id == foodBank.id).update({foodBankSchema.bankName: foodBank.bankName, foodBankSchema.email: foodBank.email, foodBankSchema.password: foodBank.password, foodBankSchema.pincode: foodBank.pincode, foodBankSchema.area: foodBank.area, foodBankSchema.restaurantsAccepted: foodBank.restaurantsAccepted, foodBankSchema.restaurantsPending: foodBank.restaurantsPending})
    db.commit()
    return foodBank

@router.delete("/delete/{id}")
async def delete_foodBank(id: int, db: Session = Depends(get_db)):
    db.query(foodBankSchema).filter(foodBankSchema.id == id).delete()
    db.commit()
    return "Successfully deleted food bank with id: " + str(id)

@router.get("/get")
async def get_foodBanks(db: Session = Depends(get_db)):
    return db.query(foodBankSchema).all()

@router.get("/get/{id}")
async def get_foodBank(id: int, db: Session = Depends(get_db)):
    return db.query(foodBankSchema).filter(foodBankSchema.id == id).first()

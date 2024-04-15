from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from databaseConnection import Base

class foodBankSchema(Base):
    __tablename__ = "foodBank"

    id = Column(Integer, primary_key=True, index=True)
    bankName = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    pincode = Column(Integer)
    area = Column(String)
    restaurantsAccepted = Column(String)
    restaurantsPending = Column(String)

class restaurantSchema(Base):
    __tablename__ = "restaurant"

    id = Column(Integer, primary_key=True, index=True)
    restaurantName = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    pincode = Column(Integer)
    area = Column(String)
    predictedWaste = Column(Float)
    foodBankAccepted = Column(String)
    foodBankPending = Column(String)
    foodItems = Column(String)

class foodItemSchema(Base):
    __tablename__ = "foodItem"

    id = Column(Integer, primary_key=True, index=True)
    itemName = Column(String)
    quantity = Column(Integer)
    expiryDate = Column(String)
    price = Column(Float)
    restaurantId = Column(Integer)
    restaurant = Column(String)
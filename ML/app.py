from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from datamodel import wastePrediction
from routes.machineLearning import router as mlRoute
from routes.foodBank import router as foodBankRoute
from routes.restaurant import router as restaurantRoute
from routes.footItem import router as foodItemRoute
from databaseConnection import engine, Base, SessionLocal

app = FastAPI(
    title="FoodBridge",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine) # Create the tables in the database

app.include_router(mlRoute)
app.include_router(foodBankRoute)
app.include_router(restaurantRoute)
app.include_router(foodItemRoute)


#uvicorn app:app --reload
#fileName:applicationName
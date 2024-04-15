from fastapi import FastAPI
# from datamodel import wastePrediction
from routes.machineLearning import router as mlRoute

app = FastAPI(
    title="FoodBridge",
    version="1.0.0"
)

app.include_router(mlRoute)


#uvicorn app:app --reload
#fileName:applicationName
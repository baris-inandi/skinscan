from fastapi import FastAPI
import pickle

app = FastAPI()

pickled_model = pickle.load(open('model/model.pkl', 'rb'))

# sample response
{
    "results": {
        "Rosacea": 0.16,
        "Psoriasis": 0.23
    },
    "follow_through": {
        "Do you feel burning in the area?": 0,
        "Is the area itchy?": 1,
    }
}

# OR 

{
    "results": {
        "Rosacea": 0.73,
        "Psoriasis": 0.08
    }
}




@app.get("/")
async def root():
    return {"message": "Welcome to SkinScan"}


@app.get("/results")
async def results(image):
    
    return {
    "results": {
        "Rosacea": 0.16,
        "Psoriasis": 0.23
    },
    "follow_through": {
        "Do you feel burning in the area?": 0,
        "Is the area itchy?": 1,
    }
}

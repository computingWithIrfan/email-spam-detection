from fastapi import FastAPI
from app.schemas import TextRequest, PredictionResponse
from app.predictor import predict_spam
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Spam Detection API")

# 🔥 CORS middleware (THIS IS MUST)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:3000",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Spam Detection API is running"}

@app.post("/predict", response_model=PredictionResponse)
def predict(request: TextRequest):
    return predict_spam(request.text)

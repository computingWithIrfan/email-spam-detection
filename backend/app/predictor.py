from app.utils import transform_text
from app.model_loader import model, vectorizer

def predict_spam(text: str):
    # transform text
    transformed_text = transform_text(text)

    # vectorize
    vector_input = vectorizer.transform([transformed_text]).toarray()

    # prediction
    prediction = model.predict(vector_input)[0]
    probability = model.predict_proba(vector_input).max()

    result = "Spam" if prediction == 1 else "Not Spam"

    return {
        "prediction": result,
        "confidence": round(probability * 100, 2)
    }

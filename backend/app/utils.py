import nltk
import string
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

# Download once
nltk.download('punkt')
nltk.download('stopwords')

ps = PorterStemmer()

def transform_text(text):
    # 1️⃣ Convert text to lowercase
    text = text.lower()
    
    # 2️⃣ Tokenize text into words
    text = nltk.word_tokenize(text)
    
    y = []
    
    # 3️⃣ Keep only alphanumeric words (remove numbers, symbols)
    for i in text:
        if i.isalnum():
            y.append(i)
    
    text = y[:]
    y.clear()
    
    # 4️⃣ Remove stopwords and punctuation
    for i in text:
        if i not in stopwords.words('english') and i not in string.punctuation:
            y.append(i)
            
    text = y[:]
    y.clear()
    
    # 5️⃣ Apply stemming to reduce words to their root form
    for i in text:
        y.append(ps.stem(i))
    
    # 6️⃣ Join the processed words back into a single string
    return " ".join(y)

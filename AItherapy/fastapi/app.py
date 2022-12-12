# 1. Library imports
import uvicorn
from fastapi import FastAPI
from mentalhealth import mentalhealth
import numpy as np
import pickle
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from fastapi.middleware.cors import CORSMiddleware
# 2. Create the app object
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
pickle_in = open("classifier.pkl","rb")
classifier=pickle.load(pickle_in)

# 3. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
def index():
    return {'message': 'Hello, World'}

# 4. Route with a single parameter, returns the parameter within a message
#    Located at: http://127.0.0.1:8000/AnyNameHere
@app.get('/{name}')
def get_name(name: str):
    return {'Welcome To Fast API': f'{name}'}

# 3. Expose the prediction functionality, make a prediction from the passed
#    JSON data and return the predicted Bank Note with the confidence
@app.post('/predict')
def predict_health(data:mentalhealth):
    print(data)
    data = data.dict()
    # print(data)
    Q1A=int(data['Q1A'])
    Q2A=int(data['Q2A'])
    Q3A=int(data['Q3A'])
    Q4A=int(data['Q4A'])
    Q5A=int(data['Q5A'])
    Q6A=int(data['Q6A'])
    Q7A=int(data['Q7A'])
    Q8A=int(data['Q8A'])
    Q9A=int(data['Q9A'])
    Q10A=int(data['Q10A'])
    Q11A=int(data['Q11A'])
    Q12A=int(data['Q12A'])
    Q13A=int(data['Q13A'])
    Q14A=int(data['Q14A'])
    Q15A=int(data['Q15A'])
    Q16A=int(data['Q16A'])
    Q17A=int(data['Q17A'])
    Q18A=int(data['Q18A'])
    Q19A=int(data['Q19A'])
    Q20A=int(data['Q20A'])
    Q21A=int(data['Q21A'])
    Q22A=int(data['Q22A'])
    Q23A=int(data['Q23A'])
    Q24A=int(data['Q24A'])
    Q25A=int(data['Q25A'])
    Q26A=int(data['Q26A'])
    Q27A=int(data['Q27A'])
    Q28A=int(data['Q28A'])
    Q29A=int(data['Q29A'])
    Q30A=int(data['Q30A'])
    Q31A=int(data['Q31A'])
    Q32A=int(data['Q32A'])
    Q33A=int(data['Q33A'])
    Q34A=int(data['Q34A'])
    Q35A=int(data['Q35A'])
    Q36A=int(data['Q36A'])
    Q37A=int(data['Q37A'])
    Q38A=int(data['Q38A'])
    Q39A=int(data['Q39A'])
    Q40A=int(data['Q40A'])
    Q41A=int(data['Q41A'])
    Q42A=int(data['Q42A'])
    TIPI1=int(data['TIPI1'])
    TIPI2=int(data['TIPI2'])
    TIPI3=int(data['TIPI3'])
    TIPI4=int(data['TIPI4'])
    TIPI5=int(data['TIPI5'])
    TIPI6=int(data['TIPI6'])
    TIPI7=int(data['TIPI7'])
    TIPI8=int(data['TIPI8'])
    TIPI9=int(data['TIPI9'])
    TIPI10=int(data['TIPI10'])
    education=int(data['education'])
    urban=int(data['urban'])
    gender=int(data['gender'])
    age=int(data['age'])
    religion=int(data['religion'])
    race=int(data['race'])
    married=int(data['married'])
    familysize=int(data['familysize'])
   #print(classifier.predict([[variance,skewness,curtosis,entropy]]))
    d = pd.read_csv('preprocessed.csv')
    g = pd.read_csv('target.csv')
    d=d.drop('Unnamed: 0',axis=1)
    x_train, x_test, y_train, y_test = train_test_split(d, g.target, test_size=.2)
    scaler = MinMaxScaler()
    x_train_scaled = scaler.fit_transform(x_train)
    
    t=[Q1A, Q2A, Q3A, Q4A, Q5A, Q6A, Q7A, Q8A, Q9A, Q10A,
       Q11A, Q12A, Q13A, Q14A, Q15A, Q16A, Q17A, Q18A, Q19A,
       Q20A, Q21A, Q22A, Q23A, Q24A, Q25A, Q26A, Q27A, Q28A,
       Q29A, Q30A, Q31A, Q32A, Q33A, Q34A, Q35A, Q36A, Q37A,
       Q38A, Q39A, Q40A, Q41A, Q42A, TIPI1, TIPI2, TIPI3,
       TIPI4, TIPI5, TIPI6, TIPI7, TIPI8, TIPI9, TIPI10,
       education, urban, gender, age, religion, race, married,
       familysize]
    x_test_scaled = scaler.transform([t])
    prediction = classifier.predict(x_test_scaled)
    # print(prediction[0])
    # if(prediction[0]>0.5):
    #     prediction="Fake note"
    # else:
    #     prediction="Its a Bank note"
    return {
        'prediction': prediction[0]
    }

# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
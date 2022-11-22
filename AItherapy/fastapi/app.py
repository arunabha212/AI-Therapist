# 1. Library imports
import uvicorn
from fastapi import FastAPI
from mentalhealth import mentalhealth
import numpy as np
import pickle
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
# 2. Create the app object
app = FastAPI()
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
    data = data.dict()
    Q1A=data['Q1A']
    Q2A=data['Q2A']
    Q3A=data['Q3A']
    Q4A=data['Q4A']
    Q5A=data['Q5A']
    Q6A=data['Q6A']
    Q7A=data['Q7A']
    Q8A=data['Q8A']
    Q9A=data['Q9A']
    Q10A=data['Q10A']
    Q11A=data['Q11A']
    Q12A=data['Q12A']
    Q13A=data['Q13A']
    Q14A=data['Q14A']
    Q15A=data['Q15A']
    Q16A=data['Q16A']
    Q17A=data['Q17A']
    Q18A=data['Q18A']
    Q19A=data['Q19A']
    Q20A=data['Q20A']
    Q21A=data['Q21A']
    Q22A=data['Q22A']
    Q23A=data['Q23A']
    Q24A=data['Q24A']
    Q25A=data['Q25A']
    Q26A=data['Q26A']
    Q27A=data['Q27A']
    Q28A=data['Q28A']
    Q29A=data['Q29A']
    Q30A=data['Q30A']
    Q31A=data['Q31A']
    Q32A=data['Q32A']
    Q33A=data['Q33A']
    Q34A=data['Q34A']
    Q35A=data['Q35A']
    Q36A=data['Q36A']
    Q37A=data['Q37A']
    Q38A=data['Q38A']
    Q39A=data['Q39A']
    Q40A=data['Q40A']
    Q41A=data['Q41A']
    Q42A=data['Q42A']
    TIPI1=data['TIPI1']
    TIPI2=data['TIPI2']
    TIPI3=data['TIPI3']
    TIPI4=data['TIPI4']
    TIPI5=data['TIPI5']
    TIPI6=data['TIPI6']
    TIPI7=data['TIPI7']
    TIPI8=data['TIPI8']
    TIPI9=data['TIPI9']
    TIPI10=data['TIPI10']
    education=data['education']
    urban=data['urban']
    gender=data['gender']
    age=data['age']
    religion=data['religion']
    race=data['race']
    married=data['married']
    familysize=data['familysize']
   # print(classifier.predict([[variance,skewness,curtosis,entropy]]))
    scaler = MinMaxScaler()
    prediction = classifier.predict(scaler.transform([[Q1A, Q2A, Q3A, Q4A, Q5A, Q6A, Q7A, Q8A, Q9A, Q10A,
       Q11A, Q12A, Q13A, Q14A, Q15A, Q16A, Q17A, Q18A, Q19A,
       Q20A, Q21A, Q22A, Q23A, Q24A, Q25A, Q26A, Q27A, Q28A,
       Q29A, Q30A, Q31A, Q32A, Q33A, Q34A, Q35A, Q36A, Q37A,
       Q38A, Q39A, Q40A, Q41A, Q42A, TIPI1, TIPI2, TIPI3,
       TIPI4, TIPI5, TIPI6, TIPI7, TIPI8, TIPI9, TIPI10,
       education, urban, gender, age, religion, race, married,
       familysize]]))
    # if(prediction[0]>0.5):
    #     prediction="Fake note"
    # else:
    #     prediction="Its a Bank note"
    return {
        'prediction': prediction
    }

# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
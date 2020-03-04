from utils import load_data, train_model, save_model
import datetime

data = load_data()
trained = train_model(data)

model_name = "../saved_models/model_v1.sav"
save_model(trained, model_name)

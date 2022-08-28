import cv2
import numpy as np
from tensorflow.keras.models import Model, load_model
import time
import mysql.connector
import json
import base64
import random
import string
import os
db = mysql.connector.connect(
  host="clark.skyfallen.org",
  user="skinscan",
  password="]hf[557PHi-6avbh",
  database="skinscan"
)
letters = string.ascii_lowercase
model = load_model("skinscan.h5")
while True:
    cursor = db.cursor()
    cursor.execute("SELECT * FROM scans WHERE scan_status='%s'" % "pending")
    result = cursor.fetchall()
    if(len(result) != 0):
        for res in result:
            filename = ''.join(random.choice(letters) for i in range(30))
            filename = filename + ".jpg"

            with open("./input/" + filename, "wb") as fh:
                fh.write(base64.decodebytes(str.encode(res[2])))

            frame = cv2.imread("./input/"+filename)
            frame = cv2.resize(frame, (224,224))
            frame = frame.reshape(1,224,224,3)
            label_names = ["healthy","eczema","gangrene"]
            pred = model.predict(frame)
            disease_code = np.argmax(pred[0])
            disease_label = label_names[disease_code]
            prob = np.max(pred[0])
            probdict = {
                "healthy": float(pred[0][0]),
                "eczema": float(pred[0][1]),
                "gangrene": float(pred[0][2]),
            }
            jsonprob = json.dumps(probdict)
            cursor.execute('UPDATE scans SET file="removed" WHERE id={id}'.format(id=res[0]))
            db.commit()
            cursor.execute('UPDATE scans SET probabilities=%s WHERE id=%s',(jsonprob,res[0]))
            db.commit()
            cursor.execute('UPDATE scans SET scan_status="completed" WHERE id={id}'.format(id=res[0]))
            db.commit()
            os.remove("./input/"+filename)
    db.commit()
    cursor.close()
    time.sleep(1)

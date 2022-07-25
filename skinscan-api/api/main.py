from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from pydantic import BaseModel

class Scan(BaseModel):
    file: bytes
    token: str

import firebase_admin
from firebase_admin import credentials, auth
credentialData = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(credentialData)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import mysql.connector

db = mysql.connector.connect(
  host="clark.skyfallen.org",
  user="skinscan",
  password="]hf[557PHi-6avbh",
  database="skinscan"
)


@app.post("/upload")
async def upload_scan(scan: Scan, request: Request):
    cursor = db.cursor()

    decoded_token = auth.verify_id_token(scan.token)
    userid = decoded_token['uid']

    cursor.execute("INSERT INTO scans (owner_id,file,scan_status) VALUES (%s,%s,%s)", (userid,scan.file,"pending"))
    db.commit()
    cursor.close()
    return {"status": "pending", "scanid": cursor.lastrowid}

@app.get("/status/{id}")
async def get_scan(id, token: str, request: Request):
    cursor = db.cursor()

    decoded_token = auth.verify_id_token(token)
    userid = decoded_token['uid']
    cursor.execute("SELECT * FROM scans WHERE id=%s AND owner_id=%s", (id, userid))
    result = cursor.fetchall()
    if(len(result) != 1):
        raise HTTPException(status_code=404, detail="Scan not found")
    data = {}
    if(result[0][4] != None):
        data = json.loads(result[0][4])
    cursor.close()
    return {"status": result[0][3], "data": data}
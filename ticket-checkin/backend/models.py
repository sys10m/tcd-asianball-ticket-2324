from flask import current_app, jsonify
import datetime

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("./path_to_serviceAccountKey/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def validate_login(username, password):
    user_ref = db.collection("users").document(username)
    user = user_ref.get()
    if not user.exists or user.to_dict()['password'] != password:
        return False
    else:
        return True

def getTicketDetails(ticket_id):
    client_ref = db.collection("tickets").document(ticket_id)
    client = client_ref.get()
    if client.exists:
        return client.to_dict()
    else:
        return None
    

def checkInTicket(ticket_id):
    try:
        db.collection("tickets").document(ticket_id).update({
            "checked": True,
            "timestamp": datetime.datetime.utcnow()
        })
    except:
        print("Exception occur")
        print("Check if ticket exists")
        return False
    return True

def getAllTickets():
    allTickets = db.collection("tickets").stream()
    
    def getDict(temp):
        return temp.to_dict()
    
    return list(map(getDict, allTickets))

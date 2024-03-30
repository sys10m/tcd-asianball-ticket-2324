import csv

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("./path_to_serviceAccountKey/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

"""
The csv file format
| wtv | email | Firstname | Surname | Code |
"""

with open('./path_to_file/theFile.csv', newline='') as guestlist:
    spamreader = csv.reader(guestlist)
    for row in spamreader:
        data = {
            "firstname": row[2],
            "surname": row[3],
            "email": row[1],
            "checked": False,
            "timestamp": None
        }
        db.collection("tickets").document(row[4]).set(data)

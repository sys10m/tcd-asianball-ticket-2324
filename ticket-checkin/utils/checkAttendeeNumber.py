import csv

import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1 import aggregation
from google.cloud.firestore_v1.base_query import FieldFilter


cred = credentials.Certificate("./path_to_serviceAccountKey/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

collection_ref = db.collection("tickets")
query = collection_ref.where(filter=FieldFilter("checked", "==", True))
aggregate_query = aggregation.AggregationQuery(query)

# `alias` to provides a key for accessing the aggregate query results
aggregate_query.count(alias="all")

results = aggregate_query.get()
for result in results:
    print(result[0].value)

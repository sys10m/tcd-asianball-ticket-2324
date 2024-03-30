# TAKEN FROM STACKOVERFLOW

import csv

import firebase_admin
from firebase_admin import credentials, firestore

def export_firestore_to_csv(cred_path, collection_path, output_file):
    """
    Export data from a specified Firestore collection to a CSV file.

    :param cred_path: Path to the Firebase credentials JSON file.
    :param collection_path: Path to the Firestore collection to export.
    :param output_file: Name of the output CSV file.
    """
    print("Data export starts")

    # Initialize Firestore with the provided credentials
    cred = credentials.Certificate(cred_path)
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)

    db = firestore.client()

    # Fetch data from Firestore
    docs = db.collection(collection_path).stream()

    # Identify all unique field names
    fieldnames = set()
    for doc in docs:
        fieldnames.update(doc.to_dict().keys())

    # Sort field names for consistent column order
    fieldnames = sorted(fieldnames)

    # Re-fetch documents for writing to CSV
    docs = db.collection(collection_path).stream()

    # Prepare CSV file
    with open(output_file, 'w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()

        for doc in docs:
            # Write document data to CSV
            writer.writerow(doc.to_dict())

    print("Data export complete.")

# Run function
export_firestore_to_csv('./path_to_serviceAccountKey/serviceAccountKey.json', 'tickets', 'attendance.csv')

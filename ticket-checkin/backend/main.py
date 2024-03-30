from flask import Flask, request, jsonify
from models import *

app = Flask(__name__)

@app.route('/ticketinfo/<string:ticket_id>', methods=['GET'])
def getTicket(ticket_id):
    ticketDetails = getTicketDetails(ticket_id)
    if ticketDetails:
        return {
            "message": "Ticket information successfully retrieved",
            "data": ticketDetails,
            "error": None
        }, 200
    else:
        return {
            "message": "Ticket not found",
            "data": None,
            "error": None
        }, 404

@app.route('/check-in/<string:ticket_id>', methods=['POST'])
def checkIn(ticket_id):
    success = checkInTicket(ticket_id)
    if success:
        return {
            "message": "Checked the ticket in",
            "data": ticket_id,
            "error": None
        }, 201
    else:
        return {
            "message": "Fail to check the ticket",
            "data": None,
            "error": "Unidentifiable"
        }, 500
    
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="8081")

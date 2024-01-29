import smtplib, email, ssl, os
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.utils import make_msgid
from email.utils import formatdate

import json

from flask import flask
from flask_restful import Resource, Api

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from ticket_gen import generateTicket

with open('email_auth.json') as json_file:
    email_auth = json.load(json_file)

cred = credentials.Certificate("./asianballticket-firebase-adminsdk-3xz8b-2e7a0f8cba.json")
firebase_admin.initialize_app(cred)

#email
mailSubject = "Your Asian Ball Ticket"
mailMessage = "Here is your asian ball ticket"

app = Flask(__name__)
api = Api(app)

class confirmPayment(Resource):
    def post(self):
        # FIXME:change confirm input to be the one given by the api
        confirmInput = ""
        doc_ref = db.collection("reservation").document(confirmInput)

        doc = doc_ref.get()
        if doc.exists:
            info = doc.to_dict()
            # FIXME: hash the right value
            ticketPath = "./ticket/asianBallTicket.png"
            generateTicket(info['name'], ticketPath).save(ticketPath, format="png")

            sendEmail(mailSubject, mailMessage, info['email'], email_auth['email'], ticketPath)
            
        else:
            # TODO: return no buyer

api.add_resource(confirmPayment, '/')


def sendEmail(subject, message, to_addr, from_addr, attachment):
    mail = MIMEMultipart()
    mail['Subject'] = subject
    mail['From'] = from_addr
    mail['To'] = to_addr
    mail.attach(MIMEText(message, "plain"))

    if attachment != None:
        with open(attachment, 'rb') as toAttach:
            part = MIMEImage(toAttach.read())
            part.add_header('Content-Disposition',
                'attachment; filename="%s"' % os.path.basename(attachment))
            mail.attach(part)

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(email_auth['email'], email_auth['password'])
    server.sendmail(from_addr, to_addr, mail.as_string())
    server.close()


# run app
if __name__ == '__main__':
    app.run(debug=True)

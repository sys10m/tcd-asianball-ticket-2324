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

from flask import Flask, request, jsonify
from flask_restful import Resource, Api

from barcode import EAN13
from barcode.writer import ImageWriter
from PIL import Image

with open('email_auth.json') as json_file:
    email_auth = json.load(json_file)

#email
mailSubject = "EMAIL SUBJECT"
mailMessage = "EMAIL CONTENT"

app = Flask(__name__)

@app.route("/post-ticket/", methods=["POST"])
def post():
    
    barcodeHash = request.args.get('h')
    email = request.args.get('e')
    name = request.args.get('n')

    print(barcodeHash + " " + email + " " + name )
    
    generateTicket(barcodeHash).save("./img/asianBallTicket.png", format="png")
    sendEmail(mailSubject, (mailMessage), email, email_auth['email'], 
"./img/asianBallTicket.png")
    
    return jsonify(), 200

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

def generateTicket(toHash):
    template = Image.open("./img/ticket_template.png").convert("RGBA")
    barcode = EAN13(toHash, writer=ImageWriter())
    
    barcode.save("./img/test")

    barcode = Image.open("./img/test.png")
    barcode.resize((800, 280)).save("./img/test.png")
    
    barcode = Image.open("./img/test.png").convert("RGBA")
    
    xOffset = 20
    yOffset = 1500

    template.paste(barcode, (xOffset, yOffset), barcode)


    # user .save("filename.png", format="png")
    return template

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))


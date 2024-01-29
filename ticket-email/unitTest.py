import smtplib, email, ssl, os, json
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.utils import make_msgid
from email.utils import formatdate

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

    with open('email_auth.json') as json_file:
        email_auth = json.load(json_file)

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(email_auth['email'], email_auth['password'])
    server.sendmail(from_addr, to_addr, mail.as_string())
    server.close()
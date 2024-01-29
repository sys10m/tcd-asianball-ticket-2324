# TODO: function takes hash and details to gen barcode on the ticket
from barcode import EAN13
from barcode.writer import ImageWriter
from PIL import Image

def generateTicket(toHash, ticketFileName):
    template = Image.open("./img/template.png").convert("RGBA")
    barcode = EAN13(hashBarcode(toHash), writer=ImageWriter())
    # FIXME: save path (expensive)
    barcode.save(ticketFileName)
    barcode = Image.open(ticketFileName).convert("RGBA")
    # FIXME: calculate offset position
    xOffset = 500
    yOffset = 1500

    template.paste(barcode, (xOffset, yOffset), barcode)


    # user .save("filename.png", format="png")
    return template

def hashBarcode(toHash):
    return "1234567890123"


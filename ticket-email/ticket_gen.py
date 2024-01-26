# TODO: function takes hash and details to gen barcode on the ticket
from barcode import EAN13
from barcode.writer import ImageWriter
from PIL import Image

def generateTicket(hashcode, ticketFileName):
    template = Image.open(ticketFileName).convert("RGBA")
    barcode = EAN13(hashcode, writer=ImageWriter())
    # FIXME: save path (expensive)
    barcode.save("./img/test")
    barcode = Image.open("./img/test.png").convert("RGBA")
    # FIXME: calculate offset position
    xOffset = 0
    yOffset = 0

    template.paste(barcode, (xOffset, yOffset), barcode)

    return template


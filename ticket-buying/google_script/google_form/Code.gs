function myFunction() {

  const ticketPrice = 50;
  const maxTicket = 299;
  // ------------------------
  // access google form + send payment details to the one who just submitted
  const form = FormApp.openById('1FA7h2Bdy0Tl3VDhMK5Oy6tJMkohrfTGLEMukJ6g1-LY');

  const responses = form.getResponses();

  

  const lastEntry = responses[responses.length - 1];

  const emailToSend = lastEntry.getRespondentEmail();

  let name = "";
  let numOfTickets = 0;
  let lastName= "";

  for (const items of lastEntry.getItemResponses()) {
    if (items.getItem().getTitle() == "First Name"){
      name = items.getResponse();
    }
    else if (items.getItem().getTitle() == "Number of Tickets"){
      numOfTickets = items.getResponse();
    }
    else if (items.getItem().getTitle() == "Last Name"){
      lastName = items.getResponse();
    }
  }

  const amountToPay = ticketPrice * numOfTickets;

  //create template
  let htmlTemplate = HtmlService.createTemplateFromFile('Email');
  htmlTemplate.name = name;
  htmlTemplate.amountToPay = amountToPay;

  const htmlForEmail = htmlTemplate.evaluate().getContent();

  GmailApp.sendEmail(
    emailToSend,
    `ASIAN BALL 23/24 PAYMENT DETAIL`,
    `This email contains html`,
    {htmlBody: htmlForEmail}
  )

  // ------------------------
  // limit form
  let sum = 0;
  for (const response of responses){
    sum += parseInt(response.getItemResponses()[2].getResponse());
  }
  
  if (sum >= maxTicket) {
    form.setAcceptingResponses(false);
  }

  
  
}

function resendError(){
  let htmlTemplate = HtmlService.createTemplateFromFile('Email');
  htmlTemplate.name = 'Smrutha';
  htmlTemplate.amountToPay = 50;
  let emailToSend = 'sivakums@tcd.ie';

  const htmlForEmail = htmlTemplate.evaluate().getContent();

  GmailApp.sendEmail(
    emailToSend,
    `ASIAN BALL 23/24 PAYMENT DETAIL`,
    `This email contains html`,
    {htmlBody: htmlForEmail}
  )
}

function test(){
  let htmlTemplate = HtmlService.createTemplateFromFile('EmailFix');
  htmlTemplate.name = "Nicole";
  htmlTemplate.amountToPay = "100";

  const htmlForEmail = htmlTemplate.evaluate().getContent();

  GmailApp.sendEmail(
    "hiranayp@tcd.ie",
    `ASIAN BALL 23/24 PAYMENT DETAIL`,
    `This email contains html`,
    {htmlBody: htmlForEmail}
  )

}




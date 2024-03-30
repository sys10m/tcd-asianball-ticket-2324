function myFunction(e) {
  const theSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const buyingSheet = theSpreadsheet.getSheetByName('SaleResponse');
  const dashSheet = theSpreadsheet.getSheetByName('dash');
  const maxTicket = 299;

  // verification form length => 4
  // buying form length => 6
  Logger.log(Object.keys(e.namedValues).length);
  if(parseInt(Object.keys(e.namedValues).length) == 6){
    
    const [email, fistName, lastName, numOfTickets] = buyingSheet.getRange(buyingSheet.getLastRow(), 2, 1, 
4).getValues()[0];

    // ------------------------
    // create each entry for each ticket in dash sheet
    const lastTicket = dashSheet.getLastRow();

    const methodRule = SpreadsheetApp.newDataValidation().requireValueInList(["Cash", "Revolut"]).build();

    for (let i = 1; i <= numOfTickets && lastTicket + i <= maxTicket + 1; i++){
      let newEntry = [hash(lastTicket + i), email, fistName, lastName];
      dashSheet.appendRow(newEntry);
      dashSheet.getRange(dashSheet.getLastRow(), 5, 1, 1).insertCheckboxes();
      dashSheet.getRange(dashSheet.getLastRow(), 6, 1, 1).setDataValidation(methodRule);
      dashSheet.getRange(dashSheet.getLastRow(), 7, 1, 2).insertCheckboxes();
    }
  }
  
  // triggered from payment-verification
  else if(parseInt(Object.keys(e.namedValues).length) == 4) {
    // tick off dash
    const newVerification = e.namedValues;
    let ticketsToVerify = newVerification['Amount'] / 50;
    
    const activeCells = dashSheet.getRange(2,1,dashSheet.getLastRow() - 1, 5);
    //Logger.log(activeCells.getValues());
    const arr = activeCells.getValues();

    for (let i = 0; i < arr.length && ticketsToVerify >= 1; i++){
      if (arr[i][4] == false && arr[i][1] == newVerification['Email']){
        // tick
        dashSheet.getRange(2 + i, 5, 1, 1).check();
        dashSheet.getRange(2 + i, 6, 1, 1).setValue(newVerification['Method']);
        ticketsToVerify -= 1;
        // call ticket api
        // send email
        /*
        url = 
`https://asian-ball-email-y7rrkal5lq-nw.a.run.app/post-ticket/?h=${arr[i][0]}&n=${arr[i][2]}&e=${arr[i][1]}`;
        UrlFetchApp.fetch(url, {'muteHttpExceptions': true, 'method':'post'});
        */
      }
    }

    if (ticketsToVerify > 0){
      let overdue = (newVerification['Amount'] % 50) + (ticketsToVerify * 50);
      Logger.log("Amount Overdue")
    }
  }
  
  
}

function email(){
  const theSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const dashSheet = theSpreadsheet.getSheetByName('dash');

  const allTickets = dashSheet.getRange(2, 1, dashSheet.getLastRow() - 1, 8).getValues();

  for (let i = 0; i < allTickets.length; i++){
    if (allTickets[i][7] == false && (allTickets[i][4] && allTickets[i][6])) {
      Logger.log(allTickets[i][1]);
      url = 
`https://asian-ball-email-y7rrkal5lq-nw.a.run.app/post-ticket/?h=${allTickets[i][0]}&n=${allTickets[i][2]}&e=${allTickets[i][1]}`;
      UrlFetchApp.fetch(url, {'muteHttpExceptions': true, 'method':'post'});
      dashSheet.getRange(2 + i, 8, 1, 1).check();
    }
  }

}

function sendReminder(){
  const theSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const dashSheet = theSpreadsheet.getSheetByName('dash');

  const allValues = dashSheet.getRange(2, 1, 210, 5).getValues();
  let emailName = new Map();
  for (let i = 0; i < allValues.length; i++){
    if (allValues[i][0] != "" && !allValues[i][4]){   
      emailName.set(allValues[i][1],allValues[i][2]);
    }
  }

  for (const [email, name] of emailName){
    Logger.log(`${email} -> ${name}`);
    let htmlTemplate = HtmlService.createTemplateFromFile('Email');


    htmlTemplate.name = name;

    const htmlForEmail = htmlTemplate.evaluate().getContent();
    
    GmailApp.sendEmail(
      email,
      `ASIAN BALL 23/24 PAYMENT REMINDER`,
      `This email contains html`,
      {htmlBody: htmlForEmail}
      )
    
  }

  
}

function sendDietary(){
  const theSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const guestlist = theSpreadsheet.getSheetByName('guestlist');

  const ticketedGuest = guestlist.getRange(4,2,187, 3).getValues();
  let emailName = new Map();
  for (let i = 0; i < ticketedGuest.length; i++){
    emailName.set(ticketedGuest[i][0],ticketedGuest[i][1]);
    
  }

  for (const [email, name] of emailName){
    Logger.log(`${email} -> ${name}`);

    let htmlTemplate = HtmlService.createTemplateFromFile('Dietary');

    htmlTemplate.name = name;

    const htmlForEmail = htmlTemplate.evaluate().getContent();
    
    GmailApp.sendEmail(
      email,
      `ASIAN BALL 23/24 DIETARY REQUIREMENT`,
      `This email contains html`,
      {htmlBody: htmlForEmail}
    )
    
  }
  
}

function fixDietary(){
  let htmlTemplate = HtmlService.createTemplateFromFile('Dietary');

    htmlTemplate.name = 'Trishalee';

    const htmlForEmail = htmlTemplate.evaluate().getContent();
    
    GmailApp.sendEmail(
      'trishalee.canete@gmail.com',
      `ASIAN BALL 23/24 DIETARY REQUIREMENT`,
      `This email contains html`,
      {htmlBody: htmlForEmail}
    )
}

function test(){
  const methodRule = SpreadsheetApp.newDataValidation().requireValueInList(["Cash", "Revolut"]).build();
  const theSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const buyingSheet = theSpreadsheet.getSheetByName('SaleResponse');
  const dashSheet = theSpreadsheet.getSheetByName('dash');
  dashSheet.getRange(2, 6, 1, 1).setDataValidation(methodRule);
  dashSheet.getRange(2, 6, 1, 1).setValue("Cash");
}

function hash(row){
  const hashValue = 12343242530098;
  const modDigit = 10 ** 13;
  return ((row * hashValue) % modDigit).toString();
}


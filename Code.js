const agaURL = "https://docs.google.com/spreadsheets/d/1Aq6EBfSrirS4dIAlCWpn2Li49P4IZsiH3dOSOjC56NI/edit?usp=sharing";
const agaSheet = SpreadsheetApp.openByUrl(agaURL);
const clientSheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1cKnCQYqQh1JxaCtb0Rd6L26N_oLz93jO3jofl2JdSOU/edit?usp=sharing");
const defobj = {"parameters":{"paraOne":"five"},"postData":{"contents":JSON.stringify(
   {"orgname":"Testing One two three","faddress":"Tabata Relini 11567","regnum":"1CD456888","bdate":"2020-12-21","contperson":"James Madison","contdetails":"+255678123467","sectorop":"Building and Construction","contryops":"Tanzania, Kenya, Uganda","descrofactiv":"Construction","numemployees":"1000","turnover":"1000$, $55000, 100000$","primaincome":"Fees","prevgrantlist":"None","propoideas":"Nbb, Nbb","otherinfo":" bbbhv j","regcerts":{"fileSize":100000,"fileName":"Budget.png","fileMime":"image/png","fileSrc":"regcerts","fileDataB64":"iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"}}
)}};

const customDateFormater = () =>{
   Date.prototype.toDateInputValue = (function() {
       var local = new Date(this);
       local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
       return local.toJSON();
   });
   const dateVar = new Date().toDateInputValue().toString();
   const year = dateVar.slice(0,4);
   const month = dateVar.slice(5,7);
   const day = dateVar.slice(8,10);
   const hour = dateVar.slice(11,13);
   const minute = dateVar.slice(14,16);
   const second = dateVar.slice(17,23);
   const tzone = dateVar.slice(10,11) + dateVar.slice(23,24);
   const dateVal = {year,month,day,hour,minute,second,tzone};
   return dateVal;
}

 function doPost(e=defobj){
  
  let paraOneVal = false;
  const basicGetResponse = {};
  const postData = e.postData.contents;

  paraOneVal =  e.parameters.paraOne;
  paraOneVal = paraOneVal.toString();

  
  basicGetResponse["data"] =  getAgaData(paraOneVal,postData);
  basicGetResponse["paraOneVal"] = paraOneVal;
  
  
  
   const response = ContentService.createTextOutput(JSON.stringify(basicGetResponse)).setMimeType(ContentService.MimeType.TEXT);
   return  response;

}

function getAgaShortlist(){
      const shortListSheet = agaSheet.getSheetByName("Shortist - LIVE");
      let lastRow2 = shortListSheet.getLastRow();
      let firstRow = 5;
      let dif = lastRow2 - firstRow;
      dif = dif +1;
      lastRow2 = lastRow2+1;
    
      
       let myObj = {} ;
         myObj["deadline"] = "";
         myObj["manager"] = "";
         myObj["id"] = "";
         myObj["title"] = "";   
         myObj["sector"] = "";
         myObj["geography"] = "";
         myObj["value"] = "";
         myObj["status"] = "";
         myObj["gonogo"] = "";
         myObj["client"] = "";
         myObj["notes"] = "";
    
    let myArrObj2 = [];
    
    
       for(let j=0 ; j < dif ; j++){
         let copy = JSON.parse(JSON.stringify(myObj));
         let sum = j + firstRow;
    
         if(!shortListSheet.getRange("D"+sum).isBlank()){
            copy.deadline = shortListSheet.getRange("C"+sum).getDisplayValue();
            copy.manager = shortListSheet.getRange("D"+sum).getDisplayValue();
            copy.id = shortListSheet.getRange("E"+sum).getDisplayValue();
            copy.title = shortListSheet.getRange("F"+sum).getDisplayValue();
            copy.sector = shortListSheet.getRange("G"+sum).getDisplayValue();
            copy.geography = shortListSheet.getRange("H"+sum).getDisplayValue();
            copy.value = shortListSheet.getRange("I"+sum).getDisplayValue();
            copy.status = shortListSheet.getRange("J"+sum).getDisplayValue();
            copy.gonogo = shortListSheet.getRange("K"+sum).getDisplayValue();
            copy.client = shortListSheet.getRange("L"+sum).getDisplayValue();
            copy.notes = shortListSheet.getRange("M"+sum).getDisplayValue();
            copy.rowNumber = sum;
            copy.type = "shortlist";
            copy.rangeID = shortListSheet.getRange("C"+sum+":M"+sum).getA1Notation()
            myArrObj2.push(copy);

         }else{

         }
    
       
     //  console.log(myArrObj2[j].name);
    
      }
     console.log(myArrObj2);
    return myArrObj2;
    
}


function getAgaData(para,data){
   const obj = {};
   if(para==="one"){
      obj["shortlist"] = getAgaShortlist();
      obj["longlist"] = getAgaLonglist();

   }else if(para==="two"){
      obj["sources"] = getAgaSources()
   }else if(para==="three"){
      obj["updateResponse"] = updateScreenshot(data);
   }else if(para==="four"){
      obj["formSubmitResponse"] = updateByForm(data);
   }else if(para==="five"){
      obj["formSubmitResponse"] = onboardByForm(data);
   }else if(para==="six"){
       obj["sixResData"]= sendSourceReport(data);
   }
   
      return obj;
}


function doGet() {
  
   
   const response = HtmlService.createHtmlOutput('     <div style="width:100%; min-height: 500px; background-color: transparent; display:flex; flex-flow: column; justify-content:center; align-items:center; text-align:center"> <div style=" font-family:Cormorant; font-size:36px; letter-spacing:3px;">You shall not pass!! <br> <a href="https://makitz.github.io" target="blank" style="text-decoration:none; font-size: 24px; letter-spacing: 5px; font-weight: bold; color:darkgrey;">makitz.github.io</a></div> </div> ')
   
   return response; 
 }


 function getAgaLonglist(){
   const longListSheet = agaSheet.getSheetByName("Longlist");
   let lastRow2 = longListSheet.getLastRow();
   let firstRow = 8;
   let dif = lastRow2 - firstRow;
   dif = dif +1;
   lastRow2 = lastRow2+1;
 
   
    let myObj = {} ;
      myObj["capturedby"] = "";
      myObj["capturedon"] = "";
      myObj["name"] = "";
      myObj["funder"] = "";   
      myObj["description"] = "";
      myObj["potApplicant"] = "";
      myObj["value"] = "";
      myObj["deadline"] = "";
      myObj["gonogo"] = "";
      myObj["link"] = "";
 
 let myArrObj2 = [];
 
 
    for(let j=0 ; j < dif ; j++){
      let copy = JSON.parse(JSON.stringify(myObj));
      let sum = j + firstRow;
 
      if(!longListSheet.getRange("D"+sum).isBlank()){
         copy.capturedby = longListSheet.getRange("C"+sum).getDisplayValue();
         copy.capturedon = longListSheet.getRange("D"+sum).getDisplayValue();
         copy.name = longListSheet.getRange("E"+sum).getDisplayValue();
         copy.id = copy.name;
         copy.title = copy.name;
         copy.funder = longListSheet.getRange("F"+sum).getDisplayValue();
         copy.description = longListSheet.getRange("G"+sum).getDisplayValue();
         copy.potApplicant = longListSheet.getRange("H"+sum).getDisplayValue();
         copy.value = longListSheet.getRange("I"+sum).getDisplayValue();
         copy.deadline = longListSheet.getRange("J"+sum).getDisplayValue();
         copy.gonogo = longListSheet.getRange("L"+sum).getDisplayValue();
         copy.link = longListSheet.getRange("K"+sum).getDisplayValue();
         
         copy.rowNumber = sum;
         copy.type = "longlist";
         copy.rangeID = longListSheet.getRange("C"+sum+":L"+sum).getA1Notation()
         myArrObj2.push(copy);

      }else{

      }
 
    
  //  console.log(myArrObj2[j].name);
 
   }
  console.log(myArrObj2);
 return myArrObj2;
 
}

function getAgaSources(){
   const sourcesSheet = agaSheet.getSheetByName("Checklist");
   let lastRow2 = sourcesSheet.getLastRow();
   let firstRow = 5;
   let dif = lastRow2 - firstRow;
   dif = dif +1;
   lastRow2 = lastRow2+1;
 
   
    let myObj = {} ;
      myObj["rank"] = "";
      myObj["category"] = "";
      myObj["interest"] = "";
      myObj["name"] = "";   
      myObj["link2"] = "";
      myObj["description"] = "";
      myObj["notes"] = "";
      myObj["link"] = "";
 
 let myArrObj2 = [];
 
 
    for(let j=0 ; j < dif ; j++){
      let copy = JSON.parse(JSON.stringify(myObj));
      let sum = j + firstRow;
 
      if(!sourcesSheet.getRange("D"+sum).isBlank()){
         copy.rank = sourcesSheet.getRange("C"+sum).getDisplayValue();
         copy.category = sourcesSheet.getRange("D"+sum).getDisplayValue();
         copy.interest = sourcesSheet.getRange("E"+sum).getDisplayValue();
         copy.name = sourcesSheet.getRange("F"+sum).getDisplayValue();
         copy.id = copy.name;
         copy.title = copy.name;
         copy.link = sourcesSheet.getRange("G"+sum).getDisplayValue();
         copy.link2 = sourcesSheet.getRange("H"+sum).getDisplayValue();
         copy.description = sourcesSheet.getRange("I"+sum).getDisplayValue();
         copy.notes = sourcesSheet.getRange("J"+sum).getDisplayValue();
         copy.screenshot1 = sourcesSheet.getRange("K"+sum).getDisplayValue();
         copy.chanceOfNewOpp = sourcesSheet.getRange("L"+sum).getDisplayValue();
         
         copy.rowNumber = sum;
         copy.type = "source";
         copy.rangeID = sourcesSheet.getRange("C"+sum+":L"+sum).getA1Notation()
         myArrObj2.push(copy);

      }else{

      }
 
    
  //  console.log(myArrObj2[j].name);
 
   }
  console.log(myArrObj2);
 return myArrObj2;
 
}


function updateScreenshot(data){
   const sourcesSheet = agaSheet.getSheetByName("Checklist");
   const reqData = JSON.parse(data);
   sourcesSheet.getRange("K"+reqData.rowNo).setValue(reqData.url);
   sourcesSheet.getRange("L"+reqData.rowNo).setValue(reqData.res.percDiff);
   return "success";
}

function updateByForm(data){
   const reqData = JSON.parse(data);
   
   return reqData["0"]
}


function onboardByForm(data){
   const reqData = JSON.parse(data);
   const clients = clientSheet.getSheetByName("Sheet 1");
   const date = customDateFormater();


   reqData.regcerts.downLink = uploadClientFile(reqData.regcerts,date,reqData.orgname)
   reqData.taxcerts.downLink = uploadClientFile(reqData.taxcerts,date,reqData.orgname)
   reqData.auditedfin.downLink = uploadClientFile(reqData.auditedfin,date,reqData.orgname)
   reqData.busprofdoc.downLink =uploadClientFile(reqData.busprofdoc,date,reqData.orgname)
   reqData.prevsubfiles.downLink =uploadClientFile(reqData.prevsubfiles,date,reqData.orgname)

   clients.appendRow([
      reqData.orgname,
      reqData.faddress,
      reqData.regnum,
      reqData.bdate,
      reqData.contperson,
      reqData.contdetails,
      reqData.sectorop,
      reqData.contryops,
      reqData.descrofactiv,
      reqData.numemployees,
      reqData.turnover,
      reqData.primaincome,
      reqData.prevgrantlist,
      reqData.propoideas,
      reqData.otherinfo,
      reqData.regcerts.downLink,
      reqData.taxcerts.downLink,
      reqData.auditedfin.downLink,
      reqData.busprofdoc.downLink,
      reqData.prevsubfiles.downLink,
      reqData.email,
      date.day+"/"+date.month+"/"+date.year
   ]);
   sendEmail(reqData);
   return reqData;
}


function uploadClientFile (file,date,orgname){
   const data = Utilities.base64Decode(file.fileDataB64.split(",")[1]);
   const blob = Utilities.newBlob(data,file.fileMime,file.fileName);
   const momFolder = DriveApp.getFolderById("1ez-kvM6Y_k2xViJFmXb_nQ5czI1bDU_N");
   const clientFolder = momFolder.createFolder(orgname+"_"+date.year+date.month+date.day+date.hour+date.minute+date.second.replaceAll(".","_"));
   const uploadedFile = clientFolder.createFile(blob);
   const downLink = uploadedFile.getDownloadUrl();
   return downLink;
}


function sendEmail(myDataObj){
   const reqData = myDataObj;
   const agaLogoUrl =   "https://ismailiaga.github.io/AGA-Apps-Script-Backend/logo%20(1).png";
   const agaLogoBlob = UrlFetchApp
                           .fetch(agaLogoUrl)
                           .getBlob()
                           .setName("agaLogoBlob");
   MailApp.sendEmail({
     name: "AGA Onboarding Form",
     to: reqData.email,
     cc:"",
     bcc: "africagrantadvisors@gmail.com, ismaili.simba@africagrant.com",
     subject: "AGA Onboarding Form - Submission Confirmation",
     htmlBody :` <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>AGA Partner Onboarding Form</title>
        <style>
          /* -------------------------------------
              GLOBAL RESETS
          ------------------------------------- */
          
          /*All the styling goes here*/
          
          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }
    
          body {
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }
    
          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }
          
    
          /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */
    
          .body {
            background-color: #f6f6f6;
            width: 100%; 
          }
    
          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
          .container {
            display: block;
            margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; 
          }
    
          /* This should also be a block element, so that it will fill 100% of the .container */
          .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px; 
          }
    
          /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }
    
          .wrapper {
            box-sizing: border-box;
            padding: 20px; 
          }
    
          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }
    
          .footer {
            clear: both;
            margin-top: 10px;
            text-align: center;
            width: 100%; 
          }
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #999999;
              font-size: 12px;
              text-align: center; 
          }
    
          /* -------------------------------------
              TYPOGRAPHY
          ------------------------------------- */
          h1,
          h2,
          h3,
          h4 {
            color: #000000;
            font-family: Arial;
            font-weight: 400;
            line-height: 1.4;
            margin: 0;
            margin-bottom: 30px; 
          }
    
          h1 {
            font-size: 35px;
            font-weight: 300;
            text-align: center;
            text-transform: capitalize; 
          }
    
          p,
          ul,
          ol {
            font-family: Arial;
            font-size: 14px;
            font-weight: normal;
            margin: 0;
            margin-bottom: 15px; 
          }
            p li,
            ul li,
            ol li {
              list-style-position: inside;
              margin-left: 5px; 
          }
    
          a {
            color: #006622;
            text-decoration: underline; 
          }
    
          /* -------------------------------------
              BUTTONS
          ------------------------------------- */
          .btn {
            box-sizing: border-box;
            width: 100%; }
            .btn > tbody > tr > td {
              padding-bottom: 15px; }
            .btn table {
              width: auto; 
          }
            .btn table td {
              background-color: #ffffff;
              border-radius: 5px;
              text-align: center; 
          }
            .btn a {
              background-color: #ffffff;
              border: solid 1px #006622;
              border-radius: 5px;
              box-sizing: border-box;
              color: #006622;
              cursor: pointer;
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              margin: 0;
              padding: 12px 25px;
              text-decoration: none;
              text-transform: capitalize; 
          }
    
          .btn-primary table td {
            background-color: #006622; 
          }
    
          .btn-primary a {
            background-color: #006622;
            border-color: #006622;
            color: #ffffff; 
          }
    
          /* -------------------------------------
              OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
          .last {
            margin-bottom: 0; 
          }
    
          .first {
            margin-top: 0; 
          }
    
          .align-center {
            text-align: center; 
          }
    
          .align-right {
            text-align: right; 
          }
    
          .align-left {
            text-align: left; 
          }
    
          .clear {
            clear: both; 
          }
    
          .mt0 {
            margin-top: 0; 
          }
    
          .mb0 {
            margin-bottom: 0; 
          }
    
          .preheader {
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0; 
          }
    
          .powered-by a {
            text-decoration: none; 
          }
    
          hr {
            border: 0;
            border-bottom: 1px solid #f6f6f6;
            margin: 20px 0; 
          }
    
          /* -------------------------------------
              RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
          @media only screen and (max-width: 620px) {
            table.body h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important; 
            }
            table.body p,
            table.body ul,
            table.body ol,
            table.body td,
            table.body span,
            table.body a {
              font-size: 16px !important; 
            }
            table.body .wrapper,
            table.body .article {
              padding: 10px !important; 
            }
            table.body .content {
              padding: 0 !important; 
            }
            table.body .container {
              padding: 0 !important;
              width: 100% !important; 
            }
            table.body .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important; 
            }
            table.body .btn table {
              width: 100% !important; 
            }
            table.body .btn a {
              width: 100% !important; 
            }
            table.body .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important; 
            }
          }
    
          /* -------------------------------------
              PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
          @media all {
            .ExternalClass {
              width: 100%; 
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%; 
            }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important; 
            }
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
              font-size: inherit;
              font-family: inherit;
              font-weight: inherit;
              line-height: inherit;
            }
            .btn-primary table td:hover {
              background-color: #34495e !important; 
            }
            .btn-primary a:hover {
              background-color: #34495e !important;
              border-color: #34495e !important; 
            } 
          }
    
        </style>
      </head>
      <body>
        <span class="preheader">Welcome to AGA partner!</span>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
            <td>&nbsp;</td>
            <td class="container">
              <div class="content">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <table role="presentation" class="main">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                          <img src='cid:agaLogo' style="display:block; margin:0 auto; width:124px">
                            <p>Hi ${reqData.contperson},</p>
                            <p>Please find the copy of your submission below.</p>
                            <ol>
                                <li> <strong> Organization Name </strong>           - ${reqData.orgname} </li><br>
                                <li> <strong> Full Address </strong>                - ${reqData.faddress} </li><br>
                                <li> <strong> Registration Number </strong>         - ${reqData.regnum} </li><br>
                                <li> <strong> Registration Date </strong>           - ${reqData.bdate} </li><br>
                                <li> <strong> Contact Person </strong>              - ${reqData.contperson} </li><br>
                                <li> <strong> Contact Details </strong>             - ${reqData.contdetails} </li><br>
                                <li> <strong> Sector </strong>                      - ${reqData.sectorop} </li><br>
                                <li> <strong> Country(ies) of Operation </strong>   - ${reqData.contryops} </li><br>
                                <li> <strong> Description of activities </strong>   - ${reqData.descrofactiv} </li><br>
                                <li> <strong>Number of employees </strong>          - ${reqData.numemployees} </li><br>
                                <li> <strong>Turnover in 2020, 2021, and 2022 </strong> - ${reqData.turnover} </li><br>
                                <li> <strong>Primary source of income </strong>         - ${reqData.primaincome} </li><br>
                                <li> <strong>Previous grants </strong>              - ${reqData.prevgrantlist} </li><br>
                                <li> <strong>Proposed project ideas </strong>       - ${reqData.propoideas} </li><br>
                                <li> <strong>Other info </strong>                   - ${reqData.otherinfo} </li><br>
                                <li> <strong>Registration certificate </strong>     - ${reqData.regcerts.downLink} </li><br>
                                <li> <strong>Tax certificate </strong>              - ${reqData.taxcerts.downLink} </li><br>
                                <li> <strong>Audited financials </strong>           - ${reqData.auditedfin.downLink} </li><br>
                                <li> <strong>Business profile </strong>             - ${reqData.busprofdoc.downLink} </li><br>
                                <li> <strong>Previous submission files </strong>          - ${reqData.prevsubfiles.downLink} </li>
                            </ol>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                              <tbody>
                                <tr>
                                  <td align="left">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <!--<td> <a href="http://htmlemail.io" target="_blank">Call To Action</a> </td>-->
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p style="text-align:center;">Thank you!</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
                <!-- END CENTERED WHITE CONTAINER -->
    
                <!-- START FOOTER -->
                <div class="footer">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="content-block">
                        <span class="apple-link">Africa Grant Advisors, Nairobi, Kenya</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block powered-by">
                        Powered by <a href="https://africagrant.com">AGA</a>.
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- END FOOTER -->
    
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>`,
     inlineImages:
       {
         agaLogo: agaLogoBlob
       }
   });
 
   return myDataObj
 }


 function sendEmail2(myDataObj){
  const reqData = myDataObj;
  const agaLogoUrl =   "https://ismailiaga.github.io/AGA-Apps-Script-Backend/logo%20(1).png";
  const agaLogoBlob = UrlFetchApp
                          .fetch(agaLogoUrl)
                          .getBlob()
                          .setName("agaLogoBlob");
  MailApp.sendEmail({
    name: "AGA Onboarding Form",
    to: reqData.email,
    cc:"",
    bcc: "africagrantadvisors@gmail.com, ismaili.simba@africagrant.com",
    subject: "AGA Onboarding Form - Submission Confirmation",
    htmlBody :` <head>
       <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
       <title>AGA Partner Onboarding Form</title>
       <style>
         /* -------------------------------------
             GLOBAL RESETS
         ------------------------------------- */
         
         /*All the styling goes here*/
         
         img {
           border: none;
           -ms-interpolation-mode: bicubic;
           max-width: 100%; 
         }
   
         body {
           background-color: #f6f6f6;
           font-family: sans-serif;
           -webkit-font-smoothing: antialiased;
           font-size: 14px;
           line-height: 1.4;
           margin: 0;
           padding: 0;
           -ms-text-size-adjust: 100%;
           -webkit-text-size-adjust: 100%; 
         }
   
         table {
           border-collapse: separate;
           mso-table-lspace: 0pt;
           mso-table-rspace: 0pt;
           width: 100%; }
           table td {
             font-family: sans-serif;
             font-size: 14px;
             vertical-align: top; 
         }
         
   
         /* -------------------------------------
             BODY & CONTAINER
         ------------------------------------- */
   
         .body {
           background-color: #f6f6f6;
           width: 100%; 
         }
   
         /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
         .container {
           display: block;
           margin: 0 auto !important;
           /* makes it centered */
           max-width: 580px;
           padding: 10px;
           width: 580px; 
         }
   
         /* This should also be a block element, so that it will fill 100% of the .container */
         .content {
           box-sizing: border-box;
           display: block;
           margin: 0 auto;
           max-width: 580px;
           padding: 10px; 
         }
   
         /* -------------------------------------
             HEADER, FOOTER, MAIN
         ------------------------------------- */
         .main {
           background: #ffffff;
           border-radius: 3px;
           width: 100%; 
         }
   
         .wrapper {
           box-sizing: border-box;
           padding: 20px; 
         }
   
         .content-block {
           padding-bottom: 10px;
           padding-top: 10px;
         }
   
         .footer {
           clear: both;
           margin-top: 10px;
           text-align: center;
           width: 100%; 
         }
           .footer td,
           .footer p,
           .footer span,
           .footer a {
             color: #999999;
             font-size: 12px;
             text-align: center; 
         }
   
         /* -------------------------------------
             TYPOGRAPHY
         ------------------------------------- */
         h1,
         h2,
         h3,
         h4 {
           color: #000000;
           font-family: Arial;
           font-weight: 400;
           line-height: 1.4;
           margin: 0;
           margin-bottom: 30px; 
         }
   
         h1 {
           font-size: 35px;
           font-weight: 300;
           text-align: center;
           text-transform: capitalize; 
         }
   
         p,
         ul,
         ol {
           font-family: Arial;
           font-size: 14px;
           font-weight: normal;
           margin: 0;
           margin-bottom: 15px; 
         }
           p li,
           ul li,
           ol li {
             list-style-position: inside;
             margin-left: 5px; 
         }
   
         a {
           color: #006622;
           text-decoration: underline; 
         }
   
         /* -------------------------------------
             BUTTONS
         ------------------------------------- */
         .btn {
           box-sizing: border-box;
           width: 100%; }
           .btn > tbody > tr > td {
             padding-bottom: 15px; }
           .btn table {
             width: auto; 
         }
           .btn table td {
             background-color: #ffffff;
             border-radius: 5px;
             text-align: center; 
         }
           .btn a {
             background-color: #ffffff;
             border: solid 1px #006622;
             border-radius: 5px;
             box-sizing: border-box;
             color: #006622;
             cursor: pointer;
             display: inline-block;
             font-size: 14px;
             font-weight: bold;
             margin: 0;
             padding: 12px 25px;
             text-decoration: none;
             text-transform: capitalize; 
         }
   
         .btn-primary table td {
           background-color: #006622; 
         }
   
         .btn-primary a {
           background-color: #006622;
           border-color: #006622;
           color: #ffffff; 
         }
   
         /* -------------------------------------
             OTHER STYLES THAT MIGHT BE USEFUL
         ------------------------------------- */
         .last {
           margin-bottom: 0; 
         }
   
         .first {
           margin-top: 0; 
         }
   
         .align-center {
           text-align: center; 
         }
   
         .align-right {
           text-align: right; 
         }
   
         .align-left {
           text-align: left; 
         }
   
         .clear {
           clear: both; 
         }
   
         .mt0 {
           margin-top: 0; 
         }
   
         .mb0 {
           margin-bottom: 0; 
         }
   
         .preheader {
           color: transparent;
           display: none;
           height: 0;
           max-height: 0;
           max-width: 0;
           opacity: 0;
           overflow: hidden;
           mso-hide: all;
           visibility: hidden;
           width: 0; 
         }
   
         .powered-by a {
           text-decoration: none; 
         }
   
         hr {
           border: 0;
           border-bottom: 1px solid #f6f6f6;
           margin: 20px 0; 
         }
   
         /* -------------------------------------
             RESPONSIVE AND MOBILE FRIENDLY STYLES
         ------------------------------------- */
         @media only screen and (max-width: 620px) {
           table.body h1 {
             font-size: 28px !important;
             margin-bottom: 10px !important; 
           }
           table.body p,
           table.body ul,
           table.body ol,
           table.body td,
           table.body span,
           table.body a {
             font-size: 16px !important; 
           }
           table.body .wrapper,
           table.body .article {
             padding: 10px !important; 
           }
           table.body .content {
             padding: 0 !important; 
           }
           table.body .container {
             padding: 0 !important;
             width: 100% !important; 
           }
           table.body .main {
             border-left-width: 0 !important;
             border-radius: 0 !important;
             border-right-width: 0 !important; 
           }
           table.body .btn table {
             width: 100% !important; 
           }
           table.body .btn a {
             width: 100% !important; 
           }
           table.body .img-responsive {
             height: auto !important;
             max-width: 100% !important;
             width: auto !important; 
           }
         }
   
         /* -------------------------------------
             PRESERVE THESE STYLES IN THE HEAD
         ------------------------------------- */
         @media all {
           .ExternalClass {
             width: 100%; 
           }
           .ExternalClass,
           .ExternalClass p,
           .ExternalClass span,
           .ExternalClass font,
           .ExternalClass td,
           .ExternalClass div {
             line-height: 100%; 
           }
           .apple-link a {
             color: inherit !important;
             font-family: inherit !important;
             font-size: inherit !important;
             font-weight: inherit !important;
             line-height: inherit !important;
             text-decoration: none !important; 
           }
           #MessageViewBody a {
             color: inherit;
             text-decoration: none;
             font-size: inherit;
             font-family: inherit;
             font-weight: inherit;
             line-height: inherit;
           }
           .btn-primary table td:hover {
             background-color: #34495e !important; 
           }
           .btn-primary a:hover {
             background-color: #34495e !important;
             border-color: #34495e !important; 
           } 
         }
   
       </style>
     </head>
     <body>
       <span class="preheader">Welcome to AGA partner!</span>
       <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
         <tr>
           <td>&nbsp;</td>
           <td class="container">
             <div class="content">
   
               <!-- START CENTERED WHITE CONTAINER -->
               <table role="presentation" class="main">
   
                 <!-- START MAIN CONTENT AREA -->
                 <tr>
                   <td class="wrapper">
                     <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                       <tr>
                         <td>
                         <img src='cid:agaLogo' style="display:block; margin:0 auto; width:124px">
                           <p>Hi,</p>
                           <p>Please find the copy of your report below.</p>
                           <ol>
                              ${reqData.emailData}
                           </ol>
                           <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                             <tbody>
                               <tr>
                                 <td align="left">
                                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                     <tbody>
                                       <tr>
                                         <!--<td> <a href="http://htmlemail.io" target="_blank">Call To Action</a> </td>-->
                                       </tr>
                                     </tbody>
                                   </table>
                                 </td>
                               </tr>
                             </tbody>
                           </table>
                           <p style="text-align:center;">Thank you!</p>
                         </td>
                       </tr>
                     </table>
                   </td>
                 </tr>
   
               <!-- END MAIN CONTENT AREA -->
               </table>
               <!-- END CENTERED WHITE CONTAINER -->
   
               <!-- START FOOTER -->
               <div class="footer">
                 <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                   <tr>
                     <td class="content-block">
                       <span class="apple-link">Africa Grant Advisors, Nairobi, Kenya</span>
                     </td>
                   </tr>
                   <tr>
                     <td class="content-block powered-by">
                       Powered by <a href="https://africagrant.com">AGA</a>.
                     </td>
                   </tr>
                 </table>
               </div>
               <!-- END FOOTER -->
   
             </div>
           </td>
           <td>&nbsp;</td>
         </tr>
       </table>
     </body>`,
    inlineImages:
      {
        agaLogo: agaLogoBlob
      }
  });

  return myDataObj
}

function sendSourceReport(data){
  const reqData = JSON.parse(data);
  sendEmail2(reqData);
  return reqData;
}
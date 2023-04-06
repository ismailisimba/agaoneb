const agaURL = "https://docs.google.com/spreadsheets/d/1Aq6EBfSrirS4dIAlCWpn2Li49P4IZsiH3dOSOjC56NI/edit?usp=sharing";
const agaSheet = SpreadsheetApp.openByUrl(agaURL);
const defobj = {"parameters":{"paraOne":"one"},"postData":{"contents":JSON.stringify({
   "name": "Ismaili Amir Simba",
   "dayOfBirth": "22-02-2023",
   "policyTerm": "25 Years",
   "age": "29",
   "sumInsured": "1,000,000",
   "premium": "1,000,000",
   "totalpremium": "1,000,000",
   "revbonus": "1,000,000",
   "termbonus": "1,000,000",
   "totalmatval": "1,000,000",
   "cashback": "1,000,000",
   "cashbackStatus":"cashback",
   "planType":"greee"
 })}};

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
         copy.screenshot2 = sourcesSheet.getRange("L"+sum).getDisplayValue();
         
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
   return "success";
}

function updateByForm(data){
   const reqData = JSON.parse(data);
   return reqData
}
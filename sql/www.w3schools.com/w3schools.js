(function() {
  var cx = '012971019331610648934:m2tou3_miwy';
  var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
  gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
      '//www.google.com/cse/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
})();

function searchfield_focus(obj)
{
obj.style.color=""
obj.style.fontStyle=""
if (obj.value=="Search w3schools.com")
	{obj.value=""}
}
var addr=document.location.href;
function displayError()
{
document.getElementById("err_url").value=addr;
document.getElementById("err_form").style.display="block";
document.getElementById("err_desc").focus();
hideSent();
}
function hideError()
{
document.getElementById("err_form").style.display="none";
}
function hideSent()
{
document.getElementById("err_sent").style.display="none";
}
function sendErr()
{
var xmlhttp;
var err_url=document.getElementById("err_url").value;
var err_email=document.getElementById("err_email").value;
var err_desc=document.getElementById("err_desc").value;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.open("POST.html","../err_sup.html",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("err_url=" + err_url + "&err_email=" + err_email + "&err_desc=" + escape(err_desc));
document.getElementById("err_desc").value="";
hideError();
document.getElementById("err_sent").style.display="block";
}
function clickFBLike() {
    document.getElementById("fblikeframe").style.display='block'
    document.getElementById("popupDIV").innerHTML = "<iframe src='/fblike.asp?r=" + Math.random() + "' frameborder='no' style='height:200px;width:300px;'></iframe><br><button onclick='hideFBLike()'>Close</button>";
}
function hideFBLike() {
    document.getElementById("fblikeframe").style.display='none'
}
function googleTranslateElementInit() {
	new google.translate.TranslateElement({
		pageLanguage: 'en',
		autoDisplay: false,    
		gaTrack: true,
		gaId: 'UA-3855518-1',
		layout: google.translate.TranslateElement.InlineLayout.SIMPLE
	}, 'google_translate_element');
}

function printPage()
{
content=document.getElementsByClassName("main")[0].getElementsByTagName("DIV")[0].innerHTML;
head=document.getElementsByTagName("head")[0].innerHTML;
var myWindow=window.open('','','');
myWindow.document.write("<html><head>"+head+"<style>body{padding:15px;}</style></head><body><button onclick='window.print()'>Print Page</button>"+content+"<p><a href='/about/about_copyright.asp'>Copyright 1999-2015</a> by Refsnes Data. All Rights Reserved.</p></body></html>");
}

(function () {
function lookAhead(x, ipos, n) {
var i, c, text;
text = "";
for (i = ipos; i < ipos + n; i++) {
  if (i < x.length) {
    c = x.charAt(i);
    text += c;
  }
}
return text.toUpperCase();
}
var x, y, z, i, j, c, ch, text, status, ele;
if (!document.getElementsByClassName) {return;}
y = document.getElementsByClassName("htmlHigh");
for (j = 0; j < y.length; j++) {
z = y[j];
ele = "";
text = "";
script = false;
status = "TAGW";
x = z.innerHTML;

for (i = 0; i < x.length; i++) {
c = x.charAt(i);
ch = c.charCodeAt(0);  
if (status == "ANG") {
  if (c == "}") {
    if (lookAhead(x, i, 2) == "}}") {
      text += "}}" + "</span>";
      i++;
      status = "TAGW";
      continue;
    }
  }
} 
if (status == "TAGW") {
  if (c == "&") {
    if (lookAhead(x, i, 7) == "&LT;!--") {
      text += "<span class='highCOM'>" + c;
      status = "COM";
      continue;
    }
    if (lookAhead(x, i, 4) == "&LT;") {
      if (script == true) {
        if (lookAhead(x, i, 11) != "&LT;/SCRIPT") {
          text += c;
          continue;
        }
        if (lookAhead(x, i, 11) == "&LT;/SCRIPT") {
          script = false;
        }
      }
      text += "<span class='highLT'>" + c;
      status = "LT";
      continue;
    }         
  }
  if (c == "{") {
    if (lookAhead(x, i, 2) == "{{") {
      text += "<span class='highATT'>" + c;
      status = "ANG";
      continue;
    }
  }    
}          
if (status == "ELEW") {
  if (ch != 32 && ch != 10 && ch != 13 && ch != 9) {
    text += "<span class='highELE'>" + c;
    ele = c;
    status = "ELE";
    if (lookAhead(x, i, 9) == "SCRIPT&GT") {script = true;}
    continue;
  }
} 
if (status == "ELE") {
  if (ch == 32 || ch == 10 || ch == 13 || ch == 9) {
    text += "</span>";
    status = "ATTW"; 
  }
  if (c == "&") {
    if (lookAhead(x, i, 4) == "&GT;") {
      text += "</span><span class='highGT'>" + c;
      status = "GT";
      continue;
    }
  }
  ele += c;
}        
if (status == "ATTW") {
  if (c == "&")
    if (lookAhead(x, i, 4) == "&GT;") {
      text += "<span class='highGT'>" + c;
      status = "GT";
      continue;
    }
  if (ch != 32 && ch != 10 && ch != 13 && ch != 9) {
    text += "<span class='highATT'>" + c;
    status = "ATT";
    continue;
  }
} 
if (status == "ATT") {
  if (c == "=") {
    text += c + "</span><span class='highVAL'>";
    status = "VALW";
    continue;
  }
  if (c == "&") {
    if (lookAhead(x, i, 4) == "&GT;") {
      text += "</span><span class='highGT'>" + c;
      status = "GT";
      continue;
    }
  }       
}
if (status == "COM") {
  if (c == "-") {
    if (lookAhead(x, i, 6) == "--&GT;") {
      text += c;
      status = "COMW";
      continue;
    }
  }
}       
if (status == "COMW") {
  if (c == "&") {
    if (lookAhead(x, i, 4) == "&GT;") {
      text += c;
      status = "GT";
      continue;
    }
  }
}       
if (status == "VALS") {
  if (c == "'") {
    text += c + "</span>";
    status = "ATTW";
    continue;
  }
}
if (status == "VALD") {
  if (c == '"') {
    text += c + "</span>";
    status = "ATTW";
    continue;
  }
}
if (status == "VALW") {
  if (c == "'") {
    status = "VALS";
    text += c;
    continue;
  }
  if (c == '"') {
    status = "VALD";
    text += c;
    continue;
  }    
}  
if (status == "LT") {
  if (c == ";") {
    text += c + "</span>";
    status = "ELEW";
    continue;
  }
} 
if (status == "GT") {
  if (c == ";") {
    text += c + "</span>";
    status = "TAGW";
    continue;
  }
} 
text += c;
}
z.innerHTML = text;


}})();

(function () {
function lookAhead(x, ipos, n) {
var i, c, text;
text = "";
for (i = ipos; i < ipos + n; i++) {
  if (i < x.length) {
    c = x.charAt(i);
    text += c;
  }
}
return text.toUpperCase();
}
var x, y, z, i, j, c, ch, text, status, temp, span;
if (!document.getElementsByClassName) {return;}
y = document.getElementsByClassName("cssHigh");
for (j = 0; j < y.length; j++) {
z = y[j];
text = "";
temp = "";
span = false;
status = "SELW";
x = z.innerHTML;

for (i = 0; i < x.length; i++) {
c = x.charAt(i);
ch = c.charCodeAt(0);  
if (c == "<") {
  text += c;
  temp = status;
  status = "TAG";
  continue;
}
if (c == "http://www.w3schools.com/") {
  if (lookAhead(x, i, 2) == "/*") {
    text += "<span class='highCOM'>";
    span = true;
    temp = status;
    status = "COM";
  }     
  text += c;
  continue;   
} 
if (status == "COM" ) {
  if (c == "*") {
      if (lookAhead(x, i, 2) == "*/") {
        if (span) {
          text += c;
          i++;
          text += x.charAt(i);
          text += "</span>";
          span = false;
          status = temp;
        }
      } else {
        text += c;
      }    
  continue;   
  }    
} 
if (status == "MED") {
  if (c == "{") {
    text += "</span>" + c;
    span = false;
    status = "SELW";
    continue;
  }
}           
if (status == "SELW") {
  if (c == "@") {
    if (lookAhead(x,i,5) == "@FONT") {
      text += "<span class='highELE'>" + c;
      span = true;
      status = "SEL";
      continue;
    } else {
      text += "<span class='highELE'>" + c;
      span = true;
      status = "MED";
      continue;
    }
  }
  if (c == "}") {
    text += c;
    continue;
  }
  if (ch != 32 && ch != 10 && ch != 13 && ch != 9) {
    text += "<span class='highELE'>" + c;
    span = true;
    status = "SEL";
    continue;
  }
}           
if (status == "TAG") {
  text += c;
  if (c == ">") {
    status = temp;
  }        
  continue;
}
if (c == "&") {
  text += c;
  if (lookAhead(x, i, 6) == "&NBSP;") {
    temp = status;
    status = "NBSP";
  }
  continue; 
}
if (status == "NBSP") {
  text += c;
  if (c == ";") {
    status = temp;
  }        
  continue;
}
if (status == "SEL") {
  if (c == "{") {
    if (span) {
      text += "</span>";
      span = false;
    }
    text += c;
    status = "PROW"; 
    continue;
  }
}        
if (status == "PROW") {
  if (c == "}") {
    if (span) {
      text += "</span>";
      span = false;
    }
    text += c;
    status = "SELW"; 
    continue;
  } 
  if (ch != 32 && ch != 10 && ch != 13 && ch != 9) {
    text += "<span class='highATT'>" + c;
    span = true;
    status = "VALW"; 
    continue;
  }
}        
if (status == "VALW") {
  if (c == ":") {
    text += c; 
    if (span) {
      text += "</span>";
      span = false;
    }
    text += "<span class='highVAL'>";
    span = true;
    status = "VAL"; 
    continue;
    }
}        
if (status == "VAL") {
  if (c == "}") {
    if (span) {
      text += "</span>";
      span = false;
    }
    text += c;
    status = "SELW"; 
    continue;
  }
  if (c == ";") {
    text += c;
    if (span) {
      text += "</span>";
      span = false;
    }
    status = "PROW"; 
    continue;
  }
}        
text += c;
}

z.innerHTML = text;

}})();

(function () {
function lookAhead(x, ipos, n) {
var i, c, text;
text = "";
for (i = ipos; i < ipos + n; i++) {
  if (i < x.length) {
    c = x.charAt(i);
    text += c;
  }
}
return text.toUpperCase();
}
var x, y, z, i, j, c, ch, text, status;
if (!document.getElementsByClassName) {return;}
y = document.getElementsByClassName("jsonHigh");
for (j = 0; j < y.length; j++) {
z = y[j];
text = "";
status = "";
x = z.innerHTML;

for (i = 0; i < x.length; i++) {
c = x.charAt(i);
ch = c.charCodeAt(0);  
 
if (status == "") {
  if (c == '"') {
    status = "OBJNAME";
    text += "<span class='highELE'>" + c;
    continue;
  }        
  if (c == "{") {
    status = "OBJECT";
    text += c;
    continue;
  }
  text += c;
  continue;
}
if (status == "OBJECT") {
  if (c == '"') {
    status = "OBJNAME";
    text += "<span class='highELE'>" + c;
    continue;
  }        
  text += c;
  continue;
}
if (status == "OBJNAME") {
  if (c == '"') {
    status = "WAITCOLON";
    text += c + "</span>"
    continue;
  }        
  text += c;
  continue;
}
if (status == "WAITCOLON") {
  if (c == ":") {
    status = "COLON";
    text += c;
    continue;
  }
  text += c;
  continue;
}        
if (status == "COLON") {
  if (c == '"') {
    status = "VALUE";
    text += "<span class='highVAL'>" + c;
    continue;
  }
  if (ch > 47 && ch < 58) {
    status = "NUMBER";
    text += "<span class='highVAL'>" + c;
    continue;
  }
  if (c == "{") {
    status = "OBJECT";
    text += c;
    continue;
  }
  if (c == "[") {
    status = "ARRAY";
    text += c;
    continue;
  }
  text += c;
  continue;
}
if (status == "ARRAY") {
  if (c == ']') {
    status = ""; 
    text += c;
    continue;
  }
  if (c == '{') {
    status = "OBJECT"; 
    text += c;
    continue;
  }
  text += c;
  continue;
}        
if (status == "VALUE") {
  if (c == '"') {
    status = "OBJECT"; 
    text += c + "</span>";
    continue;
  }
  text += c;
  continue;
}
if (status == "NUMBER") {
  if (ch < 48 || ch > 57) {
    status = ""; 
    text += "</span>" + c;
    continue;
  }
  text += c;
  continue;
} 
text += c;
}
z.innerHTML = text;
}})();

(function () {
function lookAhead(x, ipos, n) {
var i, c, ch, text;
text = "";
for (i = ipos; i < ipos + n; i++) {
  if (i < x.length) {
    c = x.charAt(i);
    ch = c.charCodeAt(0);  
    if (ch == 32 || ch == 10 || ch == 13 || ch == 9 ) {
      text += " ";        
    } else {
      text += c;
    }
  }
}
return text;
}
function lookWord(x, ipos) {
var i, c, ch, text;
text = "";
for (i = ipos; i < x.length; i++) {
  c = x.charAt(i);
  ch = c.charCodeAt(0);  
  if (ch == 10 || ch == 13 || ch == 9 || ch == 32 || ch == 38 || ch == 40 || ch == 41 || ch == 42 || ch == 43 ||
  ch == 44 || ch == 58 || ch == 47 || ch == 58 || ch == 59 || ch == 60 || ch == 61 || ch == 91 || ch == 93) {
    return text;        
  } else {
    text += c;
  }
}
return text;
}
var x, y, z, i, j, k, c, ch, text, status, ele, comp, pos;
jsArr = ["var","boolean","break","case","catch","continue","debugger","default","do","else","finally","for",
"function","if","in","new","return","switch","throw","try","typeof","while","with"];
if (!document.getElementsByClassName) {return;}
y = document.getElementsByClassName("jsHigh");
for (j = 0; j < y.length; j++) {
z = y[j];
ele = "";
text = "";
status = "";
x = z.innerHTML;

for (i = 0; i < x.length; i++) {
  c = x.charAt(i);
  ch = c.charCodeAt(0);
  if (ch == 32 || ch == 10 || ch == 13 || ch == 9 ) {
    text += c;
    continue;
  }
  if (lookAhead(x, i, 2) == "//") {
    text += "<span class='highCOM'>";  
    pos = x.substr(i).indexOf("<br>");
    if (pos == -1) {
      text += x.substr(i); 
      i = x.length;
    } else {
      text += x.substr(i,pos + 4);
      i += pos + 3;
    }  
    text += "</span>"
    continue;
  }
  if (lookAhead(x, i, 2) == "/*") {
    text += "<span class='highCOM'>";  
    pos = x.substr(i).indexOf("*/");
    if (pos == -1) {
      text += x.substr(i); 
      i = x.length;
    } else {
      text += x.substr(i,pos + 2);
      i += pos + 1;
    }  
    text += "</span>"
    continue;
  }
  if (c == "&") {
    pos = x.substr(i).indexOf(";");
    if (pos == -1) {
      text += x.substr(i); 
      i = x.length;
    } else {
      text += x.substr(i,pos + 1);
      i += pos;
    }  
    continue;
  }
  if (c == "'" || c == '"') {
    text += "<span class='highVAL'>";  
    pos = x.substr(i+1).indexOf(c);
    if (pos == -1) {
      text += x.substr(i); 
      i = x.length;
    } else {
      text += x.substr(i, pos + 2);
      i += pos + 1;
    }  
    text += "</span>"
    continue;
  }
  if (lookAhead(x, i, 4) == "<br>") {
    i += 3;
    text += "<br>";
    continue
  }
  ele = lookWord(x, i);
  if (ele) {
    if (ele =="true" || ele == "false" || ele == "null" || isNaN(ele) == false) {  
      text += "<span class='highVAL'>" + x.substr(i,ele.length) + "</span>";
      i += ele.length - 1;
      status = "";
      continue;
    }
    for (k = 0; k < jsArr.length; k++) {
      if (ele == jsArr[k]) {
        text += "<span class='highELE'>" + x.substr(i,ele.length) + "</span>";
        i += ele.length - 1;
        status = "SPW";
        break;
      }  
    }
    if (status == "SPW") {
      status = "";
      continue;   
    } else {
      text += x.substr(i, ele.length);
      i += ele.length - 1;
      continue;
    }
  }
  text += c;
}
z.innerHTML = text;
}})();



var match = "[[send]] mail [[to]] {{alpha}}[ with ]*{{alpha|space}}"; //"([a-z]*)*"
var regex_str = match.replace(/{{[a-zA-Z\|]*}}/g, function($1) {
   
           console.log($1)
           var array = $1.replace(/{{([a-zA-Z|]*)}}/g,"$1").split("|");
           console.log(array);
           var rtrn = "";
           for(var i=0;i<array.length;i++) {
               if(array[i] == 'all')  return "([.*]+)*";
               if(array[i] == 'alpha')  rtrn += "a-zA-Z";
               if(array[i] == 'num')    rtrn += "0-9"
               if(array[i] == 'space')  rtrn += "\\s";
               if(array[i] == 'email')  return "([a-zA-Z0-9\_\-]+\@[a-zA-Z0-9\_]+\.[a-zA-Z0-9]+)";
           }
           console.log("rtrn=" + rtrn)
           rtrn = "([" + rtrn + "]*)";
           return rtrn;
  
});
var regex_str = regex_str.replace(/(\[\[([a-zA-Z]*)\]\](\s)*)/g, "[$2]*[$3]*");
console.log(regex_str)
var regex = new RegExp(regex_str, "i");

var str = "mail vinay";
var res_str = "Mail sent to {{$1}} with {{$2}}";
var matched = str.match(regex);
if(matched!=null) {
var response  = {module:{
                        id:1,
                        msg: parse_response(res_str, matched)
                        }
        };

console.log(response.module.msg)     

}             



  function parse_response (q, array) {
    console.log(array)
    var re_regex = q.replace(/{{\$([0-9]*)}}/gi, function($1) {
            return array[$1.replace(/[\}\{\$]*/g,'')];
    });

    return re_regex;

  }
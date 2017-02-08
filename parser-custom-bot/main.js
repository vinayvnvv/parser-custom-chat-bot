var match = "Good {{alpha}} {{alpha}}";
var regex_str = match.replace(/{{[a-z]*}}/g, "([a-z]*)*");
var regex_str = regex_str.replace(/(\[\[([a-z]*)\]\](\s)*)/g, "[$2]*[$3]*");
console.log(regex_str)
var regex = new RegExp(regex_str, "i");

var str = "Good morning vinay";
var matched = str.match(regex);
console.log(matched)
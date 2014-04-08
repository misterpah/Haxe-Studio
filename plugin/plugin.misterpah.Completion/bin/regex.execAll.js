RegExp.prototype.execAll = function(string) {
    var match = null;
    var matches = new Array();
    while (match = this.exec(string)) {
        var matchArray = [];
        for (i in match) {
            if (parseInt(i) == i) {
                matchArray.push(match[i]);
            }
        }
        matches.push(matchArray);
    }
    return matches;
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function regex_matchVar(txt)
{
return new RegExp("var (.*):(.*);","g").execAll(txt);
}

function regex_matchClass(txt)
{
return new RegExp("class\\s(\\w*)","g").execAll(txt);
}

function regex_matchPackage(txt)
{
return new RegExp("package\\s*(.*);","g").execAll(txt);
}

function regex_matchImport(txt)
{
return new RegExp("import\\s*(.*);","g").execAll(txt);
}

function regex_matchFunction(txt)
{
return new RegExp("function(.*)","g").execAll(txt);
}

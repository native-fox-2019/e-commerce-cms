
function addToForm(data){
    var form=new FormData();
      for(var i in data){
        var p=data[i];
        form.append(i,p);
      }
      return form;
}

module.exports={
    add:addToForm
}
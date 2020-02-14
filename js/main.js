// TOTAL DE LINKS

// variavel principal

var list = [
  {"desc":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do","link":"http://www.google.com"},
  {"desc":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do","link":"http://www.facebook.com"}

];

// listagem

function setList(list){
    var table = '<thead><tr><td>Description</td><td>Links</td></tr></thead><tbody>';
    for(var key in list){
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatLink(list[key].link) +'</td><td></td><td><button class="btn btn-default" onclick="setUpdate('+key+');" >Edit</button> <button onClick="deleteData('+key+')" class="btn btn-default"  >Delete</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    saveListStorage(list)
}

// formatando Description

function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}


// formatando Link

function formatLink(link){
  var str = link.toLowerCase();
  return str;
}

// Botão adicionar

function addData(){

  var desc = document.getElementById("desc").value;
  var link = document.getElementById("link").value;

  list.unshift({"desc":desc , "link":link});
  setList(list);
}

// BOTAO EDITAR e RESETAR


function setUpdate(id){
  var obj = list[id];
  document.getElementById("desc").value = obj.desc;
  document.getElementById("link").value = obj.link;
  document.getElementById("btnUpdate").style.display = "inline-block";
  document.getElementById("btnAdd").style.display = "none";
  document.getElementById("deleteAll").style.display = "none";
  document.getElementById("resetButton").style.display = "none";



  document.getElementById("inputIdUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

function resetForm(){
  document.getElementById("desc").value = "";
  document.getElementById("link").value = "";
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAdd").style.display = "inline-block";
  document.getElementById("resetButton").style.display = "inline-block";
  document.getElementById("deleteAll").style.display = "inline-block";

// BOTÃO SALVAR



// BOTÃO SALVAR

  document.getElementById("inputIdUpdate").innerHTML = "";
}

// BOTÃO SALVAR

function updateData(){
  var id = document.getElementById("idUpdate").value;
  var desc = document.getElementById("desc").value;
  var link = document.getElementById("link").value;

  list[id] = {"desc":desc, "link":link};
  resetForm();
  setList(list);
}

// BOTAO Delete

function deleteData(id){
  if(confirm("Tem certeza que deseja excluir ? ")){
    if (id === list.lenght - 1) {
        list.pop();
    }else if(id === 0 ){
        list.shift();
    }else{
      var arrAuxIni = list.slice(0,id);
      var arrAuxEnd = list.slice(id + 1);
      list = arrAuxIni.concat(arrAuxEnd)
    }
    setList(list);
  }
}

// BOTAO que delata a lista toda

function deleteForm(){
  if (confirm("Realmente deseja apagar toda a listagem ? ")) {
    list = [];
    setList(list);
  }
}

function saveListStorage(list){
      var jsonStr = JSON.stringify(list);
      localStorage.setItem("VENDAS",jsonStr);
}

function initListStorage(){
    var testList = localStorage.getItem("VENDAS");
    if(testList){
        list = JSON.parse(testList);
    }
  setList(list);
}
initListStorage();

let mode="noMMU"

let memory={
100:null,
200:null,
300:null,
400:null,
500:null,
600:null
}

let baseRegister={}

function setMode(selectedMode){

mode=selectedMode

resetRAM()

}

function executeProgram(){

let program=document.getElementById("program").value

let logical=parseInt(document.getElementById("logical").value)

let data=document.getElementById("data").value

if(program=="" || data=="" || isNaN(logical)){

alert("Please enter all fields")

return

}

translateAddress(program,logical,data)

}

function translateAddress(program,logical,data){

let physical

if(mode==="noMMU"){

physical=100

document.getElementById("translation").innerHTML=
"No Mapping<br>Logical "+logical+" → Physical "+physical

}

else{

if(!baseRegister[program]){

let bases=[100,200,300,400,500]

baseRegister[program]=bases[Math.floor(Math.random()*bases.length)]

}

physical=baseRegister[program]+logical*0

document.getElementById("translation").innerHTML=
"Logical "+logical+" → Physical "+physical

}

writeRAM(program,logical,data,physical)

}

function writeRAM(program,logical,data,address){

let row=document.getElementById("row"+address)

if(memory[address]!=null){

row.classList.add("overwriteRow")

}

memory[address]={program,logical,data}

row.cells[1].innerText=program
row.cells[2].innerText=logical
row.cells[3].innerText=data

}

function resetRAM(){

memory={
100:null,
200:null,
300:null,
400:null,
500:null,
600:null
}

baseRegister={}

let rows=[100,200,300,400,500,600]

for(let addr of rows){

let row=document.getElementById("row"+addr)

row.classList.remove("overwriteRow")

row.cells[1].innerText="-"
row.cells[2].innerText="-"
row.cells[3].innerText="-"

}

document.getElementById("translation").innerHTML="Waiting for address..."

}
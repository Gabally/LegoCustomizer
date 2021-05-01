/*
var canvas = document.getElementById("Editor");
var ctx = canvas.getContext('2d');
var coptions = document.getElementById("coptions");
var filebox = document.getElementById("uploadimage");
var txtCanvas = document.getElementById("cnvtxt");
var inputText = document.getElementById("inputText");
var fontsSelector = document.getElementById("fonts");
var placedStickers = document.getElementById("placedStickers");
var dimensionsSlider = document.getElementById("dimensions");
var changeColorText = document.getElementById("changeColorText");
var orderForm = document.getElementById("orderform");
var fontSizeSelector = document.getElementById("fontSize");
var obscurator = document.getElementById("obscurator");
ctx.canvas.width  = window.innerHeight - 170;
ctx.canvas.height = window.innerHeight - 170;

var SceneElements = new Object();
SceneElements["stickers"] = [];
var activeSticker = undefined;
dimensionsSlider.disabled = true;

var canvasOffset=offset(canvas);
var offsetX=canvasOffset.left;
var offsetY=canvasOffset.top;
var isDragging=false;
txtCanvas.style.fontSize = "25px";

var oldWidth;
var oldHeight;

var Front = new Image();
var Back = new Image();
var FrontMask = new Image();
var BackMask = new Image();

txtCanvas.getContext("2d").font = "30px Arial";

coptions.onchange = function ()
{
  let opt = coptions.value;
  switch (opt)
  {
    case "Stickers":
      document.getElementById("texteditor").style.display = "none";
      document.getElementById("stickerlist").style.display = "block";
      break;
    case "Text":
      document.getElementById("stickerlist").style.display = "none";
      document.getElementById("texteditor").style.display = "block";
      break;
  }
  let elements =document.getElementById("culo").getElementsByClassName("opt");
  for (let index = 0; index < elements.length; index++) {
    elements[index].style.display = "none";
  }
  
  document.getElementById(opt).style.display = "block"
}

inputText.onkeyup = function ()
{
  txtCanvas.getContext("2d").clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  txtCanvas.getContext("2d").textAlign = "center";
  txtCanvas.getContext("2d").fillText(inputText.value, txtCanvas.width/2, txtCanvas.height/2);
}

dimensionsSlider.oninput= function()
{
  if (activeSticker != undefined)
  {
    let IW = (SceneElements["stickers"][activeSticker].OGWidth/100) * dimensionsSlider.value;
    SceneElements["stickers"][activeSticker].Xpos = SceneElements["stickers"][activeSticker].Xpos +  ((SceneElements["stickers"][activeSticker].ImgWidth/2) - (IW/2));
    SceneElements["stickers"][activeSticker].ImgWidth = IW;
    let IH = (SceneElements["stickers"][activeSticker].OGHeigth/100) * dimensionsSlider.value;
    SceneElements["stickers"][activeSticker].Ypos = SceneElements["stickers"][activeSticker].Ypos  +  ((SceneElements["stickers"][activeSticker].ImgHeigth/2) - (IH/2));
    SceneElements["stickers"][activeSticker].ImgHeigth = IH;
    draw_everything();
  }
}


canvas.addEventListener("wheel", event => resize_by_wheel(event.deltaY));

function resize_by_wheel(deltaY)
{
  if (activeSticker != undefined)
  {
    let percentage = Math.round((SceneElements["stickers"][activeSticker].ImgHeigth*100)/SceneElements["stickers"][activeSticker].OGHeigth);
    if (deltaY >= 1)
    { 
      if (percentage > 5) 
      {
        let IW = (SceneElements["stickers"][activeSticker].OGWidth/100) * (percentage - 5);
        SceneElements["stickers"][activeSticker].Xpos = SceneElements["stickers"][activeSticker].Xpos +  ((SceneElements["stickers"][activeSticker].ImgWidth/2) - (IW/2));
        SceneElements["stickers"][activeSticker].ImgWidth = IW;
        let IH = (SceneElements["stickers"][activeSticker].OGHeigth/100) * (percentage - 5);
        SceneElements["stickers"][activeSticker].Ypos = SceneElements["stickers"][activeSticker].Ypos  +  ((SceneElements["stickers"][activeSticker].ImgHeigth/2) - (IH/2));
        SceneElements["stickers"][activeSticker].ImgHeigth = IH;
      }
    } else {
      if (percentage < 100)
      {
        let IW = (SceneElements["stickers"][activeSticker].OGWidth/100) * (percentage + 5);
        SceneElements["stickers"][activeSticker].Xpos = SceneElements["stickers"][activeSticker].Xpos +  ((SceneElements["stickers"][activeSticker].ImgWidth/2) - (IW/2));
        SceneElements["stickers"][activeSticker].ImgWidth = IW;
        let IH = (SceneElements["stickers"][activeSticker].OGHeigth/100) * (percentage + 5);
        SceneElements["stickers"][activeSticker].Ypos = SceneElements["stickers"][activeSticker].Ypos  +  ((SceneElements["stickers"][activeSticker].ImgHeigth/2) - (IH/2));
        SceneElements["stickers"][activeSticker].ImgHeigth = IH;
      }
    }
    percentage = Math.round((SceneElements["stickers"][activeSticker].ImgHeigth*100)/SceneElements["stickers"][activeSticker].OGHeigth);
    dimensionsSlider.value = percentage;
    draw_everything();
  }
}

fontsSelector.onchange = function ()
{
  let opt = fontsSelector.value;
  txtCanvas.getContext("2d").clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  txtCanvas.style.font = txtCanvas.getContext("2d").font;
  let nSize = txtCanvas.style.fontSize;
  switch (opt)
  {
    case "Arial":
      txtCanvas.getContext("2d").font = nSize + " Arial";
      break;
    
    case "Tahoma":
      txtCanvas.getContext("2d").font = nSize + " Tahoma";
      break;
    
    case "Calibri":
      txtCanvas.getContext("2d").font = nSize + " Calibri";
      break;

    case "Courier New":
      txtCanvas.getContext("2d").font = nSize + " Courier New";
      break;

    case "Impact":
      txtCanvas.getContext("2d").font = nSize + " Impact"; 
      break;
  }
  txtCanvas.getContext("2d").fillText(inputText.value, txtCanvas.width/2, txtCanvas.height/2);
}
*/

/*
fontSizeSelector.oninput = function ()
{
  txtCanvas.getContext("2d").clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  txtCanvas.style.font = txtCanvas.getContext("2d").font; 
  txtCanvas.style.fontSize = fontSizeSelector.value + "px";
  txtCanvas.getContext("2d").font = txtCanvas.style.font;
  txtCanvas.getContext("2d").fillText(inputText.value, txtCanvas.width/2, txtCanvas.height/2);
}
*/

/*
changeColorText.onchange = function ()
{
  txtCanvas.getContext("2d").clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

  txtCanvas.getContext('2d').fillStyle = changeColorText.value;
  
  txtCanvas.getContext("2d").fillText(inputText.value, txtCanvas.width/2, txtCanvas.height/2);
}
*/

function load_Front()
{
  let x = document.getElementById("coptions");
  let options = [];
  for (i = 0; i < x.length; i++) {
    options.push(x.options[i].value);
  }
  options.sort();
  document.getElementById(options[0]).style.display = "block";
  x.value = options[0];
  ImgHeigth = ctx.canvas.height;
  ImgWidth = ctx.canvas.height;
  oldWidth=ImgWidth;
  oldHeigth=ImgHeigth;
  Ypos = 0;
  Xpos = (ctx.canvas.width/2) - (ImgWidth/2);
  Front.onload = function(){
    load_Back();
  }
  Front.src = "/static/Front.png";
}

function load_Back()
{
  Back.onload = function(){
    load_front_mask();
  }
  Back.src = "/static/Back.png";
}

function load_front_mask()
{
  FrontMask.onload = function(){
    load_back_mask();
  }
  FrontMask.src = "/static/FrontMask.png";
}

function load_back_mask()
{
  BackMask.onload = function(){
    init_customizer();
  }
  BackMask.src = "/static/BackMask.png";
}


function offset(element)
{
  let a = element.getBoundingClientRect();

  return  { top: a.top + window.scrollY, left: a.left + window.scrollX, };
}

function draw_front(){
  ctx.drawImage(Front,Xpos, Ypos, ImgWidth, ImgHeigth);
}

function draw_back(){
  ctx.drawImage(Back,Xpos, Ypos, ImgWidth, ImgHeigth);
}

function draw_front_mask()
{
  ctx.drawImage(FrontMask,Xpos, Ypos, ImgWidth, ImgHeigth);
}

function draw_back_mask()
{
  ctx.drawImage(BackMask,Xpos, Ypos, ImgWidth, ImgHeigth);
}

/*
function draw_line(Xs, Ys, Xe, Ye)
{
  ctx.strokeStyle = "#5a9afa";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(Xs, Ys);
  ctx.lineTo(Xe, Ye);
  ctx.stroke();
}
*/

/*
function draw_sticker_outline(ImgObj)
{
  draw_line(ImgObj.Xpos,ImgObj.Ypos,ImgObj.Xpos+ImgObj.ImgWidth,ImgObj.Ypos);
  draw_line(ImgObj.Xpos,ImgObj.Ypos+ImgObj.ImgHeigth,ImgObj.Xpos,ImgObj.Ypos);
  draw_line(ImgObj.Xpos+ImgObj.ImgWidth,ImgObj.Ypos+ImgObj.ImgHeigth,ImgObj.Xpos+ImgObj.ImgWidth,ImgObj.Ypos);
  draw_line(ImgObj.Xpos,ImgObj.Ypos+ImgObj.ImgHeigth,ImgObj.Xpos+ImgObj.ImgWidth,ImgObj.Ypos+ImgObj.ImgHeigth);
}
*/

/*
function draw_everything()
{
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  if (SceneElements["cview"] == "F")
  {
    draw_front();
  } else {
    draw_back();
  }

  for(i = 0 ; i < SceneElements["stickers"].length ; i++)
  {
    if (SceneElements["stickers"][i].side == SceneElements["cview"])
    {
      ctx.drawImage(SceneElements["stickers"][i].image, SceneElements["stickers"][i].Xpos, SceneElements["stickers"][i].Ypos, SceneElements["stickers"][i].ImgWidth, SceneElements["stickers"][i].ImgHeigth);
    }
  }
  if (SceneElements["cview"] == "F")
  {
    draw_front_mask();
  } else {
    draw_back_mask();
  }
  if (activeSticker != undefined)
  {
    draw_sticker_outline(SceneElements["stickers"][activeSticker]);
  }
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(Xpos-1000, Ypos, 1000, 1000);
  ctx.fillRect(Xpos+ImgWidth, Ypos, 1000, 1000);
}
*/

function obscure_document()
{
  obscurator.style.display = "block";
}

function deobscure_document()
{
  obscurator.style.display = "none";
}

function show_order_dialog()
{
  obscure_document();
  orderForm.style.display = "block";
  document.getElementById("closeform").style.display = "block"
  let Images = send_to_print();
  document.getElementById("FrontPreview").src = Images.Front;
  document.getElementById("BackPreview").src = Images.Back;
  if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
    Images.Front = "SAFARI" + Images.Front;
    Images.Back = "SAFARI" + Images.Back;
  }
  document.getElementById("FB64").value = Images.Front;
  document.getElementById("BB64").value = Images.Back;
}

function close_order_dialog()
{
  deobscure_document();
  orderForm.style.display = "none";
  document.getElementById("closeform").style.display = "none"
}

/*
function add_new_sticker(ImgObject,w=(ImgObject.naturalWidth/3),h=(ImgObject.naturalHeight/3))
{
  let newImg = new Object();
  newImg.side =  SceneElements["cview"];
  newImg.image = ImgObject;
  newImg.Xpos = Xpos + (ImgWidth/2) - (w/2);
  newImg.Ypos = (ctx.canvas.height/2) - (h/2);
  newImg.ImgWidth = w;
  newImg.ImgHeigth = h;
  newImg.OGWidth  = w;
  newImg.OGHeigth = h;
  SceneElements["stickers"].push(newImg);
  activeSticker = SceneElements["stickers"].length - 1;
  dimensionsSlider.disabled = false;
  dimensionsSlider.value = 100;
  draw_everything();
  update_sticker_list();
}
*/

/*
function update_sticker_list()
{
  placedStickers.innerHTML = "";
  for(i = 0;i < SceneElements["stickers"].length;i++)
  {
    if (SceneElements["stickers"][i].side == SceneElements["cview"])
    {
      let tmpDiv = document.createElement("div");
      tmpDiv.className = "layer";
      tmpDiv.innerHTML = "Sticker " + (i+1);
      tmpDiv.setAttribute("onclick", "select_active_sticker(this, " + i + ")");
      if (activeSticker == i){
        tmpDiv.style.border = "3px solid #5a9afa"; 
      }
      let tmpSpan = document.createElement("span");
      tmpSpan.className = "delete";
      tmpSpan.innerHTML = "X";
      tmpSpan.setAttribute("onclick", "delete_sticker(" + i + ")");
      placedStickers.appendChild(tmpDiv);
      placedStickers.appendChild(tmpSpan);
    }
  }
}
*/
/*
function select_active_sticker(obj, n)
{
  activeSticker = n;
  dimensionsSlider.disabled = false;
  dimensionsSlider.value = (SceneElements["stickers"][activeSticker].ImgHeigth*100)/SceneElements["stickers"][activeSticker].OGHeigth;
  update_sticker_list();
  draw_everything();
}
*/

/*
function delete_sticker(n)
{
  SceneElements["stickers"].splice(n,1);
  activeSticker = undefined;
  dimensionsSlider.disabled = true;
  draw_everything();
  update_sticker_list();
}
*/
/*
function add_text()
{
  if (inputText.value != "")
  {
    let txtImageB64 = txtCanvas.toDataURL();
    let txtImage = new Image();
    txtImage.src = txtImageB64;
    txtImage.onload = function ()
    {
      add_new_sticker(txtImage, txtCanvas.width, txtCanvas.height);
    }
  }
}
*/

/*
try{
  filebox.onchange = function ()
  {
    let img = new Image();
    img.src = URL.createObjectURL(this.files[0]);
    img.onload= function ()
    {
      add_new_sticker(img, img.width, img.height);
    }
  }
}
catch (e) {
  console.log(e);
}
*/

/*
function handleMouseDown(e){
  canMouseX=parseInt(e.clientX-offsetX);
  canMouseY=parseInt(e.clientY-offsetY);
  // set the drag flag
  isDragging=true;
}
*/

/*
function handleMouseUp(e){
  canMouseX=parseInt(e.clientX-offsetX);
  canMouseY=parseInt(e.clientY-offsetY);
  // clear the drag flag
  isDragging=false;
}
*/

/*
function handleMouseOut(e){
  canMouseX=parseInt(e.clientX-offsetX);
  canMouseY=parseInt(e.clientY-offsetY);
  // user has left the canvas, so clear the drag flag
  isDragging=false;
}
*/

/*
function handleMouseMove(e){
  canMouseX=parseInt(e.clientX-offsetX);
  canMouseY=parseInt(e.clientY-offsetY);
  // if the drag flag is set, clear the canvas and draw the image
  if(isDragging){
      if (activeSticker != undefined)
      {
        SceneElements["stickers"][activeSticker].Xpos = (canMouseX - (SceneElements["stickers"][activeSticker].ImgWidth/2));
        SceneElements["stickers"][activeSticker].Ypos = (canMouseY - (SceneElements["stickers"][activeSticker].ImgHeigth/2));
        draw_everything();
      }
  }
}
*/

/*
canvas.addEventListener('mousedown',  e => handleMouseDown(e), false);
canvas.addEventListener('mousemove',e => handleMouseMove(e), false);
canvas.addEventListener('mouseup',e => handleMouseUp(e), false);
canvas.addEventListener('mouseout',e => handleMouseOut(e), false);
*/

function resize_canvas()
{
  let oldCanvasWidth  = ctx.canvas.height;
  let oldCanvasHeight = ctx.canvas.height;
  ctx.canvas.width  = window.innerHeight - 170; 
  ctx.canvas.height = window.innerHeight - 170;
  canvasOffset=offset(canvas);
  offsetX=canvasOffset.left;
  offsetY=canvasOffset.top;
  ImgHeigth = ctx.canvas.height;
  ImgWidth = ctx.canvas.height;
  for(i = 0 ; i < SceneElements["stickers"].length ; i++)
  {
      let wdh = SceneElements["stickers"][i].ImgWidth * (ImgWidth / oldWidth);
      let hgh = SceneElements["stickers"][i].ImgHeigth * (ImgHeigth / oldHeigth);
      let x = (SceneElements["stickers"][i].Xpos + (SceneElements["stickers"][i].ImgWidth / 2)) * (ctx.canvas.width / oldCanvasWidth);
      x -= (wdh/2);
      let y = (SceneElements["stickers"][i].Ypos + (SceneElements["stickers"][i].ImgHeigth / 2)) * (ctx.canvas.height / oldCanvasHeight);
      y -= (hgh/2);
      SceneElements["stickers"][i].ImgWidth = wdh;
      SceneElements["stickers"][i].ImgHeigth = hgh;
      SceneElements["stickers"][i].Xpos = x;
      SceneElements["stickers"][i].Ypos = y;
  }
  oldWidth=ImgWidth;
  oldHeigth=ImgHeigth;
  Ypos = 0;
  Xpos = (ctx.canvas.width/2) - (ImgWidth/2);
  draw_everything();
}

function init_customizer()
{
  SceneElements["cview"] = "F";
  draw_everything();
}

/*
function switch_view()
{
  activeSticker = undefined;
  dimensionsSlider.disabled = true;
  if (SceneElements["cview"] == "F")
  {
    SceneElements["cview"] = "B";
  } else {
    SceneElements["cview"] = "F";
  }
  draw_everything();
  update_sticker_list()
}
*/

/*
function send_to_print()
{
  //Front
  let tmpCnv = document.createElement("canvas");
  let tmpCtx = tmpCnv.getContext('2d');
  tmpCnv.width = Front.width;
  tmpCnv.height = Front.height;
  tmpCtx.drawImage(Front, 0, 0, Front.width, Front.height);
  for(i = 0;i < SceneElements["stickers"].length;i++)
  {
    if (SceneElements["stickers"][i].side == "F")
    {
      let wdh = (SceneElements["stickers"][i].ImgWidth * tmpCtx.canvas.width) / ImgWidth;
      let hgh = (SceneElements["stickers"][i].ImgHeigth * tmpCtx.canvas.height) / ImgHeigth;
      let x = (SceneElements["stickers"][i].Xpos + (SceneElements["stickers"][i].ImgWidth / 2)) * (tmpCtx.canvas.width / ctx.canvas.width);
      x -= (wdh/2);
      let y = (SceneElements["stickers"][i].Ypos + (SceneElements["stickers"][i].ImgHeigth / 2)) * (tmpCtx.canvas.height / ctx.canvas.height);
      y -= (hgh/2);
      tmpCtx.drawImage(SceneElements["stickers"][i].image, x, y, wdh, hgh);
    }
  }
  tmpCtx.drawImage(FrontMask, 0, 0, Front.width, Front.height);
  let FrontFinal = tmpCnv.toDataURL();
  //Back
  tmpCnv = document.createElement("canvas");
  tmpCtx = tmpCnv.getContext('2d');
  tmpCnv.width = Back.width;
  tmpCnv.height = Back.height;
  tmpCtx.drawImage(Front, 0, 0, Back.width, Back.height);
  for(i = 0;i < SceneElements["stickers"].length;i++)
  {
    if (SceneElements["stickers"][i].side == "B")
    {
      let wdh = (SceneElements["stickers"][i].ImgWidth * tmpCtx.canvas.width) / ImgWidth;
      let hgh = (SceneElements["stickers"][i].ImgHeigth * tmpCtx.canvas.height) / ImgHeigth;
      let x = (SceneElements["stickers"][i].Xpos + (SceneElements["stickers"][i].ImgWidth / 2)) * (tmpCtx.canvas.width / ctx.canvas.width);
      x -= (wdh/2);
      let y = (SceneElements["stickers"][i].Ypos + (SceneElements["stickers"][i].ImgHeigth / 2)) * (tmpCtx.canvas.height / ctx.canvas.height);
      y -= (hgh/2);
      tmpCtx.drawImage(SceneElements["stickers"][i].image, x, y, wdh, hgh);
    }
  }
  tmpCtx.drawImage(BackMask, 0, 0, Back.width, Back.height);
  let BackFinal = tmpCnv.toDataURL();
  return {Front: FrontFinal, Back: BackFinal};
}
*/

load_Front();
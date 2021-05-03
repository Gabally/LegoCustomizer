var app = new Vue({
    el: "#app",
    data: {
      aviableStickers: [
        {
          category: "Basic", stickers: [
            "png-dan_Tavola disegno 1.png",
            "png-dan1_Tavola disegno 1.png",
            "png-dan7_Tavola disegno 1.png",
            "png-dan8_Tavola disegno 1.png",
            "png-dan9_Tavola disegno 1.png"
          ]
        },
        {
          category: "Collo", stickers: [
            "png-dan2_Tavola disegno 1.png",
            "png-dan3_Tavola disegno 1.png",
            "png-dan4_Tavola disegno 2.png",
            "png-dan5_Tavola disegno 1.png",
            "png-dan6_Tavola disegno 1.png",
            "png-dan11_Tavola disegno 1.png",
            "png-dan12_Tavola disegno 1.png",
            "png-dan13_Tavola disegno 1.png"
          ]
        },
        {
          category: "Design Pezzi", stickers: [
            "brev1.png",
            "brev2.png",
            "brev3.png",
            "brev4.png",
            "brev5.png",
            "brev6.png"
          ]
        },
        {
          category: "Emoji", stickers: [
            "emoji1.png",
            "emoji2.png",
            "emoji3.png",
            "emoji4.png"
          ]
        },
        {
          category: "Fantasy", stickers: [
            "png-dan21_Tavola disegno 1.png",
            "png-dan22_Tavola disegno 1.png",
            "png-dan23_Tavola disegno 1.png",
            "png-dan25_Tavola disegno 1.png",
            "TEMPLATE png-dan2_Tavola disegno 1.png",
            "TEMPLATE png-dan4_Tavola disegno 1.png",
            "TEMPLATE png-dan6_Tavola disegno 1.png",
            "TEMPLATE png-dan8_Tavola disegno 1.png",
            "TEMPLATE png-dan31_Tavola disegno 1.png",
            "TEMPLATE png-dan34_Tavola disegno 1.png",
            "TEMPLATE png-dan39_Tavola disegno 1.png",
            "TEMPLATE png-dan40_Tavola disegno 1.png"
          ]
        },
        {
          category: "Love", stickers: [
            "2_Tavola disegno 1.png",
            "3_Tavola disegno 1.png",
            "4_Tavola disegno 1.png",
            "6_Tavola disegno 1.png",
            "png-dan10_Tavola disegno 1.png",
            "tem0_Tavola disegno 1.png",
            "tem4_Tavola disegno 1.png",
            "tem7_Tavola disegno 1.png",
            "TEMPLATE png-dan0_Tavola disegno 1.png",
            "TEMPLATE png-dan30_Tavola disegno 1.png"
          ]
        },
        {
          category: "Marchi Automobili", stickers: [
            "auto1.png",
            "auto2.png",
            "auto3.png",
            "auto4.png",
            "auto5.png",
            "auto6.png",
            "auto7.png",
            "auto8.png",
            "auto9.png",
            "auto10.png"
          ]
        },
        {
          category: "Social", stickers: [
            "social1.png",
            "social2.png",
            "social3.png",
            "social4.png",
            "social5.png",
            "social6.png",
            "social7.png",
            "social8.png"
          ]
        },
        {
          category: "Stagionali", stickers: [
            "1_Tavola disegno 1.png",
            "13_Tavola disegno 1.png",
            "png-dan16_Tavola disegno 1.png",
            "png-dan17_Tavola disegno 1.png",
            "png-dan18_Tavola disegno 1.png",
            "tem_Tavola disegno 1.png",
            "tem1_Tavola disegno 1.png",
            "TEMPLATE png-dan1_Tavola disegno 1.png"

          ]
        }
      ],
      selectedCategory: "Basic",
      appliedStickers: [],
      canvas: null,
      ctx: null,
      activeSticker: null,
      side: "F",
      canMouseX: 0,
      canMouseY: 0,
      isDragging: false,
      front: new Image(),
      back: new Image(),
      frontMask: new Image(),
      backMask: new Image(),
      isCart: false,
      fFront: null,
      fBack: null,
      showForm: false,
      sStats: {
        WAITING: "W",
        LOADING: "L",
        ERROR: "E",
        SUCCESS: "S"
      },
      submitStatus: "W",
      email: null,
      name: null,
      phone: null,
      notes: null
    },
    mounted: function () {
      this.front.src = "/public/imgs/Front.png";
      this.back.src = "/public/imgs/Back.png";
      this.frontMask.src = "/public/imgs/FrontMask.png";
      this.frontMask.onload = () => {
        this.repaint();
      };
      this.backMask.src = "/public/imgs/BackMask.png";
      this.canvas = this.$refs.canvas;
      this.canvas.width = 1199;
      this.canvas.height = 1199;
      let ctx = this.canvas.getContext("2d");
      this.ctx = ctx;
    },
    methods: {
      getMousePos(evt) {
        let ClientRect = this.canvas.getBoundingClientRect(), 
        scaleX = this.canvas.width / ClientRect.width,
        scaleY = this.canvas.height / ClientRect.height; 
        return {
          x: (evt.clientX - ClientRect.left) * scaleX, 
          y: (evt.clientY - ClientRect.top) * scaleY 
        }
      },
      drawFront()
      {
        this.ctx.drawImage(this.front, 0, 0);
      },
      drawBack()
      {
        this.ctx.drawImage(this.back, 0, 0);
      },
      drawFrontMask()
      {
        this.ctx.drawImage(this.frontMask, 0, 0);
      },
      drawBackMask()
      {
        this.ctx.drawImage(this.backMask, 0, 0);
      },
      updateTextRender() {
        let ctx = this.$refs.cnvtxt.getContext("2d");
        let w = this.$refs.cnvtxt.width;
        let h = this.$refs.cnvtxt.height;
        ctx.clearRect(0, 0, w, h);
        ctx.textAlign = "center";
        ctx.fillText(this.$refs.inputText.value, w/2, h/2);
      },
      resizeSticker(e)
      {
        if(this.activeSticker != null)
        {
          let val = e.srcElement.value;
          let IW = (this.appliedStickers[this.activeSticker].OGWidth/100)* val;
          this.appliedStickers[this.activeSticker].Xpos = this.appliedStickers[this.activeSticker].Xpos +  ((this.appliedStickers[this.activeSticker].ImgWidth/2) - (IW/2));
          this.appliedStickers[this.activeSticker].ImgWidth = IW;
          let IH = (this.appliedStickers[this.activeSticker].OGHeigth/100) * val;
          this.appliedStickers[this.activeSticker].Ypos = this.appliedStickers[this.activeSticker].Ypos  +  ((this.appliedStickers[this.activeSticker].ImgHeigth/2) - (IH/2));
          this.appliedStickers[this.activeSticker].ImgHeigth = IH;
          this.repaint();
        }
      },
      resize_by_wheel(e)
      {
        let deltaY = e.deltaY;
        if (this.activeSticker != null)
        {
          let percentage = Math.round((this.appliedStickers[this.activeSticker].ImgHeigth*100)/this.appliedStickers[this.activeSticker].OGHeigth);
          if (deltaY >= 1)
          { 
            if (percentage > 3) 
            {
              let IW = (this.appliedStickers[this.activeSticker].OGWidth/100) * (percentage - 3);
              this.appliedStickers[this.activeSticker].Xpos = this.appliedStickers[this.activeSticker].Xpos +  ((this.appliedStickers[this.activeSticker].ImgWidth/2) - (IW/2));
              this.appliedStickers[this.activeSticker].ImgWidth = IW;
              let IH = (this.appliedStickers[this.activeSticker].OGHeigth/100) * (percentage - 3);
              this.appliedStickers[this.activeSticker].Ypos = this.appliedStickers[this.activeSticker].Ypos  +  ((this.appliedStickers[this.activeSticker].ImgHeigth/2) - (IH/2));
              this.appliedStickers[this.activeSticker].ImgHeigth = IH;
            }
          } else {
            if (percentage < 100)
            {
              let IW = (this.appliedStickers[this.activeSticker].OGWidth/100) * (percentage + 3);
              this.appliedStickers[this.activeSticker].Xpos = this.appliedStickers[this.activeSticker].Xpos +  ((this.appliedStickers[this.activeSticker].ImgWidth/2) - (IW/2));
              this.appliedStickers[this.activeSticker].ImgWidth = IW;
              let IH = (this.appliedStickers[this.activeSticker].OGHeigth/100) * (percentage + 3);
              this.appliedStickers[this.activeSticker].Ypos = this.appliedStickers[this.activeSticker].Ypos  +  ((this.appliedStickers[this.activeSticker].ImgHeigth/2) - (IH/2));
              this.appliedStickers[this.activeSticker].ImgHeigth = IH;
            }
          }
          percentage = Math.round((this.appliedStickers[this.activeSticker].ImgHeigth*100)/this.appliedStickers[this.activeSticker].OGHeigth);
          this.$refs.dimensionsSlider.value = percentage;
          this.repaint();
        }
      },
      setTextFont(e)
      {
        let opt = e.srcElement.value;
        let ctx = this.$refs.cnvtxt.getContext("2d");
        let w = this.$refs.cnvtxt.width;
        let h = this.$refs.cnvtxt.height;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.$refs.cnvtxt.style.font = ctx.font;
        let nSize = this.$refs.cnvtxt.style.fontSize;
        switch (opt)
        {
          case "Arial":
            ctx.font = nSize + " Arial";
            break;
          
          case "Tahoma":
            ctx.font = nSize + " Tahoma";
            break;
          
          case "Calibri":
            ctx.font = nSize + " Calibri";
            break;

          case "Courier New":
            ctx.font = nSize + " Courier New";
            break;

          case "Impact":
            ctx.font = nSize + " Impact"; 
            break;
        }
        ctx.fillText(this.$refs.inputText.value, w/2, h/2);
      },
      setFontSize(e)
      {
        let opt = e.srcElement.value;
        let ctx = this.$refs.cnvtxt.getContext("2d");
        let w = this.$refs.cnvtxt.width;
        let h = this.$refs.cnvtxt.height;
        ctx.clearRect(0, 0, w, h);
        ctx.canvas.style.font = ctx.font; 
        ctx.canvas.style.fontSize = opt + "px";
        ctx.font =  ctx.canvas.style.font;
        ctx.fillText(this.$refs.inputText.value, w/2, h/2);
      },
      setFontColor(e)
      {
        let opt = e.srcElement.value;
        let ctx = this.$refs.cnvtxt.getContext("2d");
        let w = this.$refs.cnvtxt.width;
        let h = this.$refs.cnvtxt.height;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = opt;
        ctx.fillText(this.$refs.inputText.value, w/2, h/2);
      },
      drawLine(Xs, Ys, Xe, Ye)
      {
        this.ctx.strokeStyle = "#5a9afa";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(Xs, Ys);
        this.ctx.lineTo(Xe, Ye);
        this.ctx.stroke();
      },
      drawStickerOutline(ImgObj)
      {
        this.drawLine(ImgObj.Xpos, ImgObj.Ypos, ImgObj.Xpos+ImgObj.ImgWidth, ImgObj.Ypos);
        this.drawLine(ImgObj.Xpos, ImgObj.Ypos+ImgObj.ImgHeigth, ImgObj.Xpos, ImgObj.Ypos);
        this.drawLine(ImgObj.Xpos+ImgObj.ImgWidth, ImgObj.Ypos+ImgObj.ImgHeigth ,ImgObj.Xpos+ImgObj.ImgWidth, ImgObj.Ypos);
        this.drawLine(ImgObj.Xpos, ImgObj.Ypos+ImgObj.ImgHeigth, ImgObj.Xpos+ImgObj.ImgWidth, ImgObj.Ypos+ImgObj.ImgHeigth);
      },
      repaint()
      {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.side == "F")
        {
          this.drawFront();
        } else {
          this.drawBack();
        }

        for(i = 0; i < this.appliedStickers.length; i++)
        {
          if (this.appliedStickers[i].side == this.side)
          {
            this.ctx.drawImage(this.appliedStickers[i].image, this.appliedStickers[i].Xpos, this.appliedStickers[i].Ypos, this.appliedStickers[i].ImgWidth, this.appliedStickers[i].ImgHeigth);
          }
        }
        if (this.side == "F")
        {
          this.drawFrontMask();
        } else {
          this.drawBackMask();
        }
        if (this.activeSticker != null)
        {
          this.drawStickerOutline(this.appliedStickers[this.activeSticker]);
        }
        this.ctx.fillStyle = "#FFFFFF";
      },
      addNewSticker(ImgObject)
      {
        let newImg = new Object();
        newImg.side =  this.side;
        newImg.image = ImgObject.cloneNode();
        newImg.ImgWidth = ImgObject.width * 4;
        newImg.ImgHeigth = ImgObject.height * 4;
        newImg.OGWidth  = ImgObject.width * 4;
        newImg.OGHeigth = ImgObject.height * 4;
        newImg.Xpos = (this.canvas.width/2) - (newImg.ImgWidth/2);
        newImg.Ypos = (this.canvas.height/2) - (newImg.ImgHeigth/2);
        this.appliedStickers.push(newImg);
        this.activeSticker = this.appliedStickers.length - 1;
        this.$refs.dimensionsSlider.disabled = false;
        this.$refs.dimensionsSlider.value = 100;
        this.repaint();
      },
      selectActiveSticker(n)
      {
        this.activeSticker = n;
        this.$refs.dimensionsSlider.value = (this.appliedStickers[this.activeSticker].ImgHeigth*100)/this.appliedStickers[this.activeSticker].OGHeigth;
        this.repaint();
      },
      deleteSticker(n)
      {
        this.appliedStickers.splice(n,1);
        this.activeSticker = null;
        this.$refs.dimensionsSlider.value = 0;
        this.$refs.dimensionsSlider.disabled = true;
        this.repaint();
      },
      addText()
      {
        if (this.$refs.inputText.value !== "")
        {
          let txtImage = new Image();
          txtImage.src = this.$refs.cnvtxt.toDataURL();
          txtImage.onload = () => {
            this.addNewSticker(txtImage);
          }
        }
      },
      imgUploadChange(e)
      {
          let img = new Image();
          img.src = URL.createObjectURL(e.srcElement.files[0]);
          img.onload= () => {
            this.addNewSticker(img);
          }
      },
      handleMouseDown(e){
        let pos = this.getMousePos(e);
        this.canMouseX = pos.x;
        this.canMouseY = pos.y;
        this.isDragging = true;
      },
      handleMouseUp(e){
        let pos = this.getMousePos(e);
        this.canMouseX = pos.x;
        this.canMouseY = pos.y;
        this.isDragging = false;
      },
      handleMouseOut(e){
        let pos = this.getMousePos(e);
        this.canMouseX = pos.x;
        this.canMouseY = pos.y;
        this.isDragging = false;
      },
      handleMouseMove(e){
        let pos = this.getMousePos(e);
        this.canMouseX = pos.x;
        this.canMouseY = pos.y;
        if(this.isDragging){
            if (this.activeSticker != null)
            {
              this.appliedStickers[this.activeSticker].Xpos = (this.canMouseX - (this.appliedStickers[this.activeSticker].ImgWidth/2));
              this.appliedStickers[this.activeSticker].Ypos = (this.canMouseY - (this.appliedStickers[this.activeSticker].ImgHeigth/2));
              this.repaint();
            }
        }
      },
      switchView()
      {
        this.activeSticker = null;
        this.$refs.dimensionsSlider.disabled = true;
        if (this.side == "F")
        {
          this.side = "B";
        } else {
          this.side = "F";
        }
        this.repaint();
      },
      stickerFromImg(e)
      {
        this.addNewSticker(e.target);
      },
      changeCart(e)
      {
        let el = e.srcElement;
        if (this.isCart)
        {
          el.src = "/public/imgs/cart-outline.svg";
        }
        else
        {
          el.src = "/public/imgs/cart-arrow-down.svg";
        }
        this.isCart = !this.isCart;
      },
      showFormAndRender()
      {
        this.submitStatus = this.sStats.WAITING;
        let oldSide = this.side;
        let oldActive = this.activeSticker;
        this.activeSticker = null;
        this.side = "F";
        this.repaint();
        this.fFront = this.canvas.toDataURL("image/png");
        this.side = "B";
        this.repaint();
        this.fBack = this.canvas.toDataURL("image/png");
        this.side = oldSide;
        this.activeSticker = oldActive;
        this.repaint();
        this.showForm = true; 
      },
      submitTorso()
      {
        this.submitStatus = this.sStats.LOADING;
        fetch("/api/submitminifig", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.email,
            name: this.name,
            phone: this.phone,
            notes: this.notes,
            front: this.fFront,
            back: this.fBack
          })
        }).then(response => {
          if (response.status == 201)
          {
            this.submitStatus = this.sStats.SUCCESS;
          }
          else
          {
            this.submitStatus = this.sStats.ERROR;
          }
        }).catch(e => {
          this.submitStatus = this.sStats.ERROR;
        });
      }
    }
});
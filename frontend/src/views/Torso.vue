<template>
  <div id="c-app">
    <div id="logo">
      <img src="@/assets/imgs/torso-logo.png" id="logoimg" alt="Custom Torso Generator">
    </div>
    <div id="Editor">
      <canvas id="mainCanvas" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseout="handleMouseOut"
        @mousemove="handleMouseMove" @wheel="resizeByWheel" ref="canvas">
        Your browser doesn't include support for the canvas element.
      </canvas>
    </div>
    <div id="layermenu">
      <h3>Stickers</h3>
      <div id="placedStickers">
        <div v-for="(el, index) in appliedStickers" @click="selectActiveSticker(index)">
          <div class="layer" :class="{ stickerselected: activeSticker == index }" v-if="el.side == side">
            Sticker {{ index + 1 }}
            <img class="sticker-icon" :src="el.image.src" alt="">
            <button v-if="el.side == side" @click="deleteSticker(index)" class="delete">
              <img src="@/assets/imgs/buttons/delete.svg" alt=""></button>
          </div>
        </div>
      </div>
    </div>
    <div id="sidemenu">
      <div id="sidemenuheader">
        <h3>Opzioni Personalizzazione</h3>
        <select name="cars" class="selector" v-model="selectedCategory">
          <option value="Testo">Testo</option>
          <option v-for="category in stickers" :value="category.category">{{ category.category }} </option>
        </select>
      </div>
      <div id="culo">
        <canvas-text-editor @txt="addNewSticker" class="opt" id="Testo" v-if="selectedCategory == 'Testo'"></canvas-text-editor>
        <div class="opt" v-else>
          <img v-for="sticker in stickers.find(e => e.category == selectedCategory).stickers"
            :src="'imgs/stickers/' + selectedCategory + '/' + sticker" @click="stickerFromImg" class="defaultsticker"
            alt="">
          <label for="uploadimage" id="imulabel">
            <div id="addimg">
              <input type="file" name="img" @change="imgUploadChange" size="65" id="uploadimage" />
              +
            </div>
          </label>
        </div>
      </div>
    </div>
    <order-form @close="showForm = false" :imagePreviews="previews" :formData="formData" :submitURL="api.SUBMIT_TORSO"
      v-if="showForm"></order-form>
    <div id="obscurator" v-if="showForm">
    </div>
    <div class="tool" id="d-slider">
      <input type="range" @input="resizeSticker" ref="dimensionsSlider" id="dimensions" value="100" name="dslider"
        min="5" max="100">
    </div>
    <div class="tool" id="r-button">
      <img src="@/assets/imgs/buttons/rotate.svg" alt="" @click="switchView" width="80" height="60" id="btnRotate">
    </div>
    <div class="tool" id="o-button">
      <input type="image" id="openform" @click="showFormAndRender" @mouseover="changeCart" @mouseleave="changeCart"
        src="imgs/cart-outline.svg" alt="">
    </div>
  </div>
</template>

<script>
import stickers from "@/assets/stickers.json";
import { loadImage } from "@/utils";

import orderForm from "@/components/orderForm.vue";
import CanvasTextEditor from "@/components/CanvasTextEditor.vue";

import "@/assets/customizers.css";

export default {
  name: "torso",
  inject: ["api"],
  components: {
    orderForm,
    CanvasTextEditor
  },
  data() {
    return {
      stickers: stickers,
      selectedCategory: "Basic",
      appliedStickers: [],
      canvas: null,
      ctx: null,
      activeSticker: null,
      side: "F",
      canMouseX: 0,
      canMouseY: 0,
      isDragging: false,
      front: null,
      back: null,
      frontMask: null,
      backMask: null,
      isCart: false,
      showForm: false,
      ready: false,
      previews: [],
      formData: {}
    }
  },
  async mounted() {
    this.front = await loadImage("imgs/torso/Front.png");
    this.back = await loadImage("imgs/torso/Back.png");
    this.frontMask = await loadImage("imgs/torso/FrontMask.png");
    this.backMask = await loadImage("imgs/torso/BackMask.png");
    this.canvas = this.$refs.canvas;
    this.canvas.width = 1199;
    this.canvas.height = 1199;
    this.ctx = this.canvas.getContext("2d");
    this.repaint();
    this.ready = true;
  },
  methods: {
    getMousePos(evt) {
      if (!this.ready) { return }
      let ClientRect = this.canvas.getBoundingClientRect(),
        scaleX = this.canvas.width / ClientRect.width,
        scaleY = this.canvas.height / ClientRect.height;
      return {
        x: (evt.clientX - ClientRect.left) * scaleX,
        y: (evt.clientY - ClientRect.top) * scaleY
      }
    },
    drawImgCenter(img) {
      let width = this.canvas.width;
      let height = this.canvas.width / (img.width / img.height);
      this.ctx.drawImage(img, this.canvas.width / 2 - width / 2, this.canvas.height / 2 - height / 2, width, height);
    },
    resizeSticker(e) {
      if (!this.ready) { return }
      if (this.activeSticker != null) {
        let val = e.srcElement.value;
        let IW = (this.appliedStickers[this.activeSticker].OGWidth / 100) * val;
        this.appliedStickers[this.activeSticker].Xpos = this.appliedStickers[this.activeSticker].Xpos + ((this.appliedStickers[this.activeSticker].ImgWidth / 2) - (IW / 2));
        this.appliedStickers[this.activeSticker].ImgWidth = IW;
        let IH = (this.appliedStickers[this.activeSticker].OGHeigth / 100) * val;
        this.appliedStickers[this.activeSticker].Ypos = this.appliedStickers[this.activeSticker].Ypos + ((this.appliedStickers[this.activeSticker].ImgHeigth / 2) - (IH / 2));
        this.appliedStickers[this.activeSticker].ImgHeigth = IH;
        this.repaint();
      }
    },
    resizeByWheel(e) {
      if (!this.ready) { return }
      let deltaY = e.deltaY;
      if (this.activeSticker != null) {
        let percentage = Math.round((this.appliedStickers[this.activeSticker].ImgHeigth * 100) / this.appliedStickers[this.activeSticker].OGHeigth);
        if (deltaY >= 1) {
          if (percentage > 3) {
            let IW = (this.appliedStickers[this.activeSticker].OGWidth / 100) * (percentage - 3);
            this.appliedStickers[this.activeSticker].Xpos = this.appliedStickers[this.activeSticker].Xpos + ((this.appliedStickers[this.activeSticker].ImgWidth / 2) - (IW / 2));
            this.appliedStickers[this.activeSticker].ImgWidth = IW;
            let IH = (this.appliedStickers[this.activeSticker].OGHeigth / 100) * (percentage - 3);
            this.appliedStickers[this.activeSticker].Ypos = this.appliedStickers[this.activeSticker].Ypos + ((this.appliedStickers[this.activeSticker].ImgHeigth / 2) - (IH / 2));
            this.appliedStickers[this.activeSticker].ImgHeigth = IH;
          }
        } else {
          if (percentage < 100) {
            let IW = (this.appliedStickers[this.activeSticker].OGWidth / 100) * (percentage + 3);
            this.appliedStickers[this.activeSticker].Xpos = this.appliedStickers[this.activeSticker].Xpos + ((this.appliedStickers[this.activeSticker].ImgWidth / 2) - (IW / 2));
            this.appliedStickers[this.activeSticker].ImgWidth = IW;
            let IH = (this.appliedStickers[this.activeSticker].OGHeigth / 100) * (percentage + 3);
            this.appliedStickers[this.activeSticker].Ypos = this.appliedStickers[this.activeSticker].Ypos + ((this.appliedStickers[this.activeSticker].ImgHeigth / 2) - (IH / 2));
            this.appliedStickers[this.activeSticker].ImgHeigth = IH;
          }
        }
        percentage = Math.round((this.appliedStickers[this.activeSticker].ImgHeigth * 100) / this.appliedStickers[this.activeSticker].OGHeigth);
        this.$refs.dimensionsSlider.value = percentage;
        this.repaint();
      }
    },
    drawLine(Xs, Ys, Xe, Ye) {
      this.ctx.save();
      this.ctx.strokeStyle = "#8e9091";
      this.ctx.lineWidth = 3;
      this.ctx.setLineDash([20, 5]);
      this.ctx.beginPath();
      this.ctx.moveTo(Xs, Ys);
      this.ctx.lineTo(Xe, Ye);
      this.ctx.stroke();
      this.ctx.restore();
    },
    drawPoint(x, y, radius) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = "#fcfcfc";
      this.ctx.fill();
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = '#bdbdbd';
      this.ctx.stroke();
    },
    drawStickerOutline(ImgObj) {
      this.drawLine(ImgObj.Xpos, ImgObj.Ypos, ImgObj.Xpos + ImgObj.ImgWidth, ImgObj.Ypos);
      this.drawLine(ImgObj.Xpos, ImgObj.Ypos + ImgObj.ImgHeigth, ImgObj.Xpos, ImgObj.Ypos);
      this.drawLine(ImgObj.Xpos + ImgObj.ImgWidth, ImgObj.Ypos + ImgObj.ImgHeigth, ImgObj.Xpos + ImgObj.ImgWidth, ImgObj.Ypos);
      this.drawLine(ImgObj.Xpos, ImgObj.Ypos + ImgObj.ImgHeigth, ImgObj.Xpos + ImgObj.ImgWidth, ImgObj.Ypos + ImgObj.ImgHeigth);

      this.drawPoint(ImgObj.Xpos, ImgObj.Ypos, 10);
      this.drawPoint(ImgObj.Xpos, ImgObj.Ypos + ImgObj.ImgHeigth, 10);
      this.drawPoint(ImgObj.Xpos + ImgObj.ImgWidth, ImgObj.Ypos + ImgObj.ImgHeigth, 10);
      this.drawPoint(ImgObj.Xpos + ImgObj.ImgWidth, ImgObj.Ypos, 10);
    },
    repaint() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.side == "F" ? this.drawImgCenter(this.front) : this.drawImgCenter(this.back);
      for (let i = 0; i < this.appliedStickers.length; i++) {
        if (this.appliedStickers[i].side == this.side) {
          this.ctx.drawImage(this.appliedStickers[i].image, this.appliedStickers[i].Xpos, this.appliedStickers[i].Ypos, this.appliedStickers[i].ImgWidth, this.appliedStickers[i].ImgHeigth);
        }
      }
      this.side == "F" ? this.drawImgCenter(this.frontMask) : this.drawImgCenter(this.backMask);
      if (this.activeSticker != null) {
        this.drawStickerOutline(this.appliedStickers[this.activeSticker]);
      }
      this.ctx.fillStyle = "#FFFFFF";
    },
    addNewSticker(ImgObject) {
      let newImg = new Object();
      newImg.side = this.side;
      newImg.image = ImgObject.cloneNode();
      newImg.ImgWidth = ImgObject.width * 4;
      newImg.ImgHeigth = ImgObject.height * 4;
      newImg.OGWidth = ImgObject.width * 4;
      newImg.OGHeigth = ImgObject.height * 4;
      newImg.Xpos = (this.canvas.width / 2) - (newImg.ImgWidth / 2);
      newImg.Ypos = (this.canvas.height / 2) - (newImg.ImgHeigth / 2);
      this.appliedStickers.push(newImg);
      this.activeSticker = this.appliedStickers.length - 1;
      this.$refs.dimensionsSlider.disabled = false;
      this.$refs.dimensionsSlider.value = 100;
      this.repaint();
    },
    selectActiveSticker(n) {
      this.activeSticker = n;
      this.$refs.dimensionsSlider.value = (this.appliedStickers[this.activeSticker].ImgHeigth * 100) / this.appliedStickers[this.activeSticker].OGHeigth;
      this.repaint();
    },
    deleteSticker(n) {
      this.appliedStickers.splice(n, 1);
      this.activeSticker = null;
      this.$refs.dimensionsSlider.value = 0;
      this.$refs.dimensionsSlider.disabled = true;
      this.repaint();
    },
    imgUploadChange(e) {
      let img = new Image();
      img.src = URL.createObjectURL(e.srcElement.files[0]);
      img.onload = () => {
        this.addNewSticker(img);
      }
    },
    handleMouseDown(e) {
      if (!this.ready) { return }
      let pos = this.getMousePos(e);
      this.canMouseX = pos.x;
      this.canMouseY = pos.y;
      this.isDragging = true;
    },
    handleMouseUp(e) {
      if (!this.ready) { return }
      let pos = this.getMousePos(e);
      this.canMouseX = pos.x;
      this.canMouseY = pos.y;
      this.isDragging = false;
    },
    handleMouseOut(e) {
      if (!this.ready) { return }
      let pos = this.getMousePos(e);
      this.canMouseX = pos.x;
      this.canMouseY = pos.y;
      this.isDragging = false;
    },
    handleMouseMove(e) {
      if (!this.ready) { return }
      let pos = this.getMousePos(e);
      this.canMouseX = pos.x;
      this.canMouseY = pos.y;
      if (this.isDragging) {
        if (this.activeSticker != null) {
          this.appliedStickers[this.activeSticker].Xpos = (this.canMouseX - (this.appliedStickers[this.activeSticker].ImgWidth / 2));
          this.appliedStickers[this.activeSticker].Ypos = (this.canMouseY - (this.appliedStickers[this.activeSticker].ImgHeigth / 2));
          this.repaint();
        }
      }
    },
    switchView() {
      this.activeSticker = null;
      this.$refs.dimensionsSlider.disabled = true;
      this.side == "F" ? this.side = "B" : this.side = "F";
      this.repaint();
    },
    stickerFromImg(e) {
      if (!this.ready) { return }
      this.addNewSticker(e.target);
    },
    changeCart(e) {
      let el = e.srcElement;
      this.isCart ? el.src = "imgs/cart-outline.svg" : el.src = "imgs/cart-arrow-down.svg";
      this.isCart = !this.isCart;
    },
    showFormAndRender() {
      let oldSide = this.side;
      let oldActive = this.activeSticker;
      this.activeSticker = null;
      this.side = "F";
      this.repaint();
      this.previews = [];
      const front = this.canvas.toDataURL("image/png");
      this.previews.push(front);
      this.formData["front"] = front;
      this.side = "B";
      this.repaint();
      const back = this.canvas.toDataURL("image/png");
      this.previews.push(back);
      this.formData["back"] = back;
      this.side = oldSide;
      this.activeSticker = oldActive;
      this.repaint();
      this.showForm = true;
    }
  }
}
</script>
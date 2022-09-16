<template>
    <div class="opt" id="Testo">
        <h3>Preview</h3>
        <canvas ref="cnvtxt" id="cnvtxt">
            Your browser doesn't include support for the canvas element.
        </canvas>
        <br>
        <button class="addbutton" @click="addText">+</button><br><br>
        Testo
        <br>
        <input type="text" ref="inputText" @keyup="updateTextRender" class="textfield"><br><br>
        Font
        <br>
        <select name="fonts" @change="setTextFont" class="selector">
            <option value="Arial">Arial</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Calibri">Calibri</option>
            <option value="Courier New">Courier New</option>
            <option value="Impact">Impact</option>
        </select>
        <br><br><br>
        <div style="display: flex;">
            <div style="width: 50%;">
                <span>Dimensione</span>
                <br>
                <input type="number" v-model="fontSize" name="fs" @input="setFontSize" min="1" ref="fontSizeSelector"
                    id="fontSize">
            </div>
            <div style="width: 50%;">
                <span>Colore</span>
                <br>
                <input type="color" @change="setFontColor" id="changeColorText">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CanvasTextEditor",
    data() {
        return {
            fontSize: 30
        }
    },
    mounted() {
        this.setFontSize();
    },  
    methods: {
        updateTextRender() {
            let ctx = this.$refs.cnvtxt.getContext("2d");
            let w = this.$refs.cnvtxt.width;
            let h = this.$refs.cnvtxt.height;
            ctx.clearRect(0, 0, w, h);
            ctx.textAlign = "center";
            ctx.fillText(this.$refs.inputText.value, w / 2, h / 2);
        },
        setTextFont(e) {
            let opt = e.srcElement.value;
            let ctx = this.$refs.cnvtxt.getContext("2d");
            let w = this.$refs.cnvtxt.width;
            let h = this.$refs.cnvtxt.height;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this.$refs.cnvtxt.style.font = ctx.font;
            let nSize = this.$refs.cnvtxt.style.fontSize;
            switch (opt) {
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
            ctx.fillText(this.$refs.inputText.value, w / 2, h / 2);
        },
        setFontSize() {
            let ctx = this.$refs.cnvtxt.getContext("2d");
            let w = this.$refs.cnvtxt.width;
            let h = this.$refs.cnvtxt.height;
            ctx.clearRect(0, 0, w, h);
            ctx.canvas.style.font = ctx.font;
            ctx.canvas.style.fontSize = this.fontSize + "px";
            ctx.font = ctx.canvas.style.font;
            ctx.fillText(this.$refs.inputText.value, w / 2, h / 2);
        },
        setFontColor(e) {
            let opt = e.srcElement.value;
            let ctx = this.$refs.cnvtxt.getContext("2d");
            let w = this.$refs.cnvtxt.width;
            let h = this.$refs.cnvtxt.height;
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = opt;
            ctx.fillText(this.$refs.inputText.value, w / 2, h / 2);
        },
        addText() {
            if (this.$refs.inputText.value !== "") {
                let txtImage = new Image();
                txtImage.src = this.$refs.cnvtxt.toDataURL();
                txtImage.onload = () => {
                    this.$emit("txt", txtImage);
                    //this.addNewSticker(txtImage);
                }
            }
        }
    }
}
</script>

<style scoped>
.textfield {
    font-family: 'Mulish', sans-serif;
    margin-top: 10px;
    font-size: 16px;
    background-color: rgba(230, 223, 223, 0.473);
    color: black;
    outline: none;
    border: none;
    padding: 3px;
    border: 1px solid rgb(80, 79, 79);
    border-radius: 3px;
}
</style>
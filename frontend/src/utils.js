
export const loadImage = async (url) => {
    return new Promise((resolve, reject) => {
        let img = document.createElement("img");
        img.onload = () => { resolve(img) };
        img.onerror = (e) => { reject(e) };
        img.src = url;
    });
}
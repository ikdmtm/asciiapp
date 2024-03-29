//inputタグを取得
const inputForm = document.getElementById('input-form');
//inputタグにファイルが入ったら画像をDataURLに変換してdrawimage関数でcanvasに描画
inputForm.addEventListener('change', function() {
    const img = inputForm.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = function() {
        drawImage1(reader.result);
    }
});

//元画像をcanvasに描画
function drawImage1(dataURL) {
    const canvas1 = document.getElementById('canvas1');
    const ctx1 = canvas1.getContext('2d');
    const image1 = new Image();
    image1.src = dataURL;
    image1.onload = function() {
        canvas1.width = image1.width;
        canvas1.height = image1.height;
        //元画像描画
        ctx1.drawImage(image1, 0, 0);
        //ピクセルごとのデータを取得
        const imageData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        console.log(imageData);
        console.log(imageData.data, '変換前');
        //グレースケール化
        culcurate(image1, imageData);
        //変更を描画
        drawImage2(image1, imageData);
        //asciiアート作成
        // ascii(image1, imageData);
    }
}
//変更を描画
function drawImage2(image1, imageData) {
    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = image1.width;
    canvas2.height = image1.height;
    //ここでグレースケール化したデータを入れる
    console.log(imageData.data, '変換後2');
    ctx2.putImageData(imageData, 0, 0);
}

//imageData.dataに一次元配列でピクセルデータを格納
function culcurate(image1, imageData){
    const pixel = imageData.data;
    //ASCIIアート用
    const strArray = [' ', '.', '-', 'c', 'b', 's', '+', 'f', 'e', 'm', 'g', '&', '#', '$', '@', '%'];
    const asciiArray = [];
    const k = 16;
    //ここまで
    for (let y = 0; y < image1.height; y++) {
        let line = ''; //asccii
        for (let x = 0; x < image1.width; x++) {
            let index = (x + y * image1.width) * 4;
            let r = pixel[index];
            let g = pixel[index + 1];
            let b = pixel[index + 2];
            let a = pixel[index + 3];
            let gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            for (let i = 0; i < 3; i++) {
                pixel[index + i] = gray;
            }
            //ascii用
            //数値を文字に変換
            if (pixel[index] <= k-1){
                line += strArray[k-1];
            }else if(pixel[index] <= 2*k-1){
                line += strArray[k-2];
            }else if(pixel[index] <= 3*k-1){
                line += strArray[k-3];
            }else if(pixel[index] <= 4*k-1){
                line += strArray[k-4];
            }else if(pixel[index] <= 5*k-1){
                line += strArray[k-5];
            }else if(pixel[index] <= 6*k-1){
                line += strArray[k-6];
            }else if(pixel[index] <= 7*k-1){
                line += strArray[k-7];
            }else if(pixel[index] <= 8*k-1){
                line += strArray[k-8];
            }else if(pixel[index] <= 9*k-1){
                line += strArray[k-9];
            }else if(pixel[index] <= 10*k-1){
                line += strArray[k-10];
            }else if(pixel[index] <= 11*k-1){
                line += strArray[k-11];
            }else if(pixel[index] <= 12*k-1){
                line += strArray[k-12];
            }else if(pixel[index] <= 13*k-1){
                line += strArray[k-13];
            }else if(pixel[index] <= 14*k-1){
                line += strArray[k-14];
            }else if(pixel[index] <= 15*k-1){
                line += strArray[k-15];
            }else if(pixel[index] <= 16*k-1){
                line += strArray[k-16];
            }
        }
        asciiArray.push(line); //ascii用
    }
    console.log(imageData.data, '変換後1');
    console.log(asciiArray);
    //textareaに文字を表示
    let asciiText = '';
    const text = document.getElementById('ascii-area');
    console.log(asciiArray[0]);
    for(let i=0; i < asciiArray.length; i+=2){//縦の長さが実際より長くなるのをi+=2で対処
        asciiText += asciiArray[i] + '\n';
    }
    console.log(asciiText);
    text.textContent = asciiText;
}

//ファイル選択のボタン
const imageButton = document.getElementById('image-button');
const fileInput = document.getElementById('input-form');
imageButton.addEventListener('click', function(){
    fileInput.click();
});

//textareaを
document.getElementById('ascii-form');

// 10 0.4 4
// 4 10/4 5/2 *2.5
// 135*0.4
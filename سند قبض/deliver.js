let canvas_width = 2481;

let loadImageOnCanvasAndThenWriteText = (canvas, imageUrl, texts, textStyleOptions, signatures) => {
  let ctx = canvas.getContext("2d");

  let img = new Image();

  img.onload = () => {
    let loadedImageWidth = img.width;
    let loadedImageHeight = img.height;

    canvas.width = loadedImageWidth;
    canvas.height = loadedImageHeight;

    ctx.drawImage(img, 0, 0);

    texts.forEach(text => {
      ctx.font = `${textStyleOptions.fontWeight} ${textStyleOptions.fontSize}px ${textStyleOptions.fontFamily}`;
      ctx.fillStyle = textStyleOptions.textColor;

      let textWidth = ctx.measureText(text.content).width;

      let x = text.x;

      const align = text.align || textStyleOptions.textAlign;

      if (align === "right") {
        x -= textWidth; 
      } else if (align === "center") {
        x -= textWidth / 2; 
      }

      ctx.fillText(text.content, x, text.y);
    });

    signatures.forEach(signature => {
      let signatureWidth = ctx.measureText(signature.content).width;

      let x = signature.x;

      if (textStyleOptions.textAlign === "right") {
        x -= signatureWidth;
      } else if (textStyleOptions.textAlign === "center") {
        x -= signatureWidth / 2;
      }

      ctx.drawImage(signature.content, x, signature.y, signature.width, signature.height);
      console.log(signature);    
    });

    let base64Link = canvas.toDataURL("image/png");
    console.log(base64Link);
  };

  img.src = imageUrl;
  console.log(img.src);
};

document.addEventListener("DOMContentLoaded", () => {
  let theCanvas = document.getElementById("myCanvas");

  let imageUrl = "كدي سند قبض-01.png";
  var signatureImg = new Image();
  var QrImg = new Image();
  var Stamp = new Image();

  signatureImg.src = "signature_01.png"; 
  QrImg.src = "QRimage.svg"; 
  Stamp.src = "stamp.jpg"; 

  let texts = [
    { content: "الأحد ٨ جمادي الأولى ١٤٤٦", x: canvas_width - 210, y: 605, align: "right" },
    { content: "11/10/2024", x: canvas_width - 232, y: 675, align: "right" },
    { content: "Jumada I 8, 1446", x: canvas_width - 1525, y: 605, align: "left" },
    { content: "11/10/2024", x: canvas_width - 1505, y: 675, align: "left" },
    { content: "24-1301-4001105-000303", x: canvas_width - 2400, y: 605, align: "left" },
    { content: "5,560000", x: canvas_width - 2400, y: 690, align: "left" },
    { content: "82", x: canvas_width - 2010, y: 690, align: "left" },
    { content: "مبارك ظافر مصعب الشهراني", x: canvas_width - 250, y: 795, align: "right" },
    { content: "Mubarak Zafer Musab Al-Shahrani ", x: canvas_width - 2240, y: 795, align: "left" },
    { content: "خمسة الآلف و خمس مئة و ستون  ريالا و اثنان و ثمانون هللة", x: canvas_width - 300, y: 900, align: "right" },
    { content: "Five thousand five hundred and sixty riyals and eighty-two halalas", x: canvas_width - 2220, y: 970, align: "left" },
    { content: "ماستر كارد ", x: canvas_width - 305, y: 1080, align: "right" },
    { content: "Master Card", x: canvas_width - 2040, y: 1077, align: "left" },
    { content: "دفعة تحت الحساب لعقد ايجار السيارة لعقد 26-1301-4001105-000303" , x: canvas_width - 305, y: 1185, align: "right" },
    { content: "Payment on account for car lease contract for contract 24-1301-4001105-000303" , x: canvas_width - 2140, y: 1255, align: "left" },
    { content: "ملاحظات ", x: canvas_width - 250, y: 1340, align: "right" },
    { content: "عيسي هاني مبروك عزام", x: canvas_width - 220, y: 1560, align: "right" },
    { content: "Issa Hani Mumrok Azzam", x: canvas_width - 690, y: 1605, align: "left" },

  ];
  
  let signatures = [
    { content: signatureImg, x: canvas_width - 434, y: 1520, width: 200, height: 100 },
    { content: QrImg, x: canvas_width - 1900, y: 1442, width: 200, height: 200 },
    { content: Stamp, x: canvas_width - 1663, y: 1442, width: 200, height: 200 },
  ];

  let textStyleOptions = {
    fontWeight: "bold",
    fontSize:40 ,
    fontFamily: "serif",
    textColor: "rgba(0, 0, 0)",
    textAlign: "right" 
  };

  loadImageOnCanvasAndThenWriteText(theCanvas, imageUrl, texts, textStyleOptions, signatures);
});
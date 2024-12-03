let canvas_width = 2481;

let loadImageOnCanvasAndThenWriteText = (canvas, imageUrl, texts, textStyleOptions, signatures , TableItems , tableItemsStyle) => {
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

    TableItems.forEach(text => {
      ctx.font = `${tableItemsStyle.fontWeight} ${tableItemsStyle.fontSize}px ${tableItemsStyle.fontFamily}`;
      ctx.fillStyle = tableItemsStyle.textColor;

      let textWidth = ctx.measureText(text.content).width;

      let x = text.x;

      const align = text.align || tableItemsStyle.textAlign;

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

  let imageUrl = "فاتورة كدي-01.png";
  var signatureImg = new Image();
  var QrImg = new Image();
  var Stamp = new Image();

  signatureImg.src = "signature_01.png"; 
  QrImg.src = "websiteQRCode_noFrame.png"; 
  Stamp.src = "stamp.jpg"; 

  let texts = [
    { content: "24-1301-4001105-000303", x: canvas_width - 640, y: 680, align: "left" },
    { content: "الأحد ٨ جمادي الأولى ١٤٤٦", x: canvas_width - 210, y: 776, align: "right" },
    { content: "11/10/2024", x: canvas_width - 760, y: 776, align: "right" },
    { content: "sunday, Jumada I 8, 1446", x: canvas_width - 2306, y: 773, align: "left" },
    { content: "11/10/2024", x: canvas_width - 1700, y: 772, align: "left" },
    { content: "إنشاء عقد", x: canvas_width - 240, y: 880, align: "right" },
    { content: "Create Contract", x: canvas_width - 2170, y: 878, align: "left" },
    { content: "مبارك ظافر مصعب الشهراني", x: canvas_width - 270, y: 1165, align: "right" },
    { content: "Mubarak Zafer Musab Al-Shahrani ", x: canvas_width - 2235, y: 1165, align: "left" },
    { content: "هيونداي - سوناتا - سيدان متوسطة -٢٠٢٠ - د و د - ٣٣٢٨ - ازرق", x: canvas_width - 240, y: 1255, align: "right" },
    { content: "Hyundai - Sonata - medium sedan - 2020 - D E D - 3328 - blue", x: canvas_width - 2300, y: 1255, align: "left" },
    { content: "عيسي هاني مبروك عزام", x: canvas_width - 340, y: 2950, align: "right" },
    { content: "Issa Hani Mumrok Azzam", x: canvas_width - 790, y: 3000, align: "left" },

  ];
  
  let signatures = [
    { content: signatureImg, x: canvas_width - 600, y: 2900, width: 200, height: 100 },
    { content: QrImg, x: canvas_width - 1900, y: 2880, width: 200, height: 200 },
    { content: Stamp, x: canvas_width - 1663, y: 2880, width: 200, height: 200 },
  ];

  let TableItems = [
    // Service Column
    { content: "الإيجار", x: canvas_width - 300, y: 1530, align: "center" },
    { content: "Rent", x: canvas_width - 300, y: 1570, align: "center" },
    { content: "التفويض", x: canvas_width - 300, y: 1665, align: "center" },
    { content: "Delegation", x: canvas_width - 300, y: 1705, align: "center" },
    { content: "الخيارات", x: canvas_width - 300, y: 1790, align: "center" },
    { content: "Options", x: canvas_width - 300, y: 1825, align: "center" },
    { content: "المميزات", x: canvas_width - 300, y: 1910, align: "center" },
    { content: "Features", x: canvas_width - 300, y: 1942, align: "center" },
    { content: "السائق الاضافي", x: canvas_width - 300, y: 2030, align: "center" },
    { content: "Addtional driver", x: canvas_width - 300, y: 2075, align: "center" },
    { content: "مميزات ", x: canvas_width - 300, y: 2150, align: "center" },
    { content: "Features", x: canvas_width - 300, y: 2185, align: "center" },
    { content: "مميزات ", x: canvas_width - 300, y: 2270, align: "center" },
    { content: "Features", x: canvas_width - 300, y: 2305, align: "center" },
    { content: "مميزات ", x: canvas_width - 300, y: 2400, align: "center" },
    { content: "Features", x: canvas_width - 300, y: 2435, align: "center" },
    { content: "مميزات ", x: canvas_width - 300, y: 2515, align: "center" },
    { content: "Features", x: canvas_width - 300, y: 2553, align: "center" },
    { content: "مميزات ", x: canvas_width - 300, y: 2640, align: "center" },
    { content: "Features", x: canvas_width - 300, y: 2675, align: "center" },

    // Value Column
    { content: "320.00", x: canvas_width - 600, y: 1550, align: "center" },
    { content: "50.00", x: canvas_width - 600, y: 1680, align: "center" },
    { content: "50.00", x: canvas_width - 600, y: 1800, align: "center" },
    { content: "0.00", x: canvas_width - 600, y: 1920, align: "center" },
    { content: "0.00", x: canvas_width - 600, y: 1920, align: "center" },
    { content: "0.00", x: canvas_width - 600, y: 2040, align: "center" },
    { content: "0.00", x: canvas_width - 600, y: 2160, align: "center" },
    { content: "0.00", x: canvas_width - 600, y: 2280, align: "center" },
    { content: "0.00", x: canvas_width - 600, y: 2410, align: "center" },
    { content: "0.00", x: canvas_width - 600, y: 2520, align: "center" },
    { content: "0.00", x: canvas_width - 600, y: 2650, align: "center" },

     // No. Column
     { content: "20.00", x: canvas_width - 840, y: 1550, align: "center" },
     { content: "10.00", x: canvas_width - 840, y: 1680, align: "center" },
     { content: "5.00", x: canvas_width - 840, y: 1800, align: "center" },
     { content: "0.00", x: canvas_width - 840, y: 1920, align: "center" },
     { content: "0.00", x: canvas_width - 840, y: 1920, align: "center" },
     { content: "0.00", x: canvas_width - 840, y: 2040, align: "center" },
     { content: "0.00", x: canvas_width - 840, y: 2160, align: "center" },
     { content: "0.00", x: canvas_width - 840, y: 2280, align: "center" },
     { content: "0.00", x: canvas_width - 840, y: 2410, align: "center" },
     { content: "0.00", x: canvas_width - 840, y: 2520, align: "center" },
     { content: "0.00", x: canvas_width - 840, y: 2650, align: "center" },

      // Amount Column
      { content: "20.00", x: canvas_width - 1085, y: 1550, align: "center" },
      { content: "10.00", x: canvas_width - 1085, y: 1680, align: "center" },
      { content: "5.00", x: canvas_width - 1085, y: 1800, align: "center" },
      { content: "0.00", x: canvas_width - 1085, y: 1920, align: "center" },
      { content: "0.00", x: canvas_width - 1085, y: 1920, align: "center" },
      { content: "0.00", x: canvas_width - 1085, y: 2040, align: "center" },
      { content: "0.00", x: canvas_width - 1085, y: 2160, align: "center" },
      { content: "0.00", x: canvas_width - 1085, y: 2280, align: "center" },
      { content: "0.00", x: canvas_width - 1085, y: 2410, align: "center" },
      { content: "0.00", x: canvas_width - 1085, y: 2520, align: "center" },
      { content: "0.00", x: canvas_width - 1085, y: 2650, align: "center" },
      { content: "999,999.99", x: canvas_width - 1085, y: 2750, align: "center" },

        // Discount Column
        { content: "20.00", x: canvas_width - 1360, y: 1550, align: "center" },
        { content: "10.00", x: canvas_width - 1360, y: 1680, align: "center" },
        { content: "5.00", x: canvas_width - 1360, y: 1800, align: "center" },
        { content: "0.00", x: canvas_width - 1360, y: 1920, align: "center" },
        { content: "0.00", x: canvas_width - 1360, y: 1920, align: "center" },
        { content: "0.00", x: canvas_width - 1360, y: 2040, align: "center" },
        { content: "0.00", x: canvas_width - 1360, y: 2160, align: "center" },
        { content: "0.00", x: canvas_width - 1360, y: 2280, align: "center" },
        { content: "0.00", x: canvas_width - 1360, y: 2410, align: "center" },
        { content: "0.00", x: canvas_width - 1360, y: 2520, align: "center" },
        { content: "0.00", x: canvas_width - 1360, y: 2650, align: "center" },
        { content: "999,999.99", x: canvas_width - 1360, y: 2750, align: "center" },
        // After Discount Column
        { content: "20.00", x: canvas_width - 1670, y: 1550, align: "center" },
        { content: "10.00", x: canvas_width - 1670, y: 1680, align: "center" },
        { content: "5.00", x: canvas_width - 1670, y: 1800, align: "center" },
        { content: "0.00", x: canvas_width - 1670, y: 1920, align: "center" },
        { content: "0.00", x: canvas_width - 1670, y: 1920, align: "center" },
        { content: "0.00", x: canvas_width - 1670, y: 2040, align: "center" },
        { content: "0.00", x: canvas_width - 1670, y: 2160, align: "center" },
        { content: "0.00", x: canvas_width - 1670, y: 2280, align: "center" },
        { content: "0.00", x: canvas_width - 1670, y: 2410, align: "center" },
        { content: "0.00", x: canvas_width - 1670, y: 2520, align: "center" },
        { content: "0.00", x: canvas_width - 1670, y: 2650, align: "center" },
        { content: "999,999.99", x: canvas_width - 1670, y: 2750, align: "center" },

         // VAT Column
         { content: "20.00", x: canvas_width - 1940, y: 1550, align: "center" },
         { content: "10.00", x: canvas_width - 1940, y: 1680, align: "center" },
         { content: "5.00", x: canvas_width - 1940, y: 1800, align: "center" },
         { content: "0.00", x: canvas_width - 1940, y: 1920, align: "center" },
         { content: "0.00", x: canvas_width - 1940, y: 1920, align: "center" },
         { content: "0.00", x: canvas_width - 1940, y: 2040, align: "center" },
         { content: "0.00", x: canvas_width - 1940, y: 2160, align: "center" },
         { content: "0.00", x: canvas_width - 1940, y: 2280, align: "center" },
         { content: "0.00", x: canvas_width - 1940, y: 2410, align: "center" },
         { content: "0.00", x: canvas_width - 1940, y: 2520, align: "center" },
         { content: "0.00", x: canvas_width - 1940, y: 2650, align: "center" },
         { content: "0.00", x: canvas_width - 1940, y: 2750, align: "center" },

        // Total Column
        { content: "20.00", x: canvas_width - 2250, y: 1550, align: "center" },
        { content: "10.00", x: canvas_width - 2250, y: 1680, align: "center" },
        { content: "5.00", x: canvas_width - 2250, y: 1800, align: "center" },
        { content: "0.00", x: canvas_width - 2250, y: 1920, align: "center" },
        { content: "0.00", x: canvas_width - 2250, y: 1920, align: "center" },
        { content: "0.00", x: canvas_width - 2250, y: 2040, align: "center" },
        { content: "0.00", x: canvas_width - 2250, y: 2160, align: "center" },
        { content: "0.00", x: canvas_width - 2250, y: 2280, align: "center" },
        { content: "0.00", x: canvas_width - 2250, y: 2410, align: "center" },
        { content: "0.00", x: canvas_width - 2250, y: 2520, align: "center" },
        { content: "0.00", x: canvas_width - 2250, y: 2650, align: "center" },
        { content: "3,875.50", x: canvas_width - 2250, y: 2750, align: "center" },
  ]

  let textStyleOptions = {
    fontWeight: "bold",
    fontSize:40 ,
    fontFamily: "serif",
    textColor: "rgba(0, 0, 0)",
    textAlign: "right" 
  };

  let tableItemsStyle = {
    fontWeight: "bold",
    fontSize: 33,
    fontFamily: "serif",
    textColor: "rgba(0, 0, 0)",
    textAlign: "right" 
  };
  loadImageOnCanvasAndThenWriteText(theCanvas, imageUrl, texts, textStyleOptions, signatures ,TableItems , tableItemsStyle);
  
});
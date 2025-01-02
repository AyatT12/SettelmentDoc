const canvasWidth = 2481;

const calculateX = (ctx, text, x, align, defaultAlign) => {
  const textWidth = ctx.measureText(text).width;
  const alignment = align || defaultAlign;

  if (alignment === "right") return x - textWidth;
  if (alignment === "center") return x - textWidth / 2;
  return x;
};

const drawText = (ctx, textItems, styleOptions) => {
  ctx.font = `${styleOptions.fontWeight} ${styleOptions.fontSize}px ${styleOptions.fontFamily}`;
  ctx.fillStyle = styleOptions.textColor;

  textItems.forEach(({ content, x, y, align }) => {
    const adjustedX = calculateX(
      ctx,
      content,
      x,
      align,
      styleOptions.textAlign
    );
    ctx.fillText(content, adjustedX, y);
  });
};

const drawImages = (ctx, images) => {
  images.forEach(({ content, x, y, width, height }) => {
    ctx.drawImage(content, x, y, width, height);
  });
};

const loadImageOnCanvas = (
  canvas,
  imageUrl,
  texts,
  textStyle,
  images
) => {
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = () => {
    const { width: imgWidth, height: imgHeight } = img;

    canvas.width = imgWidth;
    canvas.height = imgHeight;

    ctx.drawImage(img, 0, 0);

    drawText(ctx, texts, textStyle);
    drawImages(ctx, images);

    const base64Link = canvas.toDataURL("image/png");
    console.log(base64Link);
  };

  img.src = imageUrl;
};

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const imageUrl = "Kodi - Exchange Voucher-01.png";

  const signatureImg = new Image();
  const signatureImg2 = new Image();

  const QrImg = new Image();
  const Stamp = new Image();
  signatureImg.src = "../images/signature_36.png";
  signatureImg2.src = "../images/signature_36.png";

  QrImg.src = "../images/verificationQR.png";
  Stamp.src = "../images/stamp.png";

  let texts = [
    { content: "الأحد ٨ جمادي الأولى ١٤٤٦", x: canvasWidth - 210, y: 605, align: "right" },
    { content: "11/10/2024", x: canvasWidth - 232, y: 675, align: "right" },
    { content: "Jumada I 8, 1446", x: canvasWidth - 1525, y: 605, align: "left" },
    { content: "11/10/2024", x: canvasWidth - 1505, y: 675, align: "left" },
    { content: "24-1301-4001105-000303", x: canvasWidth - 2410, y: 605, align: "left" },
    { content: "5,560000", x: canvasWidth - 2350, y: 690, align: "left" },
    { content: "82", x: canvasWidth - 2040, y: 690, align: "left" },
    { content: "مبارك ظافر مصعب الشهراني", x: canvasWidth - 200, y: 795, align: "right" },
    { content: "Mubarak Zafer Musab Al-Shahrani ", x: canvasWidth - 2255, y: 795, align: "left" },
    { content: "خمسة الآلف و خمس مئة و ستون  ريالا و اثنان و ثمانون هللة", x: canvasWidth - 295, y: 900, align: "right" },
    { content: "Five thousand five hundred and sixty riyals and eighty-two halalas", x: canvasWidth - 2220, y: 970, align: "left" },
    { content: "ماستر كارد ", x: canvasWidth - 305, y: 1075, align: "right" },
    { content: "Master Card", x: canvasWidth - 2040, y: 1075, align: "left" },
    { content: "دفعة تحت الحساب لعقد ايجار السيارة لعقد 26-1301-4001105-000303" , x: canvasWidth - 305, y: 1180, align: "right" },
    { content: "Payment on account for car lease contract for contract 24-1301-4001105-000303" , x: canvasWidth - 2140, y: 1255, align: "left" },
    { content: "ملاحظات ", x: canvasWidth - 250, y: 1335, align: "right" },
    { content: "عيسي هاني مبروك عزام", x: canvasWidth - 220, y: 1560, align: "right" },
    { content: "Issa Hani Mumrok Azzam", x: canvasWidth - 220, y: 1605, align: "right" },

  ];
  
  let images = [
    { content: signatureImg, x: canvasWidth - 940, y: 1525, width: 200, height: 100 },
    { content: signatureImg2, x: canvasWidth - 590, y: 1655, width: 200, height: 100 },
    { content: QrImg, x: canvasWidth - 2411, y: 1447, width: 200, height: 200 },
    { content: Stamp, x: canvasWidth - 730, y: 1620, width: 200, height: 200 },
  ];

  // Styles
  const textStyle = {
    fontWeight: "normal",
    fontSize: 46,
    fontFamily: "Sakkal Majalla Regular",
    textColor: "#000000",
    textAlign: "left",
  };


  document.fonts
    .load(`normal ${textStyle.fontSize}px "${textStyle.fontFamily}"`)
    .then(() => {
      loadImageOnCanvas(
        canvas,
        imageUrl,
        texts,
        textStyle,
        images
      );
    });
});

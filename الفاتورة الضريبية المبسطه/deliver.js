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
  TableItems,
  tableStyle,
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
    drawText(ctx, TableItems, tableStyle);
    drawImages(ctx, images);

    const base64Link = canvas.toDataURL("image/png");
    console.log(base64Link);
  };

  img.src = imageUrl;
};

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const imageUrl = "Kodi - Simplified Tax Invoice-01.png";

  const signatureImg = new Image();
  const qrImg = new Image();
  const stampImg = new Image();
  signatureImg.src = "../images/signature_09.png";
  qrImg.src = "../images/verificationQR.png";
  stampImg.src = "../images/stamp.png";

  const texts = [
    {
      content: "24-1301-4001105-000303",
      x: canvasWidth - 510,
      y: 695,
      align: "left",
    },
    {
      content: "الأحد ٨ جمادي الأولى ١٤٤٦",
      x: canvasWidth - 225,
      y: 777,
      align: "right",
    },
    { content: "11/10/2024", x: canvasWidth - 915, y: 777, align: "right" },
    {
      content: "sunday, Jumada I 8, 1446",
      x: canvasWidth - 2275,
      y: 777,
      align: "left",
    },
    { content: "11/10/2024", x: canvasWidth - 1530, y: 777, align: "left" },
    { content: "إنشاء عقد", x: canvasWidth - 225, y: 874, align: "right" },
    {
      content: "Create Contract",
      x: canvasWidth - 2170,
      y: 874,
      align: "left",
    },
    {
      content: "مبارك ظافر مصعب الشهراني",
      x: canvasWidth - 270,
      y: 1165,
      align: "right",
    },
    {
      content: "Mubarak Zafer Musab Al-Shahrani ",
      x: canvasWidth - 2225,
      y: 1165,
      align: "left",
    },
    {
      content: "هيونداي - سوناتا - سيدان متوسطة -٢٠٢٠ - د و د - ٣٣٢٨ - ازرق",
      x: canvasWidth - 250,
      y: 1250,
      align: "right",
    },
    {
      content: "Hyundai - Sonata - medium sedan - 2020 - D E D - 3328 - blue",
      x: canvasWidth - 2295,
      y: 1250,
      align: "left",
    },
    {
      content: "عيسي هاني مبروك عزام",
      x: canvasWidth - 250,
      y: 2950,
      align: "right",
    },
    {
      content: "Issa Hani Mumrok Azzam",
      x: canvasWidth - 250,
      y: 3000,
      align: "right",
    },
  ];

  let TableItems = [
    // Service Column
    { content: "الايجار", x: canvasWidth - 280, y: 1528, align: "center" },
    { content: "Rent", x: canvasWidth - 280, y: 1568, align: "center" },

    { content: "التفويض", x: canvasWidth - 280, y: 1652, align: "center" },
    { content: "Delegation", x: canvasWidth - 280, y: 1692, align: "center" },

    { content: "إضافات", x: canvasWidth - 280, y: 1776, align: "center" },
    { content: "Options", x: canvasWidth - 280, y: 1816, align: "center" },

    { content: "مميزات", x: canvasWidth - 280, y: 1900, align: "center" },
    { content: "Features", x: canvasWidth - 280, y: 1940, align: "center" },

    { content: "ساعات اضافية", x: canvasWidth - 280, y: 2024, align: "center" },
    {
      content: "Addtional driver",
      x: canvasWidth - 280,
      y: 2064,
      align: "center",
    },

    { content: "سائق إضافي", x: canvasWidth - 280, y: 2148, align: "center" },
    { content: "Features", x: canvasWidth - 280, y: 2188, align: "center" },

    { content: "تسوية", x: canvasWidth - 280, y: 2272, align: "center" },
    { content: "Features", x: canvasWidth - 280, y: 2312, align: "center" },

    { content: "مميزات", x: canvasWidth - 280, y: 2396, align: "center" },
    { content: "Features", x: canvasWidth - 280, y: 2436, align: "center" },

    { content: "مميزات", x: canvasWidth - 280, y: 2520, align: "center" },
    { content: "Features", x: canvasWidth - 280, y: 2560, align: "center" },

    { content: "مميزات", x: canvasWidth - 280, y: 2644, align: "center" },
    { content: "Features", x: canvasWidth - 280, y: 2684, align: "center" },

    // Value Column
    { content: "320.00", x: canvasWidth - 580, y: 1548, align: "center" },
    { content: "50.00", x: canvasWidth - 580, y: 1672, align: "center" },
    { content: "50.00", x: canvasWidth - 580, y: 1796, align: "center" },
    { content: "0.00", x: canvasWidth - 580, y: 1920, align: "center" },
    { content: "0.00", x: canvasWidth - 580, y: 2044, align: "center" },
    { content: "0.00", x: canvasWidth - 580, y: 2168, align: "center" },
    { content: "0.00", x: canvasWidth - 580, y: 2292, align: "center" },
    { content: "0.00", x: canvasWidth - 580, y: 2416, align: "center" },
    { content: "0.00", x: canvasWidth - 580, y: 2540, align: "center" },
    { content: "0.00", x: canvasWidth - 580, y: 2664, align: "center" },
    // No. Column
    { content: "320.00", x: canvasWidth - 840, y: 1548, align: "center" },
    { content: "50.00", x: canvasWidth - 840, y: 1672, align: "center" },
    { content: "50.00", x: canvasWidth - 840, y: 1796, align: "center" },
    { content: "0.00", x: canvasWidth - 840, y: 1920, align: "center" },
    { content: "0.00", x: canvasWidth - 840, y: 2044, align: "center" },
    { content: "0.00", x: canvasWidth - 840, y: 2168, align: "center" },
    { content: "0.00", x: canvasWidth - 840, y: 2292, align: "center" },
    { content: "0.00", x: canvasWidth - 840, y: 2416, align: "center" },
    { content: "0.00", x: canvasWidth - 840, y: 2540, align: "center" },
    { content: "0.00", x: canvasWidth - 840, y: 2664, align: "center" },
    // Amount Column
    { content: "320.00", x: canvasWidth - 1085, y: 1548, align: "center" },
    { content: "50.00", x: canvasWidth - 1085, y: 1672, align: "center" },
    { content: "50.00", x: canvasWidth - 1085, y: 1796, align: "center" },
    { content: "0.00", x: canvasWidth - 1085, y: 1920, align: "center" },
    { content: "0.00", x: canvasWidth - 1085, y: 2044, align: "center" },
    { content: "0.00", x: canvasWidth - 1085, y: 2168, align: "center" },
    { content: "0.00", x: canvasWidth - 1085, y: 2292, align: "center" },
    { content: "0.00", x: canvasWidth - 1085, y: 2416, align: "center" },
    { content: "0.00", x: canvasWidth - 1085, y: 2540, align: "center" },
    { content: "0.00", x: canvasWidth - 1085, y: 2664, align: "center" },
    {
      content: "420",
      x: canvasWidth - 1085,
      y: 2760,
      align: "center",
    },
    // Discount Column
    { content: "320.00", x: canvasWidth - 1360, y: 1548, align: "center" },
    { content: "50.00", x: canvasWidth - 1360, y: 1672, align: "center" },
    { content: "50.00", x: canvasWidth - 1360, y: 1796, align: "center" },
    { content: "0.00", x: canvasWidth - 1360, y: 1920, align: "center" },
    { content: "0.00", x: canvasWidth - 1360, y: 2044, align: "center" },
    { content: "0.00", x: canvasWidth - 1360, y: 2168, align: "center" },
    { content: "0.00", x: canvasWidth - 1360, y: 2292, align: "center" },
    { content: "0.00", x: canvasWidth - 1360, y: 2416, align: "center" },
    { content: "0.00", x: canvasWidth - 1360, y: 2540, align: "center" },
    { content: "0.00", x: canvasWidth - 1360, y: 2664, align: "center" },
    {
      content: "420",
      x: canvasWidth - 1360,
      y: 2760,
      align: "center",
    },
    // After Discount Column
    { content: "320.00", x: canvasWidth - 1640, y: 1548, align: "center" },
    { content: "50.00", x: canvasWidth - 1640, y: 1672, align: "center" },
    { content: "50.00", x: canvasWidth - 1640, y: 1796, align: "center" },
    { content: "0.00", x: canvasWidth - 1640, y: 1920, align: "center" },
    { content: "0.00", x: canvasWidth - 1640, y: 2044, align: "center" },
    { content: "0.00", x: canvasWidth - 1640, y: 2168, align: "center" },
    { content: "0.00", x: canvasWidth - 1640, y: 2292, align: "center" },
    { content: "0.00", x: canvasWidth - 1640, y: 2416, align: "center" },
    { content: "0.00", x: canvasWidth - 1640, y: 2540, align: "center" },
    { content: "0.00", x: canvasWidth - 1640, y: 2664, align: "center" },
    {
      content: "420",
      x: canvasWidth - 1640,
      y: 2760,
      align: "center",
    },
    // VAT Column
    { content: "320.00", x: canvasWidth - 1930, y: 1548, align: "center" },
    { content: "50.00", x: canvasWidth - 1930, y: 1672, align: "center" },
    { content: "50.00", x: canvasWidth - 1930, y: 1796, align: "center" },
    { content: "0.00", x: canvasWidth - 1930, y: 1920, align: "center" },
    { content: "0.00", x: canvasWidth - 1930, y: 2044, align: "center" },
    { content: "0.00", x: canvasWidth - 1930, y: 2168, align: "center" },
    { content: "0.00", x: canvasWidth - 1930, y: 2292, align: "center" },
    { content: "0.00", x: canvasWidth - 1930, y: 2416, align: "center" },
    { content: "0.00", x: canvasWidth - 1930, y: 2540, align: "center" },
    { content: "0.00", x: canvasWidth - 1930, y: 2664, align: "center" },
    {
      content: "420",
      x: canvasWidth - 1930,
      y: 2760,
      align: "center",
    },
    // Total Column
    { content: "320.00", x: canvasWidth - 2220, y: 1548, align: "center" },
    { content: "50.00", x: canvasWidth - 2220, y: 1672, align: "center" },
    { content: "50.00", x: canvasWidth - 2220, y: 1796, align: "center" },
    { content: "0.00", x: canvasWidth - 2220, y: 1920, align: "center" },
    { content: "0.00", x: canvasWidth - 2220, y: 2044, align: "center" },
    { content: "0.00", x: canvasWidth - 2220, y: 2168, align: "center" },
    { content: "0.00", x: canvasWidth - 2220, y: 2292, align: "center" },
    { content: "0.00", x: canvasWidth - 2220, y: 2416, align: "center" },
    { content: "0.00", x: canvasWidth - 2220, y: 2540, align: "center" },
    { content: "0.00", x: canvasWidth - 2220, y: 2664, align: "center" },
    {
      content: "9999.999999",
      x: canvasWidth - 2220,
      y: 2760,
      align: "center",
    },
  ];
  const images = [
    {
      content: signatureImg,
      x: canvasWidth - 980,
      y: 2920,
      width: 200,
      height: 100,
    },
    { content: qrImg, x: canvasWidth - 2395, y: 2880, width: 200, height: 200 },
    {
      content: stampImg,
      x: canvasWidth - 1120,
      y: 2862,
      width: 200,
      height: 200,
    },
  ];

  // Styles
  const textStyle = {
    fontWeight: "normal",
    fontSize: 46,
    fontFamily: "Sakkal Majalla Regular",
    textColor: "#000000",
    textAlign: "left",
  };

  const tableStyle = {
    fontWeight: "normal",
    fontSize: 40,
    fontFamily: "Sakkal Majalla Regular",
    textColor: "rgba(0, 0, 0)",
    textAlign: "right",
  };

  document.fonts
    .load(`normal ${textStyle.fontSize}px "${textStyle.fontFamily}"`)
    .then(() => {
      loadImageOnCanvas(
        canvas,
        imageUrl,
        texts,
        textStyle,
        TableItems,
        tableStyle,
        images
      );
    });
});

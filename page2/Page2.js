async function CreateٍSettlement() {
  const accountReceiptNo = "123456";
  const canvas = document.getElementById("myCanvas");
  const imageArray = [
    { f: File, url: "images/th.jpg" },
    { f: File, url: "images/th.jpg" },
    { f: File, url: "images/th.jpg" },
    { f: File, url: "images/th.jpg" },

   ];
  const extractedUrls = imageArray.map(item => item.url);

  const dynamicData = {
    NUMBER: "2490667684810001",
    CONTRACT_NUMBER: "24-1401-4001102-000109",
  // التوقيع //
  SIGNATURE_AR: "عمير رضا عمير مجدي",
  SIGNATURE_EN: "Omir Reda Omir Magdy",

  // الصور
    images: {
      background: "page14.png",
      EMPLOYEE_SIGN: "images/Signature_08.png",
      TENANT_SIGN: "images/Signature_08.png",
      QR: "images/BananT.png",
      STAMP: "images/stamp.png",
      Authentication_STAMP: "images/ختم توثيق بنان.png",
      VisualImage1: extractedUrls[0],
      VisualImage2: extractedUrls[1],
      VisualImage3: extractedUrls[2],
      VisualImage4:  extractedUrls[3],
    },
    // عناصر الجدول 
    AmountItems: [{ content: "100" } , { content: "200" } , { content: "100" } , { sum: "400"  }],
    StatementItems:[{ content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث ي" }  , { content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث ي" }],
  };

  const loadedImages = await loadDynamicImages(dynamicData.images);
  const dataWithImages = { ...dynamicData, images: loadedImages };
  console.log("dataWithImages", dataWithImages);
  await drawReceipt(canvas, dataWithImages);
}

//  لتحميل الصور
const loadDynamicImages = async (images) => {
  const loadedImages = {};
  for (const [key, src] of Object.entries(images)) {
    try {
      loadedImages[key] = await loadImage(src);
    } catch (error) {
      console.warn(`استخدام النسخة الاحتياطية لـ: ${key}`);
      loadedImages[key] = null;
    }
  }
  return loadedImages;
};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => {
      console.error(`فشل تحميل الصورة: ${src}`, error);
      reject(error);
    };
    img.src = src;
  });
};

//  لرسم الإيصال على الصورة
const drawReceipt = async (canvas, data) => {
  console.log("بدء رسم الإيصال");
  const ctx = canvas.getContext("2d");

  // إعداد حجم الصورة بناءً على صورة الخلفية
  const backgroundImg = data.images.background;
  canvas.width = 2481;
  canvas.height = backgroundImg.height;
  ctx.drawImage(backgroundImg, 0, 0);

  // إعدادات النصوص والصور
  const fixedConfig = {
    texts : [
      { key: "NUMBER", x: canvas.width - 2360, y: 358, align: "left", color: "#0D5485", fontSize: 40, fontWeight: "700"  },
      { key: "CONTRACT_NUMBER", x: canvas.width - 2420, y: 405, align: "left", color: "#0D5485", fontSize: 45, fontWeight: "700" },
    
      // التوقيع //
      { key: "SIGNATURE_AR", x: canvas.width - 280, y: 2830, fontSize: 40  , align: "right"},
      { key: "SIGNATURE_EN", x: canvas.width - 280, y: 2870 , align: "right" },
    ],
    images: [
      // صورة الفحص الظاهري 
      {
        content:data.images.VisualImage1,
        x: canvas.width - 1250,
        y: 1380,
        width: 950,
        height: 550,
      },
      {
        content:data.images.VisualImage2,
        x: canvas.width - 2250,
        y: 1380,
        width: 950,
        height: 550,
      },
      {
        content:data.images.VisualImage3,
        x: canvas.width - 1250,
        y: 2030,
        width: 950,
        height: 550,
      },
      {
        content:data.images.VisualImage4,
        x: canvas.width - 2250,
        y: 2030,
        width: 950,
        height: 550,
      },
      { content: data.images.EMPLOYEE_SIGN, x: canvas.width - 705, y: 2810, width: 160, height: 50  },
      { content: data.images.TENANT_SIGN,  x: canvas.width - 500, y: 2910, width: 160, height: 50   },
      { content: data.images.STAMP, x: canvas.width - 776, y: 2800, width: 190, height: 194 },
      { content: data.images.Authentication_STAMP, x: canvas.width - 560, y: 2905, width: 190, height: 194 },
      { content: data.images.QR, x: canvas.width - 2432, y: 2796, width: 190, height: 194 },
  ],
    textStyle: {
      fontWeight: "normal",
      fontSize: 35,
      fontFamily: "Sakkal Majalla Regular",
      textColor: "#000000",
    },
    tableStyle: {
      fontWeight: "normal",
      fontSize: 35,
      fontFamily: "Sakkal Majalla Regular",
      textColor: "#000000",
      textAlign: "right",
    }
  };
  await document.fonts.load(`${fixedConfig.textStyle.fontWeight} ${fixedConfig.textStyle.fontSize}px ${fixedConfig.textStyle.fontFamily}`);
  await document.fonts.load(`${fixedConfig.tableStyle.fontWeight} ${fixedConfig.tableStyle.fontSize}px ${fixedConfig.tableStyle.fontFamily}`);

  ctx.font = `${fixedConfig.textStyle.fontWeight} ${fixedConfig.textStyle.fontSize}px ${fixedConfig.textStyle.fontFamily}`;
  ctx.fillStyle = fixedConfig.textStyle.textColor;
  // رسم النصوص
  fixedConfig.texts.forEach(({ key, x, y, align , color , fontSize , fontWeight}) => {
    ctx.font =  `${fontWeight || fixedConfig.textStyle.fontWeight} ${fontSize || fixedConfig.textStyle.fontSize}px ${fixedConfig.textStyle.fontFamily}`;
    ctx.fillStyle = color||fixedConfig.textStyle.textColor;
    const content = data[key] || "";
    const textWidth = ctx.measureText(content).width;
  
        let adjustedX = x;
        if (align === "right") adjustedX = x - textWidth;
        else if (align === "center") adjustedX = x - textWidth / 2;
        ctx.fillText(content, adjustedX, y);
    
});

  // رسم الصور
  fixedConfig.images.forEach(({ content, x, y, width, height }) => {
    if (content) { // تحقق مما إذا كانت الصورة محملة
      ctx.drawImage(content, x, y, width, height);
    } else {
      console.warn("الصورة غير موجودة أو لم يتم تحميلها، يتم تخطيها.");
    }
  });

  const increment = 105; 
  const startYForNumbers = 635 ;

  //  لرسم العناصر في تنسيق جدول
  const drawItems = (items, xPosition, startY, align) => {
    if (!items || items.length === 0) return; 
    items.forEach((item, i) => {
      ctx.font = `${fixedConfig.tableStyle.fontWeight} ${fixedConfig.tableStyle.fontSize}px ${fixedConfig.tableStyle.fontFamily}`;
      ctx.fillStyle = fixedConfig.tableStyle.textColor;
      
      const content = item.content || "";
      const textWidth = ctx.measureText(content).width;
  
      let adjustedX = xPosition;
      if (align === "right") {
        adjustedX = xPosition - textWidth;
      } else if (align === "center") {
        adjustedX = xPosition - textWidth / 2;
      }
  
      ctx.fillText(content, adjustedX, startY + i * increment);
  
      if (item.sum) {
        const sumTextWidth = ctx.measureText(item.sum).width; 
        let adjustedSumX = xPosition;
  
        if (align === "right") {
          adjustedSumX = xPosition - sumTextWidth; 
        } else if (align === "center") {
          adjustedSumX = xPosition - sumTextWidth / 2;
        }
  
        ctx.fillText(item.sum, adjustedSumX, 1155); 
      }
    });
  };

  // رسم جميع فئات العناصر
  drawItems(data.AmountItems, canvas.width - 742, startYForNumbers, "right");
  drawItems(data.StatementItems, canvas.width - 960, startYForNumbers, "right");

};

function exportCanvasAsImage() {
  const canvas = document.getElementById("myCanvas");
  if (!canvas) {
    console.error("Canvas not found!");
    return;
  }

  const image = canvas.toDataURL("image/png"); // Convert canvas to an image
  const link = document.createElement("a");
  link.href = image;
  link.download = "Contract_Settlement.png"; // File name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


CreateٍSettlement();
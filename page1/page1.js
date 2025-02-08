async function CreateٍSettlement() {
  const accountReceiptNo = "123456";
  const canvas = document.getElementById("myCanvas");
  const dynamicData = {
      NUMBER: "2490667684810001",
      CONTRACT_NUMBER: "24-1401-4001102-000109",
      CONTRACT_DATE_AR: "الخميس 9 جمادى الآخرة 1446",
      CONTRACT_DATE_EN: "Tuesday, 9 Jumada al-Akhirah 1446",
      CONTRACT_START_AR: "الثلاثاء، 9 جمادى الآخرة 1446",
      CONTRACT_START_EN: "Tuesday, 9 Jumada al-Akhirah 1446",
      CONTRACT_END_AR: "الجمعة، 19 جمادى الآخرة 1446",
      CONTRACT_END_EN: "Friday, 19 Jumada al-Akhirah 1446",
      DAYSNUMBER: "10",
      DATE_1: "10/12/2024",
      TIME_1: "12:23:26",
      DATE_2: "10/12/2024",
      TIME_2: "12:23:26",
      DATE_3: "10/12/2024",
      TIME_3: "12:23:26",
      CONTRACT_STATUE_AR: "منتهي",
      CONTRACT_STATUE_EN: "Closed",
    //  بنود التأجير 
      Delivery_Branch_AR:"الرئيسي",
      Delivery_Branch_EN:"Main",

      Receiving_Branch_AR:"الرئيسي",
      Receiving_Branch_EN:"Main",

      Delay_hours:"2",
      Delay_days:"3",

      Extra_KM:"250",
      consumed_Fuel:"5",
      
      Total_actual_contract:"1,358",

      SIGNATURE_AR: "عمير رضا عمير مجدي",
      SIGNATURE_EN: "Omir Reda Omir Magdy",
      images: {
            background: "page13.png",
            EMPLOYEE_SIGN: "../../images/Signature_08.png",
            TENANT_SIGN: "../../images/Signature_08.png",
            QR: "../../images/BananT.png",
            STAMP: "../../images/Stamp.png",
            Authentication_STAMP: "../../images/ختم توثيق بنان.png",

    },
  };
  const loadedImages = await loadDynamicImages(dynamicData.images);
  const dataWithImages = { ...dynamicData, images: loadedImages };
  console.log("dataWithImages",dataWithImages);
  await DrawContract(canvas, dataWithImages);
};




const loadDynamicImages = async (images) => {
const loadedImages = {};
for (const [key, src] of Object.entries(images)) {
  try {
      loadedImages[key] = await loadImage(src);
  } catch (error) {
      console.warn(`Using fallback for: ${key}`);
      console.warn(`Using fallback for src: ${src}`);
      loadedImages[key] = null; // استخدم null أو صورة افتراضية
  }
}
return loadedImages;
};

const loadImage = (src) => {
return new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = (error) => {
      console.error(`Failed to load image: ${src}`, error);
      reject(error);
  };
  img.src = src;
});
};

// رسم العقد على الـ Canvas
const DrawContract = async (canvas, data) => {
console.log("Start DrawContract");
const ctx = canvas.getContext("2d");

// ضبط أبعاد الـ canvas
const backgroundImg = data.images.background;
canvas.width = 2481;
canvas.height = backgroundImg.height;
ctx.drawImage(backgroundImg, 0, 0);

// إعداد النصوص والصور
const fixedConfig = {
   texts : [
    { key: "NUMBER", x: canvas.width - 2360, y: 358, align: "left", color: "#0D5485", fontSize: 40 , fontWeight: "700",   },
    { key: "CONTRACT_NUMBER", x: canvas.width - 2420, y: 405, align: "left" ,color: "#0D5485" ,fontSize: 45 ,  fontWeight: "700",  },
    { key: "CONTRACT_DATE_AR", x: canvas.width - 610, y: 510, align: "right" , fontSize:40 },
    { key: "CONTRACT_DATE_EN", x: canvas.width - 610, y: 550, align: "right" },
    { key: "CONTRACT_START_AR", x: canvas.width - 610, y: 615, align: "right" , fontSize:40 },
    { key: "CONTRACT_START_EN", x: canvas.width - 610, y: 655, align: "right" },
    { key: "CONTRACT_END_AR", x: canvas.width - 610, y: 720, align: "right" , fontSize:40},
    { key: "CONTRACT_END_EN", x: canvas.width - 610, y: 760, align: "right" },
    { key: "DAYSNUMBER", x: canvas.width - 665, y: 840, align: "right" },
    { key: "CONTRACT_STATUE_AR", x: canvas.width - 1835, y: 822, align: "right"  , fontSize:40},
    { key: "CONTRACT_STATUE_EN", x: canvas.width - 1835, y: 860, align: "right" },
    { key: "DATE_1", x: canvas.width - 1885, y: 527, align: "right" },
    { key: "TIME_1", x: canvas.width - 1758, y: 527, align: "right" },
    { key: "DATE_2", x: canvas.width - 1885, y: 626, align: "right" },
    { key: "TIME_2", x: canvas.width - 1758, y: 626, align: "right" },
    { key: "DATE_3", x: canvas.width - 1885, y: 728, align: "right" },
    { key: "TIME_3", x: canvas.width - 1758, y: 728, align: "right" },
     //  بنود التأجبر ////
    { key: "Delivery_Branch_AR", x: canvas.width - 615, y: 965,  fontSize: 40 ,align: "right" },
    { key: "Delivery_Branch_EN", x: canvas.width - 615, y: 1005, align: "right" },
    { key: "Receiving_Branch_AR", x: canvas.width - 1230, y: 965,  fontSize: 40 ,align: "right" },
    { key: "Delay_hours", x: canvas.width - 620, y: 1085, align: "right" },
    { key: "Delay_days", x: canvas.width - 1180, y: 1085, align: "right" },
    { key: "Extra_KM", x: canvas.width - 665, y: 1190, align: "right" },
    { key: "consumed_Fuel", x: canvas.width - 1235, y: 1190, align: "right" },
    { key: "Total_actual_contract", x: canvas.width - 675, y: 1295, align: "right" },

  // التوقيع //
  { key: "SIGNATURE_AR", x: canvas.width - 280, y: 2830, fontSize: 40  , align: "right"},
  { key: "SIGNATURE_EN", x: canvas.width - 280, y: 2870 , align: "right" },
   ],
  images: [
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
      textAlign: "right",
  },
};

await document.fonts.load(`${fixedConfig.textStyle.fontWeight} ${fixedConfig.textStyle.fontSize}px ${fixedConfig.textStyle.fontFamily}`);

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
  // التحقق من ان الصورة موجوده
  if (content) {    
    ctx.drawImage(content, x, y, width, height);
  } else {
    console.warn("Image not found or not loaded, skipping.");
  }
});
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

CreateٍSettlement() 

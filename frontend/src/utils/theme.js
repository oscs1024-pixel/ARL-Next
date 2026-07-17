/**
 * 提取图片的主色调
 * @param {string} imageSrc - 图片的 Base64 或 URL
 * @returns {Promise<string>} 返回 RGB 颜色字符串，例如 "rgb(255, 0, 0)"
 */
export const extractDominantColor = (imageSrc) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 为了性能，将图片缩小到 50x50 来提取颜色
      const width = 50;
      const height = 50;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      let data;
      try {
        data = ctx.getImageData(0, 0, width, height).data;
      } catch (e) {
        return reject(new Error('图片存在跨域问题，无法提取颜色'));
      }

      let r = 0, g = 0, b = 0;
      let count = 0;

      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const alpha = data[i + 3];

        // 忽略透明度过低的像素
        if (alpha < 128) continue;

        // 忽略偏白或偏黑的像素，因为它们通常不适合作为主题色
        const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
        if (brightness < 30 || brightness > 220) continue;

        r += red;
        g += green;
        b += blue;
        count++;
      }

      if (count === 0) {
        // 如果没有提取到合适的颜色，返回默认的 Ant Design Vue 蓝色
        return resolve('#1677ff');
      }

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);

      // 为了确保颜色不会太浅，进行简单的亮度控制
      const finalBrightness = (r * 299 + g * 587 + b * 114) / 1000;
      if (finalBrightness > 200) {
        r = Math.max(0, r - 30);
        g = Math.max(0, g - 30);
        b = Math.max(0, b - 30);
      }

      resolve(`rgb(${r}, ${g}, ${b})`);
    };

    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };
  });
};

/**
 * 将 File 对象转换为 Base64 (保持原画质)，不再进行强制压缩
 */
export const processImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      // 直接返回原画质的高清 Base64
      resolve(e.target.result);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * 封装 IndexedDB 操作，用于存储不受 5MB 限制的高清背景图
 */
export const dbHelper = {
  dbName: 'arl-next-theme-db',
  storeName: 'settings',
  init() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.dbName, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = (e) => reject(e.target.error);
    });
  },
  async get(key) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const req = store.get(key);
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = (e) => reject(e.target.error);
    });
  },
  async set(key, value) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = (e) => reject(e.target.error);
    });
  },
  async remove(key) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = (e) => reject(e.target.error);
    });
  }
};

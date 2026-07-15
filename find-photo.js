const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  await page.goto('https://portfolio-5b977.web.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Screenshot
  await page.screenshot({ path: 'C:\\xampp\\htdocs\\Portfolio\\portfolio-live.png', fullPage: true });
  
  // Find all img elements and their sources
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map((img, i) => ({
      index: i,
      src: img.src,
      alt: img.alt,
      width: img.width,
      height: img.height,
      isVisible: img.offsetParent !== null
    }));
  });
  console.log('=== All images on page ===');
  images.forEach((img, i) => {
    console.log(`[${i}] ${img.alt || 'no alt'}: ${img.src.substring(0, 120)} (${img.width}x${img.height}) visible=${img.isVisible}`);
  });
  
  // Also check for any background images or hero sections
  const heroBg = await page.evaluate(() => {
    const hero = document.querySelector('.hero') || document.querySelector('.profile') || document.querySelector('.about');
    if (!hero) return 'no hero section found';
    const bg = getComputedStyle(hero).backgroundImage;
    return { heroClass: hero.className, backgroundImage: bg };
  });
  console.log('Hero bg:', JSON.stringify(heroBg, null, 2));
  
  // Find likely profile photo (look for round/circular images or images in hero/profile/about sections)
  const profileCandidates = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img, [class*="profile"], [class*="avatar"], [class*="photo"], [class*="hero"]')).map(el => ({
      tag: el.tagName,
      src: el.src || '',
      alt: el.alt || '',
      className: el.className,
      id: el.id
    }));
  });
  console.log('=== Profile candidates ===');
  console.log(JSON.stringify(profileCandidates, null, 2));
  
  await browser.close();
})();

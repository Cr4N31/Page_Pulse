export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export function checkPageScore() {
  const semanticTags = ["header", "nav", "main", "article", "section", "aside", "footer"];
  let semanticCount = 0;
  let issues = [];

  // SEMANTIC CHECK
  for (const tag of semanticTags) {
    semanticCount += document.querySelectorAll(tag).length;
  }

  if (semanticCount < 5) {
    issues.push(`Only ${semanticCount} semantic tags found, which is too little`);
  }

  if (semanticCount > 50) {
    issues.push(`Too many semantic tags detected (${semanticCount})`);
  }

  // IMAGE ALT CHECK
  const images = document.querySelectorAll("img");
  let missingAlt = 0;

  for (const img of images) {
    if (!img.alt || img.alt.trim() === "") {
      missingAlt++;
    }
  }

  if (missingAlt > 0) {
    issues.push(`${missingAlt} images missing alt text`);
  }

  // SIMPLE SCORE
  let score = 100;

  if (semanticCount < 5) score -= 20;
  if (semanticCount > 50) score -= 10;
  if (missingAlt > 0) score -= missingAlt * 5;

  return {
    score: score,
    issues: issues,
    semanticCount,
    totalImages: images.length,
    imagesWithAlt: images.length - missingAlt,
    imagesWithoutAlt: missingAlt
  };
}

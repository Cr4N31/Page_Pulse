export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

export function checkPageScore($) {
    const semanticTags = ["header", "nav", "main", "article", "section", "aside", "footer"];
    let semanticCount = 0;
    let issues = [];

    // SEMANTIC TAG CHECK
    for (const tag of semanticTags) {
        try {
            const count = $(tag).length || 0;
            semanticCount += count;
            console.log(`Tag ${tag}: ${count}`);
        } catch (err) {
            console.warn(`Failed to check tag ${tag}`, err);
        }
    }

    console.log(`Total semantic tags: ${semanticCount}`);

    if (semanticCount < 5) issues.push(`Only ${semanticCount} semantic tags found, which is too little`);
    if (semanticCount > 50) issues.push(`Too many semantic tags detected (${semanticCount})`);

    // IMAGE ALT CHECK
    let totalImages = 0;
    let missingAlt = 0;
    try {
        totalImages = $("img").length;
        console.log(`Total images: ${totalImages}`);
        $("img").each((i, img) => {
            const alt = $(img).attr("alt") || "";
            if (!alt.trim()) missingAlt++;
        });
        console.log(`Images with alt: ${totalImages - missingAlt}, without: ${missingAlt}`);
    } catch (err) {
        console.warn("Failed to check images", err);
    }

    const imagesWithAlt = totalImages - missingAlt;
    const imagesWithoutAlt = missingAlt;

    if (missingAlt > 0) issues.push(`${missingAlt} images missing alt text`);

    // SCORE
    let score = 100;
    if (semanticCount < 5) score -= 20;
    if (semanticCount > 50) score -= 10;
    if (missingAlt > 0) score -= missingAlt * 5;

    console.log(`Final score: ${score}, issues: ${issues.length}`);

    return { score, issues, semanticCount, totalImages, imagesWithAlt, imagesWithoutAlt };
}
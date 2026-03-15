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
            semanticCount += $(tag).length || 0;
        } catch (err) {
            console.warn(`Failed to check tag ${tag}`, err);
        }
    }

    if (semanticCount < 5) issues.push(`Only ${semanticCount} semantic tags found, which is too little`);
    if (semanticCount > 50) issues.push(`Too many semantic tags detected (${semanticCount})`);

    // IMAGE ALT CHECK
    let missingAlt = 0;
    try {
        $("img").each((i, img) => {
            const alt = $(img).attr("alt") || "";
            if (!alt.trim()) missingAlt++;
        });
    } catch (err) {
        console.warn("Failed to check images", err);
    }

    if (missingAlt > 0) issues.push(`${missingAlt} images missing alt text`);

    // SCORE
    let score = 100;
    if (semanticCount < 5) score -= 20;
    if (semanticCount > 50) score -= 10;
    if (missingAlt > 0) score -= missingAlt * 5;

    return { score, issues };
}
const Apify = require('apify');

const { utils: { log } } = Apify;

exports.handleStart = async ({ request, page }) => {
    const url = request.url;
    const strainCount = await page
        .locator("[data-testid='strain-list__strain-card']")
        .count();
    const strainNameList = [];
    for (let i = 0; i < strainCount; i++) {
        const strainCard = await page
            .locator("[data-testid='strain-list__strain-card']")
            .nth(i);
        const strainName = await strainCard
            .locator("[itemprop='name']")
            .textContent();
        const strainLink = await strainCard
            .locator('a').nth(0)
            .getAttribute('href');
        const strainLinkFull = `https://www.leafly.com/strains${strainLink}`;
        const strainType = await strainCard
            .locator("[class='inline-block font-bold text-xs bg-leafly-white py-xs px-sm rounded mr-xs']")
            .textContent();
        const thcPercent = await strainCard.locator("span[class='mr-md text-xs']").nth(0).textContent();
        const secondaryCannabinoidPercent = await strainCard.locator("span[class='mr-md text-xs']").nth(1).textContent();
        const dominantTerpene = await strainCard.locator("div[class='capitalize']").textContent();

        strainNameList.push({
            strainName,
            url,
            strainLinkFull,
            strainType,
            thcPercent,
            secondaryCannabinoidPercent,
            dominantTerpene,
        });
    }
    await Apify.pushData(strainNameList);
};

exports.handleList = async ({ request, page }) => {
    // Handle pagination
};

exports.handleDetail = async ({ request, page }) => {
    // Handle details
};

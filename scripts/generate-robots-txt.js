const fs = require("fs");

const robotsTxt = `User-agent: *\nDisallow: /`;

function generateRobotsTxt() {
    // Create robots.txt file
    fs.writeFileSync("public/robots.txt", robotsTxt);

    console.log(`Generated a  public/robots.txt`);
}

module.exports = generateRobotsTxt;

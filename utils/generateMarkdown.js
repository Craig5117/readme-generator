const generateInstallation = installInstructions => {
  if (!installInstructions) {
    return '';
  }
  return `

---

## Installation
 
${installInstructions}`
};

const generateUsage = usageInstructions => {
  if (!usageInstructions) {
    return '';
  }
  return `

---

## Usage

  ${usageInstructions}`
};

const generateContributing = contribGuidelines => {
  if (!contribGuidelines) {
    return '';
  }
  return `

---

## Contributing

${contribGuidelines}`
}
const generateTesting = testInstructions => {
  if (!testInstructions) {
    return '';
  }
  return `

---

## Testing

${testInstructions}`
}

const generateLicense = license => {
  if (license === "none") {
    return '';
  }
  return `

---

## License

This project is covered under the ${license}.`
}

const generateQuestions = (confirmQuestions, github, email) => {
  if (!confirmQuestions) {
    return;
  }
  if (!email) {
    email = '';
  }
  return `
  
---
  
## Questions

If you have any questions, contact me at:
[GitHub](https://github.com/${github})
  
${email}`
}

function generateContents(data) {
  let contents =``
  let installLink = `
- [Installation](#installation)`;
  let usageLink =`
- [Usage](#usage)`;
  let contributingLink =`
- [Contributing](#contributing)`;
  let testingLink = `
- [Testing](#testing)`;
  let licenseLink = `
- [License](#license)`
  let questionsLink = `
- [Questions](#questions)`;
  if (data.confirmInstallation) {
    contents = contents + installLink;
  }

  if (data.confirmUsage) {
    contents = contents + usageLink;
  }
  
  if (data.confirmContributing) {
    contents = contents + contributingLink;
  }
  
  if (data.confirmTesting) {
    contents = contents + testingLink;
  }
 
  if (data.license != "none") {
    contents = contents + licenseLink;
  }

  if (data.confirmQuestions) {
    contents = contents + questionsLink;
  }
  return contents; 
}
 

// function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
## Description 
 ${data.description}

---

## Contents 
${generateContents(data)}${generateInstallation(data.installation)}${generateUsage(data.usage)}${generateContributing(data.contributing)}${generateTesting(data.testing)}${generateLicense(data.license)}${generateQuestions(data.confirmQuestions, data.github, data.email)}
`;
}

module.exports = generateMarkdown;

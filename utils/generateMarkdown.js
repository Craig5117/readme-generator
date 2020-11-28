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
${generateContents(data)} ${generateInstallation(data.installation)} ${generateUsage(data.usage)}
`;
}

module.exports = generateMarkdown;

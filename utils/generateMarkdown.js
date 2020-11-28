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
const generateTesting = testCommand => {
  if (!testCommand) {
    return '';
  }
  return `

---

## Testing

`+ 'Run ' + '`' + testCommand + '`' + ' to test.'
}

const getLicenseBadge = license => {
  let badge = '';
  switch (license) {
    case 'Apache License 2.0':
        badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        break;
    case 'GNU General Public License v3.0': 
        badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
        break;
    case 'MIT License':
        badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        break;
    case 'BSD 2-Clause "Simplified" License':
        badge = '[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)';
        break;
    case 'BSD 3-Clause "New" or "Revised" License':
        badge = '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
        break;
    case 'Boost Software License 1.0':
        badge = '[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)';
        break;
    case 'Creative Commons Zero v1.0 Universal':
        badge = '[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)';
        break;
    case 'Eclipse Public License 2.0':
        badge = '[![License](https:// https://img.shields.io/badge/License-EPL%202.0-red)](https:// https://opensource.org/licenses/EPL-2.0)';
        break;
    case 'GNU Affero General Public License v3.0':
        badge = '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)';
        break;
    case 'GNU General Public License v2.0':
        badge = '[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)';
        break;
    case 'GNU Lesser General Public License v3.0':
        badge = '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)';
        break;
    case 'Mozilla Public License 2.0':
        badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
        break;
    case 'The Unlicense':
        badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';
        break;
    default:
        badge = '';
        break;
  }
  return badge
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

const generateContributors = (confirmation, contributorsInfo) => {
  if (!confirmation) {
    return '';
  }
  console.log(contributorsInfo)
  return `
  
---

## Contributors

${ contributorsInfo.map(({contributor, contGithub}) => {
    return `

---
---
    
${contributor}
    
[${contGithub}](https://github.com/${contGithub})`
  }).join('')}

---`
}

const generateQuestions = (confirmQuestions, github, email) => {
  console.log(confirmQuestions)
  if (!confirmQuestions) {
    return '';
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

const generateContents = data => {
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
  let contributorsLink = `
- [Contributors](#contributors)`
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

  if (data.confirmContributors) {
    contents = contents + contributorsLink;
  }

  if (data.confirmQuestions) {
    contents = contents + questionsLink;
  }
  return contents; 
}
 

// function to generate markdown for README
const generateMarkdown = data => {
  return `# ${data.title}
## Description 

${data.description}

${getLicenseBadge(data.license)}

---

## Contents 
${generateContents(data)}${generateInstallation(data.installation)}${generateUsage(data.usage)}${generateContributing(data.contributing)}${generateTesting(data.testing)}${generateLicense(data.license)}${generateContributors(data.confirmContributors, data.contributors)}${generateQuestions(data.confirmQuestions, data.github, data.email)}
`;
}

module.exports = generateMarkdown;

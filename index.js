const inquirer = require('inquirer');

const fs = require('fs');

const generateMarkdown = require('./utils/generateMarkdown.js');
// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub Username? (Required)',
        validate: githubInput => {
            if (githubInput) {
              return true;
            }
            else {
              console.log('Please enter your GitHub Username.');
              return false;
            }
        }
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project? (Required)',
        validate: titleInput => {
            if (titleInput) {
              return true;
            }
            else {
              console.log('Please enter a title.');
              return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project. (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          }
          else {
            console.log('Please enter a description.');
            return false;
          }
        }
    },
    {
        type: 'confirm',
        name: 'confirmInstallation',
        message: 'Would you like to enter installation instructions for an "Installation" section?',
        default: true
    },
      {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions for your project?',
        when: ({ confirmInstallation }) => {
          if (confirmInstallation) {
            return true;
          } 
          else {
            return false;
          }
        }
    },
    {
        type: 'confirm',
        name: 'confirmUsage',
        message: 'Would you like to enter usage instructions for a "Usage" section?',
        default: true
    },
      {
        type: 'input',
        name: 'usage',
        message: 'What are the usage instructions for your project?',
        when: ({ confirmUsage }) => {
          if (confirmUsage) {
            return true;
          } 
          else {
            return false;
          }
        }
    },
    {
        type: 'confirm',
        name: 'confirmContributing',
        message: 'Would you like to enter contribution guidelines for a "Contributing" section?',
        default: true
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'What are the contribution guidelines for your project?',
        when: ({ confirmContributing }) => {
          if (confirmContributing) {
            return true;
          } 
          else {
            return false;
          }
        }
    },
    {
        type: 'confirm',
        name: 'confirmTesting',
        message: 'Do you have a test you would like to include in a "Testing" section?',
        default: true
    },
    {
        type: 'input',
        name: 'testing',
        message: 'Type the command to run your test:',
        when: ({ confirmTesting }) => {
          if (confirmTesting) {
            return true;
          } 
          else {
            return false;
          }
        }
    },
    {
        type: 'confirm',
        name: 'confirmQuestions',
        message: 'Would you like to include contact information so that you can be reached for "Questions" about this project?',
        default: true
    },
    {
        type: 'confirm',
        name: 'confirmEmail',
        message: 'Would you like include your email?',
        when: ({ confirmQuestions }) => {
            if (confirmQuestions) {
              return true;
            } 
            else {
              return false;
            }
        }
    },
    
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        when: ({ confirmEmail }) => {
          if (confirmEmail) {
            return true;
          } 
          else {
            return false;
          }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose your license from the list below:',
        choices: ['Apache License 2.0', 'GNU General Public License v3.0','MIT License', 'BSD 2-Clause "Simplified" License', 'BSD 3-Clause "New" or "Revised" License', 'Boost Software License 1.0', 'Creative Commons Zero v1.0 Universal', 'Eclipse Public License 2.0', 'GNU Affero General Public License v3.0', 'GNU General Public License v2.0', 'GNU Lesser General Public License v3.0', 'Mozilla Public License 2.0', 'The Unlicense', 'none']
    },
    {
        type: 'confirm',
        name: 'confirmContributors',
        message: 'Would you like to add contributors to this project in a "Contributors" section?',
        default: false
    }
];

const promptContributors = projectData => {
    if (!projectData.confirmContributors) {
        return projectData
    }
    else{
        if (!projectData.contributors) {
            projectData.contributors = [];
        }
        console.log(`
        =====================
        Add a New Contributor
        =====================
        `);
        return inquirer.prompt([
            {
                type: 'input',
                name: 'contributor',
                message: 'What is the name of the contributor?',
                validate: contributorInput => {
                    if (contributorInput) {
                    return true;
                    }
                    else {
                    console.log('Please enter a name.');
                    return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'contGithub',
                message: "What is the contributor's GitHub Username? (Required)",
                validate: contGithubInput => {
                    if (contGithubInput) {
                    return true;
                    }
                    else {
                    console.log('Please enter a name.');
                    return false;
                    }
                }
            },
            // {
            //     type: 'confirm',
            //     name: 'confirmContEmail',
            //     message: "Would you like to include the contributor's email address?",
            //     default: true
            // },
            // {
            //     type: 'input',
            //     name: 'contEmail',
            //     message: "What is the contributor's email address?",
            //     when: ({ confirmContEmail }) => {
            //       if (confirmContEmail) {
            //         return true;
            //       } 
            //       else {
            //         return false;
            //       }
            //     }
            // },
            {
                type: 'confirm',
                name: 'confirmAddContributor',
                message: 'Would you like to enter another contributor?',
                default: false,
            },
        ])
        .then(contributorData => {
            projectData.contributors.push(contributorData);
            if (contributorData.confirmAddContributor) {
            return promptContributors(projectData);
            }
            else {
            return projectData;
            }
        })
    }
}

// function to write README file
function writeToFile(fileName, data) {
    console.log("Generating README...")
    fs.writeFile(fileName, data, err => {
        if (err) console.log(err)
    })
}

// function to initialize program
const init = () => {
    return inquirer.prompt(
        questions
    );

};

// function call to initialize program
// init()
// .then(promptContributors)
// .then(answers => {
//     return generateMarkdown(answers);
// })
// .then(markdown => {
//     return writeToFile('./dist/README.md', markdown)
// });
(async function app() {
    try {
        const projectData = await init();
        const answers = await promptContributors(projectData);
        const markdown = await generateMarkdown(answers);
        await writeToFile('./dist/README.md', markdown);
        
    } catch (error) {
       if (error) console.log(error) 
    }
})();
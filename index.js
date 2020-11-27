const inquirer = require('inquirer');
// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project? (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
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

];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
const init = () => {
    return inquirer.prompt(
        questions
    );

};

// function call to initialize program
init()
.then(answers => {
    console.log(answers);
});

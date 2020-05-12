# Pet Pad App

## Set Up Front End

### Introduction
As there's so much to cover, we are going to break this down into stages.

### Coding style & conventions
This project front end uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).
The front end style config files have been trialed and tested so sticking to them makes for great conventions and best practices throughout the code.

For IDEs like WebStorm and PyCharm, you can go to `Preferences | Tools | File Watchers` and add automatic watchers for ESLint and Prettier on any files you choose. Upon pressing save the watchers will auto-lint your changes for ease of use.

### Getting Started
#### Setup Front End
The front end uses `Yarn` as it's package manager. Navigate to the frontend directory and use `yarn` to install the dependencies in the `package.json` file. This will generate a `yarn.lock` file. It's advisable to commit this file as and when it is updated.

Once the dependencies are installed, run `yarn start` to run the front end on `port 3000`.

#### Tech Stack
The front end for this project is built in React and React Router with all components built from scratch; relying on no UI library like Bootstrap or Material UI.
 
#### Mobile-First
This client-side project was built primarily on mobile view. Try `Responsive 375 x 639` on `Developer Tools mobile mode` for an optimal mobile-first experience. In addition, this project uses `Flexbox` to appropriately respond to `Desktop resolutions`.

#### Personalised experience
Throughout the app, we refer to the pet by it's actual name. The app even provides the pet with a personal assistant; but the pet's user must be an authenticated premium user. In addition, any posts written on the pet's birthday will be flagged with a little cake icon and will wish the pet a happy birthday. `Try setting its birthday to today to view this little feature.`

#### Features
The main features of this application are:
- `Homepage`: From here pet owners are greeted with the front face of the app, with a button allowing them to register for free. When the user is authenticated they will be able to see a hamburger icon to open other features of the app
- `Auth0 authorisation screen`: Pet owners will come here from the homepage registration button; where they must authenticate to proceed
- `Registration form`: Pet owners here will register their pet across two screens; providing it's basic details like gender, name, height, and weight. The form uses strict Regex pattern matching and required fields to prevent erroneous data or lack thereof.
- `Pet Profile`: Pet owners can amend and add further details about their pet, including their own personal picture (`which must be an image, no greater than 2MB`)
- `Pet Pad`: Pet owners can keep a daily journal about their pet's mood and activities, which are timestamped by date created and date last modified
- `Pet History`: Pet owners can see a log of all their journal entries here, and can freely delete and amend them if they are Premium Users
- `Pet Assistant`: A Premium User-only feature for Pet owners to recieve intelligent feedback from the pet's personal assistant, covering feedback on their mood, their weight, and their personality

#### Documentation
Lastly, the footer provides some essential reading links to the following:
- Privacy policy
- License
- Github Front End repository
- Github Back End repository
- Heroku hosted Swagger Docs API documentation

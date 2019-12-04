# Know Your Representatives

## Description
This application is being developed to help provide useful information about US representatives, including their recent bills, lobbying information, and donors, as well as census data of the districts they represent. We hope to provide a simple yet comprehensive platform for users to learn more about government officials in combination with their financial supporters and voter demographics.

A list of issues can be found on our [Agile Board](https://docs.google.com/spreadsheets/d/1C_aQcTMsnNaqmICL_v85duaONdy7aWSC-H5S85IYbso/edit#gid=0)

## Contributing
### Build Instructions
* **Build the Dependencies**: `npm install`
* **Start the Project**: `npm start`
* **Navigate to the Running Application**: It should open automatically, but if it does not navigate to [localhost:3000](http://localhost:3000) in your browser. This will be the homepage of the application, you can navigate to different pages once they are setup in `App.js`.

### File Structure
There are three primary folders in the application.

**app:** Holds any files that are shared across the application

**components:** Holds all components that are used within our pages

**pages:** Holds the components that make up our pages

**images:** Holds all the images we'll use throughout the application

For CSS files, create a new one for every component to be defined. If it is a style that is used across the whole application, add it to `shared.css`.

## Git
### Submitting Changes
To submit a change to the application, perform the following steps:
* Checkout the master branch `git checkout master`
* Pull any changes `git pull`
* Checkout a new branch `git checkout -b initials-feature_name`
* Modify any files needed
* Add, commit, and push your changes `git add -A`, `git commit -m "Commit message"`, `git push`
* Submit a merge request on GitHub
* Assign any team member as a reviewer
* After approval, merge the request

### Pulling Changes
To pull the latest changes made to the `master` branch, perform the following steps:
* Navigate to the project in a terminal window
* Run the command `git pull origin master` and any changes on `master` will be pulled into the branch you are working on

If you run into errors like `your changes will be overriden`, you need to commit your changes that you've made. Do a `git add -A` and `git commit -m "Commit message"` to save your changes, then try `git pull origin master` again to pull the changes.

_Note: Do not commit directly to master as it can cause conflicts and no one will be able to review the changes_

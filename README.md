<!-- PROJECT DESCRIPTION -->

# 📖 Contractor Connect Front End

This React App is an ongoing project that contacts the <a href="https://github.com/emyrue/contractor_api/">Contractor Connect API</a> to allow users to create accounts and make reservations with contractors.

## 🛠 Built With

### Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://redux.js.org/">Redux.js</a></li>
  </ul>
</details>

</details>

<!-- Features -->

### Key Features

- Users can create and edit their accounts for this site, as well as register as contractors.
- JWT allows users to stay logged in for two weeks.
- Users can make reservations with contractors.
- Users can leave reviews on contractors, and other users can like/dislike those reviews.
- Users can enter a secret code to have their role upgraded to admin.
- Redux stores the necessary information.

<!-- GETTING STARTED -->

## 💻 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

- npm version >= 9

### Setup

Clone this repository to your desired folder:

- git clone git@github.com:emyrue/contractor-front-end.git

This app involves using a cloudinary account to store profile pictures. The app should work fine without it, but there will be some empty image tags and failed api calls.

You will need a gitignored .env file in the root directory with the following values:
- REACT-APP-CLOUD-NAME
- REACT_APP_UPLOAD_PRESET
- REACT_APP_API_KEY
- REACT_APP_API_SECRET
- REACT_APP_CLOUDINARY_URL
- REACT_APP_API_URL
- REACT_APP_BACKEND_ENDPOINT
The first six values have to do with cloudinary, if you choose to set up an account. Otherwise, fill these values with empty strings so the values do not return as undefined.
The last value is the endpoint used to fetch and post data stored in the back end. Visit <a href="https://github.com/emyrue/contractor_api/">Contractor Connect API</a> to see how to set up the back end.

### Install

Install this project with:

- cd contractor-front-end
- npm install

### Usage

To run the project, execute the following command:

- npm start

### Run tests

Tests are not yet in place. Check back for updates.

## 👥 Authors

👤 **Emily Robertson**

- GitHub: [@emyrue](https://github.com/emyrue)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/emilyruthrobertson/)

<!-- FUTURE FEATURES -->

## 🔭 Future Features

- Admin privileges will be put in place
- Users will be able to reset their password
- Design and styling

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./MIT.md) licensed.

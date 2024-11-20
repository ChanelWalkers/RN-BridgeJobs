# React Native - Bridge Jobs

React Native - **Bridge Jobs** is a job portal application designed for tech professionals, particularly in the software development industry. The app allows users to search for job opportunities based on multiple criteria, including location, years of experience, tech stack, company name, programming languages, and job position.

With a user-friendly interface, **Bridge Jobs** ensures job seekers can easily explore job opportunities and access useful career tools, helping them to navigate the job market with ease.

![Logo](https://i.ibb.co/Bz40S4q/Bridge-Jobs-logo.png)

## Authors
- [@ Phung Van Tien Dat](https://github.com/ChanelWalkers "Phung Van Tien Dat")
- [@ Nguyen Quang Huy](https://github.com/TrueNQH "@ Nguyen Quang Huy")
- [@ Nguyen Thang Bao Hung](https://github.com/NguyenBaohHung "@ Nguyen Thang Bao Hung")

## Installation
First clone my project with this command :
```bash
	 git clone https://github.com/ChanelWalkers/RN-BridgeJobs.git
```
Secondly, you have to install all packages and dependencies in project:
```bash
	npm install
```
After finished clone our project you must download **Expo Go** which is a toolkit supports building React Native on Google Plays or Appstore
![Logo](https://play-lh.googleusercontent.com/algsmuhitlyCU_Yy3IU7-7KYIhCBwx5UJG4Bln-hygBjjlUVCiGo1y8W5JNqYm9WW3s=w240-h480-rw)

**Note :** Expo must be version 51 if you don't have link to download just click here:
[Expo Go for SDK 51 Android ](https://expo.dev/go?sdkVersion=51&platform=android&device=true "Expo Go for SDK 51 ")

**Before run app ensure the following environment variables are set for app in .env file. You must create your local .env file**
- `REACT_APP_KEY_API_AI`

Next, you run this command to run this project:
```bash
	npm start
```
As soon as the process finish it will appear a QR on the terminal in your IDE:

![QR](https://i.ibb.co/Wc23w2T/Expo-QR.jpg)

**Scan the QR code above with Expo Go (Android) or the Camera app (iOS)**

## Features
- A salary calculator to estimate gross or net income.
- A chatbot for career advice, CV tips, and job-related guidance.
- Search for job opportunities based on multiple criteria, including location, years of experience, tech stack, company name, programming languages, job position ...
- A CV generator that allows users to fill out a form and create a downloadable PDF resume, you can share or print it
- A "Favorites" feature to save and track preferred job listings.

## Color Reference
| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary | ![#FFFFFF](https://placehold.co/15x15/ffffff/ffffff.png) #ffffff |
| txt | ![#2C2727](https://placehold.co/15x15/2C2727/2C2727.png) #2C2727 |
| titleButton | ![#F5F3F6](https://placehold.co/15x15/F5F3F6/F5F3F6.png) #F5F3F6 |
| background | ![#989898](https://placehold.co/15x15/989898/989898.png) #989898 |
| button | ![#E60023](https://placehold.co/15x15/E60023/E60023.png) #E60023 |
| backgroundChat | ![#d1cccc](https://placehold.co/15x15/d1cccc/d1cccc.png) #d1cccc |
| hr | ![#242323](https://placehold.co/15x15/242323/242323.png) #242323 |
| textLink | ![#6b32c5](https://placehold.co/15x15/6b32c5/6b32c5.png) #6b32c5 |

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://firebase.google.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="firebase" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <img  href="https://reactnative.dev/" target="_blank" rel="noreferrer"> <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40"/> <a href="https://expo.dev/go" target="_blank" rel="noreferrer"> <img src="https://i.ibb.co/VDnVRSb/client.png" alt="firebase" width="40" height="40"/> </a> </p>

## Tech Stack
**Client:**
-  React, React Native
- React Hooks
- React Navigation
- Expo print
- Expo sharing
- Expo file system
- Gifted Chat
- React Context

**Server:** 
- Firebase
- Stripe API


## Usage
1.  Login Screen for user have existing account

![Login Screen](https://i.ibb.co/dJmQdJx/Login.jpg)

2.  SignUp Screen

![SignUp Screen](https://i.ibb.co/ft6DjNF/SignUp.jpg)

3.  Home Screen

![Home Screen](https://i.ibb.co/tpWFfjq/Home-Screen.jpg)

4.  Detail Job appears when user click any job display on Home Screen

![Detail Job](https://i.ibb.co/cQcbH50/Detail-2.jpg)

5.  Like Job Detail Screen when you tap with Company on Bottom Tab Navgator, it will navigate Company Screen and if you press any jobs on this Screen. It appears Company Detail

![Company](https://i.ibb.co/G7rxqj1/Detail-Company.png)

6.  On Job Screen has Search bar when you typing on this you can find job by location, tech stack, skill, country, location, industry ...

![Search Job](https://i.ibb.co/h1scbRN/Search-Job.png)

7.  Edit Profile in Tools

![Edit Profile](https://i.ibb.co/GVg4Srd/Edit-Profile.png)

8.  Additionally, we have Salary converter with guide help you understand how to convert Gross to Net Salary

![SalaryConverter](https://i.ibb.co/BswN88C/Salary-Converter.png)

9.  Then, the last button Chat bot in Tools Screen. It's a chat bot integrated with A.I help you with CV Consulting or anything relevant to job portal or job which you want to apply

![Chatbot](https://i.ibb.co/ZGCKCkB/Chatbot.png)

10.  We can help you generate CV through form with TextInput and TextArea in Tools Screen using expo file system, expo print and expo sharing. You can download or sharing after generated your CV in file PDF.

![GenerateCV](https://i.ibb.co/85nQ0zd/Generate-CV.png)

You can modify Project information up to you

![Project](https://i.ibb.co/G7CrrpX/Project.png)

After Generated CV Successfully, it will save in any position in your file system in your device, or you can sharing any social. 

![ViewLocationFile](https://i.ibb.co/S0Fk3vk/image.png)

To view CV just tap in file PDF which saved in your position you saved .

![ViewCV](https://i.ibb.co/pZr8GjF/image.png)

##Demo
[Link Demo](https://drive.google.com/drive/folders/1ceSsR-WvxLYIhU3GJhOFaTaBmtHg7Kpq "Link Demo")

## License

[MIT](https://choosealicense.com/licenses/mit/)



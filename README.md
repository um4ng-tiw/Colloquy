# Colloquy Chat Application


### About the project


![landing_page_screenshot]

Colloquy is a web based chat application that allows user to perform private text chat as well as private video chat directly from the browser without the use of any external plugin or software installation. The UI has been designed to be simple and easy to use for the novice computer users.

### Built With
![mongodb-shield] ![express-shield] ![react-shield] ![node-shield] ![socket.io-shield] ![webrtc-shield] ![simple-peer]  

* The frontend or the client side has been built using React.
* The backend server is build using Node.js and Express.js.
* Socket.io handles the communication between the server and the clients in realtime. 
* MongoDB is used as the database solution to store the chat messages
* WebRTC and Simple peer package is used to incorporate the private video chat feature in the application.

### Prerequisites
The application doesn't require any prerequisites if its a hosted version. However to run the project from the system make sure your have Node.js installed on your system.

### Execution guide

#### Server side first
1. Download the contents of the repository
2. Locate to the server directory
3. Type the following command inside the server directory on your terminal
  ```sh
  npm install
  ```
4. After the required dependencies have finished the installation execute
  ```sh
  node index.js
  ```
#### Client side
1. Locate to the frontend directory
2. Type the following command inside the frontend directory on your terminal
 ```sh
  npm install
  ```
3. After the required dependencies have finished the installation execute
  ```sh
  npm run start
  ```

## Usage
### Landing Page
![1]

### Login
![2]

### Private Chat
![3]

### Private Video Calling
![4]

### Logging Out
![5]

### Retrieving Database Messages
![6]

### Emojis
![7]

## Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
[![instagram-shield]][instagram]  [![linkedin-shield]][linkedin]


<!-- Links -->
[landing_page_screenshot]: ./Screenshots/landing.PNG
[react-shield]: https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge
[node-shield]:https://img.shields.io/badge/-Nodejs-green?logo=node.js&logoColor=white&style=for-the-badge
[socket.io-shield]:https://img.shields.io/badge/-Socket.io-grey?logo=socket.io&logoColor=white&style=for-the-badge
[linkedin-shield]: https://img.shields.io/badge/-linkedin-0078B6?logo=linkedin&logoColor=white&style=for-the-badge
[webrtc-shield]: https://img.shields.io/badge/-WEBRTC-orange?logo=webrtc&logoColor=white&style=for-the-badge
[simple-peer]: https://img.shields.io/badge/-simple%20peer-blue?logo=npm&logoColor=white&style=for-the-badge
[mongodb-shield]: https://img.shields.io/badge/-MongoDB-darkgreen?logo=mongodb&logoColor=white&style=for-the-badge
[express-shield]: https://img.shields.io/badge/-Express-EBD81C?logo=express&logoColor=black&style=for-the-badge
[linkedin]:https://www.linkedin.com/in/umang-tiwari-bb9781193/
[instagram]:https://www.instagram.com/oxy.moronguy/
[1]: ./Screenshots/1.gif
[2]: ./Screenshots/2.gif
[3]: ./Screenshots/3.gif
[4]: ./Screenshots/4.gif
[5]: ./Screenshots/5.gif
[6]: ./Screenshots/6.gif
[7]: ./Screenshots/7.gif

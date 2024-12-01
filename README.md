# Web-based Street Light Control System  

## 📘 Project Overview  
This project implements a smart street light control system using **Zigbee** and **ESP-32** technologies. The system enables users to monitor and control individual street lights remotely via a web interface. It also detects and notifies users of bulb malfunctions using a **current sensor**. The project employs **MQTT** for communication between the ESP-32 and the **Node.js server** and is fully deployed in **Docker** containers on a cloud server.

The system was tested with **50 bulbs** in a network with unstable conditions, achieving **90% accuracy** in controlling and monitoring.

## 🔧 Technologies Used  
- **Hardware**:  
  - Zigbee modules (coordinator and endpoints)  
  - ESP-32 controller  
  - Current sensor  
- **Communication Protocol**: MQTT (deployed on GCC)  
- **Software**:  
  - **Server**: Node.js  
  - **Web Interface**: React.js  
  - **Cloud Deployment**: Docker  

## 🚀 Key Features  
- **Remote Light Control**: Control individual street lights from anywhere using the web interface.  
- **Real-time Monitoring**: Detect and notify users about malfunctioning bulbs using current sensor data.  
- **Scalability**: Uses Zigbee networks to support multiple endpoint nodes in a stable, energy-efficient setup.  
- **Web Dashboard**: A user-friendly React.js interface to manage and monitor lights remotely.  
- **Cloud-based System**: The Node.js server and React.js interface are deployed in Docker containers on a cloud server for high availability.  
- **Tested at Scale**: Successfully tested with 50 bulbs under unstable network conditions, achieving 90% functionality accuracy.  

## 🔨 Installation & Setup  
1. **Hardware Setup**:  
   - Connect Zigbee modules to the ESP-32 controller and set up endpoint nodes (street lights).  
   - Attach a current sensor to each light to detect malfunctions.  

2. **Software Setup**:  
   - Clone the repository:  
     ```bash
     git clone https://github.com/khemanthvijay/Street-Light-Control-System.git
     ```  
   - Install dependencies for **Node.js** and **React.js**:  
     ```bash
     npm install
     ```  

3. **Run the System in Docker**:  
   - Build and run the Docker containers for the server and web interface:  
     ```bash
     docker-compose up
     ```  

4. **Configure MQTT**:  
   - Ensure MQTT is deployed on **GCC** and configured to enable communication between the ESP-32 and the Node.js server.

5. **Web Interface**:  
   - Access the web interface at `http://<server-ip>:3000` to monitor and control lights.

## 📸 Screenshots  
(Add screenshots of the web interface and hardware setup here.)

## 🏆 Future Improvements  
- **Expanded Network**: Test the system with a larger Zigbee network for urban-scale implementation.  
- **Mobile App**: Develop a mobile app for easier control and notifications.  
- **Enhanced Notifications**: Integrate SMS/email alerts for faster malfunction reporting.  

## 📄 License  
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

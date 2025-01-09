### **FoodBridge: An Intelligent Food Waste Management System**

Welcome to the **FoodBridge** repository! 🚀  
**FoodBridge** is a smart food wastage prediction and management system designed to reduce food waste and improve food redistribution efficiency. Leveraging Machine Learning and IoT, it bridges the gap between food surplus sources (e.g., restaurants, events) and food banks or charities in need.

---

### **Features**

1. **Food Waste Prediction**:  
   - Predicts potential food wastage for events based on factors like guest count, food type, and event type.  
   - Machine Learning models trained on historical data ensure accurate predictions.

2. **Real-time Monitoring**:  
   - Integration for tracking food surplus and leftover quantities.  

3. **Redistribution**:  
   - Suggests optimal redistribution strategies for leftover food to nearby food banks or charities.  

4. **Analytics Dashboard**:  
   - Provides insights on wastage trends, helping businesses minimize future waste.  

---

### **Technologies Used**

- **Frontend**: React.js for the user interface.  
- **Backend**: FastAPI for the RESTful API.  
- **Database**: SQLlite for storing user data, wastage reports, and transaction history.  
- **Machine Learning**: Python (Scikit-learn) for building predictive models.  
- **IoT Integration**: Real-time sensors to capture food surplus data.  

---

### **Installation Guide**

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/ravigargrud/foodbridge.git
   cd foodbridge
   ```

2. **Backend Setup**  
   - Navigate to the `ML` folder:  
     ```bash
     cd ML
     ```
   - Install dependencies:  
     ```bash
     pip install -r requirements.txt
     ```
   - Start the FastAPI server:  
     ```bash
     uvicorn app:app --reload
     ```

3. **Frontend Setup**  
   - Navigate to the `frontend` folder:  
     ```bash
     cd frontend
     ```
   - Install dependencies:  
     ```bash
     npm install
     ```
   - Start the React development server:  
     ```bash
     npm start
     ```

4. **Run the Application**  
   Access the app in your browser at `http://localhost:5173`.

---

### **How It Works**

1. **Input Details**: Users enter event data, including guest count, food type, event type, and storage conditions.
2. **ML Model Prediction**: The backend ML model predicts the quantity of leftover food.
3. **Redistribution Suggestions**: The app suggests nearby food banks or charities for redistribution.
4. **Insights**: Businesses can access reports to analyze and optimize their food management processes.

---

### **Contributing**

We welcome contributions! 🎉  
To contribute:  
1. Fork the repository.  
2. Create a new branch: `git checkout -b feature-name`.  
3. Commit changes: `git commit -m "Add feature"`.  
4. Push to your branch: `git push origin feature-name`.  
5. Create a pull request.

---

### **Acknowledgments**

FoodBridge was developed with a mission to combat food waste and enhance food security. Special thanks to all team members, mentors, and contributors for their support.

---

Let’s make the world more sustainable, one meal at a time! 🌍  
Feel free to reach out for feedback or suggestions. Happy coding! 😊
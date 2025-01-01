# Final Project - Arancha Carpintero Guardiola

This repository corresponds to the final project of the Advanced Python Programming and OOP of CICE, the new technologies school.

It's a web page designed to streamline study methods using **flashcards**. These cards allow you to study terms, vocabulary, dates, and events needed for an exam, assignment, or simple curiosity.

### Description

As a user, you can create **flashcards** with the information you want to study on both sides. For example, if you need to study **phrasal verbs**, on side A you would put the **phrasal verb** and on side B you would put its meaning or translation. Once your flashcards are created, you can go to the **learning** section to start studying.

The web page also allows you to group the cards into **packs** where you can assign a name and category. For example, you could create a pack called **"Phrasal Verbs"** with the category **"English Vocabulary"**, so you can keep all your study content organized in one place.

### Technologies Used

- **Frontend**: 
  - HTML
  - CSS
  - JavaScript (Vanilla, no frameworks)
  
- **Backend**:
  - **Flask**: Web framework used for backend development.
  
- **Database**:
  - **MySQL**: Database used to store user information, flashcards, packs, and categories.
  
- **Libraries**:
  - `Flask`
  - `requests`
  - `flask_sqlalchemy` (used as ORM to interact with the database)

### Requirements

#### External Libraries to Install

1. Create a virtual environment:
   ```bash
   python3 -m venv venv
   ```

2. Install the required libraries:
   ```bash
   pip install flask requests flask_sqlalchemy
   ```

#### Running the Project

1. Download the entire project folder to your local machine.

2. Navigate to the project folder via the terminal.

3. Run the `main.py` file to start the application:
   ```bash
   python main.py
   ```

4. Access the project from your browser by visiting the following URL:
   ```
   http://localhost:5000/welcome
   ```

From there, you will have access to all the project's features.

### Pre-created Users

- **test1**: 
  - Email: `test1@email.com`
  - Password: `1234`
  
- **test2**: 
  - Email: `test2@email.com`
  - Password: `1234`

### Additional Notes

- The project is designed as a simple and efficient tool for studying with flashcards, and it is entirely developed using standard web technologies.
- The MySQL database stores information about cards, users, and categories, making the system flexible and scalable.
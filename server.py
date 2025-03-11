import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText

load_dotenv()


app = Flask(__name__)
CORS(app)

# Serve the frontend files
@app.route('/', methods=['GET'])
def home():
    return send_from_directory('templates', 'index.html')


@app.route('/styles.css', methods=['GET'])
def serve_css():
    return send_from_directory('static', 'styles.css')


@app.route('/script.js', methods=['GET'])
def serve_js():
    return send_from_directory('static', 'script.js')


# Email sending endpoint
@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    print(data)  # Log the incoming data for debugging

    to = data['to']
    subject = data['subject']
    body = data['body']

    # Set up the SMTP server
    email = os.getenv('EMAIL')
    password = os.getenv('PASSWORD')

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()

        # Use environment variables for email and password
        email = os.getenv('EMAIL')
        password = os.getenv('PASSWORD')
        server.login(email, password)

        # Create the email
        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = email
        msg['To'] = ', '.join(to)

        # Send the email
        server.sendmail(email, to, msg.as_string())
        server.quit()
        return jsonify({'message': 'Email sent successfully!', 'data': data}), 200

    except Exception as e:
        return jsonify({'message': 'Error sending email: ' + str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

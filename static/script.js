document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const to = document.getElementById('to').value.split(',').map(email => email.trim());
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('body').value;

    // Send email logic here
    fetch('http://localhost:5000/send-email', {  // Ensure this matches your Flask server URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to, subject, body })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('status').innerText = data.message;
    })
    .catch(error => {
        document.getElementById('status').innerText = 'Error sending email: ' + error.message;
    });
});
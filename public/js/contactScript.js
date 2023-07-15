window.onload=function(){
    const contactForm = document.getElementById('contactForm');

    // submit contact form
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);

        const contactData = {};
        for (let [key, value] of formData.entries()) {
        contactData[key] = value;
        }

        fetch('http://localhost:1000/api/client/addContact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('contactForm').reset();
        alert("Message Sent Success")
        })
        .catch(error => {
            alert("Message Sent Fail")
        });
  });



  
}


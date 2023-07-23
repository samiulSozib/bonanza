
    // fetch footer contact information 
    function getFooterInfo(){
        fetch('/api/client/contactInformation')
        .then((response) => response.json())
        .then((data) => {
        // Populate the contact sections in the footer
            const contactInformation1 = document.getElementById('contactInformation1');
            const contactInformation2 = document.getElementById('contactInformation2');


            contactInformation1.innerHTML='';
            contactInformation2.innerHTML=''

                const htmlContent1 = `
                  <li class="font-bold uppercase">${data[0].name}</li>
                  <li class="flex items-center gap-x-2">
                    <i class="bi bi-person-circle"></i>
                    ${data[0].designation}
                  </li>
                  <li class="flex items-center gap-x-2">
                    <i class="bi bi-telephone"></i>
                    ${data[0].phoneNumber}
                  </li>
                  <li class="flex items-center gap-x-2">
                    <i class="bi bi-envelope"></i>
                    ${data[0].email}
                  </li>
                  <li class="flex items-center gap-x-2">
                    <i class="bi bi-geo-alt"></i>
                    ${data[0].location}
                  </li>
                `;

                const htmlContent2 = `
                  <li class="font-bold uppercase">${data[1].name}</li>
                  <li class="flex items-center gap-x-2">
                    <i class="bi bi-person-circle"></i>
                    ${data[1].designation}
                  </li>
                  <li class="flex items-center gap-x-2">
                    <i class="bi bi-telephone"></i>
                    ${data[1].phoneNumber}
                  </li>
                  <li class="flex items-center gap-x-2">
                    <i class="bi bi-envelope"></i>
                    ${data[1].email}
                  </li>
                  <li class="flex items-center gap-x-2">
                    <i class="bi bi-geo-alt"></i>
                    ${data[1].location}
                  </li>
                `;
          
                // Add the HTML content to the appropriate contact section
                
                  contactInformation1.innerHTML += htmlContent1;
               
                  contactInformation2.innerHTML += htmlContent2;
               
              
            
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }
// post contact form 
function postContactForm(){
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);

        const contactData = {};
        for (let [key, value] of formData.entries()) {
            contactData[key] = value;
        }

        fetch('/api/client/addContact', {
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


// post enquiry form 
function postEnquiryForm(){
    const enquiryForm = document.getElementById('enquiryForm');


    
    enquiryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const _form = event.target;
        const _formData = new FormData(_form);

        const enquiryData = {};
        for (let [key, value] of _formData.entries()) {
            enquiryData[key] = value;
        }
        console.log(enquiryData)
        fetch('/api/client/addEnquiry', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(enquiryData)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('enquiryForm').reset();
            alert("Enquiry Sent Success")
        })
        .catch(error => {
            alert("Enquiry Sent Fail")
        });
    });
}
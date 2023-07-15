window.onload=function(){
    const enquiryForm = document.getElementById('enquiryForm');

  // submit enquiry form
    
    enquiryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const _form = event.target;
        const _formData = new FormData(_form);

        const enquiryData = {};
        for (let [key, value] of _formData.entries()) {
            enquiryData[key] = value;
        }
        console.log(enquiryData)
        fetch('http://localhost:1000/api/client/addEnquiry', {
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
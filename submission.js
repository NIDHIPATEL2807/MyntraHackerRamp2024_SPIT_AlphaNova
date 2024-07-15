document.addEventListener("DOMContentLoaded", () => {
    const submissionForm = document.getElementById("submission-form");
  
    submissionForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // Get form data
      const formData = new FormData(submissionForm);
      const challenge = formData.get("challenge");
      const photo = formData.get("photo");
      const description = formData.get("description");
  
      // Here you would typically send the form data to your backend server
      // using fetch or axios. For now, we'll just log it to the console.
      console.log({ challenge, photo, description });
  
      alert("Submission successful!");
    });
  });
  
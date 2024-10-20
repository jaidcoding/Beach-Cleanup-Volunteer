document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: 'smooth'
          });
      }
  });
});

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents form submission to a server

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const age = document.getElementById('age').value;
  const email = document.getElementById('email').value.trim();
  const reason = document.getElementById('reason').value.trim();

  if (!firstName || !lastName || !age || !email || !reason) {
      alert("Please fill out all fields.");
      return; // Exit the function early
  }

  if (age <= 0) {
      alert("Please enter a valid age.");
      return; // Exit the function early
  }

  // Save to localStorage
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("age", age);
  localStorage.setItem("email", email);
  localStorage.setItem("reason", reason);

  alert("Your information has been saved locally!");

  // Clear form after save
  document.querySelector('form').reset();
});

// Automatically cycles the carousel every 5 seconds
document.addEventListener('DOMContentLoaded', function () {
  const carouselElement = document.querySelector('#carouselExampleIndicators');
  const carousel = new bootstrap.Carousel(carouselElement, {
      interval: 5000,
      ride: 'carousel'
  });

  // Pause carousel when mouse enters, resume when mouse leaves
  carouselElement.addEventListener('mouseenter', () => {
      carousel.pause();
  });

  carouselElement.addEventListener('mouseleave', () => {
      carousel.cycle();
  });
});

// Load saved data on page load
window.onload = function() {
  const savedFirstName = localStorage.getItem("firstName");
  const savedLastName = localStorage.getItem("lastName");
  const savedAge = localStorage.getItem("age");
  const savedEmail = localStorage.getItem("email");
  const savedReason = localStorage.getItem("reason");

  if (savedFirstName) document.getElementById("first-name").value = savedFirstName;
  if (savedLastName) document.getElementById("last-name").value = savedLastName;
  if (savedAge) document.getElementById("age").value = savedAge;
  if (savedEmail) document.getElementById("email").value = savedEmail;
  if (savedReason) document.getElementById("reason").value = savedReason;
};

// Handle image preview
document.getElementById("picture").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const preview = document.createElement("img");
          preview.src = e.target.result;
          preview.style.maxWidth = "200px";
          preview.style.marginTop = "15px";
          preview.style.borderRadius = "8px";
          preview.style.display = "block";
          preview.style.marginLeft = "auto";
          preview.style.marginRight = "auto";

          // Remove previous preview if there’s any
          const existingPreview = document.querySelector(".image-preview");
          if (existingPreview) {
              existingPreview.remove();
          }

          // Add a class to easily style or remove the preview
          preview.classList.add("image-preview");
          document.querySelector(".signUp").appendChild(preview);
      };
      reader.readAsDataURL(file);
  } else {
      alert("File is too large! Please upload an image smaller than 2 MB.");
      event.target.value = ""; // Clear file input
  }
});

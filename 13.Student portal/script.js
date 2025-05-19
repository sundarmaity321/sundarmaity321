document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const sidebar = document.querySelector(".sidebar");

  mobileMenuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });

  // Sidebar Menu Functionality
  const menuItems = document.querySelectorAll(
    ".sidebar-menu li:not(.has-submenu)"
  );
  const submenuTitles = document.querySelectorAll(
    ".has-submenu .submenu-title"
  );

  // Handle main menu items click
  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all menu items
      menuItems.forEach((i) => i.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Get the section to show
      const sectionId = this.getAttribute("data-section");

      // Hide all content sections
      document.querySelectorAll(".content-section").forEach((section) => {
        section.classList.remove("active");
      });

      // Show the selected section
      if (sectionId) {
        document.getElementById(`${sectionId}-section`).classList.add("active");
      } else {
        document.getElementById("dashboard-section").classList.add("active");
      }

      // Close sidebar on mobile
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
      }
    });
  });

  // Handle submenu titles click
  submenuTitles.forEach((title) => {
    title.addEventListener("click", function () {
      const parent = this.parentElement;
      const submenu = parent.querySelector(".submenu");

      // Toggle submenu
      submenu.classList.toggle("active");

      // Rotate chevron icon
      const icon = this.querySelector(".fa-chevron-down");
      icon.classList.toggle("rotate");
    });
  });

  // Profile Edit Functionality
  const editBtn = document.querySelector(".edit-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const saveBtn = document.querySelector(".save-btn");
  const formInputs = document.querySelectorAll(
    "#profileForm input:not([readonly]), #profileForm textarea:not([readonly])"
  );

  editBtn.addEventListener("click", function () {
    // Make inputs editable
    formInputs.forEach((input) => {
      input.removeAttribute("readonly");
    });

    // Show save and cancel buttons
    cancelBtn.style.display = "block";
    saveBtn.style.display = "block";

    // Hide edit button
    this.style.display = "none";
  });

  cancelBtn.addEventListener("click", function () {
    // Make inputs readonly again
    formInputs.forEach((input) => {
      input.setAttribute("readonly", true);
    });

    // Hide save and cancel buttons
    this.style.display = "none";
    saveBtn.style.display = "none";

    // Show edit button
    editBtn.style.display = "block";
  });

  // Payment Options Selection
  const paymentOptions = document.querySelectorAll(".payment-option");

  paymentOptions.forEach((option) => {
    option.addEventListener("click", function () {
      paymentOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Assignment Filter Buttons
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      // Here you would filter the assignments based on the selected filter
    });
  });

  // Circular Progress Animation
  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = circularProgress.getAttribute("data-percent");

  circularProgress.style.setProperty("--percent", progressValue);

  // Create SVG gradient
  const svg = circularProgress.querySelector("svg");
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  gradient.setAttribute("id", "gradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "100%");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#4e54c8");

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#8f94fb");

  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  svg.insertBefore(defs, svg.firstChild);

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 768 &&
      !sidebar.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      sidebar.classList.remove("active");
    }
  });

  // Initialize dashboard as active
  document.getElementById("dashboard-section").classList.add("active");
  document
    .querySelector('.sidebar-menu li[data-section="dashboard"]')
    .classList.add("active");

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
    }
  });
});

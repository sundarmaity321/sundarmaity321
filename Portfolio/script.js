// JS for Floating Weather
const API_KEY = "443697e340b062669ad563fef0c0d09e"; // Replace with your OpenWeatherMap API Key

const widget = document.getElementById("weatherWidget");
const toggleBtn = document.getElementById("weatherToggle");
const themeToggle = document.getElementById("themeToggle");
const loc = document.getElementById("location");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const icon = document.getElementById("icon");
const loading = document.querySelector(".loading");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

// Toggle popup
toggleBtn.addEventListener("click", () => {
  widget.style.display = widget.style.display === "block" ? "none" : "block";
});

// Theme toggle
function applyTheme(theme) {
  if (theme === "dark") {
    widget.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    widget.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
}

let currentTheme = localStorage.getItem("weather-theme") || "light";
applyTheme(currentTheme);

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  localStorage.setItem("weather-theme", currentTheme);
  applyTheme(currentTheme);
});

function displayWeather(data) {
  loading.style.display = "none";
  loc.textContent = `📍 ${data.name}`;
  temp.textContent = `🌡️ ${data.main.temp}°F`;
  desc.textContent = `🌥️ ${data.weather[0].description}`;
  const iconCode = data.weather[0].icon;
  icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  icon.alt = data.weather[0].main;
}

function fetchWeatherByCoords(lat, lon) {
  loading.style.display = "block";
  loading.textContent = "Fetching weather...";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  fetch(url)
    .then((res) => res.json())
    .then(displayWeather)
    .catch((err) => {
      loading.textContent = "Error fetching weather";
      console.error(err);
    });
}

function fetchWeatherByCity(city) {
  loading.style.display = "block";
  loading.textContent = "Searching...";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        loading.textContent = "City not found";
        return;
      }
      displayWeather(data);
    })
    .catch((err) => {
      loading.textContent = "Search error";
      console.error(err);
    });
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeatherByCity(city);
});

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        fetchWeatherByCoords(lat, lon);
      },
      (err) => {
        loading.textContent = "Location access denied";
        console.error(err);
      }
    );
  } else {
    loading.textContent = "Geolocation not supported";
  }
}

// Draggable
let isDragging = false,
  offsetX,
  offsetY;
widget.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - widget.offsetLeft;
  offsetY = e.clientY - widget.offsetTop;
  widget.style.cursor = "grabbing";
});
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    widget.style.left = `${e.clientX - offsetX}px`;
    widget.style.top = `${e.clientY - offsetY}px`;
  }
});
document.addEventListener("mouseup", () => {
  isDragging = false;
  widget.style.cursor = "move";
});

// Auto-refresh every 5 minutes
setInterval(getLocationWeather, 300000);
getLocationWeather(); // Initial load

// CSS for scroll to top button
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("goToBottomBtn");
  let isScrolling = false;

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (isScrolling) return;

    // Show button if scrolled more than 100px
    if (window.scrollY > 100) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  // Smooth scroll to bottom
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    isScrolling = true;
    btn.classList.remove("visible");

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

    // Reset flag after scroll completes
    setTimeout(() => {
      isScrolling = false;
      if (window.scrollY > 100) {
        btn.classList.add("visible");
      }
    }, 1000);
  });
});

// Script for Bck To Top Button
document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.getElementById("backToTop");
  let isScrolling = false;

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (isScrolling) return;

    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  // Smooth scroll to top
  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    isScrolling = true;
    backToTopButton.classList.remove("visible");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Reset flag after scroll completes
    setTimeout(() => {
      isScrolling = false;
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible");
      }
    }, 1000);
  });
});

// Script for Help center
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const helpButton = document.getElementById("helpButton");
  const helpOptions = document.querySelector(".help-options");
  const liveChatOption = document.getElementById("liveChatOption");
  const chatContainer = document.getElementById("chatContainer");
  const closeChat = document.getElementById("closeChat");
  const chatMessages = document.getElementById("chatMessages");
  const quickQuestions = document.getElementById("quickQuestions");
  const chatInput = document.getElementById("chatInput");
  const sendMessage = document.getElementById("sendMessage");

  // State variables
  let optionsVisible = false;
  let chatVisible = false;

  // Enhanced Knowledge Base with URLs and follow-ups
  const knowledgeBase = {
    password: {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking 'Forgot Password' on the login page. We'll send a reset link to your email.",
      url: "/password-reset",
      followups: {
        no_reset_email: {
          question: "What if I don't receive the reset email?",
          answer:
            "Check your spam folder first. If it's not there, wait 10 minutes or request another reset link.",
          url: "/help/password-issues",
          followups: {},
        },
        no_email_access: {
          question: "Can I reset without email access?",
          answer:
            "Contact our support team with proof of identity to verify your account.",
          url: "/contact-support",
          followups: {},
        },
      },
    },
    hours: {
      question: "What are your business hours?",
      answer:
        "Our team is available Monday-Friday, 9AM-6PM EST. Automated support is available 24/7.",
      url: "index.html",
      followups: {
        weekend: {
          question: "Do you offer weekend support?",
          answer:
            "We have limited weekend support from 10AM-4PM EST on Saturdays.",
          url: "/weekend-support",
          followups: {},
        },
      },
    },
    orders: {
      question: "Where can I find my order history?",
      answer:
        "Log into your account and visit 'My Orders' in your dashboard to view all past orders.",
      url: "/account/orders",
      followups: {
        download: {
          question: "Can I download my order history?",
          answer:
            "Yes, click the 'Export' button in the top-right corner of your order history page.",
          url: "/help/export-orders",
          followups: {},
        },
      },
    },
    refunds: {
      question: "Do you offer refunds?",
      answer:
        "We offer 30-day refunds for most products. See our Refund Policy for exceptions.",
      url: "/refund-policy",
      followups: {
        process_time: {
          question: "How long do refunds take?",
          answer:
            "Refunds typically process in 5-7 business days after we receive your return.",
          url: "/refund-process",
          followups: {},
        },
      },
    },
  };

  // Initialize chat with quick questions
  function initChat() {
    quickQuestions.innerHTML = "";
    Object.values(knowledgeBase).forEach((item) => {
      const questionElement = document.createElement("div");
      questionElement.classList.add("quick-question");
      questionElement.textContent = item.question;
      questionElement.addEventListener("click", () => {
        addUserMessage(item.question);
        showTypingIndicator();
        setTimeout(() => {
          removeTypingIndicator();
          addBotMessage(item.answer, item.followups, item.url);
        }, 1000);
      });
      quickQuestions.appendChild(questionElement);
    });
  }

  // Show typing indicator
  function showTypingIndicator() {
    const typingElement = document.createElement("div");
    typingElement.classList.add(
      "chat-message",
      "bot-message",
      "typing-indicator"
    );
    typingElement.id = "typingIndicator";

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("div");
      dot.classList.add("typing-dot");
      typingElement.appendChild(dot);
    }

    chatMessages.appendChild(typingElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Remove typing indicator
  function removeTypingIndicator() {
    const typingElement = document.getElementById("typingIndicator");
    if (typingElement) {
      typingElement.remove();
    }
  }

  // Toggle help options
  helpButton.addEventListener("click", (e) => {
    e.stopPropagation();
    optionsVisible = !optionsVisible;
    helpOptions.classList.toggle("show", optionsVisible);
  });

  // Open live chat
  liveChatOption.addEventListener("click", (e) => {
    e.preventDefault();
    optionsVisible = false;
    helpOptions.classList.remove("show");
    chatVisible = true;
    chatContainer.classList.add("visible");
    initChat();
  });

  // Close live chat
  closeChat.addEventListener("click", () => {
    chatVisible = false;
    chatContainer.classList.remove("visible");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!helpButton.contains(e.target) && !helpOptions.contains(e.target)) {
      helpOptions.classList.remove("show");
      optionsVisible = false;
    }
  });

  // Find best matching question
  function findBestMatch(message) {
    const lowerMessage = message.toLowerCase();

    // Check main questions
    for (const category in knowledgeBase) {
      if (
        lowerMessage.includes(category) ||
        knowledgeBase[category].question.toLowerCase().includes(lowerMessage)
      ) {
        return {
          answer: knowledgeBase[category].answer,
          followups: knowledgeBase[category].followups,
          url: knowledgeBase[category].url,
        };
      }
    }

    // Check follow-ups if no main match found
    for (const category in knowledgeBase) {
      for (const followupKey in knowledgeBase[category].followups) {
        const followup = knowledgeBase[category].followups[followupKey];
        if (followup.question.toLowerCase().includes(lowerMessage)) {
          return {
            answer: followup.answer,
            followups: followup.followups,
            url: followup.url,
          };
        }
      }
    }

    return null;
  }

  // Add user message to chat
  function addUserMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", "user-message");
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Add bot message with follow-ups and URL
  function addBotMessage(message, followups = {}, url = null) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", "bot-message");
    messageElement.textContent = message;

    // Add URL link if available
    if (url) {
      const linkElement = document.createElement("a");
      linkElement.href = url;
      linkElement.textContent = "Learn more →";
      linkElement.classList.add("answer-link");
      linkElement.target = "_blank";
      messageElement.appendChild(document.createElement("br"));
      messageElement.appendChild(linkElement);
    }

    // Add follow-up questions if available
    if (Object.keys(followups).length > 0) {
      const followupContainer = document.createElement("div");
      followupContainer.classList.add("followup-questions");

      Object.values(followups).forEach((followup) => {
        const followupElement = document.createElement("button");
        followupElement.classList.add("followup-question");
        followupElement.textContent = followup.question;
        followupElement.addEventListener("click", () => {
          addUserMessage(followup.question);
          showTypingIndicator();
          setTimeout(() => {
            removeTypingIndicator();
            addBotMessage(followup.answer, followup.followups, followup.url);
          }, 1000);
        });
        followupContainer.appendChild(followupElement);
      });

      messageElement.appendChild(followupContainer);
    }

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Send message handler
  function sendMessageHandler() {
    const message = chatInput.value.trim();
    if (message) {
      addUserMessage(message);
      chatInput.value = "";
      showTypingIndicator();

      setTimeout(() => {
        removeTypingIndicator();
        const bestMatch = findBestMatch(message);
        if (bestMatch) {
          addBotMessage(bestMatch.answer, bestMatch.followups, bestMatch.url);
        } else {
          addBotMessage(
            "I'm not sure I understand. Could you try asking differently?",
            {},
            "/help-center"
          );
        }
      }, 1500);
    }
  }

  // Event listeners for sending messages
  sendMessage.addEventListener("click", sendMessageHandler);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessageHandler();
    }
  });

  // Initialize chat
  initChat();
});

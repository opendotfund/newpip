// File upload functionality
window.handleFileUpload = function(event) {
    const file = event.target.files[0];
    if (file) {
        console.log('File selected:', file.name);
        
        // Update the input placeholder to show file is attached
        const chatInput = document.getElementById('chat-input');
        const originalPlaceholder = chatInput.getAttribute('data-original-placeholder') || 'describe your app idea';
        
        if (!chatInput.getAttribute('data-original-placeholder')) {
            chatInput.setAttribute('data-original-placeholder', originalPlaceholder);
        }
        
        chatInput.placeholder = `📎 ${file.name} attached - ${originalPlaceholder}`;
        
        // Add visual feedback
        const paperclipBtn = document.querySelector('.chatbox-btn');
        paperclipBtn.style.background = 'rgba(108, 99, 255, 0.2)';
        paperclipBtn.style.borderColor = 'var(--brand-primary)';
        
        // Reset after 3 seconds
        setTimeout(() => {
            paperclipBtn.style.background = '';
            paperclipBtn.style.borderColor = '';
        }, 3000);
    }
};

// FAQ Toggle Functionality - BULLETPROOF VERSION
window.toggleFAQ = function(element) {
    console.log('FAQ toggle clicked:', element);
    
    // Get the answer element
    const answer = element.querySelector('.faq-answer');
    console.log('Answer element:', answer);
    
    // Check if this item is currently expanded
    const isExpanded = element.classList.contains('expanded');
    console.log('Is expanded:', isExpanded);
    
    // Close all FAQ items first
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach(item => {
        item.classList.remove('expanded');
        const itemAnswer = item.querySelector('.faq-answer');
        if (itemAnswer) {
            itemAnswer.classList.add('hidden');
        }
    });
    
    // If this item wasn't expanded, expand it
    if (!isExpanded) {
        element.classList.add('expanded');
        answer.classList.remove('hidden');
        console.log('Opening FAQ item');
    }
    
    console.log('Final state - expanded:', element.classList.contains('expanded'));
    console.log('Answer hidden:', answer.classList.contains('hidden'));
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing...');
  
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
    console.log('Lucide icons initialized');
  }

  // Initialize file upload
  const fileInput = document.getElementById('file-input');
  if (fileInput) {
    fileInput.addEventListener('change', window.handleFileUpload);
    console.log('File upload initialized');
  }

  // Initialize FAQ - ensure all answers start hidden
  const faqAnswers = document.querySelectorAll('.faq-answer');
  console.log('Found FAQ answers:', faqAnswers.length);
  faqAnswers.forEach((answer, index) => {
    answer.classList.add('hidden');
    console.log(`FAQ answer ${index} hidden`);
  });

  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    if (typeof inView === 'function' && typeof animate === 'function') {
      inView(card, () => {
        animate(card, { opacity: 1, y: 0 }, { delay: index * 0.1, duration: 0.5, ease: "easeOut" });
      }, { once: true });
    }
  });

  loadCommunityPips();
  
  // Add click event listeners to FAQ items
  const faqItems = document.querySelectorAll('.faq-item');
  console.log('Found FAQ items:', faqItems.length);
  faqItems.forEach((item, index) => {
    item.addEventListener('click', function(e) {
      console.log(`FAQ item ${index} clicked`);
      e.preventDefault();
      e.stopPropagation();
      window.toggleFAQ(this);
    });
  });
  
  console.log('Initialization complete');
});

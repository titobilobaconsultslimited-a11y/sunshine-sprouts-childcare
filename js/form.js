/* ============================================
   FORM VALIDATION & SUBMISSION
   Real-time validation, error handling
   ============================================ */

// ============================================
// 1. VALIDATION RULES
// ============================================
const validationRules = {
  required: (value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value && value.trim() !== '';
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  phone: (value) => {
    const phoneRegex = /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
    return phoneRegex.test(value.replace(/\D/g, ''));
  },

  date: (value) => {
    const date = new Date(value);
    return date instanceof Date && !isNaN(date);
  },

  minLength: (min) => (value) => {
    return value && value.length >= min;
  },

  maxLength: (max) => (value) => {
    return !value || value.length <= max;
  },

  number: (value) => {
    return !isNaN(value) && value !== '';
  },

  zipCode: (value) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(value);
  },

  age: (dob) => {
    if (!dob) return false;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 0 && age <= 120;
  },

  pastDate: (value) => {
    const inputDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate < today;
  },

  futureDate: (value) => {
    const inputDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate > today;
  },
};

// ============================================
// 2. VALIDATION MESSAGE MAPPING
// ============================================
const validationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  date: 'Please enter a valid date',
  minLength: (min) => `Must be at least ${min} characters`,
  maxLength: (max) => `Must be no more than ${max} characters`,
  number: 'Please enter a valid number',
  zipCode: 'Please enter a valid zip code (12345 or 12345-6789)',
  age: 'Please enter a valid date of birth',
  pastDate: 'Date must be in the past',
  futureDate: 'Date must be in the future',
};

// ============================================
// 3. VALIDATE FIELD
// ============================================
function validateField(field) {
  const form = field.closest('form');
  const formGroup = field.closest('.form-group');
  const value = field.value;

  // Get validation rules from data attributes
  const rules = field.getAttribute('data-validate');
  
  if (!rules) {
    // No validation rules
    formGroup.classList.remove('invalid');
    hideError(formGroup);
    return true;
  }

  const ruleArray = rules.split(',').map((r) => r.trim());
  let isValid = true;
  let errorMessage = '';

  for (const rule of ruleArray) {
    let ruleName = rule;
    let ruleParam = null;

    // Check for parameterized rules like minLength(3)
    const match = rule.match(/^(\w+)\((.+)\)$/);
    if (match) {
      ruleName = match[1];
      ruleParam = isNaN(match[2]) ? match[2] : parseInt(match[2], 10);
    }

    // Get validation function
    let validationFn;
    if (ruleParam !== null && typeof validationRules[ruleName] === 'function') {
      validationFn = validationRules[ruleName](ruleParam);
    } else {
      validationFn = validationRules[ruleName];
    }

    if (validationFn && !validationFn(value)) {
      isValid = false;

      // Get error message
      if (ruleParam !== null && typeof validationMessages[ruleName] === 'function') {
        errorMessage = validationMessages[ruleName](ruleParam);
      } else {
        errorMessage = validationMessages[ruleName] || `Invalid ${field.name}`;
      }
      break;
    }
  }

  // Update form group styling
  if (isValid) {
    formGroup.classList.remove('invalid');
    hideError(formGroup);
  } else {
    formGroup.classList.add('invalid');
    showError(formGroup, errorMessage);
  }

  return isValid;
}

// ============================================
// 4. SHOW/HIDE ERROR MESSAGES
// ============================================
function showError(formGroup, message) {
  let errorElement = formGroup.querySelector('.error-message');
  
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    const input = formGroup.querySelector('input, select, textarea');
    if (input) {
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
  }
  
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function hideError(formGroup) {
  const errorElement = formGroup.querySelector('.error-message');
  if (errorElement) {
    errorElement.style.display = 'none';
  }
}

// ============================================
// 5. VALIDATE ENTIRE FORM
// ============================================
function validateForm(form) {
  if (!form) return false;

  const fields = form.querySelectorAll('[data-validate]');
  let isFormValid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      isFormValid = false;
    }
  });

  return isFormValid;
}

// ============================================
// 6. CHARACTER COUNT FOR TEXTAREAS
// ============================================
function initCharacterCounters() {
  const textareas = document.querySelectorAll('textarea[data-max-length]');

  textareas.forEach((textarea) => {
    const maxLength = parseInt(textarea.getAttribute('data-max-length'), 10);
    const container = textarea.closest('.form-group');

    // Create counter element
    let counter = container.querySelector('.char-counter');
    if (!counter) {
      counter = document.createElement('div');
      counter.className = 'char-counter';
      counter.style.fontSize = 'var(--font-size-small)';
      counter.style.color = 'var(--text-light)';
      counter.style.marginTop = 'var(--spacing-xs)';
      textarea.parentNode.insertBefore(counter, textarea.nextSibling);
    }

    // Update counter
    function updateCounter() {
      const length = textarea.value.length;
      counter.textContent = `${length} / ${maxLength} characters`;
      
      if (length > maxLength) {
        counter.style.color = 'var(--error)';
      } else if (length > maxLength * 0.9) {
        counter.style.color = 'var(--secondary)';
      } else {
        counter.style.color = 'var(--text-light)';
      }
    }

    textarea.addEventListener('input', updateCounter);
    updateCounter();
  });
}

// ============================================
// 7. REAL-TIME VALIDATION
// ============================================
function initRealtimeValidation() {
  const fields = document.querySelectorAll('[data-validate]');

  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      validateField(field);
    });

    field.addEventListener('input', () => {
      // Debounce validation while typing
      clearTimeout(field.validationTimeout);
      field.validationTimeout = setTimeout(() => {
        validateField(field);
      }, 300);
    });

    // Format phone numbers in real-time
    if (field.type === 'tel') {
      field.addEventListener('input', () => {
        const digits = field.value.replace(/\D/g, '').substring(0, 10);
        if (digits.length > 0) {
          if (digits.length <= 3) {
            field.value = digits;
          } else if (digits.length <= 6) {
            field.value = `(${digits.substring(0, 3)}) ${digits.substring(3)}`;
          } else {
            field.value = `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
          }
        }
      });
    }

    // Disable past dates for appointment/tour forms
    if (field.type === 'date' && !field.getAttribute('data-validate').includes('pastDate')) {
      const today = new Date().toISOString().split('T')[0];
      field.setAttribute('min', today);
    }
  });
}

// ============================================
// 8. HANDLE FORM SUBMISSION
// ============================================
function initFormSubmission() {
  const forms = document.querySelectorAll('form[data-form-type]');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate form
      if (!validateForm(form)) {
        // Scroll to first error
        const firstError = form.querySelector('.invalid');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Prepare form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Log submission (no backend, frontend only)
      console.log('Form Submitted:', data);
      console.group('Form Data:');
      Object.entries(data).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
      console.groupEnd();

      // Show success message
      showSuccessMessage(form);

      // Reset form
      form.reset();

      // Clear validation states
      form.querySelectorAll('.form-group').forEach((group) => {
        group.classList.remove('invalid');
        const error = group.querySelector('.error-message');
        if (error) error.style.display = 'none';
      });
    });
  });
}

// ============================================
// 9. SUCCESS MESSAGE DISPLAY
// ============================================
function showSuccessMessage(form) {
  let successMessage = form.querySelector('.success-message');

  if (!successMessage) {
    successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success';
    successMessage.style.display = 'none';
    form.insertBefore(successMessage, form.firstChild);
  }

  const formType = form.getAttribute('data-form-type');
  const messages = {
    enrollment: '✓ Thank you! Your application has been submitted successfully. We\'ll contact you within 24 hours.',
    tour: '✓ Great! Your tour has been booked. We\'ll send you a confirmation email shortly.',
    contact: '✓ Thank you for your message! We\'ll get back to you as soon as possible.',
  };

  successMessage.innerHTML = `<strong>Success!</strong> ${messages[formType] || 'Form submitted successfully!'}`;
  successMessage.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 5000);
}

// ============================================
// 10. FILE UPLOAD HANDLING
// ============================================
function initFileUpload() {
  const fileUploads = document.querySelectorAll('.file-upload');

  fileUploads.forEach((upload) => {
    const input = upload.querySelector('input[type="file"]');
    const label = upload.querySelector('.file-upload-label');

    if (input && label) {
      label.addEventListener('click', () => {
        input.click();
      });

      input.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          const fileList = Array.from(files)
            .map((file) => file.name)
            .join(', ');
          label.innerHTML = `<i class="fas fa-check"></i> ${fileList}`;
        }
      });

      // Drag and drop
      label.addEventListener('dragover', (e) => {
        e.preventDefault();
        label.style.borderColor = 'var(--primary)';
      });

      label.addEventListener('dragleave', () => {
        label.style.borderColor = 'var(--primary)';
      });

      label.addEventListener('drop', (e) => {
        e.preventDefault();
        input.files = e.dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
      });
    }
  });
}

// ============================================
// 11. INITIALIZE ALL FORM FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initRealtimeValidation();
  initFormSubmission();
  initCharacterCounters();
  initFileUpload();

  console.log('Form validation initialized');
});

// ============================================
// 12. UTILITY FUNCTION: CLEAR FORM
// ============================================
function clearFormErrors(form) {
  if (!form) return;

  form.querySelectorAll('.form-group').forEach((group) => {
    group.classList.remove('invalid');
    const error = group.querySelector('.error-message');
    if (error) error.style.display = 'none';
  });
}

// ============================================
// 13. EXPORT FUNCTIONS FOR EXTERNAL USE
// ============================================
window.FormValidation = {
  validateField,
  validateForm,
  clearFormErrors,
  showSuccessMessage,
};

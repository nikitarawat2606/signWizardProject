/**
 * Industrial-Grade Frontend Architecture using an ES6 Namespace Pattern
 * Manages state, real-time validation, dynamic data lookup, and simulated API async submission.
 */
const WizardApp = (() => {
    // Centralized Application State
    const state = {
        email: '',
        password: '',
        fullName: '',
        age: '',
        pronouns: '',
        state: '',
        city: ''
    };

    // Dependent Cross-Field Data mapping
    const cityDatabase = {
        "Delhi": ["New Delhi", "North Delhi", "South Delhi", "West Delhi"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
        "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"]
    };

    const navigateTo = (screenId) => {
        document.querySelectorAll('.wizard-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        hideToast();
    };

    const showToast = (message) => {
        const toast = document.getElementById('toastBanner');
        toast.innerText = message;
        toast.classList.remove('hidden');
    };

    const hideToast = () => {
        document.getElementById('toastBanner').classList.add('hidden');
    };

    const handleTermsToggle = () => {
        const isChecked = document.getElementById('termsCheckbox').checked;
        document.getElementById('termsNextBtn').disabled = !isChecked;
    };

    const validateStep1 = () => {
        const emailInput = document.getElementById('email').value.trim();
        const passwordInput = document.getElementById('password').value;
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const nextBtn = document.getElementById('step1NextBtn');

        let isValidEmail = false;
        let isValidPassword = false;

        // RFC standard basic email verification pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput) {
            emailError.innerText = "Email is required.";
        } else if (!emailRegex.test(emailInput)) {
            emailError.innerText = "Invalid email format.";
        } else {
            emailError.innerText = "";
            isValidEmail = true;
            state.email = emailInput;
        }

        if (!passwordInput) {
            passwordError.innerText = "Password is required.";
        } else if (passwordInput.length < 8) {
            passwordError.innerText = "Password must be at least 8 characters.";
        } else {
            passwordError.innerText = "";
            isValidPassword = true;
            state.password = passwordInput;
        }

        nextBtn.disabled = !(isValidEmail && isValidPassword);
    };

    const validateStep2 = () => {
        const nameInput = document.getElementById('fullName').value.trim();
        const ageInput = document.getElementById('age').value;
        const nameError = document.getElementById('nameError');
        const ageError = document.getElementById('ageError');
        const ageWarning = document.getElementById('ageWarning');
        const nextBtn = document.getElementById('step2NextBtn');

        let isValidName = false;
        let isValidAge = false;

        if (!nameInput) {
            nameError.innerText = "Full name cannot be blank.";
        } else {
            nameError.innerText = "";
            isValidName = true;
            state.fullName = nameInput;
        }

        if (!ageInput) {
            ageError.innerText = "Age is required.";
            ageWarning.classList.add('hidden');
        } else if (Number(ageInput) < 1 || Number(ageInput) > 120) {
            ageError.innerText = "Enter a valid age between 1 and 120.";
            ageWarning.classList.add('hidden');
        } else {
            ageError.innerText = "";
            isValidAge = true;
            state.age = ageInput;

            // Enterprise Edge-Case Handling: Under 18 UX warning prompt
            if (Number(ageInput) < 18) {
                ageWarning.classList.remove('hidden');
            } else {
                ageWarning.classList.add('hidden');
            }
        }

        nextBtn.disabled = !(isValidName && isValidAge);
    };

    const handleStateChange = () => {
        const selectedState = document.getElementById('stateSelect').value;
        const citySelect = document.getElementById('citySelect');
        
        state.state = selectedState;
        citySelect.innerHTML = '<option value="">Select City</option>';

        if (selectedState && cityDatabase[selectedState]) {
            citySelect.disabled = false;
            cityDatabase[selectedState].forEach(city => {
                const opt = document.createElement('option');
                opt.value = city;
                opt.textContent = city;
                citySelect.appendChild(opt);
            });
        } else {
            citySelect.disabled = true;
            citySelect.innerHTML = '<option value="">Select State First</option>';
        }
    };

    const prepareReview = () => {
        state.pronouns = document.getElementById('pronouns').value || 'Not specified';
        state.city = document.getElementById('citySelect').value || 'Not specified';

        const summaryHTML = `
            <p><strong>Email:</strong> ${state.email}</p>
            <p><strong>Name:</strong> ${state.fullName}</p>
            <p><strong>Age:</strong> ${state.age}</p>
            <p><strong>Pronouns:</strong> ${state.pronouns}</p>
            <p><strong>Location:</strong> ${state.city}, ${state.state || 'Not specified'}</p>
        `;
        document.getElementById('summaryCard').innerHTML = summaryHTML;
        navigateTo('screen-step4');
    };

    const submitForm = () => {
        const btn = document.getElementById('submitBtn');
        const btnText = document.getElementById('submitText');
        const spinner = document.getElementById('spinner');

        // Loading state management to block duplicate submissions
        btn.disabled = true;
        btnText.innerText = "Processing...";
        spinner.classList.remove('hidden');

        // Simulate secure async API transaction delay (1.6s)
        setTimeout(() => {
            btn.disabled = false;
            btnText.innerText = "Complete Signup";
            spinner.classList.add('hidden');
            navigateTo('screen-success');
        }, 1600);
    };

    // Public API Methods exposed
    return {
        navigateTo,
        handleTermsToggle,
        validateStep1,
        validateStep2,
        handleStateChange,
        prepareReview,
        submitForm
    };
})();
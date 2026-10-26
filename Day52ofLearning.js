
const passwordInput = document.getElementById("password");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseInput = document.getElementById("uppercase");
const lowercaseInput = document.getElementById("lowercase");
const numbersInput = document.getElementById("numbers");
const symbolsInput = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const message = document.getElementById("message");

const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}?"
};

// Secure random integer from 0 to max - 1
function secureRandom(max) {
    const limit = Math.floor(4294967296 / max) * max;
    const random = new Uint32Array(1);

    do {
        crypto.getRandomValues(random);
    } while (random[0] >= limit);

    return random[0] % max;
}

function generatePassword() {
    const length = Number(lengthInput.value);
    let characters = "";
    const requiredSets = [];

    if (uppercaseInput.checked) {
        characters += characterSets.uppercase;
        requiredSets.push(characterSets.uppercase);
    }

    if (lowercaseInput.checked) {
        characters += characterSets.lowercase;
        requiredSets.push(characterSets.lowercase);
    }

    if (numbersInput.checked) {
        characters += characterSets.numbers;
        requiredSets.push(characterSets.numbers);
    }

    if (symbolsInput.checked) {
        characters += characterSets.symbols;
        requiredSets.push(characterSets.symbols);
    }

    if (requiredSets.length === 0) {
        message.textContent = "Please select at least one option!";
        passwordInput.value = "";
        return;
    }

    if (length < requiredSets.length) {
        message.textContent = "Increase the length to match your options.";
        return;
    }

    // Ensure at least one character from each selected category.
    const passwordCharacters = [];

    for (const set of requiredSets) {
        passwordCharacters.push(set[secureRandom(set.length)]);
    }

    // Fill the remaining positions.
    while (passwordCharacters.length < length) {
        passwordCharacters.push(
            characters[secureRandom(characters.length)]
        );
    }

    // Shuffle the characters securely.
    for (let i = passwordCharacters.length - 1; i > 0; i--) {
        const j = secureRandom(i + 1);

        [passwordCharacters[i], passwordCharacters[j]] =
            [passwordCharacters[j], passwordCharacters[i]];
    }

    passwordInput.value = passwordCharacters.join("");
    message.textContent = "Password generated successfully!";
}

lengthInput.addEventListener("input", function () {
    lengthValue.textContent = lengthInput.value;
});

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", async function () {
    if (!passwordInput.value) {
        message.textContent = "Generate a password first!";
        return;
    }

    try {
        await navigator.clipboard.writeText(passwordInput.value);
        message.textContent = "Password copied successfully!";
    } catch (error) {
        passwordInput.select();

        const copied = document.execCommand("copy");

        message.textContent = copied
            ? "Password copied successfully!"
            : "Copy failed. Please copy it manually.";
    }
});

// Generate a password when the page opens.
generatePassword();

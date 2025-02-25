document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded!");
    
    // ✅ Debugging: Ensure script.js is loading
    console.log("✅ script.js loaded successfully!");

    // ✅ Ensure Supabase Functions Exist
    if (typeof window.handleSignup !== "function" ||
        typeof window.handleLogin !== "function" ||
        typeof window.handleLogout !== "function" ||
        typeof window.checkUserState !== "function") {
        console.error("❌ Supabase functions not found. Ensure auth.js is loaded.");
        return;
    }

    // ✅ Handle Authentication UI State
    window.checkUserState((user) => {
        const authButtons = document.getElementById("auth-buttons");

        if (user) {
            authButtons.innerHTML = `
                <p>Welcome, ${user.email}!</p>
                <button id="logoutBtn">Logout</button>
            `;
            document.getElementById("logoutBtn").addEventListener("click", function () {
                window.handleLogout().then(() => {
                    location.reload();
                });
            });
        } else {
            authButtons.innerHTML = `
                <button id="loginBtn">Login</button>
                <button id="signUpBtn">Sign Up</button>
            `;

            document.getElementById("loginBtn").addEventListener("click", function () {
                openModal("loginModal");
            });

            document.getElementById("signUpBtn").addEventListener("click", function () {
                openModal("signUpModal");
            });
        }
    });

    // ✅ Handle "Let's Cook" Button
    const cookButton = document.getElementById("cookBtn");
    const inputField = document.getElementById("ingredients");
    const recipesContainer = document.getElementById("recipes");

    console.log("🔍 Checking cookButton:", cookButton); // Debugging log

    if (!cookButton) {
        console.error("❌ cookBtn not found in DOM! Check if the ID exists in HTML.");
    } else {
        cookButton.addEventListener("click", function () {
            console.log("✅ Let's Cook button clicked!");

            const ingredients = inputField.value.trim();
            if (!ingredients) {
                alert("❌ Please enter ingredients!");
                return;
            }

            const dietPreferences = [];
            if (document.getElementById("vegetarian").checked) dietPreferences.push("vegetarian");
            if (document.getElementById("vegan").checked) dietPreferences.push("vegan");
            if (document.getElementById("glutenFree").checked) dietPreferences.push("glutenFree");
            if (document.getElementById("ketogenic").checked) dietPreferences.push("ketogenic");

            const dietQuery = dietPreferences.length > 0 ? `&diet=${dietPreferences.join(",")}` : "";
            const apiKey = "8330b4a865ac47f8bcf1f10ef561e00b"; 
            const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}${dietQuery}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    recipesContainer.innerHTML = "";
                    data.forEach(recipe => {
                        const recipeCard = document.createElement("div");
                        recipeCard.classList.add("recipe-card");
                        recipeCard.innerHTML = `
                            <img src="${recipe.image}" alt="${recipe.title}">
                            <h3>${recipe.title}</h3>
                            <a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">View Recipe</a>
                        `;
                        recipesContainer.appendChild(recipeCard);
                    });
                })
                .catch(error => console.error("Error fetching recipes:", error));
        });
    }

    // ✅ Handle "Surprise Me!" Button
    const surpriseButton = document.getElementById("surpriseBtn");

    if (!surpriseButton) {
        console.error("❌ Surprise Me Button not found in DOM.");
    } else {
        surpriseButton.addEventListener("click", function () {
            console.log("✅ Surprise Me button clicked!");

            const apiKey = "8330b4a865ac47f8bcf1f10ef561e00b"; 
            const randomApiUrl = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;

            fetch(randomApiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.recipes && data.recipes.length > 0) {
                        const recipe = data.recipes[0];

                        recipesContainer.innerHTML = "";
                        const recipeCard = document.createElement("div");
                        recipeCard.classList.add("recipe-card");

                        recipeCard.innerHTML = `
                            <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; height:auto;">
                            <h3>${recipe.title}</h3>
                            <a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">View Recipe</a>
                        `;
                        recipesContainer.appendChild(recipeCard);
                    }
                })
                .catch(error => console.error("Error fetching random recipe:", error));
        });
    }

    // ✅ Ensure Clicking "X" Closes Modal
    document.querySelectorAll(".close").forEach(button => {
        button.addEventListener("click", function () {
            let modal = button.closest(".modal");
            if (modal) {
                closeModal(modal.id);
            }
        });
    });

    // ✅ Ensure Clicking Outside the Modal Closes It
    window.addEventListener("click", function (event) {
        let loginModal = document.getElementById("loginModal");
        let signUpModal = document.getElementById("signUpModal");

        if (event.target === loginModal) {
            closeModal("loginModal");
        }
        if (event.target === signUpModal) {
            closeModal("signUpModal");
        }
    });

    console.log("✅ Event Listeners Attached Successfully!");
});

// ✅ Open & Close Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

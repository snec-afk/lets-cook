if (typeof window.supabase === "undefined") {
    console.error("❌ Supabase SDK not loaded. Check index.html script order.");
}

const SUPABASE_URL = "https://uvxwcnhnbuwbdcbyyfev.supabase.co"; 

if (!window.SUPABASE_ANON_KEY) {
    console.error("❌ Missing Supabase API token. Ensure it's injected correctly.");
} else {
    window.supabase = window.supabase.createClient(SUPABASE_URL, window.SUPABASE_ANON_KEY);
    console.log("✅ Supabase Initialized:", window.supabase);
}

window.handleSignup = async function (email, password, name) {
    const { user, error } = await window.supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        console.error("❌ Signup Error:", error.message);
        return alert("Signup Error: " + error.message);
    }
    
    alert(`✅ Account created for ${email}`);
};

window.handleLogin = async function (email, password) {
    const { user, error } = await window.supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error("❌ Login Error:", error.message);
        return alert("Login Error: " + error.message);
    }

    alert(`✅ Logged in as ${email}`);
};

window.handleLogout = async function () {
    await window.supabase.auth.signOut();
    alert("✅ Logged out!");
};

window.checkUserState = function (callback) {
    if (!window.supabase || !window.supabase.auth) {
        console.error("❌ Supabase auth not available.");
        return;
    }
    window.supabase.auth.onAuthStateChange((event, session) => {
        callback(session ? session.user : null);
    });
};

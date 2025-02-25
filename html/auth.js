// ✅ Ensure Supabase SDK is loaded before using it
if (typeof window.supabase === "undefined") {
    console.error("❌ Supabase SDK not loaded. Check index.html script order.");
}

// ✅ Initialize Supabase FIRST
const SUPABASE_URL = "https://uvxwcnhnbuwbdcbyyfev.supabase.co";  // ⬅️ Replace with YOUR Supabase URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2eHdjbmhuYnV3YmRjYnl5ZmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMzk0MDYsImV4cCI6MjA1MzgxNTQwNn0.dVMcfzPJv_z4XLQfHdS2AP145t28U91IRqFNyHaiJZ0";  // ⬅️ Replace with YOUR Supabase anon key
window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("✅ Supabase Initialized:", window.supabase); // ✅ Debugging

// ✅ Sign Up Function
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

// ✅ Login Function
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

// ✅ Logout Function
window.handleLogout = async function () {
    await window.supabase.auth.signOut();
    alert("✅ Logged out!");
};

// ✅ Check User State Function
window.checkUserState = function (callback) {
    window.supabase.auth.onAuthStateChange((event, session) => {
        callback(session?.user || null);
    });
};

const supabase = require("./supabase");

async function testConnection() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(1);

    if (error) {
        console.log("Supabase error:", error.message);
        return;
    }

    console.log("Supabase connection successful!");
}

testConnection();
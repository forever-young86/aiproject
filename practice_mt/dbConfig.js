module.exports = {
    user: "ora_user",
    password: process.env.DB_PASSWORD || "default_password",
    connectString: "localhost:1521/xe"
};

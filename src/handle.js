import mustache from "mustache";

const name = "Nico";

console.log(mustache.render("Sup {{name}}", { name }));

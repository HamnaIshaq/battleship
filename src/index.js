import "./style.css";

function component() {
  const element = document.createElement("div");

  element.textContent = "Hello World";

  return element;
}

const root = document.querySelector("#root");
root.appendChild(component());

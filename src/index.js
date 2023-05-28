import "./style.css";
import View from "./View/view";

const root = document.querySelector("#root");

root.appendChild(View().gameView());

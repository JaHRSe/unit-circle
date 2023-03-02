import { UnitCircleComponent } from "./UnitCircleComponent";

function container() {
  const container = document.createElement("div");

  const title = document.createElement("h3");
  title.className = "title";
  title.innerText = "Unit Circle";

  container.className = "container";
  container.appendChild(title);
  container.appendChild(UnitCircleComponent(200));
  return container;
}

const comp = container();
document.body.appendChild(comp);

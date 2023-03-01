function radiansToDegrees(rads: number) {
  return (rads * 180) / Math.PI;
}
export function UnitCircleComponent(radius: number) {
  const canvas = document.createElement("canvas");
  canvas.style.backgroundColor = "lightBlue";
  const diameter = 2 * radius;
  const pad = 30;
  const xPad = pad / 2;
  const yPad = pad / 2;
  const origin = { x: radius + xPad, y: radius + yPad };
  canvas.width = diameter + pad;
  canvas.height = diameter + pad;
  const drawCircleCall = () => drawCircle(canvas, radius, origin, xPad, yPad);
  drawCircleCall();
  canvas.addEventListener("mousemove", (ev) => {
    const ctx = canvas.getContext("2d");
    drawCircleCall();
    const rect = canvas.getBoundingClientRect();

    const relativeOrigin = { x: origin.x + rect.left, y: origin.y + rect.top };

    // Event returns mouse cordinates relative to client origin
    const posRelOrigin = {
      x: ev.clientX - relativeOrigin.x,
      y: (ev.clientY - relativeOrigin.y) * -1,
    };

    const angle = Math.atan2(posRelOrigin.y, posRelOrigin.x);
    const hypot = Math.hypot(posRelOrigin.x, posRelOrigin.y);
    const ratio = radius / hypot;
    const relX = ratio * posRelOrigin.x;
    const relY = ratio * posRelOrigin.y;
    const hypotTest = Math.hypot(relX, relY);
    console.log(
      "angle",
      angle,
      "relX:",
      relX,
      "relY:",
      relY,
      "hypot:",
      hypotTest
    );

    // draw command relative to canvas origin top left
    // function posRelClienOrigin(x: number, y: number) {
    //   return {
    //     x: x + origin.x,
    //     y: origin.y - y,
    //   };
    // }
    const hypotRelClientOrin = {
      x: relX + origin.x,
      y: origin.y - relY,
    };
    //console.log("posRelClienOrigin", posRelClientOrigin);

    // draw the hypotenuse
    //const hypotRelClientOrin = posRelClienOrigin(relX, relY);
    //console.log("hypot coords", hypotRelClientOrin);
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(hypotRelClientOrin.x, hypotRelClientOrin.y);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    // draw cossine
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(hypotRelClientOrin.x, origin.y);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.closePath();

    // draw sine
    ctx.beginPath();
    ctx.moveTo(hypotRelClientOrin.x, hypotRelClientOrin.y);
    console.log("origin", origin);
    ctx.lineTo(hypotRelClientOrin.x, origin.y);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.closePath();
  });
  return canvas;
}

function drawCircle(
  canvas: HTMLCanvasElement,
  radius: number,
  origin: { x: number; y: number },
  xPad: number,
  yPad: number
) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const diameter = radius * 2;

  ctx.beginPath();
  ctx.strokeStyle = "grey";
  ctx.arc(origin.x, origin.y, radius, 0, 2 * Math.PI);
  ctx.moveTo(radius + xPad, yPad);
  ctx.lineTo(radius + xPad, diameter + yPad);
  ctx.moveTo(xPad, radius + yPad);
  ctx.lineTo(diameter + xPad, radius + yPad);
  ctx.stroke();
  ctx.closePath();
}

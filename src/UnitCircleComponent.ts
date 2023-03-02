function radiansToDegrees(rads: number) {
  let result = (rads * 180) / Math.PI;
  if (result < 0) result = result + 360;
  return Math.round(result);
}

function radianBeutify(rads: number) {
  if (rads < 0) rads = rads + Math.PI * 2;
  return rads.toFixed(5);
  //return (Math.round(rads * 100) / 100).toFixed(2);
}

export function UnitCircleComponent(radius: number) {
  const canvas = document.createElement("canvas");
  canvas.style.backgroundColor = "lightBlue";
  const diameter = 2 * radius;
  const pad = 100;
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
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const hypot = Math.hypot(posRelOrigin.x, posRelOrigin.y);
    const ratio = radius / hypot;
    const relX = ratio * posRelOrigin.x;
    const relY = ratio * posRelOrigin.y;

    const hypotRelClientOrigin = {
      x: relX + origin.x,
      y: origin.y - relY,
    };

    // draw the hypotenuse
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(hypotRelClientOrigin.x, hypotRelClientOrigin.y);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    // draw cossine
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(hypotRelClientOrigin.x, origin.y);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.closePath();

    // cosine label
    ctx.beginPath();
    const labelX = origin.x + (hypotRelClientOrigin.x - origin.x) / 2;
    ctx.fillText(cos.toFixed(3), labelX, origin.y + 15);
    ctx.closePath();

    // draw sine
    ctx.beginPath();
    ctx.moveTo(hypotRelClientOrigin.x, hypotRelClientOrigin.y);
    ctx.lineTo(hypotRelClientOrigin.x, origin.y);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.closePath();

    // sine label
    ctx.beginPath();
    const labelY =
      hypotRelClientOrigin.y + (origin.y - hypotRelClientOrigin.y) / 2;
    ctx.fillText(sin.toFixed(3), hypotRelClientOrigin.x + 5, labelY);
    ctx.closePath();

    // draw Maker
    ctx.beginPath();
    ctx.arc(hypotRelClientOrigin.x, hypotRelClientOrigin.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    // angle label
    ctx.beginPath();
    ctx.fillText(
      radianBeutify(angle).toString(),
      hypotRelClientOrigin.x + 5,
      hypotRelClientOrigin.y + 5
    );
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
  ctx.font = "12px Arial";
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 5;
  ctx.arc(origin.x, origin.y, radius, 0, 2 * Math.PI);
  ctx.moveTo(radius + xPad, yPad);
  ctx.lineTo(radius + xPad, diameter + yPad);
  ctx.moveTo(xPad, radius + yPad);
  ctx.lineTo(diameter + xPad, radius + yPad);
  ctx.stroke();
  ctx.closePath();
}

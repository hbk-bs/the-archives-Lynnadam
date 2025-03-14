
const boxes = document.querySelectorAll(".box");


boxes.forEach((box) => {
  box.addEventListener("click", () => {
   
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    
    box.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  });
});
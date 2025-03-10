const catchMe = document.querySelector('.catch-me');

document.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const buttonX = catchMe.offsetLeft + catchMe.offsetWidth / 2;
  const buttonY = catchMe.offsetTop + catchMe.offsetHeight / 2;

  const deltaX = mouseX - buttonX;
  const deltaY = mouseY - buttonY;

  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  if (distance < 100) { 
    const moveX = deltaX > 0 ? -50 : 50;
    const moveY = deltaY > 0 ? -50 : 50;

    let newLeft = catchMe.offsetLeft + moveX;
    let newTop = catchMe.offsetTop + moveY;


    newLeft = Math.max(0, Math.min(window.innerWidth - catchMe.offsetWidth, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - catchMe.offsetHeight, newTop));

    catchMe.style.left = `${newLeft}px`;
    catchMe.style.top = `${newTop}px`;
  }
});


catchMe.style.left = '50%';
catchMe.style.top = '50%';
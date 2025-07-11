function typeWriter(text, element) {
  let i = 0;
  const speed = 20;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}
((d,w) => {
  console.log('sss');
  w.addEventListener('load', () => {
    d.body.classList.add('add-aaas');
  });
})(document, window);
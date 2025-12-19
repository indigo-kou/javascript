const text1 = document.getElementById('text');
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  text1.textContent = 'ボタンをクリックしました';
});
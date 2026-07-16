/* CIM-UFPB — comportamento do painel admin */
function toggleSidebar() {
  var s = document.querySelector('.sidebar');
  var sc = document.querySelector('.scrim-admin');
  if (!s) return;
  var open = s.classList.toggle('open');
  if (sc) sc.classList.toggle('show', open);
}
document.addEventListener('click', function (e) {
  if (e.target.classList && e.target.classList.contains('scrim-admin')) toggleSidebar();
});

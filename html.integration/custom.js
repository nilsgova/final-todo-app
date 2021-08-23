const switchCheckbox = document.querySelector('.switchCheckbox');
const body = document.querySelector('body')

function switchTheme() {
    body.classList.toggle('dark-theme')
}

switchCheckbox.addEventListener('change', switchTheme)

// Selectors for dropdown
const showOptionsBtns = document.querySelectorAll('.show-options');
const optionsDropdownBtns = document.querySelectorAll('.show-options');
const addLabel = document.querySelectorAll('.addlabelbtn');

showOptionsBtns.forEach(btn => btn.addEventListener('click', function(e) {
    const optionButton = e.currentTarget;
    optionButton.nextElementSibling.classList.toggle('show');
}))

// Label Options
function showLabelOption(e) {
    const label = e.currentTarget;
    const parentEl = label.parentNode;
    parentEl.classList.remove('show');
    parentEl.nextElementSibling.classList.add('show');
}

addLabel.forEach(btn => btn.addEventListener('click', showLabelOption));

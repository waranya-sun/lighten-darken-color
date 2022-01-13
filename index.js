const hexInput = document.querySelector('#hexInput');
const inputColor = document.querySelector('#inputColor');
const sliderText = document.querySelector('#sliderText');
const slider = document.querySelector('#slider');
const alteredColorText = document.querySelector('#alteredColorText');
const alteredColor = document.querySelector('#alteredColor');
const toggleBtn = document.querySelector('#toggleBtn');
const lightenText = document.querySelector('#lightenText ');
const darkenText = document.querySelector('#darkenText');

toggleBtn.addEventListener('click', () => {
  if (toggleBtn.classList.contains('toggled')) {
    toggleBtn.classList.remove('toggled');
    darkenText.classList.add('unselected');
    lightenText.classList.remove('unselected');
  } else {
    toggleBtn.classList.add('toggled');
    darkenText.classList.remove('unselected');
    lightenText.classList.add('unselected');
  }
  reset();
});

hexInput.addEventListener('keyup', e => {
  //   const color = hexInput.value;
  const color = e.target.value;
  if (!isValidHex(color)) return false;
  const strippedHex = color.replace('#', '');
  inputColor.style.backgroundColor = '#' + strippedHex;
  reset();
});

slider.addEventListener('input', e => {
  if (!isValidHex(hexInput.value)) return null;

  sliderText.textContent = `${e.target.value}%`;

  const alteredHex = alterColor(hexInput.value, e.target.value);

  if (darkenText.classList.contains('unselected')) {
    //Lighten selected
    const lightColor = alterColor(alteredHex, e.target.value);
    alteredColor.style.backgroundColor = lightColor;
    alteredColorText.textContent = `Altered Color : ${lightColor}`;
  } else {
    //Darken selected
    const darkColor = alterColor(alteredHex, -e.target.value);
    alteredColor.style.backgroundColor = darkColor;
    alteredColorText.textContent = `Altered Color : ${darkColor}`;
  }
});

function isValidHex(hex) {
  let checkedValue = '';
  //   Other ways to test the value
  //   1.
  //   if (value.startsWith('#')) {
  //     checkedValue = value.substring(1);
  //   }
  //   2.
  //   if (value[0] === '#') {
  //     checkedValue = value.substring(1);
  //   } else {
  //     checkedValue = value;
  //   }

  checkedValue = hex.replace('#', '');

  return checkedValue.length === 3 || checkedValue.length === 6;
}

function convertHexToRGB(hex) {
  if (!isValidHex(hex)) return null;

  const strippedHex = hex.replace('#', '');
  let hexInSix = strippedHex;
  if (strippedHex.length === 3) {
    const updatedHex = strippedHex.split('').map(num => {
      return num.concat(num);
    });
    hexInSix = updatedHex.join('');
  }

  const r = Number.parseInt(hexInSix.substring(0, 2), 16);
  const g = Number.parseInt(hexInSix.substring(2, 4), 16);
  const b = Number.parseInt(hexInSix.substring(4, 6), 16);
  return { r, g, b };
}

function convertRgbToHex(r, g, b) {
  const firstPair = ('0' + r.toString(16)).slice(-2);
  const secondPair = ('0' + g.toString(16)).slice(-2);
  const thirdPair = ('0' + b.toString(16)).slice(-2);
  const hex = '#' + firstPair + secondPair + thirdPair;
  return hex;
}

function alterColor(hex, percentage) {
  const { r, g, b } = convertHexToRGB(hex);
  const amount = Math.floor((percentage / 100) * 255);
  const newR = shouldBeInRange(r + amount);
  const newG = shouldBeInRange(g + amount);
  const newB = shouldBeInRange(b + amount);
  const newHex = convertRgbToHex(newR, newG, newB);
  return newHex;
}

function shouldBeInRange(value) {
  if (value <= 0) {
    return 0;
  } else if (value >= 255) {
    return 255;
  } else {
    return value;
  }
}

function reset() {
  slider.value = 0;
  sliderText.textContent = '0%';
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.textContent = `Altered Color : ${hexInput.value}`;
}

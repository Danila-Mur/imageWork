const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItems = dropdownMenu.querySelectorAll('li');
const selectFileBtn = document.querySelector('#select-file-btn');
const fileInput = document.querySelector('#file-input');
const selectedImage = document.querySelector('#selected-image');
const calculateBtn = document.querySelector('.main__header-btn--calculate');
const saveBtn = document.querySelector('.main__header-btn--save');
const formFileInput = document.querySelector('#form-file-input');
const sizesNode = document.querySelector('.sizes');

dropdownBtn.addEventListener('click', function () {
  dropdownMenu.classList.toggle('show');
});

dropdownItems.forEach(function (item) {
  item.addEventListener('click', function () {
    dropdownMenu.classList.remove('show');
  });
});

selectFileBtn.addEventListener('click', function () {
  fileInput.click();
});

fileInput.addEventListener('change', function () {
  const selectedFile = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    selectedImage.style.display = 'flex';
    selectedImage.src = reader.result;
  };

  if (selectedFile) {
    reader.readAsDataURL(selectedFile);
  }
});

calculateBtn.addEventListener('click', async () => {
  sizesNode.innerHTML = '';

  const obj = await fetch('/api/data').then((res) =>
    res.json().then((data) => {
      data.forEach((item) => {
        sizesNode.innerHTML += `
        <span>Размер - ${item.size}</span>
        <span>Размер * 2 - ${item.double_size}</span>
        `;
      });
    })
  );
});

saveBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  let form = new FormData();
  form.append('file', fileInput.files[0]);

  let response = await fetch('/api/document_python', {
    method: 'POST',
    body: form,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

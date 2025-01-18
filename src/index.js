import './styles/index.scss';
import carData from '../car-dataset.json';

// Get references to dropdowns
const yearDropdown = document.getElementById('year');
const makeDropdown = document.getElementById('make');
const modelDropdown = document.getElementById('model');

// Populate the "Year" dropdown dynamically
function populateYears() {
  const years = [...new Set(carData.map(car => car.year))].sort((a, b) => b - a);
  updateDropdown(yearDropdown, years);
}

// Populate the "Make" dropdown based on selected "Year"
function populateMakes(year) {
  const makes = [
    ...new Set(carData.filter(car => car.year === parseInt(year)).map(car => car.Manufacturer)),
  ].sort();
  updateDropdown(makeDropdown, makes);
  makeDropdown.disabled = false;
}

// Populate the "Model" dropdown based on selected "Year" and "Make"
function populateModels(year, make) {
  const models = carData
    .filter(car => car.year === parseInt(year) && car.Manufacturer === make)
    .map(car => car.model);
  updateDropdown(modelDropdown, models);
  modelDropdown.disabled = false;
}

// Update dropdown options
function updateDropdown(dropdown, items) {
  dropdown.innerHTML = '<option value="" disabled selected>Select</option>';
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    dropdown.appendChild(option);
  });
}

// Event Listeners
yearDropdown.addEventListener('change', () => {
  makeDropdown.disabled = true;
  modelDropdown.disabled = true;
  populateMakes(yearDropdown.value);
});

makeDropdown.addEventListener('change', () => {
  modelDropdown.disabled = true;
  populateModels(yearDropdown.value, makeDropdown.value);
});

modelDropdown.addEventListener('change', () => {
  const selectedYear = yearDropdown.value;
  const selectedMake = makeDropdown.value;
  const selectedModel = modelDropdown.value;

  // Log the full car details to the console
  const selectedCar = carData.find(
    car =>
      car.year === parseInt(selectedYear) &&
      car.Manufacturer === selectedMake &&
      car.model === selectedModel
  );
  console.log(selectedCar);
});

// Initialize the "Year" dropdown on page load
populateYears();
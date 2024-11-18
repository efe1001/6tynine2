document.addEventListener('DOMContentLoaded', function () {
    const states = {
        nigeria: ['Lagos', 'Abuja', 'Kano', 'Ogun'],
        ghana: ['Accra', 'Kumasi'],
        uk: ['London', 'Manchester'],
        usa: ['California', 'New York'],
        india: ['Maharashtra', 'Delhi'],
        china: ['Beijing', 'Shanghai'],
        spain: ['Madrid', 'Barcelona'],
        cyprus: ['Nicosia', 'Limassol']
    };

    const towns = {
        lagos: ['Ikeja', 'Lekki', 'Surulere'],
        abuja: ['Maitama', 'Gwarinpa'],
        accra: ['Madina', 'Osu'],
        // Add other towns here
    };

    let filteredProfiles = []; 
    let profilesPerPage = 8;
    let currentPage = 1;

    function updateStateOptions() {
        const countrySelect = document.getElementById('country');
        const stateSelect = document.getElementById('state');
        const selectedCountry = countrySelect.value;

        stateSelect.innerHTML = '<option value="all">All States</option>';
        if (selectedCountry !== 'all') {
            states[selectedCountry].forEach(state => {
                const option = document.createElement('option');
                option.value = state.toLowerCase();
                option.textContent = state;
                stateSelect.appendChild(option);
            });
        }
    }

    function updateTownOptions() {
        const stateSelect = document.getElementById('state');
        const townSelect = document.getElementById('town');
        const selectedState = stateSelect.value;

        townSelect.innerHTML = '<option value="all">All Towns</option>';
        if (selectedState !== 'all') {
            towns[selectedState].forEach(town => {
                const option = document.createElement('option');
                option.value = town.toLowerCase();
                option.textContent = town;
                townSelect.appendChild(option);
            });
        }
    }

    function updateProfiles() {
        const countrySelect = document.getElementById('country');
        const stateSelect = document.getElementById('state');
        const townSelect = document.getElementById('town');
        const genderSelect = document.getElementById('gender');

        const selectedCountry = countrySelect.value;
        const selectedState = stateSelect.value;
        const selectedTown = townSelect.value;
        const selectedGender = genderSelect.value;

        console.log("Selected Filters: ", selectedCountry, selectedState, selectedTown, selectedGender);

        const profiles = document.querySelectorAll('.person');
        filteredProfiles = [];

        profiles.forEach(profile => {
            const profileCountry = profile.getAttribute('data-country');
            const profileState = profile.getAttribute('data-state');
            const profileTown = profile.getAttribute('data-town');
            const profileGender = profile.getAttribute('data-gender');

            if ((selectedCountry === 'all' || profileCountry === selectedCountry) &&
                (selectedState === 'all' || profileState === selectedState) &&
                (selectedTown === 'all' || profileTown === selectedTown) &&
                (selectedGender === 'all' || profileGender === selectedGender)) {
                filteredProfiles.push(profile);
            }
        });

        console.log("Filtered Profiles: ", filteredProfiles);
        currentPage = 1;
        showPage(currentPage);
    }

    function showPage(page) {
        const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

        console.log("Total Pages: ", totalPages);

        document.querySelectorAll('.person').forEach(profile => profile.style.display = 'none');

        const startIndex = (page - 1) * profilesPerPage;
        const endIndex = page * profilesPerPage;

        for (let i = startIndex; i < endIndex && i < filteredProfiles.length; i++) {
            filteredProfiles[i].style.display = 'block';
        }

        document.getElementById('prevBtn').disabled = page === 1;
        document.getElementById('nextBtn').disabled = page === totalPages;
    }

    function handlePagination(event) {
        if (event.target.id === 'nextBtn' && currentPage < Math.ceil(filteredProfiles.length / profilesPerPage)) {
            currentPage++;
            showPage(currentPage);
        } else if (event.target.id === 'prevBtn' && currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    }

    document.getElementById('prevBtn').addEventListener('click', handlePagination);
    document.getElementById('nextBtn').addEventListener('click', handlePagination);

    document.getElementById('country').addEventListener('change', function () {
        updateStateOptions();
        updateProfiles();
    });

    document.getElementById('state').addEventListener('change', function () {
        updateTownOptions();
        updateProfiles();
    });

    document.getElementById('town').addEventListener('change', updateProfiles);
    document.getElementById('gender').addEventListener('change', updateProfiles);

    updateStateOptions();
    updateTownOptions();
    updateProfiles();
});

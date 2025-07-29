document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggleButton = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');

    // Function to toggle theme
    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.theme = isDark ? 'dark' : 'light';
        lightIcon.classList.toggle('hidden', isDark);
        darkIcon.classList.toggle('hidden', !isDark);
    };

    // Set initial icon state
    if (document.documentElement.classList.contains('dark')) {
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
    }

    // Event Listeners
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
    
    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Animate stats if the element is a counter
                const counter = entry.target.querySelector('[data-target]');
                if (counter) {
                    animateCounter(counter);
                }
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(el => observer.observe(el));

    // Function to animate the stats counter
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;
        const timer = setInterval(() => {
            current += 1;
            counter.innerText = current;
            if (current == target) {
                clearInterval(timer);
            }
        }, stepTime);
        // Prevent re-animating
        counter.removeAttribute('data-target');
    };

    // Homepage Carousel
    const carousel = document.getElementById('carousel');
    if (carousel) {
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const scrollAmount = () => {
            // Scroll one full card width
            return carousel.querySelector('.flex-shrink-0').clientWidth;
        }
        nextButton.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });
        prevButton.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });
    }

    // Tour page logic
    if (document.getElementById('tour-sections')) {
        const tours = {
            "Tamil Nadu": [
                { title: "Chennai", img: "cassets/maha.webp", desc: "Explore the historic Mahabalipuram Shore Temple and the vibrant Marina Beach." },
                { title: "Ooty", img: "cassets/ooty.webp", desc: "Ride the scenic toy train and visit the beautiful Botanical Garden." },
                { title: "Kodaikanal", img: "cassets/kodaikanal.webp", desc: "Discover the mysterious Guna Caves and stunning Vattakanal Waterfalls." },
                { title: "Valparai", img: "cassets/valparai.webp", desc: "Visit the scenic Aliyar Dam and the serene Monkey Falls." },
                { title: "Yercaud", img: "cassets/yercaud.webp", desc: "Relax by the tranquil Yercaud Lake and visit the picturesque Kiliyur Falls." },
                { title: "Kanyakumari", img: "cassets/kanyakumari.webp", desc: "Witness the majestic Thiruvalluvar Statue at the southernmost tip of India." },
                { title: "Dhanushkodi", img: "cassets/dkodi.webp", desc: "Explore Arichal Munai, the last point of India." },
                { title: "Temples of Tamil Nadu", img: "cassets/tvur.webp", desc: "Visit architectural marvels: Thanjavur, Madurai Meenakshi, and Chidambaram." },
                { title: "Velankanni Church", img: "cassets/velankani.webp", desc: "Experience spiritual serenity at the Basilica of Our Lady of Good Health." },
                { title: "Jumma Masjid, Kilakarai", img: "cassets/jumma.webp", desc: "Visit the historic Jumma Masjid in Kilakarai." }
            ],
            "Kerala": [
                { title: "Munnar", img: "cassets/kerala.webp", desc: "Explore lush tea gardens and Eravikulam National Park." },
                { title: "Wayanad", img: "cassets/wayanad.webp", desc: "Discover stunning waterfalls and the ancient Edakkal Caves." },
                { title: "Kochi", img: "cassets/banner.webp", desc: "Cruise through the serene backwaters of Alleppey on a traditional boat house." },
                { title: "Varkala", img: "cassets/varkala.webp", desc: "Relax on Varkala Beach and experience the vibrant nightlife." },
                { title: "Vagamon & Thekkady", img: "cassets/vagamon.webp", desc: "Enjoy the misty hills of Vagamon and the wildlife of Thekkady." },
                { title: "Padmanabhaswamy Temple", img: "cassets/pds.webp", desc: "Visit the iconic Padmanabhaswamy Temple." }
            ],
            "Karnataka": [
                { title: "Coorg", img: "cassets/coorg.webp", desc: "Visit the stunning Abbey Falls and Jog Falls." },
                { title: "Mysore", img: "cassets/mysore.webp", desc: "Explore the grandeur of Mysore Palace." },
                { title: "Chikmagalur", img: "cassets/chikmagalur.webp", desc: "Walk through the aromatic coffee plantations." },
                { title: "Gokarna", img: "cassets/gokarna.webp", desc: "Relax on the pristine beaches of Gokarna." },
                { title: "Murdeshwar", img: "cassets/murdheshwar.webp", desc: "Marvel at the towering Shiva statue and enjoy the beach." }
            ],
            "Himachal Pradesh": [
                { title: "Shimla", img: "cassets/shimla.webp", desc: "Explore the colonial charm of Shimla, the 'Queen of Hills'." },
                { title: "Manali", img: "cassets/manali.webp", desc: "Experience snow-capped mountains and adventure activities." },
                { title: "Kullu", img: "cassets/kullu.webp", desc: "Visit Solang Valley, Atal Tunnel, and Rohtang Pass." }
            ],
            "Goa": [
                { title: "Goa", img: "cassets/goa.webp", desc: "Enjoy a cruise party, relax on the beaches, and try thrilling water sports." }
            ],
            "Andaman": [
                { title: "Andaman", img: "cassets/andaman.webp", desc: "Relax on the pristine Elephant Beach and Radhanagar Beach." }
            ],
             "Other Destinations": [
                { title: "Jammu - Gulmarg", img: "cassets/gulmarg.webp", desc: "Experience the snowy slopes and scenic beauty of Gulmarg." },
                { title: "Sikkim", img: "cassets/sikkim.webp", desc: "Explore Gangtok, visit the serene Buddha Temple, and enjoy the views in Pelling." },
                { title: "Darjeeling", img: "cassets/darjeeling.webp", desc: "Visit the snow point in Darjeeling and enjoy the stunning views." },
                { title: "Agra", img: "cassets/agra.webp", desc: "Marvel at the Taj Mahal, an iconic symbol of love." },
                { title: "Rajasthan", img: "cassets/rajasthan.webp", desc: "Experience the magic of the Thar Desert with camel safaris." },
                { title: "Kashi", img: "cassets/kashi.webp", desc: "Visit the sacred temples of Kashi, including the Kashi Vishwanath Temple." }
            ]
        };

        const tourDetails = {
            "Chennai": { spots: "Mahabalipuram, Marina Beach, Kapaleeshwarar Temple", hotels: "ITC Grand Chola, The Park Chennai", cost: "₹10,000 - ₹15,000" },
            "Ooty": { spots: "Botanical Garden, Doddabetta Peak, Ooty Lake", hotels: "Gem Park, Sterling Ooty", cost: "₹8,000 - ₹12,000" },
            "Kodaikanal": { spots: "Guna Caves, Vattakanal Falls, Coaker's Walk", hotels: "The Carlton, Sterling Kodai Valley", cost: "₹9,000 - ₹14,000" },
            "Valparai": { spots: "Aliyar Dam, Monkey Falls, Tea Estates", hotels: "Monica Garden Bungalow, Stanmore Garden", cost: "₹7,000 - ₹11,000" },
            "Yercaud": { spots: "Yercaud Lake, Kiliyur Falls, Pagoda Point", hotels: "Great Trails Yercaud, Hotel Shevaroys", cost: "₹6,000 - ₹10,000" },
            "Kanyakumari": { spots: "Thiruvalluvar Statue, Vivekananda Rock, Sunset Point", hotels: "Sparsa Resort, Hotel Sea View", cost: "₹8,000 - ₹12,000" },
            "Dhanushkodi": { spots: "Arichal Munai, Pamban Bridge, Ghost Town", hotels: "Hotel Tamilnadu, JKR Resort & Spa", cost: "₹7,000 - ₹11,000" },
            "Temples of Tamil Nadu": { spots: "Thanjavur, Madurai Meenakshi, Chidambaram", hotels: "Temple Stays, Hotel GRT Regency", cost: "₹9,000 - ₹13,000" },
            "Velankanni Church": { spots: "Basilica of Our Lady of Good Health, Beach", hotels: "Seagate Hotel, MGM Vailankanni", cost: "₹7,000 - ₹10,000" },
            "Jumma Masjid, Kilakarai": { spots: "Kilakarai Beach, Islamic Heritage Walks", hotels: "Local lodges, heritage homes", cost: "₹6,000 - ₹8,000" },
            "Munnar": { spots: "Tea Gardens, Eravikulam Park, Top Station", hotels: "Parakkat Nature Resort, The Fog Munnar", cost: "₹9,000 - ₹14,000" },
            "Wayanad": { spots: "Edakkal Caves, Banasura Sagar Dam, Waterfalls", hotels: "Vythiri Village, Wayanad Silverwoods", cost: "₹8,000 - ₹12,000" },
            "Kochi": { spots: "Alleppey Backwaters, Fort Kochi, Marine Drive", hotels: "Brunton Boatyard, Taj Malabar", cost: "₹10,000 - ₹15,000" },
            "Varkala": { spots: "Varkala Beach, Cliff View, Janardanaswamy Temple", hotels: "Clafouti Beach Resort, The Gateway", cost: "₹8,000 - ₹11,000" },
            "Vagamon & Thekkady": { spots: "Vagamon Hills, Periyar Wildlife Sanctuary", hotels: "Green Meadows, Elephant Court", cost: "₹9,000 - ₹14,000" },
            "Padmanabhaswamy Temple": { spots: "Padmanabhaswamy Temple, Kovalam Beach", hotels: "Vivanta Trivandrum, Keys Select Hotel", cost: "₹7,000 - ₹10,000" },
            "Coorg": { spots: "Abbey Falls, Raja's Seat, Dubare Elephant Camp", hotels: "Coorg Cliffs, Heritage Resort", cost: "₹8,000 - ₹13,000" },
            "Mysore": { spots: "Mysore Palace, Chamundi Hills, Zoo", hotels: "Radisson Blu, Sandesh The Prince", cost: "₹7,000 - ₹11,000" },
            "Chikmagalur": { spots: "Coffee Plantations, Mullayanagiri, Hirekolale Lake", hotels: "Trivik Hotels, The Serai", cost: "₹8,000 - ₹12,000" },
            "Gokarna": { spots: "Om Beach, Mahabaleshwar Temple, Paradise Beach", hotels: "Zostel Gokarna, Sanskruti Resort", cost: "₹7,000 - ₹11,000" },
            "Murdeshwar": { spots: "Murdeshwar Temple, Beach, Shiva Statue", hotels: "RNS Residency, Kamath Yatri Nivas", cost: "₹8,000 - ₹11,000" },
            "Shimla": { spots: "Mall Road, Jakhoo Temple, Kufri", hotels: "Clarkes Hotel, Oberoi Cecil", cost: "₹10,000 - ₹15,000" },
            "Manali": { spots: "Solang Valley, Hidimba Temple, Snow Adventures", hotels: "Apple Country, Manuallaya Resort", cost: "₹11,000 - ₹16,000" },
            "Kullu": { spots: "Atal Tunnel, Rohtang Pass, River Rafting", hotels: "The Himalayan Kullu, JJ Resort", cost: "₹9,000 - ₹13,000" },
            "Goa": { spots: "Baga Beach, Fort Aguada, Cruise Party", hotels: "Taj Vivanta, Novotel Goa", cost: "₹11,000 - ₹17,000" },
            "Andaman": { spots: "Elephant Beach, Radhanagar Beach, Cellular Jail", hotels: "SeaShell, Symphony Samudra", cost: "₹12,000 - ₹20,000" },
            "Jammu - Gulmarg": { spots: "Gondola Ride, Snow Skiing, Apharwat Peak", hotels: "Khyber Himalayan Resort, Shaw Inn", cost: "₹11,000 - ₹17,000" },
            "Sikkim": { spots: "Gangtok, Buddha Park, Pelling", hotels: "Elgin Nor-Khill, Mayfair Spa Resort", cost: "₹10,000 - ₹15,000" },
            "Darjeeling": { spots: "Snow Point, Tiger Hill, Batasia Loop", hotels: "Windamere Hotel, Cedar Inn", cost: "₹9,000 - ₹13,000" },
            "Agra": { spots: "Taj Mahal, Agra Fort, Mehtab Bagh", hotels: "ITC Mughal, Taj Hotel", cost: "₹8,000 - ₹12,000" },
            "Rajasthan": { spots: "Thar Desert, Jaisalmer Fort, Camel Safari", hotels: "Suryagarh, Umaid Bhawan Palace", cost: "₹10,000 - ₹18,000" },
            "Kashi": { spots: "Kashi Vishwanath Temple, Ganga Aarti, Sarnath", hotels: "Taj Ganges, Radisson Hotel", cost: "₹8,000 - ₹11,000" }
        };
        
        const tourSectionsContainer = document.getElementById('tour-sections');
        let allSectionsHtml = '';

        for (const state in tours) {
            let sectionHtml = `<div class="mb-20">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white animate-on-scroll">${state}</h2>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">`;
            
            tours[state].forEach(tour => {
                sectionHtml += `
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300 animate-on-scroll group">
                        <div class="overflow-hidden h-64">
                            <img src="${tour.img}" alt="${tour.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                        </div>
                        <div class="p-6">
                            <h3 class="text-2xl font-bold mb-2 text-gray-800 dark:text-white">${tour.title}</h3>
                            <p class="text-gray-600 dark:text-gray-400 mb-4 h-16">${tour.desc}</p>
                            <button class="open-modal-btn bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition" data-tour="${tour.title}">Learn More</button>
                        </div>
                    </div>`;
            });
            sectionHtml += `</div></div>`;
            allSectionsHtml += sectionHtml;
        }
        
        tourSectionsContainer.innerHTML = allSectionsHtml;

        const newAnimatedElements = tourSectionsContainer.querySelectorAll('.animate-on-scroll');
        newAnimatedElements.forEach(el => observer.observe(el));

        const tourModal = document.getElementById('tourModal');
        const modalContent = tourModal.querySelector('.transform');
        const closeModal = document.getElementById('closeModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        document.querySelectorAll('.open-modal-btn').forEach(button => {
            button.addEventListener('click', () => {
                const tourTitle = button.dataset.tour;
                const details = tourDetails[tourTitle] || { spots: "Details coming soon!", hotels: "Details coming soon!", cost: "Contact us for pricing." };
                modalTitle.innerText = tourTitle;
                modalBody.innerHTML = `
                    <p class="mb-3"><strong>Famous Spots:</strong> ${details.spots}</p>
                    <p class="mb-3"><strong>Popular Hotels:</strong> ${details.hotels}</p>
                    <p class="mb-6"><strong>Estimated Cost:</strong> ${details.cost}</p>
                    <a href="contact.html" class="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 inline-block font-semibold transition-transform transform hover:scale-105">Enquire Now</a>`;
                tourModal.classList.remove('hidden');
                setTimeout(() => modalContent.classList.add('scale-100', 'opacity-100'), 10);
            });
        });

        const hideModal = () => {
            modalContent.classList.remove('scale-100', 'opacity-100');
            setTimeout(() => tourModal.classList.add('hidden'), 300);
        };
        closeModal.addEventListener('click', hideModal);
        tourModal.addEventListener('click', (e) => {
            if (e.target === tourModal) hideModal();
        });
    }

    // Contact page logic
    const daysSlider = document.getElementById('days');
    if (daysSlider) {
        const daysValue = document.getElementById('daysValue');
        daysSlider.addEventListener('input', () => {
            daysValue.textContent = `${daysSlider.value}`;
        });
    }

    const budgetSlider = document.getElementById('budget');
    if (budgetSlider) {
        const budgetValue = document.getElementById('budgetValue');
        budgetSlider.addEventListener('input', () => {
            budgetValue.textContent = `${parseInt(budgetSlider.value).toLocaleString()}`;
        });
    }

    const thankYouModal = document.getElementById('thankYouModal');
    if (thankYouModal) {
        const modalContent = thankYouModal.querySelector('.transform');
        const closeThankYouModal = document.getElementById('closeThankYouModal');
        window.showThankYouModal = () => {
            thankYouModal.classList.remove('hidden');
            setTimeout(() => modalContent.classList.add('scale-100', 'opacity-100'), 10);
        };
        const hideThankYouModal = () => {
            modalContent.classList.remove('scale-100', 'opacity-100');
            setTimeout(() => thankYouModal.classList.add('hidden'), 300);
        };
        closeThankYouModal.addEventListener('click', hideThankYouModal);
    }
});


// Contact form functions (now global)
function sendWhatsApp() {
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const days = document.getElementById('days').value;
    const location = document.getElementById('location').value;
    const budget = document.getElementById('budget').value;
    if (!name || !contact || !location) {
        alert('Please fill in all required fields.');
        return;
    }
    const message = `Hi, I'm ${name}. Contact: ${contact}. I want to plan a ${days}-day trip to ${location} with a budget of ₹${parseInt(budget).toLocaleString()}.`;
    const adminNumber = '+918072644112';
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    if (window.showThankYouModal) window.showThankYouModal();
}

function sendEmail() {
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const days = document.getElementById('days').value;
    const location = document.getElementById('location').value;
    const budget = document.getElementById('budget').value;
    if (!name || !contact || !location) {
        alert('Please fill in all required fields.');
        return;
    }
    const subject = `Trip Inquiry from ${name}`;
    const body = `Name: ${name}\nContact: ${contact}\nTrip Duration: ${days} Days\nPreferred Location: ${location}\nBudget: ₹${parseInt(budget).toLocaleString()}`;
    const adminEmail = 'toursimayam@gmail.com';
    const emailUrl = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
    if (window.showThankYouModal) window.showThankYouModal();
}

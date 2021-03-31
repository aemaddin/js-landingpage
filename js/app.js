/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

/**
 * End Global Variables
 * Start Helper Functions
 *
 */


/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const sections = document.getElementsByTagName('section');

const nav = document.getElementById("navbar__list");
const mainUlFrag = document.createDocumentFragment();

/**
 * loop into all sections to append it to the nav bar
 */
for (const section of sections) {
    // create new li element
    const nav_li = document.createElement('li');
    const nav_a = document.createElement('a');

    // add text that stored in data-nav section attribute
    nav_a.textContent = section.getAttribute("data-nav");

    // add class menu__link to make it selected
    nav_a.classList.add('menu__link');

    nav_a.setAttribute('href', 'javascript:void(0);')

    // use this to detect the li on scrolling
    nav_a.setAttribute('data-section-id', section.getAttribute('id'))

    nav_a.addEventListener('click', (e) => activateSection(e.target))

    document.addEventListener('scroll', function (e) {
        if (isInViewport(section)) {
            // get all menu links
            const nav_items = document.querySelectorAll('.menu__link')

            // deactivate all
            for (const item of nav_items) {
                item.classList.remove('active');
            }

            // get all active sections which is supposed to be only one
            const active_section = document.querySelectorAll('.your-active-class')

            // deactivate all active sections
            for (const section of active_section) {
                section.classList.remove('your-active-class');
            }

            // activate showed nav item
            nav_a.classList.add('active');

            // activate showed section
            section.classList.add('your-active-class');
        }
    })
    nav_li.appendChild(nav_a);
    mainUlFrag.appendChild(nav_li);
}

nav.appendChild(mainUlFrag);

/**
 * activate section will search for all active sections and nav links to deactivate it then activate the chosen one
 * @param target
 */
function activateSection(target) {
    const nav_items = document.querySelectorAll('.menu__link')
    for (const item of nav_items) {
        item.classList.remove('active');
    }

    const active_section = document.querySelectorAll('.your-active-class')
    for (const section of active_section) {
        section.classList.remove('your-active-class');
    }

    const $selected_section = document.getElementById(
        target.getAttribute('data-section-id')
    )
    $selected_section.classList.add('your-active-class');
    $selected_section.scrollIntoView();

    target.classList.add('active')
}

/**
 * check if the passed element is on the viewport or not
 *
 * @param element
 * @returns {boolean}
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
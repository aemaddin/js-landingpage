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

// build the nav
const sections = document.getElementsByTagName('section');

const nav = document.getElementById("navbar__list");
const nav_mobile = document.getElementById("navbar__mobile__list");
const mainUlFrag = document.createDocumentFragment();
const mobileUlFrag = document.createDocumentFragment();

/**
 * loop into all sections to append it to the nav bar
 */
for (const section of sections) {
    const nav_li = addATagToSection(section);
    const nav_mobile_li = addATagToSection(section, 'mobile__menu__link');

    nav_li.addEventListener('click', (e) => {
        deactivateAllSections();
        activateSection(e.target, true);
    });

    nav_mobile_li.addEventListener('click', (e) => {
        openMenu();
        deactivateAllSections();
        activateSection(e.target, true);
    });

    activateSectionOnScroll(section, nav_mobile_li, 'mobile__menu__link');
    activateSectionOnScroll(section, nav_li, 'menu__link');

    mainUlFrag.appendChild(nav_li);
    mobileUlFrag.appendChild(nav_mobile_li);
}

nav.appendChild(mainUlFrag);
nav_mobile.appendChild(mobileUlFrag);

function addATagToSection(section, class_name = 'menu__link') {
    const liElement = document.createElement('li');

    liElement.textContent = section.getAttribute("data-nav");
    liElement.classList.add(class_name);
    liElement.setAttribute('data-section-id', section.getAttribute('id'))

    return liElement;
}

function activateSectionOnScroll(section, nav, class_name = 'menu__link') {
    document.addEventListener('scroll', function (e) {
        if (isInViewport(section)) {
            deactivateAllSections(class_name);
            activateSection(nav, false);
        }
    })
}

/**
 * activate section will search for all active sections
 * and nav links to deactivate it then activate the chosen one
 *
 * @param target
 * @param withScroll
 */
function activateSection(target, withScroll = false) {

    const $navbar__mobile__placeholder = document.getElementById('navbar__mobile__placeholder');

    const $selected_section = document.getElementById(
        target.getAttribute('data-section-id')
    )

    $selected_section.classList.add('your-active-class');

    $navbar__mobile__placeholder.textContent = $selected_section.getAttribute('data-nav');
    target.classList.add('active');

    if (withScroll) {
        $selected_section.scrollIntoView();
    }
}

/**
 * deactivate all active sections before selecting another
 */
function deactivateAllSections(class_name = 'menu__link') {
    const nav_items = document.querySelectorAll(`.${class_name}`)
    for (const item of nav_items) {
        item.classList.remove('active');
    }

    const active_section = document.querySelectorAll('.your-active-class')
    for (const section of active_section) {
        section.classList.remove('your-active-class');
    }
}

/**
 * check if the passed element is on the viewport or not
 *
 * @param element
 * @returns {boolean}
 */
function isInViewport(element) {
    return window.pageYOffset >= element.offsetTop - 200;
}

function openMenu() {
    const menu = document.getElementById("navbar__mobile__list");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
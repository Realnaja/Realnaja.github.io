
document.addEventListener("DOMContentLoaded", () => {

    /* =================================
       1. MOBILE NAVIGATION
    ================================= */

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navigationLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

        navigationLinks.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");

            });

        });

    }


    /* =================================
       2. DISPLAY PROJECTS
    ================================= */

    const projectsGrid = document.getElementById("projects-grid");

    function displayProjects(projectList) {

        if (!projectsGrid) return;

        projectsGrid.innerHTML = "";

        projectList.forEach(project => {

            const projectCard = document.createElement("article");

            projectCard.className = "project-card reveal";

            // Display project link only when a URL exists
            const projectLink = project.link
                ? `
                    <a
                        href="${project.link}"
                        class="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ${project.linkText || "View Project"} ↗
                    </a>
                `
                : "";

            projectCard.innerHTML = `

                <div class="project-info">

                    <span class="project-category">
                        ${project.categoryName}
                    </span>

                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <div class="project-tech">

                        ${project.technologies.map(technology => `
                            <span>${technology}</span>
                        `).join("")}

                    </div>

                    ${projectLink}

                </div>

            `;

            projectsGrid.appendChild(projectCard);

        });

        observeRevealElements();

    }


    /* =================================
       3. SCROLL REVEAL ANIMATIONS
    ================================= */

    let revealObserver;

    function observeRevealElements() {

        const revealElements = document.querySelectorAll(
            ".reveal:not(.visible)"
        );

        if (!("IntersectionObserver" in window)) {

            revealElements.forEach(element => {
                element.classList.add("visible");
            });

            return;
        }

        if (revealObserver) {
            revealObserver.disconnect();
        }

        revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    }


    /* =================================
       4. ACTIVE NAVIGATION LINK
    ================================= */

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        navigationLinks.forEach(link => {

                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === `#${currentId}`
                            );

                        });

                    }

                });

            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =================================
       5. AUTOMATIC COPYRIGHT YEAR
    ================================= */

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =================================
       6. INITIALIZE WEBSITE
    ================================= */

    displayProjects(projects);
    observeRevealElements();

});

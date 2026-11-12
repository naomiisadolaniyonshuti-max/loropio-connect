const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        navigation.classList.toggle("is-open", !isExpanded);
    });

    navigation.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            menuToggle.setAttribute("aria-expanded", "false");
            navigation.classList.remove("is-open");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            menuToggle.setAttribute("aria-expanded", "false");
            navigation.classList.remove("is-open");
            menuToggle.focus();
        }
    });
}

const filterButtons = document.querySelectorAll(".filter-button");
const opportunityCards = document.querySelectorAll(".opportunity-card");
const filterEmpty = document.querySelector(".filter-empty");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        let visibleCount = 0;

        filterButtons.forEach((filterButton) => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("is-active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        opportunityCards.forEach((card) => {
            const isVisible = filter === "all" || card.dataset.category === filter;
            card.hidden = !isVisible;
            visibleCount += Number(isVisible);
        });

        if (filterEmpty) {
            filterEmpty.hidden = visibleCount > 0;
        }
    });
});

const suggestionForm = document.querySelector("#suggestion-form");
const formStatus = document.querySelector("#form-status");

if (suggestionForm && formStatus) {
    suggestionForm.addEventListener("submit", (event) => {
        event.preventDefault();
        formStatus.classList.remove("is-error");

        const category = suggestionForm.querySelector("#suggestion-type");
        const message = suggestionForm.querySelector("#message");
        const email = suggestionForm.querySelector("#email");

        if (!category.value || !message.value.trim()) {
            formStatus.textContent = "Choose a category and add a few details before continuing.";
            formStatus.classList.add("is-error");
            (!category.value ? category : message).focus();
            return;
        }

        if (email.value.trim() && !email.validity.valid) {
            formStatus.textContent = "Please check the email address, or leave it blank.";
            formStatus.classList.add("is-error");
            email.focus();
            return;
        }

        formStatus.textContent = "Thanks for sharing. This site cannot send or save suggestions yet; please contact the organizer directly for current details.";
    });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}
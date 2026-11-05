 (() => {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("todo-form");
        const input = document.getElementById("todo-input");
        const list = document.getElementById("todo-list");
        const errorMsg = document.getElementById("error-msg");
        const counter = document.getElementById("counter");

        const filterAll = document.getElementById("filter-all");
        const filterActive = document.getElementById("filter-active");
        const filterDone = document.getElementById("filter-done");

        let currentFilter = "all";

        function updateCounter() {
            const items = list.querySelectorAll("li");
            const remaining = Array.from(items).filter(
                item => !item.classList.contains("completed")
            ).length;
            counter.textContent = `${remaining} item(s) left`;
        }

        function applyFilter() {
            const items = list.querySelectorAll("li");
            items.forEach(item => {
                const completed = item.classList.contains("completed");
                if (currentFilter === "all") {
                    item.hidden = false;
                } else if (currentFilter === "active") {
                    item.hidden = completed;
                } else {
                    item.hidden = !completed;
                }
            });
        }

        form.addEventListener("submit", event => {
            event.preventDefault();
            const text = input.value.trim();

            if (!text) {
                errorMsg.classList.remove("hidden");
                return;
            }
            errorMsg.classList.add("hidden");

            const li = document.createElement("li");
            const span = document.createElement("span");
            const button = document.createElement("button");

            span.textContent = text;
            button.textContent = "Delete";
            button.type = "button";
            button.classList.add("delete-btn");

            li.appendChild(span);
            li.appendChild(button);
            list.appendChild(li);

            input.value = "";
            applyFilter();
            updateCounter();
        });

        list.addEventListener("click", event => {
            const deleteButton = event.target.closest(".delete-btn");
            if (deleteButton && list.contains(deleteButton)) {
                deleteButton.closest("li").remove();
            } else if (event.target.tagName === "SPAN") {
                event.target.closest("li").classList.toggle("completed");
            }
            applyFilter();
            updateCounter();
        });

        filterAll.addEventListener("click", () => {
            currentFilter = "all";
            applyFilter();
        });

        filterActive.addEventListener("click", () => {
            currentFilter = "active";
            applyFilter();
        });

        filterDone.addEventListener("click", () => {
            currentFilter = "done";
            applyFilter();
        });

        errorMsg.classList.add("hidden");
        updateCounter();
        applyFilter();
    });
})();

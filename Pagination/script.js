const itemsPerPage = 10; 
        let currentPage = 1;
        let start = 0;

        function updateUI() {
            document.getElementById("currentPage").innerText = `Page ${currentPage}`;
        }

        function fetchData() {
            fetch(`https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${itemsPerPage}`)
                .then(response => response.json())
                .then(data => {
                    displayData(data); 
                    updatePagination(); 
                })
                .catch(error => console.error("Error fetching data:", error));
        }

        function displayData(data) {
            const tableBody = document.getElementById("tableBody");

            tableBody.innerHTML = "";

            data.forEach((todo, index) => {
                const row = document.createElement("tr");
                // if (index % 2 === 1) {
                //     row.style.backgroundColor = "red"; 
                // }
                row.innerHTML = `
                    <td>${todo.userId}</td>
                    <td>${todo.id}</td>
                    <td>${todo.title}</td>
                    <td>${todo.completed}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        function updatePagination() {
            const prevPageButton = document.getElementById("prevPage");
            const nextPageButton = document.getElementById("nextPage");
          

            const paginationDiv = document.getElementById("pagination");
            const totalPages = Math.ceil(200 / itemsPerPage); 

            paginationDiv.innerHTML = "";

            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement("button");
                button.textContent = i;
                button.addEventListener("click", () => {
                    currentPage = i;
                    start = (currentPage - 1) * itemsPerPage;
                    fetchData();
                    updateUI();
                });
                paginationDiv.appendChild(button);
            }
            prevPageButton.disabled = currentPage === 1;
            nextPageButton.disabled = currentPage * itemsPerPage >= 200;

        }

        document.getElementById("prevPage").addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                start -= itemsPerPage; 
                fetchData();
                updateUI();
            }
        });

        document.getElementById("nextPage").addEventListener("click", () => {
            if (currentPage * itemsPerPage < 200) { 
                currentPage++;
                start += itemsPerPage; 
                fetchData();
                updateUI();
            }
        });

        fetchData();

        updateUI();
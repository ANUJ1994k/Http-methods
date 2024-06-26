const Url = 'http://localhost:3000/tickets';
        const ticketsTable = document.getElementById('ticketsTable').getElementsByTagName('tbody')[0];
        const ticketForm = document.getElementById('ticketForm');
        let editedTicketId = null;

    // Fetching and displaying tickets
    async function fetchTickets() {
        try {
            const response = await fetch(Url);
            const tickets = await response.json();
            displayTickets(tickets);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    }

    // Displaying  tickets in table
    function displayTickets(tickets) {
        ticketsTable.innerHTML = '';
        tickets.forEach(ticket => {
            const row = ticketsTable.insertRow();
            row.innerHTML = `
                <td>${ticket.title}</td>
                <td>${ticket.description}</td>
                <td>${ticket.status}</td>
                <td>${ticket.dueDate}</td>
                <td>${ticket.priority}</td>
                <td>
                    <button onclick="editTicket(${ticket.id})">Edit</button>
                    <button onclick="deleteTicket(${ticket.id})">Delete</button>
                </td>
            `;
        });
    }

    // Add or update ticket
    ticketForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const status = document.getElementById('status').value;
        const dueDate = document.getElementById('dueDate').value;
        const priority = document.getElementById('priority').value;
        const ticketData = { title, description, status, dueDate, priority };

        try {
            let response;
            if (editedTicketId) {
                // Update existing ticket
                response = await fetch(`${Url}/${editingTicketId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(ticketData)
                });
                editedTicketId = null;
            } else {
                // Add new ticket
                response = await fetch(Url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(ticketData)
                });
            }

            if (response.ok) {
                fetchTickets();
                ticketForm.reset();
            } else {
                console.error('Error saving ticket:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving ticket:', error);
        }
    });

    // Edit ticket
    window.editTicket = async (id) => {
        try {
            const response = await fetch(`${Url}/${id}`);
            const ticket = await response.json();

            document.getElementById('title').value = ticket.title;
            document.getElementById('description').value = ticket.description;
            document.getElementById('status').value = ticket.status;
            document.getElementById('dueDate').value = ticket.dueDate;
            document.getElementById('priority').value = ticket.priority;

            editedTicketId = id;
        } catch (error) {
            console.error('Error fetching ticket:', error);
        }
    };

    // Delete ticket
    window.deleteTicket = async (id) => {
        try {
            const response = await fetch(`${Url}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchTickets();
            } else {
                console.error('Error deleting ticket:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    // Initial fetch of tickets
    fetchTickets(Url);


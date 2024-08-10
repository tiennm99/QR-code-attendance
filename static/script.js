document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ip-form');
    const qrCodeContainer = document.getElementById('qr-code-container');
    const submissionsTable = document.getElementById('submissions-table');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const selectedIp = formData.get('ip');

        fetch('/private/generate_qr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ip: selectedIp }),
        })
        .then(response => response.json())
        .then(data => {
            qrCodeContainer.innerHTML = `
                <h2 class="mb-3">QR Code for ${data.full_url}</h2>
                <img src="data:image/png;base64,${data.qr_code}" alt="QR Code" class="img-fluid">
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            qrCodeContainer.innerHTML = '<p class="text-danger">Error generating QR code. Please try again.</p>';
        });
    });

    function updateSubmissions() {
        fetch('/private/get_last_submissions')
            .then(response => response.json())
            .then(data => {
                let tableHtml = `
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Submit Time</th>
                        </tr>
                    </thead>
                    <tbody>
                `;
                data.forEach(submission => {
                    tableHtml += `
                        <tr>
                            <td>${submission['Student ID']}</td>
                            <td>${submission['Student Name']}</td>
                            <td>${submission['Submit Time']}</td>
                        </tr>
                    `;
                });
                tableHtml += '</tbody>';
                submissionsTable.innerHTML = tableHtml;
            })
            .catch(error => console.error('Error:', error));
    }

    // Update submissions every 5 seconds
    setInterval(updateSubmissions, 5000);
    // Initial update
    updateSubmissions();
});

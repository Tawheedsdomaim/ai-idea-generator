document.getElementById('ideaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = document.getElementById('userInput').value;
    try {
        const response = await fetch('http://localhost:5000/generateIdea', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: userInput }),
        });
        const data = await response.json();
        document.getElementById('ideaOutput').textContent = data.idea;
    } catch (error) {
        console.error('Error fetching idea:', error);
        document.getElementById('ideaOutput').textContent = 'Failed to generate idea.';
    }
});

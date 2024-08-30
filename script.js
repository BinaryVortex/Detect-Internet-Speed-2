document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const downloadSpan = document.getElementById('download');
    const uploadSpan = document.getElementById('upload');
    const progressBar = document.getElementById('progress-bar');

    startButton.addEventListener('click', () => {
        startSpeedTest();
    });

    async function startSpeedTest() {
        resetUI();
        showLoading(true);
        try {
            await updateProgressBar(25, 1000);
            const downloadSpeed = await measureDownloadSpeed();

            await updateProgressBar(75, 1000);
            const uploadSpeed = await measureUploadSpeed();

            await updateProgressBar(100, 1000);
            showResults(downloadSpeed, uploadSpeed);
        } catch (error) {
            alert(`Error: ${error.message || 'Failed to measure speed. Please try again.'}`);
        } finally {
            showLoading(false);
        }
    }

    function resetUI() {
        resultsDiv.classList.add('hidden');
        progressBar.style.width = '0%';
    }

    function showLoading(isLoading) {
        loadingDiv.classList.toggle('hidden', !isLoading);
    }

    function updateProgressBar(percentage, duration = 300) {
        return new Promise(resolve => {
            progressBar.style.transition = `width ${duration}ms ease-in-out`;
            progressBar.style.width = `${percentage}%`;
            setTimeout(resolve, duration);
        });
    }

    function showResults(download, upload) {
        downloadSpan.textContent = download.toFixed(2);
        uploadSpan.textContent = upload.toFixed(2);
        resultsDiv.classList.remove('hidden');
    }

    async function measureDownloadSpeed() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const speed = Math.random() * 100 + 10;
                if (speed > 0) {
                    resolve(speed);
                } else {
                    reject(new Error('Download speed measurement failed.'));
                }
            }, 2000);
        });
    }

    async function measureUploadSpeed() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const speed = Math.random() * 50 + 5;
                if (speed > 0) {
                    resolve(speed);
                } else {
                    reject(new Error('Upload speed measurement failed.'));
                }
            }, 2000);
        });
    }
});

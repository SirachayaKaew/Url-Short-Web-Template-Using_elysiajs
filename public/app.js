document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('shortenForm');
    const urlInput = document.getElementById('url');
    const resultBox = document.getElementById('resultBox');
    const linkDisplay = document.getElementById('linkDisplay');
    const message = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    let currentShortUrl = null;

    // Helper: show loading state
    const showLoading = () => {
        resultBox.classList.add('show');
        linkDisplay.textContent = '';
        message.textContent = 'กำลังสร้าง...';
        message.className = 'message loading';
        submitBtn.disabled = true;
    };

    // Helper: show error
    const showError = (msg) => {
        resultBox.classList.add('show');
        linkDisplay.textContent = '';
        message.textContent = msg;
        message.className = 'message error';
        submitBtn.disabled = false;
    };

    // Helper: show success
    const showSuccess = (shortUrl) => {
        currentShortUrl = shortUrl;
        resultBox.classList.add('show');
        linkDisplay.textContent = shortUrl;
        message.textContent = '✓ ลิงก์สั้นได้รับการสร้างแล้ว';
        message.className = 'message success';
        copyBtn.classList.remove('copied');
        copyBtn.textContent = 'คัดลอก';
        submitBtn.disabled = false;
    };

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const url = urlInput.value.trim();
        if (!url) {
            showError('กรุณากรอก URL');
            return;
        }

        showLoading();

        try {
            const res = await fetch('/api/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            if (!res.ok) {
                const errorText = res.status === 400 ? 'URL ไม่ถูกต้อง' : 
                                    res.status === 429 ? 'ลองอีกครั้งในไม่กี่วินาที' :
                                    a`ข้อผิดพลาด ${res.status}`;
                showError(errorText);
                return;
            }

            const data = await res.json();
            showSuccess(data.short);
        } catch (err) {
            showError('เกิดข้อผิดพลาด: ' + err.message);
        }
    });

    // Copy button
    copyBtn.addEventListener('click', async () => {
        if (!currentShortUrl) return;

        try {
            await navigator.clipboard.writeText(currentShortUrl);
            copyBtn.classList.add('copied');
            copyBtn.textContent = 'คัดลอกแล้ว!';
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.textContent = 'คัดลอก';
            }, 2000);
        } catch (err) {
            showError('ไม่สามารถคัดลอกได้');
        }
    });

    // Clear button
    clearBtn.addEventListener('click', () => {
        urlInput.value = '';
        resultBox.classList.remove('show');
        currentShortUrl = null;
        message.textContent = '';
        linkDisplay.textContent = '';
        urlInput.focus();
    });

    // Focus input on load
    urlInput.focus();
});
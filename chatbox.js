(function() {
    // Add event listener to re-enable copy event
    document.addEventListener('copy', (event) => {
        event.stopPropagation();
    }, true);

    // Create tray elements
    const tray = document.createElement('div');
    const trayInput = document.createElement('textarea');
    const submitBtn = document.createElement('button');
    const copyBtn = document.createElement('button');
    const outputBox = document.createElement('div');
    
    // Style the tray (completely transparent background and no dragging)
    tray.style.position = 'fixed';
    tray.style.bottom = '20px';
    tray.style.right = '20px';
    tray.style.width = '300px';
    tray.style.height = '250px';
    tray.style.backgroundColor = 'rgba(255, 255, 255, 0)';  // Completely transparent background
    tray.style.border = '1px solid rgba(0, 0, 0, 0)'; // No border
    tray.style.borderRadius = '5px';
    tray.style.display = 'none';  // Initially hidden
    tray.style.flexDirection = 'column';
    tray.style.zIndex = '1000';
    tray.style.transition = 'all 0.3s ease-in-out';

    // Tray input area (no color and slightly transparent)
    trayInput.style.flex = '1';
    trayInput.style.padding = '10px';
    trayInput.style.overflowY = 'auto';
    trayInput.style.border = '1px solid rgba(0, 0, 0, 0)';
    trayInput.style.fontSize = '14px';
    trayInput.style.borderRadius = '5px';
    trayInput.style.outline = 'none';
    trayInput.style.margin = '10px';
    trayInput.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';  // Transparent background
    trayInput.style.resize = 'none'; // Disable resizing
    trayInput.style.color = 'rgba(128, 128, 128, 0.8)';  // Gray text for input

    // Output box (for ChatGPT's response)
    outputBox.style.flex = '2';
    outputBox.style.padding = '10px';
    outputBox.style.overflowY = 'auto';
    outputBox.style.fontSize = '14px';
    outputBox.style.backgroundColor = 'rgba(250, 250, 250, 0.1)';  // Light grayish background
    outputBox.style.borderTop = '1px solid rgba(0, 0, 0, 0)';
    outputBox.style.maxHeight = '100px';
    outputBox.style.whiteSpace = 'pre-wrap';
    outputBox.style.color = 'rgba(128, 128, 128, 0.8)';  // Subtle gray text for output

    // Submit button (transparent, no color, thinner)
    submitBtn.style.padding = '5px';
    submitBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    submitBtn.style.border = 'none';
    submitBtn.style.cursor = 'pointer';
    submitBtn.style.fontSize = '16px';
    submitBtn.style.textAlign = 'center';
    submitBtn.style.borderRadius = '5px';
    submitBtn.style.margin = '5px';
    submitBtn.style.transition = 'background-color 0.3s ease';

    // Copy button (transparent, no color, thinner)
    copyBtn.style.padding = '5px';
    copyBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    copyBtn.style.border = 'none';
    copyBtn.style.cursor = 'pointer';
    copyBtn.style.fontSize = '16px';
    copyBtn.style.textAlign = 'center';
    copyBtn.style.borderRadius = '5px';
    copyBtn.style.margin = '5px';
    copyBtn.style.transition = 'background-color 0.3s ease';

    // Hover effect for the submit button
    submitBtn.addEventListener('mouseenter', () => {
        submitBtn.style.backgroundColor = 'rgba(169, 169, 169, 0.3)';
    });
    submitBtn.addEventListener('mouseleave', () => {
        submitBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    // Hover effect for the copy button
    copyBtn.addEventListener('mouseenter', () => {
        copyBtn.style.backgroundColor = 'rgba(169, 169, 169, 0.3)';
    });
    copyBtn.addEventListener('mouseleave', () => {
        copyBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    // Append elements to tray
    tray.appendChild(trayInput);
    tray.appendChild(submitBtn);
    tray.appendChild(outputBox);
    tray.appendChild(copyBtn);
    document.body.appendChild(tray);

    // Toggle tray visibility on "P" key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'p' || event.key === 'P') {
            if (document.activeElement !== trayInput) {
                tray.style.display = tray.style.display === 'none' ? 'flex' : 'none';
            }
        }
    });

    // Handle submit action
    submitBtn.addEventListener('click', async function() {
        const inputText = trayInput.value.trim();
        if (inputText) {
            outputBox.innerHTML = 'Loading...';

            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer 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`,  // Replace with your actual API key
                    },
                    body: JSON.stringify({
                        model: 'gpt-4',
                        messages: [{ role: 'user', content: inputText }],
                    }),
                });

                if (response.status === 429) {
                    outputBox.innerHTML = 'Error: Too many requests. Please try again later.';
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch response from OpenAI');
                }

                const data = await response.json();
                const answer = data.choices[0].message.content;
                outputBox.innerHTML = answer;
            } catch (error) {
                outputBox.innerHTML = `Error: ${error.message}`;
            }
        } else {
            outputBox.innerHTML = 'Please enter a question.';
        }
    });

    // Copy text from output box to clipboard
    copyBtn.addEventListener('click', () => {
        const textToCopy = outputBox.innerText;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyBtn.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';  // Change to green when copied
                setTimeout(() => {
                    copyBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  // Restore original color
                }, 1000);
            }).catch(err => {
                console.error('Failed to copy text:', err);
            });
        }
    });

    // Style for transparent text selection highlight
    const style = document.createElement('style');
    style.innerHTML = `
        ::selection {
            background-color: transparent !important;
            color: inherit;
        }
        ::-moz-selection {
            background-color: transparent !important;
            color: inherit;
        }
    `;
    document.head.appendChild(style);
})();



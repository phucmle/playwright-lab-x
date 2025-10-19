## 🧪 Test Prompt: Playwright WebSocket

Playwright provides the `WebSocket` class to listen to and handle socket-related events:  
🔗 [Playwright WebSocket API](https://playwright.dev/docs/api/class-websocket#methods)

---

## 📌 Requirements

Write a test that performs the following tasks:

1. Navigate to the page: `https://echo.websocket.org/.ws`
2. Listen to the WebSocket event: `framereceived`
3. Send the message: `"hello"`
4. Assert that the received message is `"hello"`


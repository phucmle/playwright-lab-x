import { expect, test } from "../../tests/fixtures/test-fixture";

test('websocket', async({page})=>{
    await page.goto('https://echo.websocket.org/.ws');

    //Wait for the websocket connection is established
    const wsPromise = page.waitForEvent('websocket');

    const ws = await wsPromise;

    const receivedMsg: Array<string> = [];
    // Listen for WebSocket frame events
    ws.on('framereceived',(frame)=>{
        receivedMsg.push(frame.payload.toString());
    })

    await page.getByRole('textbox').fill('Hello')
    await page.getByRole('button', { name: 'Send Message' })
      .click()

    // Wait for the echo response
    await expect.poll(() => receivedMsg.length).toBeGreaterThan(1);
    console.log("✅ Received message:", receivedMsg);

    // Verify the echoed message
    expect(receivedMsg.includes('Hello')).toBe(true);
})
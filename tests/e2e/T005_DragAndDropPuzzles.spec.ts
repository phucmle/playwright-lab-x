import {test, expect} from "../fixtures/test-fixture";

test.describe("Drag and drop boxes into their corresponding slots", () => {
    test("Drag and drop page", async ({dragAndDropPage}) => {
        let message = "";

        await test.step("Go to drag and drop page", async () => {
            await dragAndDropPage.openDragAndDropPage();
        });

        await test.step("Drag each item into their corresponding slot", async () => {
            const numberOfItems = 4;
            const messagePromise = dragAndDropPage.getDialogMsg();

            for (let i = 1; i <= numberOfItems; i++) {
                const item = dragAndDropPage.puzzlePiece(i);
                const slot = dragAndDropPage.dropZone(i);
                await item.dragTo(slot);
                await expect(slot).toHaveClass("dropzone correct");
                await expect(slot).toContainText(i.toString());
            }

            message = await messagePromise;
        });

        await test.step("Verify the Congratulations message", async () => {
            expect(message).toBe("Congratulations! You completed the puzzle.");
        });
    });
});
